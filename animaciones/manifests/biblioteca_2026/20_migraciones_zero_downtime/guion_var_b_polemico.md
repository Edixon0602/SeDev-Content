# Guion de Grabación: Nunca hagas ALTER TABLE a ciegas: Cómo evitar bloqueos de tabla
> **Tema #20:** 20_migraciones_zero_downtime  
> **Variación B (POLÉMICO / PRAGMATISMO)**  
> **Categoría:** BASES DE DATOS & PRODUCCIÓN CRÍTICA  
> **Tono:** Alerta técnica, advertencia de producción, desmitificando bloqueos de Postgres  
> **Duración total:** 11.5s | **Palabras:** 52 palabras (~271 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:06.5]` (6.5s) | `terminal_split` | Apertura directa con terminal mostrando bloqueo infinito de tabla frente a migración segura con lock_timeout | "Hiciste un ALTER TABLE en producción y bloqueaste todas las lecturas y escrituras durante cuarenta minutos. Postgres adquiere un ACCESS EXCLUSIVE lock que frena cada petición." | 26 |
| **2** | `[00:06.5 - 00:11.5]` (5.0s) | `tradeoff_matrix` | Cierre con consultoría de migración de bases de datos | "Audito planes de migración de datos y acompaño a startups en cambios estructurales de base de datos sin riesgo. Contáctame en el link de la bio." | 26 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
Hiciste un ALTER TABLE en producción y bloqueaste todas las lecturas y escrituras durante cuarenta minutos. Postgres adquiere un ACCESS EXCLUSIVE lock que frena cada petición.

Audito planes de migración de datos y acompaño a startups en cambios estructurales de base de datos sin riesgo. Contáctame en el link de la bio.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** migracion_critica
- **Última Escena (CTA Leve):** 
  > *"Audito planes de migración de datos y acompaño a startups en cambios estructurales de base de datos sin riesgo. Contáctame en el link de la bio."*
