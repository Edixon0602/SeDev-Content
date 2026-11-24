window.__DEFAULT_MANIFEST__ = {
  "title": "[19] El algoritmo que revolucionó internet: PageRank y Markov",
  "slug": "sedev_19_google_pagerank_markov",
  "category": "ALGORITMOS & HISTORIA DE INTERNET",
  "tagline": "Cómo dos estudiantes ordenaron la web tratando enlaces como probabilidades",
  "fps": 30,
  "outputDir": "animaciones/output_clips/sedev_brolls/sedev_19_google_pagerank_markov",
  "script": {
    "hook": "En mil novecientos noventa y ocho, los buscadores ordenaban los resultados contando cuántas veces aparecía una palabra en la página... hasta que dos estudiantes usaron cadenas de Markov.",
    "broll1_lead": "Larry Page y Sergey Brin se dieron cuenta de que contar palabras era fácil de manipular con spam. En vez de mirar el texto, miraron la estructura de enlaces de la web como un grafo gigante.",
    "camera_pivot": "Un enlace desde una página hacia otra es como un voto de confianza. Pero no todos los votos valen lo mismo: si una página muy importante te enlaza, su voto transfiere mucho más peso que cien blogs desconocidos.",
    "broll2_lead": "Modelaron el comportamiento de un usuario imaginario que salta de enlace en enlace al azar. Mediante álgebra lineal y matrices de probabilidad, calcularon en qué páginas pasaría más tiempo ese navegante, creando el buscador más preciso de la historia.",
    "outro": "Una idea de matemáticas puras que fundó una de las mayores empresas del mundo. Sígueme para entender los algoritmos que mueven el planeta."
  },
  "brolls": [
    {
      "id": "broll_01_pagerank_directed_graph",
      "purpose": "Grafo dirigido de enlaces web transfiriendo peso ponderado entre nodos",
      "type": "tree_hierarchy",
      "duration": 9,
      "props": {
        "theme": "light",
        "title": "GRAFO DIRIGIDO DE ENLACES PONDERADOS",
        "subtitle": "VOTOS DE CONFIANZA TRANSITIVOS (PAGERANK)",
        "nodes": [
          {
            "id": "p_edu",
            "label": "UNIVERSIDAD .EDU (ALTA AUTORIDAD)",
            "sub": "PageRank: 9.4 · Enlace de alto valor",
            "x": 480,
            "y": 235,
            "w": 680,
            "color": "#0284c7"
          },
          {
            "id": "p_art",
            "label": "ARTÍCULO CIENTÍFICO REFERENCIADO",
            "sub": "PageRank: 8.1 · Hereda peso de .EDU",
            "x": 245,
            "y": 455,
            "w": 390,
            "parent": "p_edu",
            "color": "#059669",
            "activePath": true
          },
          {
            "id": "p_blog",
            "label": "BLOG PERSONAL (MEDIA AUTORIDAD)",
            "sub": "PageRank: 4.2 · Voto moderado",
            "x": 715,
            "y": 455,
            "w": 390,
            "parent": "p_edu",
            "color": "#d97706",
            "activePath": false
          },
          {
            "id": "p_spam",
            "label": "GRANJA DE ENLACES SPAM",
            "sub": "PageRank: 0.1 · Ignorada por el algoritmo",
            "x": 715,
            "y": 675,
            "w": 390,
            "parent": "p_blog",
            "color": "#64748b",
            "activePath": false
          }
        ]
      },
      "voiceover": "Larry Page y Sergey Brin se dieron cuenta de que contar palabras era fácil de manipular con spam. En vez de mirar el texto, miraron la estructura de enlaces de la web como un grafo gigante.",
      "visual_cue": "Grafo dirigido de enlaces web transfiriendo peso ponderado entre nodos"
    },
    {
      "id": "broll_02_markov_random_surfer",
      "purpose": "Matriz de transición del Random Surfer convergiendo probabilidades en 50 iteraciones",
      "type": "metrics_comparison",
      "duration": 8.5,
      "props": {
        "theme": "light",
        "title": "MODELO DE MARKOV: RANDOM SURFER",
        "subtitle": "CONVERGENCIA DE AUTO-VECTORES DE PROBABILIDAD",
        "metrics": [
          {
            "label": "Factor de amortiguación (d)",
            "val1": "d = 0.85",
            "val2": "15% probabilidad de teletransporte",
            "good": true
          },
          {
            "label": "Iteraciones para convergencia",
            "val1": "52 pasadas",
            "val2": "Estado estacionario O(N)",
            "good": true
          },
          {
            "label": "Resistencia al spam de texto",
            "val1": "100x superior",
            "val2": "Filtro topológico inmune",
            "good": true
          }
        ]
      },
      "voiceover": "Modelaron el comportamiento de un usuario imaginario que salta de enlace en enlace al azar. Mediante álgebra lineal y matrices de probabilidad, calcularon en qué páginas pasaría más tiempo ese navegante, creando el buscador más preciso de la historia.",
      "visual_cue": "Matriz de transición del Random Surfer convergiendo probabilidades en 50 iteraciones"
    }
  ]
};
