window.__DEFAULT_MANIFEST__ = {
  "title": "[16] La sobrecarga del bundle: Por qué Module Federation degradó la web (Var A)",
  "category": "FRONTEND ARCHITECTURE & WEB PERFORMANCE",
  "slug": "16_fracaso_microfrontends",
  "variation": "A",
  "fps": 30,
  "scenes": [
    {
      "id": "vitals_hook",
      "type": "metrics_comparison",
      "duration": 6.5,
      "voiceover": "¿Por qué tantas empresas están desmantelando sus micro-frontends para volver a un monorepo unificado? Porque descargar múltiples versiones de frameworks destruyó la velocidad de carga.",
      "visual_cue": "Apertura directa con comparativa de Core Web Vitals: Micro-frontends frente a Monorepo limpio",
      "props": {
        "header": "IMPACTO EN CORE WEB VITALS",
        "metricA": {
          "label": "MICRO-FRONTENDS FEDERATION",
          "value": "3.4s LCP",
          "sub": "Puntaje de Performance: 42/100",
          "color": "#ef4444"
        },
        "metricB": {
          "label": "MONOREPO UNIFICADO",
          "value": "0.6s LCP",
          "sub": "Puntaje de Performance: 98/100",
          "color": "#10b981"
        }
      }
    },
    {
      "id": "bundle_waterfall",
      "type": "network_pipeline",
      "duration": 6.5,
      "voiceover": "Cada micro-frontend descarga su propia copia de librerías, provocando descargas de múltiples versiones de React y waterfalls de red inmanejables.",
      "visual_cue": "Pipeline visual mostrando la cascada de scripts y dependencias duplicadas",
      "props": {
        "header": "WATERFALL DE DESCARGA",
        "title": "FRAGMENTACIÓN DE DEPENDENCIAS",
        "subtitle": "TRIPLE CARGA DE FRAMEWORKS EN EL NAVEGADOR",
        "stages": [
          {
            "id": "app1",
            "label": "HEADER MFE (REACT 18.2)",
            "sub": "Descarga 140KB de runtime inicial",
            "y": 220,
            "color": "#ef4444",
            "metric": "180ms"
          },
          {
            "id": "app2",
            "label": "CHECKOUT MFE (REACT 19.0)",
            "sub": "Descarga 160KB duplicados por conflicto",
            "y": 520,
            "color": "#fbbf24",
            "metric": "290ms"
          },
          {
            "id": "app3",
            "label": "FOOTER MFE (VUE 3)",
            "sub": "Tercer framework compitiendo en hilo principal",
            "y": 820,
            "color": "#38bdf8",
            "metric": "420ms"
          }
        ]
      }
    },
    {
      "id": "cta_mf",
      "type": "tradeoff_matrix",
      "duration": 5,
      "voiceover": "Audito la arquitectura frontend y optimizo Core Web Vitals para aplicaciones complejas. Link en mi perfil para agendar una sesión técnica.",
      "visual_cue": "Cierre con llamado a auditoría de arquitectura frontend",
      "props": {
        "header": "AUDITORÍA DE ARQUITECTURA FRONTEND",
        "title": "RECUPERA LA VELOCIDAD DE TU APLICACIÓN",
        "cta": {
          "badge": "AUDITORÍA DE RENDIMIENTO WEB (Link en bio)",
          "text": "¿Tu aplicación web está pesada y fragmentada? Link en mi perfil para auditarla."
        }
      }
    }
  ]
};
