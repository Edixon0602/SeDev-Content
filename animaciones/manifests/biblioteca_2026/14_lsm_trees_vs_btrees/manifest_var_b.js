window.__DEFAULT_MANIFEST__ = {
  "title": "[14] ¿Por qué tu base colapsa en escrituras masivas? Postgres vs RocksDB (Var B)",
  "category": "SISTEMAS DE ALMACENAMIENTO & BASES DE DATOS",
  "slug": "14_lsm_trees_vs_btrees",
  "variation": "B",
  "fps": 30,
  "scenes": [
    {
      "id": "iops_split_hook",
      "type": "terminal_split",
      "duration": 6.5,
      "voiceover": "Estás bombardeando PostgreSQL con eventos de analítica y tu disco colapsó por contención de páginas de B-Trees.",
      "visual_cue": "Apertura directa con terminal mostrando saturación de IOPS al 100% en disco",
      "props": {
        "header": "TELEMETRÍA DE DISCO",
        "title": "SATURACIÓN DE IOPS EN NVME",
        "termA": {
          "title": "POSTGRESQL INSERT MASIVO",
          "color": "#ef4444",
          "cmd": "iostat -xz 1",
          "status": "Disco al 99.8% de utilización · I/O Wait",
          "time": "Saturado",
          "lines": [
            "B-Tree lock contention en páginas de índices",
            "WAL flush bottleneck bloqueando hilos de workers",
            "Peticiones HTTP cayendo con error 504 Gateway Timeout"
          ]
        },
        "termB": {
          "title": "LSM / COLUMNAR ENGINE",
          "color": "#10b981",
          "cmd": "ingest_worker --batch=10000",
          "status": "Escrituras secuenciales sin bloqueos",
          "time": "Fluido",
          "lines": [
            "MemTable absorbe ráfagas de 150,000 req/s",
            "Utilización de disco por debajo del 25%",
            "Latencia de inserción estable en sub-milisegundos"
          ]
        }
      }
    },
    {
      "id": "cta_lsm_b",
      "type": "tradeoff_matrix",
      "duration": 5,
      "voiceover": "Audito la arquitectura de datos de tu producto para seleccionar el motor adecuado y evitar caídas en picos de tráfico. Enlace en mi bio.",
      "visual_cue": "Cierre con auditoría de datos",
      "props": {
        "header": "AUDITORÍA DE PERSISTENCIA Y LATENCIA",
        "title": "DISEÑO DE CAPA DE DATOS PARA ALTA CARGA",
        "cta": {
          "badge": "AUDITORÍA DE DATOS (Link en perfil)",
          "text": "Evita caídas por saturación de base de datos. Agenda tu auditoría técnica en mi perfil."
        }
      }
    }
  ]
};
