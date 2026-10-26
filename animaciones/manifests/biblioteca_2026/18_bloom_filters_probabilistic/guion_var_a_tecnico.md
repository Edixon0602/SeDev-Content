# Guion de Grabación: Bloom Filters: Cómo saber si un registro existe con 99% de certeza
> **Tema #18:** 18_bloom_filters_probabilistic  
> **Variación A (TÉCNICO / ARQUITECTURA)**  
> **Categoría:** ESTRUCTURAS DE DATOS PROBABILÍSTICAS  
> **Tono:** Matemático, algoritmos probabilísticos, ahorro de lecturas en disco  
> **Duración total:** 17.5s | **Palabras:** 81 palabras (~278 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:06.5]` (6.5s) | `cache_flow_viz` | Visualizador de array de bits de Bloom Filter iluminando posiciones de hash | "¿Cómo saber si un nombre de usuario ya está registrado entre quinientos millones de registros sin tocar el disco? Usando un filtro de Bloom en memoria." | 26 |
| **2** | `[00:06.5 - 00:12.0]` (5.5s) | `code_terminal` | Terminal ejecutando comandos BF.ADD y BF.EXISTS en Redis | "La clave pasa por tres funciones hash que encienden bits en un vector binario. Si algún bit es cero, sabemos con certeza absoluta que el dato no existe." | 28 |
| **3** | `[00:12.0 - 00:17.5]` (5.5s) | `metrics_comparison` | Comparativa de lecturas de disco ahorradas gracias al filtro probabilístico | "Evitas el noventa y nueve por ciento de las consultas pesadas a la base de datos ahorrando miles de dólares en servidores. Link en bio para optimizaciones." | 27 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
¿Cómo saber si un nombre de usuario ya está registrado entre quinientos millones de registros sin tocar el disco? Usando un filtro de Bloom en memoria.

La clave pasa por tres funciones hash que encienden bits en un vector binario. Si algún bit es cero, sabemos con certeza absoluta que el dato no existe.

Evitas el noventa y nueve por ciento de las consultas pesadas a la base de datos ahorrando miles de dólares en servidores. Link en bio para optimizaciones.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** optimizacion_data
- **Última Escena (CTA Leve):** 
  > *"Evitas el noventa y nueve por ciento de las consultas pesadas a la base de datos ahorrando miles de dólares en servidores. Link en bio para optimizaciones."*
