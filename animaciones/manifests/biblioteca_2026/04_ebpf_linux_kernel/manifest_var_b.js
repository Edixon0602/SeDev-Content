window.__DEFAULT_MANIFEST__ = {
  "title": "[04] Muerte a los Sidecars de Kubernetes: Por qué eBPF lo cambia todo (Var B)",
  "category": "SISTEMAS Y REDES",
  "slug": "04_ebpf_linux_kernel",
  "variation": "B",
  "fps": 30,
  "scenes": [
    {
      "id": "sidecar_death",
      "type": "kernel_sandbox_viz",
      "duration": 6,
      "voiceover": "Los sidecars de Envoy en Kubernetes consumen hasta el veinticinco por ciento de tu CPU solo copiando paquetes entre userspace y kernel. eBPF los hace obsoletos.",
      "visual_cue": "Visualizador del kernel mostrando el bypass de sidecars mediante eBPF",
      "props": {
        "badge": "ELIMINACIÓN DE SIDECARS",
        "title": "BYPASS TOTAL DEL USERSPACE",
        "subtitle": "CILIUM eBPF REEMPLAZANDO PROXIES PESADOS"
      }
    },
    {
      "id": "terminal_compare",
      "type": "terminal_split",
      "duration": 5.5,
      "voiceover": "Cilium reemplaza toda esa basura enrutando el tráfico directamente en el socket del kernel. Link en bio si quieres reducir costes de Kubernetes.",
      "visual_cue": "Terminal comparando latencia y consumo de CPU: Istio vs Cilium eBPF",
      "props": {
        "header": "AUDITORÍA DE KUBERNETES (Link en bio)",
        "title": "CILIUM eBPF EN PRODUCCIÓN",
        "leftTitle": "CONSUMO DE RECURSOS",
        "rightTitle": "MÉTRICAS CLAVE",
        "leftText": "ISTIO PROXIES: 24% CPU | 1.8 ms delay\nCILIUM eBPF:   2% CPU  | 0.2 ms delay\n✔ Ahorro de RAM: 3.2 GB por nodo",
        "rightText": "• Reduce el gasto en clusters un 35%\n• Desaparecen los errores de timeout\n• Observabilidad nativa con Hubble\n• Contacto para asesoría en mi perfil"
      }
    }
  ]
};
