# Guion de Grabación: ¿SQLite aguanta 50K req/s? Desmitificando la concurrencia
> **Tema #02:** 02_sqlite_produccion  
> **Variación B (POLÉMICO / PRAGMATISMO)**  
> **Categoría:** BASES DE DATOS  
> **Tono:** Técnico directo, demolición de mitos, benchmarks  
> **Duración total:** 17.5s | **Palabras:** 79 palabras (~271 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:05.5]` (5.5s) | `terminal_split` | Terminal ejecutando bombardier sobre SQLite en modo WAL | "Existe el mito de que SQLite no aguanta concurrencia. Aquí estamos corriendo cincuenta mil peticiones por segundo en un solo servidor de cincuenta dólares." | 24 |
| **2** | `[00:05.5 - 00:11.5]` (6.0s) | `storage_engine_viz` | Visualizador del motor B-Tree con el WAL recibiendo escrituras secuenciales | "El secreto es el modo WAL: los lectores nunca bloquean a los escritores y las lecturas van directo a la memoria caché del kernel." | 24 |
| **3** | `[00:11.5 - 00:17.5]` (6.0s) | `metrics_comparison` | Comparativa de costos y latencia: RDS Postgres vs SQLite Litestream | "Si tu app no mueve más de mil escrituras por segundo, pagar por RDS en AWS es botar el dinero. Link en mi bio si quieres auditar tu arquitectura de datos." | 31 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
Existe el mito de que SQLite no aguanta concurrencia. Aquí estamos corriendo cincuenta mil peticiones por segundo en un solo servidor de cincuenta dólares.

El secreto es el modo WAL: los lectores nunca bloquean a los escritores y las lecturas van directo a la memoria caché del kernel.

Si tu app no mueve más de mil escrituras por segundo, pagar por RDS en AWS es botar el dinero. Link en mi bio si quieres auditar tu arquitectura de datos.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** auditoria_db
- **Última Escena (CTA Leve):** 
  > *"Si tu app no mueve más de mil escrituras por segundo, pagar por RDS en AWS es botar el dinero. Link en mi bio si quieres auditar tu arquitectura de datos."*
