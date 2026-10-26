window.__DEFAULT_MANIFEST__ = {
  "title": "[03] Procesamiento Columnar Vectorizado: 10M filas en milisegundos (Var A)",
  "category": "DATA ENGINEERING",
  "slug": "03_duckdb_analytics",
  "variation": "A",
  "fps": 30,
  "scenes": [
    {
      "id": "columnar_viz",
      "type": "storage_engine_viz",
      "duration": 6.5,
      "voiceover": "¿Por qué DuckDB analiza diez millones de filas en milisegundos mientras Postgres colapsa? Todo está en el formato columnar y las instrucciones SIMD.",
      "visual_cue": "Visualizador del motor columnar vectorizado procesando bloques contiguos de memoria con SIMD",
      "props": {
        "mode": "columnar",
        "badge": "MOTOR VECTORIZADO",
        "title": "FILAS TRADICIONALES VS COLUMNAS SIMD",
        "subtitle": "DUCKDB: PROCESAMIENTO POR LOTES DE VECTORES"
      }
    },
    {
      "id": "code_parquet",
      "type": "code_terminal",
      "duration": 5,
      "voiceover": "DuckDB lee archivos Parquet directamente desde S3 o tu disco local sin levantar servidores pesados ni pipelines de Kafka.",
      "visual_cue": "Terminal mostrando consulta SQL directa sobre Parquet sin ingesta previa",
      "props": {
        "header": "QUERY IN-PROCESS",
        "title": "CONSULTA DIRECTA SOBRE PARQUET",
        "filename": "analytics.sql",
        "codeLines": [
          "# Consulta in-process sin servidor intermedio:",
          "SELECT country, SUM(total_amount)",
          "FROM \"s3://warehouse/sales_2026/*.parquet\"",
          "WHERE created_at >= \"2026-01-01\"",
          "GROUP BY country ORDER BY 2 DESC;"
        ],
        "cursorLine": 4
      }
    },
    {
      "id": "metrics_speed",
      "type": "metrics_comparison",
      "duration": 5.5,
      "voiceover": "El resultado: consultas analíticas hasta ochenta veces más rápidas usando una fracción de la memoria.",
      "visual_cue": "Comparativa de velocidad analítica: Postgres vs DuckDB",
      "props": {
        "header": "AGREGACIÓN SOBRE 10M FILAS",
        "metricA": {
          "label": "POSTGRESQL (ROW)",
          "value": "18.4 seg",
          "sub": "Escaneo completo de filas en disco",
          "color": "#ef4444"
        },
        "metricB": {
          "label": "DUCKDB (COLUMNAR)",
          "value": "0.24 seg",
          "sub": "SIMD AVX-512 sobre vectores en RAM",
          "color": "#10b981"
        }
      }
    },
    {
      "id": "cta_data",
      "type": "terminal_split",
      "duration": 4.5,
      "voiceover": "Si tu equipo gasta fortunas en Snowflake o Databricks para analítica básica, link en bio para modernizar tu pipeline de datos.",
      "visual_cue": "Terminal de auditoría con optimización de analítica in-process",
      "props": {
        "header": "CONSULTORÍA DE DATOS (Link en bio)",
        "title": "ANALÍTICA SIN SERVIDORES",
        "leftTitle": "INSPECCIÓN DE DATA PIPELINES",
        "rightTitle": "AHORRO INMEDIATO",
        "leftText": "$ npx audit-data-stack\n✔ Warehouse actual: Snowflake ($14K/mes)\n✔ Cargas de trabajo: 92% agregaciones simples\n✔ Migración recomendada: DuckDB + Parquet",
        "rightText": "• Elimina el 85% de tu factura analítica\n• Respuestas en milisegundos en vez de minutos\n• Cero mantenimiento de infraestructura\n• ¿Agendamos revisión? Enlace en perfil"
      }
    }
  ]
};
