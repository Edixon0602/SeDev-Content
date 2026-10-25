# Guion de Grabación: Bloom Filters: Cómo saber si un registro existe con 99% de certeza
> **Tema #18:** 18_bloom_filters_probabilistic  
> **Variación A (TÉCNICO / ARQUITECTURA)**  
> **Categoría:** ESTRUCTURAS DE DATOS & CACHÉ  
> **Tono:** Algoritmia, funciones hash, estructuras de datos probabilísticas  
> **Duración total:** 22.0s | **Palabras:** 96 palabras (~262 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:04.5]` (4.5s) | `kinetic_hook` | Gancho cinético sobre estructuras probabilísticas | "¿Cómo saber si un usuario ya leyó un artículo entre quinientos millones de registros usando solo un par de bits de memoria? Con Bloom Filters." | 25 |
| **2** | `[00:04.5 - 00:11.0]` (6.5s) | `memory_layout` | Array de bits encendiéndose por hashes SHA-256 / Murmur3 | "Un Bloom Filter aplica múltiples funciones hash a una clave y enciende bits en un array. Si algún bit es cero, el elemento definitivamente no existe." | 26 |
| **3** | `[00:11.0 - 00:17.0]` (6.0s) | `code_terminal` | Terminal ejecutando comandos BF.EXISTS en Redis | "Puede tener falsos positivos leves, pero jamás un falso negativo. Esto ahorra millones de lecturas innecesarias al disco en Cassandra y Redis." | 22 |
| **4** | `[00:17.0 - 00:22.0]` (5.0s) | `tradeoff_matrix` | Cierre con llamado a auditoría de caché y performance | "Diseño arquitecturas de caché y capas probabilísticas para reducir la carga de bases de datos. Link en mi perfil para auditar tu sistema." | 23 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
¿Cómo saber si un usuario ya leyó un artículo entre quinientos millones de registros usando solo un par de bits de memoria? Con Bloom Filters.

Un Bloom Filter aplica múltiples funciones hash a una clave y enciende bits en un array. Si algún bit es cero, el elemento definitivamente no existe.

Puede tener falsos positivos leves, pero jamás un falso negativo. Esto ahorra millones de lecturas innecesarias al disco en Cassandra y Redis.

Diseño arquitecturas de caché y capas probabilísticas para reducir la carga de bases de datos. Link en mi perfil para auditar tu sistema.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** database
- **Última Escena (CTA Leve):** 
  > *"Diseño arquitecturas de caché y capas probabilísticas para reducir la carga de bases de datos. Link en mi perfil para auditar tu sistema."*
