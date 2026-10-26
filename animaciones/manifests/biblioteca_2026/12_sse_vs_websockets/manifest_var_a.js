window.__DEFAULT_MANIFEST__ = {
  "title": "[12] Por qué Server-Sent Events es superior a WebSockets en HTTP/2 (Var A)",
  "category": "REDES & PROTOCOLOS WEB",
  "slug": "12_sse_vs_websockets",
  "variation": "A",
  "fps": 30,
  "scenes": [
    {
      "id": "network_pipeline_sse",
      "type": "network_pipeline",
      "duration": 6,
      "voiceover": "Si solo necesitas enviar datos del servidor al navegador, usar WebSockets es complicar tu arquitectura innecesariamente.",
      "visual_cue": "Tubería de paquetes HTTP/2 mostrando multiplexación de streams SSE con reconexión automática",
      "props": {
        "header": "FLUJO DE PAQUETES HTTP/2",
        "title": "MULTIPLEXACIÓN NATIVA DE STREAMS",
        "latency": "2.4 ms",
        "stages": [
          {
            "name": "TCP + TLS 1.3 Handshake",
            "tag": "Conexión compartida"
          },
          {
            "name": "HTTP/2 Stream Multiplexing",
            "tag": "Mismo puerto 443"
          },
          {
            "name": "Server-Sent Events Pipeline",
            "tag": "Text/event-stream"
          }
        ]
      }
    },
    {
      "id": "tradeoff_sse_ws",
      "type": "tradeoff_matrix",
      "duration": 6,
      "voiceover": "Server-Sent Events corre sobre HTTP tradicional. Tiene reconexión nativa, atraviesa proxies empresariales y aprovecha la compresión de cabeceras de HTTP/2.",
      "visual_cue": "Matriz comparativa exhaustiva entre SSE y WebSockets",
      "props": {
        "header": "COMPARATIVA DE PROTOCOLOS",
        "title": "SSE VS WEBSOCKETS EN HTTP/2",
        "colA": "SERVER-SENT EVENTS (SSE)",
        "colB": "WEBSOCKETS",
        "rows": [
          {
            "dim": "Transporte",
            "a": "HTTP/2 Estándar (443)",
            "b": "Protocolo WS custom",
            "aGood": true
          },
          {
            "dim": "Reconexión automática",
            "a": "Nativa en EventSource",
            "b": "Lógica manual frágil",
            "aGood": true
          },
          {
            "dim": "Proxies y Firewalls",
            "a": "Cero problemas de bloqueo",
            "b": "Cortes frecuentes por proxy",
            "aGood": true
          }
        ]
      }
    },
    {
      "id": "cta_sse",
      "type": "terminal_split",
      "duration": 5.5,
      "voiceover": "Ayudo a simplificar infraestructuras en tiempo real y eliminar capas de WebSocket innecesarias. Link en mi perfil para auditar tus arquitecturas de red.",
      "visual_cue": "Terminal mostrando curl -N escuchando stream de eventos y llamada a la acción en bio",
      "props": {
        "header": "CONSULTORÍA DE PROTOCOLOS (Link en bio)",
        "title": "STREAMING SENCILLO Y ROBUSTO",
        "leftTitle": "CURL -N INSPECCIÓN",
        "rightTitle": "MÉTRICAS CLAVE",
        "leftText": "$ curl -N https://api.app.io/v1/stream\nHTTP/2 200 OK\ncontent-type: text/event-stream\n\nevent: update\ndata: {\"status\": \"ok\", \"latency\": \"2ms\"}",
        "rightText": "• Cero servidores socket dedicados\n• Compatible con cualquier CDN y Edge\n• Reduce uso de memoria en un 60%\n• Agenda sesión técnica: link en bio"
      }
    }
  ]
};
