# Editor automático SeDev (talking head)

MVP del editor descrito en `PLAN_EDITOR_AUTOMATIZADO.md`. Recibe un talking head
vertical ya limpio y produce un MP4 con B-rolls editoriales, overlays
transparentes, subtítulos ASS, cámara moderada y SFX locales, dejando todos los
artefactos intermedios revisables.

## Requisitos

- Node.js 22+ (el repo ya usa `node --test`).
- FFmpeg y FFprobe en `PATH` (o `FFMPEG_PATH` / `FFPROBE_PATH`).
- Chrome/Chromium para el motor de escenas (`CHROME_PATH` o la ruta habitual de
  Windows).
- Python 3.10+ **solo** si vas a transcribir con Whisper. El entorno se crea
  dentro del proyecto; no se instala nada global.

## Instalación

```bash
npm install                 # dependencias Node existentes
npm run edit:sfx            # regenera la librería SFX local (determinista)
npm run edit:setup          # crea animaciones/editor/.venv e instala faster-whisper
npm run edit:prepare-model  # descarga el modelo small dentro del proyecto (offline después)
```

`edit:setup` instala `faster-whisper` y fija `av<16`: faster-whisper 1.2.x
llama a `av.open(..., metadata_errors=...)`, API que PyAV 16+ eliminó. El modelo
se descarga la primera vez en `animaciones/editor/.models/` (no en el perfil
del usuario). Usa `edit:prepare-model` para dejarlo listo antes de la primera
transcripción; después el pipeline no necesita red.

Si no instalas Whisper puedes seguir usando el pipeline con un transcript
existente:

```bash
npm run edit:auto -- "C:\ruta\toma final.mp4" \
  --transcript "animaciones/editor/fixtures/transcript.short.json" \
  --plan "animaciones/editor/fixtures/plan.short.json" --allow-fixture-plan
```

## Uso

```bash
# Flujo completo (transcribe + planifica + renderiza + monta + QA)
npm run edit:auto -- "C:\videos\toma final.mp4"

# Solo transcripción + plan revisable, sin MP4
npm run edit:auto -- "C:\videos\toma final.mp4" --plan-only

# Reutilizar transcripción, plan y assets de una ejecución anterior
npm run edit:auto -- "C:\videos\toma final.mp4" --resume

# Montar un edit_plan.json revisado a mano (debe coincidir source.hash)
npm run edit:auto -- "C:\videos\toma final.mp4" --plan "animaciones\editor_runs\<slug>\edit_plan.json"

# Controles de capas
npm run edit:auto -- "C:\videos\toma final.mp4" --no-sfx --no-camera --no-captions
```

Opciones principales: `--plan-only`, `--resume`, `--plan <json>`,
`--transcript <json>`, `--planner local|llm|auto`, `--no-sfx`, `--no-camera`,
`--no-captions`, `--no-overlays`, `--no-brolls`, `--fps`, `--crf`,
`--out`, `--run-dir`, `--whisper-model`, `--whisper-language`, `--sfx-catalog`,
`--allow-fixture-plan` (solo fixtures/tests), `--no-cache`, `--force`,
`--verbose`.

## Artefactos por vídeo

```text
animaciones/editor_runs/<slug>/
  source/            audio 16k y JSON crudo de Whisper
  transcript.json
  edit_plan.json
  manifests/         un manifiesto SeDev por B-roll y overlay
  assets/
  renders/           broll_*.mp4 y overlay_*.mov (alfa real)
  subtitles.ass
  mix/               temporales propios (se limpian al terminar cada asset)
  final.mp4
  qa_report.json
  qa/frames/         fotogramas antes/durante/después de B-roll y overlay
  qa/contact_sheet.jpg
  state.json         cache de etapas para --resume
```

La salida se escribe primero como `final.editing.mp4`, se comprueba con FFprobe
y solo entonces se renombra a `final.mp4`. Un fallo no borra un MP4 anterior
válido. La caché de escenas vive en `animaciones/output_clips/cache/editor/` y
usa el `CacheManager` existente (manifiesto + component + fuentes + assets).

## Pipeline

