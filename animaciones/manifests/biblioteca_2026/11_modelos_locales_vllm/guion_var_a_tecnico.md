# Guion de Grabación: Cómo funciona la cuantización a 4 bits: GGUF sin perder inteligencia
> **Tema #11:** 11_modelos_locales_vllm  
> **Variación A (TÉCNICO / ARQUITECTURA)**  
> **Categoría:** AI INFRASTRUCTURE & OPEN WEIGHTS  
> **Tono:** Matemáticas de redes neuronales, cuantización AWQ/GGUF, GPU vRAM  
> **Duración total:** 21.5s | **Palabras:** 97 palabras (~271 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:04.5]` (4.5s) | `kinetic_hook` | Gancho cinético sobre cuantización de modelos | "¿Cómo comprimir un modelo de inteligencia artificial de treinta gigabytes para que corra en tu servidor a cien palabras por segundo? Con cuantización a 4 bits." | 26 |
| **2** | `[00:04.5 - 00:10.5]` (6.0s) | `memory_layout` | Layout de memoria comparando FP16 (2 bytes por peso) vs INT4 (0.5 bytes por peso) | "Pasar los pesos de 16 bits flotantes a enteros de 4 bits reduce la memoria por cuatro y permite que todo el modelo quepa en la memoria VRAM de tu GPU." | 31 |
| **3** | `[00:10.5 - 00:16.5]` (6.0s) | `code_terminal` | Terminal levantando vLLM con modelo cuantizado | "Con motores como vLLM y PagedAttention, el servidor procesa peticiones en lotes continuos multiplicando la velocidad de inferencia." | 18 |
| **4** | `[00:16.5 - 00:21.5]` (5.0s) | `tradeoff_matrix` | Cierre con consultoría de IA privada | "Ayudo a empresas a desplegar clústeres de inferencia privada con modelos abiertos para no depender de APIs externas. Contáctame en mi perfil." | 22 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
¿Cómo comprimir un modelo de inteligencia artificial de treinta gigabytes para que corra en tu servidor a cien palabras por segundo? Con cuantización a 4 bits.

Pasar los pesos de 16 bits flotantes a enteros de 4 bits reduce la memoria por cuatro y permite que todo el modelo quepa en la memoria VRAM de tu GPU.

Con motores como vLLM y PagedAttention, el servidor procesa peticiones en lotes continuos multiplicando la velocidad de inferencia.

Ayudo a empresas a desplegar clústeres de inferencia privada con modelos abiertos para no depender de APIs externas. Contáctame en mi perfil.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** ia_privada
- **Última Escena (CTA Leve):** 
  > *"Ayudo a empresas a desplegar clústeres de inferencia privada con modelos abiertos para no depender de APIs externas. Contáctame en mi perfil."*
