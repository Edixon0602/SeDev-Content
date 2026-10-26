window.__DEFAULT_MANIFEST__ = {
  "title": "[11] Soberanía de Datos: Corre 100 tokens/s en local sin pagar APIs (Var B)",
  "category": "AI INFRASTRUCTURE & OPEN WEIGHTS",
  "slug": "11_modelos_locales_vllm",
  "variation": "B",
  "fps": 30,
  "scenes": [
    {
      "id": "latency_api_shock",
      "type": "latency_scale",
      "duration": 5.5,
      "voiceover": "Pagar tokens por cada petición a OpenAI está arruinando tus márgenes y exponiendo los datos privados de tus clientes a servidores de terceros.",
      "visual_cue": "Escala de latencia comparando tiempo de red a OpenAI vs inferencia local en tu propio hardware",
      "props": {
        "header": "LATENCIA Y PRIVACIDAD",
        "title": "API EXTERNA VS INFERENCIA LOCAL",
        "subtitle": "TIEMPO DE ESPERA EN RED VS ACCESO IN-HOUSE"
      }
    },
    {
      "id": "quant_demo",
      "type": "quantization_weights_viz",
      "duration": 6,
      "voiceover": "Con modelos cuantizados a cuatro bits en un servidor propio con tarjetas RTX obtienes inferencia ilimitada las veinticuatro horas del día por una tarifa fija.",
      "visual_cue": "Visualizador de tensores cuantizados corriendo en hardware accesible",
      "props": {
        "mode": "quant",
        "badge": "TARIFAS PLANAS",
        "title": "HARDWARE PROPIO SIN LÍMITES",
        "subtitle": "100 TOKENS/S SIN PAGAR POR CADA PROMPT"
      }
    }
  ]
};
