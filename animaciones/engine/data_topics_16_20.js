// Data definitions for Topics 16 to 20 (Zero // AI-slop, Zero SeDev watermarks, Varied Hooks)
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
          id: 'vitals_hook',
          type: 'metrics_comparison',
          duration: 6.5,
          voiceover: '¿Por qué tantas empresas están desmantelando sus micro-frontends para volver a un monorepo unificado? Porque descargar múltiples versiones de frameworks destruyó la velocidad de carga.',
          visual_cue: 'Apertura directa con comparativa de Core Web Vitals: Micro-frontends frente a Monorepo limpio',
          props: {
            header: 'IMPACTO EN CORE WEB VITALS',
            metricA: { label: 'MICRO-FRONTENDS FEDERATION', value: '3.4s LCP', sub: 'Puntaje de Performance: 42/100', color: '#ef4444' },
            metricB: { label: 'MONOREPO UNIFICADO', value: '0.6s LCP', sub: 'Puntaje de Performance: 98/100', color: '#10b981' }
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
              { id: 'app3', label: 'FOOTER MFE (VUE 3)', sub: 'Tercer framework compitiendo en hilo principal', y: 820, color: '#38bdf8', metric: '420ms' }
            ]
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
              badge: 'AUDITORÍA DE RENDIMIENTO WEB (Link en bio)',
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
          id: 'mfe_impact_hook',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: 'Adoptaste micro-frontends porque estaba de moda y ahora tienes un infierno de estilos rotos, dependencias cruzadas y aplicaciones lentas.',
          visual_cue: 'Tipografía de impacto gigante sin iconos genéricos',
          props: {
            layout: 'impact',
            badge: 'LECCIONES DE INDUSTRIA',
            lines: [
              { text: 'DESMANTELANDO LOS', color: '#ef4444' },
              { text: 'MICRO-FRONTENDS', color: '#ffffff' }
            ],
            subtitle: 'El regreso al monorepo limpio con arquitectura de islas'
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
              badge: 'CONSULTORÍA FRONTEND (Contacto en perfil)',
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
          id: 'fork_memory_hook',
          type: 'memory_layout',
          duration: 6.5,
          voiceover: '¿Por qué conectar mil clientes directos a PostgreSQL satura tu servidor aunque no hagan consultas? Porque Postgres crea un proceso independiente de diez megabytes por cada conexión.',
          visual_cue: 'Apertura directa con layout de memoria mostrando backend processes compitiendo por CPU y RAM',
          props: {
            header: 'ARQUITECTURA DE PROCESOS',
            title: 'POSTMASTER Y BACKEND WORKERS',
            items: [
              { name: '1000 CONEXIONES DIRECTAS', addr: '1000 PROCESOS FORK()', value: '10GB RAM consumidos solo en sockets', color: '#ef4444' },
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
              { id: 'clients', label: '10,000 CONEXIONES ACTIVAS', sublabel: 'Servidores web y workers concurrentes', color: '#38bdf8', y: 160 },
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
              badge: 'AUDITORÍA DE DATOS (Link en bio)',
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
          id: 'fatal_pool_hook',
          type: 'terminal_split',
          duration: 6.5,
          voiceover: 'Subiste el tamaño del servidor a una máquina de mil dólares y sigue lento. No necesitas más hardware: necesitas un pooler para evitar saturar conexiones.',
          visual_cue: 'Apertura directa con terminal mostrando error fatal de max_connections frente a PgBouncer',
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
              badge: 'AUDITORÍA TÉCNICA (Link en perfil)',
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
          id: 'bloom_math_hook',
          type: 'memory_layout',
          duration: 6.5,
          voiceover: '¿Cómo saber si un usuario ya leyó un post entre quinientos millones de registros usando solo tres bits de RAM? Con Bloom Filters probabilísticos.',
          visual_cue: 'Apertura directa con array de bits encendiéndose por hashes SHA-256 y Murmur3',
          props: {
            header: 'MECANISMO DE HASHING',
            title: 'ARRAY DE BITS Y CERO FALSOS NEGATIVOS',
            items: [
              { name: 'CLAVE: "user_98412"', addr: '3 FUNCIONES HASH', value: 'Bits calculados: [14, 52, 88]', color: '#38bdf8' },
              { name: 'ARRAY DE BITS EN RAM', addr: 'BIT 52 = 0', value: 'GARANTIZADO: El registro NO existe en disco', color: '#10b981' }
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
              '# Comprueba existencia en RAM sin tocar base de datos principal:',
              'BF.ADD post_views "usr_42:post_991"',
              'BF.EXISTS post_views "usr_42:post_991" -> (integer) 1',
              'BF.EXISTS post_views "usr_88:post_991" -> (integer) 0',
              '# 99% de lecturas a disco descartadas en memoria RAM'
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
            header: 'AUDITORÍA DE CACHÉ Y ALTO RENDIMIENTO',
            title: 'PROTEGE TU BASE DE CONSULTAS INÚTILES',
            cta: {
              badge: 'AUDITORÍA DE CACHÉ (Link en bio)',
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
          id: 'bloom_latency_hook',
          type: 'latency_scale',
          duration: 6.5,
          voiceover: 'Hacer consultas a tu base de datos relacional para comprobar si un registro existe está quemando tu presupuesto. Un filtro Bloom en Redis responde en microsegundos.',
          visual_cue: 'Apertura directa con escala de latencia comparando RAM vs Query SQL',
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
              badge: 'AUDITORÍA DE DATOS (Link en bio)',
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
          id: 'stampede_flow_hook',
          type: 'network_pipeline',
          duration: 6.5,
          voiceover: '¿Qué pasa cuando la caché de tu página más visitada expira justo cuando entran diez mil usuarios a la vez? Tu servidor colapsa por una estampida de peticiones a la base de datos.',
          visual_cue: 'Apertura directa con pipeline visual mostrando la avalancha de peticiones colapsando la base',
          props: {
            header: 'AVALANCHA DE PETICIONES',
            title: 'CACHE MISS SIMULTÁNEO',
            subtitle: '10,000 CONEXIONES ATACANDO LA BASE DE DATOS',
            stages: [
              { id: 'users', label: '10,000 USUARIOS CONCURRENTES', sublabel: 'Petición masiva en el segundo 00:00', y: 220, color: '#ef4444', metric: '10K RPS' },
              { id: 'cdn', label: 'CDN CACHE (EXPIRADA)', sublabel: 'TTL agotado y deja pasar todo el tráfico', y: 520, color: '#fbbf24', metric: 'Stampede' },
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
              '# Sirve respuesta anterior en 5ms y actualiza en background sin bloquear:',
              'reply.header("Cache-Control", ',
              '  "public, max-age=60, stale-while-revalidate=86400, stale-if-error=86400"',
              ');',
              '# Resultado: Cero Cache Stampedes y rendimiento 100% estable'
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
            header: 'AUDITORÍA DE ESCALABILIDAD Y CACHING',
            title: 'RESISTENCIA A PICOS MASIVOS DE TRÁFICO',
            cta: {
              badge: 'AUDITORÍA DE ESCALABILIDAD (Link en bio)',
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
          id: 'metrics_swr_hook',
          type: 'metrics_comparison',
          duration: 6.5,
          voiceover: 'No necesitas pagar un clúster de Redis para que tu web vuele. El encabezado Stale-While-Revalidate en el Edge reduce la carga de base de datos en un noventa y ocho por ciento.',
          visual_cue: 'Apertura directa con métricas de descarga de servidor y latencia TTFB',
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
            header: 'CONSULTORÍA DE ESCALABILIDAD',
            title: 'MÁXIMA VELOCIDAD Y MÍNIMO COSTE DE SERVIDOR',
            cta: {
              badge: 'CONSULTORÍA DE ESCALABILIDAD (Link en perfil)',
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
          id: 'expand_phases_hook',
          type: 'architecture_flow',
          duration: 6.5,
          voiceover: '¿Cómo renombrar una columna en cincuenta millones de filas sin provocar un solo error 500? Nunca lo hagas en un solo paso: usa el patrón Expand & Contract.',
          visual_cue: 'Apertura directa con diagrama de las tres fases del patrón Expand & Contract',
          props: {
            header: 'LAS TRES FASES DEL PATRÓN',
            title: 'TRANSICIÓN SEGURA DE ESQUEMA',
            nodes: [
              { id: 'f1', label: '1. FASE EXPAND', sublabel: 'Añadir columna nueva vacía (Nullable) sin locks', color: '#38bdf8', y: 160 },
              { id: 'f2', label: '2. DOBLE ESCRITURA Y BACKFILL', sublabel: 'La app escribe en ambas columnas y worker migra histórico', color: '#fbbf24', y: 520 },
              { id: 'f3', label: '3. FASE CONTRACT', sublabel: 'La app solo lee la nueva y drop seguro de la columna vieja', color: '#10b981', y: 880 }
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
              '-- 1. Añade columna sin bloquear lectores ni escritores:',
              'ALTER TABLE users ADD COLUMN phone_v2 VARCHAR(32);',
              '-- 2. Backfill en lotes pequeños para no saturar transacciones:',
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
              badge: 'CONSULTORÍA DE DATOS (Link en bio)',
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
          id: 'lock_split_hook',
          type: 'terminal_split',
          duration: 6.5,
          voiceover: 'Hiciste un ALTER TABLE en producción y bloqueaste todas las lecturas y escrituras durante cuarenta minutos. Postgres adquiere un ACCESS EXCLUSIVE lock que frena cada petición.',
          visual_cue: 'Apertura directa con terminal mostrando bloqueo infinito de tabla frente a migración segura con lock_timeout',
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
              badge: 'AUDITORÍA DE MIGRACIONES (Link en bio)',
              text: 'Evita caídas en tus cambios de esquema. Hablemos en el enlace de mi perfil.'
            }
          }
        }
      ]
    }
  }
];
