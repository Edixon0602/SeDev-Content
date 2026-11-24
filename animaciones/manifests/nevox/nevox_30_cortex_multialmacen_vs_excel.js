window.__DEFAULT_MANIFEST__ = {
  "title": "[30] El colapso del multialmacén: por qué Excel rompe el stock entre tus sucursales",
  "category": "CORTEX · INVENTARIO & OPERACIONES",
  "pilar": "Multialmacén & Transferencias",
  "slug": "nevox_30_cortex_multialmacen_vs_excel",
  "introType": "MIGRATION STEPPER",
  "ctaKeyword": "ALMACEN",
  "fps": 30,
  "output": "animaciones/output_clips/nevox_30_cortex_multialmacen_vs_excel.mp4",
  "scenes": [
    {
      "id": "s01_hook",
      "type": "migration_stepper_viz",
      "duration": 5.5,
      "voiceover": "Abrir una segunda sucursal y seguir usando una hoja de cálculo para controlar el stock es la fórmula garantizada para el desastre.",
      "visual_cue": "Stepper de expansión comercial: Apertura de Sucursal 2 -> Conflicto de stock compartido -> Pérdida de control de mercancía",
      "props": {
        "voiceover": "Abrir una segunda sucursal y seguir usando una hoja de cálculo para controlar el stock es la fórmula garantizada para el desastre.",
        "title": "EL COLAPSO DEL CRECIMIENTO EN EXCEL",
        "steps": [
          {
            "num": "01",
            "title": "Una sola tienda",
            "sub": "Excel funciona de milagro con un solo cajero",
            "status": "done"
          },
          {
            "num": "02",
            "title": "Apertura Sucursal 2",
            "sub": "Dos tiendas editando el mismo archivo",
            "status": "active"
          },
          {
            "num": "03",
            "title": "Descuadres Cruzados",
            "sub": "Ventas duplicadas y pérdidas en tránsito",
            "status": "failed"
          }
        ]
      }
    },
    {
      "id": "s02_disaster",
      "type": "disaster_monitor",
      "duration": 5.6,
      "voiceover": "Vendes la última unidad en una tienda mientras el depósito central ya la había comprometido para otro cliente.",
      "visual_cue": "Monitor de inventario fantasma: Doble venta accidental, orden cancelada y reclamo enfurecido de cliente",
      "props": {
        "voiceover": "Vendes la última unidad en una tienda mientras el depósito central ya la había comprometido para otro cliente.",
        "title": "INVENTARIO FANTASMA Y DOBLE VENTA",
        "subtitle": "CONFLICTO DE EXISTENCIAS ENTRE PUNTOS DE VENTA",
        "crashedStatus": "SOBREVENTA CRÍTICA: PRODUCTO COMPROMETIDO EN DOS LUGARES",
        "latencyNormal": 1,
        "latencyCrash": 360,
        "logs": [
          {
            "time": "16:10",
            "level": "INFO",
            "text": "Sucursal Norte vende última planta eléctrica en stock",
            "color": "#38bdf8"
          },
          {
            "time": "16:12",
            "level": "CRIT",
            "text": "Sucursal Centro vende el mismo equipo a cliente corporativo",
            "color": "#ef4444"
          },
          {
            "time": "16:25",
            "level": "FATAL",
            "text": "Choque en depósito: Solo existe 1 unidad física real",
            "color": "#ef4444"
          }
        ],
        "impactMetric": "-$2,400 USD",
        "impactSub": "Devolución forzosa y pérdida de cliente corporativo"
      }
    },
    {
      "id": "s03_architecture",
      "type": "architecture_flow",
      "duration": 5.8,
      "voiceover": "Un sistema multialmacén sincroniza cada depósito en la nube con transferencias blindadas que requieren confirmación de salida y llegada.",
      "visual_cue": "Topología de transferencias seguras: Almacén Central -> En tránsito con guía formal -> Recepción confirmada en Sucursal",
      "props": {
        "voiceover": "Un sistema multialmacén sincroniza cada depósito en la nube con transferencias blindadas que requieren confirmación de salida y llegada.",
        "title": "RED MULTIALMACÉN EN TIEMPO REAL",
        "subtitle": "TRANSFERENCIAS CON DOBLE VALIDACIÓN DIGITAL",
        "nodes": [
          {
            "id": "depot",
            "label": "Depósito Central",
            "sub": "Stock empaquetado",
            "status": "DISPATCHED",
            "color": "#38bdf8"
          },
          {
            "id": "transit",
            "label": "Guía en Tránsito",
            "sub": "Bloqueado para la venta",
            "status": "IN_TRANSIT",
            "color": "#fbbf24"
          },
          {
            "id": "store",
            "label": "Sucursal Destino",
            "sub": "Recepción y conteo físico",
            "status": "RECEIVED",
            "color": "#00e5a0"
          },
          {
            "id": "audit",
            "label": "Auditoría en Red",
            "sub": "Ajuste automático de stock",
            "status": "BALANCED",
            "color": "#00e5a0"
          }
        ],
        "pipelineStats": "0 EXTRAVÍOS EN CARRETERA · CONCILIACIÓN INMEDIATA"
      }
    },
    {
      "id": "s04_code",
      "type": "terminal_split",
      "duration": 5.6,
      "voiceover": "La mercancía nunca desaparece en el camino: mientras viaja queda marcada 'en tránsito' y ningún vendedor puede venderla por error.",
      "visual_cue": "Estados de existencia en el sistema: Físico, Disponible y En Tránsito claramente separados",
      "props": {
        "voiceover": "La mercancía nunca desaparece en el camino: mientras viaja queda marcada 'en tránsito' y ningún vendedor puede venderla por error.",
        "title": "AISLAMIENTO DE STOCK EN TRÁNSITO",
        "fileLeft": "excel_desordenado.csv",
        "codeLeft": "Item,StockTotal\nGenerador 5KVA,3\n[Problema]: 1 está en la tienda, 2 van en el camión\nEl vendedor ve '3' y promete entrega inmediata a 3 clientes",
        "fileRight": "cortex_existencias.json",
        "codeRight": "{\n  \"producto\": \"Generador 5KVA\",\n  \"stock_disponible_tienda\": 1,\n  \"en_transito_camion\": 2,\n  \"guia_despacho\": \"TR-8812\",\n  \"hora_estimada_llegada\": \"18:00\",\n  \"bloqueado_para_venta_inmediata\": true\n}",
        "analysis": "SEGURIDAD ABSOLUTA EN LO QUE REALMENTE SE PUEDE ENTREGAR"
      }
    },
    {
      "id": "s05_versus",
      "type": "versus_race",
      "duration": 5.5,
      "voiceover": "Si una tienda se queda sin mercancía, el sistema sugiere traslados automáticos desde la sucursal con menor rotación.",
      "visual_cue": "Balanceo inteligente de inventario: Mover producto estancado entre tiendas en lugar de comprar más a proveedores",
      "props": {
        "voiceover": "Si una tienda se queda sin mercancía, el sistema sugiere traslados automáticos desde la sucursal con menor rotación.",
        "title": "BALANCEO INTELIGENTE ENTRE TIENDAS",
        "runnerA": {
          "name": "Comprar mercancía nueva teniendo stock parado",
          "time": "Gasto innecesario",
          "rate": "$5,000 en sobrecompra",
          "color": "#ef4444"
        },
        "runnerB": {
          "name": "Rebalanceo automático Cortex",
          "time": "Traslado en 24h",
          "rate": "Aprovecha el stock existente",
          "color": "#00e5a0"
        },
        "winnerDiff": "AHORRO MASIVO DE CAPITAL DE TRABAJO"
      }
    },
    {
      "id": "s06_matrix",
      "type": "tradeoff_matrix",
      "duration": 5.6,
      "voiceover": "Pasas de tener mercancía perdida y recuentos interminables a saber el valor exacto de tus activos en cada punto de venta.",
      "visual_cue": "Matriz de control multisede: 100% de trazabilidad entre tiendas con auditoría por usuario",
      "props": {
        "voiceover": "Pasas de tener mercancía perdida y recuentos interminables a saber el valor exacto de tus activos en cada punto de venta.",
        "title": "CONTROL TOTAL MULTI-SUCURSAL",
        "dimX": "Número de Sedes",
        "dimY": "Precisión de Stock",
        "quadrants": [
          {
            "name": "Hojas de Cálculo Compartidas",
            "value": "Colapso a partir de la 2da sede / Stock fantasma",
            "color": "#ef4444"
          },
          {
            "name": "Sistemas Aislados por Tienda",
            "value": "Cajas negras sin comunicación entre sí",
            "color": "#fbbf24"
          },
          {
            "name": "Cortex Multialmacén Cloud",
            "value": "Visión panorámica central con permisos por rol",
            "color": "#00e5a0"
          }
        ],
        "verdict": "ESCALA A DIEZ SUCURSALES CON LA MISMA PAZ MENTAL"
      }
    },
    {
      "id": "s07_cta",
      "type": "cost_ticker",
      "duration": 5.6,
      "voiceover": "Si manejas más de una sede o almacén y sufres con los descuadres de inventario, comenta ALMACEN y te enseñamos la arquitectura.",
      "visual_cue": "Diagnóstico operativo multisede y almacenes con palabra clave ALMACEN",
      "props": {
        "voiceover": "Si manejas más de una sede o almacén y sufres con los descuadres de inventario, comenta ALMACEN y te enseñamos la arquitectura.",
        "title": "DIAGNÓSTICO MULTIALMACÉN Y STOCK",
        "subtitle": "CONECTA TUS SUCURSALES EN UNA SOLA PLATAFORMA",
        "cloudCost": 6500,
        "initialCost": 200,
        "breakdown": [
          {
            "name": "Mercancía perdida o extraviada en traslados",
            "cost": "$4,200/año",
            "sub": "Falta de control de guías de entrega",
            "color": "#ef4444"
          },
          {
            "name": "Ventas caídas por falta de stock coordinado",
            "cost": "$2,300/mes",
            "sub": "Clientes que no esperaron el traslado",
            "color": "#fbbf24"
          }
        ],
        "bareMetalCost": "MULTIALMACÉN CLOUD",
        "takeaway": "ESCRIBE 'ALMACEN' PARA UNIFICAR TUS SUCURSALES"
      }
    }
  ]
};
