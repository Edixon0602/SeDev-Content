window.__DEFAULT_MANIFEST__ = {
  "title": "[12] No compliques tu stack: Deja de usar WebSockets para simples streams (Var B)",
  "category": "REDES & PROTOCOLOS WEB",
  "slug": "12_sse_vs_websockets",
  "variation": "B",
  "fps": 30,
  "scenes": [
    {
      "id": "ws_tradeoff_hook",
      "type": "tradeoff_matrix",
      "duration": 6.5,
      "voiceover": "Usar WebSockets solo para mostrar texto progresivo o notificaciones complica tus balanceadores de carga sin ninguna necesidad técnica real.",
      "visual_cue": "Apertura directa con tabla comparativa de Server-Sent Events frente a WebSockets",
      "props": {
        "header": "CRITERIO DE SELECCIÓN",
        "title": "SERVER-SENT EVENTS VS WEBSOCKETS",
        "colA": "SERVER-SENT EVENTS (SSE)",
        "colB": "WEBSOCKETS (WS)",
        "rows": [
          {
            "dim": "Streaming de IA y feeds",
            "a": "✔ Perfecto y nativo",
            "b": "✖ Sobreingeniería",
            "aGood": true
          },
          {
            "dim": "Reconexión automática",
            "a": "✔ Manejada por browser",
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
            "dim": "Juegos online y Audio full-duplex",
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
          "badge": "AUDITORÍA DE ARQUITECTURA (Link en perfil)",
          "text": "Elimina complejidad innecesaria en tu backend. Link en mi perfil para agendar tu revisión."
        }
      }
    }
  ]
};
