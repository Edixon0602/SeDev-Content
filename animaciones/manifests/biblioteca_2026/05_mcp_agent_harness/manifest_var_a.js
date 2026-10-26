window.__DEFAULT_MANIFEST__ = {
  "title": "[05] Model Context Protocol (MCP): El estándar universal para IA y código (Var A)",
  "category": "AI ENGINEERING & AGENT PROTOCOLS",
  "slug": "05_mcp_agent_harness",
  "variation": "A",
  "fps": 30,
  "scenes": [
    {
      "id": "mcp_hook",
      "type": "architecture_flow",
      "duration": 6.5,
      "voiceover": "El prompt engineering murió. La verdadera ingeniería de IA conecta modelos directamente a tus bases de datos mediante Model Context Protocol.",
      "visual_cue": "Apertura directa con arquitectura de protocolo cliente-servidor de herramientas",
      "props": {
        "header": "ARQUITECTURA DE PROTOCOLO",
        "title": "DESACOPLAMIENTO DE HERRAMIENTAS",
        "nodes": [
          {
            "id": "llm",
            "label": "AGENTE / CLIENTE MCP",
            "sublabel": "Claude Code · Cursor · Custom Runner",
            "color": "#a855f7",
            "y": 160
          },
          {
            "id": "protocol",
            "label": "PROTOCOLO JSON-RPC 2.0",
            "sublabel": "Capabilities Negotiation · Tools & Resources",
            "color": "#38bdf8",
            "y": 520
          },
          {
            "id": "servers",
            "label": "SERVIDORES MCP AISLADOS",
            "sublabel": "PostgreSQL · GitHub · Terminal Shell",
            "color": "#10b981",
            "y": 880
          }
        ]
      }
    },
    {
      "id": "mcp_terminal",
      "type": "code_terminal",
      "duration": 6,
      "voiceover": "Un servidor MCP expone esquemas en JSON estricto. La IA invoca funciones con tipado seguro y maneja errores sin alucinaciones.",
      "visual_cue": "Terminal mostrando definición de herramienta en servidor MCP con TypeScript",
      "props": {
        "header": "ESPECIFICACIÓN DE HERRAMIENTAS",
        "title": "SERVIDOR MCP EN TYPESCRIPT",
        "filename": "mcp/database_server.ts",
        "codeLines": [
          "server.setRequestHandler(ListToolsRequestSchema, async () => ({",
          "  tools: [{",
          "    name: \"query_database\",",
          "    description: \"Ejecuta consultas de solo lectura en Postgres\",",
          "    inputSchema: zodToJsonSchema(QuerySchema)",
          "  }]",
          "}));"
        ],
        "cursorLine": 6
      }
    },
    {
      "id": "cta_mcp",
      "type": "tradeoff_matrix",
      "duration": 5,
      "voiceover": "Diseño e integro agentes autónomos y servidores MCP para flujos empresariales complejos. Si buscas un desarrollador senior para liderar tu proyecto de IA, link en mi bio.",
      "visual_cue": "Cierre con contratación senior backend / IA",
      "props": {
        "header": "DESARROLLO SENIOR BACKEND Y IA",
        "title": "ARQUITECTURAS AGÉNTICAS A MEDIDA",
        "cta": {
          "badge": "STAFF ENGINEER (Link en bio)",
          "text": "¿Necesitas integrar agentes de IA en tu infraestructura? Hablemos en el enlace de mi perfil."
        }
      }
    }
  ]
};
