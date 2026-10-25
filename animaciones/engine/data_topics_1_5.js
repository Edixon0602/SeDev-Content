// Data definitions for Topics 01 to 05
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
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: '¿Tu monolito se volvió un monstruo inmanejable? El error no fue el monolito: fue no definir límites de dominio.',
          visual_cue: 'Gancho cinético de apertura con engranaje de arquitectura',
          props: {
            badge: 'ARQUITECTURA 2026',
            lines: [
              { text: 'EL GRAN REGRESO DEL', color: '#ffffff' },
              { text: 'MONOLITO MODULAR', color: '#38bdf8' }
            ],
            subtitle: 'LÍMITES DE DOMINIO // UN SOLO BINARIO',
            icon: 'cpu'
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
          id: 'modules_arch',
          type: 'architecture_flow',
          duration: 6.0,
          voiceover: 'Un monolito modular vive en un solo binario, pero sus módulos están aislados como si fueran cajas negras.',
          visual_cue: 'Diagrama de flujo mostrando módulos aislados: Auth, Billing y Inventory comunicándose por interfaces',
          props: {
            header: 'ESTRUCTURA DE DOMINIO',
            title: 'LÍMITES ESTRICTOS EN MEMORIA',
            nodes: [
              { id: 'api', label: 'API GATEWAY INTERNO', sublabel: 'Fastify / Axum Router', color: '#38bdf8', y: 160 },
              { id: 'modules', label: 'DOMINIOS AISLADOS (DDD)', sublabel: 'Orders // Billing // Users (Zero cross-imports)', color: '#10b981', y: 520 },
              { id: 'storage', label: 'POSTGRES TRANSACCIONAL', sublabel: 'Esquemas lógicos separados (Single DB)', color: '#fbbf24', y: 880 }
            ]
          }
        },
        {
          id: 'code_boundary',
          type: 'code_terminal',
          duration: 6.0,
          voiceover: 'En código, prohibimos las importaciones directas entre módulos. Cada dominio expone una interfaz pública estricta.',
          visual_cue: 'Terminal mostrando TypeScript / Rust haciendo cumplir límites de módulos con ESLint / ArchUnit',
          props: {
            header: 'ENFORCEMENT EN CI/CD',
            title: 'REGLAS DE IMPORTACIÓN STRICT',
            filename: 'packages/orders/domain.ts',
            codeLines: [
              '// ❌ ERROR: Importación profunda prohibida',
              'import { PaymentModel } from "@sedev/billing/internal";',
              '',
              '// ✔ CORRECTO: Comunicación por interfaz pública',
              'import { BillingFacade } from "@sedev/billing";',
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
          type: 'tradeoff_matrix',
          duration: 4.5,
          voiceover: 'Si tu equipo está atrapado en un laberinto de microservicios y quieres migrar a un monolito modular limpio, link en mi bio para auditar tu arquitectura.',
          visual_cue: 'Cierre con tarjeta de contacto y consultoría de arquitectura',
          props: {
            header: 'CONSULTORÍA DE ARQUITECTURA',
            title: 'SIMPLIFICA TU CODEBASE',
            subtitle: 'REDUCE COSTES // MULTIPLICA VELOCIDAD',
            cta: {
              badge: 'AUDITORÍA DE ARQUITECTURA // SEDEV',
              text: '¿Dudas con tu arquitectura? Enlace en mi perfil para agendar una sesión técnica.'
            }
          }
        }
      ]
    },
    varB: {
      title: 'Por qué tu startup NO necesita microservicios',
      tone: 'Polémico, pragmático, enfocado en velocidad de negocio y dinero',
      scenes: [
        {
          id: 'hook_b',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: 'Tu startup tiene tres desarrolladores y diez microservicios. Están quemando el cincuenta por ciento de su tiempo manteniendo Kubernetes.',
          visual_cue: 'Gancho cinético agresivo de llamada de atención',
          props: {
            badge: 'REALIDAD DE STARTUP',
            lines: [
              { text: 'DEJA DE USAR', color: '#ef4444' },
              { text: 'MICROSERVICIOS', color: '#ffffff' }
            ],
            subtitle: 'COMPLEJIDAD ACCIDENTAL // VELOCIDAD CERO',
            icon: 'server_rack'
          }
        },
        {
          id: 'bill_compare',
          type: 'terminal_split',
          duration: 6.0,
          voiceover: 'Amazon Prime Video y Shopify consolidaron servicios para recortar el noventa por ciento de sus costes y latencias.',
          visual_cue: 'Doble terminal comparando factura mensual y tiempo de despliegue',
          props: {
            header: 'EL COSTE DE LA MODA',
            title: 'KUBERNETES VS UN SOLO SERVIDOR',
            subtitle: 'DESPLIEGUE REAL EN PRODUCCIÓN',
            termA: {
              title: 'STACK CON MICROSERVICIOS',
              color: '#ef4444',
              cmd: 'kubectl get pods --all-namespaces',
              status: '24 pods en ejecución // 8 clusters',
              time: '$3,800/mes',
              lines: [
                'Factura AWS EKS + NAT Gateways: $3,800',
                'Tiempo medio de debugging: 4 horas',
                'Tracing distribuido obligatorio con Jaeger'
              ]
            },
            termB: {
              title: 'MONOLITO MODULAR CON KAMAL',
              color: '#10b981',
              cmd: 'kamal deploy',
              status: '1 solo binario en VPS dedicado',
              time: '$120/mes',
              lines: [
                'Factura servidor Hetzner: $120/mes',
                'Tiempo medio de deploy: 18 segundos',
                'Logs centralizados en stdout directos'
              ]
            }
          }
        },
        {
          id: 'verdict_b',
          type: 'tradeoff_matrix',
          duration: 6.0,
          voiceover: 'Los microservicios resuelven problemas de organización cuando tienes mil ingenieros, no de rendimiento técnico.',
          visual_cue: 'Matriz de tradeoffs demoledora',
          props: {
            header: 'PRAGMATISMO TÉCNICO',
            title: '¿CUÁNDO USAR CADA UNO?',
            colA: 'STARTUPS & PYMES',
            colB: 'BIG TECH (+500 DEVS)',
            rows: [
              { dim: 'Arquitectura recomendada', a: 'Monolito Modular', b: 'Microservicios', aGood: true },
              { dim: 'Tiempo a producción', a: '1 semana', b: '3 meses', aGood: true },
              { dim: 'Mantenimiento DevOps', a: '0 personas', b: 'Equipo dedicado', aGood: true }
            ]
          }
        },
        {
          id: 'cta_b',
          type: 'code_terminal',
          duration: 5.0,
          voiceover: 'Si tu equipo pasa más tiempo arreglando pipelines que creando producto, audito tu arquitectura para volver a la simplicidad. Agenda en mi perfil.',
          visual_cue: 'Terminal de contacto con auditoría técnica',
          props: {
            header: 'AUDITORÍA DE ARQUITECTURA',
            title: 'DESMANTELA LA COMPLEJIDAD',
            filename: 'audit/contact.sh',
            codeLines: [
              '# Diagnóstico de cuellos de botella y costes cloud',
              'sedev audit --target=microservices --strategy=consolidation',
              '✔ Retorno estimado: -75% costes y 5x velocidad de entrega',
              '# Agenda tu sesión técnica en el link de la bio.'
            ],
            cursorLine: 3
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
    category: 'BASES DE DATOS & RENDIMIENTO',
    ctaType: 'database',
    varA: {
      title: '0ms de latencia: Arquitectura de SQLite embebido con Litestream',
      tone: 'Explicación técnica de bajo nivel, latencia de hardware y streaming',
      scenes: [
        {
          id: 'hook_sqlite',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: '¿Hacer consultas a tu base de datos con cero milisegundos de latencia de red? Es hora de hablar de SQLite en producción.',
          visual_cue: 'Gancho cinético con icono de base de datos ultraligera',
          props: {
            badge: 'BASES DE DATOS 2026',
            lines: [
              { text: 'SQLITE EN', color: '#ffffff' },
              { text: 'PRODUCCIÓN', color: '#38bdf8' }
            ],
            subtitle: '0MS DE RED // REPLICACIÓN CONTINUA',
            icon: 'sqlite_feather'
          }
        },
        {
          id: 'latency_gap',
          type: 'latency_scale',
          duration: 6.0,
          voiceover: 'Cada vez que tu backend consulta PostgreSQL en AWS RDS, pierdes quince milisegundos en el cable de red. SQLite vive en el mismo proceso.',
          visual_cue: 'Escala logarítmica de hardware mostrando el abismo entre red y disco NVMe local',
          props: {
            header: 'LATENCIA FÍSICA DE HARDWARE',
            title: 'EL ABISMO DE SALIR DEL PROCESO',
            subtitle: 'COMPARATIVA REAL DE TIEMPOS DE RESPUESTA',
            tiers: [
              { name: 'RAM (DDR5)', latency: '100 ns', ratio: 0.1, color: '#10b981', human: 'Instante' },
              { name: 'NVMe SSD LOCAL (SQLITE)', latency: '0.1 ms', ratio: 0.35, color: '#38bdf8', human: '0.1 milisegundos' },
              { name: 'AWS RDS NETWORK ROUND-TRIP', latency: '18 ms', ratio: 1.0, color: '#ef4444', human: '180x más lento' }
            ],
            conclusion: 'SQLite local responde antes de que el paquete TCP de Postgres salga del switch.',
            conclusionSub: 'Eliminas completamente la latencia de serialización y sockets de red.'
          }
        },
        {
          id: 'litestream_stream',
          type: 'network_pipeline',
          duration: 6.0,
          voiceover: '¿Y los backups? Litestream replica cada transacción del WAL en milisegundos hacia un bucket S3 de forma transparente.',
          visual_cue: 'Diagrama de pipeline de datos: WAL local escribiendo a NVMe y streameando a S3',
          props: {
            header: 'STREAMING REPLICATION',
            title: 'CERO PÉRDIDA DE DATOS CON LITESTREAM',
            subtitle: 'REPLICACIÓN CONTINUA DEL WRITE-AHEAD LOG',
            stages: [
              { id: 'app', label: 'BACKEND APP (SQLITE WAL)', sub: 'Escrituras locales a 100K ops/s', y: 220, color: '#38bdf8', metric: '0.05ms' },
              { id: 'litestream', label: 'LITESTREAM REPLICATOR', sub: 'Lee frames de WAL en background', y: 520, color: '#fbbf24', metric: '10ms lag' },
              { id: 's3', label: 'AMAZON S3 / CLOUDFLARE R2', sub: 'Respaldo inmutable geodistribuido', y: 820, color: '#10b981', metric: '$0.50/mes' }
            ]
          }
        },
        {
          id: 'cta_sqlite',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Si tu base de datos colapsa en picos de tráfico o estás saturando conexiones, realizo auditorías de latencia y arquitectura de datos. Enlace en mi bio.',
          visual_cue: 'Tarjeta final con oferta de auditoría de rendimiento en base de datos',
          props: {
            header: 'AUDITORÍA DE DATOS & LATENCIA',
            title: 'OPTIMIZA TU CAPA DE DATOS',
            subtitle: 'SEDEV CONSULTING',
            cta: {
              badge: 'AUDITORÍA DE BASES DE DATOS // SEDEV',
              text: '¿Latencia alta o saturación en tu DB? Link en mi perfil para auditar tus queries y pools.'
            }
          }
        }
      ]
    },
    varB: {
      title: '¿SQLite aguanta 50K req/s? Desmitificando la concurrencia',
      tone: 'Directo, basado en benchmarks, destruyendo mitos sobre bloqueos',
      scenes: [
        {
          id: 'hook_sqlite_b',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: 'Te dijeron que SQLite es solo un juguete para desarrollo. La verdad es que puede aguantar cincuenta mil peticiones por segundo en un VPS.',
          visual_cue: 'Gancho cinético retador',
          props: {
            badge: 'DESMITIFICANDO SOFTWARE',
            lines: [
              { text: '¿SQLITE NO AGUANTA', color: '#ffffff' },
              { text: 'PRODUCCIÓN?', color: '#ef4444' }
            ],
            subtitle: 'EL MITO DE LA BASE DE DATOS DE JUGUETE',
            icon: 'database'
          }
        },
        {
          id: 'wal_mode',
          type: 'code_terminal',
          duration: 6.0,
          voiceover: 'Con el modo WAL activado, los lectores nunca bloquean a los escritores y las lecturas son concurrentes y paralelas.',
          visual_cue: 'Terminal configurando PRAGMA journal_mode=WAL y synchronous=NORMAL',
          props: {
            header: 'CONFIGURACIÓN DE PRODUCCIÓN',
            title: 'MODO WAL & CONCURRENCIA',
            filename: 'db/setup.sql',
            codeLines: [
              '-- Activa escritura paralela sin bloqueo de lectores',
              'PRAGMA journal_mode = WAL;',
              'PRAGMA synchronous = NORMAL;',
              'PRAGMA busy_timeout = 5000;',
              'PRAGMA cache_size = -64000; -- 64MB RAM Cache',
              '-- Resultado: 50.000 lecturas/s por núcleo de CPU'
            ],
            cursorLine: 5
          }
        },
        {
          id: 'benchmark_split',
          type: 'terminal_split',
          duration: 6.0,
          voiceover: 'Mientras Postgres gasta CPU manejando conexiones de red, SQLite procesa queries directamente en la memoria del kernel.',
          visual_cue: 'Benchmark en vivo comparando RPS y consumo de memoria',
          props: {
            header: 'BENCHMARK DE CONCURRENCIA',
            title: 'WRK BENCHMARK // 10,000 CONCURRENT CLIENTS',
            termA: {
              title: 'POSTGRESQL EN CLOUD RDS',
              color: '#ef4444',
              cmd: 'wrk -t8 -c200 -d10s http://api/pg',
              status: 'Saturando pool de conexiones',
              time: '4,200 req/s',
              lines: [
                'Latencia p99: 42.1ms (Network queue)',
                'CPU al 85% en RDS micro',
                'Coste mensual estimado: $180'
              ]
            },
            termB: {
              title: 'SQLITE EMBEDDED CON WAL',
              color: '#10b981',
              cmd: 'wrk -t8 -c200 -d10s http://api/sqlite',
              status: 'Lectura directa de NVMe con page cache',
              time: '52,400 req/s',
              lines: [
                'Latencia p99: 0.8ms (Sub-milisegundo)',
                'CPU al 22% en VPS de $10',
                'Coste mensual: $10 (Hetzner VPS)'
              ]
            }
          }
        },
        {
          id: 'cta_sqlite_b',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Si tu factura de base de datos se salió de control y quieres optimizar tu arquitectura, reviso tu stack técnico. Link en mi biografía.',
          visual_cue: 'Cierre con llamado a auditoría de bases de datos',
          props: {
            header: 'AUDITORÍA TÉCNICA DE BASES DE DATOS',
            title: 'REDUCE COSTES // ELEVA CONCURRENCIA',
            cta: {
              badge: 'AUDITORÍA DE DATOS // SEDEV',
              text: '¿Tu base de datos está lenta o cara? Agenda una auditoría técnica en el enlace del perfil.'
            }
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
    category: 'DATA ENGINEERING & ANALYTICS',
    ctaType: 'cloud_costs',
    varA: {
      title: 'Procesamiento Columnar Vectorizado: 10M filas en milisegundos',
      tone: 'Técnico de computación, registros SIMD, almacenamiento columnar',
      scenes: [
        {
          id: 'hook_duckdb',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: '¿Cómo procesar diez millones de filas de analítica en tu laptop en medio segundo sin levantar un clúster de Spark? Con DuckDB.',
          visual_cue: 'Gancho cinético con icono columnar',
          props: {
            badge: 'ANALÍTICA DE DATOS 2026',
            lines: [
              { text: 'DUCKDB: EL SQLITE', color: '#ffffff' },
              { text: 'DE LA ANALÍTICA', color: '#fbbf24' }
            ],
            subtitle: 'PROCESAMIENTO COLUMNAR VECTORIZADO',
            icon: 'duckdb'
          }
        },
        {
          id: 'row_vs_col',
          type: 'memory_layout',
          duration: 6.0,
          voiceover: 'Las bases transaccionales leen filas enteras, desperdiciando caché de CPU. DuckDB lee solo las columnas que necesitas en vectores contiguos.',
          visual_cue: 'Comparación visual de layout de memoria: Row-oriented vs Columnar Vectorized',
          props: {
            header: 'MEMORIA Y HARDWARE',
            title: 'ROW-STORE VS COLUMN-STORE',
            items: [
              { name: 'POSTGRES (ROW-STORE)', addr: 'Heap Tuple: Lee todos los campos de disco', value: 'Desperdicio de CPU L3 Cache', color: '#ef4444' },
              { name: 'DUCKDB (VECTORIZED)', addr: 'Vector Chunk: 2048 enteros contiguos', value: 'Aceleración SIMD directa en CPU', color: '#10b981' }
            ]
          }
        },
        {
          id: 'parquet_query',
          type: 'code_terminal',
          duration: 6.0,
          voiceover: 'Puedes consultar archivos Parquet directamente en Amazon S3 sin importar los datos. Solo descargas los bytes exactos que pide tu consulta.',
          visual_cue: 'Terminal ejecutando query SQL directa sobre s3://bucket/data.parquet',
          props: {
            header: 'CONSULTA DIRECTA SOBRE PARQUET',
            title: 'ZERO-ETL ANALYTICS',
            filename: 'analytics/query.py',
            codeLines: [
              'import duckdb',
              '# Lee 50GB de logs en S3 descargando solo 40MB de metadata',
              'res = duckdb.query("""',
              '  SELECT user_country, SUM(amount_usd) ',
              '  FROM read_parquet("s3://logs-2026/*.parquet")',
              '  GROUP BY 1 ORDER BY 2 DESC LIMIT 10;',
              '""").df()',
              'print(f"Completado en {res.execution_time}ms")'
            ],
            cursorLine: 6
          }
        },
        {
          id: 'cta_duckdb',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Si tu empresa gasta miles de dólares en Snowflake o BigQuery para consultas simples, audito tus costes de datos para migrar a motores in-process. Link en bio.',
          visual_cue: 'Cierre con llamado a auditoría de costes cloud de datos',
          props: {
            header: 'AUDITORÍA DE COSTES CLOUD',
            title: 'REDUCE TU FACTURA DE ANALÍTICA',
            cta: {
              badge: 'AUDITORÍA DE COSTES // SEDEV',
              text: '¿Gastas fortunas en Snowflake o Databricks? Link en mi perfil para auditar tus pipelines.'
            }
          }
        }
      ]
    },
    varB: {
      title: 'Snowflake es un desperdicio: Analítica in-process con Parquet',
      tone: 'Crítico financiero, mostrando el despilfarro de clústeres cloud',
      scenes: [
        {
          id: 'hook_duckdb_b',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: 'Las empresas queman cinco mil dólares al mes en Snowflake para correr reportes que una máquina de diez dólares procesa en segundos con DuckDB.',
          visual_cue: 'Gancho cinético sobre costes en analítica',
          props: {
            badge: 'DESTRUYENDO COSTES CLOUD',
            lines: [
              { text: 'DEJA DE PAGAR', color: '#ef4444' },
              { text: 'SNOWFLAKE', color: '#ffffff' }
            ],
            subtitle: 'EL DESPILFARRO DE LOS DATA WAREHOUSES',
            icon: 'duckdb'
          }
        },
        {
          id: 'cost_split',
          type: 'terminal_split',
          duration: 6.0,
          voiceover: 'El noventa por ciento de las empresas no tienen big data: tienen medium data que cabe perfectamente en la memoria de un solo servidor.',
          visual_cue: 'Doble terminal comparando factura mensual y tiempos de query',
          props: {
            header: 'COMPARATIVA DE FACTURACIÓN',
            title: 'CLOUD DATA WAREHOUSE VS IN-PROCESS',
            termA: {
              title: 'SNOWFLAKE / BIGQUERY CLUSTER',
              color: '#ef4444',
              cmd: 'Warehouse XS Always-On + Storage fees',
              status: 'Créditos computacionales consumiéndose',
              time: '$4,500/mes',
              lines: [
                'Egress data transfer costs: $650',
                'Tiempo de arranque de warehouse: 8 segundos',
                'Lock-in de proveedor propietario'
              ]
            },
            termB: {
              title: 'DUCKDB EMBEDDED + PARQUET EN S3',
              color: '#10b981',
              cmd: 'duckdb server.duckdb --readonly',
              status: 'Motor C++ embebido en contenedor',
              time: '$80/mes',
              lines: [
                'Almacenamiento en S3 estándar: $45',
                'Instancia Hetzner 64GB RAM: $35',
                'Formato abierto Parquet / Apache Iceberg'
              ]
            }
          }
        },
        {
          id: 'cta_duckdb_b',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Audito la arquitectura de datos de tu empresa para recortar sobrecostes de infraestructura. Escríbeme o agenda tu sesión en el link de mi perfil.',
          visual_cue: 'Cierre con auditoría de infraestructura de datos',
          props: {
            header: 'AUDITORÍA DE INFRAESTRUCTURA',
            title: 'OPTIMIZACIÓN DE PIPELINES DE DATOS',
            cta: {
              badge: 'AUDITORÍA DE COSTES // SEDEV',
              text: 'Recorta hasta un 80% en tu infraestructura de analítica. Enlace directo en mi perfil.'
            }
          }
        }
      ]
    }
  },

  // ----------------------------------------------------
  // TEMA 04: EBPF LINUX KERNEL
  // ----------------------------------------------------
  {
    slug: '04_ebpf_linux_kernel',
    category: 'SISTEMAS OPERATIVOS & OBSERVABILIDAD',
    ctaType: 'seguridad_infra',
    varA: {
      title: 'eBPF: Cómo el Kernel de Linux intercepta tráfico a velocidad hardware',
      tone: 'Sistemas operativos, bajo nivel en C/Kernel, seguridad y redes',
      scenes: [
        {
          id: 'hook_ebpf',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: '¿Cómo monitorizar y asegurar cada paquete de red sin tocar una sola línea de código de tu aplicación? Con eBPF en el Kernel de Linux.',
          visual_cue: 'Gancho cinético con escudo de kernel Linux',
          props: {
            badge: 'KERNEL DE LINUX 2026',
            lines: [
              { text: 'EBPF: REVOLUCIÓN', color: '#ffffff' },
              { text: 'EN EL KERNEL', color: '#f59e0b' }
            ],
            subtitle: 'SANDBOX SEGURO A NIVEL DE SISTEMA OPERATIVO',
            icon: 'kernel_shield'
          }
        },
        {
          id: 'kernel_pipe',
          type: 'network_pipeline',
          duration: 6.5,
          voiceover: 'eBPF permite ejecutar bytecode verificado dentro del kernel. Los paquetes se filtran y analizan antes de que lleguen al espacio de usuario.',
          visual_cue: 'Pipeline visual mostrando la intercepción en el kernel sin copias a user space',
          props: {
            header: 'ARQUITECTURA DE RED EN KERNEL',
            title: 'INSPECCIÓN EN TIEMPO REAL SIN COPÍAS',
            subtitle: 'BYTECODE VERIFICADO // ZERO USER-SPACE OVERHEAD',
            stages: [
              { id: 'nic', label: 'TARJETA DE RED (NIC)', sub: 'Llegada de paquetes Ethernet', y: 220, color: '#06b6d4', metric: '40 Gbps' },
              { id: 'ebpf', label: 'EBPF PROGRAM (XDP)', sub: 'Intercepción en Ring Buffer del Kernel', y: 520, color: '#f59e0b', metric: '0.005ms' },
              { id: 'app', label: 'USER SPACE RUNTIME', sub: 'Solo recibe paquetes legítimos', y: 820, color: '#10b981', metric: 'Zero CPU waste' }
            ]
          }
        },
        {
          id: 'ebpf_code',
          type: 'code_terminal',
          duration: 6.0,
          voiceover: 'El verificador de Linux garantiza matemáticamente que el código eBPF nunca entrará en bucles infinitos ni causará un kernel panic.',
          visual_cue: 'Terminal mostrando programa C en eBPF verificando cabeceras IP',
          props: {
            header: 'CÓDIGO DE KERNEL SEGURO',
            title: 'HOOK DE RED CON XDP',
            filename: 'kernel/filter.bpf.c',
            codeLines: [
              'SEC("xdp")',
              'int filter_packets(struct xdp_md *ctx) {',
              '  void *data = (void *)(long)ctx->data;',
              '  void *data_end = (void *)(long)ctx->data_end;',
              '  // Verificación estricta de límites por el kernel',
              '  if (data + sizeof(struct ethhdr) > data_end) return XDP_PASS;',
              '  return XDP_DROP; // Bloqueo a velocidad de silicio',
              '}'
            ],
            cursorLine: 7
          }
        },
        {
          id: 'cta_ebpf',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Diseño arquitecturas de observabilidad y seguridad de bajo impacto en infraestructura Linux. Contáctame en el link de la bio.',
          visual_cue: 'Cierre con consultoría de infraestructura y sistemas',
          props: {
            header: 'CONSULTORÍA DE INFRAESTRUCTURA',
            title: 'OBSERVABILIDAD & SEGURIDAD EN LINUX',
            cta: {
              badge: 'INGENIERÍA DE SISTEMAS // SEDEV',
              text: '¿Problemas de rendimiento u observabilidad en Linux? Link en mi perfil para agendar una sesión.'
            }
          }
        }
      ]
    },
    varB: {
      title: 'Muerte a los Sidecars de Kubernetes: Por qué eBPF lo cambia todo',
      tone: 'Contundente, técnico, desmontando el sobrecoste de Envoy y mTLS tradicional',
      scenes: [
        {
          id: 'hook_ebpf_b',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: 'Meter un sidecar proxy en cada contenedor de Kubernetes está destruyendo el rendimiento de tus servidores. eBPF vino a matarlos.',
          visual_cue: 'Gancho cinético contra el abuso de sidecars',
          props: {
            badge: 'KUBERNETES EN 2026',
            lines: [
              { text: 'EL FIN DE LOS', color: '#ef4444' },
              { text: 'SIDECARS EN K8S', color: '#ffffff' }
            ],
            subtitle: 'ELIMINANDO LA SOBRECARGA DE SERVICE MESH',
            icon: 'kernel_shield'
          }
        },
        {
          id: 'sidecar_overhead',
          type: 'tradeoff_matrix',
          duration: 6.0,
          voiceover: 'Cada sidecar de Envoy duplica el uso de memoria y añade saltos TCP locales innecesarios. Cilium con eBPF maneja la red directamente en el kernel.',
          visual_cue: 'Matriz comparando Istio/Envoy vs Cilium eBPF',
          props: {
            header: 'SERVICE MESH OVERHEAD',
            title: 'ENVOY SIDECARS VS CILIUM EBPF',
            colA: 'CILIUM EBPF (KERNEL)',
            colB: 'ISTIO / ENVOY SIDECAR',
            rows: [
              { dim: 'Memoria por Pod', a: '0 MB extra', b: '150-250 MB por pod', aGood: true },
              { dim: 'Saltos TCP en Loopback', a: '0 hops (Socket direct)', b: '4 hops por petición', aGood: true },
              { dim: 'Cifrado mTLS', a: 'WireGuard en Kernel', b: 'mTLS en User Space', aGood: true }
            ]
          }
        },
        {
          id: 'cta_ebpf_b',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Audito la arquitectura de red y el gasto en clústeres de Kubernetes para eliminar fricción y sobrecostes. Enlace directo en mi perfil.',
          visual_cue: 'Cierre con auditoría de infraestructura y clusters',
          props: {
            header: 'AUDITORÍA DE INFRAESTRUCTURA',
            title: 'OPTIMIZA TU CLÚSTER KUBERNETES',
            cta: {
              badge: 'AUDITORÍA DE K8S // SEDEV',
              text: 'Elimina sobrecargas en tus clústeres. Link en mi biografía para agendar tu diagnóstico.'
            }
          }
        }
      ]
    }
  },

  // ----------------------------------------------------
  // TEMA 05: MCP & AGENT HARNESS
  // ----------------------------------------------------
  {
    slug: '05_mcp_agent_harness',
    category: 'AI ENGINEERING & AGENT PROTOCOLS',
    ctaType: 'contratacion_senior',
    varA: {
      title: 'Model Context Protocol (MCP): El estándar universal para IA y código',
      tone: 'Arquitectura de software de vanguardia, estándares abiertos, protocolos',
      scenes: [
        {
          id: 'hook_mcp',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: 'El prompt engineering murió. La verdadera ingeniería de IA en 2026 se llama Model Context Protocol: el estándar que conecta modelos a tus sistemas.',
          visual_cue: 'Gancho cinético sobre el protocolo MCP',
          props: {
            badge: 'INGENIERÍA DE IA 2026',
            lines: [
              { text: 'MODEL CONTEXT', color: '#ffffff' },
              { text: 'PROTOCOL (MCP)', color: '#a855f7' }
            ],
            subtitle: 'EL ESTÁNDAR ABIERTO PARA AGENTES AUTÓNOMOS',
            icon: 'agent_loop'
          }
        },
        {
          id: 'mcp_arch',
          type: 'architecture_flow',
          duration: 6.5,
          voiceover: 'En vez de escribir código ad-hoc para cada modelo, MCP crea una interfaz cliente-servidor donde la IA descubre herramientas y contexto dinámicamente.',
          visual_cue: 'Diagrama de arquitectura MCP: Modelo LLM <-> Cliente MCP <-> Servidores de Herramientas (Postgres, Git, Filesystem)',
          props: {
            header: 'ARQUITECTURA DE PROTOCOLO',
            title: 'DESACOPLAMIENTO DE HERRAMIENTAS',
            nodes: [
              { id: 'llm', label: 'AGENTE / CLIENTE MCP', sublabel: 'Claude Code // Cursor // Custom Runner', color: '#a855f7', y: 160 },
              { id: 'protocol', label: 'PROTOCOLO JSON-RPC 2.0', sublabel: 'Capabilities Negotiation // Tools & Resources', color: '#38bdf8', y: 520 },
              { id: 'servers', label: 'SERVIDORES MCP AISLADOS', sublabel: 'PostgreSQL // GitHub // Terminal Shell', color: '#10b981', y: 880 }
            ]
          }
        },
        {
          id: 'mcp_terminal',
          type: 'code_terminal',
          duration: 6.0,
          voiceover: 'Un servidor MCP expone esquemas en JSON estricto. La IA invoca funciones con tipado seguro y maneja errores sin alucinaciones.',
          visual_cue: 'Terminal mostrando definición de herramienta en servidor MCP con TypeScript',
          props: {
            header: 'ESPECIFICACIÓN DE HERRAMIENTAS',
            title: 'SERVIDOR MCP EN TYPESCRIPT',
            filename: 'mcp/database_server.ts',
            codeLines: [
              'server.setRequestHandler(ListToolsRequestSchema, async () => ({',
              '  tools: [{',
              '    name: "query_database",',
              '    description: "Ejecuta consultas de solo lectura en Postgres",',
              '    inputSchema: zodToJsonSchema(QuerySchema)',
              '  }]',
              '}));'
            ],
            cursorLine: 6
          }
        },
        {
          id: 'cta_mcp',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Diseño e integro agentes autónomos y servidores MCP para flujos empresariales complejos. Si buscas un desarrollador senior para liderar tu proyecto de IA, link en mi bio.',
          visual_cue: 'Cierre con contratación senior backend / IA',
          props: {
            header: 'DESARROLLO SENIOR BACKEND & IA',
            title: 'ARQUITECTURAS AGÉNTICAS A MEDIDA',
            cta: {
              badge: 'STAFF ENGINEER // SEDEV',
              text: '¿Necesitas integrar agentes de IA en tu infraestructura? Hablemos en el enlace de mi perfil.'
            }
          }
        }
      ]
    },
    varB: {
      title: 'El "Prompting" ha muerto: Por qué la industria se mudó a los arneses de IA',
      tone: 'Provocador, técnico, enfocado en el ciclo de ejecución y permisos',
      scenes: [
        {
          id: 'hook_mcp_b',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: 'Hacer prompts gigantescos no te dará software de producción. Lo que importa es el arnés de ejecución y las herramientas que le das al modelo.',
          visual_cue: 'Gancho cinético sobre la muerte del prompt engineering',
          props: {
            badge: 'DEBATES DE INGENIERÍA',
            lines: [
              { text: 'EL PROMPTING', color: '#ef4444' },
              { text: 'HA MUERTO', color: '#ffffff' }
            ],
            subtitle: 'EL PODER ESTÁ EN EL ARNÉS DE EJECUCIÓN',
            icon: 'agent_loop'
          }
        },
        {
          id: 'split_prompt_vs_harness',
          type: 'terminal_split',
          duration: 6.0,
          voiceover: 'Un mal prompt en un buen arnés con tests automáticos gana siempre a un prompt perfecto sin capacidad de ejecución.',
          visual_cue: 'Doble terminal: Vibe Prompting vs Agent Harness con bucle de verificación',
          props: {
            header: 'MÉTODO DE DESARROLLO',
            title: 'PROMPT PURO VS BUCLE DE VERIFICACIÓN',
            termA: {
              title: 'PROMPTING TRADICIONAL',
              color: '#ef4444',
              cmd: 'chat_gpt("escribe un backend completo")',
              status: 'Alucinaciones en imports y dependencias',
              time: 'Fallo silente',
              lines: [
                'Genera 500 líneas de código sin verificar',
                'Usa librerías deprecadas o inexistentes',
                'Cero tests de ejecución'
              ]
            },
            termB: {
              title: 'AGENT HARNESS DETERMINISTA',
              color: '#10b981',
              cmd: 'agent run --verify --strict-sandbox',
              status: 'Ejecuta tests, detecta errores y autocorrige',
              time: '✔ Verificado',
              lines: [
                'Llama a servidor MCP para validar esquema de DB',
                'Corre suite de tests unitarios antes de commitear',
                'Feedback loop determinista en tiempo real'
              ]
            }
          }
        },
        {
          id: 'cta_mcp_b',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Construyo arneses de automatización e integraciones complejas para empresas. Si necesitas un ingeniero especializado en flujos de IA, link en mi biografía.',
          visual_cue: 'Cierre con contratación directa senior',
          props: {
            header: 'CONTRATACIÓN SENIOR BACKEND',
            title: 'SISTEMAS AUTÓNOMOS Y AGENTES ROBUSTOS',
            cta: {
              badge: 'LEAD DEVELOPER // SEDEV',
              text: 'Desarrollo de agentes y flujos autónomos de alta fiabilidad. Contáctame en mi biografía.'
            }
          }
        }
      ]
    }
  }
];
