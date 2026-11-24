# 🎙️ Guion de Locución Sincronizado
**Título:** [17] Por qué poner 'responde solo en JSON' en el prompt va a tumbar tu backend  
**Duración Total:** 81.1s (7 cortes)  
**Total de Palabras:** 169 palabras (promedio: 2.08 palabras/segundo - ritmo óptimo)  
**Vídeo Asociado:** `sedev_17_structured_outputs_zod_ia.mp4`  

---

## ⏱️ Tabla de Sincronización Fotograma a Fotograma

| Marca de Tiempo | Duración | Acción en Pantalla (Visual Cue) | Locución Exacta (Voice-Over) | Palabras / Ritmo |
| :--- | :---: | :--- | :--- | :---: |
| `00:00 - 00:13` | 13.7s | Prompt ingenuo rompiendo JSON.parse() con texto conversacional vs Schema estricto con Zod | *"Si tu sistema confía en que la inteligencia artificial se va a portar bien porque le pusiste en el prompt 'responde solo en JSON', tienes una bomba de tiempo."* | 29 (2.1 pal/s) |
| `00:13 - 00:26` | 13.2s | Monitor de fallos intermitentes en pipelines de IA por respuestas mal formateadas | *"Funciona diez veces en tus pruebas, y en el cliente número once el modelo agrega un saludo amable antes de la llave y te rompe todo el flujo."* | 28 (2.1 pal/s) |
| `00:26 - 00:38` | 11.1s | Flujo de validación de IA en producción: Input -> Constrained Decoding -> Validador -> DB | *"En ingeniería de software tratamos al modelo como una entrada no confiable: primero obligamos la estructura por gramática y después validamos cada campo."* | 23 (2.1 pal/s) |
| `00:38 - 00:48` | 10.9s | Comparativa de estabilidad en 1,000 ejecuciones: Ingeniería con Schemas+Evals vs Prompt suelto | *"Además acompañamos cada flujo con una batería de cincuenta casos reales de prueba para saber al instante si un cambio empeoró la precisión."* | 23 (2.1 pal/s) |
| `00:48 - 01:00` | 12.0s | Los 3 pilares de IA en producción: Contexto quirúrgico, Schema forzado y Evals | *"Y en lugar de mandarle diez páginas de basura al modelo, filtramos solo los tres párrafos exactos que necesita leer para bajar costos y latencia."* | 25 (2.1 pal/s) |
| `01:00 - 01:11` | 10.3s | Optimización de pesos y contexto reduciendo el consumo de memoria y tokens en 74% | *"Recortar el contexto y tipar la salida no solo evita caídas; también reduce a una fracción tu factura mensual de tokens."* | 21 (2.0 pal/s) |
| `01:11 - 01:21` | 9.9s | Cierre de diagnóstico sutil con palabra clave SCHEMA | *"Si tienes un flujo con inteligencia artificial que falla al azar o sale demasiado caro, escríbeme SCHEMA y lo blindamos."* | 20 (2.0 pal/s) |

---

## 📜 Texto Completo para Teleprompter / TTS (Copiar y Pegar)

Si tu sistema confía en que la inteligencia artificial se va a portar bien porque le pusiste en el prompt 'responde solo en JSON', tienes una bomba de tiempo.

Funciona diez veces en tus pruebas, y en el cliente número once el modelo agrega un saludo amable antes de la llave y te rompe todo el flujo.

En ingeniería de software tratamos al modelo como una entrada no confiable: primero obligamos la estructura por gramática y después validamos cada campo.

Además acompañamos cada flujo con una batería de cincuenta casos reales de prueba para saber al instante si un cambio empeoró la precisión.

Y en lugar de mandarle diez páginas de basura al modelo, filtramos solo los tres párrafos exactos que necesita leer para bajar costos y latencia.

Recortar el contexto y tipar la salida no solo evita caídas; también reduce a una fracción tu factura mensual de tokens.

Si tienes un flujo con inteligencia artificial que falla al azar o sale demasiado caro, escríbeme SCHEMA y lo blindamos.

---
*Generado automáticamente por SeDev Full-Video Engine*
