#!/usr/bin/env node
// Creates animaciones/editor/.venv and installs faster-whisper inside it.
// No global packages, no installs outside the project. If Python or pip is
// missing, exit non-zero with concrete instructions.

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { PROJECT_ROOT } = require('./utils');
const { whisperPaths } = require('./whisper');

function run(bin, args, options = {}) {
  process.stdout.write(`\n$ ${bin} ${args.join(' ')}\n`);
  const result = spawnSync(bin, args, {
    cwd: PROJECT_ROOT,
    env: {
      ...process.env,
      PIP_CACHE_DIR: path.join(PROJECT_ROOT, 'animaciones', 'editor', '.cache', 'pip')
    },
    stdio: options.capture ? 'pipe' : 'inherit',
    encoding: 'utf8',
    windowsHide: true
  });
  if (result.error && result.error.code === 'ENOENT') {
    throw new Error(`No se encontró "${bin}". Instala Python 3.10+ y añádelo al PATH.`);
  }
  if (result.error) throw result.error;
  if (result.status !== 0) {
    const detail = options.capture ? `${result.stdout || ''}\n${result.stderr || ''}`.trim() : '';
    throw new Error(`"${bin} ${args.join(' ')}" falló (exit ${result.status}). ${detail}`);
  }
  return result;
}

function findPython() {
  const candidates = [];
  if (process.env.PYTHON) candidates.push(process.env.PYTHON);
  candidates.push(process.platform === 'win32' ? 'python' : 'python3', 'python');
  for (const candidate of candidates) {
    const probe = spawnSync(candidate, ['--version'], { encoding: 'utf8', windowsHide: true });
    if (!probe.error && probe.status === 0) {
      return { bin: candidate, version: `${probe.stdout || ''}${probe.stderr || ''}`.trim() };
    }
  }
  return null;
}

function main() {
  const args = process.argv.slice(2);
  const prepareModel = args.includes('--prepare-model');
  const modelIndex = args.indexOf('--model');
  const model = modelIndex >= 0 && args[modelIndex + 1]
    ? args[modelIndex + 1]
    : (process.env.SEDEV_WHISPER_MODEL || 'small');
  const paths = whisperPaths(PROJECT_ROOT);
  if (!fs.existsSync(paths.requirements)) {
    throw new Error(`No existe ${paths.requirements}`);
  }
  const python = findPython();
  if (!python) {
    throw new Error('Python 3.10+ no está disponible. Instálalo y vuelve a ejecutar npm run edit:setup.');
  }
  console.log(`Python: ${python.bin} (${python.version})`);
  console.log(`Entorno aislado: ${paths.venvDir}`);

  if (!fs.existsSync(paths.python)) {
    run(python.bin, ['-m', 'venv', paths.venvDir]);
  } else {
    console.log('El entorno virtual ya existe; se reutiliza.');
  }
  run(paths.python, ['-m', 'pip', 'install', '--upgrade', 'pip']);
  run(paths.python, ['-m', 'pip', 'install', '-r', paths.requirements]);
  const check = run(paths.python, ['-c', 'import faster_whisper; print(faster_whisper.__version__)'], { capture: true });
  const version = (check.stdout || '').trim();
  console.log(`\n✔ faster-whisper ${version} instalado en ${paths.venvDir}`);
  if (prepareModel) {
    const prepareScript = path.join(paths.base, 'python', 'prepare_model.py');
    run(paths.python, [prepareScript, '--model', model, '--model-dir', paths.modelDir]);
    console.log(`✔ Modelo ${model} preparado para uso offline.`);
  }
  if (!prepareModel) {
    console.log('La primera transcripción descargará el modelo dentro de:');
    console.log(`  ${paths.modelDir}`);
    console.log('Para descargarlo ahora: npm run edit:setup -- --prepare-model');
  }
  console.log('Para otro modelo usa SEDEV_WHISPER_MODEL y --whisper-model.');
}

main();
