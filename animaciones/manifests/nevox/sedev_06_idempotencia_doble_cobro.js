window.__DEFAULT_MANIFEST__ = {
  "title": "[06] El doble clic que cobró 84 veces la misma tarjeta (Idempotency Keys)",
  "category": "PAGOS & ARQUITECTURA FINTECH",
  "pilar": "Proof of Work & Casos Reales",
  "slug": "sedev_06_idempotencia_doble_cobro",
  "introType": "DISASTER MONITOR",
  "ctaKeyword": "PAGOS",
  "fps": 30,
  "output": "animaciones/output_clips/sedev_06_idempotencia_doble_cobro.mp4",
  "scenes": [
    {
      "id": "s01_hook",
      "type": "disaster_monitor",
      "duration": 12,
      "voiceover": "Un cliente con mal internet le da tres veces seguidas al botón de pagar... y tu sistema le cobra tres veces la tarjeta.",
      "visual_cue": "Monitor de pasarela disparando cobros duplicados y alertas de contracargo",
      "props": {
        "voiceover": "Un cliente con mal internet le da tres veces seguidas al botón de pagar... y tu sistema le cobra tres veces la tarjeta.",
        "title": "FALLO CRÍTICO: COBROS DUPLICADOS",
        "subtitle": "PETICIONES REPETIDAS SIN LLAVE DE IDEMPOTENCIA",
        "crashedStatus": "ALERTA STRIPE: 84 CARGOS DUPLICADOS · RIESGO DE BLOQUEO",
        "latencyNormal": 180,
        "latencyCrash": 4900,
        "logs": [
          {
            "time": "19:02:11.10",
            "level": "WARN",
            "text": "POST /pay recibido (Cliente #409 - $120.00)",
            "color": "#fbbf24"
          },
          {
            "time": "19:02:11.18",
            "level": "ERR",
            "text": "Retry de red duplicó POST /pay antes del ACK",
            "color": "#ef4444"
          },
          {
            "time": "19:02:12.04",
            "level": "CRIT",
            "text": "3 cargos ejecutados en banco para la misma orden",
            "color": "#f87171"
          }
        ]
      }
    },
    {
      "id": "s02_cost",
      "type": "cost_ticker",
      "duration": 9.7,
      "voiceover": "Deshabilitar el botón en la pantalla no sirve de nada cuando la red del celular reintenta la petición por debajo.",
      "visual_cue": "Costo de comisiones no devueltas, disputas y penalización en Stripe",
      "props": {
        "voiceover": "Deshabilitar el botón en la pantalla no sirve de nada cuando la red del celular reintenta la petición por debajo.",
        "title": "EL COSTO DE NO SER IDEMPOTENTE",
        "subtitle": "COMISIONES PERDIDAS Y DISPUTAS BANCARIAS",
        "cloudCost": 2840,
        "initialCost": 0,
        "breakdown": [
          {
            "name": "Multas por contracargos ($15 c/u)",
            "cost": "$1,260",
            "sub": "Clientes reclamando cobros dobles al banco",
            "color": "#ef4444"
          },
          {
            "name": "Comisiones de pasarela no reembolsables",
            "cost": "$1,580",
            "sub": "El procesador cobra aunque devuelvas el dinero",
            "color": "#fbbf24"
          }
        ],
        "bareMetalCost": "0 Dobles",
        "takeaway": "EL FRONTEND NUNCA ES SUFICIENTE PARA PROTEGER UN PAGO"
      }
    },
    {
      "id": "s03_arch",
      "type": "cache_flow_viz",
      "duration": 8.2,
      "voiceover": "En sistemas financieros reales usamos llaves de idempotencia: cada intento de compra lleva una huella única.",
      "visual_cue": "Filtro y caché de Idempotency-Key en Redis bloqueando reintentos duplicados en 0ms",
      "props": {
        "voiceover": "En sistemas financieros reales usamos llaves de idempotencia: cada intento de compra lleva una huella única.",
        "mode": "swr",
        "badge": "CANDADO ATÓMICO DE IDEMPOTENCIA",
        "title": "EJECUCIÓN EXACTAMENTE UNA VEZ (EXACTLY-ONCE)",
        "subtitle": "1 COBRO EN BANCO · REINTENTOS SERVIDOS DESDE CACHÉ"
      }
    },
    {
      "id": "s04_code",
      "type": "terminal_split",
      "duration": 14.1,
      "voiceover": "Si entran tres peticiones iguales en el mismo milisegundo, la base de datos procesa la primera y a las otras dos les devuelve el mismo recibo sin volver a cobrar.",
      "visual_cue": "Código sin protección vs transacción con Idempotency-Key y constraint UNIQUE",
      "props": {
        "voiceover": "Si entran tres peticiones iguales en el mismo milisegundo, la base de datos procesa la primera y a las otras dos les devuelve el mismo recibo sin volver a cobrar.",
        "title": "BLINDAJE DE TRANSACCIONES",
        "subtitle": "PROTECCIÓN EN BACKEND Y BASE DE DATOS",
        "leftTitle": "ENDPOINT VULNERABLE A REINTENTOS",
        "leftCode": "app.post('/pay', async (req, res) => {\n  // Si entra 2 veces en paralelo, cobra 2 veces\n  const charge = await stripe.charges.create(req.body);\n  await db.insert(payments).values(charge);\n});",
        "rightTitle": "ENDPOINT CON IDEMPOTENCY KEY",
        "rightCode": "const locked = await redis.set(idemKey, 'LOCK', 'NX', 'EX', 60);\nif (!locked) return res.json(await getSavedReceipt(idemKey));\nconst charge = await stripe.charges.create(body, { idempotencyKey: idemKey });",
        "diffNote": "Garantía matemática de 1 solo cobro por orden"
      }
    },
    {
      "id": "s05_race",
      "type": "versus_race",
      "duration": 9.7,
      "voiceover": "Así puedes reintentar webhooks o pagos caídos diez veces seguidas con la certeza matemática de que jamás duplicarás un cargo.",
      "visual_cue": "Simulación de ráfaga de 10 reintentos de red: 1 cobro limpio vs desastre",
      "props": {
        "voiceover": "Así puedes reintentar webhooks o pagos caídos diez veces seguidas con la certeza matemática de que jamás duplicarás un cargo.",
        "title": "PRUEBA DE RÁFAGA DE REINTENTOS",
        "subtitle": "10 CLICS / RETRIES SIMULTÁNEOS DE RED",
        "sideA": {
          "name": "CON IDEMPOTENCY KEY",
          "tag": "1 COBRO + 9 RESPUESTAS CACHEADAS",
          "targetMs": 2.1,
          "displayTime": "1 COBRO",
          "memory": "0 CONTRACARGOS",
          "cacheMisses": "100% SEGURO",
          "speedup": "BLINDAJE TOTAL"
        },
        "sideB": {
          "name": "SOLO BLOQUEO EN BOTÓN UI",
          "tag": "CONDICIÓN DE CARRERA EN BACKEND",
          "targetMs": 4200,
          "displayTime": "3+ COBROS",
          "memory": "SALDO CORRUPTO",
          "cacheMisses": "RACE CONDITION",
          "bottleneck": "CUENTA SUSPENDIDA"
        }
      }
    },
    {
      "id": "s06_mem",
      "type": "memory_layout",
      "duration": 8.8,
      "voiceover": "Es un patrón que toma un día implementar y te ahorra miles de dólares en disputas y soporte.",
      "visual_cue": "Tabla de estados de idempotencia en memoria: STARTED -> COMPLETED -> CACHED",
      "props": {
        "voiceover": "Es un patrón que toma un día implementar y te ahorra miles de dólares en disputas y soporte.",
        "badge": "ESTADOS DE TRANSACCIÓN",
        "title": "REGISTRO INMUTABLE DE PAGOS",
        "items": [
          {
            "addr": "KEY_849_A",
            "name": "Estado: COMPLETED ($120)",
            "value": "Cobro único confirmado en Stripe"
          },
          {
            "addr": "RETRY_01",
            "name": "Detectado a los +35ms",
            "value": "Devuelve recibo existente sin tocar tarjeta"
          },
          {
            "addr": "RETRY_02",
            "name": "Detectado a los +90ms",
            "value": "Devuelve recibo existente sin tocar tarjeta"
          }
        ],
        "resolutionTitle": "PAGOS A PRUEBA DE MALA CONEXIÓN",
        "resolutionSub": "Cero cobros dobles aunque el usuario recargue la página"
      }
    },
    {
      "id": "s07_cta",
      "type": "kinetic_hook",
      "duration": 8.8,
      "voiceover": "Si manejas cobros, suscripciones o billeteras en tu sistema y quieres blindar tus transacciones, escríbeme por privado.",
      "visual_cue": "Cierre de diagnóstico sutil con palabra clave PAGOS",
      "props": {
        "voiceover": "Si manejas cobros, suscripciones o billeteras en tu sistema y quieres blindar tus transacciones, escríbeme por privado.",
        "badge": "ARQUITECTURA DE PAGOS Y FINTECH",
        "lines": [
          {
            "text": "BLINDA TUS COBROS",
            "color": "#ffffff"
          },
          {
            "text": "CONTRA REINTENTOS",
            "color": "#10b981"
          }
        ],
        "subtitle": "IDEMPOTENCIA · WEBHOOKS SEGUROS · CONCILIACIÓN",
        "ctaKeyword": "PAGOS",
        "ctaNote": "Auditamos tu flujo de checkout y webhooks para eliminar condiciones de carrera."
      }
    }
  ]
};
