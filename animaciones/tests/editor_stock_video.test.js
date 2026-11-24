const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const { validatePlan, COMPONENTS } = require('../editor/plan_schema');
const { loadCatalog, catalogIds } = require('../editor/sfx_catalog');
const { hasBrollVisual } = require('../editor/copywriter');
const { loadEnvFile } = require('../editor/utils');
const { runFFmpeg, probeMedia } = require('../editor/ffmpeg');
const {
  pickBestPexelsCandidate,
  pickBestPixabayCandidate,
  resolveStockVideoAsset
} = require('../editor/auto_video_fetcher');

const ROOT = path.resolve(__dirname, '../..');
const catalog = loadCatalog();
const sfxIds = catalogIds(catalog);
const base = JSON.parse(fs.readFileSync(path.join(ROOT, 'animaciones/editor/fixtures/plan.sample.json'), 'utf8'));

test('plan_schema and copywriter support stock_video B-rolls', () => {
  assert.ok(COMPONENTS.stock_video);
  assert.equal(hasBrollVisual({ videoQuery: 'developer typing code' }), true);

  const plan = JSON.parse(JSON.stringify(base));
  plan.brolls = [
    {
      id: 'broll_stock',
      start: 2.0,
      end: 4.5,
      cutStyle: 'j-cut',
      concept: 'desarrollador escribiendo codigo',
      narrative: 'Clip real de ambiente dev.',
      component: 'stock_video',
      props: {
        videoQuery: 'developer typing dark room',
        sourcePreference: 'pexels',
        tone: 'dim'
      }
    }
  ];
  plan.overlays = [];
  plan.cameras = [];
  plan.sfx = [];

  const validated = validatePlan(plan, { duration: 24.499, sfxIds });
  assert.equal(validated.brolls[0].component, 'stock_video');
  assert.equal(validated.brolls[0].props.tone, 'dim');
});

test('pickBestPexelsCandidate and pickBestPixabayCandidate prefer portrait HD MP4', () => {
  const pexels = pickBestPexelsCandidate({
    videos: [
      {
        id: 101,
        duration: 5,
        video_files: [
          { file_type: 'video/mp4', width: 1920, height: 1080, link: 'https://example.com/land.mp4' },
          { file_type: 'video/mp4', width: 1080, height: 1920, link: 'https://example.com/port.mp4' }
        ]
      }
    ]
  }, 3.0);
  assert.equal(pexels.provider, 'pexels');
  assert.equal(pexels.url, 'https://example.com/port.mp4');

  const pixabay = pickBestPixabayCandidate({
    hits: [
      {
        id: 202,
        duration: 6,
        videos: {
          small: { url: 'https://example.com/s.mp4', width: 540, height: 960 },
          medium: { url: 'https://example.com/m.mp4', width: 1080, height: 1920 }
        }
      }
    ]
  }, 3.0);
  assert.equal(pixabay.provider, 'pixabay');
  assert.equal(pixabay.url, 'https://example.com/m.mp4');
});

test('resolveStockVideoAsset falls back offline or without API keys, and caches normalized 9:16 MP4 online', async () => {
  const tempDir = path.join(ROOT, 'animaciones/editor_runs/_stock_test');
  fs.mkdirSync(tempDir, { recursive: true });
  const sampleMp4 = path.join(tempDir, 'sample_src.mp4');
  const cacheDir = path.join(tempDir, 'cache');

  try {
    const offline = await resolveStockVideoAsset(
      { id: 'b1', start: 0, end: 2.0, props: { videoQuery: 'server room' } },
      { forceOffline: true, cacheDir, loadEnv: false }
    );
    assert.equal(offline.ok, false);
    assert.equal(offline.fallback, true);
    assert.equal(offline.reason, 'force-offline');

    const noKeys = await resolveStockVideoAsset(
      { id: 'b2', start: 0, end: 2.0, props: { videoQuery: 'server room' } },
      { forceOffline: false, pexelsKey: '', pixabayKey: '', cacheDir, loadEnv: false }
    );
    assert.equal(noKeys.ok, false);
    assert.equal(noKeys.reason, 'missing-api-keys');

    // Generate a tiny real MP4 to serve via mocked fetchImpl
    runFFmpeg([
      '-y', '-f', 'lavfi', '-i', 'testsrc2=s=720x1280:d=1.5:r=30',
      '-c:v', 'libx264', '-pix_fmt', 'yuv420p', sampleMp4
    ]);
    const mp4Bytes = fs.readFileSync(sampleMp4);

    let fetchCalls = 0;
    const mockFetch = async (url) => {
      fetchCalls++;
      if (url.includes('api.pexels.com')) {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            videos: [{
              id: 999,
              duration: 4,
              video_files: [{ file_type: 'video/mp4', width: 720, height: 1280, link: 'https://cdn.example.com/clip.mp4' }]
            }]
          })
        };
      }
      return {
        ok: true,
        status: 200,
        headers: { get: () => 'video/mp4' },
        arrayBuffer: async () => mp4Bytes.buffer.slice(mp4Bytes.byteOffset, mp4Bytes.byteOffset + mp4Bytes.byteLength)
      };
    };

    const event = { id: 'b3', start: 1.0, end: 3.0, props: { videoQuery: 'coding laptop', tone: 'dim' } };
    const first = await resolveStockVideoAsset(event, {
      forceOffline: false,
      pexelsKey: 'test-key',
      pixabayKey: '',
      cacheDir,
      loadEnv: false,
      fetchImpl: mockFetch
    });
    assert.equal(first.ok, true);
    assert.equal(first.cached, false);
    assert.equal(first.provider, 'pexels');
    assert.equal(fetchCalls, 2);

    const probe = probeMedia(first.file);
    assert.equal(probe.width, 1080);
    assert.equal(probe.height, 1920);
    assert.equal(probe.hasAudio, false);
    assert.ok(probe.duration >= 1.88);

    const second = await resolveStockVideoAsset(event, {
      forceOffline: false,
      pexelsKey: 'test-key',
      pixabayKey: '',
      cacheDir,
      loadEnv: false,
      fetchImpl: async () => { throw new Error('Should hit cache'); }
    });
    assert.equal(second.ok, true);
    assert.equal(second.cached, true);
    assert.equal(second.provider, 'cache');
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
});

test('loadEnvFile reads .env without overriding existing env vars', () => {
  const tmpRoot = path.join(ROOT, 'animaciones/editor_runs/_env_test');
  fs.mkdirSync(tmpRoot, { recursive: true });
  const prevPexels = process.env.PEXELS_API_KEY;
  const prevCustom = process.env.SEDEV_TEST_ENV_KEY;
  try {
    process.env.SEDEV_TEST_ENV_KEY = 'already-set';
    delete process.env.PEXELS_API_KEY;
    fs.writeFileSync(path.join(tmpRoot, '.env'), 'PEXELS_API_KEY="from-dotenv"\nSEDEV_TEST_ENV_KEY=overwritten\n', 'utf8');
    assert.equal(loadEnvFile(tmpRoot), true);
    assert.equal(process.env.PEXELS_API_KEY, 'from-dotenv');
    assert.equal(process.env.SEDEV_TEST_ENV_KEY, 'already-set');
  } finally {
    if (prevPexels === undefined) delete process.env.PEXELS_API_KEY; else process.env.PEXELS_API_KEY = prevPexels;
    if (prevCustom === undefined) delete process.env.SEDEV_TEST_ENV_KEY; else process.env.SEDEV_TEST_ENV_KEY = prevCustom;
    fs.rmSync(tmpRoot, { recursive: true, force: true });
  }
});
