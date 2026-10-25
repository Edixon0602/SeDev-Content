window.__DEFAULT_MANIFEST__ = {
  "title": "[08] Por qué Discord y Cloudflare mataron Go y adoptaron Rust (Var B)",
  "category": "LENGUAJES DE SISTEMAS & RENDIMIENTO",
  "slug": "08_rust_sistemas_criticos",
  "variation": "B",
  "fps": 30,
  "scenes": [
    {
      "id": "hook_rust_b",
      "type": "kinetic_hook",
      "duration": 4.5,
      "voiceover": "Discord tenía millones de usuarios activos y su servicio en Go se congelaba cada dos minutos por culpa de las pausas del Garbage Collector.",
      "visual_cue": "Gancho cinético sobre el caso de estudio de Discord",
      "props": {
        "badge": "CASOS REALES DE INGENIERÍA",
        "lines": [
          {
            "text": "POR QUÉ DISCORD",
            "color": "#ffffff"
          },
          {
            "text": "MATÓ GO POR RUST",
            "color": "#f97316"
          }
        ],
        "subtitle": "ELIMINANDO LOS PICOS DE LATENCIA P99",
        "icon": "rust_gear"
      }
    },
    {
      "id": "latency_gc",
      "type": "metrics_comparison",
      "duration": 6,
      "voiceover": "Reescribieron el servicio en Rust. La latencia p99 pasó de cientos de milisegundos a una línea plana estable por debajo de un milisegundo.",
      "visual_cue": "Comparativa gráfica de p99 latency con Garbage Collection vs Rust",
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
          "sub": "Línea completamente plana 24/7",
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
        "title": "SISTEMAS DE BAJA LATENCIA & ALTO RENDIMIENTO",
        "cta": {
          "badge": "LEAD ENGINEER // SEDEV",
          "text": "Desarrollo de servicios backend de misión crítica. Hablemos en el enlace de mi perfil."
        }
      }
    }
  ]
};
