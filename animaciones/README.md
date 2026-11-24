# Motor de Motion SeDev

Documentación de las capacidades añadidas al motor de motion graphics vertical
(1080×1920, matte `#050505`, JetBrains Mono / Plus Jakarta Sans). El render sigue
siendo determinista: cada frame depende solo de `t`, `props` y RNG sembrado.

## Comandos

```bash
npm test                    # tests unitarios + estáticos (texto, cámara, cache, manifiestos)
npm run qa:demo             # demo + casos difíciles: fuentes, bounds reales, determinismo
npm run qa:hard             # solo manifiesto de casos difíciles
npm run qa:overlay          # render + QA del overlay transparente (qtrle/argb)
npm run render:demo         # renderiza la demo completa a MP4 (ffmpeg)
npm run render:demo:scene   # renderiza solo la primera escena de la demo
npm run render:overlay      # genera overlay_word_by_word.mov en output_clips
npm run verify:scene        # QA de escenas (fonts + consola + capturas)
npm run verify:player       # QA del player legado (estado actual: FALLA, ver abajo)
npm run verify              # honesto: escenas + player; falla si el player falla
```

Salidas principales:

- `animaciones/output_clips/demo_motion_hook.mp4`
- `animaciones/output_clips/overlay_word_by_word.mov`
- `animaciones/debug_frames/qa_motion/` + `qa_motion_report.json`
- `animaciones/debug_frames/qa_hard/` + `qa_hard_report.json`
- `animaciones/debug_frames/overlay_v2/` + `overlay_v2_report.json`
- `animaciones/manifests/demo_motion_hook.json`
- `animaciones/manifests/qa_hard_cases.json`

### Editor automático de talking head

El editor descrito en `PLAN_EDITOR_AUTOMATIZADO.md` vive en `animaciones/editor/`
y se documenta en [`animaciones/editor/README.md`](editor/README.md).

```bash
npm run edit:setup              # entorno aislado faster-whisper (una vez)
npm run edit:prepare-model      # descarga el modelo small dentro del proyecto
npm run edit:sfx                # regenera la librería SFX local determinista
npm run edit:auto -- "toma.mp4" --plan-only
npm run edit:auto -- "toma.mp4"
npm run test:editor
npm run test:integration
npm run qa:editorial
npm run qa:editorial:motion
npm run qa:overlay:editorial
npm run render:editorial-demo
```

Salidas nuevas:

- `animaciones/editor_runs/<slug>/final.mp4` + `qa_report.json` + artefactos
- `animaciones/output_clips/editorial_explainer_demo.mp4`
- `animaciones/debug_frames/editorial_explainer/`

El componente `editorial_explainer` (grafito/marfil, una idea por escena, un
acento, sin telemetría) se registra en `scene_runner.html` junto a los
componentes existentes; no modifica `premium_film` ni los técnicos.

### Estado de `verify:player` (preexistente)

`verify:player` falla porque `all_manifests_bundle.js` contiene entradas sin
`manifest.scenes` y `player.html` asume ese campo. No se reescribió el player.
`verify:scene` sí pasa; `npm run verify` falla de forma honesta mientras el
player siga roto.

## Núcleo de motion

`templates/components/motion_core.js` expone `window.MotionCore`:

- easings: `linear`, `outCubic`, `outQuint`, `outExpo`, `inOutExpo`, `inOutSine`,
  `outBack`, `smoothstep`, etc.
- `progress(t, start, dur, ease)`: progreso normalizado y clampado.
- `enter()` / `exit()` / `envelope()`: descriptores de entrada, salida y fade de escena.
- `beat(t, at, decay)` / `pulse(t, hz, phase)`: beats de impacto y osciladores deterministas.
- `seeded(seed)`: PRNG reproducible (mulberry32) si un efecto necesita variación.
- utilidades canvas: `layoutWords`, `drawWords`, `strokePath`, `pointOnPath`, `arc`,
  `bracket`, `dashedLine`.

