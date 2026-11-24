window.__DEFAULT_MANIFEST__ = {
  "title": "PILOTO 04 — El bug que ya está en tu código y explota en 2038",
  "slug": "piloto_04_y2038",
  "brand": "sedev",
  "format": "short_form_pilot",
  "fps": 30,
  "output": "animaciones/output_clips/pilotos/piloto_04_y2038.mp4",
  "hook_variants": [
    "19 de enero de 2038: tu app viaja a 1901. El bug ya está en producción.",
    "El entero de 32 bits que guarda la hora se desborda en 2038. Y nadie está auditando.",
    "No va a ser el apocalipsis. Va a ser un ticket de Jira y un pasante buscando un time_t."
  ],
  "cta_keyword": "2038",
  "tone": "Drama: deuda técnica que nadie mira. Humor: el ticket de Jira y el pasante con el time_t.",
  "beats": [
    {
      "t": "0.0 - 5.5",
      "on_screen": "2038 → 1901",
      "voiceover": "19 de enero de 2038: tu app viaja a 1901. El bug ya está en producción.",
      "visual": "Cara a cámara + texto. Cero diagrama en el primer frame.",
      "cut": "Hard in. Sin logo."
    },
    {
      "t": "5.5 - 15.5",
      "on_screen": "2,147,483,647 SEGUNDOS",
      "voiceover": "Unix cuenta segundos desde 1970. Con 32 bits, el máximo es 2,147,483,647. Un segundo después, el número se vuelve negativo y la fecha salta a 1901.",
      "visual": "Inspector de memoria: time_t, overflow, fecha resultante.",
      "cut": "Corte seco. Escáner de memoria."
    },
    {
      "t": "15.5 - 23.5",
      "on_screen": "NO ES SOLO COBOL",
      "voiceover": "No es solo COBOL. Está en APIs viejas, bases de datos, firmware y tickets con fecha. Y nadie lo está auditando.",
      "visual": "Split de código: time_t de 32 bits vs 64 bits.",
      "cut": "Split screen. La línea correcta se escribe en vivo."
    },
    {
      "t": "23.5 - 30.5",
      "on_screen": "2038 VS EL AÑO 292,277,026,596",
      "voiceover": "No vas a estar despierto a las 3 a.m. en 2038. Vas a estar migrando un sistema sin documentación.",
      "visual": "Comparativa de rango: 32 bits vs 64 bits.",
      "cut": "Dos tarjetas. La ganadora pulsa una vez."
    },
    {
      "t": "30.5 - 36.5",
      "on_screen": "COMENTA 2038",
      "voiceover": "Comenta 2038 y te paso el comando para auditar tus tablas. El pasante te lo agradecerá.",
      "visual": "Cara + CTA. El checklist aparece como texto.",
      "cut": "Cierre directo. Sin “sígueme”."
    }
  ],
  "scenes": [
    {
      "id": "s01_hook",
      "type": "kinetic_slam",
      "duration": 5.5,
      "voiceover": "19 de enero de 2038: tu app viaja a 1901. El bug ya está en producción.",
      "visual_cue": "Hook: 2038, tu app viaja a 1901",
      "props": {
        "theme": "dark",
        "badge": "DEUDA TÉCNICA // 32 BITS",
        "lines": [
          {
            "text": "2038",
            "color": "#ffffff"
          },
          {
            "text": "TU APP VIAJA A 1901",
            "color": "#fbbf24",
            "highlight": "#fbbf24",
            "textColor": "#050505"
          }
        ],
        "stat": "EL BUG YA ESTÁ EN PRODUCCIÓN",
        "subtitle": "UNIX EPOCH / TIME_T DE 32 BITS"
      }
    },
    {
      "id": "s02_memoria",
      "type": "memory_layout",
      "duration": 10,
      "voiceover": "Unix cuenta segundos desde 1970. Con 32 bits, el máximo es 2,147,483,647. Un segundo después, el número se vuelve negativo y la fecha salta a 1901.",
      "visual_cue": "Inspector de memoria: time_t, overflow y fecha resultante",
      "props": {
        "theme": "dark",
        "title": "EL ENTERO QUE SE DESBORDA",
        "badge": "TIME_T // 32 BITS",
        "resolutionTitle": "MIGRA A 64 BITS ANTES DE 2038",
        "resolutionSub": "El overflow no se arregla con un parche: se arregla con tipos.",
        "items": [
          {
            "addr": "0x7FFFFFFF",
            "name": "TIME_T / 32 BITS",
            "value": "2,147,483,647 segundos desde 1970"
          },
          {
            "addr": "0x80000000",
            "name": "OVERFLOW",
            "value": "El entero se vuelve negativo"
          },
          {
            "addr": "1901-12-13",
            "name": "FECHA RESULTANTE",
            "value": "La app cree que está en 1901"
          }
        ]
      }
    },
    {
      "id": "s03_codigo",
      "type": "terminal_split",
      "duration": 8,
      "voiceover": "No es solo COBOL. Está en APIs viejas, bases de datos, firmware y tickets con fecha. Y nadie lo está auditando.",
      "visual_cue": "time_t de 32 bits vs time_t de 64 bits",
      "props": {
        "theme": "dark",
        "title": "DÓNDE VIVE EL BUG",
        "subtitle": "TIME_T DE 32 BITS VS 64 BITS",
        "leftTitle": "LO QUE HACES HOY",
        "leftCode": "time_t now = time(NULL);\n// 32 bits: máximo 2,147,483,647\n// 2038-01-19 03:14:07 UTC",
        "rightTitle": "LO QUE DEBERÍAS HACER",
        "rightCode": "int64_t now = time(NULL);\n// 64 bits: hasta el año 292,277,026,596\n// migra antes de 2038",
        "leftStatus": "32 BITS: 2038",
        "rightStatus": "64 BITS: SIGLO XXIX",
        "leftFooter": "✖ STATUS: OVERFLOW PROGRAMADO",
        "rightFooter": "✔ STATUS: RANGO MIGRADO",
        "diffNote": "NO ES UN BUG DE CIENCIA FICCIÓN"
      }
    },
    {
      "id": "s04_comparativa",
      "type": "metrics_comparison",
      "duration": 7,
      "voiceover": "No vas a estar despierto a las 3 a.m. en 2038. Vas a estar migrando un sistema sin documentación.",
      "visual_cue": "Rango de 32 bits vs 64 bits",
      "props": {
        "theme": "dark",
        "badge": "RANGO // TIME_T",
        "title": "EL TECHO DE 32 BITS",
        "barA": 1,
        "barB": 100,
        "metricA": {
          "name": "32 BITS",
          "value": "2.1B seg",
          "sub": "Se agota el 19/01/2038",
          "color": "#ef4444"
        },
        "metricB": {
          "name": "64 BITS",
          "value": "9.22e18 seg",
          "sub": "Hasta el año 292,277,026,596",
          "color": "#10b981"
        },
        "speedup": "2038 VS EL AÑO 292,277,026,596"
      }
    },
    {
      "id": "s05_cta",
      "type": "kinetic_slam",
      "duration": 6,
      "voiceover": "Comenta 2038 y te paso el comando para auditar tus tablas. El pasante te lo agradecerá.",
      "visual_cue": "CTA: comenta 2038 para auditar tablas",
      "props": {
        "theme": "dark",
        "badge": "AUDITORÍA // 2038",
        "lines": [
          {
            "text": "COMENTA",
            "color": "#ffffff"
          },
          {
            "text": "2038",
            "color": "#fbbf24",
            "highlight": "#fbbf24",
            "textColor": "#050505"
          },
          {
            "text": "Y TE PASO EL CHECKLIST",
            "color": "#ffffff"
          }
        ],
        "stat": "AUDITA TUS TABLAS ANTES DE 2038",
        "subtitle": "SEDEV // INGENIERÍA QUE SE ENTIENDE"
      }
    }
  ]
};
