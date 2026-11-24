window.__DEFAULT_MANIFEST__ = {
  "title": "[29] Pregúntale a tu inventario: cómo obtener métricas de tu negocio sin saber Excel",
  "category": "CORTEX · INTELIGENCIA & ANALÍTICA",
  "pilar": "Asistente Inteligente de Datos",
  "slug": "nevox_29_cortex_asistente_sql_ia",
  "introType": "TERMINAL SPLIT",
  "ctaKeyword": "AUDITOR",
  "fps": 30,
  "output": "animaciones/output_clips/nevox_29_cortex_asistente_sql_ia.mp4",
  "scenes": [
    {
      "id": "s01_hook",
      "type": "terminal_split",
      "duration": 5.5,
      "voiceover": "Para saber cuánto ganaste esta semana o qué producto no se está vendiendo, no deberías tener que pedirle un informe a tu contador.",
      "visual_cue": "Consulta en lenguaje natural: Dueño preguntando desde su teléfono: '¿Cuáles son los 5 productos con menor rotación este mes?'",
      "props": {
        "voiceover": "Para saber cuánto ganaste esta semana o qué producto no se está vendiendo, no deberías tener que pedirle un informe a tu contador.",
        "title": "AUDITORÍA INMEDIATA EN LENGUAJE NATURAL",
        "fileLeft": "pregunta_del_dueno.txt",
        "codeLeft": "Dueño escribe en la aplicación:\n'¿Cuáles son los 5 productos con menor rotación este mes y cuánto dinero representan en inventario parado?'\n[Consulta enviada en lenguaje humano]",
        "fileRight": "respuesta_ejecutiva.json",
        "codeRight": "{\n  \"productos_estancados\": 5,\n  \"capital_inmovilizado\": \"$4,120 USD\",\n  \"item_critico\": \"Batería 65A (82 días sin venta)\",\n  \"accion_recomendada\": \"Lanzar combo promocional\"\n}",
        "analysis": "RESPUESTA DIRECTA SIN ESPERAR POR REPORTES EXTERNOS"
      }
    },
    {
      "id": "s02_disaster",
      "type": "disaster_monitor",
      "duration": 5.6,
      "voiceover": "La mayoría de los dueños toman decisiones a ciegas porque exportar datos a Excel y armar fórmulas toma horas que no tienen.",
      "visual_cue": "Parálisis de análisis: Hojas de cálculo con 50 columnas, fórmulas rotas y datos desactualizados",
      "props": {
        "voiceover": "La mayoría de los dueños toman decisiones a ciegas porque exportar datos a Excel y armar fórmulas toma horas que no tienen.",
        "title": "PARÁLISIS POR EXCESO DE ARCHIVOS",
        "subtitle": "DECISIONES A CIEGAS POR FALTA DE TIEMPO",
        "crashedStatus": "REPORTE DESACTUALIZADO · DECISIÓN TOMADA A CIEGAS",
        "latencyNormal": 1,
        "latencyCrash": 48,
        "logs": [
          {
            "time": "Lunes",
            "level": "INFO",
            "text": "Dueño pide informe de ventas por categoría",
            "color": "#38bdf8"
          },
          {
            "time": "Martes",
            "level": "WARN",
            "text": "Administrador exporta 3 archivos CSV con datos dispares",
            "color": "#fbbf24"
          },
          {
            "time": "Miércoles",
            "level": "CRIT",
            "text": "Fórmula de suma rota genera número equivocado",
            "color": "#ef4444"
          },
          {
            "time": "Jueves",
            "level": "FATAL",
            "text": "Se compra mercancía equivocada por error del reporte",
            "color": "#ef4444"
          }
        ],
        "impactMetric": "3 DÍAS PERDIDOS",
        "impactSub": "Tiempo necesario para obtener una simple cifra de ventas"
      }
    },
    {
      "id": "s03_architecture",
      "type": "architecture_flow",
      "duration": 5.8,
      "voiceover": "Conectamos un asistente de inteligencia artificial directo a la base de datos de tu inventario en un entorno completamente seguro.",
      "visual_cue": "Topología de asistente de datos: Lenguaje natural -> Motor seguro de solo lectura -> Respuesta matemática exacta",
      "props": {
        "voiceover": "Conectamos un asistente de inteligencia artificial directo a la base de datos de tu inventario en un entorno completamente seguro.",
        "title": "ASISTENTE DE DATOS CONEXIÓN DIRECTA",
        "subtitle": "CONSULTAS BLINDADAS DE SOLO LECTURA",
        "nodes": [
          {
            "id": "chat",
            "label": "Pregunta en Español",
            "sub": "Texto libre desde app o chat",
            "status": "INPUT",
            "color": "#38bdf8"
          },
          {
            "id": "ai",
            "label": "Motor de IA Interno",
            "sub": "Comprensión del modelo de datos",
            "status": "TRANSLATE",
            "color": "#00e5a0"
          },
          {
            "id": "db",
            "label": "Base de Datos Segura",
            "sub": "Sandbox de solo lectura",
            "status": "QUERY",
            "color": "#00e5a0"
          },
          {
            "id": "out",
            "label": "Resumen Ejecutivo",
            "sub": "Métricas exactas al instante",
            "status": "OUTPUT",
            "color": "#fbbf24"
          }
        ],
        "pipelineStats": "CONSULTA PROCESADA EN 1.2s · CERO RIESGO DE MODIFICACIÓN"
      }
    },
    {
      "id": "s04_code",
      "type": "terminal_split",
      "duration": 5.6,
      "voiceover": "Le escribes: '¿qué proveedor me subió precios este mes?' y en tres segundos te devuelve la lista exacta con los porcentajes.",
      "visual_cue": "Auditoría interactiva en tiempo real: Detección instantánea de incrementos de costo de proveedores",
      "props": {
        "voiceover": "Le escribes: '¿qué proveedor me subió precios este mes?' y en tres segundos te devuelve la lista exacta con los porcentajes.",
        "title": "AUDITORÍA DE COSTOS EN SEGUNDOS",
        "fileLeft": "consulta_costos.txt",
        "codeLeft": "Dueño: '¿Qué proveedores aumentaron precios más de un 10% en las últimas dos semanas?'",
        "fileRight": "resultado_auditoria.json",
        "codeRight": "[\n  { \"proveedor\": \"Distribuidora Central\", \"incremento\": \"+14.2%\", \"rubro\": \"Lácteos\" },\n  { \"proveedor\": \"Importadora Andina\", \"incremento\": \"+11.0%\", \"rubro\": \"Empaques\" }\n]\n[Alerta]: Sugerencia de renegociación disponible",
        "analysis": "DETECCIÓN INMEDIATA DE GASTOS OCULTOS"
      }
    },
    {
      "id": "s05_versus",
      "type": "versus_race",
      "duration": 5.5,
      "voiceover": "Sin alucinaciones ni inventos: el motor lee únicamente los registros reales de tus ventas y tus compras con permisos de solo lectura.",
      "visual_cue": "Comparativa de precisión: Inteligencia artificial genérica que inventa datos vs Asistente con acceso a registros reales",
      "props": {
        "voiceover": "Sin alucinaciones ni inventos: el motor lee únicamente los registros reales de tus ventas y tus compras con permisos de solo lectura.",
        "title": "PRECISIÓN ANALÍTICA: GENÉRICO VS CONECTADO",
        "runnerA": {
          "name": "IA Genérica sin conexión a tus datos",
          "time": "Alucinaciones",
          "rate": "Respuestas vagas e inventadas",
          "color": "#ef4444"
        },
        "runnerB": {
          "name": "Cortex Asistente de Negocio",
          "time": "100% Preciso",
          "rate": "Validado contra tus facturas reales",
          "color": "#00e5a0"
        },
        "winnerDiff": "DATOS MATEMÁTICOS AUDITABLES AL CENTAVO"
      }
    },
    {
      "id": "s06_matrix",
      "type": "tradeoff_matrix",
      "duration": 5.6,
      "voiceover": "Tienes un analista financiero trabajando las veinticuatro horas en tu bolsillo para cuidar cada centavo de tu empresa.",
      "visual_cue": "Matriz de velocidad gerencial: Respuestas estratégicas en 3 segundos vs Esperar días por informes contables",
      "props": {
        "voiceover": "Tienes un analista financiero trabajando las veinticuatro horas en tu bolsillo para cuidar cada centavo de tu empresa.",
        "title": "VALOR GERENCIAL PARA EL FUNDADOR",
        "dimX": "Tiempo de Respuesta",
        "dimY": "Profundidad del Análisis",
        "quadrants": [
          {
            "name": "Preguntar al Contador",
            "value": "3 a 5 días de demora / Resumen estático",
            "color": "#fbbf24"
          },
          {
            "name": "Revisar Sistema a Mano",
            "value": "Navegar 15 menús complejos para una cifra",
            "color": "#ef4444"
          },
          {
            "name": "Cortex Asistente IA",
            "value": "Pregunta en español y respuesta ejecutiva en 3 segundos",
            "color": "#00e5a0"
          }
        ],
        "verdict": "CONTROL TOTAL DE TU NEGOCIO DESDE TU TELÉFONO"
      }
    },
    {
      "id": "s07_cta",
      "type": "cost_ticker",
      "duration": 5.6,
      "voiceover": "Si quieres auditar tu negocio haciéndole preguntas en español directo a tus datos, comenta AUDITOR y te mostramos cómo funciona.",
      "visual_cue": "Diagnóstico de analítica e inteligencia de negocio con palabra clave AUDITOR",
      "props": {
        "voiceover": "Si quieres auditar tu negocio haciéndole preguntas en español directo a tus datos, comenta AUDITOR y te mostramos cómo funciona.",
        "title": "DIAGNÓSTICO DE ANALÍTICA INTELIGENTE",
        "subtitle": "CONVIERTE TUS DATOS DE VENTAS EN DECISIONES RÁPIDAS",
        "cloudCost": 3800,
        "initialCost": 120,
        "breakdown": [
          {
            "name": "Sueldos dedicados a armar reportes manuales",
            "cost": "$2,400/mes",
            "sub": "Horas de oficina gastadas en consolidar Excel",
            "color": "#fbbf24"
          },
          {
            "name": "Dinero perdido por compras mal calculadas",
            "cost": "$1,400/mes",
            "sub": "Sobre-stock adquirido por falta de visibilidad",
            "color": "#ef4444"
          }
        ],
        "bareMetalCost": "ASISTENTE INTELIGENTE",
        "takeaway": "ESCRIBE 'AUDITOR' PARA PROBAR EL ASISTENTE CON TUS DATOS"
      }
    }
  ]
};
