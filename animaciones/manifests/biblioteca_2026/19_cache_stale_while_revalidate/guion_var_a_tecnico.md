# Guion de Grabación: Anatomía de un Cache Stampede y cómo el encabezado SWR lo neutraliza
> **Tema #19:** 19_cache_stale_while_revalidate  
> **Variación A (TÉCNICO / ARQUITECTURA)**  
> **Categoría:** REDES & ARQUITECTURA DE CACHÉ  
> **Tono:** Análisis de redes, estampidas de caché, micro-caching en CDN  
> **Duración total:** 22.0s | **Palabras:** 91 palabras (~248 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:04.5]` (4.5s) | `kinetic_hook` | Gancho cinético sobre avalancha de peticiones por expiración de caché | "¿Qué pasa cuando la caché de tu página más visitada expira justo cuando entran diez mil usuarios a la vez? Tu servidor colapsa por Cache Stampede." | 26 |
| **2** | `[00:04.5 - 00:11.0]` (6.5s) | `network_pipeline` | Pipeline visual mostrando la estampida saturando la base de datos sin protección | "Todas las peticiones atraviesan la caché vacía e intentan recalcular la misma información en la base de datos simultáneamente tumbando el backend." | 22 |
| **3** | `[00:11.0 - 00:17.0]` (6.0s) | `code_terminal` | Terminal configurando encabezado Cache-Control stale-while-revalidate | "Con Stale-While-Revalidate la CDN entrega el contenido en cinco milisegundos mientras un solo hilo actualiza la caché en segundo plano." | 20 |
| **4** | `[00:17.0 - 00:22.0]` (5.0s) | `tradeoff_matrix` | Cierre con llamado a auditoría de arquitectura y escalabilidad | "Audito la arquitectura de caching y entrega de contenido en CDN para garantizar escalabilidad extrema en picos de tráfico. Enlace en mi bio." | 23 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
¿Qué pasa cuando la caché de tu página más visitada expira justo cuando entran diez mil usuarios a la vez? Tu servidor colapsa por Cache Stampede.

Todas las peticiones atraviesan la caché vacía e intentan recalcular la misma información en la base de datos simultáneamente tumbando el backend.

Con Stale-While-Revalidate la CDN entrega el contenido en cinco milisegundos mientras un solo hilo actualiza la caché en segundo plano.

Audito la arquitectura de caching y entrega de contenido en CDN para garantizar escalabilidad extrema en picos de tráfico. Enlace en mi bio.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** arquitectura
- **Última Escena (CTA Leve):** 
  > *"Audito la arquitectura de caching y entrega de contenido en CDN para garantizar escalabilidad extrema en picos de tráfico. Enlace en mi bio."*
