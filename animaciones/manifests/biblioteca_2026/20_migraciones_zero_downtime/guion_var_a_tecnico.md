# Guion de Grabación: El Patrón Expand & Contract: Modificar esquemas masivos con 0s downtime
> **Tema #20:** 20_migraciones_zero_downtime  
> **Variación A (TÉCNICO / ARQUITECTURA)**  
> **Categoría:** BASES DE DATOS & PRODUCCIÓN CRÍTICA  
> **Tono:** Metodología de ingeniería crítica, despliegues paralelos, transiciones seguras  
> **Duración total:** 22.0s | **Palabras:** 91 palabras (~248 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:04.5]` (4.5s) | `kinetic_hook` | Gancho cinético sobre migraciones críticas sin downtime | "¿Cómo renombrar una columna en una tabla de cincuenta millones de usuarios con tráfico activo sin provocar un solo error 500? Con Expand & Contract." | 25 |
| **2** | `[00:04.5 - 00:11.0]` (6.5s) | `architecture_flow` | Diagrama de flujo mostrando las tres fases del patrón Expand & Contract | "Nunca renombres en un solo paso. Fase uno: expandes añadiendo la nueva columna. Fase dos: doble escritura. Fase tres: contraes borrando la vieja." | 23 |
| **3** | `[00:11.0 - 00:17.0]` (6.0s) | `code_terminal` | Terminal mostrando script seguro de migración con pg_repack / gh-ost | "Hacerlo por fases te permite revertir en cualquier instante sin poner en riesgo la disponibilidad del negocio ni corromper datos." | 20 |
| **4** | `[00:17.0 - 00:22.0]` (5.0s) | `tradeoff_matrix` | Cierre con consultoría de migración crítica | "Asesoro y acompaño a equipos en migraciones críticas de base de datos sin tiempo de inactividad. Agenda una sesión técnica en mi perfil." | 23 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
¿Cómo renombrar una columna en una tabla de cincuenta millones de usuarios con tráfico activo sin provocar un solo error 500? Con Expand & Contract.

Nunca renombres en un solo paso. Fase uno: expandes añadiendo la nueva columna. Fase dos: doble escritura. Fase tres: contraes borrando la vieja.

Hacerlo por fases te permite revertir en cualquier instante sin poner en riesgo la disponibilidad del negocio ni corromper datos.

Asesoro y acompaño a equipos en migraciones críticas de base de datos sin tiempo de inactividad. Agenda una sesión técnica en mi perfil.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** migracion_critica
- **Última Escena (CTA Leve):** 
  > *"Asesoro y acompaño a equipos en migraciones críticas de base de datos sin tiempo de inactividad. Agenda una sesión técnica en mi perfil."*