Regla: no usar `Date.now`, `Math.random` ni `performance.now` durante el render.
`MotionCore.ensureFonts()` carga y comprueba todas las caras antes del primer
frame. Las fuentes son locales (`assets/fonts/*.woff2`), sin Google Fonts ni red.

### Texto seguro

`motionUtils.fitText` ya no dibuja fuera de `maxWidth` al llegar al tamaño mínimo:
recorta con ellipsis real. `wrapText`/`fitParagraph` parten palabras sin espacios
por caracteres y limitan líneas con ellipsis. `MotionCore.layoutHeadline` calcula
líneas visuales, tamaños y baselines para 5+ líneas, palabras largas y highlights
sin invadir la tarjeta/panel. `hook_impact` reparte los tags en hasta dos filas;
`kinetic_slam` comprime el reloj en escenas cortas.

### Fuentes y primer frame

`scene_runner.html` declara dos fuentes variables locales:
Plus Jakarta Sans `wght 200–800` y JetBrains Mono `wght 400–800`
(verificado inspeccionando la tabla `fvar` de los WOFF2). No se guardan
duplicados por peso; las peticiones por encima del máximo (canvas `900`) son
sintetizadas por el navegador. `render_full_video.js` espera `ensureFonts()`
antes de la primera escena y antes de cada escena; si una cara falta, falla el
render en vez de producir un MP4 con fallback.

### Cámara narrativa

`motionUtils.calculateCamera` acepta:

| Prop | Valores | Efecto |
| --- | --- | --- |
| `cameraMode` | `steady`, `push`, `pull_out`, `impact`, `focus_pan`, `ratchet_push` | Modo de cámara |
| `cameraIntensity` | `0..1.6` (default 1) | Amplitud segura |
| `impactTimes` / `impactTime` | array / number | Beats de impacto |
| `focusX`, `focusY` | `-1..1` | Dirección del pan (modo `focus_pan`) |
| `pushAmount` | `0..0.06` recomendado | Magnitud del push/pull |
| `ratchetBeats` | array de tiempos | Pasos del `ratchet_push` |

Los límites están clampados: `x ∈ [-48,48]`, `y ∈ [-64,64]`, `rot ∈ [-1.5°,1.5°]`,
`scale ∈ [1.0,1.12]`.

## Iconos animados

`templates/components/icons_animated.js` reutiliza el catálogo SVG de
`icons_sedev.js` y lo anima por partes:

```js
const icon = window.SedevIconAnim.create(container, {
  name: 'terminal',      // cualquier clave de window.__ICONS__
  size: 126,
  color: '#fbbf24',
  mode: 'auto',          // auto | draw | assemble | pulse | orbit
  start: 0.55,
  dur: 0.48,
  left: 85, top: 748
});
icon.update(t, { exitAt: duration - 0.32 });
```

- `draw`: revela trazos con `stroke-dashoffset` y aparece el relleno al final.
- `assemble`: piezas escalonadas con opacidad y escala.
- `pulse`: entrada uniforme + respiración controlada.
- `orbit`: entrada con asentamiento rotacional corto (sin giro infinito).
- `auto`: elige el modo por hash del nombre del icono, así no todos se mueven igual.

## `kinetic_slam`

Conserva `badge`, `lines[{text,color,highlight,textColor,strike}]`, `stat`,
`subtitle`, `voiceover`. Nuevas props opcionales:

| Prop | Uso |
| --- | --- |
| `icon`, `iconColor`, `iconMode`, `iconSize` | Icono vectorial animado |
| `accent`, `danger` | Acentos semánticos |
| `indexLabel` | Etiqueta superior derecha |
| `beats` / `beatTimes` | Riel de beats inferior |
| `statLabel` | Etiqueta del panel de impacto |

Timeline: impacto de la primera línea desde el frame 0, revelado palabra por
palabra, caja highlight con wipe, strike/subrayado como beat secundario, panel
con slots discretos y salida deliberada con shutter de acento.
Cada línea con `highlight` se mantiene como una sola unidad visual (se reduce el
tamaño si hace falta); `line.fontSize` actúa como preferencia/acotación segura.

