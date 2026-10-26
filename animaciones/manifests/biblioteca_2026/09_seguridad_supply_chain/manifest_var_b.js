window.__DEFAULT_MANIFEST__ = {
  "title": "[09] GitHub desactiva postinstall: Cómo blindar tu pipeline Zero-Trust (Var B)",
  "category": "CIBERSEGURIDAD & DEVOPS",
  "slug": "09_seguridad_supply_chain",
  "variation": "B",
  "fps": 30,
  "scenes": [
    {
      "id": "attack_demo",
      "type": "terminal_split",
      "duration": 6,
      "voiceover": "Si tu pipeline corre npm install sin la bandera ignore-scripts, estás a un paquete comprometido de perder el control total de tu infraestructura.",
      "visual_cue": "Terminal mostrando ataque simulado y cómo la bandera ignore-scripts lo neutraliza",
      "props": {
        "header": "VECTOR DE ATAQUE EN CI/CD",
        "title": "EJECUCIÓN ARBITRARIA EN BUILD",
        "leftTitle": "PIPELINE VULNERABLE",
        "rightTitle": "PIPELINE BLINDADO",
        "leftText": "$ npm install\nRunning postinstall script...\n✖ Exfiltrando .env a servidor remoto\n✖ Credenciales comprometidas en 0.8s",
        "rightText": "$ npm ci --ignore-scripts\n✔ Postinstall ignorado por completo\n✔ 0 llamadas salientes a internet\n✔ Repositorio 100% blindado"
      }
    },
    {
      "id": "kernel_defense",
      "type": "kernel_sandbox_viz",
      "duration": 5.5,
      "voiceover": "Bloquea los scripts por defecto y aísla el entorno de build con contenedores sin acceso a internet saliente. Link en mi bio para auditar tu pipeline.",
      "visual_cue": "Visualizador del kernel impidiendo conexiones salientes no autorizadas",
      "props": {
        "badge": "ZERO-TRUST NETWORKING",
        "title": "AISLAMIENTO DE PROCESO DE BUILD",
        "subtitle": "BLOQUEO DE CONEXIONES EXTERNAS NO PERMITIDAS"
      }
    }
  ]
};
