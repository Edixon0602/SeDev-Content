// Data definitions for Topics 01 to 05 (Zero // AI-slop, Zero SeDev watermarks, Varied Hooks & Layouts)
module.exports = [
  // ----------------------------------------------------
  // TEMA 01: MONOLITO MODULAR
  // ----------------------------------------------------
  {
    slug: '01_monolito_modular',
    category: 'ARQUITECTURA DE SOFTWARE',
    ctaType: 'arquitectura',
    varA: {
      title: 'Cómo estructurar un Monolito Modular sin código espagueti',
      tone: 'Ingeniería profunda, rigor arquitectónico, paso a paso',
      scenes: [
        {
          id: 'hook',
          type: 'architecture_flow',
          duration: 6.0,
          voiceover: '¿Tu monolito se volvió un monstruo inmanejable? El error no fue el monolito: fue no definir límites de dominio.',
          visual_cue: 'Diagrama de arquitectura con límites estrictos de dominio y módulos aislados',
          props: {
            header: 'ARQUITECTURA MODERNA',
            title: 'LÍMITES DE DOMINIO EN UN SOLO BINARIO',
            nodes: [
              { id: 'api', label: 'API ROUTER UNIFICADO', sublabel: 'Fastify / Axum Gateway', color: '#38bdf8', y: 160 },
              { id: 'modules', label: 'MÓDULOS DE DOMINIO (DDD)', sublabel: 'Auth · Orders · Billing (Aislamiento en RAM)', color: '#10b981', y: 520 },
              { id: 'storage', label: 'POSTGRES TRANSACCIONAL', sublabel: 'Esquemas lógicos separados con ACID nativo', color: '#fbbf24', y: 880 }
            ]
          }
        },
        {
          id: 'problem',
          type: 'tradeoff_matrix',
          duration: 5.5,
          voiceover: 'Partir tu app en veinte microservicios solo multiplicó la latencia de red y los fallos distribuidos.',
          visual_cue: 'Tabla comparativa mostrando la sobrecarga de microservicios vs monolito modular',
          props: {
            header: 'DIAGNÓSTICO ARQUITECTÓNICO',
            title: 'EL COSTE OCULTO DE DISTRIBUIR',
            subtitle: 'LATENCIA DE RED VS LLAMADAS EN RAM',
            colA: 'MONOLITO MODULAR',
            colB: 'MICROSERVICIOS',
            rows: [
              { dim: 'Llamadas internas', a: '< 0.01ms (RAM)', b: '15-40ms (HTTP)', aGood: true },
              { dim: 'Transacciones', a: 'ACID Nativas', b: 'Saga Pattern (Frágil)', aGood: true },
              { dim: 'Despliegues', a: '1 Pipeline simple', b: '15 Pipelines K8s', aGood: true }
            ]
          }
        },
        {
          id: 'code_boundary',
          type: 'code_terminal',
          duration: 6.0,
          voiceover: 'En código, prohibimos las importaciones directas entre módulos. Cada dominio expone una interfaz pública estricta.',
          visual_cue: 'Terminal mostrando TypeScript haciendo cumplir límites de módulos con ESLint',
          props: {
            header: 'REGLAS EN CI/CD',
            title: 'ENFORCEMENT DE IMPORTACIONES',
            filename: 'packages/orders/domain.ts',
            codeLines: [
              '# Importación profunda bloqueada por el linter:',
              'import { PaymentModel } from "@app/billing/internal"; // ERROR',
              '',
              '# Comunicación correcta por contrato público:',
              'import { BillingFacade } from "@app/billing";',
              'const invoice = await BillingFacade.charge(order.id);'
            ],
            cursorLine: 5
          }
        },
        {
          id: 'acid_power',
          type: 'metrics_comparison',
          duration: 5.5,
          voiceover: 'Lo mejor: conservas transacciones ACID completas. Si el pago falla, la orden se cancela sin dramas distribuidos.',
          visual_cue: 'Métricas de fiabilidad de transacciones: 100% consistencia vs eventual consistency',
          props: {
            header: 'INTEGRIDAD DE DATOS',
            metricA: { label: 'MICROSERVICIOS (SAGA)', value: '84.2%', sub: 'Fallos de consistencia eventual', color: '#ef4444' },
            metricB: { label: 'MONOLITO MODULAR', value: '100%', sub: 'Garantía ACID en una sola base', color: '#10b981' }
          }
        },
        {
          id: 'cta',
          type: 'terminal_split',
          duration: 5.0,
          voiceover: 'Si tu equipo está atrapado en un laberinto de microservicios y quieres migrar a un monolito modular limpio, link en mi bio para auditar tu arquitectura.',
          visual_cue: 'Terminal de auditoría con verificación de arquitectura y llamada a la acción',
          props: {
            header: 'AUDITORÍA DE ARQUITECTURA (Link en bio)',
            title: 'SIMPLIFICA TU CODEBASE',
            leftTitle: 'ANÁLISIS DE MIGRACIÓN',
            rightTitle: 'BENEFICIOS CLAVE',
            leftText: '$ npx audit-architecture --inspect\n✔ Dependencias cíclicas: 0 detectadas\n✔ Aislamiento de módulos: 100% verificado\n✔ Latencia interna: 0.01ms (In-Memory)',
            rightText: '• Despliegue en 1 comando\n• Cero sobrecarga de Kubernetes\n• Ahorro del 60% en costos de nube\n• Agenda tu sesión: enlace en el perfil'
          }
        }
      ]
    },
    varB: {
      title: 'Por qué tu startup NO necesita microservicios',
      tone: 'Polémico, pragmático, enfocado en velocidad de negocio y dinero',
      scenes: [
        {
          id: 'shock_hook',
          type: 'architecture_flow',
          duration: 5.5,
          voiceover: 'Netflix usa microservicios porque tiene dos mil ingenieros. Tú tienes cuatro personas y estás quemando quince mil dólares al mes.',
          visual_cue: 'Diagrama mostrando la telaraña de microservicios vs la simplicidad de 1 binario',
          props: {
            header: 'REALIDAD DE STARTUP',
            title: 'SOBREINGENIERÍA VS RENTABILIDAD',
            nodes: [
              { id: 'clients', label: 'TRÁFICO REAL DE STARTUP', sublabel: '100-500 peticiones por minuto', color: '#38bdf8', y: 160 },
              { id: 'monolith', label: '1 BINARIO COMPILADO EN HETZNER', sublabel: 'Postgres embebido o local · 0ms red', color: '#10b981', y: 520 },
              { id: 'k8s_hell', label: 'KUBERNETES DISTRIBUIDO (EVITAR)', sublabel: '15 pods · Sidecars · AWS NAT Gateway carísimo', color: '#ef4444', y: 880 }
            ]
          }
        },
        {
          id: 'metrics_cost',
          type: 'metrics_comparison',
          duration: 6.0,
          voiceover: 'La factura de AWS: tres mil dólares en NAT Gateways y bases de datos distribuidas que solo mueven cien peticiones por minuto.',
          visual_cue: 'Métricas de coste mensual: 15.000 dólares en microservicios vs 120 dólares en servidor bare metal',
          props: {
            header: 'GASTO MENSUAL EN INFRAESTRUCTURA',
            metricA: { label: 'MICROSERVICIOS K8S', value: '$14.800', sub: 'NAT Gateways · Control Plane · Logs', color: '#ef4444' },
            metricB: { label: 'MONOLITO MODULAR', value: '$140', sub: 'Servidor Bare Metal en Hetzner', color: '#10b981' }
          }
        },
        {
          id: 'cta_solucion',
          type: 'terminal_split',
          duration: 5.5,
          voiceover: 'Vuelve a lo simple: un solo repositorio, un solo pipeline, despliegue en diez segundos. Link en mi perfil si necesitas auditar tu infraestructura.',
          visual_cue: 'Terminal con despliegue instantáneo en 10 segundos y enlace en bio',
          props: {
            header: 'CONSULTORÍA TÉCNICA (Link en bio)',
            title: 'DESPLIEGUE EN 10 SEGUNDOS',
            leftTitle: 'PIPELINE SIMPLIFICADO',
            rightTitle: 'BENEFICIOS DE NEGOCIO',
            leftText: '$ git push production main\n✔ Compilando binario único...\n✔ Tests de módulos aprobados (3.2s)\n✔ Despliegue Zero-Downtime completado',
            rightText: '• Reduce el gasto de AWS en 90%\n• Despliega features 5x más rápido\n• Cero llamadas rotas entre microservicios\n• ¿Evaluamos tu stack? Link en bio'
          }
        }
      ]
    }
  },

  // ----------------------------------------------------
  // TEMA 02: SQLITE EN PRODUCCIÓN
  // ----------------------------------------------------
  {
    slug: '02_sqlite_produccion',
    category: 'BASES DE DATOS',
    ctaType: 'auditoria_db',
    varA: {
      title: '0ms de latencia: Arquitectura de SQLite embebido con Litestream',
      tone: 'Ingeniería de bajo nivel, métricas reales, sistemas distribuidos',
      scenes: [
        {
          id: 'latency_lead',
          type: 'latency_scale',
          duration: 5.5,
          voiceover: '¿Cuánto tiempo pasa tu backend esperando que PostgreSQL responda por la red? Entre cinco y cuarenta milisegundos.',
          visual_cue: 'Gráfica de escala de latencia: red vs bus NVMe local',
          props: {
            header: 'MÉTRICA DE HARDWARE',
            title: 'EL COSTE DEL SALTO DE RED',
            subtitle: 'RED LOCAL VS LECTURA DIRECTA EN DISCO NVMe'
          }
        },
        {
          id: 'storage_engine',
          type: 'storage_engine_viz',
          duration: 6.5,
          voiceover: 'Con SQLite embebido, la base de datos corre en el mismo proceso. No hay TCP, no hay serialización: son lecturas en memoria a cero milisegundos.',
          visual_cue: 'Visualizador del motor de almacenamiento B-Tree de SQLite y Write-Ahead Log (WAL)',
          props: {
            mode: 'btree',
            badge: 'MOTOR EMBEBIDO',
            title: 'ACCESO DIRECTO A PÁGINAS DE DISCO',
            subtitle: 'B-TREE DE 4 KB EN MEMORIA SIN SOCKETS TCP'
          }
        },
        {
          id: 'concurrency_terminal',
          type: 'terminal_split',
          duration: 5.5,
          voiceover: '¿Y la replicación? Litestream replica cada transacción a S3 en segundo plano. Cero pérdida de datos y cero mantenimiento de clústeres.',
          visual_cue: 'Terminal mostrando benchmark de concurrencia y replicación streaming a S3',
          props: {
            header: 'AUDITORÍA DE BASES DE DATOS (Link en bio)',
            title: 'REPLICACIÓN EN TIEMPO REAL',
            leftTitle: 'LITESTREAM STREAMING',
            rightTitle: 'MÉTRICAS CLAVE',
            leftText: '$ litestream replicate app.db s3://backups\n✔ WAL stream sincronizado\n✔ Latencia de replicación: 85ms\n✔ Recovery Point Objective (RPO): < 1s',
            rightText: '• 50.000 peticiones/seg en 1 CPU\n• Cero costos de RDS en Amazon\n• Backup continuo en streaming\n• Optimiza tu base: enlace en el perfil'
          }
        }
      ]
    },
    varB: {
      title: '¿SQLite aguanta 50K req/s? Desmitificando la concurrencia',
      tone: 'Técnico directo, demolición de mitos, benchmarks',
      scenes: [
        {
          id: 'bench_shock',
          type: 'terminal_split',
          duration: 5.5,
          voiceover: 'Existe el mito de que SQLite no aguanta concurrencia. Aquí estamos corriendo cincuenta mil peticiones por segundo en un solo servidor de cincuenta dólares.',
          visual_cue: 'Terminal ejecutando bombardier sobre SQLite en modo WAL',
          props: {
            header: 'BENCHMARK DE CONCURRENCIA',
            title: '50.000 PETICIONES POR SEGUNDO',
            leftTitle: 'EJECUCIÓN DE PRUEBA',
            rightTitle: 'RESULTADO DE ESTRÉS',
            leftText: '$ k6 run --vus 500 --duration 10s stress.js\n✔ 500 conexiones simultáneas activas\n✔ WAL mode: enabled (Multi-reader/1-writer)\n✔ Errores 5xx: 0% (0 fallos de bloqueo)',
            rightText: '• Throughput: 51.420 req/sec\n• P99 Latency: 0.18 ms\n• Uso de CPU: 42% en 4 núcleos\n• SQLite en NVMe destruye mitos'
          }
        },
        {
          id: 'storage_tree',
          type: 'storage_engine_viz',
          duration: 6.0,
          voiceover: 'El secreto es el modo WAL: los lectores nunca bloquean a los escritores y las lecturas van directo a la memoria caché del kernel.',
          visual_cue: 'Visualizador del motor B-Tree con el WAL recibiendo escrituras secuenciales',
          props: {
            mode: 'btree',
            badge: 'CONCURRENCIA WAL',
            title: 'READERS NO BLOQUEAN A WRITERS',
            subtitle: 'ESCRITURAS APPEND-ONLY EN EL WAL LOG'
          }
        },
        {
          id: 'metrics_compare',
          type: 'metrics_comparison',
          duration: 6.0,
          voiceover: 'Si tu app no mueve más de mil escrituras por segundo, pagar por RDS en AWS es botar el dinero. Link en mi bio si quieres auditar tu arquitectura de datos.',
          visual_cue: 'Comparativa de costos y latencia: RDS Postgres vs SQLite Litestream',
          props: {
            header: 'CONSULTORÍA DE DATOS (Link en bio)',
            metricA: { label: 'AWS RDS POSTGRES', value: '$850 / mes', sub: 'Latencia de red: 15ms · Complejidad', color: '#ef4444' },
            metricB: { label: 'SQLITE + LITESTREAM', value: '$45 / mes', sub: 'Latencia local: 0.05ms · Cero Ops', color: '#10b981' }
          }
        }
      ]
    }
  },

  // ----------------------------------------------------
  // TEMA 03: DUCKDB ANALYTICS
  // ----------------------------------------------------
  {
    slug: '03_duckdb_analytics',
    category: 'DATA ENGINEERING',
    ctaType: 'optimizacion_data',
    varA: {
      title: 'Procesamiento Columnar Vectorizado: 10M filas en milisegundos',
      tone: 'Científico de computación, optimización extrema, hardware moderno',
      scenes: [
        {
          id: 'columnar_viz',
          type: 'storage_engine_viz',
          duration: 6.5,
          voiceover: '¿Por qué DuckDB analiza diez millones de filas en milisegundos mientras Postgres colapsa? Todo está en el formato columnar y las instrucciones SIMD.',
          visual_cue: 'Visualizador del motor columnar vectorizado procesando bloques contiguos de memoria con SIMD',
          props: {
            mode: 'columnar',
            badge: 'MOTOR VECTORIZADO',
            title: 'FILAS TRADICIONALES VS COLUMNAS SIMD',
            subtitle: 'DUCKDB: PROCESAMIENTO POR LOTES DE VECTORES'
          }
        },
        {
          id: 'code_parquet',
          type: 'code_terminal',
          duration: 5.0,
          voiceover: 'DuckDB lee archivos Parquet directamente desde S3 o tu disco local sin levantar servidores pesados ni pipelines de Kafka.',
          visual_cue: 'Terminal mostrando consulta SQL directa sobre Parquet sin ingesta previa',
          props: {
            header: 'QUERY IN-PROCESS',
            title: 'CONSULTA DIRECTA SOBRE PARQUET',
            filename: 'analytics.sql',
            codeLines: [
              '# Consulta in-process sin servidor intermedio:',
              'SELECT country, SUM(total_amount)',
              'FROM "s3://warehouse/sales_2026/*.parquet"',
              'WHERE created_at >= "2026-01-01"',
              'GROUP BY country ORDER BY 2 DESC;'
            ],
            cursorLine: 4
          }
        },
        {
          id: 'metrics_speed',
          type: 'metrics_comparison',
          duration: 5.5,
          voiceover: 'El resultado: consultas analíticas hasta ochenta veces más rápidas usando una fracción de la memoria.',
          visual_cue: 'Comparativa de velocidad analítica: Postgres vs DuckDB',
          props: {
            header: 'AGREGACIÓN SOBRE 10M FILAS',
            metricA: { label: 'POSTGRESQL (ROW)', value: '18.4 seg', sub: 'Escaneo completo de filas en disco', color: '#ef4444' },
            metricB: { label: 'DUCKDB (COLUMNAR)', value: '0.24 seg', sub: 'SIMD AVX-512 sobre vectores en RAM', color: '#10b981' }
          }
        },
        {
          id: 'cta_data',
          type: 'terminal_split',
          duration: 4.5,
          voiceover: 'Si tu equipo gasta fortunas en Snowflake o Databricks para analítica básica, link en bio para modernizar tu pipeline de datos.',
          visual_cue: 'Terminal de auditoría con optimización de analítica in-process',
          props: {
            header: 'CONSULTORÍA DE DATOS (Link en bio)',
            title: 'ANALÍTICA SIN SERVIDORES',
            leftTitle: 'INSPECCIÓN DE DATA PIPELINES',
            rightTitle: 'AHORRO INMEDIATO',
            leftText: '$ npx audit-data-stack\n✔ Warehouse actual: Snowflake ($14K/mes)\n✔ Cargas de trabajo: 92% agregaciones simples\n✔ Migración recomendada: DuckDB + Parquet',
            rightText: '• Elimina el 85% de tu factura analítica\n• Respuestas en milisegundos en vez de minutos\n• Cero mantenimiento de infraestructura\n• ¿Agendamos revisión? Enlace en perfil'
          }
        }
      ]
    },
    varB: {
      title: 'Snowflake es un desperdicio: Analítica in-process con Parquet',
      tone: 'Provocador, anti-cloud waste, pragmático',
      scenes: [
        {
          id: 'bill_shock',
          type: 'metrics_comparison',
          duration: 5.5,
          voiceover: 'Tu startup paga catorce mil dólares mensuales en Snowflake para hacer queries que caben perfectamente en la memoria de una laptop.',
          visual_cue: 'Métricas de coste comparando Snowflake vs DuckDB',
          props: {
            header: 'DESPERDICIO DE NUBE EN ANALÍTICA',
            metricA: { label: 'SNOWFLAKE WAREHOUSE', value: '$14.200', sub: 'Factura mensual recurrente en la nube', color: '#ef4444' },
            metricB: { label: 'DUCKDB + S3 PARQUET', value: '$85', sub: 'Almacenamiento S3 + CPU del servidor', color: '#10b981' }
          }
        },
        {
          id: 'columnar_diagram',
          type: 'storage_engine_viz',
          duration: 6.0,
          voiceover: 'DuckDB corre embebido en tu API de Node o Python. Lee Parquet comprimido con Dictionary Encoding y procesa cien mil registros en milisegundos.',
          visual_cue: 'Visualizador del almacenamiento columnar demostrando el 94% menos de I/O en lecturas',
          props: {
            mode: 'columnar',
            badge: 'ZERO SERVIDORES',
            title: 'ANALÍTICA IN-PROCESS',
            subtitle: 'PARQUET + DUCKDB CORRIENDO EN TU PROPIA APP'
          }
        }
      ]
    }
  },

  // ----------------------------------------------------
  // TEMA 04: eBPF EN EL KERNEL DE LINUX
  // ----------------------------------------------------
  {
    slug: '04_ebpf_linux_kernel',
    category: 'SISTEMAS Y REDES',
    ctaType: 'auditoria_infra',
    varA: {
      title: 'eBPF: Cómo el Kernel de Linux intercepta tráfico a velocidad hardware',
      tone: 'Sistemas operativos, kernel hacking, redes de alta velocidad',
      scenes: [
        {
          id: 'kernel_lead',
          type: 'kernel_sandbox_viz',
          duration: 6.0,
          voiceover: 'Cada vez que un paquete viaja de la tarjeta de red a tu aplicación en Node o Go, el kernel gasta miles de nanosegundos en context switches.',
          visual_cue: 'Visualizador de privilegios Ring 3 (Userspace) vs Ring 0 (Kernel) y penalización de Syscalls',
          props: {
            badge: 'NIVEL DE PRIVILEGIO OS',
            title: 'FRONTERA DE SYSCALLS',
            subtitle: 'USERSPACE VS KERNEL SPACE EN LINUX'
          }
        },
        {
          id: 'packet_pipeline',
          type: 'network_pipeline',
          duration: 6.0,
          voiceover: 'Con eBPF inyectas programas verificados directo en el kernel. Los paquetes se filtran y enrutan en el driver de la tarjeta antes de tocar la pila de red.',
          visual_cue: 'Tubería de red con hooks XDP procesando paquetes a velocidad de cable',
          props: {
            header: 'ARQUITECTURA eBPF',
            title: 'HOOKS DIRECTOS EN XDP / DRIVER',
            latency: '12 ns',
            stages: [
              { name: 'NIC Driver (XDP)', tag: 'Hardware hook' },
              { name: 'eBPF JIT Verifier', tag: 'Ring 0 execution' },
              { name: 'Direct Packet Return', tag: 'Bypass Userspace' }
            ]
          }
        },
        {
          id: 'trace_terminal',
          type: 'terminal_split',
          duration: 5.5,
          voiceover: 'Telemetría, seguridad Zero-Trust y balanceo de carga sin modificar una sola línea de tu código. Link en bio si quieres optimizar tu infraestructura Linux.',
          visual_cue: 'Terminal mostrando bpftrace interceptando conexiones en tiempo real',
          props: {
            header: 'CONSULTORÍA DE INFRAESTRUCTURA (Link en bio)',
            title: 'OBSERVABILIDAD EN KERNEL',
            leftTitle: 'BPFTRACE TELEMETRÍA',
            rightTitle: 'BENEFICIOS DE RENDIMIENTO',
            leftText: '$ bpftrace -e "kprobe:tcp_connect { printf(\"%s -> %d\\n\", comm, pid); }"\nAttaching 1 probe...\nnode -> 4819 (10.0.1.4:443)\ncurl -> 4822 (10.0.1.8:80)',
            rightText: '• Cero sobrecarga de proxies sidecar\n• Latencia reducida en un 80%\n• Seguridad verificada a nivel de socket\n• Audita tus servidores: enlace en bio'
          }
        }
      ]
    },
    varB: {
      title: 'Muerte a los Sidecars de Kubernetes: Por qué eBPF lo cambia todo',
      tone: 'Provocador, anti-sidecar, arquitecturas modernas de red',
      scenes: [
        {
          id: 'sidecar_death',
          type: 'kernel_sandbox_viz',
          duration: 6.0,
          voiceover: 'Los sidecars de Envoy en Kubernetes consumen hasta el veinticinco por ciento de tu CPU solo copiando paquetes entre userspace y kernel. eBPF los hace obsoletos.',
          visual_cue: 'Visualizador del kernel mostrando el bypass de sidecars mediante eBPF',
          props: {
            badge: 'ELIMINACIÓN DE SIDECARS',
            title: 'BYPASS TOTAL DEL USERSPACE',
            subtitle: 'CILIUM eBPF REEMPLAZANDO PROXIES PESADOS'
          }
        },
        {
          id: 'terminal_compare',
          type: 'terminal_split',
          duration: 5.5,
          voiceover: 'Cilium reemplaza toda esa basura enrutando el tráfico directamente en el socket del kernel. Link en bio si quieres reducir costes de Kubernetes.',
          visual_cue: 'Terminal comparando latencia y consumo de CPU: Istio vs Cilium eBPF',
          props: {
            header: 'AUDITORÍA DE KUBERNETES (Link en bio)',
            title: 'CILIUM eBPF EN PRODUCCIÓN',
            leftTitle: 'CONSUMO DE RECURSOS',
            rightTitle: 'MÉTRICAS CLAVE',
            leftText: 'ISTIO PROXIES: 24% CPU | 1.8 ms delay\nCILIUM eBPF:   2% CPU  | 0.2 ms delay\n✔ Ahorro de RAM: 3.2 GB por nodo',
            rightText: '• Reduce el gasto en clusters un 35%\n• Desaparecen los errores de timeout\n• Observabilidad nativa con Hubble\n• Contacto para asesoría en mi perfil'
          }
        }
      ]
    }
  },

  // ----------------------------------------------------
  // TEMA 05: MODEL CONTEXT PROTOCOL (MCP)
  // ----------------------------------------------------
  {
    slug: '05_mcp_agent_harness',
    category: 'INTELIGENCIA ARTIFICIAL',
    ctaType: 'desarrollo_ia',
    varA: {
      title: 'Model Context Protocol (MCP): El estándar universal para IA y código',
      tone: 'Protocolos de sistemas, ingeniería de software para IA, estándares',
      scenes: [
        {
          id: 'mcp_lead',
          type: 'quantization_weights_viz',
          duration: 6.0,
          voiceover: 'Olvídate de pegar código a mano en el chat. Model Context Protocol es el estándar abierto que conecta modelos de IA con bases de datos, APIs y herramientas locales.',
          visual_cue: 'Visualizador del protocolo MCP conectando el harness de agentes con herramientas del entorno',
          props: {
            mode: 'mcp',
            badge: 'ESTÁNDAR UNIVERSAL',
            title: 'MODEL CONTEXT PROTOCOL (MCP)',
            subtitle: 'COMUNICACIÓN TIPADA CLIENTE-SERVIDOR PARA AGENTES'
          }
        },
        {
          id: 'flow_mcp',
          type: 'architecture_flow',
          duration: 6.0,
          voiceover: 'Funciona como un Language Server Protocol: el modelo solicita herramientas y el servidor MCP ejecuta la acción de forma segura en tu máquina.',
          visual_cue: 'Flujo de comunicación entre Claude / GPT, el arnés de MCP y las herramientas locales',
          props: {
            header: 'CONTRATO DE HERRAMIENTAS',
            title: 'ARQUITECTURA CLIENTE - SERVIDOR MCP',
            nodes: [
              { id: 'llm', label: 'MODELO DE IA (LLM)', sublabel: 'Claude · GPT-4 · DeepSeek', color: '#a855f7', y: 160 },
              { id: 'client', label: 'MCP CLIENT (ARNÉS)', sublabel: 'Validación de JSON-Schema y permisos', color: '#38bdf8', y: 520 },
              { id: 'servers', label: 'MCP SERVERS LOCALES', sublabel: 'Postgres · Terminal · Git · FileSystem', color: '#10b981', y: 880 }
            ]
          }
        },
        {
          id: 'terminal_mcp',
          type: 'terminal_split',
          duration: 5.5,
          voiceover: 'Esto convierte a los modelos en agentes autónomos reales con límites de seguridad estrictos. Link en bio si quieres integrar IA en tu software de producción.',
          visual_cue: 'Terminal mostrando ejecución de herramienta MCP con validación estricta de esquema',
          props: {
            header: 'DESARROLLO DE AGENTES (Link en bio)',
            title: 'AGENTES DETERMINISTAS',
            leftTitle: 'TRAZA JSON-RPC',
            rightTitle: 'BENEFICIOS DE MCP',
            leftText: '--> tools/call {"name": "query_db", "sql": "..."}\n<-- tools/result {"rows": 4, "time_ms": 1.2}\n✔ Schema validado con Zod / JSON-Schema',
            rightText: '• Sin wrappers propietarios frágiles\n• Conecta cualquier modelo a tus datos\n• Ejecución local 100% segura\n• Construye agentes serios: link en bio'
          }
        }
      ]
    },
    varB: {
      title: 'El "Prompting" ha muerto: Por qué la industria se mudó a los arneses de IA',
      tone: 'Crítico de modas, técnico avanzado, desarrollo de software',
      scenes: [
        {
          id: 'harness_diagram',
          type: 'quantization_weights_viz',
          duration: 6.0,
          voiceover: 'Intentar que una IA programe escribiéndole biblias de texto es una pérdida de tiempo. Los equipos serios usan arneses deterministas con MCP.',
          visual_cue: 'Visualizador del harness de ingeniería conectando IA con herramientas estructuradas',
          props: {
            mode: 'mcp',
            badge: 'INGENIERÍA VS PROMPTING',
            title: 'EL FIN DEL PROMPTING INFORMAL',
            subtitle: 'HERRAMIENTAS ESTRUCTURADAS Y CONTRATOS ESTRICTOS'
          }
        },
        {
          id: 'terminal_eval',
          type: 'terminal_split',
          duration: 5.5,
          voiceover: 'El arnés compila, corre los tests, lee los errores y le devuelve al modelo exactamente lo que necesita arreglar. Link en mi perfil para consultoría de IA.',
          visual_cue: 'Terminal mostrando ciclo autónomo: código -> test fallido -> mutación -> test verde',
          props: {
            header: 'CONSULTORÍA EN IA (Link en bio)',
            title: 'LOOP AUTÓNOMO DE VERIFICACIÓN',
            leftTitle: 'EJECUCIÓN DEL ARNÉS',
            rightTitle: 'RESULTADO DE CÓDIGO',
            leftText: '$ agent-harness run-task\n✔ Generando parche de código...\n✖ npm test falló: TypeError en auth.ts:42\n✔ Reintentando con contexto del error\n✔ npm test pasó al 100% (Green)',
            rightText: '• Cero alucinaciones sin verificar\n• Parches validados por tests antes de merge\n• Automatización real para equipos de software\n• Agenda tu sesión: enlace en mi perfil'
          }
        }
      ]
    }
  }
];
