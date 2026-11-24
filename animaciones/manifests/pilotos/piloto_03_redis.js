window.__DEFAULT_MANIFEST__ = {
  "title": "PILOTO 03 — 16 núcleos no te salvan de una mala arquitectura",
  "slug": "piloto_03_redis",
  "brand": "sedev",
  "format": "short_form_pilot",
  "fps": 30,
  "output": "animaciones/output_clips/pilotos/piloto_03_redis.mp4",
  "hook_variants": [
    "16 núcleos, 2,000 usuarios y se cae. Redis lo hace con 1 hilo y 100,000.",
    "Tu servidor tiene más núcleos que una sala de esports y sigue haciendo fila.",
    "El problema no es la CPU: usas los hilos para esperar."
  ],
  "cta_keyword": "REDIS",
  "tone": "Drama: caída en hora pico. Humor: la sala de esports y el jefe esperando la factura.",
  "beats": [
    {
      "t": "0.0 - 5.0",
      "on_screen": "16 NÚCLEOS / 2,000 USUARIOS / Y SE CAE",
      "voiceover": "16 núcleos, 2,000 usuarios y se cae. Redis lo hace con 1 hilo y 100,000.",
      "visual": "Cara a cámara + texto. Sin diagrama en el primer frame.",
      "cut": "Hard in. Sin logo."
    },
    {
      "t": "5.0 - 12.5",
      "on_screen": "UN HILO, CERO ESPERAS",
      "voiceover": "Redis no es rápido porque tenga más hilos. Es rápido porque no espera: un event loop, todo en memoria y cero handoffs.",
      "visual": "Flujo request → event loop → respuesta.",
      "cut": "Corte seco. Nodos entrando en secuencia."
    },
    {
      "t": "12.5 - 20.0",
      "on_screen": "POSTGRES ESPERA. REDIS NO.",
      "voiceover": "Tu app se pasa el día esperando a Postgres. Redis no espera: atiende, responde y vuelve a la cola.",
      "visual": "Split de código: consulta bloqueante vs lectura en memoria.",
      "cut": "Split screen. La línea correcta se escribe en vivo."
    },
    {
      "t": "20.0 - 26.5",
      "on_screen": "NO ES CPU: ES I/O",
      "voiceover": "El problema no es la CPU: usas los hilos para esperar. Y tu servidor sigue haciendo fila.",
      "visual": "2,000 req/s vs 100,000 req/s. Texto: “MÁS NÚCLEOS QUE UNA SALA DE ESPORTS”.",
      "cut": "Dos tarjetas. La ganadora pulsa una vez."
    },
    {
      "t": "26.5 - 32.0",
      "on_screen": "COMENTA REDIS",
      "voiceover": "Comenta REDIS y te muestro dónde se te van las conexiones. Tu jefe puede esperar.",
      "visual": "Cara + CTA. El checklist aparece como texto.",
      "cut": "Cierre directo. Sin “sígueme”."
    }
  ],
  "scenes": [
    {
      "id": "s01_hook",
      "type": "kinetic_slam",
      "duration": 5,
      "voiceover": "16 núcleos, 2,000 usuarios y se cae. Redis lo hace con 1 hilo y 100,000.",
      "visual_cue": "Hook: 16 núcleos, 2,000 usuarios y se cae",
      "props": {
        "theme": "dark",
        "badge": "RENDIMIENTO // REDIS",
        "lines": [
          {
            "text": "16 NÚCLEOS",
            "color": "#ffffff"
          },
          {
            "text": "2,000 USUARIOS",
            "color": "#fbbf24"
          },
          {
            "text": "Y SE CAE",
            "color": "#ef4444"
          }
        ],
        "stat": "REDIS LO HACE CON 1 HILO Y 100,000",
        "subtitle": "EL PROBLEMA NO ES LA CPU: ES I/O"
      }
    },
    {
      "id": "s02_event_loop",
      "type": "architecture_flow",
      "duration": 7.5,
      "voiceover": "Redis no es rápido porque tenga más hilos. Es rápido porque no espera: un event loop, todo en memoria y cero handoffs.",
      "visual_cue": "Request → event loop → respuesta en 0.1 ms",
      "props": {
        "theme": "dark",
        "title": "REDIS NO ESPERA",
        "subtitle": "EVENT LOOP / TODO EN MEMORIA",
        "layout": "vertical",
        "nodes": [
          {
            "id": "req",
            "label": "REQUEST",
            "sublabel": "2,000 USUARIOS ENTRANDO",
            "color": "#ffffff"
          },
          {
            "id": "loop",
            "label": "EVENT LOOP",
            "sublabel": "1 HILO, CERO ESPERAS",
            "color": "#fbbf24"
          },
          {
            "id": "res",
            "label": "RESPUESTA",
            "sublabel": "100,000 REQ/S EN MEMORIA",
            "color": "#10b981"
          }
        ]
      }
    },
    {
      "id": "s03_codigo",
      "type": "terminal_split",
      "duration": 7.5,
      "voiceover": "Tu app se pasa el día esperando a Postgres. Redis no espera: atiende, responde y vuelve a la cola.",
      "visual_cue": "Consulta bloqueante vs lectura en memoria",
      "props": {
        "theme": "dark",
        "title": "DÓNDE SE TE VA EL TIEMPO",
        "subtitle": "POSTGRES VS REDIS",
        "leftTitle": "LO QUE HACES HOY",
        "leftCode": "const user = await db.query(\n  'SELECT * FROM users WHERE id = $1'\n);\n// 120 ms de espera",
        "rightTitle": "LO QUE DEBERÍAS HACER",
        "rightCode": "const user = await redis.get(\n  `user:${id}`\n);\n// 0.4 ms en memoria",
        "leftStatus": "BLOQUEO: 120 ms",
        "rightStatus": "RESPUESTA: 0.4 ms",
        "leftFooter": "✖ STATUS: I/O ESPERANDO",
        "rightFooter": "✔ STATUS: RESPUESTA INMEDIATA",
        "diffNote": "NO ES CPU: ES I/O"
      }
    },
    {
      "id": "s04_comparativa",
      "type": "metrics_comparison",
      "duration": 6.5,
      "voiceover": "El problema no es la CPU: usas los hilos para esperar. Y tu servidor sigue haciendo fila.",
      "visual_cue": "2,000 req/s vs 100,000 req/s. Texto: “MÁS NÚCLEOS QUE UNA SALA DE ESPORTS”.",
      "props": {
        "theme": "dark",
        "badge": "RENDIMIENTO // I/O",
        "title": "MÁS NÚCLEOS NO ES MÁS ESCALA",
        "barA": 2,
        "barB": 100,
        "metricA": {
          "name": "16 NÚCLEOS",
          "value": "2,000 req/s",
          "sub": "Hilos esperando a Postgres",
          "color": "#ef4444"
        },
        "metricB": {
          "name": "1 HILO",
          "value": "100,000 req/s",
          "sub": "Event loop sin bloqueo",
          "color": "#10b981"
        },
        "speedup": "NO ES CPU: ES I/O"
      }
    },
    {
      "id": "s05_cta",
      "type": "kinetic_slam",
      "duration": 6,
      "voiceover": "Comenta REDIS y te muestro dónde se te van las conexiones. Tu jefe puede esperar.",
      "visual_cue": "CTA: comenta REDIS para auditar conexiones",
      "props": {
        "theme": "dark",
        "badge": "AUDITORÍA // CONEXIONES",
        "lines": [
          {
            "text": "COMENTA",
            "color": "#ffffff"
          },
          {
            "text": "REDIS",
            "color": "#fbbf24",
            "highlight": "#fbbf24",
            "textColor": "#050505"
          },
          {
            "text": "Y TE MUESTRO TUS CONEXIONES",
            "color": "#ffffff"
          }
        ],
        "stat": "DÓNDE SE TE VAN LAS CONEXIONES",
        "subtitle": "SEDEV // INGENIERÍA QUE SE ENTIENDE"
      }
    }
  ]
};
