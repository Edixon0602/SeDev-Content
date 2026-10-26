window.__DEFAULT_MANIFEST__ = {
  "title": "[12] No compliques tu stack: Deja de usar WebSockets para simples streams (Var B)",
  "category": "REDES & PROTOCOLOS WEB",
  "slug": "12_sse_vs_websockets",
  "variation": "B",
  "fps": 30,
  "scenes": [
    {
      "id": "ws_failure_hook",
      "type": "terminal_split",
      "duration": 6,
      "voiceover": "Mantener un clúster de WebSockets requiere balanceadores especiales, heartbeat constante y una pesadilla de reconexión cuando falla la red móvil.",
      "visual_cue": "Terminal mostrando cortes de conexión WebSocket vs flujo continuo de SSE",
      "props": {
        "header": "ANTIPATRÓN EN PRODUCCIÓN",
        "title": "LA FRAGILIDAD DE WEBSOCKETS",
        "leftTitle": "WEBSOCKET CLÚSTER",
        "rightTitle": "STREAMING CON SSE",
        "leftText": "✖ Conexión caída en túnel móvil\n✖ Handshake WS bloqueado por proxy corporativo\n✖ Requiere servidores socket con estado",
        "rightText": "✔ EventSource reconecta automáticamente\n✔ Pasa por Cloudflare y CDNs sin cambios\n✔ Stateless en balanceadores de carga"
      }
    },
    {
      "id": "network_diagram",
      "type": "network_pipeline",
      "duration": 5.5,
      "voiceover": "Si tu cliente solo escucha actualizaciones del servidor como chats o cotizaciones, SSE sobre HTTP/2 es diez veces más fácil de operar. Link en mi bio.",
      "visual_cue": "Tubería de paquetes HTTP/2 procesando el stream de eventos",
      "props": {
        "header": "SIMPLICIDAD OPERATIVA",
        "title": "TEXT/EVENT-STREAM EN HTTP/2",
        "latency": "1.8 ms",
        "stages": [
          {
            "name": "Gateway Edge",
            "tag": "Caché transparente"
          },
          {
            "name": "HTTP/2 Multiplexing",
            "tag": "1 sola conexión TCP"
          },
          {
            "name": "Browser EventSource",
            "tag": "Reconexión automática"
          }
        ]
      }
    }
  ]
};
