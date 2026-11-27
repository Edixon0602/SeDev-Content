window.__DEFAULT_MANIFEST__ = {
  "title": "SeDev VO 02 — La expresión regular de una línea que tumbó el 80% de Cloudflare",
  "slug": "vo_02_cloudflare_regex",
  "brand": "sedev",
  "format": "voiceover_motion",
  "ground": "graphite",
  "accent": "#fb6f54",
  "fps": 30,
  "output": "animaciones/output_clips/vo_02_cloudflare_regex.mp4",
  "scenes": [
    {
      "id": "s01_hook_cloudflare",
      "type": "hook_impact",
      "duration": 4,
      "voiceover": "Una sola línea de texto tumbó el ochenta por ciento de Cloudflare.",
      "visual_cue": "Hook editorial sobre graphite: 80% del tráfico mundial caído por una sola regla regex.",
      "props": {
        "editorial": true,
        "ground": "graphite",
        "accent": "#fb6f54",
        "badge": "INCIDENTE WAF GLOBAL",
        "indexLabel": "",
        "kicker": "PATRÓN: .*.*=.*",
        "lines": [
          {
            "text": "1 LÍNEA DE REGEX",
            "color": "#ffffff"
          },
          {
            "text": "-80% DE TRÁFICO",
            "highlight": "#fb6f54",
            "textColor": "#050505"
          }
        ],
        "metric": {
          "from": 0,
          "value": 80,
          "suffix": "%",
          "label": "TRÁFICO MUNDIAL AFECTADO POR UNA REGLA"
        },
        "note": "2 de julio de 2019 · Error 502 masivo durante 27 minutos.",
        "tags": [
          "WAF",
          "CPU 100%",
          "ERROR 502"
        ],
        "icon": "cpu",
        "iconColor": "#fb6f54",
        "iconMode": "draw",
        "cameraMode": "impact",
        "impactTimes": [
          0,
          0.5,
          1.05
        ]
      }
    },
    {
      "id": "s02_context_waf",
      "type": "editorial_explainer",
      "duration": 12,
      "voiceover": "Cualquiera que haya copiado una expresión regular sabe que parecen magia negra, hasta que reciben un texto largo y cuelgan el servidor. Eso le pasó a Cloudflare en dos mil diecinueve.",
      "visual_cue": "Contexto editorial: una regla de texto entrando al firewall global.",
      "props": {
        "editorial": true,
        "ground": "graphite",
        "variant": "cause",
        "kicker": "2 DE JULIO DE 2019",
        "headline": "UNA REGLA EN EL FIREWALL",
        "support": "Un patrón sin límite puede colgar toda la flota.",
        "icon": "kernel_shield",
        "accent": "#f59e0b",
        "cameraMode": "steady"
      }
    },
    {
      "id": "s03_backtracking_crash",
      "type": "terminal_split",
      "duration": 20,
      "voiceover": "Subieron una regla al firewall para frenar ataques, pero llevaba un patrón que provoca backtracking catastrófico. Cuando una petición casi coincide y falla al final, el motor prueba miles de combinaciones hacia atrás y clava la CPU al cien por ciento. Resultado: errores quinientos dos por veintisiete minutos.",
      "visual_cue": "Cirugía del patrón .*.*=.* provocando backtracking exponencial vs regla acotada.",
      "props": {
        "editorial": true,
        "ground": "graphite",
        "title": "BACKTRACKING CATASTRÓFICO",
        "subtitle": "WAF MANAGED RULES · 27 MIN DE CAÍDA",
        "leftTitle": "PATRÓN SIN LÍMITE (CPU 100%)",
        "leftColor": "#fb6f54",
        "leftStatus": "502 · 27 MIN",
        "leftFooter": "✖ BACKTRACKING EXPONENCIAL EN PETICIONES LARGAS",
        "leftCode": "-- Regla desplegada al WAF global\n(?:.*.*=.*)\n-- Input casi válido + fallo al final\n-- Reintenta miles de combinaciones\n-- Resultado: 502 Bad Gateway global",
        "rightTitle": "REGLA ACOTADA + TIMEOUT",
        "rightColor": "#10b981",
        "rightStatus": "ACOTADA",
        "rightFooter": "✔ TIEMPO LINEAL O(N) SIN EXPLOSIÓN DE CPU",
        "rightCode": "-- Limitar longitud antes de evaluar\nif (input.length > MAX_LEN) return block;\n-- Usar patrones sin cuantificadores anidados\n-- Timeout estricto de CPU por regla\n-- + Kill switch independiente del WAF",
        "cameraMode": "push",
        "pushAmount": 0.03
      }
    },
    {
      "id": "s04_rule_cpu_limit",
      "type": "editorial_explainer",
      "duration": 8,
      "voiceover": "Una regla de firewall no es solo texto: necesita límite de CPU, pruebas reales y un botón de apagado rápido.",
      "visual_cue": "Transformación editorial: de configuración frágil a despliegue protegido.",
      "props": {
        "editorial": true,
        "ground": "graphite",
        "variant": "transform",
        "kicker": "BLINDAJE DE REGLAS",
        "headline": "LÍMITE DE CPU Y KILL SWITCH",
        "support": "Pruebas con tráfico real y apagado en segundos.",
        "icon": "cpu",
        "accent": "#10b981",
        "cameraMode": "steady"
      }
    },
    {
      "id": "s05_cta_regex",
      "type": "kinetic_slam",
      "duration": 6,
      "voiceover": "¿Tienes algún regex en producción procesando texto del usuario sin límite de longitud?",
      "visual_cue": "Cierre editorial sobre regex sin límite de longitud.",
      "props": {
        "editorial": true,
        "ground": "graphite",
        "accent": "#f59e0b",
        "danger": "#fb6f54",
        "badge": "AUDITORÍA EN PRODUCCIÓN",
        "indexLabel": "",
        "lines": [
          {
            "text": "REGEX SIN LÍMITE",
            "color": "#fb6f54",
            "strike": true
          },
          {
            "text": "CPU PROTEGIDA",
            "highlight": "#f59e0b",
            "textColor": "#050505"
          }
        ],
        "statLabel": "POSTMORTEM",
        "stat": "3,868 REGLAS AUDITADAS TRAS EL INCIDENTE",
        "subtitle": "¿VALIDAS LA LONGITUD ANTES DE EVALUAR?",
        "icon": "cpu",
        "iconColor": "#f59e0b",
        "iconMode": "pulse",
        "cameraMode": "ratchet_push",
        "ratchetBeats": [
          0.4,
          1.2
        ]
      }
    }
  ]
};
