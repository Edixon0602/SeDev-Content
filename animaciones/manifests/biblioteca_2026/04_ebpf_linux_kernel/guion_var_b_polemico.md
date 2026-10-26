# Guion de Grabación: Muerte a los Sidecars de Kubernetes: Por qué eBPF lo cambia todo
> **Tema #04:** 04_ebpf_linux_kernel  
> **Variación B (POLÉMICO / PRAGMATISMO)**  
> **Categoría:** SISTEMAS Y REDES  
> **Tono:** Provocador, anti-sidecar, arquitecturas modernas de red  
> **Duración total:** 11.5s | **Palabras:** 49 palabras (~256 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:06.0]` (6.0s) | `kernel_sandbox_viz` | Visualizador del kernel mostrando el bypass de sidecars mediante eBPF | "Los sidecars de Envoy en Kubernetes consumen hasta el veinticinco por ciento de tu CPU solo copiando paquetes entre userspace y kernel. eBPF los hace obsoletos." | 26 |
| **2** | `[00:06.0 - 00:11.5]` (5.5s) | `terminal_split` | Terminal comparando latencia y consumo de CPU: Istio vs Cilium eBPF | "Cilium reemplaza toda esa basura enrutando el tráfico directamente en el socket del kernel. Link en bio si quieres reducir costes de Kubernetes." | 23 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
Los sidecars de Envoy en Kubernetes consumen hasta el veinticinco por ciento de tu CPU solo copiando paquetes entre userspace y kernel. eBPF los hace obsoletos.

Cilium reemplaza toda esa basura enrutando el tráfico directamente en el socket del kernel. Link en bio si quieres reducir costes de Kubernetes.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** auditoria_infra
- **Última Escena (CTA Leve):** 
  > *"Cilium reemplaza toda esa basura enrutando el tráfico directamente en el socket del kernel. Link en bio si quieres reducir costes de Kubernetes."*
