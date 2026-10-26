window.__DEFAULT_MANIFEST__ = {
  "title": "[01] Por qué tu startup NO necesita microservicios (Var B)",
  "category": "ARQUITECTURA DE SOFTWARE",
  "slug": "01_monolito_modular",
  "variation": "B",
  "fps": 30,
  "scenes": [
    {
      "id": "direct_terminal_hook",
      "type": "terminal_split",
      "duration": 6.5,
      "voiceover": "Tu startup tiene tres desarrolladores y diez microservicios. Están quemando la mitad de su tiempo y presupuesto manteniendo Kubernetes.",
      "visual_cue": "Apertura directa con terminal comparando factura mensual y tiempo de despliegue",
      "props": {
        "header": "EL COSTE DE LA MODA",
        "title": "KUBERNETES VS UN SOLO SERVIDOR",
        "subtitle": "COMPARATIVA DE COSTES REALES EN PRODUCCIÓN",
        "termA": {
          "title": "STACK CON MICROSERVICIOS",
          "color": "#ef4444",
          "cmd": "kubectl get pods --all-namespaces",
          "status": "24 pods en ejecución · 8 clusters",
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
        "colA": "STARTUPS Y PYMES",
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
            "a": "0 personas dedicadas",
            "b": "Equipo entero",
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
          "npx audit --target=microservices --strategy=consolidation",
          "Resultado estimado: -75% costes y 5x velocidad de entrega",
          "Agenda tu sesión técnica en el link de la bio."
        ],
        "cursorLine": 3
      }
    }
  ]
};
