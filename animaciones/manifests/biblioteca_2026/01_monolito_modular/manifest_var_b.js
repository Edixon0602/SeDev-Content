window.__DEFAULT_MANIFEST__ = {
  "title": "[01] Por qué tu startup NO necesita microservicios (Var B)",
  "category": "ARQUITECTURA DE SOFTWARE",
  "slug": "01_monolito_modular",
  "variation": "B",
  "fps": 30,
  "scenes": [
    {
      "id": "hook_b",
      "type": "kinetic_hook",
      "duration": 4.5,
      "voiceover": "Tu startup tiene tres desarrolladores y diez microservicios. Están quemando el cincuenta por ciento de su tiempo manteniendo Kubernetes.",
      "visual_cue": "Gancho cinético agresivo de llamada de atención",
      "props": {
        "badge": "REALIDAD DE STARTUP",
        "lines": [
          {
            "text": "DEJA DE USAR",
            "color": "#ef4444"
          },
          {
            "text": "MICROSERVICIOS",
            "color": "#ffffff"
          }
        ],
        "subtitle": "COMPLEJIDAD ACCIDENTAL // VELOCIDAD CERO",
        "icon": "server_rack"
      }
    },
    {
      "id": "bill_compare",
      "type": "terminal_split",
      "duration": 6,
      "voiceover": "Amazon Prime Video y Shopify consolidaron servicios para recortar el noventa por ciento de sus costes y latencias.",
      "visual_cue": "Doble terminal comparando factura mensual y tiempo de despliegue",
      "props": {
        "header": "EL COSTE DE LA MODA",
        "title": "KUBERNETES VS UN SOLO SERVIDOR",
        "subtitle": "DESPLIEGUE REAL EN PRODUCCIÓN",
        "termA": {
          "title": "STACK CON MICROSERVICIOS",
          "color": "#ef4444",
          "cmd": "kubectl get pods --all-namespaces",
          "status": "24 pods en ejecución // 8 clusters",
          "time": "$3,800/mes",
          "lines": [
            "Factura AWS EKS + NAT Gateways: $3,800",
            "Tiempo medio de debugging: 4 horas",
            "Tracing distribuido obligatorio con Jaeger"
          ]
        },
        "termB": {
          "title": "MONOLITO MODULAR CON KAMAL",
          "color": "#10b981",
          "cmd": "kamal deploy",
          "status": "1 solo binario en VPS dedicado",
          "time": "$120/mes",
          "lines": [
            "Factura servidor Hetzner: $120/mes",
            "Tiempo medio de deploy: 18 segundos",
            "Logs centralizados en stdout directos"
          ]
        }
      }
    },
    {
      "id": "verdict_b",
      "type": "tradeoff_matrix",
      "duration": 6,
      "voiceover": "Los microservicios resuelven problemas de organización cuando tienes mil ingenieros, no de rendimiento técnico.",
      "visual_cue": "Matriz de tradeoffs demoledora",
      "props": {
        "header": "PRAGMATISMO TÉCNICO",
        "title": "¿CUÁNDO USAR CADA UNO?",
        "colA": "STARTUPS & PYMES",
        "colB": "BIG TECH (+500 DEVS)",
        "rows": [
          {
            "dim": "Arquitectura recomendada",
            "a": "Monolito Modular",
            "b": "Microservicios",
            "aGood": true
          },
          {
            "dim": "Tiempo a producción",
            "a": "1 semana",
            "b": "3 meses",
            "aGood": true
          },
          {
            "dim": "Mantenimiento DevOps",
            "a": "0 personas",
            "b": "Equipo dedicado",
            "aGood": true
          }
        ]
      }
    },
    {
      "id": "cta_b",
      "type": "code_terminal",
      "duration": 5,
      "voiceover": "Si tu equipo pasa más tiempo arreglando pipelines que creando producto, audito tu arquitectura para volver a la simplicidad. Agenda en mi perfil.",
      "visual_cue": "Terminal de contacto con auditoría técnica",
      "props": {
        "header": "AUDITORÍA DE ARQUITECTURA",
        "title": "DESMANTELA LA COMPLEJIDAD",
        "filename": "audit/contact.sh",
        "codeLines": [
          "# Diagnóstico de cuellos de botella y costes cloud",
          "sedev audit --target=microservices --strategy=consolidation",
          "✔ Retorno estimado: -75% costes y 5x velocidad de entrega",
          "# Agenda tu sesión técnica en el link de la bio."
        ],
        "cursorLine": 3
      }
    }
  ]
};
