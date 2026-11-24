window.__DEFAULT_MANIFEST__ = {
  "title": "[13] El bot de 60 líneas que detecta quién está buscando contratar hoy mismo",
  "category": "SISTEMAS DE PROSPECCIÓN & IA",
  "pilar": "Building in Public (Tus Productos)",
  "slug": "sedev_13_radar_inbound_intent_ai",
  "introType": "ARCHITECTURE FLOW",
  "ctaKeyword": "RADAR",
  "fps": 30,
  "output": "animaciones/output_clips/sedev_13_radar_inbound_intent_ai.mp4",
  "scenes": [
    {
      "id": "s01_hook",
      "type": "storage_engine_viz",
      "duration": 10.7,
      "voiceover": "Mientras tu competencia pierde cuatro horas al día mandando mensajes fríos que nadie responde, este script me avisa quién busca contratar hoy.",
      "visual_cue": "Grafo vectorial HNSW clasificando intención de compra en tiempo real entre miles de posts",
      "props": {
        "voiceover": "Mientras tu competencia pierde cuatro horas al día mandando mensajes fríos que nadie responde, este script me avisa quién busca contratar hoy.",
        "mode": "hnsw",
        "badge": "RADAR DE INTENCIÓN B2B CON IA",
        "title": "DETECCIÓN DE COMPRADORES EN TIEMPO REAL",
        "subtitle": "FILTRADO SEMÁNTICO DE URGENCIA Y PRESUPUESTO"
      }
    },
    {
      "id": "s02_disaster",
      "type": "disaster_monitor",
      "duration": 10.7,
      "voiceover": "Mandar mil correos genéricos por semana ya no funciona: terminas en la carpeta de spam rogándole a gente que no necesita nada.",
      "visual_cue": "Monitor de campañas de spam en frío con 0.2% de respuesta y dominios quemados",
      "props": {
        "voiceover": "Mandar mil correos genéricos por semana ya no funciona: terminas en la carpeta de spam rogándole a gente que no necesita nada.",
        "title": "LA MUERTE DEL OUTBOUND MASIVO CIEGO",
        "subtitle": "MILES DE MENSAJES ENVIADOS A QUIEN NO TIENE EL DOLOR HOY",
        "crashedStatus": "TASA DE RESPUESTA EN FRÍO: 0.3% · DOMINIO EN LISTA NEGRA",
        "latencyNormal": 5,
        "latencyCrash": 9500,
        "logs": [
          {
            "time": "SPAM_01",
            "level": "WARN",
            "text": "1,000 mensajes enviados en LinkedIn sin contexto",
            "color": "#fbbf24"
          },
          {
            "time": "SPAM_02",
            "level": "ERR",
            "text": "997 ignorados · 4 horas diarias de equipo perdidas",
            "color": "#ef4444"
          },
          {
            "time": "RADAR",
            "level": "INFO",
            "text": "1 fundador publicó hace 3 min: 'Urgente: se cayó mi webhook'",
            "color": "#10b981"
          }
        ]
      }
    },
    {
      "id": "s03_code",
      "type": "terminal_split",
      "duration": 12.2,
      "voiceover": "En cambio, todos los días hay fundadores publicando que se les rompió Stripe, que su base de datos colapsó o que necesitan un desarrollador urgente.",
      "visual_cue": "Código del clasificador con schema estructurado separando ruido de compradores reales",
      "props": {
        "voiceover": "En cambio, todos los días hay fundadores publicando que se les rompió Stripe, que su base de datos colapsó o que necesitan un desarrollador urgente.",
        "title": "FILTRADO DE SEÑAL VS RUIDO",
        "subtitle": "CLASIFICACIÓN CON STRUCTURED OUTPUTS",
        "leftTitle": "BÚSQUEDA MANUAL (PERDER HORAS SCROLLEANDO)",
        "leftCode": "// Entrar a 15 grupos y buscar palabras sueltas\n// 95% son estudiantes pidiendo tareas gratis\n// Cuando encuentras un cliente real, ya pasaron 6 horas\n// y tiene 40 comentarios antes que el tuyo",
        "rightTitle": "WORKER + CLASIFICADOR DE INTENCIÓN",
        "rightCode": "const intent = await classifyPost(post, {\n  hasBudget: z.boolean(),\n  urgencyScore: z.number().min(1).max(10),\n  technicalPain: z.string()\n});\nif (intent.hasBudget && intent.urgencyScore >= 8) alertMe(post);",
        "diffNote": "Filtra el 97% de basura y avisa en < 3 minutos"
      }
    },
    {
      "id": "s04_race",
      "type": "versus_race",
      "duration": 10.7,
      "voiceover": "Cuando el bot detecta una urgencia real con presupuesto, me manda la alerta al teléfono antes de que tenga un solo comentario.",
      "visual_cue": "Carrera: Llegar en los primeros 3 minutos con solución técnica vs llegar 8 horas tarde",
      "props": {
        "voiceover": "Cuando el bot detecta una urgencia real con presupuesto, me manda la alerta al teléfono antes de que tenga un solo comentario.",
        "title": "VENTAJA DE LLEGAR PRIMERO",
        "subtitle": "TIEMPO DESDE PUBLICACIÓN HASTA PRIMER CONTACTO",
        "sideA": {
          "name": "RADAR AUTOMÁTICO 24/7",
          "tag": "ALERTA EN < 3 MINUTOS",
          "targetMs": 180,
          "displayTime": "3 MIN",
          "memory": "0 SPAM ENVIADO",
          "cacheMisses": "ALTA INTENCIÓN",
          "speedup": "PRIMER LUGAR"
        },
        "sideB": {
          "name": "BUSCAR A MANO EN REDES",
          "tag": "CUANDO TE QUEDA TIEMPO LIBRE",
          "targetMs": 28800,
          "displayTime": "8 HORAS TARDE",
          "memory": "40 RESPUESTAS ANTES",
          "cacheMisses": "OPORTUNIDAD FRÍA",
          "bottleneck": "LLEGAS ÚLTIMO"
        }
      }
    },
    {
      "id": "s05_mem",
      "type": "memory_layout",
      "duration": 9,
      "voiceover": "No llegas a vender humo; llegas cinco minutos después del incendio con el diagnóstico exacto de cómo resolverlo.",
      "visual_cue": "Estructura de la alerta que llega al celular: Dolor, Stack, Presupuesto y Link",
      "props": {
        "voiceover": "No llegas a vender humo; llegas cinco minutos después del incendio con el diagnóstico exacto de cómo resolverlo.",
        "badge": "FICHA DE OPORTUNIDAD EN VIVO",
        "title": "QUÉ ENTREGA CADA ALERTA DEL RADAR",
        "items": [
          {
            "addr": "DOLOR",
            "name": "Checkout con error en webhooks",
            "value": "Stack detectado: Node.js + PostgreSQL + Stripe"
          },
          {
            "addr": "SCORE_9.4",
            "name": "Urgencia alta · Comprador directo",
            "value": "Publicado por Founder buscando solución esta semana"
          },
          {
            "addr": "ACCIÓN",
            "name": "Borrador de diagnóstico técnico",
            "value": "Listo para abrir conversación con autoridad"
          }
        ],
        "resolutionTitle": "CERO RUEGOS EN FRÍO · SOLO DEMANDA ACTIVA",
        "resolutionSub": "Conecta tu servicio con quien ya tiene el problema hoy"
      }
    },
    {
      "id": "s06_cost",
      "type": "cost_ticker",
      "duration": 8,
      "voiceover": "Un solo proyecto cerrado por llegar a tiempo paga diez años de servidor de este bot.",
      "visual_cue": "Costo de correr el radar ($5/mes en API) vs valor de 1 cliente B2B ($1,500+)",
      "props": {
        "voiceover": "Un solo proyecto cerrado por llegar a tiempo paga diez años de servidor de este bot.",
        "title": "ECONOMÍA DEL RADAR INBOUND",
        "subtitle": "COSTO OPERATIVO VS TICKET B2B CERRADO",
        "cloudCost": 1500,
        "initialCost": 5,
        "breakdown": [
          {
            "name": "1 solo proyecto B2B captado a tiempo",
            "cost": "+$1,500",
            "sub": "Cliente que ya estaba buscando contratar",
            "color": "#10b981"
          },
          {
            "name": "4 horas diarias de prospección ahorradas",
            "cost": "80h/mes",
            "sub": "Tu tiempo enfocado en construir y cerrar",
            "color": "#fbbf24"
          }
        ],
        "bareMetalCost": "$5/mes",
        "takeaway": "EL MEJOR LEAD ES EL QUE ACABA DE PEDIR AYUDA"
      }
    },
    {
      "id": "s07_cta",
      "type": "kinetic_hook",
      "duration": 10.5,
      "voiceover": "Si vendes software, consultoría o servicios B2B y quieres instalar este radar para tu nicho, escríbeme la palabra RADAR por privado.",
      "visual_cue": "Cierre de diagnóstico sutil con palabra clave RADAR",
      "props": {
        "voiceover": "Si vendes software, consultoría o servicios B2B y quieres instalar este radar para tu nicho, escríbeme la palabra RADAR por privado.",
        "badge": "SISTEMAS DE CAPTACIÓN TÉCNICA",
        "lines": [
          {
            "text": "LLEGA PRIMERO DONDE",
            "color": "#ffffff"
          },
          {
            "text": "YA HAY PRESUPUESTO",
            "color": "#10b981"
          }
        ],
        "subtitle": "RADAR B2B · CLASIFICACIÓN IA · ALERTAS EN TIEMPO REAL",
        "ctaKeyword": "RADAR",
        "ctaNote": "Te muestro cómo adaptarlo a las palabras clave y foros donde están tus clientes."
      }
    }
  ]
};
