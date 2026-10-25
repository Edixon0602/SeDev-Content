# Guion de Grabación: Tu base de datos no está lenta, estás saturando el pool de conexiones
> **Tema #17:** 17_connection_pooling_pgbouncer  
> **Variación B (POLÉMICO / PRAGMATISMO)**  
> **Categoría:** BASES DE DATOS & ESCALABILIDAD  
> **Tono:** Diagnóstico de emergencia, resolutivo, enfocado en incidentes comunes  
> **Duración total:** 15.5s | **Palabras:** 79 palabras (~306 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:04.5]` (4.5s) | `kinetic_hook` | Gancho cinético sobre diagnósticos erróneos de infraestructura | "Subiste el tamaño del servidor de base de datos a una máquina de mil dólares y sigue lenta. El problema no es el hardware: es que no tienes un pooler." | 30 |
| **2** | `[00:04.5 - 00:10.5]` (6.0s) | `terminal_split` | Doble terminal: Error fatal de max_connections vs PgBouncer fluido | "Limitar las conexiones de la base de datos a dos veces el número de núcleos de CPU multiplica el throughput por cinco al eliminar la contención de cerraduras." | 28 |
| **3** | `[00:10.5 - 00:15.5]` (5.0s) | `tradeoff_matrix` | Cierre con auditoría técnica de Postgres | "Audito la configuración de PostgreSQL y resuelvo cuellos de botella de concurrencia y latencia p99. Agenda tu revisión en mi bio." | 21 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
Subiste el tamaño del servidor de base de datos a una máquina de mil dólares y sigue lenta. El problema no es el hardware: es que no tienes un pooler.

Limitar las conexiones de la base de datos a dos veces el número de núcleos de CPU multiplica el throughput por cinco al eliminar la contención de cerraduras.

Audito la configuración de PostgreSQL y resuelvo cuellos de botella de concurrencia y latencia p99. Agenda tu revisión en mi bio.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** database
- **Última Escena (CTA Leve):** 
  > *"Audito la configuración de PostgreSQL y resuelvo cuellos de botella de concurrencia y latencia p99. Agenda tu revisión en mi bio."*
