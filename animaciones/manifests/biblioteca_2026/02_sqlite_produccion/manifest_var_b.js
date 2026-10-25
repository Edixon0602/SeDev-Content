window.__DEFAULT_MANIFEST__ = {
  "title": "[02] ¿SQLite aguanta 50K req/s? Desmitificando la concurrencia (Var B)",
  "category": "BASES DE DATOS & RENDIMIENTO",
  "slug": "02_sqlite_produccion",
  "variation": "B",
  "fps": 30,
  "scenes": [
    {
      "id": "hook_sqlite_b",
      "type": "kinetic_hook",
      "duration": 4.5,
      "voiceover": "Te dijeron que SQLite es solo un juguete para desarrollo. La verdad es que puede aguantar cincuenta mil peticiones por segundo en un VPS.",
      "visual_cue": "Gancho cinético retador",
      "props": {
        "badge": "DESMITIFICANDO SOFTWARE",
        "lines": [
          {
            "text": "¿SQLITE NO AGUANTA",
            "color": "#ffffff"
          },
          {
            "text": "PRODUCCIÓN?",
            "color": "#ef4444"
          }
        ],
        "subtitle": "EL MITO DE LA BASE DE DATOS DE JUGUETE",
        "icon": "database"
      }
    },
    {
      "id": "wal_mode",
      "type": "code_terminal",
      "duration": 6,
      "voiceover": "Con el modo WAL activado, los lectores nunca bloquean a los escritores y las lecturas son concurrentes y paralelas.",
      "visual_cue": "Terminal configurando PRAGMA journal_mode=WAL y synchronous=NORMAL",
      "props": {
        "header": "CONFIGURACIÓN DE PRODUCCIÓN",
        "title": "MODO WAL & CONCURRENCIA",
        "filename": "db/setup.sql",
        "codeLines": [
          "-- Activa escritura paralela sin bloqueo de lectores",
          "PRAGMA journal_mode = WAL;",
          "PRAGMA synchronous = NORMAL;",
          "PRAGMA busy_timeout = 5000;",
          "PRAGMA cache_size = -64000; -- 64MB RAM Cache",
          "-- Resultado: 50.000 lecturas/s por núcleo de CPU"
        ],
        "cursorLine": 5
      }
    },
    {
      "id": "benchmark_split",
      "type": "terminal_split",
      "duration": 6,
      "voiceover": "Mientras Postgres gasta CPU manejando conexiones de red, SQLite procesa queries directamente en la memoria del kernel.",
      "visual_cue": "Benchmark en vivo comparando RPS y consumo de memoria",
      "props": {
        "header": "BENCHMARK DE CONCURRENCIA",
        "title": "WRK BENCHMARK // 10,000 CONCURRENT CLIENTS",
        "termA": {
          "title": "POSTGRESQL EN CLOUD RDS",
          "color": "#ef4444",
          "cmd": "wrk -t8 -c200 -d10s http://api/pg",
          "status": "Saturando pool de conexiones",
          "time": "4,200 req/s",
          "lines": [
            "Latencia p99: 42.1ms (Network queue)",
            "CPU al 85% en RDS micro",
            "Coste mensual estimado: $180"
          ]
        },
        "termB": {
          "title": "SQLITE EMBEDDED CON WAL",
          "color": "#10b981",
          "cmd": "wrk -t8 -c200 -d10s http://api/sqlite",
          "status": "Lectura directa de NVMe con page cache",
          "time": "52,400 req/s",
          "lines": [
            "Latencia p99: 0.8ms (Sub-milisegundo)",
            "CPU al 22% en VPS de $10",
            "Coste mensual: $10 (Hetzner VPS)"
          ]
        }
      }
    },
    {
      "id": "cta_sqlite_b",
      "type": "tradeoff_matrix",
      "duration": 5,
      "voiceover": "Si tu factura de base de datos se salió de control y quieres optimizar tu arquitectura, reviso tu stack técnico. Link en mi biografía.",
      "visual_cue": "Cierre con llamado a auditoría de bases de datos",
      "props": {
        "header": "AUDITORÍA TÉCNICA DE BASES DE DATOS",
        "title": "REDUCE COSTES // ELEVA CONCURRENCIA",
        "cta": {
          "badge": "AUDITORÍA DE DATOS // SEDEV",
          "text": "¿Tu base de datos está lenta o cara? Agenda una auditoría técnica en el enlace del perfil."
        }
      }
    }
  ]
};
