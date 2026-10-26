window.__DEFAULT_MANIFEST__ = {
  "title": "[07] Algoritmo HNSW en memoria: Grafos vectoriales en PostgreSQL (Var A)",
  "category": "BASES DE DATOS & IA",
  "slug": "07_pgvector_vs_vectordb",
  "variation": "A",
  "fps": 30,
  "scenes": [
    {
      "id": "hnsw_engine",
      "type": "storage_engine_viz",
      "duration": 6.5,
      "voiceover": "¿Cómo busca pgvector embeddings entre millones de documentos en dos milisegundos? Utiliza el algoritmo HNSW en memoria.",
      "visual_cue": "Visualizador del grafo vectorial HNSW navegable en capas en la memoria de Postgres",
      "props": {
        "mode": "hnsw",
        "badge": "ALGORITMO DE GRAFOS",
        "title": "HNSW VECTORIAL EN MEMORIA",
        "subtitle": "BÚSQUEDA POR SIMILITUD DE COSENOS EN POSTGRESQL"
      }
    },
    {
      "id": "latency_hnsw",
      "type": "latency_scale",
      "duration": 5.5,
      "voiceover": "Al estar en la misma base de datos relacional, el join entre el vector y los datos del usuario toma cero coma cinco milisegundos.",
      "visual_cue": "Escala de latencia: join in-memory en Postgres vs llamada HTTP externa a Pinecone",
      "props": {
        "header": "MÉTRICA DE LATENCIA EN IA",
        "title": "JOIN RELACIONAL VS LLAMADA EXTERNA",
        "subtitle": "CONSULTA IN-PROCESS EN POSTGRES VS API VECTORIAL"
      }
    },
    {
      "id": "cta_vectordb",
      "type": "metrics_comparison",
      "duration": 5.5,
      "voiceover": "Todo tu stack de IA cabe en Postgres con pgvector. Link en mi bio si quieres simplificar tu arquitectura y recortar costes innecesarios.",
      "visual_cue": "Comparativa de costos: Pinecone dedicado vs Postgres unificado",
      "props": {
        "header": "CONSULTORÍA EN BASES DE DATOS (Link en bio)",
        "metricA": {
          "label": "PINECONE + POSTGRES",
          "value": "$1.450 / mes",
          "sub": "Doble base de datos · Salto de red",
          "color": "#ef4444"
        },
        "metricB": {
          "label": "PGVECTOR UNIFICADO",
          "value": "$85 / mes",
          "sub": "Transacciones ACID · Joins inmediatos",
          "color": "#10b981"
        }
      }
    }
  ]
};