1. **Inspección**: FFprobe valida vídeo, audio, duración, resolución y FPS.
2. **Transcripción**: audio mono 16 kHz → faster-whisper local con timestamps por
   palabra. Caché por ruta/tamaño/mtime/modelo/idioma. Si falta el entorno, el
   proceso falla con instrucciones; nunca inventa texto.
3. **Plan**: planner determinista local o adaptador LLM; el JSON se valida antes
   de renderizar (rangos, solapes, duración de lectura, densidad, IDs SFX,
   props serializables). Los overlays se anclan al instante en que se pronuncia
   su frase; si la idea cae sobre un B-roll se permite composición inferior
   legible, nunca se adelanta el texto. Los B-rolls se recortan a los límites de
   su idea/pausa. Las cámaras solo se colocan en pausas con hueco suficiente; si
   no existe una pausa razonable, se omiten.
4. **Assets**: B-rolls con `editorial_explainer` y overlays `overlay_editorial`
   (qtrle/argb). Se reutiliza caché y se verifica que cada asset cubra su
   intervalo.
5. **Subtítulos**: ASS 1080×1920, 1–2 líneas, margen inferior 330, resaltado
   sobrio. Por defecto no se dibujan sobre B-roll a pantalla completa.
6. **Montaje**: un único FFmpeg compone línea base (talking head + B-roll),
   overlays, ASS, voz + SFX (sidechain + `loudnorm`), y exporta H.264/yuv420p
   + AAC 48 kHz.
7. **QA**: códec, pix_fmt, dimensiones, FPS, duración, audio, alfa de overlays,
   captions con diálogos cuando hay habla, SFX con stem `sfx_bus.wav` separando
   `present` (stem+ventana final) de `audible` (delta local > 0.05 dB), B-roll/
   overlay/cámara con capturas antes/durante/después y comparación SSIM contra
   el frame original en el mismo tiempo, `source.hash` para planes revisados y
   hoja de contactos. La cámara solo se marca OK si se aplicó el filtro, la
   fuente tiene textura suficiente y el frame final difiere del original; si no,
   queda como no verificada. Una voz dinámica puede dejar `sfxAudible = null` y
   una limitación explícita sin rechazar una mezcla correcta.

## Contrato del plan

`edit_plan.json` es datos, no prosa libre. Ejemplo abreviado:

```json
{
  "version": "1",
  "source": { "video": "...", "duration": 24.499, "width": 1080, "height": 1920, "fps": 30 },
  "transcript": { "language": "es", "text": "..." },
  "captions": {
    "enabled": true, "maxCharsPerLine": 32, "maxLines": 2,
    "minDuration": 0.8, "overBroll": false, "highlightWords": ["facturación"]
  },
  "brolls": [{
    "id": "broll_1", "start": 2.0, "end": 5.2,
    "concept": "transformación: tres pasos",
    "narrative": "Mostrar tres pasos convertidos en una línea.",
    "component": "editorial_explainer",
    "props": {
      "variant": "transform", "kicker": "TRANSFORMACIÓN",
      "headline": "TRES PASOS MANUALES", "support": "Una sola línea.",
      "accent": "#d08a5a", "ground": "graphite"
    }
  }],
  "overlays": [{ "id": "overlay_1", "start": 7.0, "end": 8.7, "text": "TRES PASOS", "position": "top" }],
  "cameras": [{ "id": "camera_1", "start": 9.0, "end": 10.8, "type": "push", "intensity": 0.55 }],
  "sfx": [{ "id": "sfx_1", "at": 2.02, "sound": "soft_whoosh", "gainDb": -18, "reason": "Entrada del B-roll" }]
}
```

Variantes de `editorial_explainer`: `transform`, `comparison`, `flow`, `cause`,
`detail`. Props permitidas: `variant`, `kicker`, `headline`, `support`, `accent`,
`ground` (`graphite|ivory`), `figure`, `label`.

Límites: 6 B-rolls, 8 overlays, 10 cámaras, 12 SFX; cobertura de B-roll ≤45%,
cámara ≤35%; B-roll 1.2–6 s; overlay ≤42 caracteres y duración de lectura
mínima; cámaras solo sobre talking head; SFX solo IDs del catálogo.

## Planner LLM opcional

Sin variables de entorno se usa el planner local (offline, determinista). Para
un endpoint compatible con OpenAI:

