window.__DEFAULT_MANIFEST__ = {
  "title": "[04] Muerte a los Sidecars de Kubernetes: Por qué eBPF lo cambia todo (Var B)",
  "category": "SISTEMAS OPERATIVOS & OBSERVABILIDAD",
  "slug": "04_ebpf_linux_kernel",
  "variation": "B",
  "fps": 30,
  "scenes": [
    {
      "id": "sidecar_hook",
      "type": "tradeoff_matrix",
      "duration": 6.5,
      "voiceover": "Meter un sidecar proxy en cada contenedor de Kubernetes duplica tu factura de memoria y añade latencia innecesaria. eBPF vino a matarlos.",
      "visual_cue": "Apertura directa con tabla comparativa de Sidecars vs eBPF",
      "props": {
        "header": "SERVICE MESH OVERHEAD",
        "title": "ENVOY SIDECARS VS CILIUM EBPF",
        "colA": "CILIUM EBPF (KERNEL)",
        "colB": "ISTIO / ENVOY SIDECAR",
        "rows": [
          {
            "dim": "Memoria por Pod",
            "a": "0 MB extra",
            "b": "150-250 MB por pod",
            "aGood": true
          },
          {
            "dim": "Saltos TCP en Loopback",
            "a": "0 hops (Socket direct)",
            "b": "4 hops por petición",
            "aGood": true
          },
          {
            "dim": "Cifrado mTLS",
            "a": "WireGuard en Kernel",
            "b": "mTLS en User Space",
            "aGood": true
          }
        ]
      }
    },
    {
      "id": "cta_ebpf_b",
      "type": "tradeoff_matrix",
      "duration": 5,
      "voiceover": "Audito la arquitectura de red y el gasto en clústeres de Kubernetes para eliminar fricción y sobrecostes. Enlace directo en mi perfil.",
      "visual_cue": "Cierre con auditoría de infraestructura y clusters",
      "props": {
        "header": "AUDITORÍA DE INFRAESTRUCTURA",
        "title": "OPTIMIZA TU CLÚSTER KUBERNETES",
        "cta": {
          "badge": "AUDITORÍA DE K8S (Link en perfil)",
          "text": "Elimina sobrecargas en tus clústeres. Link en mi biografía para agendar tu diagnóstico."
        }
      }
    }
  ]
};
