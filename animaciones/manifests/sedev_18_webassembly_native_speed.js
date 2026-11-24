window.__DEFAULT_MANIFEST__ = {
  "title": "[18] ¿Qué es WebAssembly y por qué corre a velocidad nativa en Chrome?",
  "slug": "sedev_18_webassembly_native_speed",
  "category": "COMPILADORES & RUNTIMES WEB",
  "tagline": "Bytecode tipado lineal vs el compilador JIT dinámico de JavaScript",
  "fps": 30,
  "outputDir": "animaciones/output_clips/sedev_brolls/sedev_18_webassembly_native_speed",
  "script": {
    "hook": "Figma, Google Earth y Photoshop corren dentro de una pestaña de Chrome tan rápido como en tu propio escritorio gracias a esta tecnología.",
    "broll1_lead": "Tradicionalmente, el navegador solo entendía JavaScript. Para correr código rápido, el motor V8 tiene que analizar el texto, predecir tipos con un compilador JIT y, si te equivocas de tipo, desoptimizar y volver a empezar.",
    "camera_pivot": "WebAssembly cambió las reglas del juego: permite compilar lenguajes como C++, Rust o Go a un formato binario compacto y seguro que corre directamente en el procesador.",
    "broll2_lead": "Tiene su propia memoria lineal aislada, tipos estáticos estrictos y cero pausas por recolección de basura. Por eso los motores gráficos pesados logran sesenta cuadros por segundo fijos dentro de la web.",
    "outro": "El navegador dejó de ser un lector de páginas para convertirse en un sistema operativo completo. Sígueme si quieres estar al día con el futuro del desarrollo."
  },
  "brolls": [
    {
      "id": "broll_01_js_jit_vs_wasm_bytecode",
      "purpose": "Comparativa de pipelines: JS dinámico con JIT vs Bytecode Wasm directo a CPU",
      "type": "terminal_split",
      "duration": 9,
      "props": {
        "theme": "dark",
        "title": "PIPELINE DE EJECUCIÓN EN EL NAVEGADOR",
        "subtitle": "JAVASCRIPT JIT VS WEBASSEMBLY LINEAR BYTECODE",
        "leftTitle": "JAVASCRIPT TRADICIONAL (JIT)",
        "leftCode": "1. Parseo de código fuente texto\n2. Bytecode Ignition\n3. TurboFan JIT (Especulación de tipos)\n// Deoptimización si cambian tipos en runtime!",
        "rightTitle": "WEBASSEMBLY (WASM BINARIO)",
        "rightCode": "1. Bytecode binario pre-compilado (.wasm)\n2. Validación estática O(N) en streaming\n3. Compilación directa a código máquina CPU\n// Cero pausas de desoptimización",
        "diffNote": "Arranque instantáneo y rendimiento predecible al 95% de C++"
      },
      "voiceover": "Tradicionalmente, el navegador solo entendía JavaScript. Para correr código rápido, el motor V8 tiene que analizar el texto, predecir tipos con un compilador JIT y, si te equivocas de tipo, desoptimizar y volver a empezar.",
      "visual_cue": "Comparativa de pipelines: JS dinámico con JIT vs Bytecode Wasm directo a CPU"
    },
    {
      "id": "broll_02_wasm_canvas_benchmark",
      "purpose": "Benchmark en vivo: Renderizado Canvas JS trabado en GC vs Wasm fluido a 60fps",
      "type": "versus_race",
      "duration": 8.5,
      "props": {
        "theme": "dark",
        "title": "BENCHMARK RENDERIZADO GRÁFICO (FIGMA ENGINE)",
        "subtitle": "MANIPULACIÓN DE 500,000 VECTORES EN PANTALLA",
        "sideA": {
          "name": "WEBASSEMBLY (RUST NATIVE)",
          "tag": "MEMORIA LINEAL CONTIGUA",
          "targetMs": 16.6,
          "displayTime": "60.0 FPS LOCKED",
          "memory": "48 MB",
          "cacheMisses": "0ms GC PAUSE",
          "speedup": "FLUIDEZ TOTAL"
        },
        "sideB": {
          "name": "JAVASCRIPT TRADICIONAL",
          "tag": "GARBAGE COLLECTION OVERHEAD",
          "targetMs": 48.2,
          "displayTime": "21.4 FPS STUTTER",
          "memory": "380 MB",
          "cacheMisses": "GC HICCUPS",
          "bottleneck": "PAUSAS DE MEMORIA"
        }
      },
      "voiceover": "Tiene su propia memoria lineal aislada, tipos estáticos estrictos y cero pausas por recolección de basura. Por eso los motores gráficos pesados logran sesenta cuadros por segundo fijos dentro de la web.",
      "visual_cue": "Benchmark en vivo: Renderizado Canvas JS trabado en GC vs Wasm fluido a 60fps"
    }
  ]
};
