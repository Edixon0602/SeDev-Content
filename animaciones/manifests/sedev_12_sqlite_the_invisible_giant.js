window.__DEFAULT_MANIFEST__ = {
  "title": "[12] La librería invisible instalada en tu bolsillo 20 veces",
  "slug": "sedev_12_sqlite_the_invisible_giant",
  "category": "BASES DE DATOS & INTERNALS",
  "tagline": "SQLite: 150,000 líneas en un solo archivo C con 100% de test coverage",
  "fps": 30,
  "outputDir": "animaciones/output_clips/sedev_brolls/sedev_12_sqlite_the_invisible_giant",
  "script": {
    "hook": "Hay una pieza de código que tienes instalada ahora mismo al menos veinte veces en tu teléfono móvil sin que te hayas dado cuenta.",
    "broll1_lead": "Se llama SQLite. No es un servidor como MySQL ni Postgres que necesita un demonio corriendo en el sistema; es simplemente una librería en lenguaje C que vive dentro del mismo proceso de tu aplicación.",
    "camera_pivot": "Tus chats de WhatsApp, tu navegador web, el sistema operativo de tu televisor y los controles de vuelo de un avión de combate guardan datos directamente en un solo archivo en disco usando un árbol B embebido.",
    "broll2_lead": "Tiene más de setecientas veces más líneas de código dedicadas a pruebas que a la base de datos misma, logrando una cobertura del cien por cien de ramas y tests de mutación. Es probablemente el software más testeado del mundo.",
    "outro": "No siempre necesitas servidores gigantes cuando una buena arquitectura de disco resuelve todo. Sígueme para entender cómo funcionan los cimientos del software."
  },
  "brolls": [
    {
      "id": "broll_01_sqlite_btree_file",
      "purpose": "B-Tree embebido leyendo y escribiendo páginas de disco directamente",
      "type": "storage_engine_viz",
      "duration": 9,
      "props": {
        "theme": "light",
        "title": "MOTOR EMBEBIDO SQLITE: UN SOLO ARCHIVO .DB",
        "subtitle": "ÁRBOL B-TREE SIN PROCESO SERVIDOR INTERMEDIO",
        "layout": "btree"
      },
      "voiceover": "Se llama SQLite. No es un servidor como MySQL ni Postgres que necesita un demonio corriendo en el sistema; es simplemente una librería en lenguaje C que vive dentro del mismo proceso de tu aplicación.",
      "visual_cue": "B-Tree embebido leyendo y escribiendo páginas de disco directamente"
    },
    {
      "id": "broll_02_sqlite_test_coverage",
      "purpose": "Métricas de calidad: 100% Branch Coverage y tests de mutación",
      "type": "metrics_comparison",
      "duration": 8.5,
      "props": {
        "theme": "light",
        "title": "INGENIERÍA DE FIABILIDAD EXTREMA",
        "subtitle": "CÓDIGO DE BASE DE DATOS VS SUITE DE TESTS",
        "metrics": [
          {
            "label": "Código de producción (sqlite3.c)",
            "val1": "155,000 líneas",
            "val2": "C puro portable",
            "good": true
          },
          {
            "label": "Suite de tests automáticos",
            "val1": "92,000,000 líneas",
            "val2": "590x más pruebas",
            "good": true
          },
          {
            "label": "Branch Coverage (Cobertura de ramas)",
            "val1": "100.0%",
            "val2": "Cero ramas sin testear",
            "good": true
          }
        ]
      },
      "voiceover": "Tiene más de setecientas veces más líneas de código dedicadas a pruebas que a la base de datos misma, logrando una cobertura del cien por cien de ramas y tests de mutación. Es probablemente el software más testeado del mundo.",
      "visual_cue": "Métricas de calidad: 100% Branch Coverage y tests de mutación"
    }
  ]
};
