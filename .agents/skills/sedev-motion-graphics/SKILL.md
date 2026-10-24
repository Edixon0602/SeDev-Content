---
name: sedev-motion-graphics
description: >-
  Guía y especificación técnica para diseñar y renderizar clips animados minimalistas (B-rolls de 8-10s en MP4 y Overlays Cinéticos Transparentes de 3s en .MOV ARGB)
  para el contenido de SeDev. Úsalo para crear nuevas animaciones web y exportarlas con el pipeline determinista de Puppeteer y FFmpeg,
  garantizando cero AI-slop, cero bucles accidentales y estética sobria de ingeniería.
---

# SeDev Motion Graphics: Guía de Estética y Motor de Renderizado

Esta skill define las reglas de diseño visual, la arquitectura del código y el flujo de trabajo para crear dos tipos de piezas visuales en formato vertical (`1080×1920`):
1. **B-rolls Técnicos de Cuerpo Completo (`8.0s`, MP4 H.264 sobre `#050505`)** para explicar arquitectura de sistemas.
2. **Overlays Cinéticos Transparentes (`3.0s`, `.MOV` QuickTime Animation `qtrle` `argb`)** palabra tras palabra (*word-by-word*) para hooks sobre vídeo de cámara (*talking head*).

---

## 1. Reglas Inquebrantables de Diseño (Zero AI-Slop)

Cualquier clip generado bajo este estándar debe cumplir estrictamente:

- ❌ **PROHIBIDO:**
  - Encabezados corporativos estáticos o textos de infografía (ej. *"SeDev Architecture"*, subtítulos explicativos largos). La voz del creador ya explica el concepto; el video es apoyo visual dinámico.
  - Widgets falsos de dashboard, paneles de telemetría flotantes con números gigantes y barras de estado simuladas.
  - Puntos brillantes flotando (*glowing particles*), estelas de neón, degradados arcoíris o resplandores exagerados.
  - Emojis, calaveras o íconos infantiles.
- ✅ **OBLIGATORIO (Estética Minimalista / Linear / Dieter Rams):**
  - **Fondo:** Negro puro mate (`#050505`). Sin degradados de fondo ni viñetas.
  - **Trazos:** Líneas vectoriales nítidas y finas de `1.0px` a `1.5px` en escala de grises (`#ffffff`, `#71717a`, `#3f3f46`, `#27272a`).
  - **Tipografía:** Monospace sobria (`JetBrains Mono`). Etiquetas breves y en mayúsculas (`PRODUCER`, `QUEUE BUFFER`, `CONSUMER`).
  - **Uso estricto del color de acento:** El 95% del clip es monocromático. Solo se permite un color de acento para comunicar estado técnico:
    - Rojo discreto (`#ef4444`): Overflow, bloqueo, error, paquete descartado (*DROPPED*).
    - Ámbar discreto (`#f59e0b`): Pausa, espera, señal de retorno (*PAUSE*).
    - Blanco puro o verde (`#ffffff` / `#10b981`): Flujo saludable, estado estable (*STEADY STATE*).
  - **Movimiento mecánico y discreto:** Bloques geométricos limpios (rectángulos o cuadrados sólidos) moviéndose por carriles vectoriales finos y encajando en ranuras discretas (`1/6`, `2/6` ... `6/6`), en lugar de líquidos o partículas continuas.

---

## 2. Especificaciones Técnicas de Salida

- **Resolución:** `1080 × 1920 px` (formato vertical 9:16 para TikTok, Reels y Shorts).
- **Duración estándar:** `8.0 segundos` (dividido en 4s de conflicto/problema y 4s de resolución/control).
- **Framerate:** `30 fps` (240 cuadros en total para render ultrarrápido en ~20s) o `60 fps` para máxima fluidez.
- **Códec:** `H.264 / MP4` (`yuv420p`, compatibilidad 100% nativa en CapCut, Premiere, DaVinci y móviles).

---

## 3. Estructura de Archivos del Proyecto

```text
animaciones/
├── templates/                 # Plantillas HTML/Canvas independientes
│   └── p08_backpressure.html  # Archivo editable y previsualizable en Chrome
├── output_clips/              # Carpeta de salida de los videos MP4 exportados
│   └── p08_backpressure.mp4   # Video final listo para edición
└── render_video.js            # Motor automatizado (Puppeteer-Core + FFmpeg)
```

