# Guion de Grabación: Procesamiento Columnar Vectorizado: 10M filas en milisegundos
> **Tema #03:** 03_duckdb_analytics  
> **Variación A (TÉCNICO / ARQUITECTURA)**  
> **Categoría:** DATA ENGINEERING & ANALYTICS  
> **Tono:** Técnico de computación, registros SIMD, almacenamiento columnar  
> **Duración total:** 21.5s | **Palabras:** 90 palabras (~251 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:04.5]` (4.5s) | `kinetic_hook` | Gancho cinético con icono columnar | "¿Cómo procesar diez millones de filas de analítica en tu laptop en medio segundo sin levantar un clúster de Spark? Con DuckDB." | 22 |
| **2** | `[00:04.5 - 00:10.5]` (6.0s) | `memory_layout` | Comparación visual de layout de memoria: Row-oriented vs Columnar Vectorized | "Las bases transaccionales leen filas enteras, desperdiciando caché de CPU. DuckDB lee solo las columnas que necesitas en vectores contiguos." | 20 |
| **3** | `[00:10.5 - 00:16.5]` (6.0s) | `code_terminal` | Terminal ejecutando query SQL directa sobre s3://bucket/data.parquet | "Puedes consultar archivos Parquet directamente en Amazon S3 sin importar los datos. Solo descargas los bytes exactos que pide tu consulta." | 21 |
| **4** | `[00:16.5 - 00:21.5]` (5.0s) | `tradeoff_matrix` | Cierre con llamado a auditoría de costes cloud de datos | "Si tu empresa gasta miles de dólares en Snowflake o BigQuery para consultas simples, audito tus costes de datos para migrar a motores in-process. Link en bio." | 27 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
¿Cómo procesar diez millones de filas de analítica en tu laptop en medio segundo sin levantar un clúster de Spark? Con DuckDB.

Las bases transaccionales leen filas enteras, desperdiciando caché de CPU. DuckDB lee solo las columnas que necesitas en vectores contiguos.

Puedes consultar archivos Parquet directamente en Amazon S3 sin importar los datos. Solo descargas los bytes exactos que pide tu consulta.

Si tu empresa gasta miles de dólares en Snowflake o BigQuery para consultas simples, audito tus costes de datos para migrar a motores in-process. Link en bio.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** cloud_costs
- **Última Escena (CTA Leve):** 
  > *"Si tu empresa gasta miles de dólares en Snowflake o BigQuery para consultas simples, audito tus costes de datos para migrar a motores in-process. Link en bio."*
