window.__DEFAULT_MANIFEST__ = {
  "title": "[08] El Borrow Checker de Rust: Cero fugas de memoria sin GC (Var A)",
  "category": "LENGUAJES DE SISTEMAS & RENDIMIENTO",
  "slug": "08_rust_sistemas_criticos",
  "variation": "A",
  "fps": 30,
  "scenes": [
    {
      "id": "hook_rust",
      "type": "kinetic_hook",
      "duration": 4.5,
      "voiceover": "¿Cómo garantizar que un programa nunca tendrá fugas de memoria ni condiciones de carrera sin usar un recolector de basura? Con Rust.",
      "visual_cue": "Gancho cinético con engranaje industrial de Rust",
      "props": {
        "badge": "SISTEMAS CRÍTICOS 2026",
        "lines": [
          {
            "text": "EL BORROW CHECKER",
            "color": "#ffffff"
          },
          {
            "text": "DE RUST EXPLICADO",
            "color": "#f97316"
          }
        ],
        "subtitle": "SEGURIDAD DE MEMORIA EN TIEMPO DE COMPILACIÓN",
        "icon": "rust_gear"
      }
    },
    {
      "id": "memory_borrow",
      "type": "memory_layout",
      "duration": 6,
      "voiceover": "En Rust, cada recurso tiene un único dueño. Cuando la variable sale de su ámbito, la memoria se libera al instante sin pausas de ejecución.",
      "visual_cue": "Distribución de memoria Stack vs Heap y liberación sin recolector",
      "props": {
        "header": "GESTIÓN ESTÁTICA DE MEMORIA",
        "title": "PROPIEDAD Y PRÉSTAMOS (OWNERSHIP)",
        "items": [
          {
            "name": "STACK FRAME // SCOPE ACTIVO",
            "addr": "0x7fff001",
            "value": "Buffer asignado // Dueño: `data`",
            "color": "#10b981"
          },
          {
            "name": "DROP AUTOMÁTICO AL SALIR",
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
      "voiceover": "Si intentas compartir un puntero mutable entre dos hilos a la vez, el compilador se niega a generar el binario. Cero sorpresas en producción.",
      "visual_cue": "Terminal mostrando error del borrow checker previniendo una condición de carrera",
      "props": {
        "header": "PREVENCIÓN EN COMPILACIÓN",
        "title": "EL COMPILADOR DEFIENDE TU SISTEMA",
        "filename": "src/concurrency.rs",
        "codeLines": [
          "fn process(shared: &mut Data) {",
          "  thread::spawn(move || {",
          "    shared.mutate(); // ❌ ERROR E0502: Cannot borrow `shared`",
          "  });",
          "  shared.read(); // as mutable more than once at a time",
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
          "badge": "STAFF BACKEND DEVELOPER // SEDEV",
          "text": "¿Necesitas desarrollo en Rust o Go para sistemas críticos? Contáctame en el link de la bio."
        }
      }
    }
  ]
};
