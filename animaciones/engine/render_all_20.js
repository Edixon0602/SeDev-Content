const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const manifestsDir = path.resolve('animaciones/manifests');
const files = fs.readdirSync(manifestsDir)
  .filter(f => f.startsWith('sedev_') && f.endsWith('.json') && f !== 'sedev_19_pgbouncer_1000_conexiones.json')
  .sort();

const CONCURRENCY = 4;
let currentIdx = 0;
let completed = 0;
const total = files.length;

console.log(`======================================================`);
console.log(`🚀 RENDERIZANDO ${total} VÍDEOS RESTANTES (${CONCURRENCY} WORKERS EN PARALELO)`);
console.log(`======================================================\n`);

function runNext() {
  if (currentIdx >= total) return Promise.resolve();
  const file = files[currentIdx++];
  const relPath = path.join('animaciones/manifests', file);
  const startTime = Date.now();

  console.log(`▶ [START ${currentIdx}/${total}] ${file}`);

  return new Promise((resolve) => {
    const child = spawn(process.execPath, ['animaciones/engine/render_full_video.js', relPath, '--no-cache'], {
      stdio: ['ignore', 'pipe', 'pipe']
    });

    let errLog = '';
    child.stderr.on('data', d => { errLog += d.toString(); });

    child.on('close', (code) => {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      completed++;
      if (code === 0) {
        console.log(`✔ [DONE ${completed}/${total}] ${file} (${elapsed}s)`);
      } else {
        console.error(`✖ [FAIL ${completed}/${total}] ${file} (code ${code}):\n${errLog}`);
      }
      resolve(runNext());
    });
  });
}

async function main() {
  const workers = [];
  for (let i = 0; i < Math.min(CONCURRENCY, total); i++) {
    workers.push(runNext());
  }
  await Promise.all(workers);
  console.log(`\n======================================================`);
  console.log(`🎉 TODOS LOS 20 VÍDEOS MP4 ESTÁN RENDERIZADOS EN animaciones/output_clips/`);
  console.log(`======================================================`);
}

main();
