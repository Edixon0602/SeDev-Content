# Plan: editor automatizado SeDev + lenguaje visual editorial equilibrado

## Objetivo

Construir un MVP que reciba un talking head vertical ya limpio de silencios, repeticiones y errores, y entregue un MP4 editado con:

- transcripción y tiempos por palabra;
- B-rolls generados por el motor existente;
- overlays cinéticos transparentes;
- subtítulos sincronizados y legibles;
- movimientos de cámara moderados;
- efectos de sonido contextuales desde una librería local aprobada;
- mezcla de audio y exportación vertical H.264;
- artefactos intermedios revisables para poder ajustar la edición sin rehacer todo.

El punto visual objetivo se sitúa entre la película `premium_film` y los clips técnicos actuales: composición, material y ritmo editorial, combinados con claridad conceptual y energía, sin telemetría decorativa ni dashboards falsos.

## Principios de implementación

1. Reutilizar el motor determinista, los manifiestos, la caché y FFmpeg existentes.
2. Mantener compatibilidad con los comandos y manifiestos actuales.
3. Separar análisis, planificación, generación y montaje en módulos pequeños.
4. Hacer que el plan de edición sea un contrato JSON validado, no una salida libre del modelo.
5. No depender de un proveedor cloud para el flujo básico: Whisper local y planificador configurable.
6. No hacer scraping de MyInstants ni asumir licencias. Usar únicamente SFX locales con metadatos y licencia/origen registrado.
7. Fallar de forma explícita y conservar la salida anterior si una etapa falla.
8. Evitar edición excesiva: la voz y la idea principal siempre dominan.

## Arquitectura propuesta

```text
input/talking_head.mp4
  -> inspección FFprobe y extracción de audio
  -> faster-whisper local (segmentos + palabras)
  -> transcript.json
  -> planificador editorial (LLM configurable o planner determinista local)
  -> edit_plan.json validado
  -> manifiestos SeDev por B-roll/overlay
  -> renders reutilizando motores y caché existentes
  -> montaje FFmpeg: talking head + B-roll + overlays + cámara
  -> subtítulos ASS + SFX + mezcla/normalización
  -> MP4 final + reporte de QA
```

Directorio de trabajo por vídeo, con nombres derivados del slug de entrada:

```text
animaciones/editor_runs/<slug>/
  source/           # referencias o audio extraído, sin duplicar innecesariamente
  transcript.json
  edit_plan.json
  manifests/
  assets/
  renders/
  subtitles.ass
  mix/              # solo temporales necesarios
  final.mp4
  qa_report.json
```

La salida final debe escribirse primero con un nombre temporal y renombrarse solo al completar correctamente.

## Contrato mínimo del plan editorial

El plan debe incluir metadatos de entrada y eventos con tiempos absolutos:

- `broll`: inicio, fin, concepto, intención narrativa, componente visual y props.
- `overlay`: inicio, fin, texto corto, acento y posición segura.
- `camera`: inicio, fin, tipo (`push`, `pull`, `pan`), intensidad limitada.
- `sfx`: tiempo, identificador de la librería, ganancia y justificación contextual.
- `captions`: configuración global y pausas/segmentos derivados de la transcripción.

Validaciones obligatorias:

- tiempos finitos dentro de la duración real;
- `end > start`;
- no solapar B-rolls ni overlays incompatibles;
- duración mínima para lectura;
- límites de caracteres y cantidad de eventos;
- IDs de sonido existentes;
- props serializables y aceptadas por el motor;
- densidad máxima configurable de cámara y SFX.

## Lenguaje visual nuevo: `editorial_explainer`

Crear una familia/componente nuevo, sin deformar `premium_film` ni los componentes existentes.

### Reglas visuales

- Una idea dominante por escena y una sola metáfora principal.
- Composición editorial con objeto/estructura protagonista, tipografía grande y espacio negativo intencional.
- Grafito o marfil; blanco cálido; un único acento semántico.
- Tipografía local Plus Jakarta Sans para expresión editorial y JetBrains Mono solo para datos realmente técnicos.
- Etiquetas breves; prohibidos textos diminutos de relleno, paneles de telemetría, tags falsos, barras decorativas y dashboards.
- Una cifra únicamente cuando sea indispensable.
- Diagramas solo cuando expliquen mejor que una metáfora visual.
- Movimiento determinista con springs/easings existentes, cortes y cambios de encuadre moderados.
- Adaptación a la duración asignada; sin loops accidentales ni tiempos muertos prolongados.
- Variantes visuales suficientes para transformación, comparación, flujo/colisión y causa/efecto.

### Referencia de equilibrio

- Conservar del premium: luz/material, encuadre, jerarquía y transiciones deliberadas.
- Conservar de los técnicos: claridad, relación directa con el concepto y ritmo.
- Eliminar de ambos: monotonía de 30 segundos del primero y saturación de UI de los segundos.

## Pipeline de edición

### 1. Entrada y transcripción

- Aceptar ruta de vídeo desde CLI.
- Validar existencia, streams, resolución, FPS y duración con FFprobe.
- Extraer audio mono 16 kHz para ASR.
- Integrar faster-whisper en un entorno aislado dentro del proyecto.
- Guardar texto, idioma, segmentos y palabras con `start`/`end`.
- Reutilizar transcripción si la entrada y configuración no cambian.
- Si las dependencias faltan, mostrar instrucciones concretas; nunca fingir una transcripción.

