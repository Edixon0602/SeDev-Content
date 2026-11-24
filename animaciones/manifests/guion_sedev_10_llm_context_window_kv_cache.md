# 🎬 Guion de Grabación & Edición SeDev: [10] Por qué tu IA se vuelve más cara y lenta mientras más hablas
**Categoría:** IA REAL & COMPILACIÓN DE MODELOS  
**Tema:** La atención cuadrática O(N²) y el cuello de botella del KV Cache en VRAM  
**Carpeta de B-Rolls Sueltos:** `animaciones/output_clips/sedev_brolls/sedev_10_llm_context_window_kv_cache/`  

---

## 🎙️ Guion Completo de Cámara (Grábalo de corrido a tu ritmo en teleprompter)

> "Decirle a una inteligencia artificial 'recuerda toda esta conversación para siempre' es imposible por culpa de esta matriz matemática."  
>  
> "En un modelo de lenguaje, cada palabra debe calcular su relación con todas las palabras anteriores. Si duplicas la longitud de tu conversación, el cómputo de la matriz de atención no sube al doble: sube al cuádruple."  
>  
> "Para no recalcular todo desde cero en cada respuesta, los servidores guardan los vectores intermedios en una memoria llamada KV Cache."  
>  
> "Con un contexto largo de treinta y dos mil tokens, ese cache puede comerse veinticuatro gigas de memoria de video para un solo usuario. Por eso las IAs cobran tanto por contextos gigantes."  
>  
> "Detrás del texto fluido hay pura álgebra lineal y limitaciones físicas de hardware. Sígueme si quieres entender cómo funciona la IA por dentro."

---

## ✂️ Instrucciones para Edición (Arrastrar y Soltar en CapCut / Premiere / DaVinci)

| Momento en tu Locución | Toma en Pantalla | Archivo a Usar |
| :--- | :--- | :--- |
| **01. Gancho inicial** | 👤 **Tu cara a cámara** | Tu video grabado |
| **02. Explicación problema/mecanismo** | 🎬 **B-ROLL #01** *(Encima de tu voz)* | `broll_01_attention_matrix_math.mp4` (9s) |
| **03. Giro / La curiosidad** | 👤 **Tu cara a cámara** | Tu video grabado |
| **04. Solución / Algoritmo en acción** | 🎬 **B-ROLL #02** *(Encima de tu voz)* | `broll_02_kv_cache_vram_saturation.mp4` (9s) |
| **05. Cierre & Sígueme** | 👤 **Tu cara a cámara** | Tu video grabado |

---

### Descripción de los B-Rolls individuales:
1. **`broll_01_attention_matrix_math.mp4`**: Matriz de auto-atención cuadrática O(N^2) multiplicando QK^T (`quantization_weights_viz`, 9s · Tema: `blueprint`)
2. **`broll_02_kv_cache_vram_saturation.mp4`**: Flujo de VRAM consumida por el KV Cache por usuario concurrente (`cache_flow_viz`, 9s · Tema: `blueprint`)
