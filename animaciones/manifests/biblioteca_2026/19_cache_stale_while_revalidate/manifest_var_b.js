window.__DEFAULT_MANIFEST__ = {
  "title": "[19] Cómo servir respuestas en 5 milisegundos sin servir datos desactualizados (Var B)",
  "category": "REDES & ARQUITECTURA DE CACHÉ",
  "slug": "19_cache_stale_while_revalidate",
  "variation": "B",
  "fps": 30,
  "scenes": [
    {
      "id": "metrics_swr_hook",
      "type": "metrics_comparison",
      "duration": 6.5,
      "voiceover": "No necesitas pagar un clúster de Redis para que tu web vuele. El encabezado Stale-While-Revalidate en el Edge reduce la carga de base de datos en un noventa y ocho por ciento.",
      "visual_cue": "Apertura directa con métricas de descarga de servidor y latencia TTFB",
      "props": {
        "header": "DESCARGA DE SERVIDOR DE ORIGEN",
        "metricA": {
          "label": "PETICIONES A BASE DE DATOS",
          "value": "-98.4%",
          "sub": "Solo una actualización en background por minuto",
          "color": "#10b981"
        },
        "metricB": {
          "label": "LATENCIA PERCIBIDA (TTFB)",
          "value": "6ms p95",
          "sub": "Servido directo desde el Edge más cercano",
          "color": "#38bdf8"
        }
      }
    },
    {
      "id": "cta_swr_b",
      "type": "tradeoff_matrix",
      "duration": 5,
      "voiceover": "Optimizo la capa de borde y distribución de contenido para aplicaciones de alta concurrencia. Contáctame en el link de la bio.",
      "visual_cue": "Cierre con consultoría de escalabilidad",
      "props": {
        "header": "CONSULTORÍA DE ESCALABILIDAD",
        "title": "MÁXIMA VELOCIDAD Y MÍNIMO COSTE DE SERVIDOR",
        "cta": {
          "badge": "CONSULTORÍA DE ESCALABILIDAD (Link en perfil)",
          "text": "Haz que tu backend soporte millones de visitas sin pestañear. Hablemos en mi perfil."
        }
      }
    }
  ]
};
