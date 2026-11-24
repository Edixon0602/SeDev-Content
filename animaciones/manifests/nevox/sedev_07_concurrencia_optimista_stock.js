window.__DEFAULT_MANIFEST__ = {
  "title": "[07] Cómo vender el último producto en campaña sin bloquear toda la tienda",
  "category": "BASES DE DATOS & CONCURRENCIA",
  "pilar": "Proof of Work & Casos Reales",
  "slug": "sedev_07_concurrencia_optimista_stock",
  "introType": "VERSUS RACE",
  "ctaKeyword": "STOCK",
  "fps": 30,
  "output": "animaciones/output_clips/sedev_07_concurrencia_optimista_stock.mp4",
  "scenes": [
    {
      "id": "s01_hook",
      "type": "versus_race",
      "duration": 11.1,
      "voiceover": "Cien personas intentan comprar la última unidad en el mismo segundo. Si bloqueas la tabla para decidir quién gana, tumbas la tienda.",
      "visual_cue": "Carrera en el segundo 0: Control optimista (2.8ms) vs Bloqueo pesimista (Timeout)",
      "props": {
        "voiceover": "Cien personas intentan comprar la última unidad en el mismo segundo. Si bloqueas la tabla para decidir quién gana, tumbas la tienda.",
        "title": "LA PELEA POR LA ÚLTIMA UNIDAD",
        "subtitle": "100 COMPRADORES SIMULTÁNEOS EN EL MISMO MILISEGUNDO",
        "raceStart": 0.25,
        "sideA": {
          "name": "CONCURRENCIA OPTIMISTA",
          "tag": "SIN BLOQUEAR FILAS NI CONEXIONES",
          "targetMs": 2.8,
          "displayTime": "2.8ms",
          "memory": "4 MB RAM",
          "cacheMisses": "0 BLOQUEOS",
          "speedup": "1 GANADOR LIMPIO"
        },
        "sideB": {
          "name": "BLOQUEO PESIMISTA (FOR UPDATE)",
          "tag": "SECUESTRA LA FILA MIENTRAS PAGAN",
          "targetMs": 30000,
          "displayTime": "30,000ms",
          "memory": "POOL AL 100%",
          "cacheMisses": "DEADLOCK",
          "bottleneck": "TIENDA CAÍDA"
        }
      }
    },
    {
      "id": "s02_disaster",
      "type": "disaster_monitor",
      "duration": 11.1,
      "voiceover": "El error clásico es bloquear el producto apenas el primer usuario abre la pasarela, dejando a los otros noventa y nueve colgados esperando.",
      "visual_cue": "Monitor de conexiones de base de datos agotadas por bloqueos en espera",
      "props": {
        "voiceover": "El error clásico es bloquear el producto apenas el primer usuario abre la pasarela, dejando a los otros noventa y nueve colgados esperando.",
        "title": "EFECTO DOMINÓ POR FILA BLOQUEADA",
        "subtitle": "UN USUARIO LENTO SECUESTRA EL POOL ENTERO",
        "crashedStatus": "ERR 504: LOCK WAIT TIMEOUT EXCEEDED EN TABLA INVENTORY",
        "latencyNormal": 12,
        "latencyCrash": 30000,
        "logs": [
          {
            "time": "20:00:01",
            "level": "WARN",
            "text": "Usuario #1 abrió checkout y bloqueó fila SKU-99",
            "color": "#fbbf24"
          },
          {
            "time": "20:00:04",
            "level": "ERR",
            "text": "99 hilos web detenidos esperando liberación de lock",
            "color": "#ef4444"
          },
          {
            "time": "20:00:10",
            "level": "CRIT",
            "text": "Servidor sin conexiones libres siquiera para el catálogo",
            "color": "#f87171"
          }
        ]
      }
    },
    {
      "id": "s03_code",
      "type": "terminal_split",
      "duration": 10.7,
      "voiceover": "Con control optimista no bloqueas a nadie: actualizas el stock y subes la versión solo si el contador sigue exactamente donde estaba.",
      "visual_cue": "SQL Diff: SELECT FOR UPDATE bloqueante vs UPDATE atómico con WHERE stock > 0 AND version = v",
      "props": {
        "voiceover": "Con control optimista no bloqueas a nadie: actualizas el stock y subes la versión solo si el contador sigue exactamente donde estaba.",
        "title": "CONTROL OPTIMISTA EN 1 SOLA QUERY",
        "subtitle": "OPERACIÓN ATÓMICA EN EL MOTOR SQL",
        "leftTitle": "BLOQUEO PESIMISTA (PARALIZA EL SERVIDOR)",
        "leftCode": "BEGIN;\nSELECT stock FROM products WHERE id = 42 FOR UPDATE;\n// Llama a API externa con la fila secuestrada...\nUPDATE products SET stock = stock - 1 WHERE id = 42;\nCOMMIT;",
        "rightTitle": "UPDATE ATÓMICO OPTIMISTA (2.8ms)",
        "rightCode": "UPDATE products\nSET stock = stock - 1, version = version + 1\nWHERE id = 42 AND stock > 0 AND version = $currentVer\nRETURNING id, stock;\n// Si devuelve 0 filas: stock agotado al instante",
        "diffNote": "Cero bloqueos de lectura · Cero sobreventa"
      }
    },
    {
      "id": "s04_arch",
      "type": "architecture_flow",
      "duration": 11.6,
      "voiceover": "El primero que confirma se lleva la unidad en dos milisegundos, y el resto recibe un aviso instantáneo de agotado sin colgar el servidor.",
      "visual_cue": "Flujo en abanico (Split): 1 comprador confirma stock y 99 rebotan limpio sin lock",
      "props": {
        "voiceover": "El primero que confirma se lleva la unidad en dos milisegundos, y el resto recibe un aviso instantáneo de agotado sin colgar el servidor.",
        "layout": "split",
        "title": "FLUJO DE RESERVA DE ALTA DEMANDA",
        "subtitle": "ARQUITECTURA PARA E-COMMERCE Y TICKETING",
        "nodes": [
          {
            "id": "u",
            "label": "PICO DE CAMPAÑA (5,000 USUARIOS)",
            "sublabel": "LECTURA DE CATÁLOGO DESDE CACHÉ EN 1ms",
            "color": "#ffffff"
          },
          {
            "id": "atomic",
            "label": "COMPARACIÓN ATÓMICA (CAS / VERSION)",
            "sublabel": "DESCUENTA STOCK SIN RETENER CONEXIONES",
            "color": "#fbbf24"
          },
          {
            "id": "out",
            "label": "CONFIRMACIÓN O REBOTE INMEDIATO",
            "sublabel": "0 SOBREVENTAS · SERVIDOR AL 8% DE CPU",
            "color": "#10b981"
          }
        ]
      }
    },
    {
      "id": "s05_mem",
      "type": "memory_layout",
      "duration": 9.2,
      "voiceover": "Es exactamente el mismo principio que usan las aerolíneas y boleterías para no vender dos veces el mismo asiento.",
      "visual_cue": "Inspección de la fila en base de datos pasando de versión 1 a versión 2",
      "props": {
        "voiceover": "Es exactamente el mismo principio que usan las aerolíneas y boleterías para no vender dos veces el mismo asiento.",
        "badge": "TRANSACCIÓN EN MEMORIA",
        "title": "TRAZA DE LA FILA SKU-42",
        "items": [
          {
            "addr": "T+0.001s",
            "name": "Comprador A y B leen version = 7",
            "value": "Ambos ven 1 unidad disponible sin bloqueo"
          },
          {
            "addr": "T+0.015s",
            "name": "Comprador A ejecuta UPDATE (ver 7->8)",
            "value": "1 fila afectada: Compra aprobada en 2.8ms"
          },
          {
            "addr": "T+0.016s",
            "name": "Comprador B intenta UPDATE con ver=7",
            "value": "0 filas afectadas: Rebote limpio en 1.1ms"
          }
        ],
        "resolutionTitle": "CERO SOBREVENTAS EN PICO DE TRÁFICO",
        "resolutionSub": "Tu base de datos despacha miles de intentos por segundo"
      }
    },
    {
      "id": "s06_cost",
      "type": "cost_ticker",
      "duration": 8.8,
      "voiceover": "Corregir esa consulta permitió triplicar las ventas por minuto en campaña sin gastar un dólar extra en servidores.",
      "visual_cue": "Pérdidas por caída en lanzamiento vs solución de 1 consulta SQL",
      "props": {
        "voiceover": "Corregir esa consulta permitió triplicar las ventas por minuto en campaña sin gastar un dólar extra en servidores.",
        "title": "IMPACTO EN LANZAMIENTOS Y CAMPAÑAS",
        "subtitle": "VENTAS SALVADAS EN HORAS PICO",
        "cloudCost": 4200,
        "initialCost": 0,
        "breakdown": [
          {
            "name": "Carritos caídos en picos de anuncios",
            "cost": "$3,100",
            "sub": "Clientes que no pueden pagar cuando entran juntos",
            "color": "#ef4444"
          },
          {
            "name": "Reembolsos manuales por sobreventa",
            "cost": "$1,100",
            "sub": "Vender stock que ya no existía en bodega",
            "color": "#fbbf24"
          }
        ],
        "bareMetalCost": "$0 Extra",
        "takeaway": "EL RENDIMIENTO ESTÁ EN LA CONSULTA, NO EN PAGAR MÁS RAM"
      }
    },
    {
      "id": "s07_cta",
      "type": "kinetic_hook",
      "duration": 9.9,
      "voiceover": "Si tu tienda o sistema de reservas se pone lento cuando entra tráfico de campaña, escríbeme y revisamos tus consultas.",
      "visual_cue": "Cierre de diagnóstico sutil con palabra clave STOCK",
      "props": {
        "voiceover": "Si tu tienda o sistema de reservas se pone lento cuando entra tráfico de campaña, escríbeme y revisamos tus consultas.",
        "badge": "INGENIERÍA DE ALTO TRÁFICO",
        "lines": [
          {
            "text": "VENDE EN PICO SIN",
            "color": "#ffffff"
          },
          {
            "text": "TUMBAR TU TIENDA",
            "color": "#10b981"
          }
        ],
        "subtitle": "CONCURRENCIA · CHECKOUTS · OPTIMIZACIÓN SQL",
        "ctaKeyword": "STOCK",
        "ctaNote": "Revisamos los cuellos de botella de tu checkout antes de tu próxima campaña."
      }
    }
  ]
};
