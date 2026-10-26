# Guion de Grabación: Anatomía de un Cache Stampede y cómo el encabezado SWR lo neutraliza
> **Tema #19:** 19_cache_stale_while_revalidate  
> **Variación A (TÉCNICO / ARQUITECTURA)**  
> **Categoría:** SISTEMAS DE CACHÉ & ALTA DISPONIBILIDAD  
> **Tono:** Alta concurrencia, resiliencia de sistemas, caching distribuido  
> **Duración total:** 17.5s | **Palabras:** 76 palabras (~261 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:06.5]` (6.5s) | `cache_flow_viz` | Visualizador del ciclo de vida SWR y neutralización del Cache Stampede | "Cuando la clave de caché de tu producto más vendido expira, diez mil peticiones simultáneas golpean la base de datos al mismo tiempo: eso es un Cache Stampede." | 28 |
| **2** | `[00:06.5 - 00:12.0]` (5.5s) | `network_pipeline` | Tubería de red mostrando cómo los clientes reciben datos de caché sin esperar por la base de datos | "Con el encabezado Stale-While-Revalidate, el primer usuario recibe el dato viejo en dos milisegundos mientras un proceso en segundo plano actualiza el valor sin bloquear a nadie." | 27 |
| **3** | `[00:12.0 - 00:17.5]` (5.5s) | `terminal_split` | Terminal mostrando cabeceras HTTP de SWR y llamada a la acción en bio | "Diseño arquitecturas de caché resilientes para evitar caídas en eventos de alto tráfico. Link en mi perfil para auditar tu sistema." | 21 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
Cuando la clave de caché de tu producto más vendido expira, diez mil peticiones simultáneas golpean la base de datos al mismo tiempo: eso es un Cache Stampede.

Con el encabezado Stale-While-Revalidate, el primer usuario recibe el dato viejo en dos milisegundos mientras un proceso en segundo plano actualiza el valor sin bloquear a nadie.

Diseño arquitecturas de caché resilientes para evitar caídas en eventos de alto tráfico. Link en mi perfil para auditar tu sistema.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** optimizacion_backend
- **Última Escena (CTA Leve):** 
  > *"Diseño arquitecturas de caché resilientes para evitar caídas en eventos de alto tráfico. Link en mi perfil para auditar tu sistema."*
