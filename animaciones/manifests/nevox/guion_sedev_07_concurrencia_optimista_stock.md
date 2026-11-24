# 🎙️ Guion de Locución Sincronizado
**Título:** [07] Cómo vender el último producto en campaña sin bloquear toda la tienda  
**Duración Total:** 72.4s (7 cortes)  
**Total de Palabras:** 148 palabras (promedio: 2.04 palabras/segundo - ritmo óptimo)  
**Vídeo Asociado:** `sedev_07_concurrencia_optimista_stock.mp4`  

---

## ⏱️ Tabla de Sincronización Fotograma a Fotograma

| Marca de Tiempo | Duración | Acción en Pantalla (Visual Cue) | Locución Exacta (Voice-Over) | Palabras / Ritmo |
| :--- | :---: | :--- | :--- | :---: |
| `00:00 - 00:11` | 11.1s | Carrera en el segundo 0: Control optimista (2.8ms) vs Bloqueo pesimista (Timeout) | *"Cien personas intentan comprar la última unidad en el mismo segundo. Si bloqueas la tabla para decidir quién gana, tumbas la tienda."* | 22 (2.0 pal/s) |
| `00:11 - 00:22` | 11.1s | Monitor de conexiones de base de datos agotadas por bloqueos en espera | *"El error clásico es bloquear el producto apenas el primer usuario abre la pasarela, dejando a los otros noventa y nueve colgados esperando."* | 23 (2.1 pal/s) |
| `00:22 - 00:32` | 10.7s | SQL Diff: SELECT FOR UPDATE bloqueante vs UPDATE atómico con WHERE stock > 0 AND version = v | *"Con control optimista no bloqueas a nadie: actualizas el stock y subes la versión solo si el contador sigue exactamente donde estaba."* | 22 (2.1 pal/s) |
| `00:32 - 00:44` | 11.6s | Flujo en abanico (Split): 1 comprador confirma stock y 99 rebotan limpio sin lock | *"El primero que confirma se lleva la unidad en dos milisegundos, y el resto recibe un aviso instantáneo de agotado sin colgar el servidor."* | 24 (2.1 pal/s) |
| `00:44 - 00:53` | 9.2s | Inspección de la fila en base de datos pasando de versión 1 a versión 2 | *"Es exactamente el mismo principio que usan las aerolíneas y boleterías para no vender dos veces el mismo asiento."* | 19 (2.1 pal/s) |
| `00:53 - 01:02` | 8.8s | Pérdidas por caída en lanzamiento vs solución de 1 consulta SQL | *"Corregir esa consulta permitió triplicar las ventas por minuto en campaña sin gastar un dólar extra en servidores."* | 18 (2.0 pal/s) |
| `01:02 - 01:12` | 9.9s | Cierre de diagnóstico sutil con palabra clave STOCK | *"Si tu tienda o sistema de reservas se pone lento cuando entra tráfico de campaña, escríbeme y revisamos tus consultas."* | 20 (2.0 pal/s) |

---

## 📜 Texto Completo para Teleprompter / TTS (Copiar y Pegar)

Cien personas intentan comprar la última unidad en el mismo segundo. Si bloqueas la tabla para decidir quién gana, tumbas la tienda.

El error clásico es bloquear el producto apenas el primer usuario abre la pasarela, dejando a los otros noventa y nueve colgados esperando.

Con control optimista no bloqueas a nadie: actualizas el stock y subes la versión solo si el contador sigue exactamente donde estaba.

El primero que confirma se lleva la unidad en dos milisegundos, y el resto recibe un aviso instantáneo de agotado sin colgar el servidor.

Es exactamente el mismo principio que usan las aerolíneas y boleterías para no vender dos veces el mismo asiento.

Corregir esa consulta permitió triplicar las ventas por minuto en campaña sin gastar un dólar extra en servidores.

Si tu tienda o sistema de reservas se pone lento cuando entra tráfico de campaña, escríbeme y revisamos tus consultas.

---
*Generado automáticamente por SeDev Full-Video Engine*
