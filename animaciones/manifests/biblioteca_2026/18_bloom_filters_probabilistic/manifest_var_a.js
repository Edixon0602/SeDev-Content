window.__DEFAULT_MANIFEST__ = {
  "title": "[18] Bloom Filters: Cómo saber si un registro existe con 99% de certeza (Var A)",
  "category": "ESTRUCTURAS DE DATOS PROBABILÍSTICAS",
  "slug": "18_bloom_filters_probabilistic",
  "variation": "A",
  "fps": 30,
  "scenes": [
    {
      "id": "bloom_lead",
      "type": "cache_flow_viz",
      "duration": 6.5,
      "voiceover": "¿Cómo saber si un nombre de usuario ya está registrado entre quinientos millones de registros sin tocar el disco? Usando un filtro de Bloom en memoria.",
      "visual_cue": "Visualizador de array de bits de Bloom Filter iluminando posiciones de hash",
      "props": {
        "mode": "bloom",
        "badge": "ESTRUCTURA PROBABILÍSTICA",
        "title": "FILTRO DE BLOOM EN MEMORIA",
        "subtitle": "3 FUNCIONES HASH ILUMINANDO UN ARRAY DE BITS"
      }
    },
    {
      "id": "redis_code_bloom",
      "type": "code_terminal",
      "duration": 5.5,
      "voiceover": "La clave pasa por tres funciones hash que encienden bits en un vector binario. Si algún bit es cero, sabemos con certeza absoluta que el dato no existe.",
      "visual_cue": "Terminal ejecutando comandos BF.ADD y BF.EXISTS en Redis",
      "props": {
        "header": "COMANDOS DE BLOOM EN REDIS",
        "title": "VERIFICACIÓN EN TIEMPO O(1)",
        "filename": "bloom_check.sh",
        "codeLines": [
          "# Reservar filtro con 0.1% de error:",
          "BF.RESERVE usernames 0.001 10000000",
          "BF.ADD usernames \"edixon_dev\"",
          "",
          "# Comprobación instantánea:",
          "BF.EXISTS usernames \"inexistent_user\" -> 0 (0ms disco)"
        ],
        "cursorLine": 5
      }
    },
    {
      "id": "metrics_bloom",
      "type": "metrics_comparison",
      "duration": 5.5,
      "voiceover": "Evitas el noventa y nueve por ciento de las consultas pesadas a la base de datos ahorrando miles de dólares en servidores. Link en bio para optimizaciones.",
      "visual_cue": "Comparativa de lecturas de disco ahorradas gracias al filtro probabilístico",
      "props": {
        "header": "CONSULTORÍA EN ALGORITMOS (Link en bio)",
        "metricA": {
          "label": "CONSULTAS SQL A DISCO",
          "value": "45.000 / seg",
          "sub": "I/O intensivo saturando el SSD",
          "color": "#ef4444"
        },
        "metricB": {
          "label": "CON FILTRO DE BLOOM",
          "value": "450 / seg",
          "sub": "99% resuelto en nanosegundos en RAM",
          "color": "#10b981"
        }
      }
    }
  ]
};
