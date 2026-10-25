window.__DEFAULT_MANIFEST__ = {
  "title": "[19] Anatomía de un Cache Stampede y cómo el encabezado SWR lo neutraliza (Var A)",
  "category": "REDES & ARQUITECTURA DE CACHÉ",
  "slug": "19_cache_stale_while_revalidate",
  "variation": "A",
  "fps": 30,
  "scenes": [
    {
      "id": "hook_swr",
      "type": "kinetic_hook",
      "duration": 4.5,
      "voiceover": "¿Qué pasa cuando la caché de tu página más visitada expira justo cuando entran diez mil usuarios a la vez? Tu servidor colapsa por Cache Stampede.",
      "visual_cue": "Gancho cinético sobre avalancha de peticiones por expiración de caché",
      "props": {
        "badge": "ESCALABILIDAD WEB 2026",
        "lines": [
          {
            "text": "ANATOMÍA DE UN",
            "color": "#ffffff"
          },
          {
            "text": "CACHE STAMPEDE",
            "color": "#ef4444"
          }
        ],
        "subtitle": "CÓMO SWR NEUTRALIZA EL COLAPSO",
        "icon": "network_packet"
      }
    },
    {
      "id": "stampede_flow",
      "type": "network_pipeline",
      "duration": 6.5,
      "voiceover": "Todas las peticiones atraviesan la caché vacía e intentan recalcular la misma información en la base de datos simultáneamente tumbando el backend.",
      "visual_cue": "Pipeline visual mostrando la estampida saturando la base de datos sin protección",
      "props": {
        "header": "AVALANCHA DE PETICIONES",
        "title": "CACHE MISS SIMULTÁNEO",
        "subtitle": "10,000 CONEXIONES ATACANDO LA BASE DE DATOS",
        "stages": [
          {
            "id": "users",
            "label": "10,000 USUARIOS CONCURRENTES",
            "sublabel": "Petición masiva en el segundo 00:00",
            "y": 220,
            "color": "#ef4444",
            "metric": "10K RPS"
          },
          {
            "id": "cdn",
            "label": "CDN CACHE (EXPIRADA)",
            "sublabel": "TTL agotado // Deja pasar todo el tráfico",
            "y": 520,
            "color": "#fbbf24",
            "metric": "Stampede"
          },
          {
            "id": "db",
            "label": "BASE DE DATOS EN COLAPSO",
            "sublabel": "10,000 queries pesadas idénticas a la vez",
            "y": 820,
            "color": "#ef4444",
            "metric": "CPU 100%"
          }
        ]
      }
    },
    {
      "id": "swr_solution",
      "type": "code_terminal",
      "duration": 6,
      "voiceover": "Con Stale-While-Revalidate la CDN entrega el contenido en cinco milisegundos mientras un solo hilo actualiza la caché en segundo plano.",
      "visual_cue": "Terminal configurando encabezado Cache-Control stale-while-revalidate",
      "props": {
        "header": "CABECERA HTTP PROTECTORA",
        "title": "STALE-WHILE-REVALIDATE PATTERN",
        "filename": "routes/products.ts",
        "codeLines": [
          "// Sirve respuesta vieja en 5ms y actualiza en background sin bloquear",
          "reply.header(\"Cache-Control\", ",
          "  \"public, max-age=60, stale-while-revalidate=86400, stale-if-error=86400\"",
          ");",
          "// Resultado: Zero Cache Stampedes // Rendimiento 100% plano"
        ],
        "cursorLine": 4
      }
    },
    {
      "id": "cta_swr",
      "type": "tradeoff_matrix",
      "duration": 5,
      "voiceover": "Audito la arquitectura de caching y entrega de contenido en CDN para garantizar escalabilidad extrema en picos de tráfico. Enlace en mi bio.",
      "visual_cue": "Cierre con llamado a auditoría de arquitectura y escalabilidad",
      "props": {
        "header": "AUDITORÍA DE ESCALABILIDAD & CACHING",
        "title": "RESISTENCIA A PICOS MASIVOS DE TRÁFICO",
        "cta": {
          "badge": "AUDITORÍA DE ESCALABILIDAD // SEDEV",
          "text": "¿Tu web sufre caídas en picos de tráfico? Link en mi perfil para agendar tu diagnóstico."
        }
      }
    }
  ]
};
