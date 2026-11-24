# 🎙️ Guion de Locución Sincronizado
**Título:** [19] Por qué tu base de datos se cae con 300 usuarios aunque la CPU esté al 10%  
**Duración Total:** 79.7s (7 cortes)  
**Total de Palabras:** 164 palabras (promedio: 2.06 palabras/segundo - ritmo óptimo)  
**Vídeo Asociado:** `sedev_19_pgbouncer_1000_conexiones.mp4`  

---

## ⏱️ Tabla de Sincronización Fotograma a Fotograma

| Marca de Tiempo | Duración | Acción en Pantalla (Visual Cue) | Locución Exacta (Voice-Over) | Palabras / Ritmo |
| :--- | :---: | :--- | :--- | :---: |
| `00:00 - 00:11` | 11.9s | Visualizador de PgBouncer multiplexando 1,000 clientes en 20 conexiones reales de Postgres | *"Tu servidor tiene memoria y procesador de sobra, pero entran trescientas personas a la vez y todo devuelve error. El culpable son las conexiones."* | 24 (2.0 pal/s) |
| `00:11 - 00:24` | 13.0s | Monitor disparando FATAL: sorry, too many clients already con CPU al 12% | *"Por defecto, PostgreSQL solo acepta cien conexiones simultáneas. Cuando el usuario ciento uno intenta entrar, la base de datos le cierra la puerta en la cara."* | 26 (2.0 pal/s) |
| `00:24 - 00:36` | 11.3s | Conexión directa por request agotando sockets vs Pooler en modo transacción | *"Esto pasa todo el tiempo cuando despliegas en arquitecturas modernas donde cada petición intenta abrir un tubo nuevo directo a la base de datos."* | 24 (2.1 pal/s) |
| `00:36 - 00:49` | 13.2s | Tubería de préstamo de conexión por milisegundo en PgBouncer (Lease 2.1ms) | *"En lugar de pagar el triple por una base de datos gigante, colocamos un multiplexor ligero en la entrada que comparte veinte conexiones reales entre miles de usuarios."* | 28 (2.1 pal/s) |
| `00:49 - 00:58` | 9.5s | Prueba de estrés con 1,500 usuarios simultáneos: PgBouncer (0 errores) vs Directo (Crash) | *"Como cada consulta tarda apenas dos milisegundos, veinte tubos bien turnados despachan miles de compras por segundo sin despeinarse."* | 19 (2.0 pal/s) |
| `00:58 - 01:10` | 11.3s | Ahorro mensual al no tener que escalar RDS solo por límite de conexiones | *"Es una configuración de media hora que te salva de caídas en pleno lanzamiento y te ahorra cientos de dólares al mes en servidor."* | 24 (2.1 pal/s) |
| `01:10 - 01:19` | 9.5s | Cierre de diagnóstico sutil con palabra clave POOL | *"Si tu plataforma se cae cuando entran muchos usuarios juntos o quieres prepararla para escalar, escríbeme POOL por privado."* | 19 (2.0 pal/s) |

---

## 📜 Texto Completo para Teleprompter / TTS (Copiar y Pegar)

Tu servidor tiene memoria y procesador de sobra, pero entran trescientas personas a la vez y todo devuelve error. El culpable son las conexiones.

Por defecto, PostgreSQL solo acepta cien conexiones simultáneas. Cuando el usuario ciento uno intenta entrar, la base de datos le cierra la puerta en la cara.

Esto pasa todo el tiempo cuando despliegas en arquitecturas modernas donde cada petición intenta abrir un tubo nuevo directo a la base de datos.

En lugar de pagar el triple por una base de datos gigante, colocamos un multiplexor ligero en la entrada que comparte veinte conexiones reales entre miles de usuarios.

Como cada consulta tarda apenas dos milisegundos, veinte tubos bien turnados despachan miles de compras por segundo sin despeinarse.

Es una configuración de media hora que te salva de caídas en pleno lanzamiento y te ahorra cientos de dólares al mes en servidor.

Si tu plataforma se cae cuando entran muchos usuarios juntos o quieres prepararla para escalar, escríbeme POOL por privado.

---
*Generado automáticamente por SeDev Full-Video Engine*
