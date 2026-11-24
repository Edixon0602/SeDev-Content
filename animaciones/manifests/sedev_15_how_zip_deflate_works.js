window.__DEFAULT_MANIFEST__ = {
  "title": "[15] ¿Cómo funciona la compresión ZIP? (El algoritmo DEFLATE)",
  "slug": "sedev_15_how_zip_deflate_works",
  "category": "TEORÍA DE LA INFORMACIÓN & ALGORITMOS",
  "tagline": "Cómo meter 100MB en 10MB sin perder una sola letra",
  "fps": 30,
  "outputDir": "animaciones/output_clips/sedev_brolls/sedev_15_how_zip_deflate_works",
  "script": {
    "hook": "¿Cómo es posible meter un archivo de texto de cien megabytes dentro de uno de diez megas sin perder absolutamente ninguna letra?",
    "broll1_lead": "Casi toda la compresión de internet, desde archivos punto zip hasta imágenes png y peticiones gzip, usa un algoritmo llamado DEFLATE inventado en mil novecientos noventa y uno.",
    "camera_pivot": "Funciona en dos pasos. Primero usa una ventana deslizante llamada LZ77 que busca frases repetidas hacia atrás y las reemplaza por un par de números: qué tan atrás está y cuántas letras abarca.",
    "broll2_lead": "Luego toma ese resultado y aplica codificación de Huffman: en vez de gastar ocho bits por letra, le asigna códigos binarios cortitos de dos bits a las letras que más se repiten y códigos largos a las raras.",
    "outro": "Elegancia pura que ahorra petabytes de ancho de banda a la humanidad todos los días. Sígueme para entender la ciencia detrás de tus herramientas."
  },
  "brolls": [
    {
      "id": "broll_01_lz77_sliding_window",
      "purpose": "Ventana deslizante LZ77 reemplazando patrones repetidos por tuplas (distancia, largo)",
      "type": "terminal_split",
      "duration": 9,
      "props": {
        "theme": "light",
        "title": "FASE 1: VENTANA DESLIZANTE LZ77",
        "subtitle": "SUSTITUCIÓN DE REPETICIONES POR PUNTEROS HACIA ATRÁS",
        "leftTitle": "TEXTO ORIGINAL REPETITIVO",
        "leftCode": "\"el perro de san roque no tiene rabo,\nporque ramon ramirez se lo ha robado\nel perro de san roque...\"",
        "rightTitle": "DEDUPLICACIÓN POR DISTANCIA",
        "rightCode": "\"el perro de san roque...\"\n// Sustitución automática:\n<retrocede 54 caracteres, copia 22>\n// 22 bytes convertidos en 2 bytes!",
        "diffNote": "Eliminación de redundancia espacial en memoria"
      },
      "voiceover": "Casi toda la compresión de internet, desde archivos punto zip hasta imágenes png y peticiones gzip, usa un algoritmo llamado DEFLATE inventado en mil novecientos noventa y uno.",
      "visual_cue": "Ventana deslizante LZ77 reemplazando patrones repetidos por tuplas (distancia, largo)"
    },
    {
      "id": "broll_02_huffman_coding_tree",
      "purpose": "Árbol de codificación de Huffman asignando bits cortos a símbolos comunes",
      "type": "tree_hierarchy",
      "duration": 8.5,
      "props": {
        "theme": "light",
        "title": "FASE 2: ÁRBOL DE FRECUENCIAS HUFFMAN",
        "subtitle": "CÓDIGOS DE LONGITUD VARIABLE EN BASE 2",
        "nodes": [
          {
            "id": "root",
            "label": "ÁRBOL RAÍZ HUFFMAN",
            "sub": "Frecuencia total 100%",
            "x": 480,
            "y": 235,
            "w": 680,
            "color": "#0284c7"
          },
          {
            "id": "c_e",
            "label": "LETRA \"E\" (FRECUENTE)",
            "sub": "Código: 0 (1 solo bit)",
            "x": 245,
            "y": 455,
            "w": 390,
            "parent": "root",
            "color": "#059669",
            "activePath": true
          },
          {
            "id": "c_sub",
            "label": "SUB-ÁRBOL SÍMBOLOS RAROS",
            "sub": "Ramas de menor probabilidad",
            "x": 715,
            "y": 455,
            "w": 390,
            "parent": "root",
            "color": "#d97706",
            "activePath": false
          },
          {
            "id": "c_z",
            "label": "LETRA \"Z\" (RARA)",
            "sub": "Código: 1101 (4 bits)",
            "x": 715,
            "y": 675,
            "w": 390,
            "parent": "c_sub",
            "color": "#64748b",
            "activePath": true
          }
        ]
      },
      "voiceover": "Luego toma ese resultado y aplica codificación de Huffman: en vez de gastar ocho bits por letra, le asigna códigos binarios cortitos de dos bits a las letras que más se repiten y códigos largos a las raras.",
      "visual_cue": "Árbol de codificación de Huffman asignando bits cortos a símbolos comunes"
    }
  ]
};
