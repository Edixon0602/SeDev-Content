window.__DEFAULT_MANIFEST__ = {
  "title": "[03] Por qué el ChatGPT de tu empresa es inútil si no lee tu base de datos",
  "category": "IA APLICADA & DATOS",
  "pilar": "Automatizaciones de Alto Impacto / IA Real",
  "slug": "sedev_03_ia_humo_vs_sql_agent",
  "introType": "KINETIC SLAM",
  "ctaKeyword": "AGENTE",
  "fps": 30,
  "output": "animaciones/output_clips/sedev_03_ia_humo_vs_sql_agent.mp4",
  "scenes": [
    {
      "id": "s01_hook",
      "type": "kinetic_slam",
      "duration": 9.9,
      "voiceover": "Copiar y pegar tablas en ChatGPT no es tener inteligencia artificial en tu empresa; es trabajo manual con pasos extra.",
      "visual_cue": "Golpe tipográfico: Copy-Paste en ChatGPT tachado vs IA conectada a SQL",
      "props": {
        "voiceover": "Copiar y pegar tablas en ChatGPT no es tener inteligencia artificial en tu empresa; es trabajo manual con pasos extra.",
        "badge": "IA OPERATIVA VS IA DE HUMO",
        "lines": [
          {
            "text": "USAR CHATGPT CON",
            "color": "#ffffff"
          },
          {
            "text": "COPY-PASTE MANUAL",
            "color": "#ef4444",
            "strike": true
          },
          {
            "text": "NO ES AUTOMATIZAR",
            "highlight": "#10b981",
            "textColor": "#050505"
          }
        ],
        "stat": "SIN ACCESO A TUS DATOS, LA IA SOLO ADIVINA",
        "subtitle": "FUNCTION CALLING CONECTADO A TU BASE DE DATOS"
      }
    },
    {
      "id": "s02_arch",
      "type": "quantization_weights_viz",
      "duration": 10.1,
      "voiceover": "El valor real aparece cuando conectas un agente con permisos de solo lectura directamente a tu base de datos o CRM.",
      "visual_cue": "Orquestador MCP / Tool Calling conectando el modelo a PostgreSQL y CRM con contratos tipados",
      "props": {
        "voiceover": "El valor real aparece cuando conectas un agente con permisos de solo lectura directamente a tu base de datos o CRM.",
        "mode": "mcp",
        "badge": "ORQUESTACIÓN DE AGENTES CON DATOS REALES",
        "title": "AGENTE CONECTADO A POSTGRESQL Y CRM",
        "subtitle": "PROTOCOLO DE HERRAMIENTAS CON PERMISOS DE SOLO LECTURA"
      }
    },
    {
      "id": "s03_code",
      "type": "terminal_split",
      "duration": 10.3,
      "voiceover": "En lugar de exportar archivos CSV, el dueño pregunta por teléfono cuánto facturó la sucursal norte y cómo va el cobro.",
      "visual_cue": "Código real: Tool definition con validación estricta y rol read-only en SQL",
      "props": {
        "voiceover": "En lugar de exportar archivos CSV, el dueño pregunta por teléfono cuánto facturó la sucursal norte y cómo va el cobro.",
        "title": "CONEXIÓN SEGURA A DATOS INTERNOS",
        "subtitle": "CERO ALUCINACIONES · CERO RIESGO DE BORRADO",
        "leftTitle": "FLUJO MANUAL (EXPORTAR CSV A CHATGPT)",
        "leftCode": "// 1. Entrar al ERP y bajar 3 reportes Excel\n// 2. Limpiar columnas y subir archivo al chat\n// 3. El modelo trunca filas y calcula mal\n// Tiempo perdido: 25 minutos por consulta",
        "rightTitle": "TOOL CALLING CON ROL READ-ONLY",
        "rightCode": "const res = await dbReadOnly.query(\n  `SELECT sucursal, SUM(total) AS ventas\n   FROM invoices WHERE fecha = CURRENT_DATE\n   GROUP BY sucursal`\n); // Respuesta exacta en 1.2s por WhatsApp",
        "diffNote": "Cálculo hecho por el motor SQL, no adivinado por el LLM"
      }
    },
    {
      "id": "s04_race",
      "type": "versus_race",
      "duration": 13,
      "voiceover": "El agente nunca inventa números porque no calcula él: escribe la consulta SQL, la base de datos responde y te entrega el dato exacto en dos segundos.",
      "visual_cue": "Carrera: Consulta directa por agente SQL (1.2s) vs Pedir reporte manual (45 min)",
      "props": {
        "voiceover": "El agente nunca inventa números porque no calcula él: escribe la consulta SQL, la base de datos responde y te entrega el dato exacto en dos segundos.",
        "title": "VELOCIDAD DE TOMA DE DECISIONES",
        "subtitle": "CONSULTA DE VENTAS, STOCK Y CARTERA VENCIDA",
        "sideA": {
          "name": "AGENTE CONECTADO A SQL",
          "tag": "RESPUESTA VÍA WHATSAPP / TELEGRAM",
          "targetMs": 1200,
          "displayTime": "1.2s",
          "memory": "DATO EXACTO",
          "cacheMisses": "0% ALUCINACIÓN",
          "speedup": "EN TIEMPO REAL"
        },
        "sideB": {
          "name": "REPORTE MANUAL / CSV",
          "tag": "ESPERAR AL ANALISTA O CONTADOR",
          "targetMs": 2700000,
          "displayTime": "45 MIN",
          "memory": "DATOS DE AYER",
          "cacheMisses": "FRICCIÓN ALTA",
          "bottleneck": "DECISIÓN TARDÍA"
        }
      }
    },
    {
      "id": "s05_mem",
      "type": "kernel_sandbox_viz",
      "duration": 9.7,
      "voiceover": "Y todo corre bajo un usuario bloqueado que jamás puede modificar ni borrar una sola fila ni exponer datos sensibles.",
      "visual_cue": "Aislamiento de privilegios: Agente en sandbox de solo lectura sin acceso a escritura",
      "props": {
        "voiceover": "Y todo corre bajo un usuario bloqueado que jamás puede modificar ni borrar una sola fila ni exponer datos sensibles.",
        "badge": "SEGURIDAD EMPRESARIAL",
        "title": "SANDBOX DE SOLO LECTURA EN BASE DE DATOS",
        "subtitle": "AISLAMIENTO ESTRICTO: 0% RIESGO DE BORRADO O FUGA"
      }
    },
    {
      "id": "s06_cost",
      "type": "cost_ticker",
      "duration": 8.8,
      "voiceover": "Dejas de esperar hasta el viernes para saber dónde se está frenando tu operación o quién debe facturas.",
      "visual_cue": "Impacto operativo de tener visibilidad en vivo frente a reportes atrasados",
      "props": {
        "voiceover": "Dejas de esperar hasta el viernes para saber dónde se está frenando tu operación o quién debe facturas.",
        "title": "IMPACTO EN VISIBILIDAD GERENCIAL",
        "subtitle": "DECIDIR CON DATOS DE HOY VS DATOS DEL MES PASADO",
        "cloudCost": 1850,
        "initialCost": 120,
        "breakdown": [
          {
            "name": "Cobros vencidos no detectados a tiempo",
            "cost": "$1,250/mes",
            "sub": "Falta de alertas automáticas de cartera",
            "color": "#ef4444"
          },
          {
            "name": "Horas armando reportes manuales",
            "cost": "$600/mes",
            "sub": "Tiempo de equipo exportando hojas",
            "color": "#fbbf24"
          }
        ],
        "bareMetalCost": "1.2s / Query",
        "takeaway": "VISIBILIDAD TOTAL DE TU NEGOCIO EN TU BOLSILLO"
      }
    },
    {
      "id": "s07_cta",
      "type": "kinetic_hook",
      "duration": 9.9,
      "voiceover": "Si quieres un asistente conectado de verdad a los datos de tu empresa sin arriesgar tu seguridad, hablemos por privado.",
      "visual_cue": "Cierre de conversión sutil con palabra clave AGENTE",
      "props": {
        "voiceover": "Si quieres un asistente conectado de verdad a los datos de tu empresa sin arriesgar tu seguridad, hablemos por privado.",
        "badge": "IA APLICADA A OPERACIONES",
        "lines": [
          {
            "text": "CONECTA LA IA A",
            "color": "#ffffff"
          },
          {
            "text": "TUS DATOS REALES",
            "color": "#10b981"
          }
        ],
        "subtitle": "AGENTES SQL · INTEGRACIÓN ERP/CRM · WHATSAPP",
        "ctaKeyword": "AGENTE",
        "ctaNote": "Evaluamos cómo conectar tu base de datos o CRM con permisos blindados."
      }
    }
  ]
};
