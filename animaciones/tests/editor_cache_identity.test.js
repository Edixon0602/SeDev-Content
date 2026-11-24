const test = require('node:test');
const assert = require('node:assert');
const path = require('path');
const fs = require('fs');

const CacheManager = require('../engine/cache_manager');
const { SceneRenderer, SCENE_TEMPLATE } = require('../editor/scene_renderer');
const { editorCodeFingerprint, PROJECT_ROOT } = require('../editor/utils');

const ROOT = path.resolve(__dirname, '../..');

test('asset cache identity includes CRF and editor code', () => {
  const cacheDir = path.join(ROOT, 'animaciones/editor_runs/_cache_identity');
  fs.mkdirSync(cacheDir, { recursive: true });
  try {
    const mgr = new CacheManager(cacheDir, { projectRoot: ROOT });
    const scene = { id: 'identity_test', type: 'editorial_explainer', duration: 1.8, props: { variant: 'transform', headline: 'X' } };
    const component = path.join(ROOT, 'animaciones/templates/components/editorial_explainer.js');
    const h0 = SceneRenderer.prototype.hashFor.call({}, mgr, scene, SCENE_TEMPLATE, component, 30, 'scene_runner', 0);
    const h18 = SceneRenderer.prototype.hashFor.call({}, mgr, scene, SCENE_TEMPLATE, component, 30, 'scene_runner', 18);
    const h18b = SceneRenderer.prototype.hashFor.call({}, mgr, scene, SCENE_TEMPLATE, component, 30, 'scene_runner', 18);
    assert.match(h0, /^[0-9a-f]{12}$/);
    assert.notEqual(h0, h18, 'CRF must participate in the asset hash');
    assert.equal(h18, h18b);
    assert.match(editorCodeFingerprint(), /^[0-9a-f]{16}$/);
    assert.ok(fs.existsSync(SCENE_TEMPLATE));
  } finally {
    fs.rmSync(cacheDir, { recursive: true, force: true });
  }
});
