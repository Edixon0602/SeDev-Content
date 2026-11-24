#!/usr/bin/env node
// CLI: npm run edit:auto -- <video> [opciones]

const { runEditorPipeline } = require('./pipeline');
const { PlanValidationError } = require('./plan_schema');

const USAGE = `
Editor automático SeDev · talking head y motion graphics vertical

Uso:
  npm run edit:auto -- <ruta_video_o_audio> [opciones]

Opciones:
  --mode <talking_head|motion>  Modo de edición (default: talking_head).
                                motion: sin talking head, 100% motion graphics + Pixabay + voice-over.
  --seed <valor>           Semilla determinista para variación de estilo en --mode motion.
  --plan-only              Transcribe y genera/valida edit_plan.json sin renderizar.
  --resume                 Reutiliza transcript, plan y assets válidos del run.
  --plan <ruta.json>       Monta un plan revisado sin volver a planificar.
  --transcript <ruta.json> Usa un transcript existente (revisión/tests; evita ASR).
  --planner <local|llm>    Planner determinista local o adaptador LLM (default: auto).
  --no-sfx                 Desactiva la capa de efectos de sonido.
  --no-camera              Desactiva los movimientos de cámara.
  --no-captions            No quema subtítulos ASS.
  --no-overlays            No genera overlays transparentes.
  --no-brolls              No genera B-rolls (solo talking head + resto de capas).
  --fps <n>                FPS de salida (default: FPS de entrada o 30, 12-60).
  --crf <n>                Calidad H.264 (default: 18).
  --out <ruta.mp4>         Salida final (default: <run>/final.mp4).
  --run-dir <dir>          Directorio de trabajo alternativo.
  --whisper-model <m>      Modelo faster-whisper (default: small).
  --whisper-language <l>   Idioma (default: auto).
  --sfx-catalog <ruta>     Catálogo SFX alternativo.
  --allow-fixture-plan     Solo tests/fixtures: permite source.hash distinto o ausente.
  --no-cache              Regenera assets visuales aunque exista caché.
  --force                  Ignora la caché de transcripción.
  --verbose                Más detalle en consola.
  --help                   Muestra esta ayuda.

Variables de entorno del planner LLM (opcionales):
  SEDEV_LLM_BASE_URL, SEDEV_LLM_MODEL, SEDEV_LLM_API_KEY, SEDEV_LLM_TIMEOUT_MS
  Sin ellas se usa el planner local determinista.

Entorno ASR aislado:
  npm run edit:setup        Crea animaciones/editor/.venv e instala faster-whisper
`;

function parseArgs(argv) {
  const options = { video: null, whisper: {} };
  const valueFlags = new Set([
    '--mode', '--seed', '--plan', '--transcript', '--planner', '--fps', '--crf', '--out', '--run-dir',
    '--whisper-model', '--whisper-language', '--sfx-catalog'
  ]);
  const booleanFlags = new Set([
    '--plan-only', '--resume', '--no-sfx', '--no-camera', '--no-captions', '--no-overlays',
    '--no-brolls', '--no-cache', '--force', '--verbose', '--help', '-h', '--allow-fixture-plan'
  ]);
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (valueFlags.has(arg)) {
      const value = argv[i + 1];
      if (value === undefined || value.startsWith('--')) throw new Error(`Falta el valor de ${arg}`);
      i++;
      if (arg === '--mode') options.mode = value;
      else if (arg === '--seed') options.seed = value;
      else if (arg === '--plan') options.planPath = value;
      else if (arg === '--transcript') options.transcriptPath = value;
      else if (arg === '--planner') options.plannerMode = value;
      else if (arg === '--fps') options.fps = Number(value);
      else if (arg === '--crf') options.crf = Number(value);
      else if (arg === '--out') options.out = value;
      else if (arg === '--run-dir') options.runDir = value;
      else if (arg === '--whisper-model') options.whisper.model = value;
      else if (arg === '--whisper-language') options.whisper.language = value;
      else if (arg === '--sfx-catalog') options.sfxCatalogPath = value;
    } else if (booleanFlags.has(arg)) {
      if (arg === '--help' || arg === '-h') options.help = true;
      else if (arg === '--plan-only') options.planOnly = true;
      else if (arg === '--resume') options.resume = true;
      else if (arg === '--no-sfx') options.noSfx = true;
      else if (arg === '--no-camera') options.noCamera = true;
      else if (arg === '--no-captions') options.noCaptions = true;
      else if (arg === '--no-overlays') options.noOverlays = true;
      else if (arg === '--no-brolls') options.noBrolls = true;
      else if (arg === '--no-cache') options.noCache = true;
      else if (arg === '--force') options.force = true;
      else if (arg === '--verbose') options.verbose = true;
      else if (arg === '--allow-fixture-plan') options.allowFixturePlan = true;
    } else if (arg.startsWith('-')) {
      throw new Error(`Opción desconocida: ${arg}`);
    } else if (!options.video) {
      options.video = arg;
    } else {
      throw new Error(`Argumento inesperado: ${arg}`);
    }
  }
  return options;
}

async function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (err) {
    console.error(`\nError: ${err.message}\n${USAGE}`);
    process.exit(1);
  }
  if (options.help) {
    console.log(USAGE);
    return;
  }
  if (!options.video) {
    console.error(USAGE);
    process.exit(1);
  }
  if (options.fps !== undefined && (!Number.isFinite(options.fps) || options.fps < 12 || options.fps > 60)) {
    console.error('Error: --fps debe ser un número entre 12 y 60.');
    process.exit(1);
  }
  if (options.crf !== undefined && (!Number.isFinite(options.crf) || options.crf < 0 || options.crf > 51)) {
    console.error('Error: --crf debe estar entre 0 y 51.');
    process.exit(1);
  }
  if (options.plannerMode && !['auto', 'local', 'llm'].includes(options.plannerMode)) {
    console.error('Error: --planner debe ser local, llm o auto.');
    process.exit(1);
  }
  if (options.mode && !['talking_head', 'motion'].includes(options.mode)) {
    console.error('Error: --mode debe ser talking_head o motion.');
    process.exit(1);
  }

  try {
    const result = await runEditorPipeline(options);
    if (result.planOnly) {
      console.log('\n✔ Plan listo para revisar. No se ha renderizado ningún MP4.');
      console.log(`  Transcript: ${result.transcriptPath}`);
      console.log(`  Plan:       ${result.planPath}`);
      return;
    }
    if (!result.ok) {
      console.error('\n✖ El MP4 se generó, pero el QA final falló. Revisa qa_report.json antes de usarlo.');
      console.error(`  MP4: ${result.finalPath}`);
      console.error(`  QA:  ${result.qaPath}`);
      process.exit(2);
    }
    console.log('\n✔ Edición completada.');
    console.log(`  MP4:  ${result.finalPath}`);
    console.log(`  Plan: ${result.planPath}`);
    console.log(`  QA:   ${result.qaPath}`);
    console.log(`  Run:  ${result.runDir}`);
  } catch (err) {
    if (err instanceof PlanValidationError) {
      console.error(`\n✖ ${err.message}`);
      console.error('Corrige edit_plan.json o vuelve a planificar sin --plan.');
      process.exit(1);
    }
    if (err.code === 'WHISPER_UNAVAILABLE') {
      console.error(`\n✖ ${err.message}`);
      process.exit(1);
    }
    console.error(`\n✖ ${err.message}`);
    if (options.verbose && err.stack) console.error(err.stack);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { parseArgs, USAGE };
