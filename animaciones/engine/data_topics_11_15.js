// Data definitions for Topics 11 to 15 (Zero // AI-slop, Zero SeDev watermarks, Varied Hooks)
module.exports = [
  // ----------------------------------------------------
  // TEMA 11: MODELOS LOCALES VLLM
  // ----------------------------------------------------
  {
    slug: '11_modelos_locales_vllm',
    category: 'AI INFRASTRUCTURE & OPEN WEIGHTS',
    ctaType: 'ia_privada',
    varA: {
      title: 'Cómo funciona la cuantización a 4 bits: GGUF sin perder inteligencia',
      tone: 'Matemáticas de redes neuronales, cuantización AWQ/GGUF, GPU vRAM',
      scenes: [
        {
          id: 'quant_memory_hook',
          type: 'memory_layout',
          duration: 6.5,
          voiceover: '¿Cómo comprimir un modelo de inteligencia artificial de treinta gigabytes para que corra en tu servidor local? Pasando de coma flotante a enteros de cuatro bits con cuantización.',
          visual_cue: 'Apertura directa con layout de memoria comparando FP16 (2 bytes) vs INT4 (0.5 bytes)',
          props: {
            header: 'REDUCCIÓN DE HUELLA EN VRAM',
            title: 'FP16 VS CUANTIZACIÓN INT4',
            items: [
              { name: 'PESOS ORIGINALES (FP16)', addr: '16 BITS POR PESO', value: 'Requiere 32GB VRAM · Servidor de alto coste', color: '#ef4444' },
              { name: 'PESOS CUANTIZADOS (INT4)', addr: '4 BITS POR PESO', value: 'Solo 8GB VRAM · Corre en hardware estándar', color: '#10b981' }
            ]
          }
        },
        {
          id: 'vllm_speed',
          type: 'code_terminal',
          duration: 6.0,
          voiceover: 'Con motores como vLLM y PagedAttention, el servidor procesa peticiones en lotes continuos multiplicando la velocidad de inferencia.',
          visual_cue: 'Terminal levantando vLLM con modelo cuantizado',
          props: {
            header: 'INFERENCIA DE ALTO RENDIMIENTO',
            title: 'VLLM CON PAGEDATTENTION',
            filename: 'deploy/vllm.sh',
            codeLines: [
              'vllm serve Qwen2.5-Coder-32B-Instruct-AWQ \\',
              '  --gpu-memory-utilization 0.95 \\',
              '  --max-model-len 32768 \\',
              '  --port 8000',
              '# Rendimiento: 120 tokens/s con 40 usuarios concurrentes'
            ],
            cursorLine: 5
          }
        },
        {
          id: 'cta_quant',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Ayudo a empresas a desplegar clústeres de inferencia privada con modelos abiertos para no depender de APIs externas. Contáctame en mi perfil.',
          visual_cue: 'Cierre con consultoría de IA privada',
          props: {
            header: 'CONSULTORÍA DE IA PRIVADA',
            title: 'SOBERANÍA TOTAL DE TUS MODELOS',
            cta: {
              badge: 'INGENIERÍA DE IA (Link en bio)',
              text: '¿Quieres correr modelos locales sin pagar APIs caras? Link en mi bio para agendar una sesión.'
            }
          }
        }
      ]
    },
    varB: {
      title: 'Soberanía de Datos: Corre 100 tokens/s en local sin pagar APIs',
      tone: 'Financiero y privacidad, liberándose de la dependencia de OpenAI',
      scenes: [
        {
          id: 'api_split_hook',
          type: 'terminal_split',
          duration: 6.5,
          voiceover: 'Pagar tokens por cada petición a OpenAI está arruinando tus márgenes y exponiendo los datos privados de tus clientes.',
          visual_cue: 'Apertura directa con terminal comparando coste de API propietaria vs inferencia local',
          props: {
            header: 'ANÁLISIS FINANCIERO',
            title: 'APIS PROPIETARIAS VS HARDWARE PROPIO',
            termA: {
              title: 'APIS PROPIETARIAS EN LA NUBE',
              color: '#ef4444',
              cmd: 'api.openai.com/v1/chat/completions',
              status: 'Factura escalando sin control',
              time: '$6,200/mes',
              lines: [
                'Pagas por cada prompt y cada respuesta',
                'Riesgo de rate limits y caídas imprevistas',
                'Tus datos sensibles viajan a servidores de terceros'
              ]
            },
            termB: {
              title: 'SERVIDOR DE INFERENCIA VLLM',
              color: '#10b981',
              cmd: 'localhost:8000/v1/chat/completions',
              status: 'Tarifa plana de servidor con 2x RTX 4090',
              time: '$320/mes',
              lines: [
                'Inferencia ilimitada las 24 horas del día',
                'Latencia local de 15ms sin salir de tu VPC',
                'Cumplimiento estricto de privacidad GDPR y HIPAA'
              ]
            }
          }
        },
        {
          id: 'cta_quant_b',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Diseño e implemento infraestructura de IA on-premise y clústeres vLLM para empresas. Agenda tu diagnóstico en mi perfil.',
          visual_cue: 'Cierre con consultoría de IA privada',
          props: {
            header: 'CONSULTORÍA DE IA ON-PREMISE',
            title: 'INFRAESTRUCTURA PRIVADA DE INFERENCIA',
            cta: {
              badge: 'CONSULTORÍA DE IA (Contacto en bio)',
              text: 'Recorta costes de API y asegura la privacidad de tus datos. Link en mi perfil.'
            }
          }
        }
      ]
    }
  },

  // ----------------------------------------------------
  // TEMA 12: SSE VS WEBSOCKETS
  // ----------------------------------------------------
  {
    slug: '12_sse_vs_websockets',
    category: 'REDES & PROTOCOLOS WEB',
    ctaType: 'contratacion_senior',
    varA: {
      title: 'Por qué Server-Sent Events es superior a WebSockets en HTTP/2',
      tone: 'Protocolos de red, análisis de sockets, multiplexación HTTP/2',
      scenes: [
        {
          id: 'sse_stream_hook',
          type: 'network_pipeline',
          duration: 6.5,
          voiceover: '¿Por qué toda la industria de IA usa Server-Sent Events en vez de WebSockets para streaming? Porque SSE viaja sobre HTTP estándar con multiplexación nativa.',
          visual_cue: 'Apertura directa con conexión HTTP/2 multiplexando múltiples streams',
          props: {
            header: 'TRANSPORTE DE PROTOCOLO',
            title: 'MULTIPLEXACIÓN HTTP/2 NATIVA',
            subtitle: 'UN SOLO SOCKET TCP PARA CIENTOS DE STREAMS',
            stages: [
              { id: 'client', label: 'BROWSER / EVENTSOURCE', sub: 'Reconexión automática nativa sin código extra', y: 220, color: '#38bdf8', metric: 'Nativo' },
              { id: 'edge', label: 'CLOUDFLARE / NGINX PROXY', sub: 'Manejo de caché y compresión estándar', y: 520, color: '#10b981', metric: 'Zero overhead' },
              { id: 'server', label: 'BACKEND NODE / RUST', sub: 'Content-Type: text/event-stream', y: 820, color: '#06b6d4', metric: 'Simple loop' }
            ]
          }
        },
        {
          id: 'sse_code',
          type: 'code_terminal',
          duration: 6.0,
          voiceover: 'En el navegador no necesitas librerías pesadas. EventSource maneja reconexión automática si el usuario pierde la señal de red.',
          visual_cue: 'Terminal mostrando código limpio de EventSource en cliente y servidor',
          props: {
            header: 'IMPLEMENTACIÓN LIMPIA',
            title: 'CLIENTE NATIVO EVENTSOURCE',
            filename: 'client/stream.ts',
            codeLines: [
              'const es = new EventSource("/api/generate");',
              'es.onmessage = (event) => {',
              '  terminal.append(event.data);',
              '};',
              '# Reconexión automática nativa mediante cabecera Last-Event-ID',
              'es.onerror = () => console.log("Reconectando...");'
            ],
            cursorLine: 4
          }
        },
        {
          id: 'cta_sse',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Diseño arquitecturas backend en tiempo real y streaming de alta concurrencia. Si buscas un desarrollador senior para tu producto, link en mi bio.',
          visual_cue: 'Cierre con contratación senior backend',
          props: {
            header: 'CONTRATACIÓN SENIOR BACKEND',
            title: 'SISTEMAS DISTRIBUIDOS Y TIEMPO REAL',
            cta: {
              badge: 'SENIOR BACKEND ENGINEER (Link en bio)',
              text: '¿Necesitas arquitectura de streaming robusta? Hablemos en el enlace de mi perfil.'
            }
          }
        }
      ]
    },
    varB: {
      title: 'No compliques tu stack: Deja de usar WebSockets para simples streams',
      tone: 'Directo y simplificador, desmontando la necesidad de balanceadores complejos',
      scenes: [
        {
          id: 'ws_tradeoff_hook',
          type: 'tradeoff_matrix',
          duration: 6.5,
          voiceover: 'Usar WebSockets solo para mostrar texto progresivo o notificaciones complica tus balanceadores de carga sin ninguna necesidad técnica real.',
          visual_cue: 'Apertura directa con tabla comparativa de Server-Sent Events frente a WebSockets',
          props: {
            header: 'CRITERIO DE SELECCIÓN',
            title: 'SERVER-SENT EVENTS VS WEBSOCKETS',
            colA: 'SERVER-SENT EVENTS (SSE)',
            colB: 'WEBSOCKETS (WS)',
            rows: [
              { dim: 'Streaming de IA y feeds', a: '✔ Perfecto y nativo', b: '✖ Sobreingeniería', aGood: true },
              { dim: 'Reconexión automática', a: '✔ Manejada por browser', b: '✖ Manual con código JS', aGood: true },
              { dim: 'Compatibilidad con Proxies', a: '✔ HTTP/2 estándar', b: '✖ Requiere Upgrade HTTP', aGood: true },
              { dim: 'Juegos online y Audio full-duplex', a: '✖ Unidireccional', b: '✔ Ideal para bidireccional', aGood: false }
            ]
          }
        },
        {
          id: 'cta_sse_b',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Audito la arquitectura de red de aplicaciones web para simplificar el stack y mejorar la fiabilidad. Agenda en el link de mi perfil.',
          visual_cue: 'Cierre con auditoría de arquitectura',
          props: {
            header: 'AUDITORÍA DE ARQUITECTURA WEB',
            title: 'SIMPLIFICA TUS CONEXIONES DE RED',
            cta: {
              badge: 'AUDITORÍA DE ARQUITECTURA (Link en perfil)',
              text: 'Elimina complejidad innecesaria en tu backend. Link en mi perfil para agendar tu revisión.'
            }
          }
        }
      ]
    }
  },

  // ----------------------------------------------------
  // TEMA 13: BUN VS NODE22
  // ----------------------------------------------------
  {
    slug: '13_bun_vs_node22',
    category: 'JAVASCRIPT RUNTIMES & HERRAMIENTAS',
    ctaType: 'performance_ts',
    varA: {
      title: 'V8 vs JavaScriptCore: Cómo Node 22 contraatacó con TypeScript nativo',
      tone: 'Motores de JS, compilación JIT, syscalls de bajo nivel',
      scenes: [
        {
          id: 'runtime_split_hook',
          type: 'terminal_split',
          duration: 6.5,
          voiceover: '¿Cómo respondió Node.js ante la velocidad de Bun? Con ejecución nativa de TypeScript sin transpiladores externos en Node veintidós.',
          visual_cue: 'Apertura directa con terminal ejecutando TypeScript en ambos entornos sin dependencias',
          props: {
            header: 'EJECUCIÓN DE TYPESCRIPT SIN BUILD',
            title: 'ZERO-COMPILATION TYPESCRIPT RUNNERS',
            termA: {
              title: 'NODE.JS 22 (--experimental-strip-types)',
              color: '#38bdf8',
              cmd: 'node --strip-types server.ts',
              status: 'Elimina tipos en memoria y corre en V8',
              time: '0.12s cold start',
              lines: [
                'Cero dependencias: Ni ts-node ni tsx requeridos',
                'Soporte nativo de módulo de SQLite (node:sqlite)',
                'Test runner nativo integrado con mock engine'
              ]
            },
            termB: {
              title: 'BUN 1.2 (JAVASCRIPTCORE + ZIG)',
              color: '#10b981',
              cmd: 'bun server.ts',
              status: 'Transpila y optimiza a código máquina',
              time: '0.015s cold start',
              lines: [
                'Arranque ultra rápido en 15 milisegundos',
                'Empaqueta a binario ejecutable único',
                'Syscalls de red hiperoptimizadas en Zig'
              ]
            }
          }
        },
        {
          id: 'cta_runtime',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Audito el rendimiento y la configuración de pipelines TypeScript para reducir tiempos de build y despliegue. Link en mi perfil.',
          visual_cue: 'Cierre con auditoría de performance en TypeScript',
          props: {
            header: 'AUDITORÍA DE TOOLING Y PERFORMANCE',
            title: 'OPTIMIZA TU ENTORNO TYPESCRIPT',
            cta: {
              badge: 'AUDITORÍA DE TOOLING (Link en bio)',
              text: '¿Tus builds de TypeScript tardan demasiado? Link en mi perfil para optimizar tu stack.'
            }
          }
        }
      ]
    },
    varB: {
      title: '¿Vale la pena migrar a Bun en producción o Node.js ya cerró la brecha?',
      tone: 'Pragmático de producción, analizando estabilidad y compatibilidad de paquetes',
      scenes: [
        {
          id: 'impact_bun_hook',
          type: 'kinetic_hook',
          duration: 4.5,
          voiceover: 'Bun es increíblemente rápido en tu máquina de desarrollo, pero ¿es seguro migrar toda tu infraestructura de producción hoy mismo?',
          visual_cue: 'Tipografía de impacto gigante sin iconos repetitivos',
          props: {
            layout: 'impact',
            badge: 'DECISIÓN DE PRODUCCIÓN',
            lines: [
              { text: '¿MIGRAR A BUN O', color: '#ffffff' },
              { text: 'SEGUIR EN NODE 22?', color: '#38bdf8' }
            ],
            subtitle: 'Velocidad bruta frente a compatibilidad de paquetes'
          }
        },
        {
          id: 'tradeoff_bun_node',
          type: 'tradeoff_matrix',
          duration: 6.0,
          voiceover: 'Usa Bun como gestor de paquetes y ejecutor de tests para ganar diez veces más velocidad en CI/CD; evalúa con cuidado las librerías C++ nativas en el servidor.',
          visual_cue: 'Matriz de compatibilidad y recomendación de adopción gradual',
          props: {
            header: 'ESTRATEGIA DE ADOPCIÓN',
            title: 'DÓNDE USAR CADA RUNTIME',
            colA: 'BUN (DESARROLLO Y CI)',
            colB: 'NODE 22 (PRODUCCIÓN CORE)',
            rows: [
              { dim: 'Instalación de paquetes en CI', a: '✔ 30x más rápido', b: '✖ Lento en pipelines', aGood: true },
              { dim: 'Ejecución de tests locales', a: '✔ Resultados instantáneos', b: '✖ Mayor consumo CPU', aGood: true },
              { dim: 'Librerías legacy en C++ (Addons)', a: '✖ Casos límite', b: '✔ 100% compatible N-API', aGood: false }
            ]
          }
        },
        {
          id: 'cta_runtime_b',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Ayudo a equipos de ingeniería a modernizar sus proyectos TypeScript sin romper producción. Contáctame en el enlace de mi perfil.',
          visual_cue: 'Cierre con consultoría de modernización',
          props: {
            header: 'MODERNIZACIÓN DE ARQUITECTURA JS/TS',
            title: 'TRANSICIÓN SEGURA Y DE ALTO RENDIMIENTO',
            cta: {
              badge: 'CONSULTORÍA SENIOR (Contacto en perfil)',
              text: 'Moderniza tu stack de JavaScript sin sorpresas. Agenda una sesión técnica en mi biografía.'
            }
          }
        }
      ]
    }
  },

  // ----------------------------------------------------
  // TEMA 14: LSM TREES VS B-TREES
  // ----------------------------------------------------
  {
    slug: '14_lsm_trees_vs_btrees',
    category: 'SISTEMAS DE ALMACENAMIENTO & BASES DE DATOS',
    ctaType: 'database',
    varA: {
      title: 'LSM Trees vs B-Trees: MemTable, SSTables y páginas en disco',
      tone: 'Ciencia del almacenamiento en disco, escrituras secuenciales vs aleatorias',
      scenes: [
        {
          id: 'lsm_flow_hook',
          type: 'architecture_flow',
          duration: 6.5,
          voiceover: '¿Por qué RocksDB escribe a velocidades récord mientras Postgres prefiere B-Trees? Un LSM Tree escribe en una MemTable en RAM y luego vuelca bloques secuenciales inmutables en disco.',
          visual_cue: 'Apertura directa con arquitectura de escritura secuencial: MemTable a SSTables',
          props: {
            header: 'FLUJO DE ESCRITURA EN LSM',
            title: 'ESCRITURAS SECUENCIALES INMUTABLES',
            nodes: [
              { id: 'ram', label: 'MEMTABLE (SKIPLIST EN RAM)', sublabel: 'Escrituras directas O(1) en memoria DDR5', color: '#10b981', y: 160 },
              { id: 'wal', label: 'APPEND-ONLY LOG EN NVMe', sublabel: 'Cero escrituras aleatorias · Máximo throughput', color: '#fbbf24', y: 520 },
              { id: 'sst', label: 'SSTABLES INMUTABLES EN DISCO', sublabel: 'Compactación en segundo plano por niveles', color: '#38bdf8', y: 880 }
            ]
          }
        },
        {
          id: 'btree_diff',
          type: 'tradeoff_matrix',
          duration: 6.0,
          voiceover: 'En cambio, un B-Tree sobrescribe páginas en ubicaciones aleatorias. Es más lento para escribir, pero sus lecturas son instantáneas con un solo salto.',
          visual_cue: 'Matriz técnica de compensaciones entre motores',
          props: {
            header: 'COMPENSACIONES DE HARDWARE',
            title: 'LSM-TREE VS B-TREE',
            colA: 'LSM-TREE (ROCKSDB)',
            colB: 'B-TREE (POSTGRESQL)',
            rows: [
              { dim: 'Velocidad de Escritura', a: '✔ Ultra rápida (Append-only)', b: '✖ Lenta (Random page writes)', aGood: true },
              { dim: 'Velocidad de Lectura puntual', a: '✖ Requiere Bloom Filters', b: '✔ 1 solo seek O(log N)', aGood: false },
              { dim: 'Amplificación de Escritura', a: 'Alta (Por compactación)', b: 'Baja (Páginas directas)', aGood: false }
            ]
          }
        },
        {
          id: 'cta_lsm',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Audito motores de persistencia y diagnostico cuellos de botella de disco en sistemas con cargas masivas. Link en mi perfil.',
          visual_cue: 'Cierre con llamado a auditoría de bases de datos',
          props: {
            header: 'AUDITORÍA DE BASES DE DATOS Y I/O',
            title: 'RESOLUCIÓN DE CUELLOS DE BOTELLA',
            cta: {
              badge: 'AUDITORÍA DE DATOS (Link en bio)',
              text: '¿Tu base de datos sufre por escrituras masivas? Link en mi perfil para agendar tu auditoría.'
            }
          }
        }
      ]
    },
    varB: {
      title: '¿Por qué tu base colapsa en escrituras masivas? Postgres vs RocksDB',
      tone: 'Resolutivo, enfocado en incidentes reales de saturación de disco',
      scenes: [
        {
          id: 'iops_split_hook',
          type: 'terminal_split',
          duration: 6.5,
          voiceover: 'Estás bombardeando PostgreSQL con eventos de analítica y tu disco colapsó por contención de páginas de B-Trees.',
          visual_cue: 'Apertura directa con terminal mostrando saturación de IOPS al 100% en disco',
          props: {
            header: 'TELEMETRÍA DE DISCO',
            title: 'SATURACIÓN DE IOPS EN NVME',
            termA: {
              title: 'POSTGRESQL INSERT MASIVO',
              color: '#ef4444',
              cmd: 'iostat -xz 1',
              status: 'Disco al 99.8% de utilización · I/O Wait',
              time: 'Saturado',
              lines: [
                'B-Tree lock contention en páginas de índices',
                'WAL flush bottleneck bloqueando hilos de workers',
                'Peticiones HTTP cayendo con error 504 Gateway Timeout'
              ]
            },
            termB: {
              title: 'LSM / COLUMNAR ENGINE',
              color: '#10b981',
              cmd: 'ingest_worker --batch=10000',
              status: 'Escrituras secuenciales sin bloqueos',
              time: 'Fluido',
              lines: [
                'MemTable absorbe ráfagas de 150,000 req/s',
                'Utilización de disco por debajo del 25%',
                'Latencia de inserción estable en sub-milisegundos'
              ]
            }
          }
        },
        {
          id: 'cta_lsm_b',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Audito la arquitectura de datos de tu producto para seleccionar el motor adecuado y evitar caídas en picos de tráfico. Enlace en mi bio.',
          visual_cue: 'Cierre con auditoría de datos',
          props: {
            header: 'AUDITORÍA DE PERSISTENCIA Y LATENCIA',
            title: 'DISEÑO DE CAPA DE DATOS PARA ALTA CARGA',
            cta: {
              badge: 'AUDITORÍA DE DATOS (Link en perfil)',
              text: 'Evita caídas por saturación de base de datos. Agenda tu auditoría técnica en mi perfil.'
            }
          }
        }
      ]
    }
  },

  // ----------------------------------------------------
  // TEMA 15: WEBASSEMBLY EN EL SERVIDOR
  // ----------------------------------------------------
  {
    slug: '15_webassembly_servidor',
    category: 'RUNTIMES DE SERVIDOR & WASM',
    ctaType: 'contratacion_senior',
    varA: {
      title: 'Sandboxing matemático: Wasmtime y aislamiento de código',
      tone: 'Seguridad a nivel de bytecode, modelos de componentes, microsegundos',
      scenes: [
        {
          id: 'wasm_speed_hook',
          type: 'metrics_comparison',
          duration: 6.5,
          voiceover: '¿Cómo ejecutar código no confiable de usuarios a velocidad nativa sin riesgo de seguridad? Mientras un contenedor Docker tarda cientos de milisegundos en arrancar, una función WASM se inicializa en menos de un milisegundo.',
          visual_cue: 'Apertura directa con comparativa de cold start entre Docker y WebAssembly',
          props: {
            header: 'COLD START EN EDGE COMPUTING',
            metricA: { label: 'CONTENEDOR DOCKER LIGHT', value: '450ms', sub: 'Namespace init y OverlayFS mount', color: '#ef4444' },
            metricB: { label: 'WASM MICRO-RUNTIME', value: '0.8ms', sub: 'Instanciación de memoria directa', color: '#10b981' }
          }
        },
        {
          id: 'wasm_memory',
          type: 'memory_layout',
          duration: 6.0,
          voiceover: 'Un módulo WASI tiene una memoria lineal estrictamente delimitada. El programa no puede leer ni escribir ni un solo byte fuera de su espacio asignado.',
          visual_cue: 'Memoria lineal delimitada de WebAssembly',
          props: {
            header: 'AISLAMIENTO MATEMÁTICO',
            title: 'MEMORIA LINEAL ENCAPSULADA',
            items: [
              { name: 'ESPACIO DEL MÓDULO WASM', addr: '0x0000 -> 0xFFFF', value: 'Memoria lineal aislada sin acceso a syscalls', color: '#10b981' },
              { name: 'MEMORIA DEL KERNEL HOST', addr: 'BLOQUEADA', value: 'Protegida con guard pages por hardware', color: '#ef4444' }
            ]
          }
        },
        {
          id: 'cta_wasm',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Diseño arquitecturas seguras de ejecución de código y micro-runtimes aislados. Si necesitas un ingeniero especializado para tu sistema, link en mi bio.',
          visual_cue: 'Cierre con contratación senior',
          props: {
            header: 'CONTRATACIÓN SENIOR / SISTEMAS',
            title: 'ARQUITECTURA DE RUNTIMES & EDGE COMPUTING',
            cta: {
              badge: 'STAFF ENGINEER (Link en bio)',
              text: '¿Necesitas ejecutar plugins o código aislado de forma segura? Hablemos en mi perfil.'
            }
          }
        }
      ]
    },
    varB: {
      title: '¿Morirá Docker en el Edge? Arranques en 1 milisegundo con WASM',
      tone: 'Visionario, futurista y provocador sobre el relevo generacional en la nube',
      scenes: [
        {
          id: 'docker_tradeoff_hook',
          type: 'tradeoff_matrix',
          duration: 6.5,
          voiceover: 'El creador de Docker dijo que si WASM hubiera existido en 2008, no habrían tenido que crear Docker. Para funciones serverless en el edge, WASM es infinitamente superior.',
          visual_cue: 'Apertura directa con matriz comparativa Docker frente a WebAssembly',
          props: {
            header: 'COMPARATIVA DE CONTENCIÓN',
            title: 'DOCKER CONTAINERS VS WEBASSEMBLY',
            colA: 'WEBASSEMBLY (WASI)',
            colB: 'DOCKER (OCI)',
            rows: [
              { dim: 'Tiempo de arranque en frío', a: '✔ < 1 milisegundo', b: '✖ 300-800 milisegundos', aGood: true },
              { dim: 'Tamaño del binario', a: '✔ 2 a 10 Megabytes', b: '✖ 150 a 500 Megabytes', aGood: true },
              { dim: 'Soporte de apps monolíticas', a: '✖ Requiere compilar a WASI', b: '✔ Cualquier Linux binario', aGood: false }
            ]
          }
        },
        {
          id: 'cta_wasm_b',
          type: 'tradeoff_matrix',
          duration: 5.0,
          voiceover: 'Asesoro a empresas en modernización de infraestructura serverless y diseño de sandboxes seguros. Contacto en mi biografía.',
          visual_cue: 'Cierre con consultoría de infraestructura',
          props: {
            header: 'CONSULTORÍA DE INFRAESTRUCTURA',
            title: 'ARQUITECTURA SERVERLESS MODERNA',
            cta: {
              badge: 'CONSULTORÍA TÉCNICA (Link en perfil)',
              text: '¿Interesado en WASM o arquitecturas Edge? Link en mi perfil para agendar tu sesión.'
            }
          }
        }
      ]
    }
  }
];
