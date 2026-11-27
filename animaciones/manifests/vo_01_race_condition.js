window.__DEFAULT_MANIFEST__ = {
  "title": "SeDev VO 01 — Cómo vaciar una cuenta de $100 sacando $80 dos veces (Race Condition)",
  "slug": "vo_01_race_condition",
  "brand": "sedev",
  "format": "voiceover_motion",
  "ground": "ivory",
  "accent": "#b85f42",
  "fps": 30,
  "output": "animaciones/output_clips/vo_01_race_condition.mp4",
  "scenes": [
    {
      "id": "s01_hook_double_withdraw",
      "type": "hook_impact",
      "duration": 4,
      "voiceover": "Tienes cien dólares. Sacas ochenta dos veces... y te los entrega.",
      "visual_cue": "Hook editorial sobre fondo ivory: saldo $100, dos retiros de $80 en el mismo milisegundo.",
      "props": {
        "editorial": true,
        "ground": "ivory",
        "accent": "#b85f42",
        "badge": "CONCURRENCIA",
        "indexLabel": "",
        "kicker": "SALDO INICIAL: $100",
        "lines": [
          {
            "text": "2 RETIROS DE $80"
          },
          {
            "text": "SALDO EN -$60",
            "highlight": "#b85f42",
            "textColor": "#f6f2ea"
          }
        ],
        "metric": {
          "from": 100,
          "value": -60,
          "suffix": " USD",
          "label": "BALANCE TRAS DOS PETICIONES SIMULTÁNEAS"
        },
        "note": "Mismo milisegundo. Ninguna de las dos peticiones ve a la otra.",
        "tags": [
          "RACE CONDITION",
          "T = 0.001S",
          "DOBLE COBRO"
        ],
        "icon": "lightning",
        "iconColor": "#b85f42",
        "iconMode": "draw",
        "cameraMode": "impact",
        "impactTimes": [
          0,
          0.55,
          1.1
        ]
      }
    },
    {
      "id": "s02_two_step_flow",
      "type": "editorial_explainer",
      "duration": 13,
      "voiceover": "Pasa muchísimo cuando programas un retiro en dos pasos: primero consultas si el saldo alcanza, y una línea después restas el dinero. Si pruebas con un solo clic, todo parece perfecto.",
      "visual_cue": "Composición editorial de flujo: un clic pasa sin problemas.",
      "props": {
        "editorial": true,
        "ground": "ivory",
        "variant": "flow",
        "kicker": "FLUJO EN DOS PASOS",
        "headline": "CON UN CLIC TODO PARECE SANO",
        "support": "Primero consultas el saldo y una línea después restas.",
        "leftIcon": "custom_code",
        "rightIcon": "database",
        "accent": "#b85f42",
        "cameraMode": "steady"
      }
    },
    {
      "id": "s03_race_and_atomic_fix",
      "type": "terminal_split",
      "duration": 20,
      "voiceover": "Pero si llegan dos peticiones en el mismo milisegundo, ambas leen la base antes de que la otra escriba. Las dos ven cien dólares, las dos aprueban, y terminas con el saldo en menos sesenta. La solución es validar y descontar en una sola operación atómica, con un candado en la tabla.",
      "visual_cue": "Cirugía SQL en papel editorial: lectura en dos pasos vs UPDATE atómico con CHECK >= 0.",
      "props": {
        "editorial": true,
        "ground": "ivory",
        "title": "CONDICIÓN DE CARRERA VS ATÓMICO",
        "subtitle": "MISMO MILISEGUNDO · 2 PETICIONES",
        "leftTitle": "VULNERABLE (2 PASOS)",
        "leftColor": "#b85f42",
        "leftCode": "-- Req A y B leen $100 a la vez\nSELECT balance FROM wallets WHERE id = $1;\n-- Ambas pasan: 100 >= 80\nUPDATE wallets SET balance = balance - 80;\n-- Resultado real: balance = -60",
        "rightTitle": "ATÓMICO + CANDADO DB",
        "rightColor": "#047857",
        "rightCode": "-- Valida y descuenta en 1 sola orden\nUPDATE wallets\nSET balance = balance - 80\nWHERE id = $1 AND balance >= 80;\n-- + CONSTRAINT CHECK (balance >= 0)",
        "cameraMode": "push",
        "pushAmount": 0.03
      }
    },
    {
      "id": "s04_rule_editorial",
      "type": "editorial_explainer",
      "duration": 8,
      "voiceover": "Cuando manejas dinero o inventario, leer primero en código y actualizar después nunca es seguro si hay concurrencia.",
      "visual_cue": "Regla editorial: validación en base de datos, nunca en dos pasos.",
      "props": {
        "editorial": true,
        "ground": "ivory",
        "variant": "comparison",
        "kicker": "REGLA DE BACKEND",
        "headline": "NUNCA LEAS ANTES DE RESTAR",
        "support": "La concurrencia real solo la frena la base de datos.",
        "leftIcon": "custom_code",
        "rightIcon": "database",
        "accent": "#047857",
        "cameraMode": "steady"
      }
    },
    {
      "id": "s05_cta_slam",
      "type": "kinetic_slam",
      "duration": 5,
      "voiceover": "¿Ya probaste tus endpoints disparando diez peticiones al mismo milisegundo?",
      "visual_cue": "Cierre editorial limpio sobre pruebas de concurrencia.",
      "props": {
        "editorial": true,
        "ground": "ivory",
        "accent": "#047857",
        "danger": "#b85f42",
        "badge": "TEST DE CARGA",
        "indexLabel": "",
        "lines": [
          {
            "text": "1 CLIC EN LOCAL",
            "color": "#5f5a52",
            "strike": true
          },
          {
            "text": "10 REQUESTS A LA VEZ",
            "highlight": "#047857",
            "textColor": "#f6f2ea"
          }
        ],
        "statLabel": "PRUEBA REAL",
        "stat": "¿TU SALDO QUEDA EN $20 O EN -$60?",
        "subtitle": "RESPONDE EN COMENTARIOS",
        "icon": "database",
        "iconColor": "#047857",
        "iconMode": "pulse",
        "cameraMode": "ratchet_push",
        "ratchetBeats": [
          0.4,
          1.1
        ]
      }
    }
  ]
};
