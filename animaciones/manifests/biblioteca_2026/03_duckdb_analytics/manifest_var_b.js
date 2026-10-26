window.__DEFAULT_MANIFEST__ = {
  "title": "[03] Snowflake es un desperdicio: Analítica in-process con Parquet (Var B)",
  "category": "DATA ENGINEERING",
  "slug": "03_duckdb_analytics",
  "variation": "B",
  "fps": 30,
  "scenes": [
    {
      "id": "bill_shock",
      "type": "metrics_comparison",
      "duration": 5.5,
      "voiceover": "Tu startup paga catorce mil dólares mensuales en Snowflake para hacer queries que caben perfectamente en la memoria de una laptop.",
      "visual_cue": "Métricas de coste comparando Snowflake vs DuckDB",
      "props": {
        "header": "DESPERDICIO DE NUBE EN ANALÍTICA",
        "metricA": {
          "label": "SNOWFLAKE WAREHOUSE",
          "value": "$14.200",
          "sub": "Factura mensual recurrente en la nube",
          "color": "#ef4444"
        },
        "metricB": {
          "label": "DUCKDB + S3 PARQUET",
          "value": "$85",
          "sub": "Almacenamiento S3 + CPU del servidor",
          "color": "#10b981"
        }
      }
    },
    {
      "id": "columnar_diagram",
      "type": "storage_engine_viz",
      "duration": 6,
      "voiceover": "DuckDB corre embebido en tu API de Node o Python. Lee Parquet comprimido con Dictionary Encoding y procesa cien mil registros en milisegundos.",
      "visual_cue": "Visualizador del almacenamiento columnar demostrando el 94% menos de I/O en lecturas",
      "props": {
        "mode": "columnar",
        "badge": "ZERO SERVIDORES",
        "title": "ANALÍTICA IN-PROCESS",
        "subtitle": "PARQUET + DUCKDB CORRIENDO EN TU PROPIA APP"
      }
    }
  ]
};
