window.__DEFAULT_MANIFEST__ = {
  "title": "[05] El \"Prompting\" ha muerto: Por qué la industria se mudó a los arneses de IA (Var B)",
  "category": "INTELIGENCIA ARTIFICIAL",
  "slug": "05_mcp_agent_harness",
  "variation": "B",
  "fps": 30,
  "scenes": [
    {
      "id": "harness_diagram",
      "type": "quantization_weights_viz",
      "duration": 6,
      "voiceover": "Intentar que una IA programe escribiéndole biblias de texto es una pérdida de tiempo. Los equipos serios usan arneses deterministas con MCP.",
      "visual_cue": "Visualizador del harness de ingeniería conectando IA con herramientas estructuradas",
      "props": {
        "mode": "mcp",
        "badge": "INGENIERÍA VS PROMPTING",
        "title": "EL FIN DEL PROMPTING INFORMAL",
        "subtitle": "HERRAMIENTAS ESTRUCTURADAS Y CONTRATOS ESTRICTOS"
      }
    },
    {
      "id": "terminal_eval",
      "type": "terminal_split",
      "duration": 5.5,
      "voiceover": "El arnés compila, corre los tests, lee los errores y le devuelve al modelo exactamente lo que necesita arreglar. Link en mi perfil para consultoría de IA.",
      "visual_cue": "Terminal mostrando ciclo autónomo: código -> test fallido -> mutación -> test verde",
      "props": {
        "header": "CONSULTORÍA EN IA (Link en bio)",
        "title": "LOOP AUTÓNOMO DE VERIFICACIÓN",
        "leftTitle": "EJECUCIÓN DEL ARNÉS",
        "rightTitle": "RESULTADO DE CÓDIGO",
        "leftText": "$ agent-harness run-task\n✔ Generando parche de código...\n✖ npm test falló: TypeError en auth.ts:42\n✔ Reintentando con contexto del error\n✔ npm test pasó al 100% (Green)",
        "rightText": "• Cero alucinaciones sin verificar\n• Parches validados por tests antes de merge\n• Automatización real para equipos de software\n• Agenda tu sesión: enlace en mi perfil"
      }
    }
  ]
};
