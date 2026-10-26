# Guion de Grabación: Por qué Discord y Cloudflare mataron Go y adoptaron Rust
> **Tema #08:** 08_rust_sistemas_criticos  
> **Variación B (POLÉMICO / PRAGMATISMO)**  
> **Categoría:** LENGUAJES & RENDIMIENTO  
> **Tono:** Contundente, arquitectura de alta escala, lecciones aprendidas  
> **Duración total:** 11.5s | **Palabras:** 53 palabras (~277 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:06.0]` (6.0s) | `memory_layout` | Inspección de memoria con picos de pausa de Garbage Collector en Go | "Discord tenía un servicio en Go procesando millones de mensajes. Cada dos minutos, el Garbage Collector congelaba el servicio creando picos de latencia inaceptables." | 24 |
| **2** | `[00:06.0 - 00:11.5]` (5.5s) | `terminal_split` | Terminal mostrando comparativa de métricas tras la migración a Rust | "Reescribieron el servicio en Rust. El uso de CPU se desplomó y la latencia pasó de dos segundos a menos de un milisegundo constante. Link en bio para optimizaciones." | 29 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
Discord tenía un servicio en Go procesando millones de mensajes. Cada dos minutos, el Garbage Collector congelaba el servicio creando picos de latencia inaceptables.

Reescribieron el servicio en Rust. El uso de CPU se desplomó y la latencia pasó de dos segundos a menos de un milisegundo constante. Link en bio para optimizaciones.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** optimizacion_backend
- **Última Escena (CTA Leve):** 
  > *"Reescribieron el servicio en Rust. El uso de CPU se desplomó y la latencia pasó de dos segundos a menos de un milisegundo constante. Link en bio para optimizaciones."*
