# 🎬 Guion de Grabación & Edición SeDev: [04] La condición de carrera que canceló el Transbordador Columbia
**Categoría:** CONCURRENCIA & SISTEMAS CRÍTICOS  
**Tema:** 5 computadoras redundantes trabadas por 80 milisegundos de desfase  
**Carpeta de B-Rolls Sueltos:** `animaciones/output_clips/sedev_brolls/sedev_04_shuttle_race_condition/`  

---

## 🎙️ Guion Completo de Cámara (Grábalo de corrido a tu ritmo en teleprompter)

> "En 1981, el primer vuelo del transbordador espacial Columbia se canceló a veinte minutos del despegue por un bug que cualquier programador comete."  
>  
> "La NASA usaba cinco computadoras idénticas: cuatro corrían el software primario y una quinta corría un software de respaldo totalmente independiente escrito por otro equipo."  
>  
> "Para evitar fallos, las computadoras debían sincronizarse milisegundo a milisegundo intercambiando mensajes antes del encendido de motores."  
>  
> "Durante el arranque, la computadora de respaldo arrancó con un desfase de un solo ciclo de bus de ochenta milisegundos. Cuando intentó sincronizarse, el cerrojo ya estaba puesto y el sistema se congeló por seguridad."  
>  
> "El hardware más avanzado del mundo detenido por una condición de carrera. Sígueme si quieres dominar concurrencia real sin que te explote en producción."

---

## ✂️ Instrucciones para Edición (Arrastrar y Soltar en CapCut / Premiere / DaVinci)

| Momento en tu Locución | Toma en Pantalla | Archivo a Usar |
| :--- | :--- | :--- |
| **01. Gancho inicial** | 👤 **Tu cara a cámara** | Tu video grabado |
| **02. Explicación problema/mecanismo** | 🎬 **B-ROLL #01** *(Encima de tu voz)* | `broll_01_shuttle_computers_race.mp4` (9s) |
| **03. Giro / La curiosidad** | 👤 **Tu cara a cámara** | Tu video grabado |
| **04. Solución / Algoritmo en acción** | 🎬 **B-ROLL #02** *(Encima de tu voz)* | `broll_02_shuttle_deadlock_monitor.mp4` (8.5s) |
| **05. Cierre & Sígueme** | 👤 **Tu cara a cámara** | Tu video grabado |

---

### Descripción de los B-Rolls individuales:
1. **`broll_01_shuttle_computers_race.mp4`**: Arquitectura redundante de 5 computadoras AP-101 con gap de 80ms (`versus_race`, 9s · Tema: `blueprint`)
2. **`broll_02_shuttle_deadlock_monitor.mp4`**: Monitor de interbloqueo de bus deteniendo el lanzamiento en T-20min (`connection_pool_viz`, 8.5s · Tema: `blueprint`)
