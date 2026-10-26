# Guion de Grabación: Nunca hagas ALTER TABLE a ciegas: Cómo evitar bloqueos de tabla
> **Tema #20:** 20_migraciones_zero_downtime  
> **Variación B (POLÉMICO / PRAGMATISMO)**  
> **Categoría:** BASES DE DATOS & OPERACIONES EN VIVO  
> **Tono:** Advertencia técnica, historias de terror en producción, lecciones reales  
> **Duración total:** 11.5s | **Palabras:** 46 palabras (~240 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:06.0]` (6.0s) | `migration_stepper_viz` | Visualizador de prevención de bloqueos mediante fases progresivas | "Un simple ALTER TABLE adquiere un bloqueo exclusivo en PostgreSQL que encola todas las lecturas y escrituras, tirando tus servidores en segundos." | 22 |
| **2** | `[00:06.0 - 00:11.5]` (5.5s) | `terminal_split` | Terminal monitoreando bloqueos en pg_stat_activity y llamada a la acción en bio | "Usa herramientas de migración con algoritmos de tiempo compartido y divide los cambios en fases atómicas. Link en mi perfil para auditar tus esquemas." | 24 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
Un simple ALTER TABLE adquiere un bloqueo exclusivo en PostgreSQL que encola todas las lecturas y escrituras, tirando tus servidores en segundos.

Usa herramientas de migración con algoritmos de tiempo compartido y divide los cambios en fases atómicas. Link en mi perfil para auditar tus esquemas.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** auditoria_db
- **Última Escena (CTA Leve):** 
  > *"Usa herramientas de migración con algoritmos de tiempo compartido y divide los cambios en fases atómicas. Link en mi perfil para auditar tus esquemas."*
