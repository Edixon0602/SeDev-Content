# Guion de Grabación: Muerte a los Sidecars de Kubernetes: Por qué eBPF lo cambia todo
> **Tema #04:** 04_ebpf_linux_kernel  
> **Variación B (POLÉMICO / PRAGMATISMO)**  
> **Categoría:** SISTEMAS OPERATIVOS & OBSERVABILIDAD  
> **Tono:** Contundente, técnico, desmontando el sobrecoste de Envoy y mTLS tradicional  
> **Duración total:** 15.5s | **Palabras:** 67 palabras (~259 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:04.5]` (4.5s) | `kinetic_hook` | Gancho cinético contra el abuso de sidecars | "Meter un sidecar proxy en cada contenedor de Kubernetes está destruyendo el rendimiento de tus servidores. eBPF vino a matarlos." | 20 |
| **2** | `[00:04.5 - 00:10.5]` (6.0s) | `tradeoff_matrix` | Matriz comparando Istio/Envoy vs Cilium eBPF | "Cada sidecar de Envoy duplica el uso de memoria y añade saltos TCP locales innecesarios. Cilium con eBPF maneja la red directamente en el kernel." | 25 |
| **3** | `[00:10.5 - 00:15.5]` (5.0s) | `tradeoff_matrix` | Cierre con auditoría de infraestructura y clusters | "Audito la arquitectura de red y el gasto en clústeres de Kubernetes para eliminar fricción y sobrecostes. Enlace directo en mi perfil." | 22 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
Meter un sidecar proxy en cada contenedor de Kubernetes está destruyendo el rendimiento de tus servidores. eBPF vino a matarlos.

Cada sidecar de Envoy duplica el uso de memoria y añade saltos TCP locales innecesarios. Cilium con eBPF maneja la red directamente en el kernel.

Audito la arquitectura de red y el gasto en clústeres de Kubernetes para eliminar fricción y sobrecostes. Enlace directo en mi perfil.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** seguridad_infra
- **Última Escena (CTA Leve):** 
  > *"Audito la arquitectura de red y el gasto en clústeres de Kubernetes para eliminar fricción y sobrecostes. Enlace directo en mi perfil."*
