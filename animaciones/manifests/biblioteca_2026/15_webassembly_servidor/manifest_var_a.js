window.__DEFAULT_MANIFEST__ = {
  "title": "[15] Sandboxing matemático: Wasmtime y aislamiento de código (Var A)",
  "category": "RUNTIMES DE SERVIDOR & WASM",
  "slug": "15_webassembly_servidor",
  "variation": "A",
  "fps": 30,
  "scenes": [
    {
      "id": "hook_wasm",
      "type": "kinetic_hook",
      "duration": 4.5,
      "voiceover": "¿Cómo ejecutar código no confiable escrito por usuarios a velocidad nativa sin el peligro de comprometer tu servidor? Con WebAssembly en el backend.",
      "visual_cue": "Gancho cinético sobre WebAssembly en el servidor",
      "props": {
        "badge": "WASM SERVERLESS 2026",
        "lines": [
          {
            "text": "WEBASSEMBLY EN EL",
            "color": "#ffffff"
          },
          {
            "text": "SERVIDOR (WASMTIME)",
            "color": "#38bdf8"
          }
        ],
        "subtitle": "SANDBOXING MATEMÁTICO // ARRANQUE EN 1MS",
        "icon": "cpu"
      }
    },
    {
      "id": "wasm_memory",
      "type": "memory_layout",
      "duration": 6,
      "voiceover": "Un módulo WASI tiene una memoria lineal estrictamente delimitada. El programa no puede leer ni escribir ni un solo byte fuera de su espacio asignado.",
      "visual_cue": "Memoria lineal delimitada de WebAssembly",
      "props": {
        "header": "AISLAMIENTO MATEMÁTICO",
        "title": "MEMORIA LINEAL ENCAPSULADA",
        "items": [
          {
            "name": "ESPACIO DEL MÓDULO WASM",
            "addr": "0x0000 -> 0xFFFF",
            "value": "Memoria lineal aislada // Cero acceso a syscalls",
            "color": "#10b981"
          },
          {
            "name": "MEMORIA DEL KERNEL HOST",
            "addr": "BLOQUEADA",
            "value": "Protegida con guard pages por hardware",
            "color": "#ef4444"
          }
        ]
      }
    },
    {
      "id": "wasm_speed",
      "type": "metrics_comparison",
      "duration": 6,
      "voiceover": "Mientras un contenedor Docker tarda cientos de milisegundos en arrancar, una función WASM se inicializa en menos de un milisegundo consumiendo kilobytes.",
      "visual_cue": "Comparación de cold start: Docker vs WebAssembly",
      "props": {
        "header": "COLD START EN EDGE COMPUTING",
        "metricA": {
          "label": "CONTENEDOR DOCKER LIGHT",
          "value": "450ms",
          "sub": "Namespace init + OverlayFS mount",
          "color": "#ef4444"
        },
        "metricB": {
          "label": "WASM MICRO-RUNTIME",
          "value": "0.8ms",
          "sub": "Instanciación de memoria directa",
          "color": "#10b981"
        }
      }
    },
    {
      "id": "cta_wasm",
      "type": "tradeoff_matrix",
      "duration": 5,
      "voiceover": "Diseño arquitecturas seguras de ejecución de código y micro-runtimes aislados. Si necesitas un ingeniero especializado para tu sistema, link en mi bio.",
      "visual_cue": "Cierre con contratación senior",
      "props": {
        "header": "CONTRATACIÓN SENIOR / SISTEMAS",
        "title": "ARQUITECTURA DE RUNTIMES & EDGE COMPUTING",
        "cta": {
          "badge": "STAFF ENGINEER // SEDEV",
          "text": "¿Necesitas ejecutar plugins o código aislado de forma segura? Hablemos en mi perfil."
        }
      }
    }
  ]
};
