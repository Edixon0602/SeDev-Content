# Guion de Grabación: eBPF: Cómo el Kernel de Linux intercepta tráfico a velocidad hardware
> **Tema #04:** 04_ebpf_linux_kernel  
> **Variación A (TÉCNICO / ARQUITECTURA)**  
> **Categoría:** SISTEMAS Y REDES  
> **Tono:** Sistemas operativos, kernel hacking, redes de alta velocidad  
> **Duración total:** 17.5s | **Palabras:** 79 palabras (~271 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:06.0]` (6.0s) | `kernel_sandbox_viz` | Visualizador de privilegios Ring 3 (Userspace) vs Ring 0 (Kernel) y penalización de Syscalls | "Cada vez que un paquete viaja de la tarjeta de red a tu aplicación en Node o Go, el kernel gasta miles de nanosegundos en context switches." | 27 |
| **2** | `[00:06.0 - 00:12.0]` (6.0s) | `network_pipeline` | Tubería de red con hooks XDP procesando paquetes a velocidad de cable | "Con eBPF inyectas programas verificados directo en el kernel. Los paquetes se filtran y enrutan en el driver de la tarjeta antes de tocar la pila de red." | 28 |
| **3** | `[00:12.0 - 00:17.5]` (5.5s) | `terminal_split` | Terminal mostrando bpftrace interceptando conexiones en tiempo real | "Telemetría, seguridad Zero-Trust y balanceo de carga sin modificar una sola línea de tu código. Link en bio si quieres optimizar tu infraestructura Linux." | 24 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
Cada vez que un paquete viaja de la tarjeta de red a tu aplicación en Node o Go, el kernel gasta miles de nanosegundos en context switches.

Con eBPF inyectas programas verificados directo en el kernel. Los paquetes se filtran y enrutan en el driver de la tarjeta antes de tocar la pila de red.

Telemetría, seguridad Zero-Trust y balanceo de carga sin modificar una sola línea de tu código. Link en bio si quieres optimizar tu infraestructura Linux.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** auditoria_infra
- **Última Escena (CTA Leve):** 
  > *"Telemetría, seguridad Zero-Trust y balanceo de carga sin modificar una sola línea de tu código. Link en bio si quieres optimizar tu infraestructura Linux."*
