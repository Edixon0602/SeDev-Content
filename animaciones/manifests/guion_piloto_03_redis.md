# 🎙️ Guion de Locución Sincronizado
**Título:** PILOTO 03 — 16 núcleos no te salvan de una mala arquitectura  
**Duración Total:** 32.5s (5 cortes)  
**Total de Palabras:** 88 palabras (promedio: 2.71 palabras/segundo - ritmo óptimo)  
**Vídeo Asociado:** `piloto_03_redis.mp4`  

---

## ⏱️ Tabla de Sincronización Fotograma a Fotograma

| Marca de Tiempo | Duración | Acción en Pantalla (Visual Cue) | Locución Exacta (Voice-Over) | Palabras / Ritmo |
| :--- | :---: | :--- | :--- | :---: |
| `00:00 - 00:05` | 5.0s | Hook: 16 núcleos, 2,000 usuarios y se cae | *"16 núcleos, 2,000 usuarios y se cae. Redis lo hace con 1 hilo y 100,000."* | 15 (3.0 pal/s) |
| `00:05 - 00:12` | 7.5s | Request → event loop → respuesta en 0.1 ms | *"Redis no es rápido porque tenga más hilos. Es rápido porque no espera: un event loop, todo en memoria y cero handoffs."* | 22 (2.9 pal/s) |
| `00:12 - 00:20` | 7.5s | Consulta bloqueante vs lectura en memoria | *"Tu app se pasa el día esperando a Postgres. Redis no espera: atiende, responde y vuelve a la cola."* | 19 (2.5 pal/s) |
| `00:20 - 00:26` | 6.5s | 2,000 req/s vs 100,000 req/s. Texto: “MÁS NÚCLEOS QUE UNA SALA DE ESPORTS”. | *"El problema no es la CPU: usas los hilos para esperar. Y tu servidor sigue haciendo fila."* | 17 (2.6 pal/s) |
| `00:26 - 00:32` | 6.0s | CTA: comenta REDIS para auditar conexiones | *"Comenta REDIS y te muestro dónde se te van las conexiones. Tu jefe puede esperar."* | 15 (2.5 pal/s) |

---

## 📜 Texto Completo para Teleprompter / TTS (Copiar y Pegar)

16 núcleos, 2,000 usuarios y se cae. Redis lo hace con 1 hilo y 100,000.

Redis no es rápido porque tenga más hilos. Es rápido porque no espera: un event loop, todo en memoria y cero handoffs.

Tu app se pasa el día esperando a Postgres. Redis no espera: atiende, responde y vuelve a la cola.

El problema no es la CPU: usas los hilos para esperar. Y tu servidor sigue haciendo fila.

Comenta REDIS y te muestro dónde se te van las conexiones. Tu jefe puede esperar.

---
*Generado automáticamente por SeDev Full-Video Engine*