## `hook_impact` (nuevo showcase)

Componente de hook de alto impacto (3–5 s) que combina kicker, tipografía
escalonada, icono animado, tarjeta de métrica con contador, barras de señal,
tags de prueba, geometría de encuadre y riel de beats.

```json
{
  "type": "hook_impact",
  "duration": 4.5,
  "props": {
    "badge": "AUTOMATIZACIÓN // FACTURAS",
    "indexLabel": "01 / SIGNAL",
    "kicker": "EL COSTO OCULTO",
    "lines": [
      { "text": "3 HORAS", "color": "#ffffff" },
      { "text": "POR FACTURA", "highlight": "#fbbf24", "textColor": "#050505" }
    ],
    "metric": { "from": 0, "value": 3, "suffix": "H", "label": "TIEMPO MANUAL" },
    "note": "Un webhook de 400 ms reemplaza la tarea completa.",
    "tags": ["WEBHOOK", "IDEMPOTENTE", "0 EXCEL"],
    "icon": "terminal",
    "iconMode": "draw",
    "accent": "#fbbf24",
    "cameraMode": "impact",
    "impactTimes": [0, 0.55, 1.06]
  }
}
```

## `architecture_flow` por eventos

Mantiene `layout: vertical | horizontal | split`, `nodes`, `finalColor`, y
restaura compatibilidad:
- `props.header`: cabecera DOM `.scene-category` sobre el canvas.
- `node.y`: posición vertical personalizada (clamp 150–770), con validación de
  colisión: cada caja exige `Δy ≥ alto + 10px` y quedar dentro de 150–830.
- Vertical soporta **2–6 nodos** con altura y spacing dinámicos.
- Horizontal soporta **2–4 nodos**; split **≤4**. Más nodos, solapes o
  geometría fuera del área segura lanzan un error explícito.
- Eventos: nodos con reveal recortado, rieles dibujados, paquetes de un solo
  recorrido, pico de cola, resolución con ack y drenaje discreto 8→3 slots.
  La resolución se comprime para escenas cortas (mínimo práctico: 2.5 s).

## Caché

`engine/cache_manager.js` recorre recursivamente y hashea:

- el manifiesto de escena (`scene`),
- `scene_runner.html` y el componente de la escena,
- **todas** las dependencias compartidas: `templates/components/**/*.js|*.css`,
  `templates/rig/**/*.js`, `templates/lib/**/*` (Three.js, Draco anidado) y
  `assets/**/*` (modelos GLB, texturas, fuentes WOFF2),
- la identidad de render (`fps`, motor/plantilla) como quinto argumento opcional
  de `computeSceneHash(..., extraDeps, identity)`.

Cualquier cambio, creación o borrado invalida el clip. Los digests se cachean
por `mtime+ctime+size` dentro del proceso. SHA-256 truncado a 12 caracteres.
Cobertura en `animaciones/tests/cache_manager.test.js`.

## QA

`engine/qa_capture.js`:

- carga un manifiesto real en `scene_runner.html`,
- captura 6 tiempos por escena (inicio, beats, settle, cierre),
- falla con errores de página/consola y `requestfailed`,
- comprueba **bounds reales dibujados** con `qa_instrument.js` en **cada tiempo
  capturado** (texto, rects, imágenes, paths y transform actual), incluyendo
  clip activo y `globalAlpha`/color transparente; reporta el tiempo exacto,
- comprueba DOM (`canvas`, capas de iconos, `#archHeader`, `.scene-category`)
  contra el stage 1080×1920 en cada tiempo,
- valida fuentes antes del primer render y compara el primer frame de una página
  nueva contra el de una recarga,
- comprueba determinismo (mismo `t` dos veces y reload),
- incluye un **detector self-test**: inyecta overflow solo en un beat intermedio
  y exige que se marque exactamente ese tiempo, no los limpios.

Límites del instrumentado: `Path2D` pasado a `fill(path)`/`stroke(path)` no expone
bounds y se omite; arcos parciales usan el bounding box del círculo completo
(conservador); las imágenes se miden por su rect destino, no por sus píxeles.

