# 🎙️ Guion de Locución Sincronizado
**Título:** [09] El bug invisible que vuela en la laptop del dev y mata producción el lunes  
**Duración Total:** 77.3s (7 cortes)  
**Total de Palabras:** 160 palabras (promedio: 2.07 palabras/segundo - ritmo óptimo)  
**Vídeo Asociado:** `sedev_09_n_plus_1_silencioso.mp4`  

---

## ⏱️ Tabla de Sincronización Fotograma a Fotograma

| Marca de Tiempo | Duración | Acción en Pantalla (Visual Cue) | Locución Exacta (Voice-Over) | Palabras / Ritmo |
| :--- | :---: | :--- | :--- | :---: |
| `00:00 - 00:12` | 12.1s | Terminal disparando 2,500 consultas SELECT dentro de un bucle for | *"En la laptop de tu programador la página carga al instante porque prueba con cinco clientes. En producción tienes diez mil y el servidor muere."* | 25 (2.1 pal/s) |
| `00:12 - 00:24` | 12.4s | Monitor de colapso de lunes a las 9:00 AM por tormenta de micro-consultas | *"Cada lunes a las nueve de la mañana, veinte empleados abren el listado de facturas y la base de datos se clava al cien por ciento."* | 26 (2.1 pal/s) |
| `00:24 - 00:36` | 11.6s | Escala de latencia: 1 viaje en lote (6ms) vs 101 viajes en serie vs 2,500 queries simultáneas | *"El servidor no está haciendo un cálculo difícil; está perdiendo todo el tiempo haciendo miles de viajes de ida y vuelta por la red."* | 24 (2.1 pal/s) |
| `00:36 - 00:46` | 10.7s | Cirugía de código: de bucle for con await a JOIN / WHERE id = ANY() | *"Cuando cambias ese bucle por una sola consulta que trae todo de una vez, dos mil viajes se convierten en uno solo."* | 22 (2.1 pal/s) |
| `00:46 - 00:57` | 10.9s | Carrera: 1 consulta con JOIN (6.2ms) vs 101 consultas en bucle (14,200ms) | *"El procesador baja de golpe del cien al seis por ciento y la pantalla abre al instante sin tocar el plan del servidor."* | 23 (2.1 pal/s) |
| `00:57 - 01:07` | 9.7s | Ahorro al evitar escalar hardware innecesariamente en AWS/RDS | *"Casi todas las empresas que duplican el tamaño de su servidor en realidad solo están pagando por ocultar este error."* | 20 (2.1 pal/s) |
| `01:07 - 01:17` | 9.9s | Cierre de diagnóstico sutil con palabra clave LENTO | *"Si tu sistema se fue poniendo lento a medida que sumaste clientes, escríbeme y encontramos qué consulta lo está ahogando."* | 20 (2.0 pal/s) |

---

## 📜 Texto Completo para Teleprompter / TTS (Copiar y Pegar)

En la laptop de tu programador la página carga al instante porque prueba con cinco clientes. En producción tienes diez mil y el servidor muere.

Cada lunes a las nueve de la mañana, veinte empleados abren el listado de facturas y la base de datos se clava al cien por ciento.

El servidor no está haciendo un cálculo difícil; está perdiendo todo el tiempo haciendo miles de viajes de ida y vuelta por la red.

Cuando cambias ese bucle por una sola consulta que trae todo de una vez, dos mil viajes se convierten en uno solo.

El procesador baja de golpe del cien al seis por ciento y la pantalla abre al instante sin tocar el plan del servidor.

Casi todas las empresas que duplican el tamaño de su servidor en realidad solo están pagando por ocultar este error.

Si tu sistema se fue poniendo lento a medida que sumaste clientes, escríbeme y encontramos qué consulta lo está ahogando.

---
*Generado automáticamente por SeDev Full-Video Engine*
