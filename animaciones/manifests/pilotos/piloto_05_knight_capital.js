window.__DEFAULT_MANIFEST__ = {
  "title": "PILOTO 05 — El deploy de 45 minutos que costó $440 millones",
  "slug": "piloto_05_knight_capital",
  "brand": "sedev",
  "format": "short_form_pilot",
  "fps": 30,
  "output": "animaciones/output_clips/pilotos/piloto_05_knight_capital.mp4",
  "hook_variants": [
    "45 minutos. $440 millones. Un deploy olvidado quebró a Knight Capital. Tu pipeline no tiene rollback.",
    "Actualizaron 7 de 8 servidores. El octavo quebró la empresa.",
    "No fue un hacker. Fue un deploy parcial. Y tú sigues desplegando un viernes."
  ],
  "cta_keyword": "DEPLOY",
  "tone": "Drama: la empresa quebró en 45 minutos. Humor: el viernes a las 6 p.m. y el rollback que no existe.",
  "beats": [
    {
      "t": "0.0 - 6.0",
      "on_screen": "45 MINUTOS / $440 MILLONES",
      "voiceover": "45 minutos. $440 millones. Un deploy olvidado quebró a Knight Capital. Tu pipeline no tiene rollback.",
      "visual": "Cara a cámara + texto. Cero diagrama en el primer frame.",
      "cut": "Hard in. Sin logo."
    },
    {
      "t": "6.0 - 14.0",
      "on_screen": "7 DE 8 SERVIDORES",
      "voiceover": "Actualizaron 8 servidores. 7 con el código nuevo. 1 se quedó con el viejo. Ese ejecutó órdenes que nadie quería.",
      "visual": "8 servidores, 7 verdes, 1 rojo.",
      "cut": "Corte seco. Nodos entrando en secuencia."
    },
    {
      "t": "14.0 - 22.0",
      "on_screen": "PÉRDIDA: $440,000,000",
      "voiceover": "En 45 minutos, el sistema compró y vendió sin control. Cuando alguien miró, la firma había perdido 440 millones.",
      "visual": "Monitor de incidente con logs en vivo.",
      "cut": "Corte al monitor. Logs apareciendo uno por uno."
    },
    {
      "t": "22.0 - 29.0",
      "on_screen": "NO FUE UN HACKER",
      "voiceover": "No fue un hacker. Fue un deploy parcial. Y tú sigues desplegando un viernes a las 6 p.m.",
      "visual": "Split de código: deploy parcial vs deploy atómico.",
      "cut": "Split screen. La línea correcta se escribe en vivo."
    },
    {
      "t": "29.0 - 35.0",
      "on_screen": "COMENTA DEPLOY",
      "voiceover": "Comenta DEPLOY y te paso el checklist de rollback. Tu viernes te lo agradecerá.",
      "visual": "Cara + CTA. El checklist aparece como texto.",
      "cut": "Cierre directo. Sin “sígueme”."
    }
  ],
  "scenes": [
    {
      "id": "s01_hook",
      "type": "kinetic_slam",
      "duration": 6,
      "voiceover": "45 minutos. $440 millones. Un deploy olvidado quebró a Knight Capital. Tu pipeline no tiene rollback.",
      "visual_cue": "Hook: 45 minutos, $440 millones, un deploy olvidado",
      "props": {
        "theme": "dark",
        "badge": "INCIDENTE // DEPLOY",
        "lines": [
          {
            "text": "45 MINUTOS",
            "color": "#ffffff"
          },
          {
            "text": "$440 MILLONES",
            "color": "#ef4444"
          },
          {
            "text": "UN DEPLOY OLVIDADO",
            "color": "#fbbf24"
          }
        ],
        "stat": "KNIGHT CAPITAL / 1 DE AGOSTO DE 2012",
        "subtitle": "8 SERVIDORES / 1 SIN ACTUALIZAR"
      }
    },
    {
      "id": "s02_servidores",
      "type": "architecture_flow",
      "duration": 8,
      "voiceover": "Actualizaron 8 servidores. 7 con el código nuevo. 1 se quedó con el viejo. Ese ejecutó órdenes que nadie quería.",
      "visual_cue": "8 servidores: 7 actualizados, 1 olvidado",
      "props": {
        "theme": "dark",
        "title": "EL SERVIDOR QUE NADIE ACTUALIZÓ",
        "subtitle": "DEPLOY PARCIAL / 7 DE 8",
        "layout": "vertical",
        "finalColor": "#ef4444",
        "nodes": [
          {
            "id": "deploy",
            "label": "8 SERVIDORES",
            "sublabel": "DEPLOY DEL NUEVO CÓDIGO",
            "color": "#ffffff"
          },
          {
            "id": "new",
            "label": "7 ACTUALIZADOS",
            "sublabel": "CÓDIGO NUEVO",
            "color": "#10b981"
          },
          {
            "id": "old",
            "label": "1 OLVIDADO",
            "sublabel": "CÓDIGO VIEJO EJECUTANDO",
            "color": "#ef4444",
            "status": "ALERTA"
          }
        ]
      }
    },
    {
      "id": "s03_incidente",
      "type": "disaster_monitor",
      "duration": 8,
      "voiceover": "En 45 minutos, el sistema compró y vendió sin control. Cuando alguien miró, la firma había perdido 440 millones.",
      "visual_cue": "Monitor de incidente: órdenes sin control y pérdida acumulada",
      "props": {
        "theme": "dark",
        "title": "45 MINUTOS DE ÓRDENES SIN CONTROL",
        "subtitle": "KNIGHT CAPITAL / 1 DE AGOSTO DE 2012",
        "healthyStatus": "SISTEMA EN LÍNEA // PERO ALGO NO CUADRA",
        "crashedStatus": "ALERTA P0: ÓRDENES FUERA DE CONTROL",
        "latencyNormal": 12,
        "latencyCrash": 12840,
        "logs": [
          {
            "time": "00:01.2",
            "level": "WARN",
            "text": "Orden enviada sin validación de posición",
            "color": "#fbbf24"
          },
          {
            "time": "00:02.8",
            "level": "ERR",
            "text": "Posición no autorizada detectada",
            "color": "#ef4444"
          },
          {
            "time": "00:03.9",
            "level": "CRIT",
            "text": "Pérdida acumulada: $440,000,000",
            "color": "#f87171"
          }
        ]
      }
    },
    {
      "id": "s04_deploy",
      "type": "terminal_split",
      "duration": 7,
      "voiceover": "No fue un hacker. Fue un deploy parcial. Y tú sigues desplegando un viernes a las 6 p.m.",
      "visual_cue": "Deploy parcial vs deploy atómico",
      "props": {
        "theme": "dark",
        "title": "EL DEPLOY QUE FALTÓ",
        "subtitle": "7 DE 8 SERVIDORES",
        "leftTitle": "LO QUE HICIERON",
        "leftCode": "for server in 01..07:\n  deploy(server, new_code)\n# server 08: olvidado",
        "rightTitle": "LO QUE DEBERÍAN HACER",
        "rightCode": "deploy --all --canary\nverify --all\nrollback --if-needed",
        "leftStatus": "DEPLOY PARCIAL",
        "rightStatus": "DEPLOY ATÓMICO",
        "leftFooter": "✖ STATUS: 1 SERVIDOR EN EL PASADO",
        "rightFooter": "✔ STATUS: TODOS EN LA MISMA VERSIÓN",
        "diffNote": "NO FUE EL CÓDIGO: FUE EL PROCESO"
      }
    },
    {
      "id": "s05_cta",
      "type": "kinetic_slam",
      "duration": 6,
      "voiceover": "Comenta DEPLOY y te paso el checklist de rollback. Tu viernes te lo agradecerá.",
      "visual_cue": "CTA: comenta DEPLOY para recibir el checklist de rollback",
      "props": {
        "theme": "dark",
        "badge": "CHECKLIST // ROLLBACK",
        "lines": [
          {
            "text": "COMENTA",
            "color": "#ffffff"
          },
          {
            "text": "DEPLOY",
            "color": "#fbbf24",
            "highlight": "#fbbf24",
            "textColor": "#050505"
          },
          {
            "text": "Y TE PASO EL CHECKLIST",
            "color": "#ffffff"
          }
        ],
        "stat": "ROLLBACK ANTES DE QUE SEA UN INCIDENTE",
        "subtitle": "SEDEV // INGENIERÍA QUE SE ENTIENDE"
      }
    }
  ]
};
