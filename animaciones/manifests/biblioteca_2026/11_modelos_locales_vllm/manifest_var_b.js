window.__DEFAULT_MANIFEST__ = {
  "title": "[11] Soberanía de Datos: Corre 100 tokens/s en local sin pagar APIs (Var B)",
  "category": "AI INFRASTRUCTURE & OPEN WEIGHTS",
  "slug": "11_modelos_locales_vllm",
  "variation": "B",
  "fps": 30,
  "scenes": [
    {
      "id": "api_split_hook",
      "type": "terminal_split",
      "duration": 6.5,
      "voiceover": "Pagar tokens por cada petición a OpenAI está arruinando tus márgenes y exponiendo los datos privados de tus clientes.",
      "visual_cue": "Apertura directa con terminal comparando coste de API propietaria vs inferencia local",
      "props": {
        "header": "ANÁLISIS FINANCIERO",
        "title": "APIS PROPIETARIAS VS HARDWARE PROPIO",
        "termA": {
          "title": "APIS PROPIETARIAS EN LA NUBE",
          "color": "#ef4444",
          "cmd": "api.openai.com/v1/chat/completions",
          "status": "Factura escalando sin control",
          "time": "$6,200/mes",
          "lines": [
            "Pagas por cada prompt y cada respuesta",
            "Riesgo de rate limits y caídas imprevistas",
            "Tus datos sensibles viajan a servidores de terceros"
          ]
        },
        "termB": {
          "title": "SERVIDOR DE INFERENCIA VLLM",
          "color": "#10b981",
          "cmd": "localhost:8000/v1/chat/completions",
          "status": "Tarifa plana de servidor con 2x RTX 4090",
          "time": "$320/mes",
          "lines": [
            "Inferencia ilimitada las 24 horas del día",
            "Latencia local de 15ms sin salir de tu VPC",
            "Cumplimiento estricto de privacidad GDPR y HIPAA"
          ]
        }
      }
    },
    {
      "id": "cta_quant_b",
      "type": "tradeoff_matrix",
      "duration": 5,
      "voiceover": "Diseño e implemento infraestructura de IA on-premise y clústeres vLLM para empresas. Agenda tu diagnóstico en mi perfil.",
      "visual_cue": "Cierre con consultoría de IA privada",
      "props": {
        "header": "CONSULTORÍA DE IA ON-PREMISE",
        "title": "INFRAESTRUCTURA PRIVADA DE INFERENCIA",
        "cta": {
          "badge": "CONSULTORÍA DE IA (Contacto en bio)",
          "text": "Recorta costes de API y asegura la privacidad de tus datos. Link en mi perfil."
        }
      }
    }
  ]
};
