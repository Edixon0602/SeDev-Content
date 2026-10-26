// Data definitions for Topics 16 to 20 (Zero // AI-slop, Zero SeDev watermarks, Varied Hooks & Layouts)
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
          id: 'dep_tree_hook',
          type: 'tree_hierarchy',
          duration: 6.5,
          voiceover: '¿Por qué tantas empresas están desmantelando sus micro-frontends para volver a un monorepo unificado? Porque descargar múltiples versiones de frameworks destruyó la velocidad de carga.',
          visual_cue: 'Visualizador de árbol de dependencias duplicadas compitiendo en el navegador',
          props: {
            badge: 'FRAGMENTACIÓN DE RUNTIMES',
            title: 'EXPLOSIÓN DE DEPENDENCIAS MFE',
            items: [
              { name: 'App Shell (Host)', level: 0 },
              { name: 'Header MFE (React 18.2)', level: 1 },
              { name: 'Checkout MFE (React 19.0 Duplicado)', level: 1 },
              { name: 'Catalog MFE (Vue 3 en Iframe)', level: 1 }
            ]
          }
        },
        {
          id: 'stepper_consolidation',
          type: 'migration_stepper_viz',
          duration: 6.0,
          voiceover: 'Cada micro-frontend descarga su propio runtime. La solución moderna es consolidar en un monorepo con Turborepo manteniendo aislamiento por paquetes de código.',
          visual_cue: 'Visualizador de fases de consolidación hacia monorepo unificado',
          props: {
            badge: 'CONSOLIDACIÓN ARQUITECTÓNICA',
            title: 'RETORNO AL MONOREPO LIMPIO',
            subtitle: 'TURBOREPO + ARQUITECTURA DE COMPONENTES COMPARTIDOS'
          }
        },
        {
          id: 'cta_mf',
          type: 'terminal_split',
          duration: 5.5,
          voiceover: 'Audito la arquitectura frontend y optimizo Core Web Vitals para aplicaciones complejas. Link en mi perfil para agendar una sesión técnica.',
          visual_cue: 'Terminal con análisis de bundle y llamada a la acción en bio',
          props: {
            header: 'AUDITORÍA FRONTEND (Link en bio)',
            title: 'OPTIMIZACIÓN DE CORE WEB VITALS',
            leftTitle: 'ANÁLISIS DE BUNDLE',
            rightTitle: 'MÉTRICAS CLAVE',
            leftText: '$ npx bundlesize-audit\n✔ Bundle unificado: 180 KB (Gzipped)\n✔ LCP reducido de 3.8s a 0.7s\n✔ Eliminadas 4 versiones duplicadas de React',
            rightText: '• Aumenta la conversión de checkout\n• Cero conflictos de CSS global\n• Despliegues seguros con tipado estricto\n• Agenda sesión: enlace en el perfil'
          }
        }
      ]
    },
    varB: {
      title: 'El desastre de los Micro-frontends: La vuelta al monorepo unificado',
      tone: 'Directo al grano, lecciones de fracaso de Big Tech y simplicidad organizativa',
      scenes: [
        {
          id: 'metrics_bundle_shock',
          type: 'metrics_comparison',
          duration: 6.0,
          voiceover: 'Adoptaste micro-frontends porque estaba de moda y ahora tu usuario tiene que descargar ocho megabytes de JavaScript para ver una simple tienda online.',
          visual_cue: 'Comparativa de peso de bundle: Micro-frontends fragmentados vs Monorepo unificado',
          props: {
            header: 'PESO TOTAL DE JAVASCRIPT',
            metricA: { label: 'MICRO-FRONTENDS FEDERATION', value: '8.4 MB', sub: 'Múltiples runtimes compitiendo en CPU', color: '#ef4444' },
            metricB: { label: 'MONOREPO OPTIMIZADO', value: '320 KB', sub: 'Tree-shaking estricto en un solo bundle', color: '#10b981' }
          }
        },
        {
          id: 'stepper_mfe',
          type: 'migration_stepper_viz',
          duration: 5.5,
          voiceover: 'Los monorepos modernos permiten que múltiples equipos trabajen de forma independiente sin destruir la experiencia del usuario final.',
          visual_cue: 'Visualizador de migración hacia monorepo modular',
          props: {
            badge: 'SIMPLICIDAD ORGANIZATIVA',
            title: 'MIGRACIÓN HACIA MONOREPO',
            subtitle: 'ELIMINA IFRAMES Y REDUCE EL TIEMPO DE CARGA'
          }
        },
        {
          id: 'cta_mf_b',
          type: 'tradeoff_matrix',
          duration: 4.0,
          voiceover: 'Si tu aplicación web está pesada y fragmentada, link en mi perfil para auditarla y devolverle la velocidad.',
          visual_cue: 'Matriz comparativa final y enlace en bio',
          props: {
            header: 'CONSULTORÍA DE RENDIMIENTO',
            title: 'ARQUITECTURAS WEB RÁPIDAS',
            subtitle: 'LINK EN BIO PARA AUDITAR TU APLICACIÓN'
          }
        }
      ]
    }
  },

  // ----------------------------------------------------
  // TEMA 17: CONNECTION POOLING & PGBOUNCER
  // ----------------------------------------------------
  {
    slug: '17_connection_pooling_pgbouncer',
    category: 'BASES DE DATOS & ESCALABILIDAD',
    ctaType: 'optimizacion_db',
    varA: {
      title: 'El costo de un fork() en Linux: Cómo 1000 conexiones matan a Postgres',
      tone: 'Bajo nivel, llamadas al sistema de Linux, internals de procesos de Postgres',
      scenes: [
        {
          id: 'conn_pool_hook',
          type: 'connection_pool_viz',
          duration: 6.5,
          voiceover: 'Cada vez que tu backend abre una conexión nueva a PostgreSQL, el kernel de Linux ejecuta un fork de diez megabytes. Con mil clientes, tu servidor colapsa por memoria.',
          visual_cue: 'Visualizador de 1.000 streams de clientes entrando a PgBouncer y multiplexándose en 20 workers',
          props: {
            badge: 'MULTIPLEXACIÓN DE CLIENTES',
            title: 'EL COSTE DE UN FORK() EN LINUX',
            subtitle: '1.000 CONEXIONES ENTRANTES => 20 BACKEND PROCESSES'
          }
        },
        {
          id: 'latency_fork',
          type: 'latency_scale',
          duration: 6.0,
          voiceover: 'El proceso de crear una conexión toma quince milisegundos de handshake y context switching. Con PgBouncer, la conexión ya está viva y responde en microsegundos.',
          visual_cue: 'Escala de latencia comparando tiempo de creación de proceso fork vs pool de conexiones',
          props: {
            header: 'TIEMPO DE ESTABLECIMIENTO DE CONEXIÓN',
            title: 'FORK EN LINUX VS POOL REUTILIZADO',
            subtitle: 'HANDSHAKE COMPLETO VS TRANSACCIÓN DIRECTA'
          }
        },
        {
          id: 'cta_pgbouncer',
          type: 'terminal_split',
          duration: 5.5,
          voiceover: 'Configuro clústeres de PgBouncer y optimizo la concurrencia de bases de datos para soportar alto tráfico. Link en mi perfil para agendar una auditoría técnica.',
          visual_cue: 'Terminal mostrando pgbench con saturación neutralizada y llamada a la acción en bio',
          props: {
            header: 'AUDITORÍA DE BASES DE DATOS (Link en bio)',
            title: 'CONCURRENCIA SIN SOBRECARGA',
            leftTitle: 'BENCHMARK PGBENCH',
            rightTitle: 'MÉTRICAS CLAVE',
            leftText: '$ pgbench -c 1000 -j 8 -T 10 app_db\n✔ Clientes concurrentes: 1.000 activos\n✔ Throughput: 18.400 TPS\n✔ Uso de RAM en Postgres: 210 MB estables',
            rightText: '• Reduce el 95% del uso de memoria en DB\n• Elimina errores de "too many clients"\n• Soporta picos masivos de tráfico\n• ¿Dudas con Postgres? Enlace en mi bio'
          }
        }
      ]
    },
    varB: {
      title: 'Tu base de datos no está lenta, estás saturando el pool de conexiones',
      tone: 'Provocador, directo, salvando bases de datos de startups',
      scenes: [
        {
          id: 'pool_collapse_hook',
          type: 'connection_pool_viz',
          duration: 6.0,
          voiceover: 'Tu backend en Node o Serverless abre conexiones a lo loco y cuando sube el tráfico tu base de datos se congela. El problema no son tus queries, es la saturación de conexiones.',
          visual_cue: 'Visualizador de PgBouncer absorbiendo la sobrecarga de conexiones',
          props: {
            badge: 'ERROR COMÚN DE ESCALABILIDAD',
            title: 'SATURACIÓN DE POOL EN SERVERLESS',
            subtitle: 'PGBOUNCER NEUTRALIZANDO PICOS DE TRÁFICO'
          }
        },
        {
          id: 'metrics_pool',
          type: 'metrics_comparison',
          duration: 5.5,
          voiceover: 'Un servidor de base de datos con cuatro núcleos solo puede ejecutar cuatro queries simultáneamente en CPU. Tener quinientas conexiones abiertas solo causa contención.',
          visual_cue: 'Comparativa de memoria consumida: 10 GB sin pool vs 200 MB con PgBouncer',
          props: {
            header: 'MEMORIA DESPERDICIADA EN CONEXIONES',
            metricA: { label: 'CONEXIONES DIRECTAS (1.000)', value: '10.2 GB RAM', sub: 'Sobrecarga de procesos en el kernel', color: '#ef4444' },
            metricB: { label: 'CON PGBOUNCER (20 WORKERS)', value: '240 MB RAM', sub: 'Pool transaccional ultra eficiente', color: '#10b981' }
          }
        }
      ]
    }
  },

  // ----------------------------------------------------
  // TEMA 18: BLOOM FILTERS PROBABILÍSTICOS
  // ----------------------------------------------------
  {
    slug: '18_bloom_filters_probabilistic',
    category: 'ESTRUCTURAS DE DATOS PROBABILÍSTICAS',
    ctaType: 'optimizacion_data',
    varA: {
      title: 'Bloom Filters: Cómo saber si un registro existe con 99% de certeza',
      tone: 'Matemático, algoritmos probabilísticos, ahorro de lecturas en disco',
      scenes: [
        {
          id: 'bloom_lead',
          type: 'cache_flow_viz',
          duration: 6.5,
          voiceover: '¿Cómo saber si un nombre de usuario ya está registrado entre quinientos millones de registros sin tocar el disco? Usando un filtro de Bloom en memoria.',
          visual_cue: 'Visualizador de array de bits de Bloom Filter iluminando posiciones de hash',
          props: {
            mode: 'bloom',
            badge: 'ESTRUCTURA PROBABILÍSTICA',
            title: 'FILTRO DE BLOOM EN MEMORIA',
            subtitle: '3 FUNCIONES HASH ILUMINANDO UN ARRAY DE BITS'
          }
        },
        {
          id: 'redis_code_bloom',
          type: 'code_terminal',
          duration: 5.5,
          voiceover: 'La clave pasa por tres funciones hash que encienden bits en un vector binario. Si algún bit es cero, sabemos con certeza absoluta que el dato no existe.',
          visual_cue: 'Terminal ejecutando comandos BF.ADD y BF.EXISTS en Redis',
          props: {
            header: 'COMANDOS DE BLOOM EN REDIS',
            title: 'VERIFICACIÓN EN TIEMPO O(1)',
            filename: 'bloom_check.sh',
            codeLines: [
              '# Reservar filtro con 0.1% de error:',
              'BF.RESERVE usernames 0.001 10000000',
              'BF.ADD usernames "edixon_dev"',
              '',
              '# Comprobación instantánea:',
              'BF.EXISTS usernames "inexistent_user" -> 0 (0ms disco)'
            ],
            cursorLine: 5
          }
        },
        {
          id: 'metrics_bloom',
          type: 'metrics_comparison',
          duration: 5.5,
          voiceover: 'Evitas el noventa y nueve por ciento de las consultas pesadas a la base de datos ahorrando miles de dólares en servidores. Link en bio para optimizaciones.',
          visual_cue: 'Comparativa de lecturas de disco ahorradas gracias al filtro probabilístico',
          props: {
            header: 'CONSULTORÍA EN ALGORITMOS (Link en bio)',
            metricA: { label: 'CONSULTAS SQL A DISCO', value: '45.000 / seg', sub: 'I/O intensivo saturando el SSD', color: '#ef4444' },
            metricB: { label: 'CON FILTRO DE BLOOM', value: '450 / seg', sub: '99% resuelto en nanosegundos en RAM', color: '#10b981' }
          }
        }
      ]
    },
    varB: {
      title: 'Ahorra miles de dólares en queries usando filtros probabilísticos en Redis',
      tone: 'Financiero, optimización de caché, desahogando bases de datos',
      scenes: [
        {
          id: 'bloom_shock_b',
          type: 'cache_flow_viz',
          duration: 6.0,
          voiceover: 'Tu base de datos pasa la mitad del tiempo buscando registros que ni siquiera existen en el sistema. Un filtro de Bloom detiene esas consultas en memoria.',
          visual_cue: 'Visualizador del veredicto instantáneo de Bloom evitando consultas a disco',
          props: {
            mode: 'bloom',
            badge: 'ZERO DISK I/O',
            title: 'FILTRO PROBABILÍSTICO EN REDIS',
            subtitle: 'DETIENE CONSULTAS INÚTILES ANTES DE TOCAR POSTGRES'
          }
        },
        {
          id: 'terminal_bloom_b',
          type: 'terminal_split',
          duration: 5.5,
          voiceover: 'Por solo unos megabytes de memoria proteges tu clúster principal y garantizas respuestas en microsegundos. Link en bio para auditar tu caché.',
          visual_cue: 'Terminal mostrando benchmark de Bloom Filter y llamada a la acción en bio',
          props: {
            header: 'AUDITORÍA DE INFRAESTRUCTURA (Link en bio)',
            title: 'PROTECCIÓN DE BASE DE DATOS',
            leftTitle: 'BENCHMARK DE CACHÉ',
            rightTitle: 'BENEFICIOS CLAVE',
            leftText: '$ redis-benchmark -t bf.exists -q\n✔ Throughput: 124.000 ops/sec\n✔ Latencia media: 0.08 ms\n✔ 99.2% de lecturas a disco evitadas',
            rightText: '• Reduce el tamaño de tu clúster de DB\n• Desaparecen los timeouts en picos\n• Estructura ligera de pocos megabytes\n• ¿Evaluamos tu caso? Enlace en mi perfil'
          }
        }
      ]
    }
  },

  // ----------------------------------------------------
  // TEMA 19: STALE-WHILE-REVALIDATE & CACHE STAMPEDE
  // ----------------------------------------------------
  {
    slug: '19_cache_stale_while_revalidate',
    category: 'SISTEMAS DE CACHÉ & ALTA DISPONIBILIDAD',
    ctaType: 'optimizacion_backend',
    varA: {
      title: 'Anatomía de un Cache Stampede y cómo el encabezado SWR lo neutraliza',
      tone: 'Alta concurrencia, resiliencia de sistemas, caching distribuido',
      scenes: [
        {
          id: 'swr_flow_lead',
          type: 'cache_flow_viz',
          duration: 6.5,
          voiceover: 'Cuando la clave de caché de tu producto más vendido expira, diez mil peticiones simultáneas golpean la base de datos al mismo tiempo: eso es un Cache Stampede.',
          visual_cue: 'Visualizador del ciclo de vida SWR y neutralización del Cache Stampede',
          props: {
            mode: 'swr',
            badge: 'RESILIENCIA EN ALTA ESCALA',
            title: 'CICLO STALE-WHILE-REVALIDATE',
            subtitle: 'RESPUESTAS EN 2 MS MIENTRAS UN WORKER REVALIDA DE FONDO'
          }
        },
        {
          id: 'pipeline_swr',
          type: 'network_pipeline',
          duration: 5.5,
          voiceover: 'Con el encabezado Stale-While-Revalidate, el primer usuario recibe el dato viejo en dos milisegundos mientras un proceso en segundo plano actualiza el valor sin bloquear a nadie.',
          visual_cue: 'Tubería de red mostrando cómo los clientes reciben datos de caché sin esperar por la base de datos',
          props: {
            header: 'FLUJO DE PETICIONES HTTP',
            title: 'RESPUESTA INMEDIATA DESDE EL EDGE',
            latency: '2.1 ms',
            stages: [
              { name: 'Edge Cache Hit', tag: 'Stale data servido' },
              { name: 'Background Lock', tag: '1 sola query a DB' },
              { name: 'Atomic Cache Swap', tag: 'Nuevo valor disponible' }
            ]
          }
        },
        {
          id: 'cta_swr',
          type: 'terminal_split',
          duration: 5.5,
          voiceover: 'Diseño arquitecturas de caché resilientes para evitar caídas en eventos de alto tráfico. Link en mi perfil para auditar tu sistema.',
          visual_cue: 'Terminal mostrando cabeceras HTTP de SWR y llamada a la acción en bio',
          props: {
            header: 'CONSULTORÍA EN CACHÉ (Link en bio)',
            title: 'ALTA DISPONIBILIDAD GARANTIZADA',
            leftTitle: 'CABECERA HTTP DE RESPUESTA',
            rightTitle: 'IMPACTO EN PRODUCCIÓN',
            leftText: 'HTTP/2 200 OK\ncache-control: max-age=60, stale-while-revalidate=300\nx-cache-status: STALE (Background refreshed)\n✔ Tiempo de respuesta: 1.8 ms',
            rightText: '• Cero caídas por expiración de caché\n• 100% de peticiones en < 5ms\n• Base de datos protegida ante avalanchas\n• Contacto para auditoría: link en bio'
          }
        }
      ]
    },
    varB: {
      title: 'Cómo servir respuestas en 5 milisegundos sin servir datos desactualizados',
      tone: 'Directo al grano, trucos de arquitectura de alto nivel, rendimiento web',
      scenes: [
        {
          id: 'swr_shock_b',
          type: 'cache_flow_viz',
          duration: 6.0,
          voiceover: 'Creer que una caché rápida siempre devuelve datos viejos es un error. Con la técnica adecuada entregas contenido en dos milisegundos y mantienes los datos frescos.',
          visual_cue: 'Visualizador del reemplazo atómico de datos en caché',
          props: {
            mode: 'swr',
            badge: 'LATENCIA HUMANA CERO',
            title: 'FRESCURA ATÓMICA EN MEMORIA',
            subtitle: 'SERVIDO DESDE EDGE/RAM SIN BLOQUEOS'
          }
        },
        {
          id: 'terminal_swr_b',
          type: 'terminal_split',
          duration: 5.5,
          voiceover: 'Aprovecha las capacidades nativas de HTTP y CDNs modernas sin meter capas complejas de software. Link en mi perfil para asesoría técnica.',
          visual_cue: 'Terminal comparando latencia con SWR y llamada a la acción en bio',
          props: {
            header: 'OPTIMIZACIÓN WEB (Link en bio)',
            title: 'RESPUESTAS ULTRARRÁPIDAS',
            leftTitle: 'CONSULTA TRADICIONAL',
            rightTitle: 'ARQUITECTURA SWR',
            leftText: 'Latencia: 340 ms (Consulta a disco)\nCPU del servidor: 78%\nBloqueo ante expiración de clave',
            rightText: 'Latencia: 2.1 ms (Edge Cache)\nCPU del servidor: 2%\nRevalidación atómica sin interrupción'
          }
        }
      ]
    }
  },

  // ----------------------------------------------------
  // TEMA 20: MIGRACIONES ZERO-DOWNTIME
  // ----------------------------------------------------
  {
    slug: '20_migraciones_zero_downtime',
    category: 'BASES DE DATOS & OPERACIONES EN VIVO',
    ctaType: 'auditoria_db',
    varA: {
      title: 'El Patrón Expand & Contract: Modificar esquemas masivos con 0s downtime',
      tone: 'Ingeniería de datos en producción, cero tolerancia a caídas, patrones de diseño',
      scenes: [
        {
          id: 'stepper_expand_contract',
          type: 'migration_stepper_viz',
          duration: 6.5,
          voiceover: 'Modificar una columna en una tabla con cincuenta millones de filas puede bloquear toda tu aplicación. El patrón Expand and Contract elimina el riesgo por completo.',
          visual_cue: 'Visualizador del patrón Expand & Contract con 4 fases progresivas en la tabla users',
          props: {
            badge: 'PATRÓN ARQUITECTÓNICO',
            title: 'EXPAND & CONTRACT',
            subtitle: 'MIGRACIONES EN 4 FASES SIN BLOQUEO DE TABLA'
          }
        },
        {
          id: 'sql_safe_code',
          type: 'code_terminal',
          duration: 5.5,
          voiceover: 'Primero expandes agregando la nueva columna como nullable. Luego tu aplicación escribe en ambas columnas simultáneamente mientras un worker migra el histórico.',
          visual_cue: 'Terminal mostrando las sentencias SQL seguras y el dual-write en código',
          props: {
            header: 'SQL SEGURO EN PRODUCCIÓN',
            title: 'MIGRACIÓN SIN BLOQUEOS EXCLUSIVOS',
            filename: 'migrations/004_split_names.sql',
            codeLines: [
              '-- 1. EXPAND: Nueva columna nullable sin lock exclusivo',
              'ALTER TABLE users ADD COLUMN first_name VARCHAR(128);',
              '',
              '-- 2. DUAL WRITE en la aplicación:',
              '-- users.save({ full_name, first_name, last_name });'
            ],
            cursorLine: 4
          }
        },
        {
          id: 'cta_migrations',
          type: 'tradeoff_matrix',
          duration: 5.5,
          voiceover: 'Finalmente contraes eliminando la columna antigua. Cero segundos de caída y rollback instantáneo garantizado. Link en bio para planificar migraciones críticas.',
          visual_cue: 'Matriz comparativa entre ALTER TABLE directo vs Expand & Contract y llamada a la acción en bio',
          props: {
            header: 'CONSULTORÍA EN BASES DE DATOS (Link en bio)',
            title: 'MIGRACIONES SEGURAS EN PRODUCCIÓN',
            colA: 'EXPAND & CONTRACT',
            colB: 'ALTER TABLE DIRECTO',
            rows: [
              { dim: 'Bloqueo exclusivo de tabla', a: '0 segundos (Sin locks)', b: 'Minutos u horas de bloqueo', aGood: true },
              { dim: 'Capacidad de Rollback', a: 'Instantáneo sin drama', b: 'Destructivo y arriesgado', aGood: true },
              { dim: 'Disponibilidad de servicio', a: '100% de uptime en vivo', b: 'Caída de servicio garantizada', aGood: true }
            ]
          }
        }
      ]
    },
    varB: {
      title: 'Nunca hagas ALTER TABLE a ciegas: Cómo evitar bloqueos de tabla',
      tone: 'Advertencia técnica, historias de terror en producción, lecciones reales',
      scenes: [
        {
          id: 'stepper_disaster_avoid',
          type: 'migration_stepper_viz',
          duration: 6.0,
          voiceover: 'Un simple ALTER TABLE adquiere un bloqueo exclusivo en PostgreSQL que encola todas las lecturas y escrituras, tirando tus servidores en segundos.',
          visual_cue: 'Visualizador de prevención de bloqueos mediante fases progresivas',
          props: {
            badge: 'ERROR FATAL EN PRODUCCIÓN',
            title: 'EVITANDO BLOQUEOS EXCLUSIVOS',
            subtitle: 'ALTER TABLE A CIEGAS = CAÍDA TOTAL DEL SERVICIO'
          }
        },
        {
          id: 'terminal_lock_monitor',
          type: 'terminal_split',
          duration: 5.5,
          voiceover: 'Usa herramientas de migración con algoritmos de tiempo compartido y divide los cambios en fases atómicas. Link en mi perfil para auditar tus esquemas.',
          visual_cue: 'Terminal monitoreando bloqueos en pg_stat_activity y llamada a la acción en bio',
          props: {
            header: 'AUDITORÍA DE BASE DE DATOS (Link en bio)',
            title: 'MONITOREO DE LOCKS EN TIEMPO REAL',
            leftTitle: 'PG_STAT_ACTIVITY',
            rightTitle: 'BUENAS PRÁCTICAS',
            leftText: '$ psql -c "SELECT pid, locktype, mode, granted FROM pg_locks;"\n✔ AccessExclusiveLock evitado con éxito\n✔ Cola de peticiones: 0 bloqueadas\n✔ 100% de transacciones fluidas',
            rightText: '• Nunca agregues columnas con DEFAULT sin NOT NULL\n• Usa CREATE INDEX CONCURRENTLY\n• Migra datos históricos en lotes controlados\n• Asesoría técnica: enlace en mi bio'
          }
        }
      ]
    }
  }
];
