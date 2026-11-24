window.__DEFAULT_MANIFEST__ = {
  "title": "[09] El bug invisible que vuela en la laptop del dev y mata producción el lunes",
  "category": "RENDIMIENTO & ORM",
  "pilar": "Proof of Work & Casos Reales",
  "slug": "sedev_09_n_plus_1_silencioso",
  "introType": "TERMINAL SPLIT",
  "ctaKeyword": "LENTO",
  "fps": 30,
  "output": "animaciones/output_clips/sedev_09_n_plus_1_silencioso.mp4",
  "scenes": [
    {
      "id": "s01_hook",
      "type": "terminal_split",
      "duration": 12.1,
      "voiceover": "En la laptop de tu programador la página carga al instante porque prueba con cinco clientes. En producción tienes diez mil y el servidor muere.",
      "visual_cue": "Terminal disparando 2,500 consultas SELECT dentro de un bucle for",
      "props": {
        "voiceover": "En la laptop de tu programador la página carga al instante porque prueba con cinco clientes. En producción tienes diez mil y el servidor muere.",
        "title": "EL ASESINO SILENCIOSO: CONSULTAS N+1",
        "subtitle": "POR QUÉ EN DESARROLLO NO SE NOTA Y EN PRODUCCIÓN EXPLOTA",
        "leftTitle": "LO QUE PARECE INOFENSIVO EN EL CÓDIGO",
        "leftCode": "const orders = await db.orders.findMany({ take: 100 });\nfor (const ord of orders) {\n  // Dispara 1 viaje a la DB por cada fila!\n  ord.client = await db.users.findById(ord.userId);\n}",
        "rightTitle": "LO QUE RECIBE LA BASE DE DATOS EN VIVO",
        "rightCode": "SELECT * FROM orders LIMIT 100;\nSELECT * FROM users WHERE id = 1;\nSELECT * FROM users WHERE id = 2;\n// ... 100 consultas x 25 usuarios = 2,500 queries/s!",
        "diffNote": "2,500 viajes de red por abrir una sola pantalla"
      }
    },
    {
      "id": "s02_disaster",
      "type": "disaster_monitor",
      "duration": 12.4,
      "voiceover": "Cada lunes a las nueve de la mañana, veinte empleados abren el listado de facturas y la base de datos se clava al cien por ciento.",
      "visual_cue": "Monitor de colapso de lunes a las 9:00 AM por tormenta de micro-consultas",
      "props": {
        "voiceover": "Cada lunes a las nueve de la mañana, veinte empleados abren el listado de facturas y la base de datos se clava al cien por ciento.",
        "title": "EL INCENDIO DE CADA LUNES 9:00 AM",
        "subtitle": "TORMENTA DE MICRO-CONSULTAS REPETIDAS",
        "crashedStatus": "SATURACIÓN DE RED Y CPU: 2,500 QUERIES / SEGUNDO",
        "latencyNormal": 18,
        "latencyCrash": 14200,
        "logs": [
          {
            "time": "09:01",
            "level": "WARN",
            "text": "25 operadores abrieron el panel de facturación",
            "color": "#fbbf24"
          },
          {
            "time": "09:02",
            "level": "ERR",
            "text": "Bucle ORM disparó 2,525 consultas individuales",
            "color": "#ef4444"
          },
          {
            "time": "09:03",
            "level": "CRIT",
            "text": "Tiempo de respuesta subió a 14.2s · Pantalla congelada",
            "color": "#f87171"
          }
        ]
      }
    },
    {
      "id": "s03_arch",
      "type": "latency_scale",
      "duration": 11.6,
      "voiceover": "El servidor no está haciendo un cálculo difícil; está perdiendo todo el tiempo haciendo miles de viajes de ida y vuelta por la red.",
      "visual_cue": "Escala de latencia: 1 viaje en lote (6ms) vs 101 viajes en serie vs 2,500 queries simultáneas",
      "props": {
        "voiceover": "El servidor no está haciendo un cálculo difícil; está perdiendo todo el tiempo haciendo miles de viajes de ida y vuelta por la red.",
        "title": "EL COSTO OCULTO DEL VIAJE DE RED (N+1)",
        "subtitle": "TIEMPO ACUMULADO POR ABRIR UN SOLO LISTADO",
        "tiers": [
          {
            "name": "1 CONSULTA CON JOIN (SEDEV)",
            "latency": "6.2 ms",
            "ratio": 0.08,
            "color": "#10b981",
            "human": "1 solo viaje a la base de datos con todo el lote"
          },
          {
            "name": "CARGA EN LAPTOP LOCAL (5 FILAS)",
            "latency": "14.0 ms",
            "ratio": 0.18,
            "color": "#38bdf8",
            "human": "Engaña al programador porque hay pocos datos"
          },
          {
            "name": "1 USUARIO EN PRODUCCIÓN (101 QUERIES)",
            "latency": "680 ms",
            "ratio": 0.52,
            "color": "#f59e0b",
            "human": "101 viajes de ida y vuelta por la red interna"
          },
          {
            "name": "25 EMPLEADOS EL LUNES (2,525 QUERIES)",
            "latency": "14,200 ms",
            "ratio": 1,
            "color": "#ef4444",
            "human": "Cola de conexiones saturada y pantalla congelada"
          }
        ],
        "conclusion": "Hacer 100 consultas pequeñas en serie cuesta 200 veces más que traer las 100 filas en 1 solo viaje."
      }
    },
    {
      "id": "s04_code",
      "type": "terminal_split",
      "duration": 10.7,
      "voiceover": "Cuando cambias ese bucle por una sola consulta que trae todo de una vez, dos mil viajes se convierten en uno solo.",
      "visual_cue": "Cirugía de código: de bucle for con await a JOIN / WHERE id = ANY()",
      "props": {
        "voiceover": "Cuando cambias ese bucle por una sola consulta que trae todo de una vez, dos mil viajes se convierten en uno solo.",
        "title": "CORRECCIÓN DEFINITIVA EN 4 LÍNEAS",
        "subtitle": "DE O(N) VIAJES DE RED A O(1) CONSULTA",
        "leftTitle": "ANTES: 101 CONSULTAS POR USUARIO (14.2s)",
        "leftCode": "// 101 viajes por la red local\nconst orders = await getOrders(100);\nfor (const o of orders) {\n  o.user = await getUser(o.userId);\n}",
        "rightTitle": "DESPUÉS: 1 SOLA CONSULTA CON JOIN (6.2ms)",
        "rightCode": "SELECT o.*, u.name, u.tax_id\nFROM orders o\nJOIN users u ON u.id = o.user_id\nORDER BY o.created_at DESC LIMIT 100;\n-- 1 solo viaje · 6.2ms totales",
        "diffNote": "Reducción del 99% en tráfico de base de datos"
      }
    },
    {
      "id": "s05_race",
      "type": "versus_race",
      "duration": 10.9,
      "voiceover": "El procesador baja de golpe del cien al seis por ciento y la pantalla abre al instante sin tocar el plan del servidor.",
      "visual_cue": "Carrera: 1 consulta con JOIN (6.2ms) vs 101 consultas en bucle (14,200ms)",
      "props": {
        "voiceover": "El procesador baja de golpe del cien al seis por ciento y la pantalla abre al instante sin tocar el plan del servidor.",
        "title": "BENCHMARK BAJO 25 USUARIOS ACTIVOS",
        "subtitle": "APERTURA SIMULTÁNEA DE LISTADO",
        "sideA": {
          "name": "1 CONSULTA CON JOIN",
          "tag": "1 VIAJE DE RED POR PANTALLA",
          "targetMs": 6.2,
          "displayTime": "6.2ms",
          "memory": "CPU AL 6%",
          "cacheMisses": "25 QUERIES TOT",
          "speedup": "2,290x MÁS RÁPIDO"
        },
        "sideB": {
          "name": "BUCLE ORM (N+1)",
          "tag": "101 VIAJES POR PANTALLA",
          "targetMs": 14200,
          "displayTime": "14,200ms",
          "memory": "CPU AL 100%",
          "cacheMisses": "2,525 QUERIES",
          "bottleneck": "COLAPSO DE LUNES"
        }
      }
    },
    {
      "id": "s06_cost",
      "type": "cost_ticker",
      "duration": 9.7,
      "voiceover": "Casi todas las empresas que duplican el tamaño de su servidor en realidad solo están pagando por ocultar este error.",
      "visual_cue": "Ahorro al evitar escalar hardware innecesariamente en AWS/RDS",
      "props": {
        "voiceover": "Casi todas las empresas que duplican el tamaño de su servidor en realidad solo están pagando por ocultar este error.",
        "title": "HARDWARE CARO VS CÓDIGO LIMPIO",
        "subtitle": "POR QUÉ SUBIR LA RAM NO ARREGLA UN BUCLE N+1",
        "cloudCost": 980,
        "initialCost": 140,
        "breakdown": [
          {
            "name": "Subir instancia RDS por culpa de N+1",
            "cost": "$840/mes",
            "sub": "Pagar más servidor para correr código ineficiente",
            "color": "#ef4444"
          },
          {
            "name": "Horas de equipo esperando pantallas lentas",
            "cost": "DIARIO",
            "sub": "Fricción constante en operación interna",
            "color": "#fbbf24"
          }
        ],
        "bareMetalCost": "$140/mes",
        "takeaway": "OPTIMIZA EL CÓDIGO ANTES DE AGRANDAR EL SERVIDOR"
      }
    },
    {
      "id": "s07_cta",
      "type": "kinetic_hook",
      "duration": 9.9,
      "voiceover": "Si tu sistema se fue poniendo lento a medida que sumaste clientes, escríbeme y encontramos qué consulta lo está ahogando.",
      "visual_cue": "Cierre de diagnóstico sutil con palabra clave LENTO",
      "props": {
        "voiceover": "Si tu sistema se fue poniendo lento a medida que sumaste clientes, escríbeme y encontramos qué consulta lo está ahogando.",
        "badge": "OPTIMIZACIÓN DE BACKEND Y ORM",
        "lines": [
          {
            "text": "NO PAGUES MÁS RAM",
            "color": "#ffffff"
          },
          {
            "text": "POR UN BUCLE ROTO",
            "color": "#10b981"
          }
        ],
        "subtitle": "DETECCIÓN DE N+1 · PERFILADO SQL · ESCALABILIDAD",
        "ctaKeyword": "LENTO",
        "ctaNote": "Auditamos las trazas de tu backend y destrabamos las pantallas lentas en días."
      }
    }
  ]
};
