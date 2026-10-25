// Data definitions for Topics 16 to 20
module.exports = [
  // ----------------------------------------------------
  // TEMA 16: FRACASO MICRO-FRONTENDS
  // ----------------------------------------------------
  {
    slug: '16_fracaso_microfrontends',
    category: 'FRONTEND ARCHITECTURE & WEB PERFORMANCE',
    ctaType: 'arquitectura_frontend',
    varA: {
      title: 'La sobrecarga del bundle: Por qué Module Federation degradó la web',
      tone: 'Análisis técnico de rendimiento web, parseo de JavaScript, waterfalls de red',
      scenes: [
        {
          id: 'hook_mf',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: '¿Por qué tantas empresas están desmantelando sus micro-frontends para volver a un monorepo unificado? Por el brutal impacto en el rendimiento.',
          visual_cue: 'Gancho cinético sobre el colapso del rendimiento por micro-frontends',
          props: {
            badge: 'ARQUITECTURA WEB 2026',
            lines: [
              { text: 'EL FRACASO DE LOS', color: '#ffffff' },
              { text: 'MICRO-FRONTENDS', color: '#ef4444' }
            ],
            subtitle: 'SOBRECARGA DE BUNDLE // WATERFALLS DE RED',
            icon: 'terminal'
          }
        },
        {
          id: 'bundle_waterfall',
          type: 'network_pipeline',
          duration: 6.5,
          voiceover: 'Cada micro-frontend descarga su propia copia de librerías, provocando descargas de múltiples versiones de React y waterfalls de red inmanejables.',
          visual_cue: 'Pipeline visual mostrando la cascada de scripts y dependencias duplicadas',
          props: {
            header: 'WATERFALL DE DESCARGA',
            title: 'FRAGMENTACIÓN DE DEPENDENCIAS',
            subtitle: 'TRIPLE CARGA DE FRAMEWORKS EN EL NAVEGADOR',
            stages: [
              { id: 'app1', label: 'HEADER MFE (REACT 18.2)', sub: 'Descarga 140KB de runtime inicial', y: 220, color: '#ef4444', metric: '180ms' },
              { id: 'app2', label: 'CHECKOUT MFE (REACT 19.0)', sub: 'Descarga 160KB duplicados por conflicto', y: 520, color: '#fbbf24', metric: '290ms' },
              { id: 'app3', label: 'FOOTER MFE (VUE 3)', sub: 'Tercer framework compitiendo por hilo principal', y: 820, color: '#38bdf8', metric: '420ms' }
            ]
          }
        },
        {
          id: 'metrics_perf',
          type: 'metrics_comparison',
          duration: 6.0,
          voiceover: 'El navegador pasa más tiempo parseando JavaScript redundante que renderizando contenido, destruyendo las métricas de Core Web Vitals.',
          visual_cue: 'Comparativa de Core Web Vitals: Micro-frontends vs Monorepo limpio',
          props: {
            header: 'IMPACTO EN CORE WEB VITALS',
            metricA: { label: 'MICRO-FRONTENDS FEDERATION', value: '3.4s LCP', sub: 'Puntaje de Performance: 42/100', color: '#ef4444' },
            metricB: { label: 'MONOREPO UNIFICADO', value: '0.6s LCP', sub: 'Puntaje de Performance: 98/100', color: '#10b981' }
          }
        },
        {
          id: 'cta_mf',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Audito la arquitectura frontend y optimizo Core Web Vitals para aplicaciones complejas. Link en mi perfil para agendar una sesión técnica.',
          visual_cue: 'Cierre con llamado a auditoría de arquitectura frontend',
          props: {
            header: 'AUDITORÍA DE ARQUITECTURA FRONTEND',
            title: 'RECUPERA LA VELOCIDAD DE TU APLICACIÓN',
            cta: {
              badge: 'AUDITORÍA DE RENDIMIENTO WEB // SEDEV',
              text: '¿Tu aplicación web está pesada y fragmentada? Link en mi perfil para auditarla.'
            }
          }
        }
      ]
    },
    varB: {
      title: 'El desastre de los Micro-frontends: La vuelta al monorepo unificado',
      tone: 'Directo al grano, lecciones de fracaso de Big Tech y simplicidad organizativa',
      scenes: [
        {
          id: 'hook_mf_b',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: 'Adoptaste micro-frontends porque un artículo de Medium dijo que era lo moderno y ahora tienes un infierno de estilos rotos y dependencias cruzadas.',
          visual_cue: 'Gancho cinético sobre el arrepentimiento de micro-frontends',
          props: {
            badge: 'LECCIONES DE INDUSTRIA',
            lines: [
              { text: 'DESMANTELANDO LOS', color: '#ef4444' },
              { text: 'MICRO-FRONTENDS', color: '#ffffff' }
            ],
            subtitle: 'EL REGRESO AL MONOREPO LIMPIO CON ISLANDS',
            icon: 'terminal'
          }
        },
        {
          id: 'tradeoff_mfe',
          type: 'tradeoff_matrix',
          duration: 6.0,
          voiceover: 'Los monorepos modernos con herramientas como Turborepo o Nx permiten que múltiples equipos trabajen sin destruir la experiencia del usuario final.',
          visual_cue: 'Matriz comparativa Micro-frontends vs Monorepo moderno',
          props: {
            header: 'ORGANIZACIÓN VS EXPERIENCIA DE USUARIO',
            title: 'MICRO-FRONTENDS VS MONOREPO MODERNO',
            colA: 'MONOREPO CON TURBOREPO',
            colB: 'MICRO-FRONTENDS (IFRAMES/MFE)',
            rows: [
              { dim: 'Experiencia de Usuario (LCP)', a: '✔ Rápida y unificada', b: '✖ Lenta y fragmentada', aGood: true },
              { dim: 'Consistencia de Diseño (CSS)', a: '✔ Sistema de diseño único', b: '✖ Conflictos de estilos globales', aGood: true },
              { dim: 'Mantenimiento de Dependencias', a: '✔ 1 solo lockfile auditado', b: '✖ 8 package.json desfasados', aGood: true }
            ]
          }
        },
        {
          id: 'cta_mf_b',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Ayudo a empresas a consolidar arquitecturas frontend fragmentadas en monorepos de alto rendimiento. Escríbeme o agenda en mi perfil.',
          visual_cue: 'Cierre con auditoría de arquitectura frontend',
          props: {
            header: 'CONSOLIDACIÓN DE CODEBASE FRONTEND',
            title: 'SIMPLIFICA TUS PROCESOS DE ENTREGA',
            cta: {
              badge: 'CONSULTORÍA FRONTEND // SEDEV',
              text: 'Consolida tus micro-frontends en un monorepo limpio. Link en mi perfil.'
            }
          }
        }
      ]
    }
  },

  // ----------------------------------------------------
  // TEMA 17: CONNECTION POOLING PGBOUNCER
  // ----------------------------------------------------
  {
    slug: '17_connection_pooling_pgbouncer',
    category: 'BASES DE DATOS & ESCALABILIDAD',
    ctaType: 'database',
    varA: {
      title: 'El costo de un fork() en Linux: Cómo 1000 conexiones matan a Postgres',
      tone: 'Sistemas operativos, arquitectura interna de PostgreSQL, forks y memoria',
      scenes: [
        {
          id: 'hook_pgb',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: '¿Por qué conectar mil usuarios directos a PostgreSQL satura tu servidor aunque no estén haciendo ninguna consulta? Por el costo de los procesos de Linux.',
          visual_cue: 'Gancho cinético sobre saturación de procesos en Postgres',
          props: {
            badge: 'POSTGRESQL INTERNALS',
            lines: [
              { text: 'EL COSTE DE UN FORK()', color: '#ffffff' },
              { text: 'EN POSTGRESQL', color: '#38bdf8' }
            ],
            subtitle: 'PROCESO POR CONEXIÓN // CONSUMO DE MEMORIA',
            icon: 'database'
          }
        },
        {
          id: 'fork_arch',
          type: 'memory_layout',
          duration: 6.0,
          voiceover: 'Postgres es multi-proceso, no multi-hilo. Cada conexión crea un proceso independiente en Linux que consume hasta diez megabytes de RAM sin hacer nada.',
          visual_cue: 'Layout de memoria mostrando backend processes compitiendo por CPU y RAM',
          props: {
            header: 'ARQUITECTURA DE PROCESOS',
            title: 'POSTMASTER Y BACKEND WORKERS',
            items: [
              { name: '1000 CONEXIONES DIRECTAS', addr: '1000 PROCESOS FORK()', value: '10GB RAM solo en estructuras de conexión', color: '#ef4444' },
              { name: 'CAMBIO DE CONTEXTO EN KERNEL', addr: 'CONTEXT SWITCH OVERHEAD', value: 'La CPU gasta 60% solo cambiando de tarea', color: '#f59e0b' }
            ]
          }
        },
        {
          id: 'pgbouncer_pool',
          type: 'architecture_flow',
          duration: 6.5,
          voiceover: 'PgBouncer actúa como un embudo inteligente. Mantiene solo veinte conexiones reales con la base y atiende a miles de clientes en modo transaccional.',
          visual_cue: 'Diagrama de flujo: 10,000 conexiones de clientes pasando por PgBouncer a 20 conexiones reales de Postgres',
          props: {
            header: 'CONNECTION POOLING EFICIENTE',
            title: 'EMBUDO TRANSACCIONAL CON PGBOUNCER',
            nodes: [
              { id: 'clients', label: '10,000 CONEXIONES ACTIVAS', sublabel: 'Servidores web / Workers concurrentes', color: '#38bdf8', y: 160 },
              { id: 'pooler', label: 'PGBOUNCER (TRANSACTION MODE)', sublabel: 'Multiplexa peticiones en un micro-proceso en C', color: '#fbbf24', y: 520 },
              { id: 'db', label: 'POSTGRES (20 POOL WORKERS)', sublabel: '100% de la CPU dedicada a ejecutar queries reales', color: '#10b981', y: 880 }
            ]
          }
        },
        {
          id: 'cta_pgb',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Si tu base de datos sufre picos de latencia o agota su pool de conexiones en momentos críticos, audito tu infraestructura de datos. Link en mi perfil.',
          visual_cue: 'Cierre con llamado a auditoría de bases de datos',
          props: {
            header: 'AUDITORÍA DE RENDIMIENTO DE BASES DE DATOS',
            title: 'OPTIMIZA TUS POOLS DE CONEXIÓN',
            cta: {
              badge: 'AUDITORÍA DE DATOS // SEDEV',
              text: '¿Problemas con max_connections en Postgres? Link en mi bio para agendar una auditoría técnica.'
            }
          }
        }
      ]
    },
    varB: {
      title: 'Tu base de datos no está lenta, estás saturando el pool de conexiones',
      tone: 'Diagnóstico de emergencia, resolutivo, enfocado en incidentes comunes',
      scenes: [
        {
          id: 'hook_pgb_b',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: 'Subiste el tamaño del servidor de base de datos a una máquina de mil dólares y sigue lenta. El problema no es el hardware: es que no tienes un pooler.',
          visual_cue: 'Gancho cinético sobre diagnósticos erróneos de infraestructura',
          props: {
            badge: 'DIAGNÓSTICO TÉCNICO',
            lines: [
              { text: 'TU BASE DE DATOS', color: '#ffffff' },
              { text: 'NO ESTÁ LENTA', color: '#ef4444' }
            ],
            subtitle: 'ESTÁS SATURANDO EL POOL DE CONEXIONES',
            icon: 'database'
          }
        },
        {
          id: 'split_unpooled_pooled',
          type: 'terminal_split',
          duration: 6.0,
          voiceover: 'Limitar las conexiones de la base de datos a dos veces el número de núcleos de CPU multiplica el throughput por cinco al eliminar la contención de cerraduras.',
          visual_cue: 'Doble terminal: Error fatal de max_connections vs PgBouncer fluido',
          props: {
            header: 'BENCHMARK DE CONEXIONES',
            title: 'CONEXIÓN DIRECTA VS POOLING TRANSACCIONAL',
            termA: {
              title: 'SIN POOLER (MAX_CONNECTIONS = 1000)',
              color: '#ef4444',
              cmd: 'psql -c "SELECT count(*) FROM pg_stat_activity;"',
              status: 'FATAL: remaining connection slots are reserved',
              time: 'Caída de servicio',
              lines: [
                'Memoria swap activada en servidor de Postgres',
                'Pérdida de paquetes en cola de sockets',
                'Latencia p99 disparada a 8.2 segundos'
              ]
            },
            termB: {
              title: 'CON PGBOUNCER (POOL_SIZE = 25)',
              color: '#10b981',
              cmd: 'pgbouncer -d /etc/pgbouncer.ini',
              status: '10,000 clientes atendidos sin error',
              time: 'Estable 24/7',
              lines: [
                'Uso de memoria constante y bajo',
                'CPU al 40% ejecutando queries reales',
                'Latencia p99 estable en 4 milisegundos'
              ]
            }
          }
        },
        {
          id: 'cta_pgb_b',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Audito la configuración de PostgreSQL y resuelvo cuellos de botella de concurrencia y latencia p99. Agenda tu revisión en mi bio.',
          visual_cue: 'Cierre con auditoría técnica de Postgres',
          props: {
            header: 'AUDITORÍA DE POSTGRESQL & ESCALABILIDAD',
            title: 'RESOLUCIÓN DE CONGESTIÓN DE CONEXIONES',
            cta: {
              badge: 'AUDITORÍA TÉCNICA // SEDEV',
              text: 'Elimina cuellos de botella en tu base de datos. Enlace directo en mi perfil.'
            }
          }
        }
      ]
    }
  },

  // ----------------------------------------------------
  // TEMA 18: BLOOM FILTERS PROBABILISTIC
  // ----------------------------------------------------
  {
    slug: '18_bloom_filters_probabilistic',
    category: 'ESTRUCTURAS DE DATOS & CACHÉ',
    ctaType: 'database',
    varA: {
      title: 'Bloom Filters: Cómo saber si un registro existe con 99% de certeza',
      tone: 'Algoritmia, funciones hash, estructuras de datos probabilísticas',
      scenes: [
        {
          id: 'hook_bloom',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: '¿Cómo saber si un usuario ya leyó un artículo entre quinientos millones de registros usando solo un par de bits de memoria? Con Bloom Filters.',
          visual_cue: 'Gancho cinético sobre estructuras probabilísticas',
          props: {
            badge: 'ESTRUCTURAS DE DATOS 2026',
            lines: [
              { text: 'BLOOM FILTERS:', color: '#ffffff' },
              { text: 'MAGIA EN BITS', color: '#10b981' }
            ],
            subtitle: 'CONSULTAS PROBABILÍSTICAS EN O(1)',
            icon: 'memory'
          }
        },
        {
          id: 'bloom_math',
          type: 'memory_layout',
          duration: 6.5,
          voiceover: 'Un Bloom Filter aplica múltiples funciones hash a una clave y enciende bits en un array. Si algún bit es cero, el elemento definitivamente no existe.',
          visual_cue: 'Array de bits encendiéndose por hashes SHA-256 / Murmur3',
          props: {
            header: 'MECANISMO DE HASHING',
            title: 'ARRAY DE BITS Y CERO FALSOS NEGATIVOS',
            items: [
              { name: 'CLAVE: "user_98412"', addr: '3 FUNCIONES HASH', value: 'Bits calculados: [14, 52, 88]', color: '#38bdf8' },
              { name: 'ARRAY DE BITS (RAM)', addr: 'BIT 52 = 0', value: '✔ GARANTIZADO: El elemento NO existe en disco', color: '#10b981' }
            ]
          }
        },
        {
          id: 'bloom_code',
          type: 'code_terminal',
          duration: 6.0,
          voiceover: 'Puede tener falsos positivos leves, pero jamás un falso negativo. Esto ahorra millones de lecturas innecesarias al disco en Cassandra y Redis.',
          visual_cue: 'Terminal ejecutando comandos BF.EXISTS en Redis',
          props: {
            header: 'REDIS BLOOM FILTER NATIVO',
            title: 'CONSULTA DE EXISTENCIA EN SUB-MILISEGUNDO',
            filename: 'cache/bloom.sh',
            codeLines: [
              '# Comprueba existencia en RAM sin tocar base de datos principal',
              'BF.ADD post_views "usr_42:post_991"',
              'BF.EXISTS post_views "usr_42:post_991" -> (integer) 1',
              'BF.EXISTS post_views "usr_88:post_991" -> (integer) 0',
              '# Ahorro: 99% de lecturas a base de datos descartadas en RAM'
            ],
            cursorLine: 4
          }
        },
        {
          id: 'cta_bloom',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Diseño arquitecturas de caché y capas probabilísticas para reducir la carga de bases de datos. Link en mi perfil para auditar tu sistema.',
          visual_cue: 'Cierre con llamado a auditoría de caché y performance',
          props: {
            header: 'AUDITORÍA DE CACHÉ & ALTO RENDIMIENTO',
            title: 'PROTEGE TU BASE DE CONSULTAS INÚTILES',
            cta: {
              badge: 'AUDITORÍA DE DATOS & CACHÉ // SEDEV',
              text: '¿Tu base de datos sufre por queries repetitivas? Link en mi perfil para auditar tu caché.'
            }
          }
        }
      ]
    },
    varB: {
      title: 'Ahorra miles de dólares en queries usando filtros probabilísticos en Redis',
      tone: 'Financiero y escalabilidad masiva, eliminando lecturas a disco',
      scenes: [
        {
          id: 'hook_bloom_b',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: 'Hacer consultas a tu base de datos relacional para verificar si un email ya está registrado está quemando tu presupuesto de infraestructura.',
          visual_cue: 'Gancho cinético sobre ahorro de queries repetitivas',
          props: {
            badge: 'AHORRO DE RECURSOS',
            lines: [
              { text: 'AHORRA MILES DE DÓLARES', color: '#10b981' },
              { text: 'CON BLOOM FILTERS', color: '#ffffff' }
            ],
            subtitle: 'ELIMINA EL 95% DE LAS CONSULTAS A DISCO',
            icon: 'database'
          }
        },
        {
          id: 'latency_bloom',
          type: 'latency_scale',
          duration: 6.0,
          voiceover: 'Un filtro de Bloom en Redis responde en microsegundos y consume apenas un megabyte para un millón de registros. Tu base de datos te lo va a agradecer.',
          visual_cue: 'Escala de latencia comparando chequeo en RAM vs Query SQL a disco',
          props: {
            header: 'TIEMPO DE RESPUESTA',
            title: 'FILTRO EN MEMORIA VS BÚSQUEDA EN DISCO',
            subtitle: 'COMPARATIVA DE LATENCIA DE COMPROBACIÓN',
            tiers: [
              { name: 'BLOOM FILTER EN RAM (REDIS)', latency: '0.05 ms', ratio: 0.1, color: '#10b981', human: 'Microsegundos' },
              { name: 'QUERY SQL CON ÍNDICE B-TREE', latency: '4.5 ms', ratio: 0.6, color: '#fbbf24', human: '90x más lento' },
              { name: 'ESCANEO SIN ÍNDICE (TABLE SCAN)', latency: '120 ms', ratio: 1.0, color: '#ef4444', human: 'Colapso de disco' }
            ],
            conclusion: 'Descartas el 99% de las comprobaciones antes de tocar el motor de base de datos.',
            conclusionSub: 'Menos consumo de CPU, menos IOPS y menor factura cloud.'
          }
        },
        {
          id: 'cta_bloom_b',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Audito capas de persistencia y caching para reducir facturas y multiplicar la escala de tu producto. Contáctame en el link de la bio.',
          visual_cue: 'Cierre con auditoría de base de datos y caché',
          props: {
            header: 'AUDITORÍA DE ESCALABILIDAD & COSTES',
            title: 'OPTIMIZACIÓN DE CAPAS DE CACHÉ',
            cta: {
              badge: 'AUDITORÍA DE DATOS // SEDEV',
              text: 'Reduce el estrés de tu base de datos y recorta costes. Agenda tu sesión en mi perfil.'
            }
          }
        }
      ]
    }
  },

  // ----------------------------------------------------
  // TEMA 19: CACHE STALE WHILE REVALIDATE
  // ----------------------------------------------------
  {
    slug: '19_cache_stale_while_revalidate',
    category: 'REDES & ARQUITECTURA DE CACHÉ',
    ctaType: 'arquitectura',
    varA: {
      title: 'Anatomía de un Cache Stampede y cómo el encabezado SWR lo neutraliza',
      tone: 'Análisis de redes, estampidas de caché, micro-caching en CDN',
      scenes: [
        {
          id: 'hook_swr',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: '¿Qué pasa cuando la caché de tu página más visitada expira justo cuando entran diez mil usuarios a la vez? Tu servidor colapsa por Cache Stampede.',
          visual_cue: 'Gancho cinético sobre avalancha de peticiones por expiración de caché',
          props: {
            badge: 'ESCALABILIDAD WEB 2026',
            lines: [
              { text: 'ANATOMÍA DE UN', color: '#ffffff' },
              { text: 'CACHE STAMPEDE', color: '#ef4444' }
            ],
            subtitle: 'CÓMO SWR NEUTRALIZA EL COLAPSO',
            icon: 'network_packet'
          }
        },
        {
          id: 'stampede_flow',
          type: 'network_pipeline',
          duration: 6.5,
          voiceover: 'Todas las peticiones atraviesan la caché vacía e intentan recalcular la misma información en la base de datos simultáneamente tumbando el backend.',
          visual_cue: 'Pipeline visual mostrando la estampida saturando la base de datos sin protección',
          props: {
            header: 'AVALANCHA DE PETICIONES',
            title: 'CACHE MISS SIMULTÁNEO',
            subtitle: '10,000 CONEXIONES ATACANDO LA BASE DE DATOS',
            stages: [
              { id: 'users', label: '10,000 USUARIOS CONCURRENTES', sublabel: 'Petición masiva en el segundo 00:00', y: 220, color: '#ef4444', metric: '10K RPS' },
              { id: 'cdn', label: 'CDN CACHE (EXPIRADA)', sublabel: 'TTL agotado // Deja pasar todo el tráfico', y: 520, color: '#fbbf24', metric: 'Stampede' },
              { id: 'db', label: 'BASE DE DATOS EN COLAPSO', sublabel: '10,000 queries pesadas idénticas a la vez', y: 820, color: '#ef4444', metric: 'CPU 100%' }
            ]
          }
        },
        {
          id: 'swr_solution',
          type: 'code_terminal',
          duration: 6.0,
          voiceover: 'Con Stale-While-Revalidate la CDN entrega el contenido en cinco milisegundos mientras un solo hilo actualiza la caché en segundo plano.',
          visual_cue: 'Terminal configurando encabezado Cache-Control stale-while-revalidate',
          props: {
            header: 'CABECERA HTTP PROTECTORA',
            title: 'STALE-WHILE-REVALIDATE PATTERN',
            filename: 'routes/products.ts',
            codeLines: [
              '// Sirve respuesta vieja en 5ms y actualiza en background sin bloquear',
              'reply.header("Cache-Control", ',
              '  "public, max-age=60, stale-while-revalidate=86400, stale-if-error=86400"',
              ');',
              '// Resultado: Zero Cache Stampedes // Rendimiento 100% plano'
            ],
            cursorLine: 4
          }
        },
        {
          id: 'cta_swr',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Audito la arquitectura de caching y entrega de contenido en CDN para garantizar escalabilidad extrema en picos de tráfico. Enlace en mi bio.',
          visual_cue: 'Cierre con llamado a auditoría de arquitectura y escalabilidad',
          props: {
            header: 'AUDITORÍA DE ESCALABILIDAD & CACHING',
            title: 'RESISTENCIA A PICOS MASIVOS DE TRÁFICO',
            cta: {
              badge: 'AUDITORÍA DE ESCALABILIDAD // SEDEV',
              text: '¿Tu web sufre caídas en picos de tráfico? Link en mi perfil para agendar tu diagnóstico.'
            }
          }
        }
      ]
    },
    varB: {
      title: 'Cómo servir respuestas en 5 milisegundos sin servir datos desactualizados',
      tone: 'Práctico y directo, dominando los encabezados HTTP y el edge',
      scenes: [
        {
          id: 'hook_swr_b',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: 'No necesitas pagar un clúster gigante de Redis para que tu web vuele. Los encabezados HTTP correctos en el Edge hacen todo el trabajo por ti.',
          visual_cue: 'Gancho cinético sobre respuestas ultrarrápidas con HTTP',
          props: {
            badge: 'EDGE CACHING EN 2026',
            lines: [
              { text: 'RESPUESTAS EN 5MS', color: '#10b981' },
              { text: 'SIN REDIS GIGANTE', color: '#ffffff' }
            ],
            subtitle: 'EL PODER DEL ENCABEZADO STALE-WHILE-REVALIDATE',
            icon: 'lightning'
          }
        },
        {
          id: 'metrics_swr',
          type: 'metrics_comparison',
          duration: 6.0,
          voiceover: 'Tus usuarios perciben una velocidad instantánea en cualquier parte del mundo mientras tu servidor de origen apenas recibe peticiones.',
          visual_cue: 'Métricas de descarga y reducción de peticiones al origen',
          props: {
            header: 'DESCARGA DE SERVIDOR DE ORIGEN',
            metricA: { label: 'PETICIONES A BASE DE DATOS', value: '-98.4%', sub: 'Solo una actualización en background por minuto', color: '#10b981' },
            metricB: { label: 'LATENCIA PERCIBIDA (TTFB)', value: '6ms p95', sub: 'Servido directo desde el Edge más cercano', color: '#38bdf8' }
          }
        },
        {
          id: 'cta_swr_b',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Optimizo la capa de borde y distribución de contenido para aplicaciones de alta concurrencia. Contáctame en el link de la bio.',
          visual_cue: 'Cierre con consultoría de escalabilidad',
          props: {
            header: 'CONSULTORÍA DE ESCALABILIDAD & EDGE',
            title: 'MÁXIMA VELOCIDAD // MÍNIMO COSTE DE SERVIDOR',
            cta: {
              badge: 'CONSULTORÍA SENIOR // SEDEV',
              text: 'Haz que tu backend soporte millones de visitas sin pestañear. Hablemos en mi perfil.'
            }
          }
        }
      ]
    }
  },

  // ----------------------------------------------------
  // TEMA 20: MIGRACIONES ZERO DOWNTIME
  // ----------------------------------------------------
  {
    slug: '20_migraciones_zero_downtime',
    category: 'BASES DE DATOS & PRODUCCIÓN CRÍTICA',
    ctaType: 'migracion_critica',
    varA: {
      title: 'El Patrón Expand & Contract: Modificar esquemas masivos con 0s downtime',
      tone: 'Metodología de ingeniería crítica, despliegues paralelos, transiciones seguras',
      scenes: [
        {
          id: 'hook_migration',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: '¿Cómo renombrar una columna en una tabla de cincuenta millones de usuarios con tráfico activo sin provocar un solo error 500? Con Expand & Contract.',
          visual_cue: 'Gancho cinético sobre migraciones críticas sin downtime',
          props: {
            badge: 'INGENIERÍA DE DATOS 2026',
            lines: [
              { text: 'MIGRACIONES CON', color: '#ffffff' },
              { text: 'CERO DOWNTIME', color: '#10b981' }
            ],
            subtitle: 'EL PATRÓN EXPAND & CONTRACT EN 3 FASES',
            icon: 'database'
          }
        },
        {
          id: 'expand_phases',
          type: 'architecture_flow',
          duration: 6.5,
          voiceover: 'Nunca renombres en un solo paso. Fase uno: expandes añadiendo la nueva columna. Fase dos: doble escritura. Fase tres: contraes borrando la vieja.',
          visual_cue: 'Diagrama de flujo mostrando las tres fases del patrón Expand & Contract',
          props: {
            header: 'LAS TRES FASES DEL PATRÓN',
            title: 'TRANSICIÓN SEGURA DE ESQUEMA',
            nodes: [
              { id: 'f1', label: '1. FASE EXPAND', sublabel: 'Añadir columna nueva vacía (Nullable) // Cero locks', color: '#38bdf8', y: 160 },
              { id: 'f2', label: '2. DOBLE ESCRITURA & BACKFILL', sublabel: 'La app escribe en ambas columnas // Worker migra histórico', color: '#fbbf24', y: 520 },
              { id: 'f3', label: '3. FASE CONTRACT', sublabel: 'La app solo lee la nueva // Drop seguro de la columna vieja', color: '#10b981', y: 880 }
            ]
          }
        },
        {
          id: 'migration_sql',
          type: 'code_terminal',
          duration: 6.0,
          voiceover: 'Hacerlo por fases te permite revertir en cualquier instante sin poner en riesgo la disponibilidad del negocio ni corromper datos.',
          visual_cue: 'Terminal mostrando script seguro de migración con pg_repack / gh-ost',
          props: {
            header: 'MIGRACIÓN CON CONTROL DE BLOQUEOS',
            title: 'CERO EXCLUSIVE LOCKS EN TABLA',
            filename: 'db/migrations/20261025_safe_column.sql',
            codeLines: [
              '-- 1. Añade columna sin bloquear lectores ni escritores',
              'ALTER TABLE users ADD COLUMN phone_v2 VARCHAR(32);',
              '-- 2. Backfill en lotes pequeños para no saturar transacciones',
              'UPDATE users SET phone_v2 = phone WHERE id BETWEEN $1 AND $2;',
              '-- 3. Deploy de código con lectura de phone_v2'
            ],
            cursorLine: 4
          }
        },
        {
          id: 'cta_migration',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Asesoro y acompaño a equipos en migraciones críticas de base de datos sin tiempo de inactividad. Agenda una sesión técnica en mi perfil.',
          visual_cue: 'Cierre con consultoría de migración crítica',
          props: {
            header: 'CONSULTORÍA DE MIGRACIONES CRÍTICAS',
            title: 'CAMBIOS DE ESQUEMA SIN TIEMPO DE CAÍDA',
            cta: {
              badge: 'CONSULTORÍA DE DATOS // SEDEV',
              text: '¿Planeas una migración compleja de base de datos? Link en mi perfil para acompañar a tu equipo.'
            }
          }
        }
      ]
    },
    varB: {
      title: 'Nunca hagas ALTER TABLE a ciegas: Cómo evitar bloqueos de tabla',
      tone: 'Alerta técnica, advertencia de producción, desmitificando bloqueos de Postgres',
      scenes: [
        {
          id: 'hook_migration_b',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: 'Hiciste un ALTER TABLE agregando un valor por defecto en producción y bloqueaste todas las lecturas y escrituras durante cuarenta minutos.',
          visual_cue: 'Gancho cinético sobre el terror del bloqueo de tabla',
          props: {
            badge: 'ERRORES FATALES EN DB',
            lines: [
              { text: 'NUNCA HAGAS ALTER TABLE', color: '#ef4444' },
              { text: 'A CIEGAS EN PRODUCCIÓN', color: '#ffffff' }
            ],
            subtitle: 'BLOQUEOS EXCLUSIVOS // HORRORES DE BASE DE DATOS',
            icon: 'database'
          }
        },
        {
          id: 'lock_split',
          type: 'terminal_split',
          duration: 6.0,
          voiceover: 'Postgres adquiere un bloqueo ACCESS EXCLUSIVE que frena cada petición detrás de él. Usa lock_timeout para que tu base de datos nunca se congele.',
          visual_cue: 'Doble terminal: Bloqueo infinito de tabla vs Migración segura con lock_timeout',
          props: {
            header: 'MECANISMO DE BLOQUEO DE POSTGRES',
            title: 'ACCESS EXCLUSIVE LOCK VS LOCK TIMEOUT',
            termA: {
              title: 'MIGRACIÓN SIN TIMEOUT',
              color: '#ef4444',
              cmd: 'ALTER TABLE orders ADD COLUMN status_code INT;',
              status: 'Esperando lock indefinidamente',
              time: 'Incidencia P1',
              lines: [
                'Todas las queries entrantes se encolan detrás del ALTER',
                'Pool de conexiones saturado al 100%',
                'La aplicación completa deja de responder a usuarios'
              ]
            },
            termB: {
              title: 'MIGRACIÓN CON DEFENSA',
              color: '#10b981',
              cmd: 'SET lock_timeout = "2s"; ALTER TABLE orders ...',
              status: 'Si no adquiere el lock en 2s, aborta limpiamente',
              time: 'Zero caída',
              lines: [
                'Reintenta con backoff en momentos de menor concurrencia',
                'Los usuarios nunca notan degradación del servicio',
                'Garantía total de disponibilidad'
              ]
            }
          }
        },
        {
          id: 'cta_migration_b',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Audito planes de migración de datos y acompaño a startups en cambios estructurales de base de datos sin riesgo. Contáctame en el link de la bio.',
          visual_cue: 'Cierre con consultoría de migración de bases de datos',
          props: {
            header: 'CONSULTORÍA DE MIGRACIONES SEGURAS',
            title: 'PROTEGE TU DISPONIBILIDAD EN PRODUCCIÓN',
            cta: {
              badge: 'AUDITORÍA DE MIGRACIONES // SEDEV',
              text: 'Evita caídas en tus cambios de esquema. Hablemos en el enlace de mi perfil.'
            }
          }
        }
      ]
    }
  }
];
