# Guion de Grabación: ¿Por qué tu base colapsa en escrituras masivas? Postgres vs RocksDB
> **Tema #14:** 14_lsm_trees_vs_btrees  
> **Variación B (POLÉMICO / PRAGMATISMO)**  
> **Categoría:** ESTRUCTURAS DE DATOS & DB INTERNALS  
> **Tono:** Directo al grano, análisis de hardware y disco, optimización de I/O  
> **Duración total:** 11.5s | **Palabras:** 45 palabras (~235 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:06.0]` (6.0s) | `storage_engine_viz` | Visualizador del motor LSM demostrando cómo las escrituras se ordenan en RAM antes de tocar el SSD | "Postgres es fantástico para consultas complejas, pero cuando le lanzas cincuenta mil inserts por segundo el I/O del disco explota." | 20 |
| **2** | `[00:06.0 - 00:11.5]` (5.5s) | `terminal_split` | Terminal comparando throughput de escrituras y llamada a la acción en bio | "Bases de datos basadas en LSM como Cassandra o RocksDB son la respuesta para telemetría y logs. Link en mi perfil para auditar tu almacenamiento." | 25 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
Postgres es fantástico para consultas complejas, pero cuando le lanzas cincuenta mil inserts por segundo el I/O del disco explota.

Bases de datos basadas en LSM como Cassandra o RocksDB son la respuesta para telemetría y logs. Link en mi perfil para auditar tu almacenamiento.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** optimizacion_db
- **Última Escena (CTA Leve):** 
  > *"Bases de datos basadas en LSM como Cassandra o RocksDB son la respuesta para telemetría y logs. Link en mi perfil para auditar tu almacenamiento."*
