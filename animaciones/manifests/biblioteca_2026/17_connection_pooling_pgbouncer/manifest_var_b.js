window.__DEFAULT_MANIFEST__ = {
  "title": "[17] Tu base de datos no está lenta, estás saturando el pool de conexiones (Var B)",
  "category": "BASES DE DATOS & ESCALABILIDAD",
  "slug": "17_connection_pooling_pgbouncer",
  "variation": "B",
  "fps": 30,
  "scenes": [
    {
      "id": "hook_pgb_b",
      "type": "kinetic_hook",
      "duration": 4.5,
      "voiceover": "Subiste el tamaño del servidor de base de datos a una máquina de mil dólares y sigue lenta. El problema no es el hardware: es que no tienes un pooler.",
      "visual_cue": "Gancho cinético sobre diagnósticos erróneos de infraestructura",
      "props": {
        "badge": "DIAGNÓSTICO TÉCNICO",
        "lines": [
          {
            "text": "TU BASE DE DATOS",
            "color": "#ffffff"
          },
          {
            "text": "NO ESTÁ LENTA",
            "color": "#ef4444"
          }
        ],
        "subtitle": "ESTÁS SATURANDO EL POOL DE CONEXIONES",
        "icon": "database"
      }
    },
    {
      "id": "split_unpooled_pooled",
      "type": "terminal_split",
      "duration": 6,
      "voiceover": "Limitar las conexiones de la base de datos a dos veces el número de núcleos de CPU multiplica el throughput por cinco al eliminar la contención de cerraduras.",
      "visual_cue": "Doble terminal: Error fatal de max_connections vs PgBouncer fluido",
      "props": {
        "header": "BENCHMARK DE CONEXIONES",
        "title": "CONEXIÓN DIRECTA VS POOLING TRANSACCIONAL",
        "termA": {
          "title": "SIN POOLER (MAX_CONNECTIONS = 1000)",
          "color": "#ef4444",
          "cmd": "psql -c \"SELECT count(*) FROM pg_stat_activity;\"",
          "status": "FATAL: remaining connection slots are reserved",
          "time": "Caída de servicio",
          "lines": [
            "Memoria swap activada en servidor de Postgres",
            "Pérdida de paquetes en cola de sockets",
            "Latencia p99 disparada a 8.2 segundos"
          ]
        },
        "termB": {
          "title": "CON PGBOUNCER (POOL_SIZE = 25)",
          "color": "#10b981",
          "cmd": "pgbouncer -d /etc/pgbouncer.ini",
          "status": "10,000 clientes atendidos sin error",
          "time": "Estable 24/7",
          "lines": [
            "Uso de memoria constante y bajo",
            "CPU al 40% ejecutando queries reales",
            "Latencia p99 estable en 4 milisegundos"
          ]
        }
      }
    },
    {
      "id": "cta_pgb_b",
      "type": "tradeoff_matrix",
      "duration": 5,
      "voiceover": "Audito la configuración de PostgreSQL y resuelvo cuellos de botella de concurrencia y latencia p99. Agenda tu revisión en mi bio.",
      "visual_cue": "Cierre con auditoría técnica de Postgres",
      "props": {
        "header": "AUDITORÍA DE POSTGRESQL & ESCALABILIDAD",
        "title": "RESOLUCIÓN DE CONGESTIÓN DE CONEXIONES",
        "cta": {
          "badge": "AUDITORÍA TÉCNICA // SEDEV",
          "text": "Elimina cuellos de botella en tu base de datos. Enlace directo en mi perfil."
        }
      }
    }
  ]
};
