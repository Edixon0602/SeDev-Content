window.__DEFAULT_MANIFEST__ = {
  "title": "[03] Procesamiento Columnar Vectorizado: 10M filas en milisegundos (Var A)",
  "category": "DATA ENGINEERING & ANALYTICS",
  "slug": "03_duckdb_analytics",
  "variation": "A",
  "fps": 30,
  "scenes": [
    {
      "id": "stat_hook",
      "type": "kinetic_hook",
      "duration": 4.5,
      "voiceover": "¿Diez millones de filas analizadas en medio segundo dentro de tu laptop? Así funciona el procesamiento columnar de DuckDB.",
      "visual_cue": "Gancho cinético con número cuantitativo gigante",
      "props": {
        "layout": "stat",
        "badge": "ANALÍTICA DE DATOS",
        "stat": "10.000.000",
        "statLabel": "Filas procesadas en 420ms",
        "subtitle": "Procesamiento columnar vectorizado"
      }
    },
    {
      "id": "row_vs_col",
      "type": "memory_layout",
      "duration": 6,
      "voiceover": "Las bases transaccionales leen filas enteras, desperdiciando caché de CPU. DuckDB lee solo las columnas que necesitas en vectores contiguos.",
      "visual_cue": "Comparación visual de layout de memoria: Row-oriented vs Columnar Vectorized",
      "props": {
        "header": "MEMORIA Y HARDWARE",
        "title": "ROW-STORE VS COLUMN-STORE",
        "items": [
          {
            "name": "POSTGRES (ROW-STORE)",
            "addr": "Heap Tuple: Lee todos los campos de disco",
            "value": "Desperdicio de CPU L3 Cache",
            "color": "#ef4444"
          },
          {
            "name": "DUCKDB (VECTORIZED)",
            "addr": "Vector Chunk: 2048 enteros contiguos",
            "value": "Aceleración SIMD directa en CPU",
            "color": "#10b981"
          }
        ]
      }
    },
    {
      "id": "parquet_query",
      "type": "code_terminal",
      "duration": 6,
      "voiceover": "Puedes consultar archivos Parquet directamente en Amazon S3 sin importar los datos. Solo descargas los bytes exactos que pide tu consulta.",
      "visual_cue": "Terminal ejecutando query SQL directa sobre s3://bucket/data.parquet",
      "props": {
        "header": "CONSULTA DIRECTA SOBRE PARQUET",
        "title": "ZERO-ETL ANALYTICS",
        "filename": "analytics/query.py",
        "codeLines": [
          "import duckdb",
          "# Lee 50GB en S3 descargando solo 40MB de metadata:",
          "res = duckdb.query(\"\"\"",
          "  SELECT user_country, SUM(amount_usd) ",
          "  FROM read_parquet(\"s3://logs-2026/*.parquet\")",
          "  GROUP BY 1 ORDER BY 2 DESC LIMIT 10;",
          "\"\"\").df()",
          "print(f\"Completado en {res.execution_time}ms\")"
        ],
        "cursorLine": 6
      }
    },
    {
      "id": "cta_duckdb",
      "type": "tradeoff_matrix",
      "duration": 5,
      "voiceover": "Si tu empresa gasta miles de dólares en Snowflake o BigQuery para consultas simples, audito tus costes de datos para migrar a motores in-process. Link en bio.",
      "visual_cue": "Cierre con llamado a auditoría de costes cloud de datos",
      "props": {
        "header": "AUDITORÍA DE COSTES CLOUD",
        "title": "REDUCE TU FACTURA DE ANALÍTICA",
        "cta": {
          "badge": "AUDITORÍA DE COSTES (Link en bio)",
          "text": "¿Gastas fortunas en Snowflake o Databricks? Link en mi perfil para auditar tus pipelines."
        }
      }
    }
  ]
};
