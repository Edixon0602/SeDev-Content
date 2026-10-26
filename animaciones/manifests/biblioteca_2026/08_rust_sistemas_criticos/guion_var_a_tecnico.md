# Guion de Grabación: El Borrow Checker de Rust: Cero fugas de memoria sin GC
> **Tema #08:** 08_rust_sistemas_criticos  
> **Variación A (TÉCNICO / ARQUITECTURA)**  
> **Categoría:** LENGUAJES & RENDIMIENTO  
> **Tono:** Bajo nivel, rigor de sistemas, compiladores y punteros  
> **Duración total:** 17.5s | **Palabras:** 68 palabras (~233 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:06.0]` (6.0s) | `terminal_split` | Terminal mostrando error del borrow checker atrapando un puntero colgante antes de llegar a prod | "Rust garantiza seguridad de memoria en tiempo de compilación. No hay recolector de basura deteniendo el mundo ni fugas ocultas." | 20 |
| **2** | `[00:06.0 - 00:12.0]` (6.0s) | `memory_layout` | Inspección de memoria RAM mostrando asignación en stack sin fragmentación de heap | "Cada valor tiene un único dueño. Cuando la variable sale del ámbito, la memoria se libera inmediatamente en el stack sin pausas de CPU." | 24 |
| **3** | `[00:12.0 - 00:17.5]` (5.5s) | `metrics_comparison` | Comparativa de latencia de cola p99: Go con GC vs Rust nativo | "Optimizo microservicios críticos y migro cuellos de botella a Rust para reducir la latencia p99 a microsegundos. Link en bio para auditar tu backend." | 24 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
Rust garantiza seguridad de memoria en tiempo de compilación. No hay recolector de basura deteniendo el mundo ni fugas ocultas.

Cada valor tiene un único dueño. Cuando la variable sale del ámbito, la memoria se libera inmediatamente en el stack sin pausas de CPU.

Optimizo microservicios críticos y migro cuellos de botella a Rust para reducir la latencia p99 a microsegundos. Link en bio para auditar tu backend.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** optimizacion_backend
- **Última Escena (CTA Leve):** 
  > *"Optimizo microservicios críticos y migro cuellos de botella a Rust para reducir la latencia p99 a microsegundos. Link en bio para auditar tu backend."*