```bash
npm run qa:demo
npm run qa:hard
node animaciones/engine/qa_capture.js animaciones/manifests/pilotos/piloto_01_lava_lamps.json --scene 0
```

Los casos difíciles incluyen 5 líneas, palabra sin espacios, stat/subtítulo
largos, 7 tags, duración corta y arquitectura de 6 nodos con `header`/`node.y`.

## Overlay transparente

`templates/overlay_word_by_word.html` es un overlay 1080×1920 sin cards ni blur,
situado en el tercio inferior. Usa fuentes locales, `MotionCore` y
`icons_animated.js` (3 iconos con modos draw/assemble), beats de entrada,
highlight con wipe, subrayado como segundo beat y salida que termina en alpha 0.

`engine/render_overlay_qa.js`:

- renderiza frames reales con Puppeteer (`omitBackground`),
- codifica QuickTime **qtrle/argb**,
- verifica codec, `pix_fmt`, `width=1080`, `height=1920`, `fps=30`, frames y
  duración con ffprobe (todo forma parte de `report.ok`),
- mide alpha real en impacto/lectura/cierre y exige **alpha 0** en el último frame,
- captura inicio/impacto/wipe/lectura/cierre sin duplicar frames por tolerancia,
- falla con errores de page/console/requestfailed o fuentes no listas,
- escribe solo en `output_clips` y `debug_frames`, nunca en el Escritorio.

## Película editorial `premium_film`

`manifest: demo_premium_30s.json` · salida: `output_clips/demo_premium_30s.mp4`

Una sola protagonista: una cuerda gruesa de cerámica. Empieza como nudo
trébol, se tensa en penumbra, se desenreda, resuelve en un anillo que se apoya
en un suelo de yeso y cierra con la marca. Sin dashboards, cards, métricas,
grids, iconos ni neón: luz de estudio, blancos cálidos, grises minerales y un
único acento terracota.

- 6 capítulos + cierre en 30.0s, un solo componente y un único canvas 1080×1920.
- 900 frames deterministas: cada valor es función de `t`; sin `Date.now`,
  `Math.random` ni red. Malla de tubo sombreada por software (quads + luz
  relativa a cámara, sin WebGL) y grano sembrado una sola vez.
- Cámara y encuadre propios por capítulo (general, macro del canto, contrapicado
  oscuro, plano de producto), cortes unidos por un leve lift de exposición.
- Tipografía local Plus Jakarta Sans, integrada en negativo; sin animar el texto
  con zoom.

```bash
npm run qa:premium       # fuentes, bounds, determinismo + capturas de control
npm run render:premium   # 900 frames → output_clips/demo_premium_30s.mp4
```

## Compatibilidad y límites

- Los manifiestos existentes siguen cargando; los props antiguos se conservan.
- `__PUPPETEER_CAPTURE__` y `window.renderFrame(t)` no cambian.
- `render_full_video.js` elimina salida previa/staging al inicio, escribe a un
  `.rendering.mp4` y solo renombra a la salida final al terminar; limpia
  temporales en `finally`. Falla ante pageerror/console error/requestfailed; no
  genera un MP4 “exitoso” con una escena corrupta.
- Los iconos animados usan una capa DOM/SVG sobre el canvas; si se renderiza
  fuera del `scene_runner` hay que incluir `motion_core.js`, `icons_sedev.js` e
  `icons_animated.js`.
- Límites explícitos: vertical ≤6 nodos, horizontal ≤4, split ≤4. Duraciones
  menores a 1 s se rechazan; para hooks se recomienda ≥2.4 s y para arquitectura
  ≥2.5 s.
- El QA de bounds mide lo que dibuja el canvas y los elementos DOM principales;
  no inspecciona píxel a píxel cada glifo (la defensa de texto es
  `fitText`/`fitParagraph`/`layoutHeadline`).
- `verify:player` sigue fallando por el bundle legado; `npm run verify` falla a
  propósito mientras eso ocurra.

