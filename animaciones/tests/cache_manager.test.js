const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const CacheManager = require('../engine/cache_manager');

const createdDirs = [];

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, 'utf8');
}

function makeProject() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'sedev-cache-'));
  createdDirs.push(root);
  write(path.join(root, 'animaciones/templates/scene_runner.html'), '<html>runner</html>');
  write(path.join(root, 'animaciones/templates/components/motion_core.js'), 'window.MotionCore = {};');
  write(path.join(root, 'animaciones/templates/components/motion_utils.js'), 'window.motionUtils = {};');
  write(path.join(root, 'animaciones/templates/components/icons_sedev.js'), 'window.__ICONS__ = {};');
  write(path.join(root, 'animaciones/templates/components/icons_animated.js'), 'window.SedevIconAnim = {};');
  write(path.join(root, 'animaciones/templates/components/components_b2b.css'), '.a{color:#fff}');
  write(path.join(root, 'animaciones/templates/components/fake_component.js'), 'window.registerComponent("fake", {});');
  write(path.join(root, 'animaciones/templates/components/nested/deep_core.js'), 'window.deepCore = 1;');
  write(path.join(root, 'animaciones/templates/rig/rng.js'), 'window.rng = 1;');
  write(path.join(root, 'animaciones/templates/rig/nested/ik.js'), 'window.ik = 1;');
  write(path.join(root, 'animaciones/templates/lib/three_bundle.js'), 'window.THREE = {};');
  write(path.join(root, 'animaciones/templates/lib/draco/draco.wasm'), 'wasm-v1');
  write(path.join(root, 'animaciones/assets/models/model.glb'), 'glb-v1');
  write(path.join(root, 'animaciones/assets/fonts/font.woff2'), 'woff2-v1');
  return root;
}

const scene = { id: 's01', type: 'kinetic_slam', duration: 4, props: { icon: 'terminal' } };

test('same scene + same files produce the same hash', () => {
  const root = makeProject();
  const cache = new CacheManager(path.join(root, 'cache'), { projectRoot: root });
  const template = path.join(root, 'animaciones/templates/scene_runner.html');
  const component = path.join(root, 'animaciones/templates/components/kinetic_slam.js');
  write(component, 'component-v1');

  const h1 = cache.computeSceneHash(scene, template, component);
  const h2 = cache.computeSceneHash(scene, template, component);
  assert.equal(h1, h2);
  assert.equal(h1.length, 12);
});

test('scene data changes invalidate the hash', () => {
  const root = makeProject();
  const cache = new CacheManager(path.join(root, 'cache'), { projectRoot: root });
  const template = path.join(root, 'animaciones/templates/scene_runner.html');
  const component = path.join(root, 'animaciones/templates/components/kinetic_slam.js');
  write(component, 'component-v1');

  const h1 = cache.computeSceneHash(scene, template, component);
  const h2 = cache.computeSceneHash({ ...scene, duration: 5 }, template, component);
  assert.notEqual(h1, h2);
});

test('shared motion core edits invalidate the hash', () => {
  const root = makeProject();
  const cache = new CacheManager(path.join(root, 'cache'), { projectRoot: root });
  const template = path.join(root, 'animaciones/templates/scene_runner.html');
  const component = path.join(root, 'animaciones/templates/components/kinetic_slam.js');
  write(component, 'component-v1');
  const before = cache.computeSceneHash(scene, template, component);

  fs.appendFileSync(path.join(root, 'animaciones/templates/components/motion_core.js'), '\n/* ease update */');
  const after = cache.computeSceneHash(scene, template, component);
  assert.notEqual(before, after, 'motion_core.js must participate in the hash');
});

test('animated icon layer edits invalidate the hash', () => {
  const root = makeProject();
  const cache = new CacheManager(path.join(root, 'cache'), { projectRoot: root });
  const template = path.join(root, 'animaciones/templates/scene_runner.html');
  const component = path.join(root, 'animaciones/templates/components/kinetic_slam.js');
  write(component, 'component-v1');
  const before = cache.computeSceneHash(scene, template, component);

  fs.appendFileSync(path.join(root, 'animaciones/templates/components/icons_animated.js'), '\n/* icon beat */');
  const after = cache.computeSceneHash(scene, template, component);
  assert.notEqual(before, after, 'icons_animated.js must participate in the hash');
});

test('shared CSS and rig edits invalidate the hash', () => {
  const root = makeProject();
  const cache = new CacheManager(path.join(root, 'cache'), { projectRoot: root });
  const template = path.join(root, 'animaciones/templates/scene_runner.html');
  const component = path.join(root, 'animaciones/templates/components/kinetic_slam.js');
  write(component, 'component-v1');
  const before = cache.computeSceneHash(scene, template, component);

  fs.appendFileSync(path.join(root, 'animaciones/templates/components/components_b2b.css'), '\n.b{color:#000}');
  const afterCss = cache.computeSceneHash(scene, template, component);
  assert.notEqual(before, afterCss, 'shared CSS must participate in the hash');

  fs.appendFileSync(path.join(root, 'animaciones/templates/rig/rng.js'), '\nwindow.rng = 2;');
  const afterRig = cache.computeSceneHash(scene, template, component);
  assert.notEqual(afterCss, afterRig, 'rig dependencies must participate in the hash');
});

