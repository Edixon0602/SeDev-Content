const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const {
  resolveEntityLogos,
  detectImageFormat,
  fetchBrandLogo,
  resolveBrandLogos,
  fetchImageForQuery,
  resolvePlanMediaAssets
} = require('../editor/auto_image_fetcher');
const {
  ensureSfxCatalogAssets,
  normalizeAudioToWav,
  fetchAndNormalizeUrl,
  resolveSfx
} = require('../editor/auto_sfx_fetcher');
const { readWavInfo } = require('../editor/sfx_catalog');
const { runFFmpeg } = require('../editor/ffmpeg');

const ROOT = path.resolve(__dirname, '../..');
const TEMP_DIR = path.join(ROOT, 'animaciones/editor_runs/_auto_fetchers_test');

test('resolveEntityLogos maps semantic domains cleanly', () => {
  assert.deepEqual(resolveEntityLogos('los SaaS grandes'), ['salesforce', 'hubspot', 'notion', 'slack']);
  assert.deepEqual(resolveEntityLogos('agentes de IA'), ['openai', 'anthropic', 'cursor', 'githubcopilot']);
  assert.deepEqual(resolveEntityLogos('custom software'), ['typescript', 'docker', 'postgresql', 'react']);
});

test('auto_image_fetcher guarantees deterministic offline fallbacks under SEDEV_FORCE_OFFLINE=1', async () => {
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  const cacheDir = path.join(TEMP_DIR, 'img_cache');
  const assetsDir = path.join(TEMP_DIR, 'assets');
  let fetchCalled = false;
  const fetchSpy = async () => {
    fetchCalled = true;
    throw new Error('network must not be called when SEDEV_FORCE_OFFLINE=1');
  };

  try {
    const logos = await resolveBrandLogos(['salesforce', 'openai', 'typescript'], {
      cacheDir,
      forceOffline: true,
      fetchImpl: fetchSpy
    });
    assert.equal(fetchCalled, false);
    assert.equal(logos.length, 3);
    for (const logo of logos) {
      assert.equal(logo.fallback, true);
      assert.ok(fs.existsSync(logo.file));
      assert.match(logo.dataUri, /^data:image\/svg\+xml;base64,/);
    }

    const img = await fetchImageForQuery('software market decline', {
      cacheDir,
      forceOffline: true,
      fetchImpl: fetchSpy
    });
    assert.equal(fetchCalled, false);
    assert.equal(img.fallback, true);
    assert.ok(fs.existsSync(img.file));
    assert.match(img.dataUri, /^data:image\/svg\+xml;base64,/);

    const media = await resolvePlanMediaAssets({
      overlays: [{ id: 'ov_1', style: 'logo_grid', text: 'SAAS', logos: ['salesforce', 'hubspot'] }],
      brolls: [{ id: 'br_1', props: { imageQuery: 'market decline' } }]
    }, { assetsDir }, { cacheDir, forceOffline: true, fetchImpl: fetchSpy });

    assert.equal(media.overlays.get('ov_1').logos.length, 2);
    assert.match(media.brolls.get('br_1').image, /^data:image\/svg\+xml;base64,/);
    assert.ok(fs.existsSync(path.join(assetsDir, 'br_1_image.svg')));
  } finally {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  }
});

test('auto_image_fetcher validates headers/bytes and rejects HTML error payloads', async () => {
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  const cacheDir = path.join(TEMP_DIR, 'img_cache_html');
  try {
    assert.equal(detectImageFormat(Buffer.from('<html><body>404</body></html>')), null);
    const pngHeader = Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), Buffer.alloc(32)]);
    assert.deepEqual(detectImageFormat(pngHeader), { ext: '.png', mimeType: 'image/png' });

    const htmlFetch = async () => ({
      ok: true,
      headers: { get: () => 'text/html' },
      arrayBuffer: async () => Buffer.from('<html>not an image</html>')
    });
    const logo = await fetchBrandLogo('salesforce', {
      cacheDir,
      noCache: true,
      fetchImpl: htmlFetch
    });
    // Must fall back safely to local SVG instead of accepting HTML bytes.
    assert.equal(logo.fallback, true);
    assert.equal(logo.mimeType, 'image/svg+xml');
  } finally {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  }
});

test('auto_sfx_fetcher normalizes audio to 48kHz mono PCM16 and handles offline fallback', async () => {
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  const sfxCache = path.join(TEMP_DIR, 'sfx_cache');
  fs.mkdirSync(sfxCache, { recursive: true });
  try {
    const catalog = ensureSfxCatalogAssets();
    assert.ok(catalog.sounds.length >= 21);

    const rawTone = path.join(TEMP_DIR, 'stereo_44k.wav');
    const normalizedWav = path.join(TEMP_DIR, 'norm_48k_mono.wav');
    runFFmpeg([
      '-y', '-f', 'lavfi', '-i', 'sine=frequency=440:sample_rate=44100:duration=0.3',
      '-ac', '2', '-c:a', 'pcm_s16le', rawTone
    ]);
    const norm = normalizeAudioToWav(rawTone, normalizedWav);
    assert.equal(norm.info.sampleRate, 48000);
    assert.equal(norm.info.channels, 1);
    assert.equal(norm.info.bitsPerSample, 16);

    await assert.rejects(() => fetchAndNormalizeUrl('https://example.com/a.wav', normalizedWav, { forceOffline: true }), /SEDEV_FORCE_OFFLINE=1/);

    const fallback = await resolveSfx('zxq_unknown_sound_999', { cacheDir: sfxCache, forceOffline: true });
    assert.equal(fallback.fallback, true);
    assert.ok(fs.existsSync(fallback.file));
    const info = readWavInfo(fallback.file);
    assert.equal(info.sampleRate, 48000);
    assert.equal(info.channels, 1);
    assert.equal(info.bitsPerSample, 16);
  } finally {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  }
});
