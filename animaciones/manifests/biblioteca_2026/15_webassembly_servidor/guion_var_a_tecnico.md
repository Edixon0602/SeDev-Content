# Guion de Grabación: Sandboxing matemático: Wasmtime y aislamiento de código
> **Tema #15:** 15_webassembly_servidor  
> **Variación A (TÉCNICO / ARQUITECTURA)**  
> **Categoría:** COMPILACIÓN & RUNTIMES  
> **Tono:** Sistemas formales, seguridad por aislamiento, compilación Wasm  
> **Duración total:** 17.5s | **Palabras:** 70 palabras (~240 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:06.0]` (6.0s) | `kernel_sandbox_viz` | Visualizador del sandbox de memoria lineal Wasmtime aislando código de terceros | "WebAssembly ya no es solo para el navegador. En el servidor ofrece un aislamiento de código tan seguro como Docker pero arrancando en un milisegundo." | 25 |
| **2** | `[00:06.0 - 00:11.5]` (5.5s) | `latency_scale` | Escala de latencia comparando arranque de contenedor Docker vs módulo WebAssembly | "Un contenedor Docker tarda ochocientos milisegundos en arrancar y consume cien megabytes de base. Un módulo Wasm arranca en microsegundos usando dos megabytes." | 23 |
| **3** | `[00:11.5 - 00:17.5]` (6.0s) | `terminal_split` | Terminal ejecutando wasmtime con permisos acotados mediante WASI y llamada a la acción en bio | "Ideal para plugins de usuarios y funciones serverless ultrarrápidas en el Edge. Link en bio si quieres diseñar arquitecturas seguras con WebAssembly." | 22 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
WebAssembly ya no es solo para el navegador. En el servidor ofrece un aislamiento de código tan seguro como Docker pero arrancando en un milisegundo.

Un contenedor Docker tarda ochocientos milisegundos en arrancar y consume cien megabytes de base. Un módulo Wasm arranca en microsegundos usando dos megabytes.

Ideal para plugins de usuarios y funciones serverless ultrarrápidas en el Edge. Link en bio si quieres diseñar arquitecturas seguras con WebAssembly.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** arquitectura_backend
- **Última Escena (CTA Leve):** 
  > *"Ideal para plugins de usuarios y funciones serverless ultrarrápidas en el Edge. Link en bio si quieres diseñar arquitecturas seguras con WebAssembly."*