test('adding a new shared dependency file invalidates the hash', () => {
  const root = makeProject();
  const cache = new CacheManager(path.join(root, 'cache'), { projectRoot: root });
  const template = path.join(root, 'animaciones/templates/scene_runner.html');
  const component = path.join(root, 'animaciones/templates/components/kinetic_slam.js');
  write(component, 'component-v1');
  const before = cache.computeSceneHash(scene, template, component);

  write(path.join(root, 'animaciones/templates/components/brand_new_core.js'), 'window.newCore = {};');
  const after = cache.computeSceneHash(scene, template, component);
  assert.notEqual(before, after, 'new shared component files must invalidate the hash');
});

test('explicit dependencies detect creation of a previously missing file', () => {
  const root = makeProject();
  const missing = path.join(root, 'animaciones/templates/components/future_core.js');
  const cache = new CacheManager(path.join(root, 'cache'), {
    projectRoot: root,
    sharedDependencies: [missing]
  });
  const template = path.join(root, 'animaciones/templates/scene_runner.html');
  const component = path.join(root, 'animaciones/templates/components/kinetic_slam.js');
  write(component, 'component-v1');

  const before = cache.computeSceneHash(scene, template, component);
  write(missing, 'window.futureCore = {};');
  const after = cache.computeSceneHash(scene, template, component);
  assert.notEqual(before, after);
});

test('nested libs, assets, models and fonts invalidate the hash', () => {
  const root = makeProject();
  const template = path.join(root, 'animaciones/templates/scene_runner.html');
  const component = path.join(root, 'animaciones/templates/components/kinetic_slam.js');
  write(component, 'component-v1');
  const cache = new CacheManager(path.join(root, 'cache'), { projectRoot: root });
  const before = cache.computeSceneHash(scene, template, component);

  fs.appendFileSync(path.join(root, 'animaciones/templates/lib/draco/draco.wasm'), 'v2');
  const afterWasm = cache.computeSceneHash(scene, template, component);
  assert.notEqual(before, afterWasm, 'nested lib wasm must invalidate');

  fs.appendFileSync(path.join(root, 'animaciones/assets/models/model.glb'), 'v2');
  const afterModel = cache.computeSceneHash(scene, template, component);
  assert.notEqual(afterWasm, afterModel, 'GLB model must invalidate');

  fs.appendFileSync(path.join(root, 'animaciones/assets/fonts/font.woff2'), 'v2');
  const afterFont = cache.computeSceneHash(scene, template, component);
  assert.notEqual(afterModel, afterFont, 'font file must invalidate');

  fs.appendFileSync(path.join(root, 'animaciones/templates/components/nested/deep_core.js'), '// v2');
  const afterNested = cache.computeSceneHash(scene, template, component);
  assert.notEqual(afterFont, afterNested, 'nested component must invalidate');
});

test('fps identity changes the scene hash', () => {
  const root = makeProject();
  const template = path.join(root, 'animaciones/templates/scene_runner.html');
  const component = path.join(root, 'animaciones/templates/components/kinetic_slam.js');
  write(component, 'component-v1');
  const cache = new CacheManager(path.join(root, 'cache'), { projectRoot: root });
  const h30 = cache.computeSceneHash(scene, template, component, [], { fps: 30 });
  const h60 = cache.computeSceneHash(scene, template, component, [], { fps: 60 });
  assert.notEqual(h30, h60);
});

test('deleting a previously cached dependency invalidates the hash', () => {
  const root = makeProject();
  const template = path.join(root, 'animaciones/templates/scene_runner.html');
  const component = path.join(root, 'animaciones/templates/components/kinetic_slam.js');
  write(component, 'component-v1');
  const cache = new CacheManager(path.join(root, 'cache'), { projectRoot: root });
  const before = cache.computeSceneHash(scene, template, component);
  fs.unlinkSync(path.join(root, 'animaciones/assets/models/model.glb'));
  const after = cache.computeSceneHash(scene, template, component);
  assert.notEqual(before, after);
});

test('cache path and hit detection are stable', () => {
  const root = makeProject();
  const cache = new CacheManager(path.join(root, 'cache'), { projectRoot: root });
  const p = cache.getCachePath(scene, 'abcdef123456');
  assert.ok(p.endsWith('s01_abcdef123456.mp4'));
  assert.equal(cache.isCached(p), false);
  fs.writeFileSync(p, Buffer.alloc(2048, 1));
  assert.equal(cache.isCached(p), true);
});

test.after(() => {
  for (const dir of createdDirs) {
    try { fs.rmSync(dir, { recursive: true, force: true }); } catch (err) { /* ignore */ }
  }
});
