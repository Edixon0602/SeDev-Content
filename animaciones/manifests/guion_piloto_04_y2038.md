# 🎙️ Guion de Locución Sincronizado
**Título:** PILOTO 04 — El bug que ya está en tu código y explota en 2038  
**Duración Total:** 36.5s (5 cortes)  
**Total de Palabras:** 98 palabras (promedio: 2.68 palabras/segundo - ritmo óptimo)  
**Vídeo Asociado:** `piloto_04_y2038.mp4`  

---

## ⏱️ Tabla de Sincronización Fotograma a Fotograma

| Marca de Tiempo | Duración | Acción en Pantalla (Visual Cue) | Locución Exacta (Voice-Over) | Palabras / Ritmo |
| :--- | :---: | :--- | :--- | :---: |
| `00:00 - 00:05` | 5.5s | Hook: 2038, tu app viaja a 1901 | *"19 de enero de 2038: tu app viaja a 1901. El bug ya está en producción."* | 16 (2.9 pal/s) |
| `00:05 - 00:15` | 10.0s | Inspector de memoria: time_t, overflow y fecha resultante | *"Unix cuenta segundos desde 1970. Con 32 bits, el máximo es 2,147,483,647. Un segundo después, el número se vuelve negativo y la fecha salta a 1901."* | 26 (2.6 pal/s) |
| `00:15 - 00:23` | 8.0s | time_t de 32 bits vs time_t de 64 bits | *"No es solo COBOL. Está en APIs viejas, bases de datos, firmware y tickets con fecha. Y nadie lo está auditando."* | 21 (2.6 pal/s) |
| `00:23 - 00:30` | 7.0s | Rango de 32 bits vs 64 bits | *"No vas a estar despierto a las 3 a.m. en 2038. Vas a estar migrando un sistema sin documentación."* | 19 (2.7 pal/s) |
| `00:30 - 00:36` | 6.0s | CTA: comenta 2038 para auditar tablas | *"Comenta 2038 y te paso el comando para auditar tus tablas. El pasante te lo agradecerá."* | 16 (2.7 pal/s) |

---

## 📜 Texto Completo para Teleprompter / TTS (Copiar y Pegar)

19 de enero de 2038: tu app viaja a 1901. El bug ya está en producción.

Unix cuenta segundos desde 1970. Con 32 bits, el máximo es 2,147,483,647. Un segundo después, el número se vuelve negativo y la fecha salta a 1901.

No es solo COBOL. Está en APIs viejas, bases de datos, firmware y tickets con fecha. Y nadie lo está auditando.

No vas a estar despierto a las 3 a.m. en 2038. Vas a estar migrando un sistema sin documentación.

Comenta 2038 y te paso el comando para auditar tus tablas. El pasante te lo agradecerá.

---
*Generado automáticamente por SeDev Full-Video Engine*
