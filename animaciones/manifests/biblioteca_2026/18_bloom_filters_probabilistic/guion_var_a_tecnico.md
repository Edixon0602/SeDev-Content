# Guion de Grabación: Bloom Filters: Cómo saber si un registro existe con 99% de certeza
> **Tema #18:** 18_bloom_filters_probabilistic  
> **Variación A (TÉCNICO / ARQUITECTURA)**  
> **Categoría:** ESTRUCTURAS DE DATOS & CACHÉ  
> **Tono:** Algoritmia, funciones hash, estructuras de datos probabilísticas  
> **Duración total:** 17.5s | **Palabras:** 69 palabras (~237 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:06.5]` (6.5s) | `memory_layout` | Apertura directa con array de bits encendiéndose por hashes SHA-256 y Murmur3 | "¿Cómo saber si un usuario ya leyó un post entre quinientos millones de registros usando solo tres bits de RAM? Con Bloom Filters probabilísticos." | 24 |
| **2** | `[00:06.5 - 00:12.5]` (6.0s) | `code_terminal` | Terminal ejecutando comandos BF.EXISTS en Redis | "Puede tener falsos positivos leves, pero jamás un falso negativo. Esto ahorra millones de lecturas innecesarias al disco en Cassandra y Redis." | 22 |
| **3** | `[00:12.5 - 00:17.5]` (5.0s) | `tradeoff_matrix` | Cierre con llamado a auditoría de caché y performance | "Diseño arquitecturas de caché y capas probabilísticas para reducir la carga de bases de datos. Link en mi perfil para auditar tu sistema." | 23 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
¿Cómo saber si un usuario ya leyó un post entre quinientos millones de registros usando solo tres bits de RAM? Con Bloom Filters probabilísticos.

Puede tener falsos positivos leves, pero jamás un falso negativo. Esto ahorra millones de lecturas innecesarias al disco en Cassandra y Redis.

Diseño arquitecturas de caché y capas probabilísticas para reducir la carga de bases de datos. Link en mi perfil para auditar tu sistema.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** database
- **Última Escena (CTA Leve):** 
  > *"Diseño arquitecturas de caché y capas probabilísticas para reducir la carga de bases de datos. Link en mi perfil para auditar tu sistema."*
