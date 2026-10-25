# Guion de Grabación: ¿SQLite aguanta 50K req/s? Desmitificando la concurrencia
> **Tema #02:** 02_sqlite_produccion  
> **Variación B (POLÉMICO / PRAGMATISMO)**  
> **Categoría:** BASES DE DATOS & RENDIMIENTO  
> **Tono:** Directo, basado en benchmarks, destruyendo mitos sobre bloqueos  
> **Duración total:** 21.5s | **Palabras:** 84 palabras (~234 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:04.5]` (4.5s) | `kinetic_hook` | Gancho cinético retador | "Te dijeron que SQLite es solo un juguete para desarrollo. La verdad es que puede aguantar cincuenta mil peticiones por segundo en un VPS." | 24 |
| **2** | `[00:04.5 - 00:10.5]` (6.0s) | `code_terminal` | Terminal configurando PRAGMA journal_mode=WAL y synchronous=NORMAL | "Con el modo WAL activado, los lectores nunca bloquean a los escritores y las lecturas son concurrentes y paralelas." | 19 |
| **3** | `[00:10.5 - 00:16.5]` (6.0s) | `terminal_split` | Benchmark en vivo comparando RPS y consumo de memoria | "Mientras Postgres gasta CPU manejando conexiones de red, SQLite procesa queries directamente en la memoria del kernel." | 17 |
| **4** | `[00:16.5 - 00:21.5]` (5.0s) | `tradeoff_matrix` | Cierre con llamado a auditoría de bases de datos | "Si tu factura de base de datos se salió de control y quieres optimizar tu arquitectura, reviso tu stack técnico. Link en mi biografía." | 24 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
Te dijeron que SQLite es solo un juguete para desarrollo. La verdad es que puede aguantar cincuenta mil peticiones por segundo en un VPS.

Con el modo WAL activado, los lectores nunca bloquean a los escritores y las lecturas son concurrentes y paralelas.

Mientras Postgres gasta CPU manejando conexiones de red, SQLite procesa queries directamente en la memoria del kernel.

Si tu factura de base de datos se salió de control y quieres optimizar tu arquitectura, reviso tu stack técnico. Link en mi biografía.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** database
- **Última Escena (CTA Leve):** 
  > *"Si tu factura de base de datos se salió de control y quieres optimizar tu arquitectura, reviso tu stack técnico. Link en mi biografía."*
