# 🎬 Guion de Grabación & Edición SeDev: [07] ¿Por qué Redis usa un solo hilo y humilla a servidores gigantes?
**Categoría:** ARQUITECTURA DE SOFTWARE & KERNEL  
**Tema:** El poder del event loop, epoll y memoria RAM sin locks  
**Carpeta de B-Rolls Sueltos:** `animaciones/output_clips/sedev_brolls/sedev_07_redis_single_threaded/`  

---

## 🎙️ Guion Completo de Cámara (Grábalo de corrido a tu ritmo en teleprompter)

> "Tu aplicación usa dieciséis núcleos de procesador y sufre con dos mil usuarios. Redis corre en un solo hilo y procesa cien mil peticiones por segundo sin despeinarse."  
>  
> "Muchos programadores creen que más hilos siempre es más rápido. Pero cuando metes muchos hilos compitiendo por la misma memoria, el procesador gasta más tiempo cambiando de contexto y esperando cerrojos que ejecutando código."  
>  
> "Redis dijo: no voy a usar cerrojos ni hilos compitiendo. Todo vive en la memoria RAM y un solo bucle despacha comando tras comando a velocidad de la luz."  
>  
> "Como cada comando tarda apenas ocho microsegundos en resolverse, no hay cola que lo tranque. El cuello de botella casi siempre es la tarjeta de red, nunca el procesador."  
>  
> "A veces la mejor arquitectura no es la más compleja, sino la que sabe quitar estorbos. Sígueme si te gusta la ingeniería de sistemas sin humo."

---

## ✂️ Instrucciones para Edición (Arrastrar y Soltar en CapCut / Premiere / DaVinci)

| Momento en tu Locución | Toma en Pantalla | Archivo a Usar |
| :--- | :--- | :--- |
| **01. Gancho inicial** | 👤 **Tu cara a cámara** | Tu video grabado |
| **02. Explicación problema/mecanismo** | 🎬 **B-ROLL #01** *(Encima de tu voz)* | `broll_01_epoll_reactor_loop.mp4` (9s) |
| **03. Giro / La curiosidad** | 👤 **Tu cara a cámara** | Tu video grabado |
| **04. Solución / Algoritmo en acción** | 🎬 **B-ROLL #02** *(Encima de tu voz)* | `broll_02_redis_vs_multithread_bench.mp4` (9.5s) |
| **05. Cierre & Sígueme** | 👤 **Tu cara a cámara** | Tu video grabado |

---

### Descripción de los B-Rolls individuales:
1. **`broll_01_epoll_reactor_loop.mp4`**: Flujo del Reactor epoll multiplexando 100,000 conexiones en 1 hilo (`architecture_flow`, 9s · Tema: `dark`)
2. **`broll_02_redis_vs_multithread_bench.mp4`**: Carrera de velocidad: Redis 1 hilo en RAM vs Multihilo trabado en Mutex (`versus_race`, 9.5s · Tema: `dark`)
