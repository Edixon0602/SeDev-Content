// Data definitions for Topics 11 to 15 (Zero // AI-slop, Zero SeDev watermarks, Varied Hooks & Layouts)
module.exports = [
  // ----------------------------------------------------
  // TEMA 11: MODELOS LOCALES Y CUANTIZACIÓN A 4 BITS
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
          id: 'quant_weights_lead',
          type: 'quantization_weights_viz',
          duration: 6.5,
          voiceover: '¿Cómo comprimir un modelo de inteligencia artificial de treinta gigabytes para que corra en tu servidor local? Pasando de coma flotante a enteros de cuatro bits con cuantización.',
          visual_cue: 'Visualizador de matriz de tensores FP16 comprimiéndose en bloques INT4 GGUF con factor de escala',
          props: {
            mode: 'quant',
            badge: 'OPTIMIZACIÓN MATEMÁTICA',
            title: 'CUANTIZACIÓN INT4 GGUF',
            subtitle: 'FP16 (16 BITS) VS INT4 NIBBLES EN GPU LOCAL'
          }
        },
        {
          id: 'memory_nibbles',
          type: 'memory_layout',
          duration: 6.0,
          voiceover: 'En vez de almacenar dieciséis bits por peso, agrupamos los valores en bloques de treinta y dos pesos compartiendo una escala alfa. Ocupa un cuarto de la memoria sin perder precisión.',
          visual_cue: 'Inspección de memoria RAM mostrando empaquetado de dos pesos por cada byte de memoria',
          props: {
            badge: 'EMPAQUETADO DE TENSORES',
            title: 'ALINEACIÓN DE MEMORIA EN VRAM',
            rows: [
              { addr: '0xCUDA010', hex: ['6A', 'FE', '14', '9C', '02', '5B', 'E3', '77'], label: 'BLOQUE INT4 (8 PESOS EN 4 BYTES)' },
              { addr: '0xCUDA018', hex: ['3F', '80', '00', '00', '00', '00', '00', '00'], label: 'FACTOR DE ESCALA ALFA (FLOAT32)' },
              { addr: '0xCUDA020', hex: ['00', '00', '00', '00', '00', '00', '00', '00'], label: 'REDUCCIÓN DE HUELLA VRAM: 74%' }
            ]
          }
        },
        {
          id: 'cta_quant',
          type: 'terminal_split',
          duration: 5.0,
          voiceover: 'Ayudo a empresas a desplegar clústeres de inferencia privada con modelos abiertos para no depender de APIs externas. Contáctame en mi perfil.',
          visual_cue: 'Terminal con benchmark de inferencia local vLLM y llamada a la acción en bio',
          props: {
            header: 'INFRAESTRUCTURA DE IA (Link en bio)',
            title: 'INFERENCIA PRIVADA EN PRODUCCIÓN',
            leftTitle: 'VLLM SERVER EN LOCAL',
            rightTitle: 'VENTAJAS DE SOBERANÍA',
            leftText: '$ vllm serve Qwen2.5-Coder-32B-AWQ\n✔ Modelo cargado en 8.4 GB VRAM\n✔ Throughput: 114 tokens/segundo\n✔ Cumplimiento estricto GDPR y HIPAA',
            rightText: '• Elimina pagos recurrentes de OpenAI\n• Cero fugas de propiedad intelectual\n• Latencia predecible de 15ms\n• Asesoría de despliegue: link en bio'
          }
        }
      ]
    },
    varB: {
      title: 'Soberanía de Datos: Corre 100 tokens/s en local sin pagar APIs',
      tone: 'Financiero y privacidad, liberándose de la dependencia de OpenAI',
      scenes: [
        {
          id: 'latency_api_shock',
          type: 'latency_scale',
          duration: 5.5,
          voiceover: 'Pagar tokens por cada petición a OpenAI está arruinando tus márgenes y exponiendo los datos privados de tus clientes a servidores de terceros.',
          visual_cue: 'Escala de latencia comparando tiempo de red a OpenAI vs inferencia local en tu propio hardware',
          props: {
            header: 'LATENCIA Y PRIVACIDAD',
            title: 'API EXTERNA VS INFERENCIA LOCAL',
            subtitle: 'TIEMPO DE ESPERA EN RED VS ACCESO IN-HOUSE'
          }
        },
        {
          id: 'quant_demo',
          type: 'quantization_weights_viz',
          duration: 6.0,
          voiceover: 'Con modelos cuantizados a cuatro bits en un servidor propio con tarjetas RTX obtienes inferencia ilimitada las veinticuatro horas del día por una tarifa fija.',
          visual_cue: 'Visualizador de tensores cuantizados corriendo en hardware accesible',
          props: {
            mode: 'quant',
            badge: 'TARIFAS PLANAS',
            title: 'HARDWARE PROPIO SIN LÍMITES',
            subtitle: '100 TOKENS/S SIN PAGAR POR CADA PROMPT'
          }
        }
      ]
    }
  },

  // ----------------------------------------------------
  // TEMA 12: SERVER-SENT EVENTS VS WEBSOCKETS
  // ----------------------------------------------------
  {
    slug: '12_sse_vs_websockets',
    category: 'REDES & PROTOCOLOS WEB',
    ctaType: 'optimizacion_backend',
    varA: {
      title: 'Por qué Server-Sent Events es superior a WebSockets en HTTP/2',
      tone: 'Protocolos web, simplicidad arquitectónica, estándares RFC',
      scenes: [
        {
          id: 'network_pipeline_sse',
          type: 'network_pipeline',
          duration: 6.0,
          voiceover: 'Si solo necesitas enviar datos del servidor al navegador, usar WebSockets es complicar tu arquitectura innecesariamente.',
          visual_cue: 'Tubería de paquetes HTTP/2 mostrando multiplexación de streams SSE con reconexión automática',
          props: {
            header: 'FLUJO DE PAQUETES HTTP/2',
            title: 'MULTIPLEXACIÓN NATIVA DE STREAMS',
            latency: '2.4 ms',
            stages: [
              { name: 'TCP + TLS 1.3 Handshake', tag: 'Conexión compartida' },
              { name: 'HTTP/2 Stream Multiplexing', tag: 'Mismo puerto 443' },
              { name: 'Server-Sent Events Pipeline', tag: 'Text/event-stream' }
            ]
          }
        },
        {
          id: 'tradeoff_sse_ws',
          type: 'tradeoff_matrix',
          duration: 6.0,
          voiceover: 'Server-Sent Events corre sobre HTTP tradicional. Tiene reconexión nativa, atraviesa proxies empresariales y aprovecha la compresión de cabeceras de HTTP/2.',
          visual_cue: 'Matriz comparativa exhaustiva entre SSE y WebSockets',
          props: {
            header: 'COMPARATIVA DE PROTOCOLOS',
            title: 'SSE VS WEBSOCKETS EN HTTP/2',
            colA: 'SERVER-SENT EVENTS (SSE)',
            colB: 'WEBSOCKETS',
            rows: [
              { dim: 'Transporte', a: 'HTTP/2 Estándar (443)', b: 'Protocolo WS custom', aGood: true },
              { dim: 'Reconexión automática', a: 'Nativa en EventSource', b: 'Lógica manual frágil', aGood: true },
              { dim: 'Proxies y Firewalls', a: 'Cero problemas de bloqueo', b: 'Cortes frecuentes por proxy', aGood: true }
            ]
          }
        },
        {
          id: 'cta_sse',
          type: 'terminal_split',
          duration: 5.5,
          voiceover: 'Ayudo a simplificar infraestructuras en tiempo real y eliminar capas de WebSocket innecesarias. Link en mi perfil para auditar tus arquitecturas de red.',
          visual_cue: 'Terminal mostrando curl -N escuchando stream de eventos y llamada a la acción en bio',
          props: {
            header: 'CONSULTORÍA DE PROTOCOLOS (Link en bio)',
            title: 'STREAMING SENCILLO Y ROBUSTO',
            leftTitle: 'CURL -N INSPECCIÓN',
            rightTitle: 'MÉTRICAS CLAVE',
            leftText: '$ curl -N https://api.app.io/v1/stream\nHTTP/2 200 OK\ncontent-type: text/event-stream\n\nevent: update\ndata: {"status": "ok", "latency": "2ms"}',
            rightText: '• Cero servidores socket dedicados\n• Compatible con cualquier CDN y Edge\n• Reduce uso de memoria en un 60%\n• Agenda sesión técnica: link en bio'
          }
        }
      ]
    },
    varB: {
      title: 'No compliques tu stack: Deja de usar WebSockets para simples streams',
      tone: 'Directo, antipatrones de ingeniería, desmitificación técnica',
      scenes: [
        {
          id: 'ws_failure_hook',
          type: 'terminal_split',
          duration: 6.0,
          voiceover: 'Mantener un clúster de WebSockets requiere balanceadores especiales, heartbeat constante y una pesadilla de reconexión cuando falla la red móvil.',
          visual_cue: 'Terminal mostrando cortes de conexión WebSocket vs flujo continuo de SSE',
          props: {
            header: 'ANTIPATRÓN EN PRODUCCIÓN',
            title: 'LA FRAGILIDAD DE WEBSOCKETS',
            leftTitle: 'WEBSOCKET CLÚSTER',
            rightTitle: 'STREAMING CON SSE',
            leftText: '✖ Conexión caída en túnel móvil\n✖ Handshake WS bloqueado por proxy corporativo\n✖ Requiere servidores socket con estado',
            rightText: '✔ EventSource reconecta automáticamente\n✔ Pasa por Cloudflare y CDNs sin cambios\n✔ Stateless en balanceadores de carga'
          }
        },
        {
          id: 'network_diagram',
          type: 'network_pipeline',
          duration: 5.5,
          voiceover: 'Si tu cliente solo escucha actualizaciones del servidor como chats o cotizaciones, SSE sobre HTTP/2 es diez veces más fácil de operar. Link en mi bio.',
          visual_cue: 'Tubería de paquetes HTTP/2 procesando el stream de eventos',
          props: {
            header: 'SIMPLICIDAD OPERATIVA',
            title: 'TEXT/EVENT-STREAM EN HTTP/2',
            latency: '1.8 ms',
            stages: [
              { name: 'Gateway Edge', tag: 'Caché transparente' },
              { name: 'HTTP/2 Multiplexing', tag: '1 sola conexión TCP' },
              { name: 'Browser EventSource', tag: 'Reconexión automática' }
            ]
          }
        }
      ]
    }
  },

  // ----------------------------------------------------
  // TEMA 13: BUN VS NODE 22
  // ----------------------------------------------------
  {
    slug: '13_bun_vs_node22',
    category: 'RUNTIMES JAVASCRIPT',
    ctaType: 'optimizacion_backend',
    varA: {
      title: 'V8 vs JavaScriptCore: Cómo Node 22 contraatacó con TypeScript nativo',
      tone: 'Motores de JavaScript, compiladores JIT, benchmarking imparcial',
      scenes: [
        {
          id: 'engine_metrics',
          type: 'metrics_comparison',
          duration: 5.5,
          voiceover: 'Bun conmocionó el ecosistema con JavaScriptCore y arranque casi instantáneo. Pero Node 22 contraatacó con ejecución directa de TypeScript y V8 optimizado.',
          visual_cue: 'Comparativa de arranque en frío y consumo de memoria entre V8 y JavaScriptCore',
          props: {
            header: 'TIEMPO DE ARRANQUE EN FRÍO',
            metricA: { label: 'NODE.JS 22 (V8)', value: '28 ms', sub: 'Flag experimental TypeScript nativo', color: '#38bdf8' },
            metricB: { label: 'BUN (JAVASCRIPTCORE)', value: '6 ms', sub: 'Compilado en Zig con arranque instantáneo', color: '#fbbf24' }
          }
        },
        {
          id: 'tradeoff_bun_node',
          type: 'tradeoff_matrix',
          duration: 6.0,
          voiceover: 'Bun gana en velocidad de scripts y tests; Node 22 mantiene la corona de compatibilidad total con librerías nativas de C++ y estabilidad en producción.',
          visual_cue: 'Matriz técnica de tradeoffs entre ambos runtimes',
          props: {
            header: 'EVALUACIÓN DE RUNTIMES',
            title: 'NODE 22 VS BUN EN 2026',
            colA: 'NODE.JS 22',
            colB: 'BUN',
            rows: [
              { dim: 'Módulos Nativos C++', a: '100% Compatibilidad ABI', b: 'Soporte parcial N-API', aGood: true },
              { dim: 'TypeScript Nativo', a: 'Type-stripping sin types', b: 'Transpilador completo integrado', aGood: false },
              { dim: 'Estabilidad de ecosistema', a: '15 años de madurez en prod', b: 'Evolución rápida pero cambiante', aGood: true }
            ]
          }
        }
      ]
    },
    varB: {
      title: '¿Vale la pena migrar a Bun en producción o Node.js ya cerró la brecha?',
      tone: 'Pragmático, toma de decisiones tecnológicas, evitando modas',
      scenes: [
        {
          id: 'terminal_bench_bun',
          type: 'terminal_split',
          duration: 6.0,
          voiceover: 'Reescribir tu infraestructura para correr en Bun puede ser tentador, pero los bugs sutiles en librerías nativas pueden costarte semanas de depuración.',
          visual_cue: 'Terminal comparando ejecución de tests y compatibilidad de paquetes',
          props: {
            header: 'PRUEBAS DE COMPATIBILIDAD',
            title: 'NODE 22 VS BUN EN PRODUCCIÓN',
            leftTitle: 'BUN TEST SUITE',
            rightTitle: 'NODE 22 ESTABILIDAD',
            leftText: '$ bun test\n✔ 840 tests pasados en 0.4s\n✖ Incompatibilidad en paquete grpc-native\n✖ Error inesperado de segmentación',
            rightText: '$ node --test\n✔ 840 tests pasados en 1.8s\n✔ 100% compatibilidad con paquetes nativos\n✔ Cero riesgos de fallos en runtime'
          }
        },
        {
          id: 'metrics_tradeoff',
          type: 'metrics_comparison',
          duration: 5.5,
          voiceover: 'Usa Bun como gestor de paquetes y test runner en desarrollo; mantén Node 22 para los servidores de producción críticos. Link en bio para asesoría.',
          visual_cue: 'Métricas de productividad de desarrollo vs estabilidad en producción',
          props: {
            header: 'ESTRATEGIA RECOMENDADA (Link en bio)',
            metricA: { label: 'BUN EN DESARROLLO', value: '30x test speed', sub: 'Iteración ultrarrápida de código', color: '#10b981' },
            metricB: { label: 'NODE 22 EN SERVIDOR', value: '99.99% uptime', sub: 'Ecosistema robusto sin sorpresas', color: '#38bdf8' }
          }
        },
        {
          id: 'cta_runtime',
          type: 'tradeoff_matrix',
          duration: 4.0,
          voiceover: 'Audito arquitecturas de backend y evalúo migraciones de runtime para equipos que buscan rendimiento real sin riesgos innecesarios. Enlace en perfil.',
          visual_cue: 'Matriz de decisión final con llamada a la acción en bio',
          props: {
            header: 'CONSULTORÍA DE BACKEND',
            title: 'DECISIONES BASADAS EN DATOS',
            subtitle: 'AUDITA TU STACK CON INGENIERÍA REAL'
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
    category: 'ESTRUCTURAS DE DATOS & DB INTERNALS',
    ctaType: 'optimizacion_db',
    varA: {
      title: 'LSM Trees vs B-Trees: MemTable, SSTables y páginas en disco',
      tone: 'Estructuras de datos avanzadas, internals de bases de datos',
      scenes: [
        {
          id: 'storage_engine_lsm',
          type: 'storage_engine_viz',
          duration: 6.5,
          voiceover: 'Si tu base de datos colapsa cuando recibe millones de escrituras por segundo, estás usando la estructura de datos equivocada.',
          visual_cue: 'Visualizador del motor de almacenamiento LSM Tree con MemTable en RAM y compactación de SSTables',
          props: {
            mode: 'lsm',
            badge: 'ESTRUCTURAS DE ALMACENAMIENTO',
            title: 'LSM-TREE: LOG-STRUCTURED MERGE',
            subtitle: 'MEMTABLE EN RAM => FLUSH SECUENCIAL A SSTABLE'
          }
        },
        {
          id: 'tree_hierarchy_btree',
          type: 'tree_hierarchy',
          duration: 6.0,
          voiceover: 'Los B-Trees de PostgreSQL modifican páginas en disco de forma aleatoria, lo que desgasta los discos SSD y satura el canal de I/O.',
          visual_cue: 'Visualizador del árbol B balanceado mostrando el coste de la división de páginas',
          props: {
            badge: 'ESTRUCTURA B-TREE',
            title: 'PÁGINAS BALANCED-TREE EN DISCO',
            items: [
              { name: 'Root Node', level: 0 },
              { name: 'Internal Page A', level: 1 },
              { name: 'Internal Page B', level: 1 },
              { name: 'Leaf Disk Page (4 KB)', level: 2 }
            ]
          }
        },
        {
          id: 'latency_lsm',
          type: 'latency_scale',
          duration: 5.0,
          voiceover: 'Los LSM Trees como RocksDB convierten cada escritura en una operación secuencial en memoria, multiplicando el throughput por diez.',
          visual_cue: 'Escala de latencia comparando escrituras aleatorias en B-Tree vs escrituras append-only en LSM',
          props: {
            header: 'MÉTRICAS DE RENDIMIENTO',
            title: 'THROUGHPUT DE ESCRITURA',
            subtitle: 'ESCRITURAS ALEATORIAS VS SECUENCIALES'
          }
        }
      ]
    },
    varB: {
      title: '¿Por qué tu base colapsa en escrituras masivas? Postgres vs RocksDB',
      tone: 'Directo al grano, análisis de hardware y disco, optimización de I/O',
      scenes: [
        {
          id: 'lsm_shock',
          type: 'storage_engine_viz',
          duration: 6.0,
          voiceover: 'Postgres es fantástico para consultas complejas, pero cuando le lanzas cincuenta mil inserts por segundo el I/O del disco explota.',
          visual_cue: 'Visualizador del motor LSM demostrando cómo las escrituras se ordenan en RAM antes de tocar el SSD',
          props: {
            mode: 'lsm',
            badge: 'INGENIERÍA DE ALMACENAMIENTO',
            title: 'ROCKSDB VS POSTGRESQL',
            subtitle: 'ESCRIBE EN RAM PRIMERO · MERGE ORDENADO EN DISCO'
          }
        },
        {
          id: 'terminal_split_storage',
          type: 'terminal_split',
          duration: 5.5,
          voiceover: 'Bases de datos basadas en LSM como Cassandra o RocksDB son la respuesta para telemetría y logs. Link en mi perfil para auditar tu almacenamiento.',
          visual_cue: 'Terminal comparando throughput de escrituras y llamada a la acción en bio',
          props: {
            header: 'AUDITORÍA DE BASES DE DATOS (Link en bio)',
            title: 'OPTIMIZACIÓN DE ESCRITURA',
            leftTitle: 'POSTGRES B-TREE',
            rightTitle: 'ROCKSDB LSM-TREE',
            leftText: 'Throughput: 4.800 inserts/seg\nI/O Wait: 42% de saturación en NVMe\nColapso por bloqueo de páginas',
            rightText: 'Throughput: 84.000 inserts/seg\nI/O Wait: 2% (Escritura secuencial)\nCero sobrecarga de actualización'
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
    category: 'COMPILACIÓN & RUNTIMES',
    ctaType: 'arquitectura_backend',
    varA: {
      title: 'Sandboxing matemático: Wasmtime y aislamiento de código',
      tone: 'Sistemas formales, seguridad por aislamiento, compilación Wasm',
      scenes: [
        {
          id: 'kernel_wasm_lead',
          type: 'kernel_sandbox_viz',
          duration: 6.0,
          voiceover: 'WebAssembly ya no es solo para el navegador. En el servidor ofrece un aislamiento de código tan seguro como Docker pero arrancando en un milisegundo.',
          visual_cue: 'Visualizador del sandbox de memoria lineal Wasmtime aislando código de terceros',
          props: {
            badge: 'SANDBOXING MATEMÁTICO',
            title: 'WASMTIME: AISLAMIENTO FORMAL',
            subtitle: 'MEMORIA LINEAL AISLADA SIN CONTENEDORES PESADOS'
          }
        },
        {
          id: 'latency_wasm',
          type: 'latency_scale',
          duration: 5.5,
          voiceover: 'Un contenedor Docker tarda ochocientos milisegundos en arrancar y consume cien megabytes de base. Un módulo Wasm arranca en microsegundos usando dos megabytes.',
          visual_cue: 'Escala de latencia comparando arranque de contenedor Docker vs módulo WebAssembly',
          props: {
            header: 'MÉTRICAS DE ARRANQUE EN FRÍO',
            title: 'DOCKER VS WEBASSEMBLY EN SERVIDOR',
            subtitle: 'TIEMPO DE INICIALIZACIÓN DE INSTANCIA'
          }
        },
        {
          id: 'terminal_wasm',
          type: 'terminal_split',
          duration: 6.0,
          voiceover: 'Ideal para plugins de usuarios y funciones serverless ultrarrápidas en el Edge. Link en bio si quieres diseñar arquitecturas seguras con WebAssembly.',
          visual_cue: 'Terminal ejecutando wasmtime con permisos acotados mediante WASI y llamada a la acción en bio',
          props: {
            header: 'CONSULTORÍA EN WASM (Link en bio)',
            title: 'COMPUTACIÓN SEGURA EN EL EDGE',
            leftTitle: 'WASMTIME CLI',
            rightTitle: 'BENEFICIOS DE SEGURIDAD',
            leftText: '$ wasmtime run --dir=/tmp plugin.wasm\n✔ Memoria lineal limitada a 16 MB\n✔ Sin acceso a red ni disco no autorizado\n✔ Tiempo de ejecución: 1.2 ms',
            rightText: '• Permite ejecutar código de clientes sin riesgo\n• 100x más ligero que máquinas virtuales\n• Apto para arquitectura Edge y Serverless\n• Asesoría técnica: enlace en perfil'
          }
        }
      ]
    },
    varB: {
      title: '¿Morirá Docker en el Edge? Arranques en 1 milisegundo con WASM',
      tone: 'Futurista pero pragmático, evolución del cloud computing',
      scenes: [
        {
          id: 'cold_start_shock',
          type: 'latency_scale',
          duration: 5.5,
          voiceover: 'El arranque en frío de los contenedores Docker está destruyendo la experiencia de usuario en arquitecturas serverless.',
          visual_cue: 'Gráfica de escala de latencia mostrando el cold start de Docker vs Wasm',
          props: {
            header: 'COLD START EN SERVERLESS',
            title: 'EL COSTE OCULTO DE LOS CONTENEDORES',
            subtitle: 'ARRANQUE DE KERNEL VS INSTANCIACIÓN DE MEMORIA'
          }
        },
        {
          id: 'kernel_diagram_wasm',
          type: 'kernel_sandbox_viz',
          duration: 6.0,
          voiceover: 'Con WebAssembly y WASI compilas código en Rust o Go que corre en cualquier servidor a velocidad nativa sin el peso de un sistema operativo virtual. Link en bio.',
          visual_cue: 'Visualizador del aislamiento en servidor mediante Wasmtime',
          props: {
            badge: 'EL FUTURO DEL EDGE',
            title: 'EJECUCIÓN DE CERO SOBRECARGA',
            subtitle: 'WASI: INTERFAZ DE SISTEMA OPERATIVO UNIVERSAL'
          }
        }
      ]
    }
  }
];
