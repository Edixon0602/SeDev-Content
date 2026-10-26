window.__DEFAULT_MANIFEST__ = {
  "title": "[16] La sobrecarga del bundle: Por qué Module Federation degradó la web (Var A)",
  "category": "FRONTEND ARCHITECTURE & WEB PERFORMANCE",
  "slug": "16_fracaso_microfrontends",
  "variation": "A",
  "fps": 30,
  "scenes": [
    {
      "id": "dep_tree_hook",
      "type": "tree_hierarchy",
      "duration": 6.5,
      "voiceover": "¿Por qué tantas empresas están desmantelando sus micro-frontends para volver a un monorepo unificado? Porque descargar múltiples versiones de frameworks destruyó la velocidad de carga.",
      "visual_cue": "Visualizador de árbol de dependencias duplicadas compitiendo en el navegador",
      "props": {
        "badge": "FRAGMENTACIÓN DE RUNTIMES",
        "title": "EXPLOSIÓN DE DEPENDENCIAS MFE",
        "items": [
          {
            "name": "App Shell (Host)",
            "level": 0
          },
          {
            "name": "Header MFE (React 18.2)",
            "level": 1
          },
          {
            "name": "Checkout MFE (React 19.0 Duplicado)",
            "level": 1
          },
          {
            "name": "Catalog MFE (Vue 3 en Iframe)",
            "level": 1
          }
        ]
      }
    },
    {
      "id": "stepper_consolidation",
      "type": "migration_stepper_viz",
      "duration": 6,
      "voiceover": "Cada micro-frontend descarga su propio runtime. La solución moderna es consolidar en un monorepo con Turborepo manteniendo aislamiento por paquetes de código.",
      "visual_cue": "Visualizador de fases de consolidación hacia monorepo unificado",
      "props": {
        "badge": "CONSOLIDACIÓN ARQUITECTÓNICA",
        "title": "RETORNO AL MONOREPO LIMPIO",
        "subtitle": "TURBOREPO + ARQUITECTURA DE COMPONENTES COMPARTIDOS"
      }
    },
    {
      "id": "cta_mf",
      "type": "terminal_split",
      "duration": 5.5,
      "voiceover": "Audito la arquitectura frontend y optimizo Core Web Vitals para aplicaciones complejas. Link en mi perfil para agendar una sesión técnica.",
      "visual_cue": "Terminal con análisis de bundle y llamada a la acción en bio",
      "props": {
        "header": "AUDITORÍA FRONTEND (Link en bio)",
        "title": "OPTIMIZACIÓN DE CORE WEB VITALS",
        "leftTitle": "ANÁLISIS DE BUNDLE",
        "rightTitle": "MÉTRICAS CLAVE",
        "leftText": "$ npx bundlesize-audit\n✔ Bundle unificado: 180 KB (Gzipped)\n✔ LCP reducido de 3.8s a 0.7s\n✔ Eliminadas 4 versiones duplicadas de React",
        "rightText": "• Aumenta la conversión de checkout\n• Cero conflictos de CSS global\n• Despliegues seguros con tipado estricto\n• Agenda sesión: enlace en el perfil"
      }
    }
  ]
};
