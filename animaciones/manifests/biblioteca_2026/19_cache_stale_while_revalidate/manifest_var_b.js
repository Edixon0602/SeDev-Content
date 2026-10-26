window.__DEFAULT_MANIFEST__ = {
  "title": "[19] Cómo servir respuestas en 5 milisegundos sin servir datos desactualizados (Var B)",
  "category": "SISTEMAS DE CACHÉ & ALTA DISPONIBILIDAD",
  "slug": "19_cache_stale_while_revalidate",
  "variation": "B",
  "fps": 30,
  "scenes": [
    {
      "id": "swr_shock_b",
      "type": "cache_flow_viz",
      "duration": 6,
      "voiceover": "Creer que una caché rápida siempre devuelve datos viejos es un error. Con la técnica adecuada entregas contenido en dos milisegundos y mantienes los datos frescos.",
      "visual_cue": "Visualizador del reemplazo atómico de datos en caché",
      "props": {
        "mode": "swr",
        "badge": "LATENCIA HUMANA CERO",
        "title": "FRESCURA ATÓMICA EN MEMORIA",
        "subtitle": "SERVIDO DESDE EDGE/RAM SIN BLOQUEOS"
      }
    },
    {
      "id": "terminal_swr_b",
      "type": "terminal_split",
      "duration": 5.5,
      "voiceover": "Aprovecha las capacidades nativas de HTTP y CDNs modernas sin meter capas complejas de software. Link en mi perfil para asesoría técnica.",
      "visual_cue": "Terminal comparando latencia con SWR y llamada a la acción en bio",
      "props": {
        "header": "OPTIMIZACIÓN WEB (Link en bio)",
        "title": "RESPUESTAS ULTRARRÁPIDAS",
        "leftTitle": "CONSULTA TRADICIONAL",
        "rightTitle": "ARQUITECTURA SWR",
        "leftText": "Latencia: 340 ms (Consulta a disco)\nCPU del servidor: 78%\nBloqueo ante expiración de clave",
        "rightText": "Latencia: 2.1 ms (Edge Cache)\nCPU del servidor: 2%\nRevalidación atómica sin interrupción"
      }
    }
  ]
};
