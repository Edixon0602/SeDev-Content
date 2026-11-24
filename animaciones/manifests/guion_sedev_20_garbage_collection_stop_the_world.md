# 🎬 Guion de Grabación & Edición SeDev: [20] ¿Por qué el Garbage Collector congela tu servidor en hora pico?
**Categoría:** MEMORIA, RUNTIMES & PERFORMANCE  
**Tema:** El algoritmo Mark & Sweep y el infame misterio del 'Stop the World'  
**Carpeta de B-Rolls Sueltos:** `animaciones/output_clips/sedev_brolls/sedev_20_garbage_collection_stop_the_world/`  

---

## 🎙️ Guion Completo de Cámara (Grábalo de corrido a tu ritmo en teleprompter)

> "Escribes código en Python, Node o Java y nunca te preocupas por liberar memoria... hasta que tu servidor se congela doscientos milisegundos en plena hora pico."  
>  
> "Esa pausa silenciosa tiene un nombre: Stop the World. El recolector de basura tiene que detener todos los hilos de tu aplicación para recorrer la memoria viva y limpiar los objetos huérfanos sin que nada se mueva en el camino."  
>  
> "Para mitigar esto, los motores modernos usan recolección generacional: saben que casi todos los objetos mueren jóvenes, así que limpian primero la memoria reciente."  
>  
> "Pero cuando se acumulan millones de objetos viejos, no hay escapatoria: el recolector congela la ejecución completa para hacer un barrido profundo, disparando las alarmas de latencia de tu sistema."  
>  
> "Por eso en sistemas de finanzas y baja latencia prefieren Rust o C con gestión manual determinista. Sígueme para más secretos de la ingeniería de alto rendimiento."

---

## ✂️ Instrucciones para Edición (Arrastrar y Soltar en CapCut / Premiere / DaVinci)

| Momento en tu Locución | Toma en Pantalla | Archivo a Usar |
| :--- | :--- | :--- |
| **01. Gancho inicial** | 👤 **Tu cara a cámara** | Tu video grabado |
| **02. Explicación problema/mecanismo** | 🎬 **B-ROLL #01** *(Encima de tu voz)* | `broll_01_generational_gc_layout.mp4` (9s) |
| **03. Giro / La curiosidad** | 👤 **Tu cara a cámara** | Tu video grabado |
| **04. Solución / Algoritmo en acción** | 🎬 **B-ROLL #02** *(Encima de tu voz)* | `broll_02_stop_the_world_spike_monitor.mp4` (8.5s) |
| **05. Cierre & Sígueme** | 👤 **Tu cara a cámara** | Tu video grabado |

---

### Descripción de los B-Rolls individuales:
1. **`broll_01_generational_gc_layout.mp4`**: Estructura de memoria generacional: Eden space -> Survivor -> Tenured Old Gen (`memory_layout`, 9s · Tema: `dark`)
2. **`broll_02_stop_the_world_spike_monitor.mp4`**: Monitor de latencia con pico de 250ms de congelamiento de hilos (`disaster_monitor`, 8.5s · Tema: `dark`)
