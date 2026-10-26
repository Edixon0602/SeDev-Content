window.__DEFAULT_MANIFEST__ = {
  "title": "[17] El costo de un fork() en Linux: Cómo 1000 conexiones matan a Postgres (Var A)",
  "category": "BASES DE DATOS & ESCALABILIDAD",
  "slug": "17_connection_pooling_pgbouncer",
  "variation": "A",
  "fps": 30,
  "scenes": [
    {
      "id": "fork_memory_hook",
      "type": "memory_layout",
      "duration": 6.5,
      "voiceover": "¿Por qué conectar mil clientes directos a PostgreSQL satura tu servidor aunque no hagan consultas? Porque Postgres crea un proceso independiente de diez megabytes por cada conexión.",
      "visual_cue": "Apertura directa con layout de memoria mostrando backend processes compitiendo por CPU y RAM",
      "props": {
        "header": "ARQUITECTURA DE PROCESOS",
        "title": "POSTMASTER Y BACKEND WORKERS",
        "items": [
          {
            "name": "1000 CONEXIONES DIRECTAS",
            "addr": "1000 PROCESOS FORK()",
            "value": "10GB RAM consumidos solo en sockets",
            "color": "#ef4444"
          },
          {
            "name": "CAMBIO DE CONTEXTO EN KERNEL",
            "addr": "CONTEXT SWITCH OVERHEAD",
            "value": "La CPU gasta 60% solo cambiando de tarea",
            "color": "#f59e0b"
          }
        ]
      }
    },
    {
      "id": "pgbouncer_pool",
      "type": "architecture_flow",
      "duration": 6.5,
      "voiceover": "PgBouncer actúa como un embudo inteligente. Mantiene solo veinte conexiones reales con la base y atiende a miles de clientes en modo transaccional.",
      "visual_cue": "Diagrama de flujo: 10,000 conexiones de clientes pasando por PgBouncer a 20 conexiones reales de Postgres",
      "props": {
        "header": "CONNECTION POOLING EFICIENTE",
        "title": "EMBUDO TRANSACCIONAL CON PGBOUNCER",
        "nodes": [
          {
            "id": "clients",
            "label": "10,000 CONEXIONES ACTIVAS",
            "sublabel": "Servidores web y workers concurrentes",
            "color": "#38bdf8",
            "y": 160
          },
          {
            "id": "pooler",
            "label": "PGBOUNCER (TRANSACTION MODE)",
            "sublabel": "Multiplexa peticiones en un micro-proceso en C",
            "color": "#fbbf24",
            "y": 520
          },
          {
            "id": "db",
            "label": "POSTGRES (20 POOL WORKERS)",
            "sublabel": "100% de la CPU dedicada a ejecutar queries reales",
            "color": "#10b981",
            "y": 880
          }
        ]
      }
    },
    {
      "id": "cta_pgb",
      "type": "tradeoff_matrix",
      "duration": 5,
      "voiceover": "Si tu base de datos sufre picos de latencia o agota su pool de conexiones en momentos críticos, audito tu infraestructura de datos. Link en mi perfil.",
      "visual_cue": "Cierre con llamado a auditoría de bases de datos",
      "props": {
        "header": "AUDITORÍA DE RENDIMIENTO DE BASES DE DATOS",
        "title": "OPTIMIZA TUS POOLS DE CONEXIÓN",
        "cta": {
          "badge": "AUDITORÍA DE DATOS (Link en bio)",
          "text": "¿Problemas con max_connections en Postgres? Link en mi bio para agendar una auditoría técnica."
        }
      }
    }
  ]
};
