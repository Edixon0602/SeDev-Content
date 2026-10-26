window.__DEFAULT_MANIFEST__ = {
  "title": "[13] ¿Vale la pena migrar a Bun en producción o Node.js ya cerró la brecha? (Var B)",
  "category": "JAVASCRIPT RUNTIMES & HERRAMIENTAS",
  "slug": "13_bun_vs_node22",
  "variation": "B",
  "fps": 30,
  "scenes": [
    {
      "id": "impact_bun_hook",
      "type": "kinetic_hook",
      "duration": 4.5,
      "voiceover": "Bun es increíblemente rápido en tu máquina de desarrollo, pero ¿es seguro migrar toda tu infraestructura de producción hoy mismo?",
      "visual_cue": "Tipografía de impacto gigante sin iconos repetitivos",
      "props": {
        "layout": "impact",
        "badge": "DECISIÓN DE PRODUCCIÓN",
        "lines": [
          {
            "text": "¿MIGRAR A BUN O",
            "color": "#ffffff"
          },
          {
            "text": "SEGUIR EN NODE 22?",
            "color": "#38bdf8"
          }
        ],
        "subtitle": "Velocidad bruta frente a compatibilidad de paquetes"
      }
    },
    {
      "id": "tradeoff_bun_node",
      "type": "tradeoff_matrix",
      "duration": 6,
      "voiceover": "Usa Bun como gestor de paquetes y ejecutor de tests para ganar diez veces más velocidad en CI/CD; evalúa con cuidado las librerías C++ nativas en el servidor.",
      "visual_cue": "Matriz de compatibilidad y recomendación de adopción gradual",
      "props": {
        "header": "ESTRATEGIA DE ADOPCIÓN",
        "title": "DÓNDE USAR CADA RUNTIME",
        "colA": "BUN (DESARROLLO Y CI)",
        "colB": "NODE 22 (PRODUCCIÓN CORE)",
        "rows": [
          {
            "dim": "Instalación de paquetes en CI",
            "a": "✔ 30x más rápido",
            "b": "✖ Lento en pipelines",
            "aGood": true
          },
          {
            "dim": "Ejecución de tests locales",
            "a": "✔ Resultados instantáneos",
            "b": "✖ Mayor consumo CPU",
            "aGood": true
          },
          {
            "dim": "Librerías legacy en C++ (Addons)",
            "a": "✖ Casos límite",
            "b": "✔ 100% compatible N-API",
            "aGood": false
          }
        ]
      }
    },
    {
      "id": "cta_runtime_b",
      "type": "tradeoff_matrix",
      "duration": 5,
      "voiceover": "Ayudo a equipos de ingeniería a modernizar sus proyectos TypeScript sin romper producción. Contáctame en el enlace de mi perfil.",
      "visual_cue": "Cierre con consultoría de modernización",
      "props": {
        "header": "MODERNIZACIÓN DE ARQUITECTURA JS/TS",
        "title": "TRANSICIÓN SEGURA Y DE ALTO RENDIMIENTO",
        "cta": {
          "badge": "CONSULTORÍA SENIOR (Contacto en perfil)",
          "text": "Moderniza tu stack de JavaScript sin sorpresas. Agenda una sesión técnica en mi biografía."
        }
      }
    }
  ]
};
