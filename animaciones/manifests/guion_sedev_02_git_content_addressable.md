# 🎬 Guion de Grabación & Edición SeDev: [02] ¿Cómo Git guarda tus cambios sin duplicar tu disco?
**Categoría:** ESTRUCTURAS DE DATOS & INTERNALS  
**Tema:** El árbol inmutable de hashes SHA-1 dentro de .git  
**Carpeta de B-Rolls Sueltos:** `animaciones/output_clips/sedev_brolls/sedev_02_git_content_addressable/`  

---

## 🎙️ Guion Completo de Cámara (Grábalo de corrido a tu ritmo en teleprompter)

> "Llevas años haciendo git commit y git push todos los días, pero casi nadie sabe qué pasa realmente dentro de la carpeta punto git de su proyecto."  
>  
> "Muchos creen que Git guarda diferencias de texto línea por línea como un archivo de Word. En realidad, Git es un almacén de objetos inmutables indexados por su hash SHA-1."  
>  
> "Si tu proyecto pesa quinientos megas y solo cambias una coma en un archivo, Git no copia quinientos megas: crea un solo objeto nuevo de dos kilobytes y reutiliza todos los demás punteros."  
>  
> "Una rama en Git no es una carpeta separada ni una copia de tu código; es simplemente un archivo de texto de cuarenta y un bytes que contiene el hash del último commit."  
>  
> "Elegancia matemática pura diseñada por Linus Torvalds en solo dos semanas. Sígueme si quieres entender cómo funcionan las herramientas que usas a diario."

---

## ✂️ Instrucciones para Edición (Arrastrar y Soltar en CapCut / Premiere / DaVinci)

| Momento en tu Locución | Toma en Pantalla | Archivo a Usar |
| :--- | :--- | :--- |
| **01. Gancho inicial** | 👤 **Tu cara a cámara** | Tu video grabado |
| **02. Explicación problema/mecanismo** | 🎬 **B-ROLL #01** *(Encima de tu voz)* | `broll_01_git_dag_tree.mp4` (9s) |
| **03. Giro / La curiosidad** | 👤 **Tu cara a cámara** | Tu video grabado |
| **04. Solución / Algoritmo en acción** | 🎬 **B-ROLL #02** *(Encima de tu voz)* | `broll_02_git_refs_pointers.mp4` (8.5s) |
| **05. Cierre & Sígueme** | 👤 **Tu cara a cámara** | Tu video grabado |

---

### Descripción de los B-Rolls individuales:
1. **`broll_01_git_dag_tree.mp4`**: Árbol dirigido acíclico (DAG) ramificando commits y árboles (`tree_hierarchy`, 9s · Tema: `light`)
2. **`broll_02_git_refs_pointers.mp4`**: Inspector de punteros en .git/refs ocupando 41 bytes (`memory_layout`, 8.5s · Tema: `light`)
