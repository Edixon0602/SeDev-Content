# 🎙️ Guion de Locución Sincronizado
**Título:** SeDev VO 01 — Cómo vaciar una cuenta de $100 sacando $80 dos veces (Race Condition)  
**Duración Total:** 50.0s (5 cortes)  
**Total de Palabras:** 122 palabras (promedio: 2.44 palabras/segundo - ritmo óptimo)  
**Vídeo Asociado:** `vo_01_race_condition.mp4`  

---

## ⏱️ Tabla de Sincronización Fotograma a Fotograma

| Marca de Tiempo | Duración | Acción en Pantalla (Visual Cue) | Locución Exacta (Voice-Over) | Palabras / Ritmo |
| :--- | :---: | :--- | :--- | :---: |
| `00:00 - 00:04` | 4.0s | Hook editorial sobre fondo ivory: saldo $100, dos retiros de $80 en el mismo milisegundo. | *"Tienes cien dólares. Sacas ochenta dos veces... y te los entrega."* | 11 (2.8 pal/s) |
| `00:04 - 00:17` | 13.0s | Composición editorial de flujo: un clic pasa sin problemas. | *"Pasa muchísimo cuando programas un retiro en dos pasos: primero consultas si el saldo alcanza, y una línea después restas el dinero. Si pruebas con un solo clic, todo parece perfecto."* | 31 (2.4 pal/s) |
| `00:17 - 00:37` | 20.0s | Cirugía SQL en papel editorial: lectura en dos pasos vs UPDATE atómico con CHECK >= 0. | *"Pero si llegan dos peticiones en el mismo milisegundo, ambas leen la base antes de que la otra escriba. Las dos ven cien dólares, las dos aprueban, y terminas con el saldo en menos sesenta. La solución es validar y descontar en una sola operación atómica, con un candado en la tabla."* | 52 (2.6 pal/s) |
| `00:37 - 00:45` | 8.0s | Regla editorial: validación en base de datos, nunca en dos pasos. | *"Cuando manejas dinero o inventario, leer primero en código y actualizar después nunca es seguro si hay concurrencia."* | 18 (2.3 pal/s) |
| `00:45 - 00:50` | 5.0s | Cierre editorial limpio sobre pruebas de concurrencia. | *"¿Ya probaste tus endpoints disparando diez peticiones al mismo milisegundo?"* | 10 (2.0 pal/s) |

---

## 📜 Texto Completo para Teleprompter / TTS (Copiar y Pegar)

Tienes cien dólares. Sacas ochenta dos veces... y te los entrega.

Pasa muchísimo cuando programas un retiro en dos pasos: primero consultas si el saldo alcanza, y una línea después restas el dinero. Si pruebas con un solo clic, todo parece perfecto.

Pero si llegan dos peticiones en el mismo milisegundo, ambas leen la base antes de que la otra escriba. Las dos ven cien dólares, las dos aprueban, y terminas con el saldo en menos sesenta. La solución es validar y descontar en una sola operación atómica, con un candado en la tabla.

Cuando manejas dinero o inventario, leer primero en código y actualizar después nunca es seguro si hay concurrencia.

¿Ya probaste tus endpoints disparando diez peticiones al mismo milisegundo?

---
*Generado automáticamente por SeDev Full-Video Engine*