```bash
set SEDEV_LLM_BASE_URL=http://127.0.0.1:1234/v1
set SEDEV_LLM_MODEL=qwen2.5-14b-instruct
set SEDEV_LLM_API_KEY=...        # opcional para servidores locales
npm run edit:auto -- "toma.mp4" --planner llm
```

No hay claves hardcodeadas. Si el LLM devuelve JSON inválido o un plan fuera de
rango, la ejecución falla antes de generar assets/MP4.

## Lenguaje visual `editorial_explainer`

Componente nuevo en `templates/components/editorial_explainer.js`, registrado en
`scene_runner.html`. Una idea dominante y una metáfora por escena; grafito o
marfil, blanco cálido y un único acento terracota. Sin dashboards, telemetría,
tags decorativos ni métricas inventadas. Tipografía local Plus Jakarta Sans;
JetBrains Mono no se usa para relleno. Para los subtítulos ASS se incluyen
derivados TTF de las mismas fuentes locales y el filtro `ass` recibe
`fontsdir`, de modo que libass no caiga en una fuente del sistema. Movimiento
determinista y sin bucles.

Licencias locales de fuentes: `animaciones/assets/fonts/OFL-PlusJakartaSans.txt`
y `OFL-JetBrainsMono.txt` (SIL OFL 1.1, tomadas de los repositorios oficiales
de los proyectos; no se inventaron textos).

Demo y QA:

```bash
npm run qa:editorial              # bounds, fuentes, determinismo + capturas
npm run qa:editorial:motion       # early/settle/close no congelados (SSIM)
npm run qa:overlay:editorial      # bounds, alpha y cierre del overlay
npm run render:editorial-demo     # output_clips/editorial_explainer_demo.mp4
```

Manifiesto: `animaciones/manifests/editorial_explainer_demo.json` (5 escenas,
18.4 s). Capturas: `animaciones/debug_frames/editorial_explainer/`.

## SFX

`animaciones/editor/sfx/catalog.json` declara id, archivo, duración, categoría,
tags, ganancia, licencia y origen. Los WAV son **originales**, sintetizados por
`sfx/generate_sfx.js` con semillas fijas (CC0-1.0). No hay scraping ni descargas.
`npm run edit:sfx` los regenera byte a byte.

## Pruebas

```bash
npm test                  # suite completa, incluida la integración offline
npm run test:editor       # suite completa del editor (unitarios + integración + QA visual)
npm run test:integration  # vídeo sintético + montaje + FFprobe + QA
```

La integración crea un vídeo sintético en
`animaciones/editor_runs/_integration_fixture/` (ruta con espacio), usa
fixtures de transcript/plan, renderiza B-roll/overlay reales y comprueba el MP4
con FFprobe. Se puede omitir con `SEDEV_SKIP_INTEGRATION=1` en máquinas sin
Chrome/FFmpeg.

## Limitaciones conocidas / honestidad

- El repositorio no incluye un talking head real del usuario. La validación
  end-to-end se hizo con (a) un vídeo sintético de test y (b) una locución TTS
  española de Windows (Microsoft Helena) para probar faster-whisper real. No se
  declara validado el resultado editorial final sobre una persona real.
- La salida está fijada a 1080×1920; una entrada horizontal se recorta.
- Los subtítulos se suprimen sobre B-roll salvo `captions.overBroll: true`.
- La normalización es `loudnorm` de una pasada (suficiente para MVP; no es un
  masterizado de dos pasadas).
- `--resume` rechaza la ejecución si cambió la entrada o las opciones; así no
  mezcla artefactos de configuraciones distintas.
- El planner local es conservador y léxico; no sustituye una revisión editorial
  humana. `--plan-only` existe precisamente para esa revisión.
- Si el talking head es una pared lisa o un fondo sin textura, el zoom/pan no
  se puede probar visualmente; el QA lo marca como no verificado y no lo
  declara OK.
- Para cámara, un frame `after` que cae sobre B-roll u otra capa se descarta y
  queda como limitación; la verificación usa la ventana aislada durante +
  SSIM contra la fuente, no un frame contaminado.
- SFX: `present` demuestra que el stem y la mezcla contienen señal; `audible`
  solo se marca si el delta local supera `0.05 dB`. Una voz dinámica puede
  dejar `audible = null` y una limitación sin rechazar una mezcla correcta.
