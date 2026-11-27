const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const TEMPLATES = path.join(ROOT, 'animaciones/templates');

function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
}

function registeredScripts() {
  const html = fs.readFileSync(path.join(TEMPLATES, 'scene_runner.html'), 'utf8');
  return {
    html,
    scripts: Array.from(html.matchAll(/<script src="([^"]+)"/g)).map((m) => m[1])
  };
}

test('every component type in demo and legacy manifests is registered', () => {
  const { scripts } = registeredScripts();
  const manifests = [
    'animaciones/manifests/demo_motion_hook.json',
    'animaciones/manifests/editorial_explainer_demo.json',
    'animaciones/manifests/pilotos/piloto_01_lava_lamps.json',
    'animaciones/manifests/pilotos/piloto_03_redis.json'
  ];

  for (const rel of manifests) {
    const manifest = readJson(rel);
    assert.ok(Array.isArray(manifest.scenes) && manifest.scenes.length > 0, `${rel} must have scenes`);
    for (const scene of manifest.scenes) {
      assert.ok(scene.type, `${rel} scene ${scene.id} needs a type`);
      const expected = `components/${scene.type}.js`;
      if (scene.type === 'stage_scene' || scene.type === 'stage_3d_scene') continue;
      assert.ok(
        scripts.includes(expected),
        `${rel}: scene type "${scene.type}" is not loaded by scene_runner.html (${expected})`
      );
    }
  }
});

test('new motion core loads before utilities and icons before animator', () => {
  const { scripts } = registeredScripts();
  const core = scripts.indexOf('components/motion_core.js');
  const utils = scripts.indexOf('components/motion_utils.js');
  const icons = scripts.indexOf('components/icons_sedev.js');
  const animator = scripts.indexOf('components/icons_animated.js');
  const hook = scripts.indexOf('components/hook_impact.js');
  assert.ok(core >= 0 && utils >= 0 && core < utils, 'motion_core must load before motion_utils');
  assert.ok(icons >= 0 && animator >= 0 && icons < animator, 'icons_sedev must load before icons_animated');
  assert.ok(hook >= 0, 'hook_impact must be registered');
});

test('legacy manifest props are preserved verbatim', () => {
  const manifest = readJson('animaciones/manifests/pilotos/piloto_01_lava_lamps.json');
  const hook = manifest.scenes[0];
  assert.equal(hook.type, 'kinetic_slam');
  assert.equal(hook.props.lines[1].highlight, '#fbbf24');
  assert.equal(hook.props.lines[1].textColor, '#050505');
  assert.equal(manifest.scenes[2].props.leftCode.includes('Math.random()'), true);
  assert.equal(manifest.scenes.length, 5);
});

test('demo manifest uses the new capabilities across 3-5s scenes', () => {
  const manifest = readJson('animaciones/manifests/demo_motion_hook.json');
  assert.equal(manifest.scenes.length, 3);
  assert.equal(manifest.output, 'animaciones/output_clips/demo_motion_hook.mp4');
  assert.equal(manifest.scenes[0].type, 'hook_impact');
  assert.ok(manifest.scenes[0].props.icon, 'demo hook needs an animated icon');
  assert.ok(manifest.scenes[0].props.metric, 'demo hook needs a metric beat');
  for (const scene of manifest.scenes) {
    assert.ok(scene.duration >= 3 && scene.duration <= 5, `${scene.id} must stay in the 3-5s hook range`);
  }
  assert.equal(manifest.scenes[2].props.cameraMode, 'focus_pan');
});

test('fonts are self-hosted variable files without per-weight duplicates', () => {
  const dir = path.join(ROOT, 'animaciones/assets/fonts');
  const fonts = fs.readdirSync(dir).filter((f) => f.endsWith('.woff2')).sort();
  assert.deepEqual(fonts, ['jetbrains-mono-variable.woff2', 'plus-jakarta-sans-variable.woff2']);
  const html = fs.readFileSync(path.join(TEMPLATES, 'scene_runner.html'), 'utf8');
  assert.ok(/font-weight:\s*200 800/.test(html), 'Plus Jakarta range must be declared');
  assert.ok(/font-weight:\s*400 800/.test(html), 'JetBrains range must be declared');
  assert.equal(/-700\.woff2|-800\.woff2|-900\.woff2/.test(html), false, 'no per-weight duplicates in CSS');
});

test('new rendering code contains no time or random sources', () => {
  const files = [
    'animaciones/templates/components/motion_core.js',
    'animaciones/templates/components/icons_animated.js',
    'animaciones/templates/components/kinetic_slam.js',
    'animaciones/templates/components/hook_impact.js',
    'animaciones/templates/components/architecture_flow.js',
    'animaciones/templates/components/editorial_explainer.js',
    'animaciones/templates/overlay_word_by_word.html',
    'animaciones/templates/overlay_editorial.html'
  ];
  for (const rel of files) {
    const code = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    assert.equal(/Date\.now/.test(code), false, `${rel} must not use Date.now`);
    assert.equal(/Math\.random/.test(code), false, `${rel} must not use Math.random`);
    assert.equal(/performance\.now/.test(code), false, `${rel} must not use performance.now`);
  }
});

test('voiceover_motion manifests avoid // slop and differ visually across consecutive videos', () => {
  const vo1 = readJson('animaciones/manifests/vo_01_race_condition.json');
  const vo2 = readJson('animaciones/manifests/vo_02_cloudflare_regex.json');
  for (const manifest of [vo1, vo2]) {
    assert.equal(manifest.format, 'voiceover_motion');
    for (const scene of manifest.scenes) {
      const p = scene.props || {};
      assert.equal(p.editorial, true, `${manifest.slug} ${scene.id} must enable editorial mode`);
      for (const field of ['badge', 'indexLabel', 'title', 'subtitle', 'kicker']) {
        if (typeof p[field] === 'string') {
          assert.equal(p[field].includes('//'), false, `${manifest.slug} ${scene.id}.${field} must not contain "//"`);
        }
      }
    }
  }
  assert.notEqual(vo1.ground, vo2.ground, 'consecutive voiceover_motion videos must use different grounds');
  assert.notEqual(vo1.accent, vo2.accent, 'consecutive voiceover_motion videos must use different accents');
});
