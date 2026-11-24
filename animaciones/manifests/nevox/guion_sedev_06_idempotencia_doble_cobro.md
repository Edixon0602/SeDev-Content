# 🎙️ Guion de Locución Sincronizado
**Título:** [06] El doble clic que cobró 84 veces la misma tarjeta (Idempotency Keys)  
**Duración Total:** 71.3s (7 cortes)  
**Total de Palabras:** 144 palabras (promedio: 2.02 palabras/segundo - ritmo óptimo)  
**Vídeo Asociado:** `sedev_06_idempotencia_doble_cobro.mp4`  

---

## ⏱️ Tabla de Sincronización Fotograma a Fotograma

| Marca de Tiempo | Duración | Acción en Pantalla (Visual Cue) | Locución Exacta (Voice-Over) | Palabras / Ritmo |
| :--- | :---: | :--- | :--- | :---: |
| `00:00 - 00:12` | 12.0s | Monitor de pasarela disparando cobros duplicados y alertas de contracargo | *"Un cliente con mal internet le da tres veces seguidas al botón de pagar... y tu sistema le cobra tres veces la tarjeta."* | 23 (1.9 pal/s) |
| `00:12 - 00:21` | 9.7s | Costo de comisiones no devueltas, disputas y penalización en Stripe | *"Deshabilitar el botón en la pantalla no sirve de nada cuando la red del celular reintenta la petición por debajo."* | 20 (2.1 pal/s) |
| `00:21 - 00:29` | 8.2s | Filtro y caché de Idempotency-Key en Redis bloqueando reintentos duplicados en 0ms | *"En sistemas financieros reales usamos llaves de idempotencia: cada intento de compra lleva una huella única."* | 16 (2.0 pal/s) |
| `00:29 - 00:44` | 14.1s | Código sin protección vs transacción con Idempotency-Key y constraint UNIQUE | *"Si entran tres peticiones iguales en el mismo milisegundo, la base de datos procesa la primera y a las otras dos les devuelve el mismo recibo sin volver a cobrar."* | 30 (2.1 pal/s) |
| `00:44 - 00:53` | 9.7s | Simulación de ráfaga de 10 reintentos de red: 1 cobro limpio vs desastre | *"Así puedes reintentar webhooks o pagos caídos diez veces seguidas con la certeza matemática de que jamás duplicarás un cargo."* | 20 (2.1 pal/s) |
| `00:53 - 01:02` | 8.8s | Tabla de estados de idempotencia en memoria: STARTED -> COMPLETED -> CACHED | *"Es un patrón que toma un día implementar y te ahorra miles de dólares en disputas y soporte."* | 18 (2.0 pal/s) |
| `01:02 - 01:11` | 8.8s | Cierre de diagnóstico sutil con palabra clave PAGOS | *"Si manejas cobros, suscripciones o billeteras en tu sistema y quieres blindar tus transacciones, escríbeme por privado."* | 17 (1.9 pal/s) |

---

## 📜 Texto Completo para Teleprompter / TTS (Copiar y Pegar)

Un cliente con mal internet le da tres veces seguidas al botón de pagar... y tu sistema le cobra tres veces la tarjeta.

Deshabilitar el botón en la pantalla no sirve de nada cuando la red del celular reintenta la petición por debajo.

En sistemas financieros reales usamos llaves de idempotencia: cada intento de compra lleva una huella única.

Si entran tres peticiones iguales en el mismo milisegundo, la base de datos procesa la primera y a las otras dos les devuelve el mismo recibo sin volver a cobrar.

Así puedes reintentar webhooks o pagos caídos diez veces seguidas con la certeza matemática de que jamás duplicarás un cargo.

Es un patrón que toma un día implementar y te ahorra miles de dólares en disputas y soporte.

Si manejas cobros, suscripciones o billeteras en tu sistema y quieres blindar tus transacciones, escríbeme por privado.

---
*Generado automáticamente por SeDev Full-Video Engine*
