window.__DEFAULT_MANIFEST__ = {
  "title": "[07] Algoritmo HNSW en memoria: Grafos vectoriales en PostgreSQL (Var A)",
  "category": "BASES DE DATOS & IA",
  "slug": "07_pgvector_vs_vectordb",
  "variation": "A",
  "fps": 30,
  "scenes": [
    {
      "id": "hook_pgvector",
      "type": "kinetic_hook",
      "duration": 4.5,
      "voiceover": "¿Cómo busca PostgreSQL entre un millón de vectores de IA en menos de cinco milisegundos? Con grafos HNSW.",
      "visual_cue": "Gancho cinético con icono de árbol y base de datos",
      "props": {
        "badge": "POSTGRESQL & IA 2026",
        "lines": [
          {
            "text": "GRAFOS HNSW EN",
            "color": "#ffffff"
          },
          {
            "text": "PGVECTOR",
            "color": "#38bdf8"
          }
        ],
        "subtitle": "BÚSQUEDA SEMÁNTICA VECTORIZADA",
        "icon": "tree"
      }
    },
    {
      "id": "hnsw_tree",
      "type": "tree_hierarchy",
      "duration": 6.5,
      "voiceover": "HNSW crea capas jerárquicas de grafos navegables. La búsqueda empieza en la capa superior con saltos largos y desciende refinando la similitud.",
      "visual_cue": "Jerarquía de árbol navegable mostrando saltos hasta encontrar el vector objetivo",
      "props": {
        "header": "ALGORITMO HNSW",
        "title": "HIERARCHICAL NAVIGABLE SMALL WORLD",
        "complexity": "COMPLEJIDAD: O(log N) // DISTANCIA COSENO",
        "nodes": [
          {
            "id": "top",
            "label": "CAPA 2: SALTOS LARGOS",
            "x": 480,
            "y": 240,
            "level": 0
          },
          {
            "id": "mid1",
            "label": "CAPA 1: CLUSTER A",
            "x": 260,
            "y": 520,
            "level": 1,
            "parent": "top"
          },
          {
            "id": "mid2",
            "label": "CAPA 1: CLUSTER B",
            "x": 700,
            "y": 520,
            "level": 1,
            "parent": "top"
          },
          {
            "id": "leaf",
            "label": "TARGET: SIMILARITY 0.94",
            "x": 260,
            "y": 840,
            "level": 2,
            "parent": "mid1",
            "target": true
          }
        ],
        "footerBadge": "RENDIMIENTO HNSW EN POSTGRES",
        "footerText": "Recorre un grafo multidimensional en RAM sin escanear la tabla entera.",
        "footerSubtext": "Búsqueda por similitud semántica en menos de 4ms."
      }
    },
    {
      "id": "pg_sql",
      "type": "code_terminal",
      "duration": 6,
      "voiceover": "Lo mejor es que puedes combinar búsqueda de similitud semántica con filtros relacionales clásicos en una sola consulta SQL transaccional.",
      "visual_cue": "Terminal ejecutando query combinada en PostgreSQL con pgvector",
      "props": {
        "header": "CONSULTA HÍBRIDA EN POSTGRES",
        "title": "FILTRO RELACIONAL + VECTOR SEARCH",
        "filename": "db/hybrid_search.sql",
        "codeLines": [
          "SELECT id, title, (embedding <=> $1) as distance",
          "FROM articles",
          "WHERE user_id = 42 AND published_at > NOW() - INTERVAL \"30 days\"",
          "ORDER BY embedding <=> $1",
          "LIMIT 5;",
          "-- Ejecución: 3.8ms usando índice HNSW"
        ],
        "cursorLine": 5
      }
    },
    {
      "id": "cta_pgvector",
      "type": "tradeoff_matrix",
      "duration": 5,
      "voiceover": "Si quieres implementar búsqueda semántica o auditar tu arquitectura de datos para IA sin sobrecostes innecesarios, link en mi perfil.",
      "visual_cue": "Cierre con llamado a auditoría de bases de datos",
      "props": {
        "header": "AUDITORÍA DE BASES DE DATOS & IA",
        "title": "OPTIMIZA TUS PIPELINES DE EMBEDDINGS",
        "cta": {
          "badge": "AUDITORÍA DE DATOS // SEDEV",
          "text": "¿Búsquedas vectoriales lentas o caras? Hablemos en el enlace de mi perfil."
        }
      }
    }
  ]
};
