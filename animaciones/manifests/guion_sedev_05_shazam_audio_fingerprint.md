# 🎬 Guion de Grabación & Edición SeDev: [05] ¿Cómo sabe Shazam qué canción suena en 3 segundos con ruido?
**Categoría:** ALGORITMOS & MATEMÁTICAS  
**Tema:** Espectrogramas y constelaciones de frecuencias hash  
**Carpeta de B-Rolls Sueltos:** `animaciones/output_clips/sedev_brolls/sedev_05_shazam_audio_fingerprint/`  

---

## 🎙️ Guion Completo de Cámara (Grábalo de corrido a tu ritmo en teleprompter)

> "Estás en un bar lleno de gente hablando, pones tu teléfono tres segundos hacia el techo y la aplicación acierta la canción exacta. ¿Cómo demonios lo hace?"  
>  
> "Shazam no compara el audio segundo a segundo. Primero pasa la grabación por una Transformada Rápida de Fourier para convertir el sonido en un espectrograma visual de frecuencias en el tiempo."  
>  
> "Luego ignora el noventa y cinco por ciento del ruido y se queda solo con los picos más intensos de frecuencia, creando lo que llaman un mapa de constelación de estrellas."  
>  
> "Une pares de puntos con su diferencia de tiempo y genera un hash de treinta y dos bits. Cuando busca en su base de datos con millones de canciones, solo compara esos hashes combinados en un índice ultrarrápido."  
>  
> "Una obra de arte matemática inventada antes de que existieran los smartphones modernos. Sígueme para más secretos de la ingeniería que usas a diario."

---

## ✂️ Instrucciones para Edición (Arrastrar y Soltar en CapCut / Premiere / DaVinci)

| Momento en tu Locución | Toma en Pantalla | Archivo a Usar |
| :--- | :--- | :--- |
| **01. Gancho inicial** | 👤 **Tu cara a cámara** | Tu video grabado |
| **02. Explicación problema/mecanismo** | 🎬 **B-ROLL #01** *(Encima de tu voz)* | `broll_01_fourier_spectrogram.mp4` (9s) |
| **03. Giro / La curiosidad** | 👤 **Tu cara a cámara** | Tu video grabado |
| **04. Solución / Algoritmo en acción** | 🎬 **B-ROLL #02** *(Encima de tu voz)* | `broll_02_hash_match_lookup.mp4` (8.5s) |
| **05. Cierre & Sígueme** | 👤 **Tu cara a cámara** | Tu video grabado |

---

### Descripción de los B-Rolls individuales:
1. **`broll_01_fourier_spectrogram.mp4`**: Tubería de conversión: Audio ruidoso -> Transformada Fourier -> Constelación (`network_pipeline`, 9s · Tema: `dark`)
2. **`broll_02_hash_match_lookup.mp4`**: Índice invertido emparejando hashes de 32 bits en 1.8ms (`storage_engine_viz`, 8.5s · Tema: `dark`)
