window.__DEFAULT_MANIFEST__ = {
  "title": "[07] No necesitas Pinecone: Todo tu stack de IA cabe en Postgres (Var B)",
  "category": "BASES DE DATOS & IA",
  "slug": "07_pgvector_vs_vectordb",
  "variation": "B",
  "fps": 30,
  "scenes": [
    {
      "id": "hook_pgvector_b",
      "type": "kinetic_hook",
      "duration": 4.5,
      "voiceover": "Te vendieron que necesitas una base vectorial especializada como Pinecone o Qdrant para hacer IA. La verdad es que tu Postgres actual ya lo hace todo.",
      "visual_cue": "Gancho cinético contra el exceso de herramientas",
      "props": {
        "badge": "SIMPLICIDAD DE ARQUITECTURA",
        "lines": [
          {
            "text": "NO NECESITAS",
            "color": "#ef4444"
          },
          {
            "text": "PINECONE",
            "color": "#ffffff"
          }
        ],
        "subtitle": "TODO TU STACK DE IA CABE EN POSTGRES",
        "icon": "database"
      }
    },
    {
      "id": "split_pinecone_pg",
      "type": "terminal_split",
      "duration": 6,
      "voiceover": "Mantener dos bases de datos te obliga a sincronizar IDs y transacciones. Con pgvector tienes consistencia inmediata sin pagar dos servicios.",
      "visual_cue": "Doble terminal comparando sincronización dual vs base única",
      "props": {
        "header": "COMPLEJIDAD OPERATIVA",
        "title": "DOS BASES DE DATOS VS UNA SOLA",
        "termA": {
          "title": "POSTGRES + PINECONE EXTERNO",
          "color": "#ef4444",
          "cmd": "sync_worker.py (Sincronizando IDs)",
          "status": "Inconsistencias cuando falla la red",
          "time": "$340/mes extra",
          "lines": [
            "Si el delete falla en Pinecone, quedan embeddings huérfanos",
            "Doble factura: Base de datos + Proveedor vectorial",
            "Latencia añadida entre dos nubes distintas"
          ]
        },
        "termB": {
          "title": "POSTGRESQL NATIVO (PGVECTOR)",
          "color": "#10b981",
          "cmd": "CREATE INDEX USING hnsw (embedding vector_cosine_ops)",
          "status": "Transacciones ACID nativas",
          "time": "$0 extra",
          "lines": [
            "Un solo respaldo con pg_dump",
            "Join directo entre tablas relacionales y embeddings",
            "Cero sincronizaciones en segundo plano"
          ]
        }
      }
    },
    {
      "id": "cta_pgvector_b",
      "type": "tradeoff_matrix",
      "duration": 5,
      "voiceover": "Audito la capa de persistencia de tu producto para consolidar tu stack y reducir costes operativos. Agenda tu sesión técnica en el link de la bio.",
      "visual_cue": "Cierre con auditoría de base de datos",
      "props": {
        "header": "AUDITORÍA DE BASES DE DATOS",
        "title": "SIMPLIFICA TU CAPA DE PERSISTENCIA",
        "cta": {
          "badge": "AUDITORÍA DE DATOS // SEDEV",
          "text": "Consolida tus bases de datos y ahorra costes. Link en mi perfil para agendar tu auditoría."
        }
      }
    }
  ]
};
