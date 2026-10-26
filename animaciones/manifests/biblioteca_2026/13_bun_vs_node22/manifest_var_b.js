window.__DEFAULT_MANIFEST__ = {
  "title": "[13] ¿Vale la pena migrar a Bun en producción o Node.js ya cerró la brecha? (Var B)",
  "category": "RUNTIMES JAVASCRIPT",
  "slug": "13_bun_vs_node22",
  "variation": "B",
  "fps": 30,
  "scenes": [
    {
      "id": "terminal_bench_bun",
      "type": "terminal_split",
      "duration": 6,
      "voiceover": "Reescribir tu infraestructura para correr en Bun puede ser tentador, pero los bugs sutiles en librerías nativas pueden costarte semanas de depuración.",
      "visual_cue": "Terminal comparando ejecución de tests y compatibilidad de paquetes",
      "props": {
        "header": "PRUEBAS DE COMPATIBILIDAD",
        "title": "NODE 22 VS BUN EN PRODUCCIÓN",
        "leftTitle": "BUN TEST SUITE",
        "rightTitle": "NODE 22 ESTABILIDAD",
        "leftText": "$ bun test\n✔ 840 tests pasados en 0.4s\n✖ Incompatibilidad en paquete grpc-native\n✖ Error inesperado de segmentación",
        "rightText": "$ node --test\n✔ 840 tests pasados en 1.8s\n✔ 100% compatibilidad con paquetes nativos\n✔ Cero riesgos de fallos en runtime"
      }
    },
    {
      "id": "metrics_tradeoff",
      "type": "metrics_comparison",
      "duration": 5.5,
      "voiceover": "Usa Bun como gestor de paquetes y test runner en desarrollo; mantén Node 22 para los servidores de producción críticos. Link en bio para asesoría.",
      "visual_cue": "Métricas de productividad de desarrollo vs estabilidad en producción",
      "props": {
        "header": "ESTRATEGIA RECOMENDADA (Link en bio)",
        "metricA": {
          "label": "BUN EN DESARROLLO",
          "value": "30x test speed",
          "sub": "Iteración ultrarrápida de código",
          "color": "#10b981"
        },
        "metricB": {
          "label": "NODE 22 EN SERVIDOR",
          "value": "99.99% uptime",
          "sub": "Ecosistema robusto sin sorpresas",
          "color": "#38bdf8"
        }
      }
    },
    {
      "id": "cta_runtime",
      "type": "tradeoff_matrix",
      "duration": 4,
      "voiceover": "Audito arquitecturas de backend y evalúo migraciones de runtime para equipos que buscan rendimiento real sin riesgos innecesarios. Enlace en perfil.",
      "visual_cue": "Matriz de decisión final con llamada a la acción en bio",
      "props": {
        "header": "CONSULTORÍA DE BACKEND",
        "title": "DECISIONES BASADAS EN DATOS",
        "subtitle": "AUDITA TU STACK CON INGENIERÍA REAL"
      }
    }
  ]
};