---

## 4. Contrato de Código en cada Plantilla HTML

Toda plantilla HTML en `animaciones/templates/<nombre>.html` debe implementar:

1. **Canvas de 1080×1920:**
   ```html
   <canvas id="canvas" width="1080" height="1920"></canvas>
   ```
2. **Función global determinista `window.renderFrame(timeInSeconds)`:**  
   Permite a Puppeteer avanzar el reloj fotograma a fotograma sin perder ni un solo frame:
   ```javascript
   window.renderFrame = function(time) {
     const t = time % 8.0; // ciclo de 8 segundos
     ctx.clearRect(0, 0, 1080, 1920);
     if (t < 4.0) {
       renderConflict(t); // Fase 1: El problema / desborde / colisión
     } else {
       renderResolution(t - 4.0); // Fase 2: El patrón arquitectónico / solución
     }
   };
   ```
3. **Bucle interactivo de navegador:**  
   Para que al abrir el `.html` con doble clic en Chrome se reproduzca en vivo en tiempo real para iterar el diseño en 2 segundos:
   ```javascript
   let start = null;
   function loop(now) {
     if (!start) start = now;
     window.renderFrame((now - start) / 1000);
     requestAnimationFrame(loop);
   }
   requestAnimationFrame(loop);
   ```

---

## 5. Primitivas de Dibujo Estándar (Componentes Reutilizables)

Usa siempre las mismas primitivas sobrias para mantener la identidad unificada:

### A. Caja de Nodo Arquitectónico (`drawNode`)
```javascript
function drawNode(ctx, x, y, label, sublabel, strokeColor = '#ffffff') {
  const w = 380, h = 120;
  ctx.fillStyle = '#0a0a0a';
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 1.5;
  ctx.fillRect(x - w / 2, y - h / 2, w, h);
  ctx.strokeRect(x - w / 2, y - h / 2, w, h);

  ctx.fillStyle = '#ffffff';
  ctx.font = '700 26px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(label, x, y - 8);

  ctx.fillStyle = strokeColor === '#ffffff' ? '#71717a' : strokeColor;
  ctx.font = '500 18px "JetBrains Mono", monospace';
  ctx.fillText(sublabel, x, y + 26);
}
```

### B. Ranuras Discretas de Cola o Buffer (`drawQueueSlots`)
```javascript
function drawQueueSlots(ctx, x, y, current, max, color = '#ffffff') {
  const slotW = 54, slotH = 80, spacing = 14;
  const startX = x - (max * slotW + (max - 1) * spacing) / 2;
  for (let i = 0; i < max; i++) {
    const sx = startX + i * (slotW + spacing);
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1;
    ctx.strokeRect(sx, y - slotH / 2, slotW, slotH);
    if (i < current) {
      ctx.fillStyle = color;
      ctx.fillRect(sx + 3, y - slotH / 2 + 3, slotW - 6, slotH - 6);
    }
  }
}
```

### C. Línea de Retorno o Feedback Discontinua (`drawFeedbackLine`)
```javascript
function drawFeedbackLine(ctx, x1, y1, x2, y2, isAlert) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = isAlert ? '#f59e0b' : '#3f3f46';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([8, 6]);
  ctx.stroke();
  ctx.restore();
}
```

---

## 6. Flujo de Iteración Rápida (B-Rolls MP4)

1. **Crear plantilla:** Duplica `animaciones/templates/p08_backpressure.html` con el nuevo nombre (ej. `p03_concurrency.html`).
2. **Ajustar lógica:** Abre el archivo `.html` en Chrome, modifica las posiciones y textos de los nodos en tiempo real con recargas instantáneas.
3. **Exportar a MP4:** Ejecuta el comando en consola:
   ```bash
   node animaciones/render_video.js <nombre_template> [duracion_segundos] [fps]
   ```
   *Ejemplo:* `node animaciones/render_video.js p03_concurrency 8 30`
4. **Verificación:** El archivo final se genera en `animaciones/output_clips/<nombre>.mp4`.

---

## 7. Metodología para Overlays Cinéticos Transparentes (`.MOV` Word-by-Word de 3.0s)

