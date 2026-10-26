window.__DEFAULT_MANIFEST__ = {
  "title": "[16] El desastre de los Micro-frontends: La vuelta al monorepo unificado (Var B)",
  "category": "FRONTEND ARCHITECTURE & WEB PERFORMANCE",
  "slug": "16_fracaso_microfrontends",
  "variation": "B",
  "fps": 30,
  "scenes": [
    {
      "id": "metrics_bundle_shock",
      "type": "metrics_comparison",
      "duration": 6,
      "voiceover": "Adoptaste micro-frontends porque estaba de moda y ahora tu usuario tiene que descargar ocho megabytes de JavaScript para ver una simple tienda online.",
      "visual_cue": "Comparativa de peso de bundle: Micro-frontends fragmentados vs Monorepo unificado",
      "props": {
        "header": "PESO TOTAL DE JAVASCRIPT",
        "metricA": {
          "label": "MICRO-FRONTENDS FEDERATION",
          "value": "8.4 MB",
          "sub": "Múltiples runtimes compitiendo en CPU",
          "color": "#ef4444"
        },
        "metricB": {
          "label": "MONOREPO OPTIMIZADO",
          "value": "320 KB",
          "sub": "Tree-shaking estricto en un solo bundle",
          "color": "#10b981"
        }
      }
    },
    {
      "id": "stepper_mfe",
      "type": "migration_stepper_viz",
      "duration": 5.5,
      "voiceover": "Los monorepos modernos permiten que múltiples equipos trabajen de forma independiente sin destruir la experiencia del usuario final.",
      "visual_cue": "Visualizador de migración hacia monorepo modular",
      "props": {
        "badge": "SIMPLICIDAD ORGANIZATIVA",
        "title": "MIGRACIÓN HACIA MONOREPO",
        "subtitle": "ELIMINA IFRAMES Y REDUCE EL TIEMPO DE CARGA"
      }
    },
    {
      "id": "cta_mf_b",
      "type": "tradeoff_matrix",
      "duration": 4,
      "voiceover": "Si tu aplicación web está pesada y fragmentada, link en mi perfil para auditarla y devolverle la velocidad.",
      "visual_cue": "Matriz comparativa final y enlace en bio",
      "props": {
        "header": "CONSULTORÍA DE RENDIMIENTO",
        "title": "ARQUITECTURAS WEB RÁPIDAS",
        "subtitle": "LINK EN BIO PARA AUDITAR TU APLICACIÓN"
      }
    }
  ]
};
