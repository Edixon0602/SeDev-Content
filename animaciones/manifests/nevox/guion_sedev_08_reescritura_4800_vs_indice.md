# 🎙️ Guion de Locución Sincronizado
**Título:** [08] Le cotizaron $4,800 por 'reescribir el sistema'... y era un solo índice  
**Duración Total:** 65.8s (7 cortes)  
**Total de Palabras:** 133 palabras (promedio: 2.02 palabras/segundo - ritmo óptimo)  
**Vídeo Asociado:** `sedev_08_reescritura_4800_vs_indice.mp4`  

---

## ⏱️ Tabla de Sincronización Fotograma a Fotograma

| Marca de Tiempo | Duración | Acción en Pantalla (Visual Cue) | Locución Exacta (Voice-Over) | Palabras / Ritmo |
| :--- | :---: | :--- | :--- | :---: |
| `00:00 - 00:10` | 10.5s | Presupuesto de reescritura de $4,800 frente a auditoría puntual de base de datos | *"Una agencia les quería cobrar cuatro mil ochocientos dólares y siete semanas por rehacer su sistema porque tardaba dieciocho segundos en abrir."* | 22 (2.1 pal/s) |
| `00:10 - 00:19` | 9.0s | Monitor mostrando CPU de base de datos al 100% por lecturas secuenciales de disco | *"Antes de firmar ese cheque, me pidieron una segunda opinión para ver qué estaba matando realmente al servidor."* | 18 (2.0 pal/s) |
| `00:19 - 00:31` | 12.0s | EXPLAIN ANALYZE mostrando Seq Scan (18.4s) vs CREATE INDEX CONCURRENTLY (14ms) | *"Abrimos el analizador de consultas y en cinco minutos apareció el culpable: la base de datos recorría cuatrocientas mil filas a pie en cada clic."* | 25 (2.1 pal/s) |
| `00:31 - 00:38` | 7.4s | Árbol B-Tree saltando directo al bloque exacto en 3 saltos O(log N) en vez de leer 420k filas | *"Agregamos un índice compuesto en caliente, sin apagar la plataforma ni un solo minuto."* | 14 (1.9 pal/s) |
| `00:38 - 00:47` | 8.2s | Carrera real: 14 milisegundos con índice vs 18.4 segundos sin índice | *"En veinte minutos, el mismo panel que tardaba dieciocho segundos empezó a cargar en catorce milisegundos."* | 16 (2.0 pal/s) |
| `00:47 - 00:55` | 8.0s | Resumen de la auditoría: $4,800 ahorrados, 0 tiempo de caída, 1,300x velocidad | *"Se ahorraron casi cinco mil dólares y dos meses de parálisis simplemente midiendo antes de romper."* | 16 (2.0 pal/s) |
| `00:55 - 01:05` | 10.7s | Cierre de diagnóstico sutil con palabra clave AUDITORÍA | *"Si te dijeron que hay que rehacer tu sistema porque va lento, escríbeme antes de aprobar ese gasto y lo medimos juntos."* | 22 (2.1 pal/s) |

---

## 📜 Texto Completo para Teleprompter / TTS (Copiar y Pegar)

Una agencia les quería cobrar cuatro mil ochocientos dólares y siete semanas por rehacer su sistema porque tardaba dieciocho segundos en abrir.

Antes de firmar ese cheque, me pidieron una segunda opinión para ver qué estaba matando realmente al servidor.

Abrimos el analizador de consultas y en cinco minutos apareció el culpable: la base de datos recorría cuatrocientas mil filas a pie en cada clic.

Agregamos un índice compuesto en caliente, sin apagar la plataforma ni un solo minuto.

En veinte minutos, el mismo panel que tardaba dieciocho segundos empezó a cargar en catorce milisegundos.

Se ahorraron casi cinco mil dólares y dos meses de parálisis simplemente midiendo antes de romper.

Si te dijeron que hay que rehacer tu sistema porque va lento, escríbeme antes de aprobar ese gasto y lo medimos juntos.

---
*Generado automáticamente por SeDev Full-Video Engine*
