window.__DEFAULT_MANIFEST__ = {
  "title": "[05] Perder 3 horas al día copiando facturas entre pasarela y contabilidad",
  "category": "INTEGRACIONES & FINANZAS",
  "pilar": "Proof of Work & Casos Reales",
  "slug": "sedev_05_facturacion_3_horas_webhook",
  "introType": "KINETIC SLAM",
  "ctaKeyword": "FLUJO",
  "fps": 30,
  "output": "animaciones/output_clips/sedev_05_facturacion_3_horas_webhook.mp4",
  "scenes": [
    {
      "id": "s01_hook",
      "type": "kinetic_slam",
      "duration": 10.5,
      "voiceover": "Tener a una persona inteligente tres horas al día copiando números de una pantalla a otra es quemar nómina en cámara lenta.",
      "visual_cue": "Golpe tipográfico contra la doble digitación manual de facturas",
      "props": {
        "voiceover": "Tener a una persona inteligente tres horas al día copiando números de una pantalla a otra es quemar nómina en cámara lenta.",
        "badge": "FRICCIÓN ADMINISTRATIVA",
        "lines": [
          {
            "text": "3 HORAS AL DÍA",
            "color": "#ffffff"
          },
          {
            "text": "COPIANDO FACTURAS",
            "color": "#ef4444",
            "strike": true
          },
          {
            "text": "ES QUEMAR NÓMINA",
            "highlight": "#fbbf24",
            "textColor": "#050505"
          }
        ],
        "stat": "65 HORAS AL MES EN DOBLE DIGITACIÓN HUMANA",
        "subtitle": "PASARELA DE PAGOS DESCONECTADA DEL SISTEMA CONTABLE"
      }
    },
    {
      "id": "s02_disaster",
      "type": "disaster_monitor",
      "duration": 10.3,
      "voiceover": "Vendes en tu web, cobras por pasarela y después alguien tiene que reescribir cada recibo en el sistema contable y fiscal.",
      "visual_cue": "Monitor de atrasos en facturación y errores de digitación en cierres de mes",
      "props": {
        "voiceover": "Vendes en tu web, cobras por pasarela y después alguien tiene que reescribir cada recibo en el sistema contable y fiscal.",
        "title": "CUELLO DE BOTELLA EN FACTURACIÓN",
        "subtitle": "DOBLE DIGITACIÓN MANUAL ENTRE 3 PLATAFORMAS",
        "crashedStatus": "CIERRE DE MES ATRASADO: 140 PAGOS SIN CONCILIAR",
        "latencyNormal": 5,
        "latencyCrash": 10800,
        "logs": [
          {
            "time": "16:20",
            "level": "WARN",
            "text": "48 órdenes pagadas en pasarela esperando factura",
            "color": "#fbbf24"
          },
          {
            "time": "17:05",
            "level": "ERR",
            "text": "Error de tipeo en RUC/NIT generó rechazo fiscal",
            "color": "#ef4444"
          },
          {
            "time": "18:40",
            "level": "CRIT",
            "text": "Diferencia de $1,120 entre extracto bancario y ERP",
            "color": "#f87171"
          }
        ]
      }
    },
    {
      "id": "s03_arch",
      "type": "network_pipeline",
      "duration": 8.2,
      "voiceover": "Cuando una tarea sigue exactamente las mismas reglas todos los días, no debería hacerla un humano.",
      "visual_cue": "Tubería de conciliación y facturación en 380ms sin intervención humana",
      "props": {
        "voiceover": "Cuando una tarea sigue exactamente las mismas reglas todos los días, no debería hacerla un humano.",
        "title": "CONCILIACIÓN Y TIMBRADO AUTOMÁTICO",
        "subtitle": "WEBHOOK -> VALIDACIÓN -> API FISCAL -> CLIENTE",
        "stages": [
          {
            "name": "WEBHOOK DE PAGO CONFIRMADO",
            "tag": "Stripe / Pasarela local / Transferencia",
            "metric": "40 ms",
            "color": "#38bdf8"
          },
          {
            "name": "MOTOR DE REGLAS E IMPUESTOS",
            "tag": "Valida RUC/NIT, calcula IVA y cruza orden",
            "metric": "110 ms",
            "color": "#fbbf24"
          },
          {
            "name": "TIMBRADO FISCAL + ENVÍO PDF",
            "tag": "Registra en ERP y envía comprobante al cliente",
            "metric": "380 ms",
            "color": "#10b981"
          }
        ],
        "conclusion": "Cada venta queda facturada, archivada y conciliada en menos de medio segundo."
      }
    },
    {
      "id": "s04_code",
      "type": "terminal_split",
      "duration": 11.4,
      "voiceover": "Conectamos un servicio en segundo plano que escucha el pago, valida los datos fiscales, emite el comprobante y lo envía en medio segundo.",
      "visual_cue": "Código del daemon de facturación automática frente a los pasos manuales",
      "props": {
        "voiceover": "Conectamos un servicio en segundo plano que escucha el pago, valida los datos fiscales, emite el comprobante y lo envía en medio segundo.",
        "title": "AUTOMATIZACIÓN DE FACTURACIÓN",
        "subtitle": "CERO INTERVENCIÓN HUMANA EN CASOS ESTÁNDAR",
        "leftTitle": "PROCESO MANUAL (8 MINUTOS POR VENTA)",
        "leftCode": "// 1. Revisar si entró el pago en la pasarela\n// 2. Copiar cédula/RUC, dirección y montos\n// 3. Crear factura en portal contable/fiscal\n// 4. Descargar PDF y mandarlo por correo",
        "rightTitle": "DAEMON DE INTEGRACIÓN (380ms)",
        "rightCode": "onPaymentConfirmed(async (order) => {\n  const invoice = await taxApi.issueInvoice(order);\n  await erp.markReconciled(order.id, invoice.id);\n  await mailer.sendReceiptPdf(order.email, invoice);\n});",
        "diffNote": "De 8 minutos por factura a 380 milisegundos"
      }
    },
    {
      "id": "s05_race",
      "type": "versus_race",
      "duration": 10.9,
      "voiceover": "Si un pago viene con un dato incompleto, el sistema no se frena: separa solo esa excepción y avisa quién debe corregirlo.",
      "visual_cue": "Carrera de procesamiento de 200 ventas: Daemon (4s) vs Manual (26 horas)",
      "props": {
        "voiceover": "Si un pago viene con un dato incompleto, el sistema no se frena: separa solo esa excepción y avisa quién debe corregirlo.",
        "title": "TIEMPO PARA PROCESAR 200 VENTAS",
        "subtitle": "EMISIÓN Y CONCILIACIÓN CONTABLE",
        "sideA": {
          "name": "INTEGRACIÓN POR API",
          "tag": "TIMBRADO Y ARCHIVO AUTOMÁTICO",
          "targetMs": 380,
          "displayTime": "380ms",
          "memory": "0 ERRORES DE DEDO",
          "cacheMisses": "100% CONCILIADO",
          "speedup": "AUTOMÁTICO 24/7"
        },
        "sideB": {
          "name": "DIGITACIÓN A MANO",
          "tag": "COPIAR Y PEGAR ENTRE PANTALLAS",
          "targetMs": 480000,
          "displayTime": "8 MIN / C/U",
          "memory": "FATIGA HUMANA",
          "cacheMisses": "NOTAS DE CRÉDITO",
          "bottleneck": "3 HORAS PERDIDAS/DÍA"
        }
      }
    },
    {
      "id": "s06_cost",
      "type": "cost_ticker",
      "duration": 10.9,
      "voiceover": "El equipo administrativo deja de ser un robot de copiar y pegar y pasa a enfocarse en lo que realmente mueve la aguja.",
      "visual_cue": "Ahorro anual en horas operativas y multas/reprocesos evitados",
      "props": {
        "voiceover": "El equipo administrativo deja de ser un robot de copiar y pegar y pasa a enfocarse en lo que realmente mueve la aguja.",
        "title": "RETORNO OPERATIVO DIRECTO",
        "subtitle": "HORAS LIBERADAS DESDE LA PRIMERA SEMANA",
        "cloudCost": 1450,
        "initialCost": 0,
        "breakdown": [
          {
            "name": "65 horas mensuales de doble carga",
            "cost": "$950/mes",
            "sub": "Personal atado a tareas mecánicas",
            "color": "#ef4444"
          },
          {
            "name": "Reprocesos y anulaciones por error",
            "cost": "$500/mes",
            "sub": "Facturas emitidas con montos o datos mal",
            "color": "#fbbf24"
          }
        ],
        "bareMetalCost": "0 Horas",
        "takeaway": "INTEGRACIÓN LIMPIA ENTRE TUS SISTEMAS ACTUALES"
      }
    },
    {
      "id": "s07_cta",
      "type": "kinetic_hook",
      "duration": 9,
      "voiceover": "Si en tu operación todavía copian datos a mano entre dos programas, escríbeme y vemos cómo dejarlos conectados.",
      "visual_cue": "Cierre de diagnóstico sutil con palabra clave FLUJO",
      "props": {
        "voiceover": "Si en tu operación todavía copian datos a mano entre dos programas, escríbeme y vemos cómo dejarlos conectados.",
        "badge": "INTEGRACIÓN DE SISTEMAS B2B",
        "lines": [
          {
            "text": "CONECTA TUS SISTEMAS",
            "color": "#ffffff"
          },
          {
            "text": "ELIMINA EL COPY-PASTE",
            "color": "#10b981"
          }
        ],
        "subtitle": "APIS · FACTURACIÓN AUTOMÁTICA · CONCILIACIÓN",
        "ctaKeyword": "FLUJO",
        "ctaNote": "Revisamos qué plataformas usas hoy y cómo automatizar el puente entre ellas."
      }
    }
  ]
};
