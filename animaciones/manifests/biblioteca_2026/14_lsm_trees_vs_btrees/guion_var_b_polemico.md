# Guion de Grabación: ¿Por qué tu base colapsa en escrituras masivas? Postgres vs RocksDB
> **Tema #14:** 14_lsm_trees_vs_btrees  
> **Variación B (POLÉMICO / PRAGMATISMO)**  
> **Categoría:** SISTEMAS DE ALMACENAMIENTO & BASES DE DATOS  
> **Tono:** Resolutivo, enfocado en incidentes reales de saturación de disco  
> **Duración total:** 15.5s | **Palabras:** 70 palabras (~271 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:04.5]` (4.5s) | `kinetic_hook` | Gancho cinético sobre colapso en disco | "Estás bombardeando PostgreSQL con cien mil eventos de analítica por segundo y tu disco entró en saturación total por culpa de los B-Trees." | 23 |
| **2** | `[00:04.5 - 00:10.5]` (6.0s) | `terminal_split` | Doble terminal: IOPS saturados en Postgres vs Ingesta fluida en RocksDB/ClickHouse | "No intentes usar una base de datos optimizada para lecturas para ingerir telemetría masiva. Seleccionar el motor de almacenamiento correcto salva tu infraestructura." | 23 |
| **3** | `[00:10.5 - 00:15.5]` (5.0s) | `tradeoff_matrix` | Cierre con auditoría de datos | "Audito la arquitectura de datos de tu producto para seleccionar el motor adecuado y evitar caídas en picos de tráfico. Enlace en mi bio." | 24 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
Estás bombardeando PostgreSQL con cien mil eventos de analítica por segundo y tu disco entró en saturación total por culpa de los B-Trees.

No intentes usar una base de datos optimizada para lecturas para ingerir telemetría masiva. Seleccionar el motor de almacenamiento correcto salva tu infraestructura.

Audito la arquitectura de datos de tu producto para seleccionar el motor adecuado y evitar caídas en picos de tráfico. Enlace en mi bio.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** database
- **Última Escena (CTA Leve):** 
  > *"Audito la arquitectura de datos de tu producto para seleccionar el motor adecuado y evitar caídas en picos de tráfico. Enlace en mi bio."*
