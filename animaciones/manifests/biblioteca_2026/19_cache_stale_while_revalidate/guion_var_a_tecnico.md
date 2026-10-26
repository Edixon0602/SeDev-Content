# Guion de Grabación: Anatomía de un Cache Stampede y cómo el encabezado SWR lo neutraliza
> **Tema #19:** 19_cache_stale_while_revalidate  
> **Variación A (TÉCNICO / ARQUITECTURA)**  
> **Categoría:** REDES & ARQUITECTURA DE CACHÉ  
> **Tono:** Análisis de redes, estampidas de caché, micro-caching en CDN  
> **Duración total:** 17.5s | **Palabras:** 76 palabras (~261 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:06.5]` (6.5s) | `network_pipeline` | Apertura directa con pipeline visual mostrando la avalancha de peticiones colapsando la base | "¿Qué pasa cuando la caché de tu página más visitada expira justo cuando entran diez mil usuarios a la vez? Tu servidor colapsa por una estampida de peticiones a la base de datos." | 33 |
| **2** | `[00:06.5 - 00:12.5]` (6.0s) | `code_terminal` | Terminal configurando encabezado Cache-Control stale-while-revalidate | "Con Stale-While-Revalidate la CDN entrega el contenido en cinco milisegundos mientras un solo hilo actualiza la caché en segundo plano." | 20 |
| **3** | `[00:12.5 - 00:17.5]` (5.0s) | `tradeoff_matrix` | Cierre con llamado a auditoría de arquitectura y escalabilidad | "Audito la arquitectura de caching y entrega de contenido en CDN para garantizar escalabilidad extrema en picos de tráfico. Enlace en mi bio." | 23 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
¿Qué pasa cuando la caché de tu página más visitada expira justo cuando entran diez mil usuarios a la vez? Tu servidor colapsa por una estampida de peticiones a la base de datos.

Con Stale-While-Revalidate la CDN entrega el contenido en cinco milisegundos mientras un solo hilo actualiza la caché en segundo plano.

Audito la arquitectura de caching y entrega de contenido en CDN para garantizar escalabilidad extrema en picos de tráfico. Enlace en mi bio.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** arquitectura
- **Última Escena (CTA Leve):** 
  > *"Audito la arquitectura de caching y entrega de contenido en CDN para garantizar escalabilidad extrema en picos de tráfico. Enlace en mi bio."*