Cuando se requiera un **overlay transparente de texto animado palabra por palabra** para colocar encima del vídeo de cámara en CapCut/Premiere/DaVinci, se deben cumplir estas 5 leyes técnicas y estéticas:

### 7.1. Cero AI-Slop en Overlays
- ❌ **PROHIBIDO:**
  - Tarjetas o cajas de fondo (*cards* oscuras que tapan al hablante).
  - *Eyebrow pill badges* falsos de telemetría (ej. `● DEBATE ECONÓMICO // UBI`).
  - Resplandores de neón (`drop-shadow` de colores brillantes) o sombras Gaussianas difuminadas (`blur > 0px`), ya que al codificar en `qtrle` (`argb`) los píxeles semitransparentes oscuros generan halos grises sucios sobre el vídeo real.
- ✅ **OBLIGATORIO (Estilo Editorial de Alto Contraste):**
  - **Tipografía:** `Plus Jakarta Sans` ExtraBold (`800`), `66px–68px`, tracking compacto (`-0.035em`).
  - **Contorno Vectorial Sólido (Legibilidad en cualquier fondo):**
    ```css
    -webkit-text-stroke: 7px #09090b;
    paint-order: stroke fill;
    filter: drop-shadow(0 5px 0px #09090b); /* 0px blur obligatorio en ARGB */
    ```
  - **Acentos semánticos:** Palabras base en blanco puro (`#ffffff`), entidad clave en terracota/coral (`#ff6b4a`), verbo de acción en oro (`#fbbf24`), y remate en bloque sólido esmeralda (`#10b981` con texto `#052e16` y borde `#09090b`).
  - **Iconos vectoriales con micro-animación secundaria:** Cada línea clave va acompañada de un badge SVG a medida cuya geometría interna se anima tras aparecer (ej. estrella que rota, flecha que se desliza en su carril, billetes que se abren en abanico).

### 7.2. Prevención de Bucles Fantasma (`__PUPPETEER_CAPTURE__` Lock)
- **Causa raíz del bug de bucle:** `page.screenshot({ omitBackground: true })` en Puppeteer tarda ~120ms de tiempo real por fotograma (~11 segundos en capturar 90 frames). Si la plantilla HTML tiene un `requestAnimationFrame(loop)` activo con `elapsed % 3.0`, el reloj real del navegador pisa el estado inyectado por `page.evaluate()`, provocando que una animación de 3s se repita 3 o 4 veces dentro del mismo clip de 3s.
- **Regla obligatoria en toda plantilla de overlay (`animaciones/templates/overlay_word_by_word.html`):**
  1. En `window.renderFrame(t)`, **jamás usar módulo (`t % 3.0`)**. Clamplear linealmente: `const time = Math.max(0, Math.min(t, 3.0));`.
  2. Aislar el preview de navegador con la bandera `window.__PUPPETEER_CAPTURE__`:
     ```javascript
     if (!window.__PUPPETEER_CAPTURE__) {
       let start = null;
       function previewLoop(now) {
         if (window.__PUPPETEER_CAPTURE__) return;
         if (!start) start = now;
         const elapsed = (now - start) / 1000;
         window.renderFrame(Math.min(elapsed, 3.0));
         if (elapsed < 3.2) requestAnimationFrame(previewLoop);
       }
       requestAnimationFrame(previewLoop);
     }
     ```
  3. En el motor de render (`animaciones/render_overlay_engine.js`), inyectar antes de cargar el DOM:
     ```javascript
     await page.evaluateOnNewDocument(() => {
       window.__PUPPETEER_CAPTURE__ = true;
     });
     ```

### 7.3. Física de Entrada (`springPop` Determinista) y Reparto en 3.0s
En lugar de transiciones lineales planas, cada palabra e icono calcula su posición, escala, rotación y opacidad mediante un muelle amortiguado determinista evaluado en `t` (`0.0s → 3.0s`):
- **`0.05s – 1.85s` (Fase de Impacto):** Entrada secuencial palabra tras palabra (`w1` a `w6` + 3 iconos SVG) con `translateY`, `scale` con sobreimpulso controlado (`overshoot = 2.15`) y desenfoque inicial de movimiento (`blur` que cae a `0px` al asentarse).
- **`1.85s – 2.65s` (Fase de Lectura Activa):** El texto completo permanece anclado con flotación sutil (`Math.sin`) mientras los iconos ejecutan sus micro-animaciones secundarias.
- **`2.65s – 3.00s` (Fase de Cierre):** Salida limpia hacia arriba con caída de opacidad a `0`.

