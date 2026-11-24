window.__DEFAULT_MANIFEST__ = {
  "title": "DEMO — Motor de Motion SeDev (hooks + fases)",
  "slug": "demo_motion_hook",
  "brand": "sedev",
  "format": "demo_motion_engine",
  "fps": 30,
  "output": "animaciones/output_clips/demo_motion_hook.mp4",
  "scenes": [
    {
      "id": "s01_hook_impact",
      "type": "hook_impact",
      "duration": 4.5,
      "voiceover": "Tres horas por factura. Un webhook de cuatrocientos milisegundos reemplaza la tarea completa.",
      "visual_cue": "Hook de alto impacto: 3 HORAS POR FACTURA, icono vectorial animado y tarjeta de métrica.",
      "props": {
        "theme": "dark",
        "badge": "AUTOMATIZACIÓN // FACTURAS",
        "indexLabel": "01 / SIGNAL",
        "kicker": "EL COSTO OCULTO",
        "lines": [
          {
            "text": "3 HORAS",
            "color": "#ffffff"
          },
          {
            "text": "POR FACTURA",
            "highlight": "#fbbf24",
            "textColor": "#050505"
          }
        ],
        "metric": {
          "from": 0,
          "value": 3,
          "suffix": "H",
          "label": "TIEMPO MANUAL POR CADA FACTURA"
        },
        "note": "Un webhook de 400 ms reemplaza la tarea completa. Sin Excel, sin copiar y pegar.",
        "tags": [
          "WEBHOOK",
          "IDEMPOTENTE",
          "0 EXCEL"
        ],
        "icon": "terminal",
        "iconColor": "#fbbf24",
        "iconMode": "draw",
        "accent": "#fbbf24",
        "cameraMode": "impact",
        "impactTimes": [
          0,
          0.55,
          1.06
        ]
      }
    },
    {
      "id": "s02_slam_excel",
      "type": "kinetic_slam",
      "duration": 4,
      "voiceover": "Cuarenta y cinco columnas copiadas a mano. No es un proceso: es una ruleta de errores.",
      "visual_cue": "Slam tipográfico con strike, subrayado, icono animado y panel de impacto.",
      "props": {
        "theme": "dark",
        "badge": "DATOS // EXCEL",
        "indexLabel": "02 / SLAM",
        "lines": [
          {
            "text": "45 COLUMNAS",
            "color": "#ffffff"
          },
          {
            "text": "A MANO",
            "color": "#ef4444",
            "strike": true
          },
          {
            "text": "NO ES UN PROCESO",
            "highlight": "#38bdf8",
            "textColor": "#050505"
          }
        ],
        "stat": "CADA COPIA Y PEGA ES UN ERROR POTENCIAL",
        "subtitle": "EL EXCEL NO FALLA: FALLA EL PROCESO MANUAL",
        "icon": "flamegraph",
        "iconColor": "#38bdf8",
        "iconMode": "assemble",
        "accent": "#fbbf24",
        "cameraMode": "ratchet_push",
        "ratchetBeats": [
          0.35,
          0.9,
          1.5
        ]
      }
    },
    {
      "id": "s03_arch_pipeline",
      "type": "architecture_flow",
      "duration": 5,
      "voiceover": "El mismo equipo, el mismo dato: un pipeline que entra una vez y resuelve sin intervención.",
      "visual_cue": "Arquitectura por fases: nodos, rieles, pico de cola y resolución con ack.",
      "props": {
        "theme": "dark",
        "title": "DE EXCEL A PIPELINE",
        "subtitle": "MISMO EQUIPO / NUEVA VELOCIDAD",
        "layout": "vertical",
        "nodes": [
          {
            "label": "WEBHOOK DE ENTRADA",
            "sublabel": "EVENTO ÚNICO · 400MS",
            "color": "#ffffff"
          },
          {
            "label": "COLA + WORKER",
            "sublabel": "REINTENTO IDEMPOTENTE",
            "color": "#fbbf24"
          },
          {
            "label": "FACTURA EMITIDA",
            "sublabel": "SIN INTERVENCIÓN MANUAL",
            "color": "#10b981"
          }
        ],
        "finalColor": "#10b981",
        "cameraMode": "focus_pan",
        "focusX": -0.12,
        "focusY": 0.08,
        "cameraIntensity": 1
      }
    }
  ]
};
