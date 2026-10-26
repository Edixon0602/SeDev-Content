# Guion de Grabación: El costo de un fork() en Linux: Cómo 1000 conexiones matan a Postgres
> **Tema #17:** 17_connection_pooling_pgbouncer  
> **Variación A (TÉCNICO / ARQUITECTURA)**  
> **Categoría:** BASES DE DATOS & ESCALABILIDAD  
> **Tono:** Sistemas operativos, arquitectura interna de PostgreSQL, forks y memoria  
> **Duración total:** 18.0s | **Palabras:** 77 palabras (~257 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:06.5]` (6.5s) | `memory_layout` | Apertura directa con layout de memoria mostrando backend processes compitiendo por CPU y RAM | "¿Por qué conectar mil clientes directos a PostgreSQL satura tu servidor aunque no hagan consultas? Porque Postgres crea un proceso independiente de diez megabytes por cada conexión." | 27 |
| **2** | `[00:06.5 - 00:13.0]` (6.5s) | `architecture_flow` | Diagrama de flujo: 10,000 conexiones de clientes pasando por PgBouncer a 20 conexiones reales de Postgres | "PgBouncer actúa como un embudo inteligente. Mantiene solo veinte conexiones reales con la base y atiende a miles de clientes en modo transaccional." | 23 |
| **3** | `[00:13.0 - 00:18.0]` (5.0s) | `tradeoff_matrix` | Cierre con llamado a auditoría de bases de datos | "Si tu base de datos sufre picos de latencia o agota su pool de conexiones en momentos críticos, audito tu infraestructura de datos. Link en mi perfil." | 27 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
¿Por qué conectar mil clientes directos a PostgreSQL satura tu servidor aunque no hagan consultas? Porque Postgres crea un proceso independiente de diez megabytes por cada conexión.

PgBouncer actúa como un embudo inteligente. Mantiene solo veinte conexiones reales con la base y atiende a miles de clientes en modo transaccional.

Si tu base de datos sufre picos de latencia o agota su pool de conexiones en momentos críticos, audito tu infraestructura de datos. Link en mi perfil.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** database
- **Última Escena (CTA Leve):** 
  > *"Si tu base de datos sufre picos de latencia o agota su pool de conexiones en momentos críticos, audito tu infraestructura de datos. Link en mi perfil."*
