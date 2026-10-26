# Guion de Grabación: Tu base de datos no está lenta, estás saturando el pool de conexiones
> **Tema #17:** 17_connection_pooling_pgbouncer  
> **Variación B (POLÉMICO / PRAGMATISMO)**  
> **Categoría:** BASES DE DATOS & ESCALABILIDAD  
> **Tono:** Provocador, directo, salvando bases de datos de startups  
> **Duración total:** 11.5s | **Palabras:** 57 palabras (~297 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:06.0]` (6.0s) | `connection_pool_viz` | Visualizador de PgBouncer absorbiendo la sobrecarga de conexiones | "Tu backend en Node o Serverless abre conexiones a lo loco y cuando sube el tráfico tu base de datos se congela. El problema no son tus queries, es la saturación de conexiones." | 33 |
| **2** | `[00:06.0 - 00:11.5]` (5.5s) | `metrics_comparison` | Comparativa de memoria consumida: 10 GB sin pool vs 200 MB con PgBouncer | "Un servidor de base de datos con cuatro núcleos solo puede ejecutar cuatro queries simultáneamente en CPU. Tener quinientas conexiones abiertas solo causa contención." | 24 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
Tu backend en Node o Serverless abre conexiones a lo loco y cuando sube el tráfico tu base de datos se congela. El problema no son tus queries, es la saturación de conexiones.

Un servidor de base de datos con cuatro núcleos solo puede ejecutar cuatro queries simultáneamente en CPU. Tener quinientas conexiones abiertas solo causa contención.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** optimizacion_db
- **Última Escena (CTA Leve):** 
  > *"Un servidor de base de datos con cuatro núcleos solo puede ejecutar cuatro queries simultáneamente en CPU. Tener quinientas conexiones abiertas solo causa contención."*
