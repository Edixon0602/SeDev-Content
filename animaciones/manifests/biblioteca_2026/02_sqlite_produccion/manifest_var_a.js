window.__DEFAULT_MANIFEST__ = {
  "title": "[02] 0ms de latencia: Arquitectura de SQLite embebido con Litestream (Var A)",
  "category": "BASES DE DATOS & RENDIMIENTO",
  "slug": "02_sqlite_produccion",
  "variation": "A",
  "fps": 30,
  "scenes": [
    {
      "id": "latency_hook",
      "type": "latency_scale",
      "duration": 6.5,
      "voiceover": "Cada vez que tu backend consulta PostgreSQL en AWS RDS, pierdes quince milisegundos en el cable de red. SQLite vive en el mismo proceso.",
      "visual_cue": "Apertura directa con escala logarítmica de hardware mostrando el abismo de red",
      "props": {
        "header": "LATENCIA FÍSICA DE HARDWARE",
        "title": "EL ABISMO DE SALIR DEL PROCESO",
        "subtitle": "COMPARATIVA REAL DE TIEMPOS DE RESPUESTA",
        "tiers": [
          {
            "name": "RAM (DDR5 BUS)",
            "latency": "100 ns",
            "ratio": 0.1,
            "color": "#10b981",
            "human": "Instante"
          },
          {
            "name": "NVMe SSD LOCAL (SQLITE)",
            "latency": "0.1 ms",
            "ratio": 0.35,
            "color": "#38bdf8",
            "human": "0.1 milisegundos"
          },
          {
            "name": "AWS RDS NETWORK ROUND-TRIP",
            "latency": "18 ms",
            "ratio": 1,
            "color": "#ef4444",
            "human": "180x más lento"
          }
        ],
        "conclusion": "SQLite local responde antes de que el paquete TCP de Postgres salga del switch.",
        "conclusionSub": "Eliminas completamente la latencia de serialización y sockets de red."
      }
    },
    {
      "id": "litestream_stream",
      "type": "network_pipeline",
      "duration": 6,
      "voiceover": "¿Y los backups? Litestream replica cada transacción del WAL en milisegundos hacia un bucket S3 de forma transparente.",
      "visual_cue": "Diagrama de pipeline de datos: WAL local escribiendo a NVMe y streameando a S3",
      "props": {
        "header": "STREAMING REPLICATION",
        "title": "CERO PÉRDIDA DE DATOS CON LITESTREAM",
        "subtitle": "REPLICACIÓN CONTINUA DEL WRITE-AHEAD LOG",
        "stages": [
          {
            "id": "app",
            "label": "BACKEND APP (SQLITE WAL)",
            "sub": "Escrituras locales a 100K ops/s",
            "y": 220,
            "color": "#38bdf8",
            "metric": "0.05ms"
          },
          {
            "id": "litestream",
            "label": "LITESTREAM REPLICATOR",
            "sub": "Lee frames de WAL en background",
            "y": 520,
            "color": "#fbbf24",
            "metric": "10ms lag"
          },
          {
            "id": "s3",
            "label": "AMAZON S3 / CLOUDFLARE R2",
            "sub": "Respaldo inmutable geodistribuido",
            "y": 820,
            "color": "#10b981",
            "metric": "$0.50/mes"
          }
        ]
      }
    },
    {
      "id": "cta_sqlite",
      "type": "tradeoff_matrix",
      "duration": 5,
      "voiceover": "Si tu base de datos colapsa en picos de tráfico o estás saturando conexiones, realizo auditorías de latencia y arquitectura de datos. Enlace en mi bio.",
      "visual_cue": "Tarjeta final con oferta de auditoría de rendimiento en base de datos",
      "props": {
        "header": "AUDITORÍA DE DATOS Y LATENCIA",
        "title": "OPTIMIZA TU CAPA DE DATOS",
        "subtitle": "ELIMINA CUELLOS DE BOTELLA",
        "cta": {
          "badge": "AUDITORÍA DE BASES DE DATOS (Link en bio)",
          "text": "¿Latencia alta o saturación en tu DB? Link en mi perfil para auditar tus queries y pools."
        }
      }
    }
  ]
};
