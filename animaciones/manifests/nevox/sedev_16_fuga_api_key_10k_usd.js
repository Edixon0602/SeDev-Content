window.__DEFAULT_MANIFEST__ = {
  "title": "[16] El error de $10,000 por contratar desarrollo barato que expone tus llaves",
  "category": "SEGURIDAD & AUDITORÍA DE CÓDIGO",
  "pilar": "Dolor de Negocio & SaaS Trap",
  "slug": "sedev_16_fuga_api_key_10k_usd",
  "introType": "DISASTER MONITOR",
  "ctaKeyword": "BLINDAJE",
  "fps": 30,
  "output": "animaciones/output_clips/sedev_16_fuga_api_key_10k_usd.mp4",
  "scenes": [
    {
      "id": "s01_hook",
      "type": "disaster_monitor",
      "duration": 12.6,
      "voiceover": "Pagar barato por una aplicación suele salir carísimo el día que un bot escanea tu web y quema diez mil dólares de tu tarjeta en tres horas.",
      "visual_cue": "Monitor de consumo de API disparándose de madrugada por llave expuesta en el frontend",
      "props": {
        "voiceover": "Pagar barato por una aplicación suele salir carísimo el día que un bot escanea tu web y quema diez mil dólares de tu tarjeta en tres horas.",
        "title": "FUGA DE CREDENCIALES EN PRODUCCIÓN",
        "subtitle": "LLAVE DE API EXPUESTA EN EL NAVEGADOR DEL USUARIO",
        "crashedStatus": "ALERTA DE FACTURACIÓN: $9,840 CONSUMIDOS EN 3 HORAS",
        "latencyNormal": 12,
        "latencyCrash": 9840,
        "logs": [
          {
            "time": "03:14 AM",
            "level": "WARN",
            "text": "Bot automatizado escaneó bundle JS público de tu web",
            "color": "#fbbf24"
          },
          {
            "time": "03:15 AM",
            "level": "ERR",
            "text": "Llave sk-proj-... extraída de NEXT_PUBLIC_API_KEY",
            "color": "#ef4444"
          },
          {
            "time": "05:50 AM",
            "level": "CRIT",
            "text": "4.2 millones de peticiones consumidas con tu tarjeta",
            "color": "#f87171"
          }
        ]
      }
    },
    {
      "id": "s02_code",
      "type": "terminal_split",
      "duration": 13.2,
      "voiceover": "Que una pantalla se vea bonita no significa que esté bien construida: muchos desarrollos rápidos dejan las llaves de IA o base de datos visibles en el navegador.",
      "visual_cue": "Código vulnerable con llave en el cliente vs Proxy en backend con Rate-Limit en Redis",
      "props": {
        "voiceover": "Que una pantalla se vea bonita no significa que esté bien construida: muchos desarrollos rápidos dejan las llaves de IA o base de datos visibles en el navegador.",
        "title": "EL ERROR MÁS CARO DEL VIBE CODING",
        "subtitle": "CREDENCIALES EN FRONTEND VS BACKEND BLINDADO",
        "leftTitle": "CÓDIGO VULNERABLE (VISIBLE CON F12 EN CHROME)",
        "leftCode": "// Cualquiera abre 'Inspeccionar Red' y te roba la llave\nconst apiKey = process.env.NEXT_PUBLIC_OPENAI_KEY;\nfetch('https://api.openai.com/v1/chat/completions', {\n  headers: { Authorization: `Bearer ${apiKey}` }\n});",
        "rightTitle": "BACKEND AISLADO + RATE LIMIT POR IP/USUARIO",
        "rightCode": "// La llave jamás sale del servidor privado\nawait rateLimiter.consume(req.user.id, 1); // Máx 10/min\nconst payload = InputSchema.parse(req.body);\nconst res = await aiClient.generate(payload);",
        "diffNote": "Secretos en servidor + Límite de consumo por minuto"
      }
    },
    {
      "id": "s03_arch",
      "type": "cache_flow_viz",
      "duration": 11.1,
      "voiceover": "En producción real, el navegador jamás habla directo con servicios pagos ni bases de datos sin pasar por un guardia en tu servidor.",
      "visual_cue": "Filtro probabilístico y Rate-Limiter en memoria bloqueando tráfico malicioso en 0ms",
      "props": {
        "voiceover": "En producción real, el navegador jamás habla directo con servicios pagos ni bases de datos sin pasar por un guardia en tu servidor.",
        "mode": "bloom",
        "badge": "ESCUDO DE SEGURIDAD EN MEMORIA",
        "title": "FILTRADO DE BOTS Y RATE-LIMITING ANTES DEL BACKEND",
        "subtitle": "RECHAZO INSTANTÁNEO EN RAM · $0 CONSUMIDOS EN APIS"
      }
    },
    {
      "id": "s04_race",
      "type": "versus_race",
      "duration": 11.6,
      "voiceover": "Si un atacante intenta mandar diez mil peticiones por minuto, el limitador lo frena en la tercera sin gastar un centavo de tu cuenta.",
      "visual_cue": "Prueba de ataque de 10,000 peticiones: Bloqueado en 1ms con Redis vs Tarjeta vaciada",
      "props": {
        "voiceover": "Si un atacante intenta mandar diez mil peticiones por minuto, el limitador lo frena en la tercera sin gastar un centavo de tu cuenta.",
        "title": "RESPUESTA ANTE ATAQUE DE BOTS",
        "subtitle": "10,000 PETICIONES MALICIOSAS POR MINUTO",
        "sideA": {
          "name": "BACKEND CON RATE-LIMIT",
          "tag": "BLOQUEO EN REDIS EN 0.8ms",
          "targetMs": 0.8,
          "displayTime": "$0.00 ROBADO",
          "memory": "IP BLOQUEADA",
          "cacheMisses": "HTTP 429 STOP",
          "speedup": "100% PROTEGIDO"
        },
        "sideB": {
          "name": "APP SIN PROTECCIÓN",
          "tag": "ENDPOINTS ABIERTOS SIN CUOTA",
          "targetMs": 10000,
          "displayTime": "$9,840 QUEMADOS",
          "memory": "DB EXPUESTA",
          "cacheMisses": "FUGA DE DATOS",
          "bottleneck": "DESASTRE LEGAL"
        }
      }
    },
    {
      "id": "s05_mem",
      "type": "memory_layout",
      "duration": 9.2,
      "voiceover": "Son cuatro controles básicos de ingeniería que siempre reviso antes de que cualquier producto salga a recibir clientes reales.",
      "visual_cue": "Checklist de auditoría de lanzamiento: Secretos, RLS, Rate-Limiting y Validación",
      "props": {
        "voiceover": "Son cuatro controles básicos de ingeniería que siempre reviso antes de que cualquier producto salga a recibir clientes reales.",
        "badge": "AUDITORÍA PRE-LANZAMIENTO",
        "title": "4 PUNTOS QUE EVITAN TRAGEDIAS",
        "items": [
          {
            "addr": "01_SECRETS",
            "name": "Cero llaves privadas en el bundle",
            "value": "Escaneo completo del código compilado del cliente"
          },
          {
            "addr": "02_LIMITS",
            "name": "Rate-limiting por IP y por usuario",
            "value": "Nadie puede disparar bucles infinitos contra tu API"
          },
          {
            "addr": "03_PERMS",
            "name": "Permisos por fila (Row-Level Security)",
            "value": "Un usuario jamás puede leer facturas de otro cambiando el ID"
          }
        ],
        "resolutionTitle": "LANZA A PRODUCCIÓN DURMIENDO TRANQUILO",
        "resolutionSub": "Una revisión de horas te ahorra miles en sorpresas"
      }
    },
    {
      "id": "s06_cost",
      "type": "cost_ticker",
      "duration": 8,
      "voiceover": "Porque el software barato siempre termina cobrando la diferencia cuando llega el primer incidente de seguridad.",
      "visual_cue": "Costo de una brecha o factura de API robada frente a una auditoría preventiva",
      "props": {
        "voiceover": "Porque el software barato siempre termina cobrando la diferencia cuando llega el primer incidente de seguridad.",
        "title": "EL PRECIO REAL DEL 'DESARROLLO EXPRESS'",
        "subtitle": "FACTURAS ROBADAS Y FUGA DE CLIENTES",
        "cloudCost": 9840,
        "initialCost": 0,
        "breakdown": [
          {
            "name": "Consumo fraudulento de APIs en la nube",
            "cost": "$9,840",
            "sub": "Proveedores cloud rara vez perdonan llaves filtradas",
            "color": "#ef4444"
          },
          {
            "name": "Exposición de datos de clientes por falta de filtros",
            "cost": "CRÍTICO",
            "sub": "Daño directo a la reputación de la empresa",
            "color": "#fbbf24"
          }
        ],
        "bareMetalCost": "1 Auditoría",
        "takeaway": "NUNCA SALGAS A PRODUCCIÓN SIN REVISAR LOS BORDES"
      }
    },
    {
      "id": "s07_cta",
      "type": "kinetic_hook",
      "duration": 10.3,
      "voiceover": "Si mandaste a construir un sistema o estás por lanzar tu plataforma y quieres auditar que no tenga fugas, escríbeme BLINDAJE.",
      "visual_cue": "Cierre de diagnóstico sutil con palabra clave BLINDAJE",
      "props": {
        "voiceover": "Si mandaste a construir un sistema o estás por lanzar tu plataforma y quieres auditar que no tenga fugas, escríbeme BLINDAJE.",
        "badge": "AUDITORÍA DE SEGURIDAD & ARQUITECTURA",
        "lines": [
          {
            "text": "AUDITA TU APP ANTES",
            "color": "#ffffff"
          },
          {
            "text": "DE SALIR AL MERCADO",
            "color": "#10b981"
          }
        ],
        "subtitle": "REVISIÓN DE CÓDIGO · SEGURIDAD API · RATE-LIMITING",
        "ctaKeyword": "BLINDAJE",
        "ctaNote": "Revisamos tu repositorio y endpoints para cerrar vulnerabilidades antes del lanzamiento."
      }
    }
  ]
};
