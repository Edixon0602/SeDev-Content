window.__DEFAULT_MANIFEST__ = {
  "title": "[08] Por qué Discord y Cloudflare mataron Go y adoptaron Rust (Var B)",
  "category": "LENGUAJES DE SISTEMAS & RENDIMIENTO",
  "slug": "08_rust_sistemas_criticos",
  "variation": "B",
  "fps": 30,
  "scenes": [
    {
      "id": "metric_spike_hook",
      "type": "metrics_comparison",
      "duration": 6.5,
      "voiceover": "Discord tenía millones de usuarios y su servicio en Go se congelaba cada dos minutos por culpa del Garbage Collector. Reescribir en Rust eliminó los picos de latencia.",
      "visual_cue": "Apertura directa con comparativa gráfica de p99 latency con Garbage Collection vs Rust",
      "props": {
        "header": "MÉTRICAS DE RENDIMIENTO REAL",
        "metricA": {
          "label": "GO RUNTIME (GC SPIKES)",
          "value": "180ms p99",
          "sub": "Picos cada 2 minutos por barrido de memoria",
          "color": "#ef4444"
        },
        "metricB": {
          "label": "RUST (DETERMINISTIC)",
          "value": "0.8ms p99",
          "sub": "Línea completamente plana las 24 horas",
          "color": "#10b981"
        }
      }
    },
    {
      "id": "cta_rust_b",
      "type": "tradeoff_matrix",
      "duration": 5,
      "voiceover": "Construyo software de alto rendimiento y arquitectura sin picos de latencia. Si buscas un lead engineer para tu infraestructura, link en mi biografía.",
      "visual_cue": "Cierre con contratación senior",
      "props": {
        "header": "CONTRATACIÓN SENIOR BACKEND",
        "title": "SISTEMAS DE BAJA LATENCIA Y ALTO RENDIMIENTO",
        "cta": {
          "badge": "LEAD ENGINEER (Contacto en bio)",
          "text": "Desarrollo de servicios backend de misión crítica. Hablemos en el enlace de mi perfil."
        }
      }
    }
  ]
};
