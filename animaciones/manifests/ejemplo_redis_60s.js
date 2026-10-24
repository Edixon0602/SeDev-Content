window.__DEFAULT_MANIFEST__ = {
  "title": "Por qué Redis procesa 100K peticiones por segundo",
  "fps": 30,
  "output": "C:\\Users\\Edixon\\Desktop\\VIDEO_REDIS_60S_FINAL.mp4",
  "scenes": [
    {
      "id": "scene_01_hook",
      "type": "kinetic_hook",
      "duration": 4.0,
      "voiceover": "¿Por qué Redis vuela mientras tu base de datos colapsa? Cien mil peticiones por segundo.",
      "visual_cue": "Entra texto cinético en muelle y rayo dorado",
      "props": {
        "badge": "ANÁLISIS DE SISTEMAS",
        "icon": "lightning",
        "lines": [
          { "text": "¿POR QUÉ REDIS", "color": "#ffffff" },
          { "text": "VUELA?", "color": "#fbbf24" }
        ],
        "subtitle": "100.000 PETICIONES POR SEGUNDO"
      }
    },
    {
      "id": "scene_02_bottleneck",
      "type": "metrics_comparison",
      "duration": 5.0,
      "voiceover": "El cuello de botella siempre es el disco. Una llamada al sistema NVMe tarda cincuenta mil nanosegundos.",
      "visual_cue": "Barra roja de disco se dispara hasta 50.000 ns",
      "props": {
        "badge": "EL PROBLEMA DE FONDO",
        "title": "EL CUELLO DE BOTELLA DEL DISCO",
        "itemA": {
          "name": "LATENCIA DISCO NVMe",
          "value": 50000,
          "max": 50000,
          "color": "#ef4444",
          "subtext": "50.000 ns POR LLAMADA AL SISTEMA"
        },
        "itemB": {
          "name": "LATENCIA OBJETIVO",
          "value": 1000,
          "max": 50000,
          "color": "#71717a",
          "subtext": "MÁXIMO TOLERADO EN ALTA CONCURRENCIA"
        },
        "speedup": "EL DISCO ES 50X DEMASIADO LENTO"
      }
    },
    {
      "id": "scene_03_ram_intro",
      "type": "kinetic_hook",
      "duration": 5.5,
      "voiceover": "El primer secreto: Redis elimina el disco por completo y opera cien por ciento en memoria RAM.",
      "visual_cue": "Aparece icono de memoria y texto verde 100% RAM",
      "props": {
        "badge": "SECRETO #1",
        "icon": "memory",
        "lines": [
          { "text": "CERO DISCO.", "color": "#ffffff" },
          { "text": "100% MEMORIA RAM.", "color": "#10b981" }
        ],
        "subtitle": "TIEMPO DE ACCESO: 80 NANOSEGUNDOS"
      }
    },
    {
      "id": "scene_04_memory_hex",
      "type": "memory_layout",
      "duration": 7.0,
      "voiceover": "Aquí lo ves en memoria real: punteros directos sin serializar y acceso físico en solo ochenta nanosegundos.",
      "visual_cue": "Tabla hexadecimal se ilumina mostrando punteros a RAM",
      "props": {
        "badge": "DEBUGGER DE MEMORIA",
        "title": "ACCESO DIRECTO A BYTES EN RAM",
        "rows": [
          { "addr": "0x7FFE0010", "hex": ["72", "65", "64", "69", "73", "5F", "6B", "76"], "label": "KEY: \"redis_kv\"" },
          { "addr": "0x7FFE0018", "hex": ["00", "00", "00", "08", "7F", "FE", "00", "40"], "label": "POINTER -> DICT" },
          { "addr": "0x7FFE0020", "hex": ["FF", "00", "C0", "A8", "01", "0A", "1F", "90"], "label": "CLIENT TCP FD" },
          { "addr": "0x7FFE0028", "hex": ["01", "00", "00", "00", "00", "00", "00", "00"], "label": "EXPIRE AT (TTL)" }
        ]
      }
    },
    {
      "id": "scene_05_myth_buster",
      "type": "kinetic_hook",
      "duration": 4.5,
      "voiceover": "¿Multi-threading con hilos concurrentes? Falso. Redis corre en un solo hilo sin un solo lock.",
      "visual_cue": "Titular de mito se quiebra y entra 'ES UN SOLO HILO'",
      "props": {
        "badge": "EL GRAN MITO",
        "icon": "lightning",
        "lines": [
          { "text": "¿MULTI-THREADING?", "color": "#ffffff" },
          { "text": "ES UN SOLO HILO.", "color": "#fbbf24" }
        ],
        "subtitle": "CERO LOCKS. CERO CONCURRENCIA BLOQUEANTE."
      }
    },
    {
      "id": "scene_06_arch_flow",
      "type": "architecture_flow",
      "duration": 7.5,
      "voiceover": "Usa multiplexación con epoll: diez mil clientes envían datos y el event loop atiende los eventos listos sin frenar jamás.",
      "visual_cue": "Diagrama de flujo activo: paquetes viajan por carriles a la cola",
      "props": {
        "header": "MULTIPLEXACIÓN I/O CON EPOLL",
        "nodes": [
          { "id": "clients", "label": "CLIENT CONCURRENT CONNS", "sublabel": "10.000 CONEXIONES ABIERTAS", "color": "#38bdf8", "y": 160 },
          { "id": "eventloop", "label": "SINGLE-THREADED EVENT LOOP", "sublabel": "I/O MULTIPLEXING (ae_epoll.c)", "color": "#fbbf24", "y": 520 },
          { "id": "storage", "label": "IN-MEMORY HASH TABLE", "sublabel": "O(1) AVERAGE LOOKUP TIME", "color": "#10b981", "y": 880 }
        ],
        "queueSlots": 6
      }
    },
    {
      "id": "scene_07_code_c",
      "type": "code_terminal",
      "duration": 7.0,
      "voiceover": "En su código en C, epoll_wait captura los eventos y processCommand ejecuta la consulta en memoria al instante.",
      "visual_cue": "Editor de código resalta la línea processCommand en amarillo",
      "props": {
        "badge": "CÓDIGO FUENTE DE REDIS",
        "filename": "ae_epoll.c",
        "lang": "C",
        "codeLines": [
          { "text": "int numevents = epoll_wait(state->epfd, state->events, ...);", "highlight": false },
          { "text": "for (int j = 0; j < numevents; j++) {", "highlight": false },
          { "text": "    // Procesa eventos de sockets sin locks ni threads", "highlight": false },
          { "text": "    processCommand(c); // Ejecución inmediata en memoria", "highlight": true },
          { "text": "}", "highlight": false }
        ],
        "terminal": {
          "command": "gcc -O3 -c ae_epoll.c",
          "output": "ae_epoll.o generated (zero overhead kernel bindings)"
        }
      }
    },
    {
      "id": "scene_08_benchmark",
      "type": "code_terminal",
      "duration": 7.0,
      "voiceover": "El benchmark oficial lo demuestra: ciento dieciocho mil operaciones por segundo con latencia sub-milisegundo.",
      "visual_cue": "Terminal ejecuta redis-benchmark con salida de rendimiento en vivo",
      "props": {
        "badge": "BENCHMARK EN VIVO",
        "filename": "benchmark.sh",
        "lang": "BASH",
        "codeLines": [
          { "text": "redis-server --port 6379 --daemonize yes", "highlight": false },
          { "text": "redis-benchmark -q -n 100000 -c 50 -P 16", "highlight": true },
          { "text": "echo \"BENCHMARK DE ALTA CONCURRENCIA FINALIZADO\"", "highlight": false }
        ],
        "terminal": {
          "command": "redis-benchmark -q -n 100000 -c 50 -P 16",
          "output": "SET: 118,483 req/sec (avg latency: 0.12ms)\nGET: 121,951 req/sec (avg latency: 0.09ms)\n100.00% <= 1 ms latency"
        }
      }
    },
    {
      "id": "scene_09_versus",
      "type": "metrics_comparison",
      "duration": 7.5,
      "voiceover": "Frente a los cuatro mil registros de una base SQL en disco, Redis rinde casi veinticinco veces más rápido.",
      "visual_cue": "Comparativa de barras en verde y bloque '24.6x MÁS RÁPIDO'",
      "props": {
        "badge": "COMPARATIVA FINAL",
        "title": "THROUGHPUT REAL MEDIDO",
        "itemA": {
          "name": "BASE DE DATOS SQL (DISCO)",
          "value": 4800,
          "max": 120000,
          "color": "#71717a",
          "subtext": "I/O SYSTEM CALL BOUND"
        },
        "itemB": {
          "name": "REDIS (RAM DIRECTA)",
          "value": 118500,
          "max": 120000,
          "color": "#10b981",
          "subtext": "IN-MEMORY ZERO-LOCK"
        },
        "speedup": "24.6x MÁS RÁPIDO"
      }
    },
    {
      "id": "scene_10_cierre",
      "type": "kinetic_hook",
      "duration": 5.0,
      "voiceover": "Lección de arquitectura: la RAM es el nuevo disco. Sígueme en SeDev para más ingeniería de sistemas.",
      "visual_cue": "Cierre con texto verde 'LA RAM ES EL NUEVO DISCO' y firma",
      "props": {
        "badge": "LECCIÓN DE INGENIERÍA",
        "icon": "speed",
        "lines": [
          { "text": "LA RAM ES", "color": "#ffffff" },
          { "text": "EL NUEVO DISCO.", "color": "#10b981" }
        ],
        "subtitle": "SEDEV: ARQUITECTURA DE SOFTWARE"
      }
    }
  ]
};