### 7.4. Pipeline de Exportación y Verificación Visual Obligatoria (QA)
1. Ejecutar el motor dedicado de overlays:
   ```bash
   node animaciones/render_overlay_engine.js <nombre_template> <ruta_salida.mov> 3.0 30
   ```
   Codifica con FFmpeg usando `-c:v qtrle -pix_fmt argb` (QuickTime Animation 32-bit con canal Alfa real).
2. **Inspección Visual Obligatoria:** El motor guarda automáticamente 4 fotogramas clave (`0.3s`, `1.1s`, `1.6s`, `2.4s`) en `animaciones/debug_frames/qa_frame_*.png`. **Antes de dar por bueno el render**, inspeccionar visualmente esos PNGs con `read_file` para verificar que:
   - Las palabras entran una sola vez de forma progresiva.
   - No existen halos grises ni bordes cortados.
   - El Escritorio del usuario queda limpio, conservando únicamente el `.mov` final solicitado.

---

## 8. Motor de Vídeos Técnicos de 60 Segundos (Full-Video Engine)

Para generar vídeos explicativos completos de ~60 segundos a pantalla completa (`1080×1920`, fondo mate `#050505`) listos para montar locución (*voice-over*):

### 8.1. Arquitectura Modular con Caché en Disco
Para evitar renderizar 1.800 fotogramas cada vez que se modifica una sola palabra, el motor implementa un `CacheManager`:
- Cada escena se renderiza de forma aislada a un clip MP4 intermedio (`animaciones/output_clips/cache/<scene_id>_<md5_hash>.mp4`).
- El hash se calcula a partir de los datos de la escena y el código del componente. Si no cambia, el render tarda **0 segundos** (`[CACHE HIT]`).
- FFmpeg une todas las escenas en el archivo final en menos de 1 segundo.

### 8.2. Los 5 Arquetipos Visuales Estándar
1. `kinetic_hook` (`animaciones/templates/components/kinetic_hook.js`): Titulares gigantes de impacto con física de muelle, icono vectorial y acentos semánticos de color.
2. `architecture_flow` (`animaciones/templates/components/architecture_flow.js`): Nodos discretos (`CLIENTS`, `EVENT LOOP`, `STORAGE`), colas de eventos y paquetes moviéndose por carriles vectoriales finos.
3. `code_terminal` (`animaciones/templates/components/code_terminal.js`): Ventana de código con coloreado de sintaxis seguro, diff/línea resaltada y terminal inferior con salida de ejecución en tiempo real.
4. `metrics_comparison` (`animaciones/templates/components/metrics_comparison.js`): Contadores numéricos animados con easing cúbico, barras de nivel comparadas y badge de aceleración (ej. *24.6x MÁS RÁPIDO*).
5. `memory_layout` (`animaciones/templates/components/memory_layout.js`): Tabla de volcado hexadecimal con direcciones de memoria, punteros y comparador de latencia física de hardware (*RAM 80ns vs NVMe 50.000ns*).

### 8.3. Comandos de Uso
- **Previsualización interactiva en navegador (Scrubber en tiempo real):**
  Abrir en Chrome [player.html](file:///c:/Users/Edixon/Desktop/Trabajo/SeDev/animaciones/player.html).
- **Renderizado completo con unión automática:**
  ```bash
  node animaciones/engine/render_full_video.js animaciones/manifests/ejemplo_redis_60s.json
  ```
- **Renderizado de una sola escena (para pruebas rápidas):**
  ```bash
  node animaciones/engine/render_full_video.js animaciones/manifests/ejemplo_redis_60s.json --scene 0
  ```
- **Forzar re-render sin caché:**
  ```bash
  node animaciones/engine/render_full_video.js animaciones/manifests/ejemplo_redis_60s.json --no-cache
  ```
- **Muxing de Audio:** Si el archivo JSON incluye la propiedad `"audio": "ruta/a/locucion.mp3"`, FFmpeg acopla el audio directamente al MP4 final.
