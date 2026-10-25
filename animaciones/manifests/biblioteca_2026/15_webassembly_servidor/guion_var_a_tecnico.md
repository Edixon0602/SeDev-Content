# Guion de Grabación: Sandboxing matemático: Wasmtime y aislamiento de código
> **Tema #15:** 15_webassembly_servidor  
> **Variación A (TÉCNICO / ARQUITECTURA)**  
> **Categoría:** RUNTIMES DE SERVIDOR & WASM  
> **Tono:** Seguridad a nivel de bytecode, modelos de componentes, microsegundos  
> **Duración total:** 21.5s | **Palabras:** 92 palabras (~257 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:04.5]` (4.5s) | `kinetic_hook` | Gancho cinético sobre WebAssembly en el servidor | "¿Cómo ejecutar código no confiable escrito por usuarios a velocidad nativa sin el peligro de comprometer tu servidor? Con WebAssembly en el backend." | 23 |
| **2** | `[00:04.5 - 00:10.5]` (6.0s) | `memory_layout` | Memoria lineal delimitada de WebAssembly | "Un módulo WASI tiene una memoria lineal estrictamente delimitada. El programa no puede leer ni escribir ni un solo byte fuera de su espacio asignado." | 25 |
| **3** | `[00:10.5 - 00:16.5]` (6.0s) | `metrics_comparison` | Comparación de cold start: Docker vs WebAssembly | "Mientras un contenedor Docker tarda cientos de milisegundos en arrancar, una función WASM se inicializa en menos de un milisegundo consumiendo kilobytes." | 22 |
| **4** | `[00:16.5 - 00:21.5]` (5.0s) | `tradeoff_matrix` | Cierre con contratación senior | "Diseño arquitecturas seguras de ejecución de código y micro-runtimes aislados. Si necesitas un ingeniero especializado para tu sistema, link en mi bio." | 22 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
¿Cómo ejecutar código no confiable escrito por usuarios a velocidad nativa sin el peligro de comprometer tu servidor? Con WebAssembly en el backend.

Un módulo WASI tiene una memoria lineal estrictamente delimitada. El programa no puede leer ni escribir ni un solo byte fuera de su espacio asignado.

Mientras un contenedor Docker tarda cientos de milisegundos en arrancar, una función WASM se inicializa en menos de un milisegundo consumiendo kilobytes.

Diseño arquitecturas seguras de ejecución de código y micro-runtimes aislados. Si necesitas un ingeniero especializado para tu sistema, link en mi bio.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** contratacion_senior
- **Última Escena (CTA Leve):** 
  > *"Diseño arquitecturas seguras de ejecución de código y micro-runtimes aislados. Si necesitas un ingeniero especializado para tu sistema, link en mi bio."*
