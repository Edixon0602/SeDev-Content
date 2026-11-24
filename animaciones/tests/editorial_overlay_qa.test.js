const test = require('node:test');
const assert = require('node:assert');
const path = require('path');
const { spawnSync } = require('child_process');

const { runOverlayQA } = require('../editor/qa_overlay');
const { resolveChrome } = require('../editor/scene_renderer');
const { makeOfflineBrandLogoSvg, makeOfflineEditorialIllustrationSvg } = require('../editor/auto_image_fetcher');

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

test('editorial overlay has real bounds, alpha and clean close', { skip, timeout: 180000 }, async () => {
  const outDir = path.join(ROOT, 'animaciones/debug_frames/editorial_overlay_test');
  const report = await runOverlayQA({
    outDir,
    reportPath: path.join(outDir, 'qa_overlay_report.json')
  });
  assert.equal(report.ok, true, JSON.stringify({ errors: report.errors, samples: report.samples.map((s) => ({ text: s.text, bounds: s.bounds, alpha: s.alpha })) }));
  assert.equal(report.samples.length, 3);
  for (const sample of report.samples) {
    assert.equal(sample.bounds.ok, true);
    assert.equal(sample.alpha.ok, true);
    assert.ok(sample.alpha.last < 1);
  }
});

test('all 6 v2 overlay styles pass bounds, alpha and clean close QA', { skip, timeout: 180000 }, async () => {
  const outDir = path.join(ROOT, 'animaciones/debug_frames/editorial_overlay_v2_test');
  const img = makeOfflineEditorialIllustrationSvg('software market decline');
  const imageUri = `data:${img.mimeType};base64,${img.buffer.toString('base64')}`;
  const logos = ['salesforce', 'hubspot', 'notion', 'slack'].map((slug) => {
    const l = makeOfflineBrandLogoSvg(slug);
    return { slug: l.slug, name: l.name, color: l.color, dataUri: `data:${l.mimeType};base64,${l.buffer.toString('base64')}` };
  });
  const samples = [
    { style: 'hook_kinetic', text: '¿EL FIN DEL SAAS?', highlight: 'EL SAAS', icon: 'cloud_slash', position: 'top', duration: 2.0 },
    { style: 'image_card', text: 'LA INDUSTRIA GIRA', _resolvedImage: imageUri, position: 'top', duration: 2.0 },
    { style: 'logo_grid', text: 'LOS GIGANTES SE QUEDAN', _resolvedLogos: logos, position: 'top', duration: 2.0 },
    { style: 'icon_pop', text: 'SOFTWARE A MEDIDA', icon: 'custom_code', position: 'bottom', duration: 1.8 },
    { style: 'icon_pop', text: '', icon: 'ai_agent', position: 'top', duration: 1.6 },
    { style: 'split_card', text: 'AGENTES O A MEDIDA', items: [{ label: 'AGENTES IA', icon: 'ai_agent' }, { label: 'SOFTWARE A MEDIDA', icon: 'custom_code' }], position: 'bottom', duration: 2.0 },
    { style: 'cta_debate', text: '¿TÚ QUÉ OPINAS?', icon: 'comment_debate', position: 'bottom', duration: 1.8 }
  ];
  const report = await runOverlayQA({
    outDir,
    reportPath: path.join(outDir, 'qa_overlay_v2_report.json'),
    samples
  });
  assert.equal(report.ok, true, JSON.stringify({ errors: report.errors, samples: report.samples.map((s) => ({ text: s.text, bounds: s.bounds, alpha: s.alpha })) }));
  assert.equal(report.samples.length, 7);
  for (const sample of report.samples) {
    assert.equal(sample.bounds.ok, true, `${sample.text} bounds failed`);
    assert.equal(sample.alpha.ok, true, `${sample.text} alpha failed`);
    assert.ok(sample.alpha.last < 1, `${sample.text} alpha.last=${sample.alpha.last}`);
  }
});
