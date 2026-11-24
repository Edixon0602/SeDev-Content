# 🎬 Guion de Grabación & Edición SeDev: [15] ¿Cómo funciona la compresión ZIP? (El algoritmo DEFLATE)
**Categoría:** TEORÍA DE LA INFORMACIÓN & ALGORITMOS  
**Tema:** Cómo meter 100MB en 10MB sin perder una sola letra  
**Carpeta de B-Rolls Sueltos:** `animaciones/output_clips/sedev_brolls/sedev_15_how_zip_deflate_works/`  

---

## 🎙️ Guion Completo de Cámara (Grábalo de corrido a tu ritmo en teleprompter)

> "¿Cómo es posible meter un archivo de texto de cien megabytes dentro de uno de diez megas sin perder absolutamente ninguna letra?"  
>  
> "Casi toda la compresión de internet, desde archivos punto zip hasta imágenes png y peticiones gzip, usa un algoritmo llamado DEFLATE inventado en mil novecientos noventa y uno."  
>  
> "Funciona en dos pasos. Primero usa una ventana deslizante llamada LZ77 que busca frases repetidas hacia atrás y las reemplaza por un par de números: qué tan atrás está y cuántas letras abarca."  
>  
> "Luego toma ese resultado y aplica codificación de Huffman: en vez de gastar ocho bits por letra, le asigna códigos binarios cortitos de dos bits a las letras que más se repiten y códigos largos a las raras."  
>  
> "Elegancia pura que ahorra petabytes de ancho de banda a la humanidad todos los días. Sígueme para entender la ciencia detrás de tus herramientas."

---

## ✂️ Instrucciones para Edición (Arrastrar y Soltar en CapCut / Premiere / DaVinci)

| Momento en tu Locución | Toma en Pantalla | Archivo a Usar |
| :--- | :--- | :--- |
| **01. Gancho inicial** | 👤 **Tu cara a cámara** | Tu video grabado |
| **02. Explicación problema/mecanismo** | 🎬 **B-ROLL #01** *(Encima de tu voz)* | `broll_01_lz77_sliding_window.mp4` (9s) |
| **03. Giro / La curiosidad** | 👤 **Tu cara a cámara** | Tu video grabado |
| **04. Solución / Algoritmo en acción** | 🎬 **B-ROLL #02** *(Encima de tu voz)* | `broll_02_huffman_coding_tree.mp4` (8.5s) |
| **05. Cierre & Sígueme** | 👤 **Tu cara a cámara** | Tu video grabado |

---

### Descripción de los B-Rolls individuales:
1. **`broll_01_lz77_sliding_window.mp4`**: Ventana deslizante LZ77 reemplazando patrones repetidos por tuplas (distancia, largo) (`terminal_split`, 9s · Tema: `light`)
2. **`broll_02_huffman_coding_tree.mp4`**: Árbol de codificación de Huffman asignando bits cortos a símbolos comunes (`tree_hierarchy`, 8.5s · Tema: `light`)
