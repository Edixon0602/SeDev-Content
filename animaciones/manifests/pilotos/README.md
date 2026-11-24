# SeDev Pilotos — Hook Lab v1.0

Esta carpeta contiene los pilotos renderizables del nuevo sistema de guiones.
No son piezas del catálogo: son la prueba de que el hook cambia la percepción
de la misma idea.

## Diagnóstico actual

- 51 hooks auditados.
- **0 listos**, 4 para ajustar, **47 para reescribir**.
- 23.9 palabras promedio.
- **51/51 hooks pasan de 12 palabras**; 42/51 pasan de 20.
- La mayoría empieza con artículo o contexto (“El”, “En”, “Llevas”); los que arrancan con una acción del viewer son la excepción.

## Los dos niveles del manifiesto

Cada piloto tiene dos capas:

1. **`beats`** — la capa editorial. Es lo que lee el editor o el creador:
   tiempo, texto en pantalla, voz, visual y tipo de corte.
2. **`scenes`** — la capa de render. Es lo que consume
   `animaciones/engine/render_full_video.js` y `scene_runner.html`.

No mezcles las dos. Un beat puede durar 4.5s y una escena puede durar 7s:
el beat es la intención, la escena es la ejecución.

## Estructura de 5 beats

| Beat | Tiempo | Función | Regla |
|---|---|---|---|
| 1. Hook | 0–4.5s | Interrumpir | Cara + texto. Cero diagrama en el primer frame. |
| 2. Mecanismo | 4.5–11.5s | Explicar | B-roll. Una idea por plano. |
| 3. Prueba | 11.5–19.5s | Demostrar | Código, terminal o comparativa real. |
| 4. Giro | 19.5–26.5s | Reencuadrar | El insight que el viewer no esperaba. |
| 5. CTA | 26.5–32.5s | Convertir | Comenta [KEYWORD] o DM. Nunca “sígueme”. |

## Los 8 arquetipos de hook

1. **Amenaza con fecha** — “El 19 de enero de 2038, tu app viaja a 1901.”
2. **Contradicción** — “Te dijeron que más núcleos = más escala. Redis escala con uno.”
3. **Dinero en la mesa** — “Pagas 16 núcleos para tapar lo que Redis resuelve con uno.”
4. **Confesión** — “Yo también usaba Math.random() para tokens. Hasta que vi esto.”
5. **POV de guerra** — “Son las 3 a.m. y el servidor devuelve 500.”
6. **Comparación absurda** — “Cloudflare usa 100 lámparas de lava. Tú usas Math.random().”
7. **Demo en vivo** — “Mira lo que pasa cuando borras 2 GB: el .git sigue pesando 2 GB.”
8. **Te han mentido** — “Te vendieron que SQLite no es para producción. Tu teléfono lo usa 20 veces.”

## Tono: drama + humor

- **Drama (80%):** pérdidas reales. Producción caída, dinero perdido, empresa quebrada, app que viaja a 1901.
- **Humor (20%):** una línea seca por guion, después de la prueba. Nunca sobre las víctimas.
  El chiste es sobre nosotros: el deploy del viernes, el jefe, el pasante, el PDF que tumba el backend.
- **Regla:** si el drama no duele, el humor no alivia. Si el humor llega antes del giro, rompe la tensión.

## Serie 1 — 5 pilotos

| # | Archivo | Hook | CTA | Duración | Tono |
| :---: | :--- | :--- | :---: | ---: | :--- |
| 01 | `piloto_01_lava_lamps.json` | “Cloudflare genera aleatoriedad con 100 lámparas de lava. Tú, con Math.random().” | `LAVA` | 32.0s | “Una es física; la otra es fe.” |
| 02 | `piloto_02_bittorrent.json` | “Descargaste 50 GB sin servidor. Tu SaaS se cae si Railway estornuda.” | `P2P` | 32.0s | “Capitalismo en kilobytes.” |
| 03 | `piloto_03_redis.json` | “16 núcleos, 2,000 usuarios y se cae. Redis lo hace con 1 hilo y 100,000.” | `REDIS` | 32.5s | “Más núcleos que una sala de esports.” |
| 04 | `piloto_04_y2038.json` | “19 de enero de 2038: tu app viaja a 1901. El bug ya está en producción.” | `2038` | 36.5s | “Un ticket de Jira y un pasante.” |
| 05 | `piloto_05_knight_capital.json` | “45 minutos. $440 millones. Un deploy olvidado quebró a Knight Capital.” | `DEPLOY` | 35.0s | “Un viernes a las 6 p.m.” |

## Comandos

```powershell
# Auditar los 51 hooks del catálogo
node animaciones/engine/hook_lab.js --audit

# Puntuar un hook suelto (0-12)
node animaciones/engine/hook_lab.js --score "tu hook aquí"

# Generar el banco de 21 hooks reescritos
node animaciones/engine/hook_bank.js

# Renderizar toda la serie
node animaciones/engine/render_full_video.js animaciones/manifests/pilotos/piloto_01_lava_lamps.json
node animaciones/engine/render_full_video.js animaciones/manifests/pilotos/piloto_02_bittorrent.json
node animaciones/engine/render_full_video.js animaciones/manifests/pilotos/piloto_03_redis.json
node animaciones/engine/render_full_video.js animaciones/manifests/pilotos/piloto_04_y2038.json
node animaciones/engine/render_full_video.js animaciones/manifests/pilotos/piloto_05_knight_capital.json

# Renderizar solo una escena (prueba rápida)
node animaciones/engine/render_full_video.js animaciones/manifests/pilotos/piloto_02_bittorrent.json --scene 1
```

## Piloto 01 — Lava lamps

- **Archivo:** `piloto_01_lava_lamps.json`
- **Duración:** 32.0s
- **Hook:** “Cloudflare genera aleatoriedad con 100 lámparas de lava. Tú, con Math.random().”
- **CTA:** comenta `LAVA`
- **Escenas:** `kinetic_slam` → `lava_entropy_viz` → `terminal_split` → `metrics_comparison` → `kinetic_slam`
- **MP4:** `animaciones/output_clips/pilotos/piloto_01_lava_lamps.mp4`
- **Guion sincronizado:** `animaciones/manifests/guion_piloto_01_lava_lamps.md`

El MP4 es mudo a propósito: la voz la grabas tú. El guion ya está sincronizado
a 2.5 palabras/segundo, que es el ritmo cómodo para teleprompter.

> El MP4 no se versiona porque `.gitignore` excluye `*.mp4`. Se regenera con
> `npm run render:pilot` en menos de un minuto si los clips están en caché.

## Regla de oro

Si el hook no aguanta 3 segundos, el resto no existe. No renderices 51 piezas
sosas: reescribe 5, publica, mide retención de 3s y recién ahí escala.
