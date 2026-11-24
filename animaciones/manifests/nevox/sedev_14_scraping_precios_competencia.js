window.__DEFAULT_MANIFEST__ = {
  "title": "[14] Cómo monitorear los precios y stock de tus 5 competidores cada 15 minutos",
  "category": "EXTRACCIÓN DE DATOS & ECOMMERCE",
  "pilar": "Automatizaciones de Alto Impacto / IA Real",
  "slug": "sedev_14_scraping_precios_competencia",
  "introType": "KINETIC SLAM",
  "ctaKeyword": "DATOS",
  "fps": 30,
  "output": "animaciones/output_clips/sedev_14_scraping_precios_competencia.mp4",
  "scenes": [
    {
      "id": "s01_hook",
      "type": "kinetic_slam",
      "duration": 8.8,
      "voiceover": "Fijar precios a ciegas mientras tu competencia ajusta su catálogo en automático es regalar margen todos los días.",
      "visual_cue": "Golpe tipográfico sobre inteligencia de precios y stock en tiempo real",
      "props": {
        "voiceover": "Fijar precios a ciegas mientras tu competencia ajusta su catálogo en automático es regalar margen todos los días.",
        "badge": "INTELIGENCIA COMPETITIVA AUTOMATIZADA",
        "lines": [
          {
            "text": "TU COMPETENCIA CAMBIA",
            "color": "#ffffff"
          },
          {
            "text": "PRECIOS A CIEGAS",
            "color": "#ef4444",
            "strike": true
          },
          {
            "text": "EN AUTOMÁTICO CADA HORA",
            "highlight": "#10b981",
            "textColor": "#050505"
          }
        ],
        "stat": "EL QUE DETECTA UN QUIEBRE DE STOCK PRIMERO GANA EL MERCADO",
        "subtitle": "MONITOREO DE CATÁLOGOS CADA 15 MINUTOS"
      }
    },
    {
      "id": "s02_arch",
      "type": "storage_engine_viz",
      "duration": 9.7,
      "voiceover": "Armamos un motor de extracción que revisa el catálogo y el stock de los cinco competidores principales cada quince minutos.",
      "visual_cue": "Motor columnar analítico comparando miles de precios y stocks en milisegundos",
      "props": {
        "voiceover": "Armamos un motor de extracción que revisa el catálogo y el stock de los cinco competidores principales cada quince minutos.",
        "mode": "columnar",
        "badge": "INTELIGENCIA DE PRECIOS Y STOCK",
        "title": "COMPARACIÓN MASIVA DE CATÁLOGOS CADA 15M",
        "subtitle": "DETECCIÓN INSTANTÁNEA DE QUIEBRES DE STOCK Y OFERTAS"
      }
    },
    {
      "id": "s03_code",
      "type": "terminal_split",
      "duration": 11.1,
      "voiceover": "El secreto técnico es no abrir un navegador pesado por cada producto, sino consultar directo la respuesta interna de datos de la tienda.",
      "visual_cue": "Comparativa de código: Scraper novato abriendo Chrome pesado vs Petición directa a API JSON",
      "props": {
        "voiceover": "El secreto técnico es no abrir un navegador pesado por cada producto, sino consultar directo la respuesta interna de datos de la tienda.",
        "title": "SCRAPING PESADO VS EXTRACCIÓN DE INGENIERÍA",
        "subtitle": "VELOCIDAD Y CONSUMO DE RECURSOS",
        "leftTitle": "SCRAPER FRÁGIL (ABRIR CHROME POR PÁGINA)",
        "leftCode": "// Consume 4 GB de RAM y tarda 2 horas\nconst page = await browser.newPage();\nawait page.goto(url); // Descarga 15 MB de anuncios\nconst price = await page.$eval('.price-tag', el => el.innerText);",
        "rightTitle": "INTERCEPCIÓN DE API JSON INTERNA (40ms)",
        "rightCode": "const data = await fetchCatalogApi(competitorId, {\n  headers: signedSessionHeaders,\n  proxy: cleanResidentialPool.next()\n}); // Extrae 500 productos en 1.4 segundos",
        "diffNote": "100x más rápido y resistente a cambios de diseño"
      }
    },
    {
      "id": "s04_race",
      "type": "versus_race",
      "duration": 10.9,
      "voiceover": "Así puedes escanear cinco mil productos en segundos sin que se rompa el sistema cada vez que cambian el color de un botón.",
      "visual_cue": "Carrera de escaneo de 2,000 SKUs: Extracción JSON (14s) vs Revisión manual en Excel (3 días)",
      "props": {
        "voiceover": "Así puedes escanear cinco mil productos en segundos sin que se rompa el sistema cada vez que cambian el color de un botón.",
        "title": "ESCANEO DE 2,000 PRODUCTOS RIVALES",
        "subtitle": "FRECUENCIA DE ACTUALIZACIÓN DE DATOS",
        "sideA": {
          "name": "EXTRACTOR DIRECTO JSON",
          "tag": "CADA 15 MINUTOS EN AUTOMÁTICO",
          "targetMs": 14,
          "displayTime": "14 seg",
          "memory": "45 MB RAM",
          "cacheMisses": "DATOS AL DÍA",
          "speedup": "TIEMPO REAL"
        },
        "sideB": {
          "name": "REVISAR A MANO EN EXCEL",
          "tag": "1 VEZ AL MES SI HAY TIEMPO",
          "targetMs": 86400,
          "displayTime": "3 DÍAS",
          "memory": "MUESTRA MÍNIMA",
          "cacheMisses": "PRECIOS VIEJOS",
          "bottleneck": "DECIDES A CIEGAS"
        }
      }
    },
    {
      "id": "s05_mem",
      "type": "memory_layout",
      "duration": 10.3,
      "voiceover": "Cuando un competidor se queda sin stock en su producto estrella, recibes el aviso al instante para capturar toda esa demanda.",
      "visual_cue": "Tres señales accionables que entrega el monitor de precios y stock",
      "props": {
        "voiceover": "Cuando un competidor se queda sin stock en su producto estrella, recibes el aviso al instante para capturar toda esa demanda.",
        "badge": "SEÑALES DE MARGEN EN VIVO",
        "title": "3 ALERTAS QUE PAGAN EL SISTEMA",
        "items": [
          {
            "addr": "STOCK_OUT",
            "name": "Rival se quedó sin unidades",
            "value": "Puedes subir tu precio o empujar anuncios hoy"
          },
          {
            "addr": "PRICE_DROP",
            "name": "Rival lanzó descuento agresivo",
            "value": "Te enteras en 15 minutos, no cuando caen tus ventas"
          },
          {
            "addr": "NEW_SKU",
            "name": "Nuevos productos en su catálogo",
            "value": "Detectas qué líneas están importando antes que nadie"
          }
        ],
        "resolutionTitle": "DECISIONES COMERCIALES CON DATOS REALES",
        "resolutionSub": "Tu tablero actualizado cada 15 minutos sin intervención humana"
      }
    },
    {
      "id": "s06_cost",
      "type": "cost_ticker",
      "duration": 10.7,
      "voiceover": "Los datos públicos de tu mercado ya están ahí afuera; la ventaja la tiene quien los convierte en decisiones antes del mediodía.",
      "visual_cue": "Margen recuperado al ajustar precios según el stock real del mercado",
      "props": {
        "voiceover": "Los datos públicos de tu mercado ya están ahí afuera; la ventaja la tiene quien los convierte en decisiones antes del mediodía.",
        "title": "IMPACTO EN MARGEN COMERCIAL",
        "subtitle": "REACCIONAR EN 15 MINUTOS VS A FIN DE MES",
        "cloudCost": 2600,
        "initialCost": 0,
        "breakdown": [
          {
            "name": "Ventas perdidas por precio desfasado",
            "cost": "$1,700/mes",
            "sub": "No detectar ofertas de la competencia a tiempo",
            "color": "#ef4444"
          },
          {
            "name": "Margen regalado cuando tú eres el único con stock",
            "cost": "$900/mes",
            "sub": "Vender barato cuando el rival agotó inventario",
            "color": "#fbbf24"
          }
        ],
        "bareMetalCost": "Cada 15m",
        "takeaway": "INTELIGENCIA DE MERCADO AUTOMATIZADA A MEDIDA"
      }
    },
    {
      "id": "s07_cta",
      "type": "kinetic_hook",
      "duration": 9.7,
      "voiceover": "Si necesitas monitorear precios, catálogos o datos públicos de tu sector en automático, escríbeme la palabra DATOS por privado.",
      "visual_cue": "Cierre de diagnóstico sutil con palabra clave DATOS",
      "props": {
        "voiceover": "Si necesitas monitorear precios, catálogos o datos públicos de tu sector en automático, escríbeme la palabra DATOS por privado.",
        "badge": "EXTRACCIÓN DE DATOS & MONITOREO",
        "lines": [
          {
            "text": "MONITOREA TU MERCADO",
            "color": "#ffffff"
          },
          {
            "text": "EN TIEMPO REAL",
            "color": "#10b981"
          }
        ],
        "subtitle": "SCRAPING AVANZADO · MONITOREO DE PRECIOS · ALERTAS",
        "ctaKeyword": "DATOS",
        "ctaNote": "Analizamos las fuentes que necesitas rastrear y armamos el pipeline de extracción."
      }
    }
  ]
};
