const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { runEditorialMotionQA } = require('../editor/qa_motion');
const { resolveChrome } = require('../editor/scene_renderer');

const ROOT = path.resolve(__dirname, '../..');
function canRun() {
  if (process.env.SEDEV_SKIP_INTEGRATION === '1') return 'SEDEV_SKIP_INTEGRATION=1';
  const ff = spawnSync(process.env.FFMPEG_PATH || 'ffmpeg', ['-version'], { encoding: 'utf8', windowsHide: true });
  if (ff.error || ff.status !== 0) return 'ffmpeg no disponible';
  try { resolveChrome(); } catch (err) { return err.message; }
  return true;
}
const reason = canRun();
const skip = reason === true ? false : reason;

test('editorial_explainer evolves between early, settle and close', { skip, timeout: 300000 }, async () => {
  const report = await runEditorialMotionQA({
    outDir: path.join(ROOT, 'animaciones/debug_frames/editorial_motion_test'),
    reportPath: path.join(ROOT, 'animaciones/debug_frames/editorial_motion_test/qa_motion_report.json'),
    threshold: 0.0015
  });
  assert.equal(report.ok, true, JSON.stringify(report.scenes));
  assert.equal(report.scenes.length, 5);
  assert.ok(report.contactSheet && fs.existsSync(path.resolve(ROOT, report.contactSheet)));
  for (const scene of report.scenes) {
    assert.ok(scene.diffEarlySettle >= 0.0015, `${scene.id} early/settle froze`);
    assert.ok(scene.diffSettleClose >= 0.0015, `${scene.id} settle/close froze`);
  }
});
