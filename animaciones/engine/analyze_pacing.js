global.window = {};
const fs = require('fs');
eval(fs.readFileSync('animaciones/manifests/all_manifests_bundle.js', 'utf8'));
const catalog = window.__BIBLIOTECA_2026__;

catalog.forEach((item) => {
  console.log(`\n======================================================`);
  console.log(`VIDEO #${item.num} - ${item.slug} (Total actual: ${item.duration}s)`);
  console.log(`======================================================`);
  let totalWords = 0;
  item.manifest.scenes.forEach((s, sIdx) => {
    const text = s.voiceover || '';
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const count = words.length;
    totalWords += count;
    const dur = s.duration;
    const wpm = (count / dur) * 60;
    // Comfortable Spanish speech rate for video voiceover: 125-135 WPM (~2.1 - 2.2 words/sec) + breathing pauses (0.5 - 1.0s)
    const idealDur = Math.max(dur, (count / 2.1) + 1.0);
    console.log(`  [E${sIdx + 1}] ${s.type.padEnd(16)} | dur: ${dur}s -> ${count} pal (${wpm.toFixed(0)} WPM) | Ideal: ${idealDur.toFixed(1)}s`);
    console.log(`       "${text}"`);
  });
  console.log(`  TOTAL PALABRAS: ${totalWords} | Duración actual: ${item.duration}s | Ritmo global: ${((totalWords / item.duration) * 60).toFixed(0)} WPM`);
});