- `--allow-fixture-plan` es solo para fixtures/tests; un plan revisado de
  producción debe coincidir en `source.hash` o falla.
- `--force` obliga a repetir ASR aunque se use `--resume`; el plan se reutiliza
  solo si el nuevo transcript produce la misma clave.

## Estado verificado en este entorno

- `npm test`: 115 tests, 0 fallos (incluye integración offline, unitarios del
  editor, hashes de assets, motion QA del componente, overlay QA, licencias,
  no redundancia overlay/B-roll y reparación de timestamps ASR reales, más la
  suite preexistente).
- `npm run qa:editorial`: fuentes, bounds reales y determinismo OK para las 5
  escenas de `editorial_explainer_demo` (18.4 s, 1080×1920, 30 fps).
- `npm run qa:demo`, `npm run qa:hard`, `npm run qa:overlay` y
  `npm run verify:scene`: OK; `verify:player` sigue fallando por el bundle
  legado, igual que antes de este trabajo.
- Integración offline: vídeo sintético estático (SMPTE bars) de 6.2 s en una
  ruta con espacios, apóstrofo y Unicode; planner local -> B-roll + overlay +
  ASS + SFX; cámara omitida por no haber pausa suficiente, capturas
  before/during/after y QA del MP4 completo OK.
- `qa:editorial:motion`: las 5 variantes evolucionan entre early/settle/close
  (SSIM mínima superada) y genera `contact_sheet.jpg` automáticamente.
  `qa:overlay:editorial`: bounds, alfa y cierre OK.
- ASR real: faster-whisper `small` preparado con `edit:prepare-model`, ejecutado
  también con `HF_HUB_OFFLINE=1`; locución TTS española de 11.39 s con fondo
  texturado. Planner local produjo 1 B-roll, 1 overlay alineado, 1 cámara en
  pausa y 3 SFX; `present=true`, `audible` queda en `null` cuando la voz impide
  aislar el delta. QA completo OK. No es un talking head humano real.

Evidencia local:

- Demo editorial: `animaciones/output_clips/editorial_explainer_demo.mp4` y
  `animaciones/debug_frames/editorial_demo_review/contact_sheet.jpg`.
- Prueba con talking head real autorizado:
  `animaciones/output_clips/talking_head_real_sedev.mp4`.
  - Plan: `animaciones/debug_frames/talking_head_real_sedev_plan.json`.
  - QA: `animaciones/debug_frames/talking_head_real_sedev_qa.json`.
  - Contact sheet: `animaciones/debug_frames/talking_head_real_sedev_contact_sheet.jpg`.
  - Decisiones: 2 B-rolls (`LA CREACIÓN SE FRENA` en 8.95-11.10 y
    `HACIA AGENTES` en 16.20-18.00), sin overlays, sin cámara para no cortar
    frases, 2 whooshes locales. La fuente ya trae palabra destacada quemada;
    se desactiva la capa ASS para no duplicar subtítulos.
  - Técnica: entrada VFR `27800/923` 720×1280 → salida 1080×1920 @30 fps,
    23.10 s, audio AAC 48 kHz; 693 frames, 13 duplicados (1.9%), sin clipping
    (`max_volume -1.5 dB`).
- Montaje con planner local + ASR real:
  `animaciones/output_clips/editor_auto_local_demo.mp4`,
  `animaciones/debug_frames/editor_auto_local_demo_contact_sheet.jpg`,
  `animaciones/debug_frames/editor_auto_local_demo_plan.json` y
  `animaciones/editor_runs/_asr_fixture/local_demo_textured/qa_report.json`.
- Montaje sintético: `animaciones/editor_runs/_integration_fixture/test run with spaces/`
  y `animaciones/debug_frames/editor_integration_plan.json`.
- Overlay QA: `animaciones/debug_frames/editorial_overlay/contact_sheet.jpg`.
- Motion QA: `animaciones/debug_frames/editorial_motion/contact_sheet.jpg`
  (generada automáticamente por `qa:editorial:motion`).
- Licencias OFL verificadas por test:
  `animaciones/assets/fonts/OFL-PlusJakartaSans.txt` y
  `OFL-JetBrainsMono.txt`.
