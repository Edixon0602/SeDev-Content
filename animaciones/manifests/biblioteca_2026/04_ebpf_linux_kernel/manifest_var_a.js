window.__DEFAULT_MANIFEST__ = {
  "title": "[04] eBPF: Cómo el Kernel de Linux intercepta tráfico a velocidad hardware (Var A)",
  "category": "SISTEMAS OPERATIVOS & OBSERVABILIDAD",
  "slug": "04_ebpf_linux_kernel",
  "variation": "A",
  "fps": 30,
  "scenes": [
    {
      "id": "hook_ebpf",
      "type": "kinetic_hook",
      "duration": 4.5,
      "voiceover": "¿Cómo monitorizar y asegurar cada paquete de red sin tocar una sola línea de código de tu aplicación? Con eBPF en el Kernel de Linux.",
      "visual_cue": "Gancho cinético con escudo de kernel Linux",
      "props": {
        "badge": "KERNEL DE LINUX 2026",
        "lines": [
          {
            "text": "EBPF: REVOLUCIÓN",
            "color": "#ffffff"
          },
          {
            "text": "EN EL KERNEL",
            "color": "#f59e0b"
          }
        ],
        "subtitle": "SANDBOX SEGURO A NIVEL DE SISTEMA OPERATIVO",
        "icon": "kernel_shield"
      }
    },
    {
      "id": "kernel_pipe",
      "type": "network_pipeline",
      "duration": 6.5,
      "voiceover": "eBPF permite ejecutar bytecode verificado dentro del kernel. Los paquetes se filtran y analizan antes de que lleguen al espacio de usuario.",
      "visual_cue": "Pipeline visual mostrando la intercepción en el kernel sin copias a user space",
      "props": {
        "header": "ARQUITECTURA DE RED EN KERNEL",
        "title": "INSPECCIÓN EN TIEMPO REAL SIN COPÍAS",
        "subtitle": "BYTECODE VERIFICADO // ZERO USER-SPACE OVERHEAD",
        "stages": [
          {
            "id": "nic",
            "label": "TARJETA DE RED (NIC)",
            "sub": "Llegada de paquetes Ethernet",
            "y": 220,
            "color": "#06b6d4",
            "metric": "40 Gbps"
          },
          {
            "id": "ebpf",
            "label": "EBPF PROGRAM (XDP)",
            "sub": "Intercepción en Ring Buffer del Kernel",
            "y": 520,
            "color": "#f59e0b",
            "metric": "0.005ms"
          },
          {
            "id": "app",
            "label": "USER SPACE RUNTIME",
            "sub": "Solo recibe paquetes legítimos",
            "y": 820,
            "color": "#10b981",
            "metric": "Zero CPU waste"
          }
        ]
      }
    },
    {
      "id": "ebpf_code",
      "type": "code_terminal",
      "duration": 6,
      "voiceover": "El verificador de Linux garantiza matemáticamente que el código eBPF nunca entrará en bucles infinitos ni causará un kernel panic.",
      "visual_cue": "Terminal mostrando programa C en eBPF verificando cabeceras IP",
      "props": {
        "header": "CÓDIGO DE KERNEL SEGURO",
        "title": "HOOK DE RED CON XDP",
        "filename": "kernel/filter.bpf.c",
        "codeLines": [
          "SEC(\"xdp\")",
          "int filter_packets(struct xdp_md *ctx) {",
          "  void *data = (void *)(long)ctx->data;",
          "  void *data_end = (void *)(long)ctx->data_end;",
          "  // Verificación estricta de límites por el kernel",
          "  if (data + sizeof(struct ethhdr) > data_end) return XDP_PASS;",
          "  return XDP_DROP; // Bloqueo a velocidad de silicio",
          "}"
        ],
        "cursorLine": 7
      }
    },
    {
      "id": "cta_ebpf",
      "type": "tradeoff_matrix",
      "duration": 5,
      "voiceover": "Diseño arquitecturas de observabilidad y seguridad de bajo impacto en infraestructura Linux. Contáctame en el link de la bio.",
      "visual_cue": "Cierre con consultoría de infraestructura y sistemas",
      "props": {
        "header": "CONSULTORÍA DE INFRAESTRUCTURA",
        "title": "OBSERVABILIDAD & SEGURIDAD EN LINUX",
        "cta": {
          "badge": "INGENIERÍA DE SISTEMAS // SEDEV",
          "text": "¿Problemas de rendimiento u observabilidad en Linux? Link en mi perfil para agendar una sesión."
        }
      }
    }
  ]
};
