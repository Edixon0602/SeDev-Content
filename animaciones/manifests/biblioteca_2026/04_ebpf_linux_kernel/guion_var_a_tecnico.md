# Guion de Grabación: eBPF: Cómo el Kernel de Linux intercepta tráfico a velocidad hardware
> **Tema #04:** 04_ebpf_linux_kernel  
> **Variación A (TÉCNICO / ARQUITECTURA)**  
> **Categoría:** SISTEMAS OPERATIVOS & OBSERVABILIDAD  
> **Tono:** Sistemas operativos, bajo nivel en C/Kernel, seguridad y redes  
> **Duración total:** 22.0s | **Palabras:** 86 palabras (~235 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:04.5]` (4.5s) | `kinetic_hook` | Gancho cinético con escudo de kernel Linux | "¿Cómo monitorizar y asegurar cada paquete de red sin tocar una sola línea de código de tu aplicación? Con eBPF en el Kernel de Linux." | 25 |
| **2** | `[00:04.5 - 00:11.0]` (6.5s) | `network_pipeline` | Pipeline visual mostrando la intercepción en el kernel sin copias a user space | "eBPF permite ejecutar bytecode verificado dentro del kernel. Los paquetes se filtran y analizan antes de que lleguen al espacio de usuario." | 22 |
| **3** | `[00:11.0 - 00:17.0]` (6.0s) | `code_terminal` | Terminal mostrando programa C en eBPF verificando cabeceras IP | "El verificador de Linux garantiza matemáticamente que el código eBPF nunca entrará en bucles infinitos ni causará un kernel panic." | 20 |
| **4** | `[00:17.0 - 00:22.0]` (5.0s) | `tradeoff_matrix` | Cierre con consultoría de infraestructura y sistemas | "Diseño arquitecturas de observabilidad y seguridad de bajo impacto en infraestructura Linux. Contáctame en el link de la bio." | 19 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
¿Cómo monitorizar y asegurar cada paquete de red sin tocar una sola línea de código de tu aplicación? Con eBPF en el Kernel de Linux.

eBPF permite ejecutar bytecode verificado dentro del kernel. Los paquetes se filtran y analizan antes de que lleguen al espacio de usuario.

El verificador de Linux garantiza matemáticamente que el código eBPF nunca entrará en bucles infinitos ni causará un kernel panic.

Diseño arquitecturas de observabilidad y seguridad de bajo impacto en infraestructura Linux. Contáctame en el link de la bio.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** seguridad_infra
- **Última Escena (CTA Leve):** 
  > *"Diseño arquitecturas de observabilidad y seguridad de bajo impacto en infraestructura Linux. Contáctame en el link de la bio."*
