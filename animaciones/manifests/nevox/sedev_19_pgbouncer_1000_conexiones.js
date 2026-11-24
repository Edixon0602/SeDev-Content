window.__DEFAULT_MANIFEST__ = {
  "title": "[19] Por qué tu base de datos se cae con 300 usuarios aunque la CPU esté al 10%",
  "category": "BASES DE DATOS & ESCALABILIDAD",
  "pilar": "Proof of Work & Casos Reales",
  "slug": "sedev_19_pgbouncer_1000_conexiones",
  "introType": "CONNECTION POOL",
  "ctaKeyword": "POOL",
  "fps": 30,
  "output": "animaciones/output_clips/sedev_19_pgbouncer_1000_conexiones.mp4",
  "scenes": [
    {
      "id": "s01_hook",
      "type": "connection_pool_viz",
      "duration": 11.9,
      "voiceover": "Tu servidor tiene memoria y procesador de sobra, pero entran trescientas personas a la vez y todo devuelve error. El culpable son las conexiones.",
      "visual_cue": "Visualizador de PgBouncer multiplexando 1,000 clientes en 20 conexiones reales de Postgres",
      "props": {
        "voiceover": "Tu servidor tiene memoria y procesador de sobra, pero entran trescientas personas a la vez y todo devuelve error. El culpable son las conexiones.",
        "badge": "CUELLO DE BOTELLA EN POSTGRESQL",
        "title": "1,000 USUARIOS VS LÍMITE DE 100 CONEXIONES",
        "subtitle": "MULTIPLEXACIÓN EN MODO TRANSACCIÓN"
      }
    },
    {
      "id": "s02_disaster",
      "type": "disaster_monitor",
      "duration": 13,
      "voiceover": "Por defecto, PostgreSQL solo acepta cien conexiones simultáneas. Cuando el usuario ciento uno intenta entrar, la base de datos le cierra la puerta en la cara.",
      "visual_cue": "Monitor disparando FATAL: sorry, too many clients already con CPU al 12%",
      "props": {
        "voiceover": "Por defecto, PostgreSQL solo acepta cien conexiones simultáneas. Cuando el usuario ciento uno intenta entrar, la base de datos le cierra la puerta en la cara.",
        "title": "CAÍDA CON EL SERVIDOR AL 12% DE CPU",
        "subtitle": "FATAL: SORRY, TOO MANY CLIENTS ALREADY",
        "crashedStatus": "ERR 500: CONEXIONES AGOTADAS (100/100) · SITIO CAÍDO",
        "latencyNormal": 8,
        "latencyCrash": 9500,
        "logs": [
          {
            "time": "11:02:01",
            "level": "INFO",
            "text": "CPU del servidor en 12% · Memoria RAM libre: 78%",
            "color": "#10b981"
          },
          {
            "time": "11:02:04",
            "level": "ERR",
            "text": "Funciones serverless abrieron 140 conexiones directas",
            "color": "#ef4444"
          },
          {
            "time": "11:02:05",
            "level": "CRIT",
            "text": "FATAL: remaining connection slots are reserved",
            "color": "#f87171"
          }
        ]
      }
    },
    {
      "id": "s03_code",
      "type": "terminal_split",
      "duration": 11.3,
      "voiceover": "Esto pasa todo el tiempo cuando despliegas en arquitecturas modernas donde cada petición intenta abrir un tubo nuevo directo a la base de datos.",
      "visual_cue": "Conexión directa por request agotando sockets vs Pooler en modo transacción",
      "props": {
        "voiceover": "Esto pasa todo el tiempo cuando despliegas en arquitecturas modernas donde cada petición intenta abrir un tubo nuevo directo a la base de datos.",
        "title": "CONEXIÓN DIRECTA VS TRANSACTION POOLING",
        "subtitle": "CÓMO MULTIPLICAR X20 LA CAPACIDAD DE TU BASE DE DATOS",
        "leftTitle": "CONEXIÓN DIRECTA (SE AGOTA CON 100 VISITAS)",
        "leftCode": "// Cada worker o lambda abre su propia conexión TCP+SSL\n// Costo: 10 MB de RAM por conexión en Postgres\n// Con 150 usuarios concurrentes -> Error 500 masivo\nDATABASE_URL=\"postgresql://db.internal:5432/prod\"",
        "rightTitle": "CONEXIÓN VÍA PGBOUNCER (SOPORTA 5,000+ CLIENTES)",
        "rightCode": "// PgBouncer mantiene solo 20 conexiones reales abiertas\n// Asigna la conexión solo los 2ms que dura la query\n// y la devuelve al instante para el siguiente usuario\nDATABASE_URL=\"postgresql://pgbouncer:6432/prod?pgbouncer=true\"",
        "diffNote": "5,000 clientes atendidos con solo 20 procesos reales"
      }
    },
    {
      "id": "s04_arch",
      "type": "network_pipeline",
      "duration": 13.2,
      "voiceover": "En lugar de pagar el triple por una base de datos gigante, colocamos un multiplexor ligero en la entrada que comparte veinte conexiones reales entre miles de usuarios.",
      "visual_cue": "Tubería de préstamo de conexión por milisegundo en PgBouncer (Lease 2.1ms)",
      "props": {
        "voiceover": "En lugar de pagar el triple por una base de datos gigante, colocamos un multiplexor ligero en la entrada que comparte veinte conexiones reales entre miles de usuarios.",
        "title": "PRÉSTAMO DE CONEXIÓN POR MILISEGUNDO",
        "subtitle": "REUTILIZACIÓN EXTREMA DE CONEXIONES TCP",
        "stages": [
          {
            "name": "2,000 USUARIOS NAVEGANDO",
            "tag": "Solo usan la base de datos 2ms por clic",
            "metric": "0.2 ms",
            "color": "#38bdf8"
          },
          {
            "name": "PGBOUNCER TRANSACTION POOL",
            "tag": "Presta un canal libre por 2ms y lo recupera",
            "metric": "2.1 ms",
            "color": "#fbbf24"
          },
          {
            "name": "POSTGRESQL (20 WORKERS FIJOS)",
            "tag": "Cero sobrecarga de RAM · Cero rechazos",
            "metric": "0% DROP",
            "color": "#10b981"
          }
        ],
        "conclusion": "Veinte conexiones reales bien turnadas atienden a miles de compradores sin agotar la memoria."
      }
    },
    {
      "id": "s05_race",
      "type": "versus_race",
      "duration": 9.5,
      "voiceover": "Como cada consulta tarda apenas dos milisegundos, veinte tubos bien turnados despachan miles de compras por segundo sin despeinarse.",
      "visual_cue": "Prueba de estrés con 1,500 usuarios simultáneos: PgBouncer (0 errores) vs Directo (Crash)",
      "props": {
        "voiceover": "Como cada consulta tarda apenas dos milisegundos, veinte tubos bien turnados despachan miles de compras por segundo sin despeinarse.",
        "title": "PRUEBA DE ESTRÉS: 1,500 USUARIOS",
        "subtitle": "TRÁFICO SIMULTÁNEO SOBRE EL MISMO SERVIDOR",
        "sideA": {
          "name": "CON PGBOUNCER ACTIVO",
          "tag": "20 WORKERS MULTIPLEXADOS",
          "targetMs": 2.4,
          "displayTime": "2.4ms",
          "memory": "210 MB RAM",
          "cacheMisses": "0% ERRORES",
          "speedup": "1,500 USUARIOS OK"
        },
        "sideB": {
          "name": "CONEXIÓN DIRECTA",
          "tag": "LÍMITE DE 100 CONEXIONES",
          "targetMs": 9500,
          "displayTime": "CAÍDA TOTAL",
          "memory": "RAM SATURADA",
          "cacheMisses": "93% RECHAZADO",
          "bottleneck": "TOO MANY CLIENTS"
        }
      }
    },
    {
      "id": "s06_cost",
      "type": "cost_ticker",
      "duration": 11.3,
      "voiceover": "Es una configuración de media hora que te salva de caídas en pleno lanzamiento y te ahorra cientos de dólares al mes en servidor.",
      "visual_cue": "Ahorro mensual al no tener que escalar RDS solo por límite de conexiones",
      "props": {
        "voiceover": "Es una configuración de media hora que te salva de caídas en pleno lanzamiento y te ahorra cientos de dólares al mes en servidor.",
        "title": "AHORRO EN ESCALADO DE BASE DE DATOS",
        "subtitle": "SOLUCIÓN DE ARQUITECTURA VS PAGAR INSTANCIA GIGANTE",
        "cloudCost": 760,
        "initialCost": 95,
        "breakdown": [
          {
            "name": "Subir plan de base de datos solo por conexiones",
            "cost": "$665/mes",
            "sub": "Pagar 64GB de RAM cuando tus datos pesan 4GB",
            "color": "#ef4444"
          },
          {
            "name": "Caídas en campañas de anuncios o correos",
            "cost": "VENTAS",
            "sub": "Error 500 justo cuando más gente entra a comprar",
            "color": "#fbbf24"
          }
        ],
        "bareMetalCost": "$95/mes",
        "takeaway": "MULTIPLICA TU CAPACIDAD SIN AGRANDAR LA FACTURA"
      }
    },
    {
      "id": "s07_cta",
      "type": "kinetic_hook",
      "duration": 9.5,
      "voiceover": "Si tu plataforma se cae cuando entran muchos usuarios juntos o quieres prepararla para escalar, escríbeme POOL por privado.",
      "visual_cue": "Cierre de diagnóstico sutil con palabra clave POOL",
      "props": {
        "voiceover": "Si tu plataforma se cae cuando entran muchos usuarios juntos o quieres prepararla para escalar, escríbeme POOL por privado.",
        "badge": "ESCALABILIDAD & ALTA DISPONIBILIDAD",
        "lines": [
          {
            "text": "ESCALA A MILES DE",
            "color": "#ffffff"
          },
          {
            "text": "USUARIOS SIN CAÍDAS",
            "color": "#10b981"
          }
        ],
        "subtitle": "CONNECTION POOLING · POSTGRESQL · ARQUITECTURA CLOUD",
        "ctaKeyword": "POOL",
        "ctaNote": "Revisamos cómo se conecta tu backend a la base de datos y lo dejamos blindado."
      }
    }
  ]
};
