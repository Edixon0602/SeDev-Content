window.__DEFAULT_MANIFEST__ = {
  "title": "[04] El embudo roto: perder clientes de $2,000 por tardar 4 horas en responder",
  "category": "INTAKE & AUTOMATIZACIÓN B2B",
  "pilar": "Dolor de Negocio & SaaS Trap",
  "slug": "sedev_04_lead_intake_18_segundos",
  "introType": "DISASTER MONITOR",
  "ctaKeyword": "INTAKE",
  "fps": 30,
  "output": "animaciones/output_clips/sedev_04_lead_intake_18_segundos.mp4",
  "scenes": [
    {
      "id": "s01_hook",
      "type": "disaster_monitor",
      "duration": 11.1,
      "voiceover": "Gastas miles de dólares en anuncios para que un cliente llene tu formulario... y tu equipo le responde cuatro horas después.",
      "visual_cue": "Monitor de caída de conversión por cada minuto de demora en contactar al lead",
      "props": {
        "voiceover": "Gastas miles de dólares en anuncios para que un cliente llene tu formulario... y tu equipo le responde cuatro horas después.",
        "title": "FUGA DE PROSPECTOS EN ADMISIÓN",
        "subtitle": "DECAIMIENTO DE CONVERSIÓN POR LATENCIA HUMANA",
        "crashedStatus": "ALERTA COMERCIAL: 78% DE LEADS SE ENFRÍAN DESPUÉS DE 15 MIN",
        "latencyNormal": 18,
        "latencyCrash": 14400,
        "logs": [
          {
            "time": "14:02",
            "level": "INFO",
            "text": "Nuevo prospecto calificado llenó formulario ($2,500)",
            "color": "#10b981"
          },
          {
            "time": "15:30",
            "level": "WARN",
            "text": "88 min sin respuesta: el prospecto agendó con competidor",
            "color": "#fbbf24"
          },
          {
            "time": "18:15",
            "level": "CRIT",
            "text": "Primer mensaje enviado 4h tarde: 'Ya contratamos a otro'",
            "color": "#ef4444"
          }
        ]
      }
    },
    {
      "id": "s02_cost",
      "type": "cost_ticker",
      "duration": 8.6,
      "voiceover": "Cuando finalmente le escriben, ese cliente ya habló con tu competencia y ya pagó en otro lado.",
      "visual_cue": "Presupuesto publicitario quemado por fricción en el agendamiento",
      "props": {
        "voiceover": "Cuando finalmente le escriben, ese cliente ya habló con tu competencia y ya pagó en otro lado.",
        "title": "COSTO DE RESPONDER TARDE",
        "subtitle": "PUBLICIDAD PAGADA QUE NO LLEGA AL CALENDARIO",
        "cloudCost": 3400,
        "initialCost": 0,
        "breakdown": [
          {
            "name": "Consultas perdidas por demora (>30 min)",
            "cost": "$2,500/mes",
            "sub": "Prospectos con urgencia que no esperan",
            "color": "#ef4444"
          },
          {
            "name": "Seguimiento manual olvidado en CRM",
            "cost": "$900/mes",
            "sub": "Leads sin segundo toque ni recordatorio",
            "color": "#fbbf24"
          }
        ],
        "bareMetalCost": "18 seg",
        "takeaway": "EL QUE RESPONDE Y AGENDA PRIMERO SE QUEDA EL CLIENTE"
      }
    },
    {
      "id": "s03_arch",
      "type": "network_pipeline",
      "duration": 9.7,
      "voiceover": "El problema casi nunca es la campaña; es el pasillo manual entre el formulario, el CRM y el calendario.",
      "visual_cue": "Tubería de admisión en 18 segundos: Webhook -> Calificación IA -> CRM + WhatsApp",
      "props": {
        "voiceover": "El problema casi nunca es la campaña; es el pasillo manual entre el formulario, el CRM y el calendario.",
        "title": "PIPELINE DE ADMISIÓN EN 18 SEGUNDOS",
        "subtitle": "CALIFICACIÓN, REGISTRO Y AGENDA SIN MANOS",
        "stages": [
          {
            "name": "FORMULARIO / LLAMADA ENTRADA",
            "tag": "Captura instantánea vía Webhook sin espera",
            "metric": "0.4 s",
            "color": "#38bdf8"
          },
          {
            "name": "CLASIFICADOR DE INTENCIÓN",
            "tag": "Extrae urgencia, presupuesto y crea ficha CRM",
            "metric": "4.2 s",
            "color": "#fbbf24"
          },
          {
            "name": "WHATSAPP INTERACTIVO + AGENDA",
            "tag": "Envía horarios disponibles y confirma cita",
            "metric": "18.0 s",
            "color": "#10b981"
          }
        ],
        "conclusion": "El prospecto recibe respuesta personalizada y agenda mientras sigue con el teléfono en la mano."
      }
    },
    {
      "id": "s04_code",
      "type": "terminal_split",
      "duration": 12.4,
      "voiceover": "Automatizamos ese flujo completo: apenas entra la consulta, el sistema valida el caso, crea la ficha y le manda por WhatsApp el link de agenda.",
      "visual_cue": "Código del orquestador de intake frente al proceso manual en correo",
      "props": {
        "voiceover": "Automatizamos ese flujo completo: apenas entra la consulta, el sistema valida el caso, crea la ficha y le manda por WhatsApp el link de agenda.",
        "title": "ORQUESTACIÓN DE INTAKE B2B",
        "subtitle": "RESPUESTA INMEDIATA CON CONTEXTO REAL",
        "leftTitle": "FLUJO MANUAL (CORREO -> EXCEL -> WHATSAPP)",
        "leftCode": "// El formulario cae a un email general\n// Recepción lo ve 3 horas después\n// Copia el teléfono a mano y pregunta horario\n// Tasa de asistencia a llamada: 22%",
        "rightTitle": "PIPELINE AUTOMATIZADO (18 SEGUNDOS)",
        "rightCode": "const score = await qualifyIntake(lead); await crm.upsertContact({ ...lead, score }); await whatsapp.sendInteractiveCalendar(lead.phone); await notifyTeamChannel(lead, score);",
        "diffNote": "De 4 horas de espera a 18 segundos con agenda"
      }
    },
    {
      "id": "s05_race",
      "type": "latency_scale",
      "duration": 11.6,
      "voiceover": "Si el cliente no agenda en dos horas, el sistema hace el seguimiento solo y avisa al equipo únicamente cuando la cita está confirmada.",
      "visual_cue": "Escala de velocidad de respuesta comercial y su impacto directo en tasa de cierre",
      "props": {
        "voiceover": "Si el cliente no agenda en dos horas, el sistema hace el seguimiento solo y avisa al equipo únicamente cuando la cita está confirmada.",
        "title": "IMPACTO DEL TIEMPO DE RESPUESTA EN VENTAS",
        "subtitle": "PROBABILIDAD DE AGENDAR SEGÚN LA DEMORA",
        "tiers": [
          {
            "name": "INTAKE AUTOMÁTICO SEDEV (18 SEG)",
            "latency": "68% CIERRE",
            "ratio": 0.12,
            "color": "#10b981",
            "human": "Contacto inmediato con link de calendario en WhatsApp"
          },
          {
            "name": "RESPUESTA EN 5 MINUTOS",
            "latency": "42% CIERRE",
            "ratio": 0.28,
            "color": "#38bdf8",
            "human": "Todavía recuerda tu anuncio y compara opciones"
          },
          {
            "name": "RESPUESTA EN 30 MINUTOS",
            "latency": "19% CIERRE",
            "ratio": 0.55,
            "color": "#f59e0b",
            "human": "Ya dejó sus datos en otros 2 competidores"
          },
          {
            "name": "SEGUIMIENTO MANUAL (4+ HORAS)",
            "latency": "6% CIERRE",
            "ratio": 1,
            "color": "#ef4444",
            "human": "Lead frío: presupuesto publicitario desperdiciado"
          }
        ],
        "conclusion": "Responder en los primeros 30 segundos triplica las citas agendadas con el mismo presupuesto."
      }
    },
    {
      "id": "s06_mem",
      "type": "memory_layout",
      "duration": 9.2,
      "voiceover": "Además reconcilia cada fuente para que dirección sepa exactamente qué canal trae clientes pagados y cuál solo trae curiosos.",
      "visual_cue": "Trazabilidad completa desde el clic del anuncio hasta el pago de la consulta",
      "props": {
        "voiceover": "Además reconcilia cada fuente para que dirección sepa exactamente qué canal trae clientes pagados y cuál solo trae curiosos.",
        "badge": "TRAZABILIDAD DE PUNTA A PUNTA",
        "title": "MÉTRICAS LIMPIAS EN DIRECCIÓN",
        "items": [
          {
            "addr": "TIEMPO_RTA",
            "name": "Mediana de respuesta: 18s",
            "value": "Funciona 24/7 incluyendo fines de semana"
          },
          {
            "addr": "NO_SHOWS",
            "name": "Recordatorios inteligentes",
            "value": "Confirmación y reprogramación automática"
          },
          {
            "addr": "ROI_CANAL",
            "name": "Atribución exacta en CRM",
            "value": "Conciliación entre anuncios, citas y pagos"
          }
        ],
        "resolutionTitle": "CERO PROSPECTOS PERDIDOS EN EL LIMBO",
        "resolutionSub": "Tu equipo entra a la llamada con el expediente ya armado"
      }
    },
    {
      "id": "s07_cta",
      "type": "kinetic_hook",
      "duration": 9.9,
      "voiceover": "Si sientes que se te enfrían prospectos entre el formulario y el calendario, escríbeme y auditamos tu flujo de entrada.",
      "visual_cue": "Cierre de diagnóstico sutil con palabra clave INTAKE",
      "props": {
        "voiceover": "Si sientes que se te enfrían prospectos entre el formulario y el calendario, escríbeme y auditamos tu flujo de entrada.",
        "badge": "SISTEMAS DE ADMISIÓN Y CRM",
        "lines": [
          {
            "text": "CIERRA EL HUECO EN",
            "color": "#ffffff"
          },
          {
            "text": "TU EMBUDO DE VENTAS",
            "color": "#10b981"
          }
        ],
        "subtitle": "INTAKE AUTOMATIZADO · CRM · AGENDA Y RECORDATORIOS",
        "ctaKeyword": "INTAKE",
        "ctaNote": "Mapeamos dónde se están frenando tus leads hoy y cómo conectarlo de punta a punta."
      }
    }
  ]
};
