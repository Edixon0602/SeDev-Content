# 🎬 Guion de Grabación & Edición SeDev: [01] La genialidad invisible detrás de BitTorrent (P2P)
**Categoría:** REDES & SISTEMAS DISTRIBUIDOS  
**Tema:** Cómo un archivo de 50GB se descargaba sin un solo servidor central  
**Carpeta de B-Rolls Sueltos:** `animaciones/output_clips/sedev_brolls/sedev_01_bittorrent_p2p/`  

---

## 🎙️ Guion Completo de Cámara (Grábalo de corrido a tu ritmo en teleprompter)

> "Estoy seguro de que eres una persona de bien y nunca usaste esto en tu vida... pero la tecnología detrás de los torrents es una obra de arte de la ingeniería."  
>  
> "En una descarga normal, si el servidor se satura o se cae, todo muere. BitTorrent hace lo contrario: parte cualquier archivo en miles de pequeños bloques de doscientos cincuenta kilobytes, y cada uno lleva una firma criptográfica SHA-1."  
>  
> "Aquí viene lo brillante: tú no descargas el archivo de un servidor central. Lo descargas de otras personas que a su vez lo están descargando contigo."  
>  
> "Usa un algoritmo llamado Tit-For-Tat: si tú compartes bloques rápido con la red, la red te premia dándote prioridad de descarga. Mientras más personas bajan el archivo, más ancho de banda global existe y más rápido va para todos."  
>  
> "Una arquitectura imposible de tumbar que cambió la historia de internet. Si te fascinan estas curiosidades de sistemas y arquitectura real, sígueme para más."

---

## ✂️ Instrucciones para Edición (Arrastrar y Soltar en CapCut / Premiere / DaVinci)

| Momento en tu Locución | Toma en Pantalla | Archivo a Usar |
| :--- | :--- | :--- |
| **01. Gancho inicial** | 👤 **Tu cara a cámara** | Tu video grabado |
| **02. Explicación problema/mecanismo** | 🎬 **B-ROLL #01** *(Encima de tu voz)* | `broll_01_chunks_sha1.mp4` (9s) |
| **03. Giro / La curiosidad** | 👤 **Tu cara a cámara** | Tu video grabado |
| **04. Solución / Algoritmo en acción** | 🎬 **B-ROLL #02** *(Encima de tu voz)* | `broll_02_mesh_titfortat.mp4` (9.5s) |
| **05. Cierre & Sígueme** | 👤 **Tu cara a cámara** | Tu video grabado |

---

### Descripción de los B-Rolls individuales:
1. **`broll_01_chunks_sha1.mp4`**: Partición del archivo en bloques verificados con SHA-1 y detector de checksum (`bittorrent_file_slicer_viz`, 9s · Tema: `dark`)
2. **`broll_02_mesh_titfortat.mp4`**: Enjambre P2P y algoritmo Tit-for-Tat premiando ancho de banda (`bittorrent_swarm_viz`, 9.5s · Tema: `dark`)
