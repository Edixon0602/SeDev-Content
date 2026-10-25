const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const baseDir = path.resolve('animaciones/manifests/biblioteca_2026');
const playerPath = 'file:///' + path.resolve('animaciones/player.html').replace(/\\/g, '/');

(async () => {
  console.log(`\n======================================================`);
  console.log(`🧪 VERIFICACIÓN COMPLETA DE LOS 40 VÍDEOS EN CHROME`);
  console.log(`======================================================\n`);

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--hide-scrollbars', '--disable-gpu']
  });

  const page = await browser.newPage();
  let pageErrors = [];
  page.on('pageerror', err => {
    console.error('❌ BROWSER ERROR:', err.message);
    pageErrors.push(err.message);
  });

  await page.goto(playerPath);

  const topicFolders = fs.readdirSync(baseDir).filter(f => fs.statSync(path.join(baseDir, f)).isDirectory());

  let passed = 0;
  let failed = 0;

  for (const folder of topicFolders) {
    const folderPath = path.join(baseDir, folder);
    const manifests = ['manifest_var_a.json', 'manifest_var_b.json'];

    for (const mfName of manifests) {
      const mfPath = path.join(folderPath, mfName);
      if (!fs.existsSync(mfPath)) continue;

      const manifestData = JSON.parse(fs.readFileSync(mfPath, 'utf8'));
      pageErrors = [];

      try {
        await page.evaluate((data) => {
          window.loadManifestData(data);
        }, manifestData);

        // Scrub through key points: start, mid, end
        const dur = manifestData.scenes.reduce((acc, s) => acc + (s.duration || 5.0), 0);
        await page.evaluate((t) => window.seek(t), 1.0);
        await page.evaluate((t) => window.seek(t), dur * 0.5);
        await page.evaluate((t) => window.seek(t), dur - 1.0);

        if (pageErrors.length === 0) {
          console.log(`✔ [OK] ${manifestData.title} (${dur.toFixed(1)}s, ${manifestData.scenes.length} escenas)`);
          passed++;
        } else {
          console.log(`❌ [FAIL] ${manifestData.title}: ${pageErrors.join('; ')}`);
          failed++;
        }
      } catch (err) {
        console.log(`❌ [EXCEPTION] ${manifestData.title}: ${err.message}`);
        failed++;
      }
    }
  }

  await browser.close();

  console.log(`\n------------------------------------------------------`);
  console.log(`RESULTADO FINAL: ${passed}/40 Pasados (${failed} Fallidos)`);
  console.log(`------------------------------------------------------\n`);

  if (failed > 0) process.exit(1);
})();
