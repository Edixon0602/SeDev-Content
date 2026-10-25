window.__DEFAULT_MANIFEST__ = {
  "title": "[10] Kamal en Producción: Despliegue Zero-Downtime sin Kubernetes (Var A)",
  "category": "INFRAESTRUCTURA & CLOUD COSTS",
  "slug": "10_exodo_bare_metal_kamal",
  "variation": "A",
  "fps": 30,
  "scenes": [
    {
      "id": "hook_kamal",
      "type": "kinetic_hook",
      "duration": 4.5,
      "voiceover": "¿Cómo desplegar aplicaciones en contenedores con cero tiempo de inactividad sin la pesadilla de mantener un clúster de Kubernetes? Con Kamal.",
      "visual_cue": "Gancho cinético sobre Kamal y bare metal",
      "props": {
        "badge": "DEVOPS EN 2026",
        "lines": [
          {
            "text": "KAMAL: ADIÓS A",
            "color": "#ffffff"
          },
          {
            "text": "KUBERNETES",
            "color": "#38bdf8"
          }
        ],
        "subtitle": "ZERO-DOWNTIME DEPLOYS EN SERVIDORES SIMPLES",
        "icon": "server_rack"
      }
    },
    {
      "id": "kamal_flow",
      "type": "architecture_flow",
      "duration": 6.5,
      "voiceover": "Kamal levanta el nuevo contenedor, verifica el health check, cambia el tráfico a nivel de proxy Traefik y destruye el contenedor viejo sin perder una petición.",
      "visual_cue": "Diagrama de despliegue blue/green con proxy de balanceo",
      "props": {
        "header": "MECANISMO DE DESPLIEGUE",
        "title": "ROLLING RESTART CON TRAEFIK",
        "nodes": [
          {
            "id": "proxy",
            "label": "TRAEFIK PROXY REVERSE",
            "sublabel": "Manejo automático de certificados SSL y rutas",
            "color": "#38bdf8",
            "y": 160
          },
          {
            "id": "app_new",
            "label": "NUEVO CONTENEDOR (V2)",
            "sublabel": "Health check verificado en localhost:8001",
            "color": "#10b981",
            "y": 520
          },
          {
            "id": "app_old",
            "label": "CONTENEDOR ANTIGUO (V1)",
            "sublabel": "Drenado suave de conexiones activas",
            "color": "#71717a",
            "y": 880
          }
        ]
      }
    },
    {
      "id": "kamal_deploy",
      "type": "code_terminal",
      "duration": 6,
      "voiceover": "Todo se configura en un simple archivo YAML. Un comando en tu terminal y tu aplicación queda en producción en tus propios servidores.",
      "visual_cue": "Terminal ejecutando kamal deploy con salida de docker tags",
      "props": {
        "header": "CONFIGURACIÓN DECLARATIVA",
        "title": "DEPLOY CON UN SOLO COMANDO",
        "filename": "config/deploy.yml",
        "codeLines": [
          "service: api-core",
          "image: registry.gitlab.com/sedev/api",
          "servers:",
          "  web:",
          "    - 159.69.10.42 # Servidor Hetzner $40/mo",
          "kamal deploy # ✔ Completado en 24 segundos con 0s downtime"
        ],
        "cursorLine": 5
      }
    },
    {
      "id": "cta_kamal",
      "type": "tradeoff_matrix",
      "duration": 5,
      "voiceover": "Si tu empresa quema dinero en AWS y quieres migrar a una infraestructura simple en servidores dedicados, te asesoro en el proceso. Link en mi perfil.",
      "visual_cue": "Cierre con auditoría y migración cloud",
      "props": {
        "header": "MIGRACIÓN & AUDITORÍA CLOUD",
        "title": "REDUCE FACTURA HASTA UN 80%",
        "cta": {
          "badge": "AUDITORÍA CLOUD // SEDEV",
          "text": "¿Facturas absurdas en AWS o GCP? Agenda una sesión de migración en mi perfil."
        }
      }
    }
  ]
};
