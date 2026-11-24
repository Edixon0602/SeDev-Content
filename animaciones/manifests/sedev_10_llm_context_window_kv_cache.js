window.__DEFAULT_MANIFEST__ = {
  "title": "[10] Por qué tu IA se vuelve más cara y lenta mientras más hablas",
  "slug": "sedev_10_llm_context_window_kv_cache",
  "category": "IA REAL & COMPILACIÓN DE MODELOS",
  "tagline": "La atención cuadrática O(N²) y el cuello de botella del KV Cache en VRAM",
  "fps": 30,
  "outputDir": "animaciones/output_clips/sedev_brolls/sedev_10_llm_context_window_kv_cache",
  "script": {
    "hook": "Decirle a una inteligencia artificial 'recuerda toda esta conversación para siempre' es imposible por culpa de esta matriz matemática.",
    "broll1_lead": "En un modelo de lenguaje, cada palabra debe calcular su relación con todas las palabras anteriores. Si duplicas la longitud de tu conversación, el cómputo de la matriz de atención no sube al doble: sube al cuádruple.",
    "camera_pivot": "Para no recalcular todo desde cero en cada respuesta, los servidores guardan los vectores intermedios en una memoria llamada KV Cache.",
    "broll2_lead": "Con un contexto largo de treinta y dos mil tokens, ese cache puede comerse veinticuatro gigas de memoria de video para un solo usuario. Por eso las IAs cobran tanto por contextos gigantes.",
    "outro": "Detrás del texto fluido hay pura álgebra lineal y limitaciones físicas de hardware. Sígueme si quieres entender cómo funciona la IA por dentro."
  },
  "brolls": [
    {
      "id": "broll_01_attention_matrix_math",
      "purpose": "Matriz de auto-atención cuadrática O(N^2) multiplicando QK^T",
      "type": "quantization_weights_viz",
      "duration": 9,
      "props": {
        "theme": "blueprint",
        "title": "COMPLEJIDAD DE ATENCIÓN TRANSFORMER",
        "subtitle": "MATRIZ CUADRÁTICA O(N²): QKᵀ / √D_K",
        "metrics": [
          {
            "name": "Tokens: 2,048",
            "weight": "4.19M operaciones",
            "status": "FLUIDO EN GPU"
          },
          {
            "name": "Tokens: 8,192",
            "weight": "67.1M operaciones (16x)",
            "status": "VRAM MODERADA"
          },
          {
            "name": "Tokens: 32,768",
            "weight": "1,073M operaciones (256x)",
            "status": "KV CACHE SATURADO"
          }
        ]
      },
      "voiceover": "En un modelo de lenguaje, cada palabra debe calcular su relación con todas las palabras anteriores. Si duplicas la longitud de tu conversación, el cómputo de la matriz de atención no sube al doble: sube al cuádruple.",
      "visual_cue": "Matriz de auto-atención cuadrática O(N^2) multiplicando QK^T"
    },
    {
      "id": "broll_02_kv_cache_vram_saturation",
      "purpose": "Flujo de VRAM consumida por el KV Cache por usuario concurrente",
      "type": "cache_flow_viz",
      "duration": 9,
      "props": {
        "theme": "blueprint",
        "title": "SATURACIÓN DE MEMORIA VRAM (KV CACHE)",
        "subtitle": "24 GB CONSUMIDOS POR UN SOLO PROMPT MASIVO",
        "cacheSize": "24.6 GB EN H100",
        "hitRate": "O(N) ESPACIO / TOKEN",
        "evictionPolicy": "FLASHATTENTION TILING"
      },
      "voiceover": "Con un contexto largo de treinta y dos mil tokens, ese cache puede comerse veinticuatro gigas de memoria de video para un solo usuario. Por eso las IAs cobran tanto por contextos gigantes.",
      "visual_cue": "Flujo de VRAM consumida por el KV Cache por usuario concurrente"
    }
  ]
};
