window.__DEFAULT_MANIFEST__ = {
  "title": "[26] La trampa de la tasa de cambio: cómo proteger tu margen sin quebrar",
  "category": "CORTEX · MULTI-MONEDA & CAJA",
  "pilar": "Brecha Cambiaria & Protección de Margen",
  "slug": "nevox_26_cortex_brecha_cambiaria_bcv",
  "introType": "COST TICKER",
  "ctaKeyword": "MARGEN",
  "fps": 30,
  "output": "animaciones/output_clips/nevox_26_cortex_brecha_cambiaria_bcv.mp4",
  "scenes": [
    {
      "id": "s01_hook",
      "type": "cost_ticker",
      "duration": 5.5,
      "voiceover": "Vendes a tasa oficial pensando que estás ganando un treinta por ciento, pero cuando vas a reponer la mercancía ya no te alcanza.",
      "visual_cue": "Erosión de capital: Margen teórico en papel (+30%) vs Margen real al reponer inventario (-8%)",
      "props": {
        "voiceover": "Vendes a tasa oficial pensando que estás ganando un treinta por ciento, pero cuando vas a reponer la mercancía ya no te alcanza.",
        "title": "LA TRAMPA MATEMÁTICA DE LA DOBLE TASA",
        "subtitle": "ILUSIÓN DE GANANCIA VS DESCAPITALIZACIÓN REAL",
        "cloudCost": 30,
        "initialCost": -8,
        "breakdown": [
          {
            "name": "Margen teórico facturado a tasa oficial",
            "cost": "+30%",
            "sub": "Ganancia calculada en el papel",
            "color": "#00e5a0"
          },
          {
            "name": "Brecha de reposición con proveedores",
            "cost": "-38%",
            "sub": "Diferencia de costo de reposición del inventario",
            "color": "#ef4444"
          }
        ],
        "bareMetalCost": "-8% PÉRDIDA NETA",
        "takeaway": "TRABAJAR SIN CONTROL DE COSTOS DE REPOSICIÓN TE COME EL CAPITAL"
      }
    },
    {
      "id": "s02_disaster",
      "type": "disaster_monitor",
      "duration": 5.6,
      "voiceover": "Es la trampa más común en el comercio: calcular tus costos en una moneda y cobrar en otra sin medir la brecha cambiaria real del día.",
      "visual_cue": "Monitor de brecha cambiaria: Gráfica de divergencia entre tasa oficial de facturación y costo de reposición",
      "props": {
        "voiceover": "Es la trampa más común en el comercio: calcular tus costos en una moneda y cobrar en otra sin medir la brecha cambiaria real del día.",
        "title": "MONITOR DE DIVERGENCIA CAMBIARIA",
        "subtitle": "DESFASAJES QUE AFECTAN EL FLUJO DE CAJA",
        "crashedStatus": "DESCAPITALIZACIÓN SILENCIOSA DETECTADA",
        "latencyNormal": 1,
        "latencyCrash": 25,
        "logs": [
          {
            "time": "09:00",
            "level": "INFO",
            "text": "Tasa oficial publicada para el día",
            "color": "#38bdf8"
          },
          {
            "time": "11:30",
            "level": "WARN",
            "text": "Proveedor incrementa lista de costos en divisas",
            "color": "#fbbf24"
          },
          {
            "time": "14:00",
            "level": "CRIT",
            "text": "Venta masiva a precio desactualizado genera pérdida",
            "color": "#ef4444"
          },
          {
            "time": "18:00",
            "level": "FATAL",
            "text": "Caja llena de moneda local desvalorizada para recomprar",
            "color": "#ef4444"
          }
        ],
        "impactMetric": "-18% MARGEN",
        "impactSub": "Pérdida neta de poder de compra del negocio"
      }
    },
    {
      "id": "s03_architecture",
      "type": "architecture_flow",
      "duration": 5.8,
      "voiceover": "Diseñamos un sistema con sincronización de tasas que recalcula al instante tus precios en ambas monedas protegiendo tu margen mínimo.",
      "visual_cue": "Arquitectura de recálculo dinámico: Monitor de tasas -> Matriz de márgenes de seguridad -> Precios automáticos en caja",
      "props": {
        "voiceover": "Diseñamos un sistema con sincronización de tasas que recalcula al instante tus precios en ambas monedas protegiendo tu margen mínimo.",
        "title": "SISTEMA DE PRECIOS BIMONEDA PROTEGIDOS",
        "subtitle": "CUMPLIMIENTO LEGAL CON SALUD FINANCIERA",
        "nodes": [
          {
            "id": "rate",
            "label": "Monitor de Tasas",
            "sub": "Actualización diaria oficial",
            "status": "SYNC",
            "color": "#38bdf8"
          },
          {
            "id": "cost",
            "label": "Costo Base en Divisas",
            "sub": "Valor real de reposición",
            "status": "SECURE",
            "color": "#00e5a0"
          },
          {
            "id": "engine",
            "label": "Regla de Margen Mínimo",
            "sub": "Protección matemática",
            "status": "SAFE",
            "color": "#00e5a0"
          },
          {
            "id": "pos",
            "label": "Punto de Venta",
            "sub": "Precios ajustados en 1 clic",
            "status": "READY",
            "color": "#fbbf24"
          }
        ],
        "pipelineStats": "RECALCULO EN 0.4s · MARGEN DE GANANCIA BLINDADO"
      }
    },
    {
      "id": "s04_code",
      "type": "terminal_split",
      "duration": 5.6,
      "voiceover": "Al ingresar cada producto defines tu costo base de reposición y el sistema genera los precios en moneda local cumpliendo la ley sin perder dinero.",
      "visual_cue": "Reglas de fijación de precios en el sistema: Margen objetivo garantizado frente a cualquier cambio de tasa",
      "props": {
        "voiceover": "Al ingresar cada producto defines tu costo base de reposición y el sistema genera los precios en moneda local cumpliendo la ley sin perder dinero.",
        "title": "PROTECCIÓN AUTOMÁTICA DEL CORRELATIVO",
        "fileLeft": "calculo_manual_desfasado.txt",
        "codeLeft": "Precio fijado hace 2 semanas: 120 Bs\nCosto de reposición actual: $3.20 USD\nTasa del día: 45 Bs/USD\nIngreso en USD reales: 120 / 45 = $2.66 USD\n[RESULTADO]: Pierdes $0.54 por cada unidad vendida",
        "fileRight": "cortex_precio_bimoneda.json",
        "codeRight": "{\n  \"producto\": \"Aceite Motor 1L\",\n  \"costo_reposicion_usd\": 3.20,\n  \"margen_minimo_requerido\": \"35%\",\n  \"precio_sugerido_usd\": 4.32,\n  \"tasa_oficial_dia\": 45.00,\n  \"precio_caja_bs\": 194.40,\n  \"margen_real_protegido\": \"35.0%\"\n}",
        "analysis": "TU GANANCIA SE MANTIENE INTACTA SIN IMPORTAR LA FECHA"
      }
    },
    {
      "id": "s05_versus",
      "type": "versus_race",
      "duration": 5.5,
      "voiceover": "Mientras otros comerciantes actualizan etiquetas a mano con una calculadora, el punto de venta ajusta los montos en un clic.",
      "visual_cue": "Carrera de adaptación en mostrador: Ajuste manual tienda por tienda (4 horas) vs Actualización en red (1 segundo)",
      "props": {
        "voiceover": "Mientras otros comerciantes actualizan etiquetas a mano con una calculadora, el punto de venta ajusta los montos en un clic.",
        "title": "VELOCIDAD DE ACTUALIZACIÓN DE PRECIOS",
        "runnerA": {
          "name": "Ajuste manual con calculadora por pasillo",
          "time": "4 horas",
          "rate": "Errores humanos frecuentes",
          "color": "#ef4444"
        },
        "runnerB": {
          "name": "Cortex Sistema Bimoneda Central",
          "time": "1 segundo",
          "rate": "Todo el catálogo sincronizado",
          "color": "#00e5a0"
        },
        "winnerDiff": "CERO VENTAS A PRECIO VIEJO DURANTE LA MAÑANA"
      }
    },
    {
      "id": "s06_matrix",
      "type": "tradeoff_matrix",
      "duration": 5.6,
      "voiceover": "Facturas con total transparencia hacia tus clientes mientras mantienes blindado tu flujo de caja frente a cualquier devaluación.",
      "visual_cue": "Matriz de solidez comercial: Flujo de caja protegido y clientes conformes vs Descapitalización gradual",
      "props": {
        "voiceover": "Facturas con total transparencia hacia tus clientes mientras mantienes blindado tu flujo de caja frente a cualquier devaluación.",
        "title": "SOSTENIBILIDAD DEL COMERCIO",
        "dimX": "Claridad al Cliente",
        "dimY": "Protección Financiera",
        "quadrants": [
          {
            "name": "Precios en Papelitos",
            "value": "Desconfianza del cliente / Cero auditoría",
            "color": "#ef4444"
          },
          {
            "name": "Cálculo a Ojo en Caja",
            "value": "Descuadres constantes al final del día",
            "color": "#fbbf24"
          },
          {
            "name": "Cortex Bimoneda",
            "value": "Precios legales, transparentes y margen asegurado",
            "color": "#00e5a0"
          }
        ],
        "verdict": "UN NEGOCIO QUE NO PROTEGE SU REPOSICIÓN TRABAJA PARA QUEBRAR"
      }
    },
    {
      "id": "s07_cta",
      "type": "cost_ticker",
      "duration": 5.6,
      "voiceover": "Si tienes un comercio y quieres blindar tus márgenes de ganancia contra la brecha de tasas, comenta MARGEN y vemos tu caso.",
      "visual_cue": "Diagnóstico financiero de protección de inventarios con palabra clave MARGEN",
      "props": {
        "voiceover": "Si tienes un comercio y quieres blindar tus márgenes de ganancia contra la brecha de tasas, comenta MARGEN y vemos tu caso.",
        "title": "DIAGNÓSTICO DE PROTECCIÓN DE MÁRGENES",
        "subtitle": "EVITA LA DESCAPITALIZACIÓN DE TU INVENTARIO",
        "cloudCost": 5200,
        "initialCost": 150,
        "breakdown": [
          {
            "name": "Pérdida silenciosa por desfase de tasas",
            "cost": "$3,800/mes",
            "sub": "Ventas realizadas por debajo del costo real",
            "color": "#ef4444"
          },
          {
            "name": "Horas de personal corrigiendo etiquetas",
            "cost": "$1,400/mes",
            "sub": "Tiempo operativo perdido cada semana",
            "color": "#fbbf24"
          }
        ],
        "bareMetalCost": "BLINDAJE BIMONEDA",
        "takeaway": "ESCRIBE 'MARGEN' PARA AUDITAR TUS PRECIOS DE REPOSICIÓN"
      }
    }
  ]
};
