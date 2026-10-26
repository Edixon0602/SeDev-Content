# Guion de Grabación: LSM Trees vs B-Trees: MemTable, SSTables y páginas en disco
> **Tema #14:** 14_lsm_trees_vs_btrees  
> **Variación A (TÉCNICO / ARQUITECTURA)**  
> **Categoría:** ESTRUCTURAS DE DATOS & DB INTERNALS  
> **Tono:** Estructuras de datos avanzadas, internals de bases de datos  
> **Duración total:** 17.5s | **Palabras:** 62 palabras (~213 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:06.5]` (6.5s) | `storage_engine_viz` | Visualizador del motor de almacenamiento LSM Tree con MemTable en RAM y compactación de SSTables | "Si tu base de datos colapsa cuando recibe millones de escrituras por segundo, estás usando la estructura de datos equivocada." | 20 |
| **2** | `[00:06.5 - 00:12.5]` (6.0s) | `tree_hierarchy` | Visualizador del árbol B balanceado mostrando el coste de la división de páginas | "Los B-Trees de PostgreSQL modifican páginas en disco de forma aleatoria, lo que desgasta los discos SSD y satura el canal de I/O." | 23 |
| **3** | `[00:12.5 - 00:17.5]` (5.0s) | `latency_scale` | Escala de latencia comparando escrituras aleatorias en B-Tree vs escrituras append-only en LSM | "Los LSM Trees como RocksDB convierten cada escritura en una operación secuencial en memoria, multiplicando el throughput por diez." | 19 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
Si tu base de datos colapsa cuando recibe millones de escrituras por segundo, estás usando la estructura de datos equivocada.

Los B-Trees de PostgreSQL modifican páginas en disco de forma aleatoria, lo que desgasta los discos SSD y satura el canal de I/O.

Los LSM Trees como RocksDB convierten cada escritura en una operación secuencial en memoria, multiplicando el throughput por diez.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** optimizacion_db
- **Última Escena (CTA Leve):** 
  > *"Los LSM Trees como RocksDB convierten cada escritura en una operación secuencial en memoria, multiplicando el throughput por diez."*
