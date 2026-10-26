# Guion de Grabación: Cómo funciona la cuantización a 4 bits: GGUF sin perder inteligencia
> **Tema #11:** 11_modelos_locales_vllm  
> **Variación A (TÉCNICO / ARQUITECTURA)**  
> **Categoría:** AI INFRASTRUCTURE & OPEN WEIGHTS  
> **Tono:** Matemáticas de redes neuronales, cuantización AWQ/GGUF, GPU vRAM  
> **Duración total:** 17.5s | **Palabras:** 81 palabras (~278 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:06.5]` (6.5s) | `quantization_weights_viz` | Visualizador de matriz de tensores FP16 comprimiéndose en bloques INT4 GGUF con factor de escala | "¿Cómo comprimir un modelo de inteligencia artificial de treinta gigabytes para que corra en tu servidor local? Pasando de coma flotante a enteros de cuatro bits con cuantización." | 28 |
| **2** | `[00:06.5 - 00:12.5]` (6.0s) | `memory_layout` | Inspección de memoria RAM mostrando empaquetado de dos pesos por cada byte de memoria | "En vez de almacenar dieciséis bits por peso, agrupamos los valores en bloques de treinta y dos pesos compartiendo una escala alfa. Ocupa un cuarto de la memoria sin perder precisión." | 31 |
| **3** | `[00:12.5 - 00:17.5]` (5.0s) | `terminal_split` | Terminal con benchmark de inferencia local vLLM y llamada a la acción en bio | "Ayudo a empresas a desplegar clústeres de inferencia privada con modelos abiertos para no depender de APIs externas. Contáctame en mi perfil." | 22 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
¿Cómo comprimir un modelo de inteligencia artificial de treinta gigabytes para que corra en tu servidor local? Pasando de coma flotante a enteros de cuatro bits con cuantización.

En vez de almacenar dieciséis bits por peso, agrupamos los valores en bloques de treinta y dos pesos compartiendo una escala alfa. Ocupa un cuarto de la memoria sin perder precisión.

Ayudo a empresas a desplegar clústeres de inferencia privada con modelos abiertos para no depender de APIs externas. Contáctame en mi perfil.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** ia_privada
- **Última Escena (CTA Leve):** 
  > *"Ayudo a empresas a desplegar clústeres de inferencia privada con modelos abiertos para no depender de APIs externas. Contáctame en mi perfil."*
