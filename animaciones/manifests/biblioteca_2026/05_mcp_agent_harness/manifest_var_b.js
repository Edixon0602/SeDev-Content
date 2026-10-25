window.__DEFAULT_MANIFEST__ = {
  "title": "[05] El \"Prompting\" ha muerto: Por qué la industria se mudó a los arneses de IA (Var B)",
  "category": "AI ENGINEERING & AGENT PROTOCOLS",
  "slug": "05_mcp_agent_harness",
  "variation": "B",
  "fps": 30,
  "scenes": [
    {
      "id": "hook_mcp_b",
      "type": "kinetic_hook",
      "duration": 4.5,
      "voiceover": "Hacer prompts gigantescos no te dará software de producción. Lo que importa es el arnés de ejecución y las herramientas que le das al modelo.",
      "visual_cue": "Gancho cinético sobre la muerte del prompt engineering",
      "props": {
        "badge": "DEBATES DE INGENIERÍA",
        "lines": [
          {
            "text": "EL PROMPTING",
            "color": "#ef4444"
          },
          {
            "text": "HA MUERTO",
            "color": "#ffffff"
          }
        ],
        "subtitle": "EL PODER ESTÁ EN EL ARNÉS DE EJECUCIÓN",
        "icon": "agent_loop"
      }
    },
    {
      "id": "split_prompt_vs_harness",
      "type": "terminal_split",
      "duration": 6,
      "voiceover": "Un mal prompt en un buen arnés con tests automáticos gana siempre a un prompt perfecto sin capacidad de ejecución.",
      "visual_cue": "Doble terminal: Vibe Prompting vs Agent Harness con bucle de verificación",
      "props": {
        "header": "MÉTODO DE DESARROLLO",
        "title": "PROMPT PURO VS BUCLE DE VERIFICACIÓN",
        "termA": {
          "title": "PROMPTING TRADICIONAL",
          "color": "#ef4444",
          "cmd": "chat_gpt(\"escribe un backend completo\")",
          "status": "Alucinaciones en imports y dependencias",
          "time": "Fallo silente",
          "lines": [
            "Genera 500 líneas de código sin verificar",
            "Usa librerías deprecadas o inexistentes",
            "Cero tests de ejecución"
          ]
        },
        "termB": {
          "title": "AGENT HARNESS DETERMINISTA",
          "color": "#10b981",
          "cmd": "agent run --verify --strict-sandbox",
          "status": "Ejecuta tests, detecta errores y autocorrige",
          "time": "✔ Verificado",
          "lines": [
            "Llama a servidor MCP para validar esquema de DB",
            "Corre suite de tests unitarios antes de commitear",
            "Feedback loop determinista en tiempo real"
          ]
        }
      }
    },
    {
      "id": "cta_mcp_b",
      "type": "tradeoff_matrix",
      "duration": 5,
      "voiceover": "Construyo arneses de automatización e integraciones complejas para empresas. Si necesitas un ingeniero especializado en flujos de IA, link en mi biografía.",
      "visual_cue": "Cierre con contratación directa senior",
      "props": {
        "header": "CONTRATACIÓN SENIOR BACKEND",
        "title": "SISTEMAS AUTÓNOMOS Y AGENTES ROBUSTOS",
        "cta": {
          "badge": "LEAD DEVELOPER // SEDEV",
          "text": "Desarrollo de agentes y flujos autónomos de alta fiabilidad. Contáctame en mi biografía."
        }
      }
    }
  ]
};
