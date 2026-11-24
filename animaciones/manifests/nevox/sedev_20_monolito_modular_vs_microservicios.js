window.__DEFAULT_MANIFEST__ = {
  "title": "[20] 3 programadores manteniendo 14 microservicios: por qué tu equipo no avanza",
  "category": "ARQUITECTURA & VELOCIDAD DE ENTREGA",
  "pilar": "Dolor de Negocio & SaaS Trap",
  "slug": "sedev_20_monolito_modular_vs_microservicios",
  "introType": "KINETIC SLAM",
  "ctaKeyword": "ARQUITECTURA",
  "fps": 30,
  "output": "animaciones/output_clips/sedev_20_monolito_modular_vs_microservicios.mp4",
  "scenes": [
    {
      "id": "s01_hook",
      "type": "kinetic_slam",
      "duration": 9.2,
      "voiceover": "Copiar la arquitectura de Netflix cuando tienes tres programadores y quinientos clientes es ponerle grilletes a tu propio negocio.",
      "visual_cue": "Golpe tipográfico contra la sobreingeniería de microservicios en equipos pequeños",
      "props": {
        "voiceover": "Copiar la arquitectura de Netflix cuando tienes tres programadores y quinientos clientes es ponerle grilletes a tu propio negocio.",
        "badge": "SOBREINGENIERÍA VS VELOCIDAD DE NEGOCIO",
        "lines": [
          {
            "text": "3 PROGRAMADORES CON",
            "color": "#ffffff"
          },
          {
            "text": "14 MICROSERVICIOS",
            "color": "#ef4444",
            "strike": true
          },
          {
            "text": "NO ENTREGAN NUNCA",
            "highlight": "#fbbf24",
            "textColor": "#050505"
          }
        ],
        "stat": "80% DEL TIEMPO PERDIDO MANTENIENDO CABLES EN VEZ DE PRODUCTO",
        "subtitle": "EL COSTO DE DIVIDIR UN SISTEMA ANTES DE TIEMPO"
      }
    },
    {
      "id": "s02_disaster",
      "type": "disaster_monitor",
      "duration": 10.3,
      "voiceover": "Agregar un simple campo en la pantalla de cobro termina requiriendo tocar cuatro repositorios, cuatro despliegues y dos semanas de coordinación.",
      "visual_cue": "Monitor de fricción de desarrollo y fallos en cascada entre microservicios",
      "props": {
        "voiceover": "Agregar un simple campo en la pantalla de cobro termina requiriendo tocar cuatro repositorios, cuatro despliegues y dos semanas de coordinación.",
        "title": "PARÁLISIS POR COMPLEJIDAD ACCIDENTAL",
        "subtitle": "CUANDO UN CAMBIO DE 1 HORA TARDA 2 SEMANAS",
        "crashedStatus": "FALLO EN CASCADA: BILLING-SVC DESINCRONIZADO DE AUTH-SVC",
        "latencyNormal": 5,
        "latencyCrash": 1850,
        "logs": [
          {
            "time": "LUNES",
            "level": "WARN",
            "text": "Pediste agregar campo 'Teléfono' en el checkout",
            "color": "#fbbf24"
          },
          {
            "time": "JUEVES",
            "level": "ERR",
            "text": "4 repositorios, 4 pipelines CI/CD y contratos rotos",
            "color": "#ef4444"
          },
          {
            "time": "VIERNES",
            "level": "CRIT",
            "text": "Despliegue revertido por incompatibilidad de versiones",
            "color": "#f87171"
          }
        ]
      }
    },
    {
      "id": "s03_arch",
      "type": "architecture_flow",
      "duration": 12.2,
      "voiceover": "La solución pragmática es el Monolito Modular: un solo sistema bien separado por dentro, donde los módulos hablan en memoria a velocidad de la luz.",
      "visual_cue": "Arquitectura de Monolito Modular: Módulos aislados comunicándose en RAM con 1 solo deploy",
      "props": {
        "voiceover": "La solución pragmática es el Monolito Modular: un solo sistema bien separado por dentro, donde los módulos hablan en memoria a velocidad de la luz.",
        "title": "EL PODER DEL MONOLITO MODULAR",
        "subtitle": "ORDEN INTERNO ESTRICTO + CERO LATENCIA DE RED",
        "nodes": [
          {
            "id": "m1",
            "label": "MÓDULOS AISLADOS (AUTH · PAGOS · PEDIDOS)",
            "sublabel": "FRONTERAS CLARAS EN UN SOLO REPOSITORIO",
            "color": "#ffffff"
          },
          {
            "id": "ram",
            "label": "COMUNICACIÓN EN MEMORIA (0.01ms)",
            "sublabel": "TIPADO DE PUNTA A PUNTA · TRANSACCIONES ACID",
            "color": "#fbbf24"
          },
          {
            "id": "dep",
            "label": "1 SOLO DESPLIEGUE ATÓMICO EN 40 SEGUNDOS",
            "sublabel": "TU EQUIPO ENTREGA FUNCIONES EN DÍAS, NO MESES",
            "color": "#10b981"
          }
        ]
      }
    },
    {
      "id": "s04_code",
      "type": "terminal_split",
      "duration": 10.7,
      "voiceover": "Cero llamadas de red innecesarias entre tus propios servicios, transacciones limpias en una sola base de datos y despliegues en cuarenta segundos.",
      "visual_cue": "Llamada HTTP lenta y frágil entre microservicios vs llamada directa tipada entre módulos",
      "props": {
        "voiceover": "Cero llamadas de red innecesarias entre tus propios servicios, transacciones limpias en una sola base de datos y despliegues en cuarenta segundos.",
        "title": "RED INTERNA FRÁGIL VS LLAMADA EN MEMORIA",
        "subtitle": "SIMPLICIDAD QUE MULTIPLICA LA VELOCIDAD DEL EQUIPO",
        "leftTitle": "MICROSERVICIOS (SERIALIZACIÓN + RED + FALLOS)",
        "leftCode": "// Para crear un pedido hay que cruzar 3 veces la red\nconst user = await fetch('http://auth-svc/users/' + id);\nconst billing = await fetch('http://billing-svc/charge');\n// Si el paso 3 falla, ¿cómo deshaces el cobro del paso 2?",
        "rightTitle": "MONOLITO MODULAR (TRANSACCIÓN ATÓMICA EN RAM)",
        "rightCode": "await db.transaction(async (tx) => {\n  const user = await AuthModule.getUser(tx, id);\n  await BillingModule.charge(tx, user, amount);\n  await OrdersModule.create(tx, user, items);\n}); // Si algo falla, rollback limpio en 1ms",
        "diffNote": "Transacciones reales + 10x velocidad de entrega"
      }
    },
    {
      "id": "s05_race",
      "type": "tradeoff_matrix",
      "duration": 8.4,
      "voiceover": "Shopify e Instagram escalaron a millones de usuarios con esta arquitectura antes de necesitar dividir su código.",
      "visual_cue": "Matriz de decisión: Monolito Modular vs 14 Microservicios en equipos de 3 devs",
      "props": {
        "voiceover": "Shopify e Instagram escalaron a millones de usuarios con esta arquitectura antes de necesitar dividir su código.",
        "title": "MONOLITO MODULAR VS MICROSERVICIOS",
        "subtitle": "VELOCIDAD DE ENTREGA EN EQUIPOS DE 2 A 8 DEVS",
        "colA": "MONOLITO MODULAR",
        "colB": "14 MICROSERVICIOS",
        "rows": [
          {
            "dim": "Lanzar función nueva",
            "a": "En la misma tarde",
            "b": "2 semanas de coordinación",
            "aGood": true
          },
          {
            "dim": "Comunicación interna",
            "a": "0.01ms en memoria RAM",
            "b": "Saltos HTTP + fallos red",
            "aGood": true
          },
          {
            "dim": "Transacciones de datos",
            "a": "ACID simple y limpio",
            "b": "Datos desincronizados",
            "aGood": true
          },
          {
            "dim": "Factura de servidores",
            "a": "1 VPS / Cluster esbelto",
            "b": "14 contenedores + NAT",
            "aGood": true
          }
        ],
        "takeaway": "✔ 10X MÁS VELOCIDAD DE PRODUCTO CON LA MITAD DE COSTO"
      }
    },
    {
      "id": "s06_cost",
      "type": "cost_ticker",
      "duration": 12.4,
      "voiceover": "La mejor arquitectura no es la que suena más compleja en una reunión, sino la que te permite lanzar funciones nuevas hoy mismo sin romper nada.",
      "visual_cue": "Ahorro en servidores y en horas de ingeniería al simplificar la arquitectura",
      "props": {
        "voiceover": "La mejor arquitectura no es la que suena más compleja en una reunión, sino la que te permite lanzar funciones nuevas hoy mismo sin romper nada.",
        "title": "COSTO DE LA SOBREINGENIERÍA",
        "subtitle": "INFRAESTRUCTURA Y NÓMINA CONSUMIDA POR LA COMPLEJIDAD",
        "cloudCost": 3600,
        "initialCost": 250,
        "breakdown": [
          {
            "name": "Horas de desarrollo perdidas en plomería",
            "cost": "$2,800/mes",
            "sub": "Tu equipo peleando con despliegues en vez de vender",
            "color": "#ef4444"
          },
          {
            "name": "14 servidores y balanceadores redundantes",
            "cost": "$800/mes",
            "sub": "Factura cloud multiplicada sin necesidad",
            "color": "#fbbf24"
          }
        ],
        "bareMetalCost": "10x Agilidad",
        "takeaway": "SIMPLIFICAR LA ARQUITECTURA ACELERA LA FACTURACIÓN"
      }
    },
    {
      "id": "s07_cta",
      "type": "kinetic_hook",
      "duration": 12.4,
      "voiceover": "Si sientes que a tu equipo cada vez le cuesta más semanas sacar un cambio simple o necesitas desarrollar un producto rápido y sólido, escríbeme ARQUITECTURA.",
      "visual_cue": "Cierre de diagnóstico sutil con palabra clave ARQUITECTURA",
      "props": {
        "voiceover": "Si sientes que a tu equipo cada vez le cuesta más semanas sacar un cambio simple o necesitas desarrollar un producto rápido y sólido, escríbeme ARQUITECTURA.",
        "badge": "DESARROLLO DE PRODUCTO & CONSULTORÍA",
        "lines": [
          {
            "text": "MENOS COMPLEJIDAD",
            "color": "#ffffff"
          },
          {
            "text": "MÁS VELOCIDAD REAL",
            "color": "#10b981"
          }
        ],
        "subtitle": "ARQUITECTURA PRAGMÁTICA · SPRINT DE 14 DÍAS · SEDEV",
        "ctaKeyword": "ARQUITECTURA",
        "ctaNote": "Destrabamos tu desarrollo actual o construimos tu sistema sin sobreingeniería."
      }
    }
  ]
};
