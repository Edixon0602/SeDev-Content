const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function load() {
  const sandbox = { window: {}, console };
  vm.createContext(sandbox);
  for (const file of ['motion_core.js', 'motion_utils.js']) {
    const abs = path.resolve(__dirname, `../templates/components/${file}`);
    vm.runInContext(fs.readFileSync(abs, 'utf8'), sandbox, { filename: abs });
  }
  return sandbox.window.motionUtils;
}

const mu = load();

function finiteCam(cam) {
  for (const key of ['x', 'y', 'rot', 'scale']) {
    assert.ok(Number.isFinite(cam[key]), `${key} is not finite: ${cam[key]}`);
  }
  assert.ok(cam.scale >= 1 && cam.scale <= 1.12);
}

test('camera handles NaN duration/time/props safely', () => {
  finiteCam(mu.calculateCamera(NaN, NaN, null, null));
  finiteCam(mu.calculateCamera(NaN, 5, { cameraMode: 'focus_pan', focusX: NaN, focusY: Infinity }, 'kinetic_slam'));
});

test('camera modes stay within framing limits', () => {
  for (const mode of ['steady', 'push', 'pull_out', 'impact', 'shake_impact', 'focus_pan', 'ratchet_push']) {
    for (let t = 0; t <= 6; t += 0.25) {
      const cam = mu.calculateCamera(t, 5, {
        cameraMode: mode,
        cameraIntensity: 4,
        impactTimes: [0.2, NaN, 1.4],
        focusX: 2,
        focusY: -2,
        pushAmount: 1
      }, 'kinetic_slam');
      finiteCam(cam);
      assert.ok(cam.x >= -48 && cam.x <= 48);
      assert.ok(cam.y >= -64 && cam.y <= 64);
      assert.ok(cam.rot >= -1.5 && cam.rot <= 1.5);
    }
  }
});

test('screen shake handles non-finite inputs', () => {
  const s = mu.getScreenShake(NaN, NaN, NaN, NaN);
  assert.deepEqual(s, { x: 0, y: 0, rot: 0 });
  const s2 = mu.getScreenShake(1.01, 1.0, 0.35, 10);
  assert.ok(Number.isFinite(s2.x) && Number.isFinite(s2.y));
});
