# Guion de Grabación: El Patrón Expand & Contract: Modificar esquemas masivos con 0s downtime
> **Tema #20:** 20_migraciones_zero_downtime  
> **Variación A (TÉCNICO / ARQUITECTURA)**  
> **Categoría:** BASES DE DATOS & OPERACIONES EN VIVO  
> **Tono:** Ingeniería de datos en producción, cero tolerancia a caídas, patrones de diseño  
> **Duración total:** 17.5s | **Palabras:** 69 palabras (~237 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:06.5]` (6.5s) | `migration_stepper_viz` | Visualizador del patrón Expand & Contract con 4 fases progresivas en la tabla users | "Modificar una columna en una tabla con cincuenta millones de filas puede bloquear toda tu aplicación. El patrón Expand and Contract elimina el riesgo por completo." | 26 |
| **2** | `[00:06.5 - 00:12.0]` (5.5s) | `code_terminal` | Terminal mostrando las sentencias SQL seguras y el dual-write en código | "Primero expandes agregando la nueva columna como nullable. Luego tu aplicación escribe en ambas columnas simultáneamente mientras un worker migra el histórico." | 22 |
| **3** | `[00:12.0 - 00:17.5]` (5.5s) | `tradeoff_matrix` | Matriz comparativa entre ALTER TABLE directo vs Expand & Contract y llamada a la acción en bio | "Finalmente contraes eliminando la columna antigua. Cero segundos de caída y rollback instantáneo garantizado. Link en bio para planificar migraciones críticas." | 21 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
Modificar una columna en una tabla con cincuenta millones de filas puede bloquear toda tu aplicación. El patrón Expand and Contract elimina el riesgo por completo.

Primero expandes agregando la nueva columna como nullable. Luego tu aplicación escribe en ambas columnas simultáneamente mientras un worker migra el histórico.

Finalmente contraes eliminando la columna antigua. Cero segundos de caída y rollback instantáneo garantizado. Link en bio para planificar migraciones críticas.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** auditoria_db
- **Última Escena (CTA Leve):** 
  > *"Finalmente contraes eliminando la columna antigua. Cero segundos de caída y rollback instantáneo garantizado. Link en bio para planificar migraciones críticas."*
