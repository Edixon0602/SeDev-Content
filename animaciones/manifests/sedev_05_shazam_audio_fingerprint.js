window.__DEFAULT_MANIFEST__ = {
  "title": "[05] ¿Cómo sabe Shazam qué canción suena en 3 segundos con ruido?",
  "slug": "sedev_05_shazam_audio_fingerprint",
  "category": "ALGORITMOS & MATEMÁTICAS",
  "tagline": "Espectrogramas y constelaciones de frecuencias hash",
  "fps": 30,
  "outputDir": "animaciones/output_clips/sedev_brolls/sedev_05_shazam_audio_fingerprint",
  "script": {
    "hook": "Estás en un bar lleno de gente hablando, pones tu teléfono tres segundos hacia el techo y la aplicación acierta la canción exacta. ¿Cómo demonios lo hace?",
    "broll1_lead": "Shazam no compara el audio segundo a segundo. Primero pasa la grabación por una Transformada Rápida de Fourier para convertir el sonido en un espectrograma visual de frecuencias en el tiempo.",
    "camera_pivot": "Luego ignora el noventa y cinco por ciento del ruido y se queda solo con los picos más intensos de frecuencia, creando lo que llaman un mapa de constelación de estrellas.",
    "broll2_lead": "Une pares de puntos con su diferencia de tiempo y genera un hash de treinta y dos bits. Cuando busca en su base de datos con millones de canciones, solo compara esos hashes combinados en un índice ultrarrápido.",
    "outro": "Una obra de arte matemática inventada antes de que existieran los smartphones modernos. Sígueme para más secretos de la ingeniería que usas a diario."
  },
  "brolls": [
    {
      "id": "broll_01_fourier_spectrogram",
      "purpose": "Tubería de conversión: Audio ruidoso -> Transformada Fourier -> Constelación",
      "type": "network_pipeline",
      "duration": 9,
      "props": {
        "theme": "dark",
        "title": "EXTRACCIÓN DE HUELLA ACÚSTICA",
        "subtitle": "TRANSFORMADA DE FOURIER Y MAPA DE PICOS",
        "stages": [
          {
            "name": "AUDIO CRUDO CON RUIDO",
            "tag": "Filtro pasa-banda y normalización",
            "metric": "0.4 ms",
            "color": "#38bdf8"
          },
          {
            "name": "ANÁLISIS ESPECTROGRAMA",
            "tag": "Descomposición en frecuencias",
            "metric": "1.2 ms",
            "color": "#fbbf24"
          },
          {
            "name": "MAPA DE CONSTELACIÓN",
            "tag": "Extracción de picos de mayor energía",
            "metric": "2.1 ms",
            "color": "#10b981"
          }
        ]
      },
      "voiceover": "Shazam no compara el audio segundo a segundo. Primero pasa la grabación por una Transformada Rápida de Fourier para convertir el sonido en un espectrograma visual de frecuencias en el tiempo.",
      "visual_cue": "Tubería de conversión: Audio ruidoso -> Transformada Fourier -> Constelación"
    },
    {
      "id": "broll_02_hash_match_lookup",
      "purpose": "Índice invertido emparejando hashes de 32 bits en 1.8ms",
      "type": "storage_engine_viz",
      "duration": 8.5,
      "props": {
        "theme": "dark",
        "title": "BÚSQUEDA SUBMILISEGUNDO POR HASH COMBINADO",
        "subtitle": "ÍNDICE INVERTIDO DE MILLONES DE TEMAS",
        "layout": "inverted_index"
      },
      "voiceover": "Une pares de puntos con su diferencia de tiempo y genera un hash de treinta y dos bits. Cuando busca en su base de datos con millones de canciones, solo compara esos hashes combinados en un índice ultrarrápido.",
      "visual_cue": "Índice invertido emparejando hashes de 32 bits en 1.8ms"
    }
  ]
};
