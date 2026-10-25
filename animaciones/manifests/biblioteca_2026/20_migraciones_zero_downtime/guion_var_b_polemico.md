# Guion de Grabación: Nunca hagas ALTER TABLE a ciegas: Cómo evitar bloqueos de tabla
> **Tema #20:** 20_migraciones_zero_downtime  
> **Variación B (POLÉMICO / PRAGMATISMO)**  
> **Categoría:** BASES DE DATOS & PRODUCCIÓN CRÍTICA  
> **Tono:** Alerta técnica, advertencia de producción, desmitificando bloqueos de Postgres  
> **Duración total:** 15.5s | **Palabras:** 71 palabras (~275 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:04.5]` (4.5s) | `kinetic_hook` | Gancho cinético sobre el terror del bloqueo de tabla | "Hiciste un ALTER TABLE agregando un valor por defecto en producción y bloqueaste todas las lecturas y escrituras durante cuarenta minutos." | 21 |
| **2** | `[00:04.5 - 00:10.5]` (6.0s) | `terminal_split` | Doble terminal: Bloqueo infinito de tabla vs Migración segura con lock_timeout | "Postgres adquiere un bloqueo ACCESS EXCLUSIVE que frena cada petición detrás de él. Usa lock_timeout para que tu base de datos nunca se congele." | 24 |
| **3** | `[00:10.5 - 00:15.5]` (5.0s) | `tradeoff_matrix` | Cierre con consultoría de migración de bases de datos | "Audito planes de migración de datos y acompaño a startups en cambios estructurales de base de datos sin riesgo. Contáctame en el link de la bio." | 26 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
Hiciste un ALTER TABLE agregando un valor por defecto en producción y bloqueaste todas las lecturas y escrituras durante cuarenta minutos.

Postgres adquiere un bloqueo ACCESS EXCLUSIVE que frena cada petición detrás de él. Usa lock_timeout para que tu base de datos nunca se congele.

Audito planes de migración de datos y acompaño a startups en cambios estructurales de base de datos sin riesgo. Contáctame en el link de la bio.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** migracion_critica
- **Última Escena (CTA Leve):** 
  > *"Audito planes de migración de datos y acompaño a startups en cambios estructurales de base de datos sin riesgo. Contáctame en el link de la bio."*
