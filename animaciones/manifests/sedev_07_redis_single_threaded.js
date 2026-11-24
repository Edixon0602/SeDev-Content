window.__DEFAULT_MANIFEST__ = {
  "title": "[07] ¿Por qué Redis usa un solo hilo y humilla a servidores gigantes?",
  "slug": "sedev_07_redis_single_threaded",
  "category": "ARQUITECTURA DE SOFTWARE & KERNEL",
  "tagline": "El poder del event loop, epoll y memoria RAM sin locks",
  "fps": 30,
  "outputDir": "animaciones/output_clips/sedev_brolls/sedev_07_redis_single_threaded",
  "script": {
    "hook": "Tu aplicación usa dieciséis núcleos de procesador y sufre con dos mil usuarios. Redis corre en un solo hilo y procesa cien mil peticiones por segundo sin despeinarse.",
    "broll1_lead": "Muchos programadores creen que más hilos siempre es más rápido. Pero cuando metes muchos hilos compitiendo por la misma memoria, el procesador gasta más tiempo cambiando de contexto y esperando cerrojos que ejecutando código.",
    "camera_pivot": "Redis dijo: no voy a usar cerrojos ni hilos compitiendo. Todo vive en la memoria RAM y un solo bucle despacha comando tras comando a velocidad de la luz.",
    "broll2_lead": "Como cada comando tarda apenas ocho microsegundos en resolverse, no hay cola que lo tranque. El cuello de botella casi siempre es la tarjeta de red, nunca el procesador.",
    "outro": "A veces la mejor arquitectura no es la más compleja, sino la que sabe quitar estorbos. Sígueme si te gusta la ingeniería de sistemas sin humo."
  },
  "brolls": [
    {
      "id": "broll_01_epoll_reactor_loop",
      "purpose": "Flujo del Reactor epoll multiplexando 100,000 conexiones en 1 hilo",
      "type": "architecture_flow",
      "duration": 9,
      "props": {
        "theme": "dark",
        "title": "REACTOR PATTERN Y MULTIPLEXACIÓN EPOLL",
        "subtitle": "1 HILO CONTINUO SIN CAMBIOS DE CONTEXTO",
        "layout": "horizontal",
        "nodes": [
          {
            "id": "net",
            "label": "SOCKETS RED ENTRANTES",
            "sublabel": "100,000 CONEXIONES ABIERTAS",
            "color": "#ffffff"
          },
          {
            "id": "epoll",
            "label": "EPOLL / KERNEL RING",
            "sublabel": "NOTIFICA EVENTOS LISTOS",
            "color": "#fbbf24"
          },
          {
            "id": "core",
            "label": "REDIS MAIN THREAD",
            "sublabel": "EJECUCIÓN RAM EN 0.008ms",
            "color": "#10b981"
          }
        ]
      },
      "voiceover": "Muchos programadores creen que más hilos siempre es más rápido. Pero cuando metes muchos hilos compitiendo por la misma memoria, el procesador gasta más tiempo cambiando de contexto y esperando cerrojos que ejecutando código.",
      "visual_cue": "Flujo del Reactor epoll multiplexando 100,000 conexiones en 1 hilo"
    },
    {
      "id": "broll_02_redis_vs_multithread_bench",
      "purpose": "Carrera de velocidad: Redis 1 hilo en RAM vs Multihilo trabado en Mutex",
      "type": "versus_race",
      "duration": 9.5,
      "props": {
        "theme": "dark",
        "title": "BENCHMARK DE CONCURRENCIA BAJO CARGA",
        "subtitle": "100,000 PETICIONES SIMULTÁNEAS EN PRODUCCIÓN",
        "sideA": {
          "name": "REDIS (1 SOLO HILO EN RAM)",
          "tag": "EPOLL REACTOR SIN MUTEX",
          "targetMs": 0.08,
          "displayTime": "0.08ms",
          "memory": "34 MB",
          "cacheMisses": "0.0% LOCK CONTENTION",
          "speedup": "175x MÁS RÁPIDO"
        },
        "sideB": {
          "name": "BACKEND MULTIHILO CON CERROJOS",
          "tag": "MUTEX LOCKS + CONTEXT SWITCH",
          "targetMs": 14.2,
          "displayTime": "14.2ms",
          "memory": "512 MB",
          "cacheMisses": "ESPERA DE HILOS",
          "bottleneck": "CPU THREAD THRASHING"
        }
      },
      "voiceover": "Como cada comando tarda apenas ocho microsegundos en resolverse, no hay cola que lo tranque. El cuello de botella casi siempre es la tarjeta de red, nunca el procesador.",
      "visual_cue": "Carrera de velocidad: Redis 1 hilo en RAM vs Multihilo trabado en Mutex"
    }
  ]
};
