window.__DEFAULT_MANIFEST__ = {
  "title": "[06] \"Vibe Coding\" es una bomba de tiempo: Por qué la deuda explotará (Var B)",
  "category": "CALIDAD DE SOFTWARE & TESTING",
  "slug": "06_verificacion_vs_vibe_coding",
  "variation": "B",
  "fps": 30,
  "scenes": [
    {
      "id": "impact_hook_vibe",
      "type": "kinetic_hook",
      "duration": 4.5,
      "voiceover": "Aceptar sugerencias de IA sin entender cómo funcionan no es programar rápido: es firmar una hipoteca de deuda técnica que vas a pagar muy cara.",
      "visual_cue": "Tipografía de impacto gigante sin iconos genéricos",
      "props": {
        "layout": "impact",
        "badge": "DEBATES DE LA INDUSTRIA",
        "lines": [
          {
            "text": "\"VIBE CODING\" ES UNA",
            "color": "#ffffff"
          },
          {
            "text": "BOMBA DE TIEMPO",
            "color": "#ef4444"
          }
        ],
        "subtitle": "Deuda técnica acumulada a velocidad récord"
      }
    },
    {
      "id": "split_vibe_vs_eng",
      "type": "terminal_split",
      "duration": 6,
      "voiceover": "El código barato de escribir es carísimo de mantener si nadie en el equipo sabe cómo depurarlo cuando colapse el servicio.",
      "visual_cue": "Doble terminal: Vibe Coder improvisando vs Ingeniero aplicando verificación",
      "props": {
        "header": "EL COSTE OCULTO",
        "title": "ILUSIÓN DE VELOCIDAD VS MANTENIMIENTO",
        "termA": {
          "title": "EQUIPO \"VIBE CODING\"",
          "color": "#ef4444",
          "cmd": "git commit -m \"parece que funciona en local\"",
          "status": "32 dependencias fantasma añadidas",
          "time": "Caída p99",
          "lines": [
            "Fugas de memoria silentes en event listeners",
            "Nadie entiende el archivo de 1,200 líneas autogenerado",
            "Tiempo de resolución de incidencias: 3 días"
          ]
        },
        "termB": {
          "title": "INGENIERÍA RIGUROSA",
          "color": "#10b981",
          "cmd": "cargo test --all-features && cargo clippy",
          "status": "Cero warnings, tipos estrictos y límites claros",
          "time": "Estable 24/7",
          "lines": [
            "Invariantes de negocio validados en tipos estáticos",
            "Arquitectura modular documentada y legible",
            "Tiempo medio de recuperación: 5 minutos"
          ]
        }
      }
    },
    {
      "id": "cta_testing_b",
      "type": "tradeoff_matrix",
      "duration": 5,
      "voiceover": "Ayudo a empresas a sanear bases de código y frenar la deuda técnica generada por IA. Contáctame en el enlace de mi perfil.",
      "visual_cue": "Cierre con auditoría de deuda técnica",
      "props": {
        "header": "AUDITORÍA DE DEUDA TÉCNICA",
        "title": "RECUPERA EL CONTROL DE TU CODEBASE",
        "cta": {
          "badge": "AUDITORÍA DE ARQUITECTURA (Contacto en bio)",
          "text": "¿Tu codebase se volvió inmanejable? Hablemos en el link de la biografía."
        }
      }
    }
  ]
};