### 2. Planificación

- Segmentar por frases/ideas, no por intervalos arbitrarios.
- Seleccionar B-roll para conceptos que necesitan explicación visual.
- Usar overlays para pocas palabras clave, no para repetir todos los subtítulos.
- Insertar cámara en pausas o cambios de idea; intensidad moderada.
- Seleccionar SFX solo con correspondencia visual/semántica.
- Permitir planner LLM configurable mediante variables de entorno, pero proporcionar un planner determinista local para pruebas y funcionamiento sin API.
- Validar el plan y rechazar JSON inválido o eventos fuera de rango.

### 3. Generación de assets

- Convertir eventos visuales a manifiestos compatibles.
- Renderizar B-rolls con el motor principal y overlays con alfa real.
- Reutilizar caché; no regenerar assets sin cambios.
- Garantizar que la duración del asset cubra el intervalo asignado.
- Mantener logs y rutas relativas al directorio de ejecución.

### 4. Subtítulos

- Generar ASS desde palabras/segmentos de Whisper.
- Frases cortas, una o dos líneas, márgenes y zonas seguras verticales.
- Sin subtítulos sobre B-roll a pantalla completa salvo configuración explícita.
- Resaltado sobrio de palabras clave; no efecto karaoke obligatorio.
- Escapar correctamente texto y caracteres especiales.

### 5. Montaje

- Base: talking head original sin recodificaciones intermedias innecesarias.
- Sustituir intervalos por B-roll.
- Componer overlays transparentes en tiempos absolutos.
- Aplicar zoom/pan solo sobre talking head y dentro de límites seguros.
- Añadir subtítulos ASS en la etapa final.
- Mezclar voz y SFX con ganancias en dB, ducking moderado si hace falta y loudness final consistente.
- Exportar MP4 H.264/yuv420p + AAC, 1080×1920 por defecto, preservando FPS de entrada cuando sea viable.

### 6. Reanudación y revisión

- `--plan-only`: transcribe y produce plan sin renderizar.
- `--resume`: reutiliza transcripción, plan y assets válidos.
- `--plan <ruta>`: monta un plan revisado sin volver a planificar.
- `--no-sfx`, `--no-camera`, `--no-captions`: controles básicos.
- Comando principal previsto: `npm run edit:auto -- <ruta_video>`.

## SFX

Librería local con catálogo JSON:

- ID estable, ruta, duración, categoría, tags semánticos, ganancia por defecto y licencia/origen.
- Sonidos iniciales solo si están disponibles legalmente en el proyecto; en caso contrario, sintetizar efectos genéricos propios simples o dejar fixtures de prueba claramente identificados.
- No depender de red ni de MyInstants para ejecutar tests.
- Preparar importación manual posterior de sonidos aprobados.

## QA y criterios de aceptación

### Unitarios

- agrupación de palabras y generación ASS;
- validación de esquema y rangos del plan;
- densidad y solapamientos;
- selección de SFX por ID;
- cálculo de tiempos y filtros de cámara;
- reanudación/caché y nombres de rutas;
- manejo de rutas con espacios en Windows.

### Integración

- Vídeo sintético corto con voz/audio de prueba y transcripción controlada/fixture.
- Ejecutar análisis -> plan -> assets -> montaje sin llamadas externas.
- Comprobar con FFprobe códec, dimensiones, FPS, duración y audio.
- Extraer fotogramas antes/durante/después de B-roll y overlay.
- Comprobar alfa de overlays y cierre sin restos visuales.
- Verificar que SFX existen en la mezcla y que la voz conserva inteligibilidad.
- Probar fallo de ASR/planner sin producir un falso MP4 exitoso.

### Visual/editorial

- Revisar hoja de contactos del nuevo estilo y de un montaje completo.
- Confirmar una idea dominante por escena y ausencia de telemetría decorativa.
- Confirmar subtítulos legibles, sin clipping ni colisiones.
- Confirmar cámara y SFX moderados.
- No declarar validado el resultado editorial final sin revisar un talking head real.

### Regresión

- `npm test` debe pasar.
- QA existente del motor debe conservarse.
- Cualquier fallo preexistente debe documentarse por separado, sin presentarlo como éxito del MVP.

## Entrega esperada

1. Pipeline CLI funcional y documentado.
2. Nuevo componente `editorial_explainer` y manifiesto demo equilibrado.
3. Planner local + adaptador LLM configurable.
4. Integración faster-whisper aislada y transcript cacheado.
5. Subtítulos, cámara, B-rolls, overlays, SFX y mezcla.
6. Catálogo SFX local seguro.
7. Tests unitarios e integración offline.
8. Reporte de QA con capturas y limitaciones reales.
9. README actualizado con instalación, comandos, opciones y flujo de revisión.

## Fases

1. Auditoría técnica y contratos.
2. Nuevo lenguaje visual y demo.
3. Transcripción y planner validado.
4. Montaje, subtítulos y audio.
5. Tests y robustez Windows.
6. Auditoría independiente, correcciones y nueva verificación.
7. Prueba con talking head real proporcionado por el usuario.

## Roles

- Supervisor: define alcance, revisa entregables y coordina correcciones; no escribe código.
- Desarrollador: implementa el plan, ejecuta pruebas y entrega documentación.
- QA/auditor: revisa arquitectura y cambios, ejecuta pruebas independientes, inspecciona capturas y reporta defectos priorizados. No aprueba por evidencia incompleta.
