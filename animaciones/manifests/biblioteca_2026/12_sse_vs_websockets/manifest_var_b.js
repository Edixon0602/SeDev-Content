window.__DEFAULT_MANIFEST__ = {
  "title": "[12] No compliques tu stack: Deja de usar WebSockets para simples streams (Var B)",
  "category": "REDES & PROTOCOLOS WEB",
  "slug": "12_sse_vs_websockets",
  "variation": "B",
  "fps": 30,
  "scenes": [
    {
      "id": "hook_sse_b",
      "type": "kinetic_hook",
      "duration": 4.5,
      "voiceover": "Usar WebSockets solo para mostrar texto progresivo o notificaciones es matar moscas a cañonazos y complicar tus balanceadores de carga.",
      "visual_cue": "Gancho cinético contra el uso excesivo de WebSockets",
      "props": {
        "badge": "SIMPLICIDAD DE ARQUITECTURA",
        "lines": [
          {
            "text": "DEJA DE USAR",
            "color": "#ef4444"
          },
          {
            "text": "WEBSOCKETS",
            "color": "#ffffff"
          }
        ],
        "subtitle": "CUÁNDO USAR CADA PROTOCOLO",
        "icon": "network_packet"
      }
    },
    {
      "id": "tradeoff_ws_sse",
      "type": "tradeoff_matrix",
      "duration": 6,
      "voiceover": "Reserva WebSockets únicamente para cuando necesitas comunicación bidireccional continua como juegos multijugador o audio en vivo.",
      "visual_cue": "Matriz comparativa de casos de uso reales",
      "props": {
        "header": "CRITERIO DE SELECCIÓN",
        "title": "SERVER-SENT EVENTS VS WEBSOCKETS",
        "colA": "SERVER-SENT EVENTS (SSE)",
        "colB": "WEBSOCKETS (WS)",
        "rows": [
          {
            "dim": "Streaming de IA & Notificaciones",
            "a": "✔ Perfecto y nativo",
            "b": "✖ Sobreingeniería",
            "aGood": true
          },
          {
            "dim": "Reconexión automática",
            "a": "✔ Manejada por el browser",
            "b": "✖ Manual con código JS",
            "aGood": true
          },
          {
            "dim": "Compatibilidad con Proxies",
            "a": "✔ HTTP/2 estándar",
            "b": "✖ Requiere Upgrade HTTP",
            "aGood": true
          },
          {
            "dim": "Juegos online & Audio full-duplex",
            "a": "✖ Unidireccional",
            "b": "✔ Ideal para bidireccional",
            "aGood": false
          }
        ]
      }
    },
    {
      "id": "cta_sse_b",
      "type": "tradeoff_matrix",
      "duration": 5,
      "voiceover": "Audito la arquitectura de red de aplicaciones web para simplificar el stack y mejorar la fiabilidad. Agenda en el link de mi perfil.",
      "visual_cue": "Cierre con auditoría de arquitectura",
      "props": {
        "header": "AUDITORÍA DE ARQUITECTURA WEB",
        "title": "SIMPLIFICA TUS CONEXIONES DE RED",
        "cta": {
          "badge": "AUDITORÍA DE ARQUITECTURA // SEDEV",
          "text": "Elimina complejidad innecesaria en tu backend. Link en mi perfil para agendar tu revisión."
        }
      }
    }
  ]
};
