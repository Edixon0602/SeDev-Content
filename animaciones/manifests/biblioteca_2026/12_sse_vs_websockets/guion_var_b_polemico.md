# Guion de Grabación: No compliques tu stack: Deja de usar WebSockets para simples streams
> **Tema #12:** 12_sse_vs_websockets  
> **Variación B (POLÉMICO / PRAGMATISMO)**  
> **Categoría:** REDES & PROTOCOLOS WEB  
> **Tono:** Directo, antipatrones de ingeniería, desmitificación técnica  
> **Duración total:** 11.5s | **Palabras:** 46 palabras (~240 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:06.0]` (6.0s) | `terminal_split` | Terminal mostrando cortes de conexión WebSocket vs flujo continuo de SSE | "Mantener un clúster de WebSockets requiere balanceadores especiales, heartbeat constante y una pesadilla de reconexión cuando falla la red móvil." | 20 |
| **2** | `[00:06.0 - 00:11.5]` (5.5s) | `network_pipeline` | Tubería de paquetes HTTP/2 procesando el stream de eventos | "Si tu cliente solo escucha actualizaciones del servidor como chats o cotizaciones, SSE sobre HTTP/2 es diez veces más fácil de operar. Link en mi bio." | 26 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
Mantener un clúster de WebSockets requiere balanceadores especiales, heartbeat constante y una pesadilla de reconexión cuando falla la red móvil.

Si tu cliente solo escucha actualizaciones del servidor como chats o cotizaciones, SSE sobre HTTP/2 es diez veces más fácil de operar. Link en mi bio.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** optimizacion_backend
- **Última Escena (CTA Leve):** 
  > *"Si tu cliente solo escucha actualizaciones del servidor como chats o cotizaciones, SSE sobre HTTP/2 es diez veces más fácil de operar. Link en mi bio."*
