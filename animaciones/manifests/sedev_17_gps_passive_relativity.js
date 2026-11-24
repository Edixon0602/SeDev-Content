window.__DEFAULT_MANIFEST__ = {
  "title": "[17] ¿Cómo sabe el GPS dónde estás sin que tu móvil emita señal?",
  "slug": "sedev_17_gps_passive_relativity",
  "category": "FÍSICA, ESPACIO & ARQUITECTURA",
  "tagline": "Trilateración pasiva de 4 satélites y la corrección relativista de Einstein",
  "fps": 30,
  "outputDir": "animaciones/output_clips/sedev_brolls/sedev_17_gps_passive_relativity",
  "script": {
    "hook": "Tu teléfono sabe exactamente en qué esquina de la calle estás parado en el mapa, pero jamás le envía ninguna señal a los satélites. ¿Cómo funciona?",
    "broll1_lead": "El sistema GPS es completamente pasivo. Tu móvil no transmite nada; solo escucha. En el espacio hay más de treinta satélites orbitando la Tierra que transmiten un mensaje continuo: su posición y la hora atómica exacta.",
    "camera_pivot": "Al medir la millonésima de segundo que tardó en llegar la señal de cuatro satélites distintos, tu móvil calcula cuatro esferas matemáticas cuya intersección revela tu posición exacta.",
    "broll2_lead": "Pero hay un detalle de ciencia ficción: por la relatividad general de Einstein, el tiempo corre treinta y ocho microsegundos más rápido en el espacio. Si los programadores del GPS no corrigieran ese desfase en el código, el mapa se desviaría once kilómetros cada día.",
    "outro": "Física pura de Einstein corriendo silenciosamente dentro de tu bolsillo. Sígueme para más secretos de la ingeniería moderna."
  },
  "brolls": [
    {
      "id": "broll_01_gps_trilateration_flow",
      "purpose": "Intersección de 4 esferas de satélites calculando latitud, longitud y altitud",
      "type": "architecture_flow",
      "duration": 9,
      "props": {
        "theme": "blueprint",
        "title": "TRILATERACIÓN PASIVA CON 4 SATÉLITES",
        "subtitle": "CÁLCULO GEOMÉTRICO SIN EMITIR SEÑAL DESDE EL MÓVIL",
        "layout": "vertical",
        "nodes": [
          {
            "id": "sat",
            "label": "4 SATÉLITES GPS EN ÓRBITA",
            "sublabel": "TRANSMISIÓN DE HORA ATÓMICA",
            "color": "#38bdf8"
          },
          {
            "id": "math",
            "label": "INTERSECCIÓN DE 4 ESFERAS",
            "sublabel": "RESOLUCIÓN DE X, Y, Z + TIEMPO",
            "color": "#fbbf24"
          },
          {
            "id": "fix",
            "label": "POSICIÓN EN TU MÓVIL",
            "sublabel": "PRECISIÓN DE 1.2 METROS",
            "color": "#10b981"
          }
        ]
      },
      "voiceover": "El sistema GPS es completamente pasivo. Tu móvil no transmite nada; solo escucha. En el espacio hay más de treinta satélites orbitando la Tierra que transmiten un mensaje continuo: su posición y la hora atómica exacta.",
      "visual_cue": "Intersección de 4 esferas de satélites calculando latitud, longitud y altitud"
    },
    {
      "id": "broll_02_einstein_relativity_scale",
      "purpose": "Desfase relativista de 38 microsegundos por día en el código del GPS",
      "type": "latency_scale",
      "duration": 8.5,
      "props": {
        "theme": "blueprint",
        "title": "CORRECCIÓN RELATIVISTA DE EINSTEIN EN CÓDIGO",
        "subtitle": "38 MICROSEGUNDOS/DÍA = 11.4 KM DE DESVÍO SIN PARCHE",
        "items": [
          {
            "name": "Dilatación temporal especial (Velocidad orbital)",
            "val": "-7.0 us/día",
            "pct": 20
          },
          {
            "name": "Relatividad general (Gravedad débil en órbita)",
            "val": "+45.0 us/día",
            "pct": 80
          },
          {
            "name": "Desfase neto corregido por software en satélite",
            "val": "+38.0 us/día",
            "pct": 100
          }
        ]
      },
      "voiceover": "Pero hay un detalle de ciencia ficción: por la relatividad general de Einstein, el tiempo corre treinta y ocho microsegundos más rápido en el espacio. Si los programadores del GPS no corrigieran ese desfase en el código, el mapa se desviaría once kilómetros cada día.",
      "visual_cue": "Desfase relativista de 38 microsegundos por día en el código del GPS"
    }
  ]
};
