window.__DEFAULT_MANIFEST__ = {
  "title": "[15] Sandboxing matemático: Wasmtime y aislamiento de código (Var A)",
  "category": "COMPILACIÓN & RUNTIMES",
  "slug": "15_webassembly_servidor",
  "variation": "A",
  "fps": 30,
  "scenes": [
    {
      "id": "kernel_wasm_lead",
      "type": "kernel_sandbox_viz",
      "duration": 6,
      "voiceover": "WebAssembly ya no es solo para el navegador. En el servidor ofrece un aislamiento de código tan seguro como Docker pero arrancando en un milisegundo.",
      "visual_cue": "Visualizador del sandbox de memoria lineal Wasmtime aislando código de terceros",
      "props": {
        "badge": "SANDBOXING MATEMÁTICO",
        "title": "WASMTIME: AISLAMIENTO FORMAL",
        "subtitle": "MEMORIA LINEAL AISLADA SIN CONTENEDORES PESADOS"
      }
    },
    {
      "id": "latency_wasm",
      "type": "latency_scale",
      "duration": 5.5,
      "voiceover": "Un contenedor Docker tarda ochocientos milisegundos en arrancar y consume cien megabytes de base. Un módulo Wasm arranca en microsegundos usando dos megabytes.",
      "visual_cue": "Escala de latencia comparando arranque de contenedor Docker vs módulo WebAssembly",
      "props": {
        "header": "MÉTRICAS DE ARRANQUE EN FRÍO",
        "title": "DOCKER VS WEBASSEMBLY EN SERVIDOR",
        "subtitle": "TIEMPO DE INICIALIZACIÓN DE INSTANCIA"
      }
    },
    {
      "id": "terminal_wasm",
      "type": "terminal_split",
      "duration": 6,
      "voiceover": "Ideal para plugins de usuarios y funciones serverless ultrarrápidas en el Edge. Link en bio si quieres diseñar arquitecturas seguras con WebAssembly.",
      "visual_cue": "Terminal ejecutando wasmtime con permisos acotados mediante WASI y llamada a la acción en bio",
      "props": {
        "header": "CONSULTORÍA EN WASM (Link en bio)",
        "title": "COMPUTACIÓN SEGURA EN EL EDGE",
        "leftTitle": "WASMTIME CLI",
        "rightTitle": "BENEFICIOS DE SEGURIDAD",
        "leftText": "$ wasmtime run --dir=/tmp plugin.wasm\n✔ Memoria lineal limitada a 16 MB\n✔ Sin acceso a red ni disco no autorizado\n✔ Tiempo de ejecución: 1.2 ms",
        "rightText": "• Permite ejecutar código de clientes sin riesgo\n• 100x más ligero que máquinas virtuales\n• Apto para arquitectura Edge y Serverless\n• Asesoría técnica: enlace en perfil"
      }
    }
  ]
};
