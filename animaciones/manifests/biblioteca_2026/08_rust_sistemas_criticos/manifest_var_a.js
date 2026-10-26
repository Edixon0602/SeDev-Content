window.__DEFAULT_MANIFEST__ = {
  "title": "[08] El Borrow Checker de Rust: Cero fugas de memoria sin GC (Var A)",
  "category": "LENGUAJES DE SISTEMAS & RENDIMIENTO",
  "slug": "08_rust_sistemas_criticos",
  "variation": "A",
  "fps": 30,
  "scenes": [
    {
      "id": "memory_borrow_hook",
      "type": "memory_layout",
      "duration": 6.5,
      "voiceover": "¿Cómo garantizar que un programa nunca tendrá fugas de memoria sin usar un recolector de basura? El Borrow Checker de Rust libera la memoria de forma estática.",
      "visual_cue": "Apertura directa con layout de memoria Stack vs Heap y liberación sin recolector",
      "props": {
        "header": "GESTIÓN ESTÁTICA DE MEMORIA",
        "title": "PROPIEDAD Y PRÉSTAMOS (OWNERSHIP)",
        "items": [
          {
            "name": "STACK FRAME ACTIVO",
            "addr": "0x7fff001",
            "value": "Buffer asignado y dueño único",
            "color": "#10b981"
          },
          {
            "name": "DROP AUTOMÁTICO EN COMPILACIÓN",
            "addr": "0x7fff002",
            "value": "Cero pausas de Garbage Collector (0ns)",
            "color": "#38bdf8"
          }
        ]
      }
    },
    {
      "id": "rust_code",
      "type": "code_terminal",
      "duration": 6,
      "voiceover": "Si intentas compartir un puntero mutable entre dos hilos a la vez, el compilador se niega a generar el binario. Cero condiciones de carrera en producción.",
      "visual_cue": "Terminal mostrando error del borrow checker previniendo una condición de carrera",
      "props": {
        "header": "PREVENCIÓN EN COMPILACIÓN",
        "title": "EL COMPILADOR DEFIENDE TU SISTEMA",
        "filename": "src/concurrency.rs",
        "codeLines": [
          "fn process(shared: &mut Data) {",
          "  thread::spawn(move || {",
          "    shared.mutate(); // ERROR E0502: Cannot borrow as mutable",
          "  });",
          "  shared.read();",
          "}"
        ],
        "cursorLine": 4
      }
    },
    {
      "id": "cta_rust",
      "type": "tradeoff_matrix",
      "duration": 5,
      "voiceover": "Diseño servicios backend de alto rendimiento y baja latencia en Rust y Go. Si buscas un desarrollador senior para liderar tu sistema, link en mi perfil.",
      "visual_cue": "Cierre con contratación senior backend",
      "props": {
        "header": "CONTRATACIÓN SENIOR / STAFF ENGINEER",
        "title": "DESARROLLO DE SISTEMAS DE ALTA CONCURRENCIA",
        "cta": {
          "badge": "STAFF BACKEND DEVELOPER (Link en bio)",
          "text": "¿Necesitas desarrollo en Rust o Go para sistemas críticos? Contáctame en el link de la bio."
        }
      }
    }
  ]
};
