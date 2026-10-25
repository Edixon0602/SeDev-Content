window.__DEFAULT_MANIFEST__ = {
  "title": "[13] V8 vs JavaScriptCore: Cómo Node 22 contraatacó con TypeScript nativo (Var A)",
  "category": "JAVASCRIPT RUNTIMES & HERRAMIENTAS",
  "slug": "13_bun_vs_node22",
  "variation": "A",
  "fps": 30,
  "scenes": [
    {
      "id": "hook_runtime",
      "type": "kinetic_hook",
      "duration": 4.5,
      "voiceover": "¿Cómo respondió Node.js ante la amenaza de Bun? Con soporte nativo de TypeScript y SQLite integrado en Node veintidós.",
      "visual_cue": "Gancho cinético sobre la guerra de runtimes de JavaScript",
      "props": {
        "badge": "RUNTIMES JS EN 2026",
        "lines": [
          {
            "text": "BUN VS NODE.JS 22",
            "color": "#ffffff"
          },
          {
            "text": "LA GUERRA TOTAL",
            "color": "#fbbf24"
          }
        ],
        "subtitle": "TYPESCRIPT NATIVO // V8 VS JSC",
        "icon": "terminal"
      }
    },
    {
      "id": "runtime_split",
      "type": "terminal_split",
      "duration": 6.5,
      "voiceover": "Bun corre sobre JavaScriptCore y está escrito en Zig. Node veintidós ahora permite ejecutar archivos TypeScript sin compilar usando type-stripping nativo.",
      "visual_cue": "Doble terminal ejecutando TypeScript en ambos entornos sin transpiladores externos",
      "props": {
        "header": "EJECUCIÓN DE TYPESCRIPT SIN BUILD",
        "title": "ZERO-COMPILATION TYPESCRIPT RUNNERS",
        "termA": {
          "title": "NODE.JS 22 (--experimental-strip-types)",
          "color": "#38bdf8",
          "cmd": "node --strip-types server.ts",
          "status": "Elimina tipos en memoria y ejecuta en V8",
          "time": "0.12s cold start",
          "lines": [
            "Cero dependencias: Ni ts-node ni tsx requeridos",
            "Soporte nativo de módulo de SQLite (node:sqlite)",
            "Test runner nativo integrado con mock engine"
          ]
        },
        "termB": {
          "title": "BUN 1.2 (JAVASCRIPTCORE + ZIG)",
          "color": "#10b981",
          "cmd": "bun server.ts",
          "status": "Transpila y optimiza en código máquina nativo",
          "time": "0.015s cold start",
          "lines": [
            "Arranque ultra rápido en 15 milisegundos",
            "Empaqueta a binario ejecutable único (bun build --compile)",
            "Syscalls de red hiperoptimizadas en Zig"
          ]
        }
      }
    },
    {
      "id": "cta_runtime",
      "type": "tradeoff_matrix",
      "duration": 5,
      "voiceover": "Audito el rendimiento y la configuración de pipelines TypeScript para reducir tiempos de build y despliegue. Link en mi perfil.",
      "visual_cue": "Cierre con auditoría de performance en TypeScript",
      "props": {
        "header": "AUDITORÍA DE TOOLING & PERFORMANCE",
        "title": "OPTIMIZA TU ENTORNO TYPESCRIPT",
        "cta": {
          "badge": "AUDITORÍA DE TOOLING // SEDEV",
          "text": "¿Tus builds de TypeScript tardan demasiado? Link en mi perfil para optimizar tu stack."
        }
      }
    }
  ]
};
