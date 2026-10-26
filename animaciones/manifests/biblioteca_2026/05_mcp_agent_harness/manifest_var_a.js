window.__DEFAULT_MANIFEST__ = {
  "title": "[05] Model Context Protocol (MCP): El estándar universal para IA y código (Var A)",
  "category": "INTELIGENCIA ARTIFICIAL",
  "slug": "05_mcp_agent_harness",
  "variation": "A",
  "fps": 30,
  "scenes": [
    {
      "id": "mcp_lead",
      "type": "quantization_weights_viz",
      "duration": 6,
      "voiceover": "Olvídate de pegar código a mano en el chat. Model Context Protocol es el estándar abierto que conecta modelos de IA con bases de datos, APIs y herramientas locales.",
      "visual_cue": "Visualizador del protocolo MCP conectando el harness de agentes con herramientas del entorno",
      "props": {
        "mode": "mcp",
        "badge": "ESTÁNDAR UNIVERSAL",
        "title": "MODEL CONTEXT PROTOCOL (MCP)",
        "subtitle": "COMUNICACIÓN TIPADA CLIENTE-SERVIDOR PARA AGENTES"
      }
    },
    {
      "id": "flow_mcp",
      "type": "architecture_flow",
      "duration": 6,
      "voiceover": "Funciona como un Language Server Protocol: el modelo solicita herramientas y el servidor MCP ejecuta la acción de forma segura en tu máquina.",
      "visual_cue": "Flujo de comunicación entre Claude / GPT, el arnés de MCP y las herramientas locales",
      "props": {
        "header": "CONTRATO DE HERRAMIENTAS",
        "title": "ARQUITECTURA CLIENTE - SERVIDOR MCP",
        "nodes": [
          {
            "id": "llm",
            "label": "MODELO DE IA (LLM)",
            "sublabel": "Claude · GPT-4 · DeepSeek",
            "color": "#a855f7",
            "y": 160
          },
          {
            "id": "client",
            "label": "MCP CLIENT (ARNÉS)",
            "sublabel": "Validación de JSON-Schema y permisos",
            "color": "#38bdf8",
            "y": 520
          },
          {
            "id": "servers",
            "label": "MCP SERVERS LOCALES",
            "sublabel": "Postgres · Terminal · Git · FileSystem",
            "color": "#10b981",
            "y": 880
          }
        ]
      }
    },
    {
      "id": "terminal_mcp",
      "type": "terminal_split",
      "duration": 5.5,
      "voiceover": "Esto convierte a los modelos en agentes autónomos reales con límites de seguridad estrictos. Link en bio si quieres integrar IA en tu software de producción.",
      "visual_cue": "Terminal mostrando ejecución de herramienta MCP con validación estricta de esquema",
      "props": {
        "header": "DESARROLLO DE AGENTES (Link en bio)",
        "title": "AGENTES DETERMINISTAS",
        "leftTitle": "TRAZA JSON-RPC",
        "rightTitle": "BENEFICIOS DE MCP",
        "leftText": "--> tools/call {\"name\": \"query_db\", \"sql\": \"...\"}\n<-- tools/result {\"rows\": 4, \"time_ms\": 1.2}\n✔ Schema validado con Zod / JSON-Schema",
        "rightText": "• Sin wrappers propietarios frágiles\n• Conecta cualquier modelo a tus datos\n• Ejecución local 100% segura\n• Construye agentes serios: link en bio"
      }
    }
  ]
};
