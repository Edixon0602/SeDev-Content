window.__DEFAULT_MANIFEST__ = {
  "title": "[09] GitHub desactiva postinstall: Cómo blindar tu pipeline Zero-Trust (Var B)",
  "category": "CIBERSEGURIDAD & SUPPLY CHAIN",
  "slug": "09_seguridad_supply_chain",
  "variation": "B",
  "fps": 30,
  "scenes": [
    {
      "id": "hook_security_b",
      "type": "kinetic_hook",
      "duration": 4.5,
      "voiceover": "GitHub y la industria están desactivando los scripts postinstall por defecto. Es momento de blindar tus dependencias con Zero-Trust.",
      "visual_cue": "Gancho cinético sobre blindaje Zero-Trust",
      "props": {
        "badge": "DEFENSA EN CI/CD",
        "lines": [
          {
            "text": "BLINDA TU PIPELINE",
            "color": "#ffffff"
          },
          {
            "text": "CON ZERO-TRUST",
            "color": "#10b981"
          }
        ],
        "subtitle": "BLOQUEO ESTRICTO DE SCRIPTS NO AUTORIZADOS",
        "icon": "zero_trust_lock"
      }
    },
    {
      "id": "sandbox_terminal",
      "type": "code_terminal",
      "duration": 6,
      "voiceover": "Con la bandera ignore-scripts y aislación en sandboxes efímeros, neutralizas cualquier ataque antes de que pueda tocar tus archivos locales.",
      "visual_cue": "Terminal configurando npm config set ignore-scripts true",
      "props": {
        "header": "CONFIGURACIÓN DEFENSIVA",
        "title": "POLÍTICAS DE INSTALACIÓN SEGURA",
        "filename": ".npmrc",
        "codeLines": [
          "# Desactiva ejecución arbitraria de scripts en dependencias",
          "ignore-scripts=true",
          "audit=true",
          "engine-strict=true",
          "# Si un paquete requiere compilar binarios, debe ser autorizado manualmente"
        ],
        "cursorLine": 4
      }
    },
    {
      "id": "cta_security_b",
      "type": "tradeoff_matrix",
      "duration": 5,
      "voiceover": "Audito la postura de seguridad de tu infraestructura y configuro entornos blindados contra fugas de datos. Agenda en mi perfil.",
      "visual_cue": "Cierre con auditoría de ciberseguridad",
      "props": {
        "header": "AUDITORÍA DE CIBERSEGURIDAD",
        "title": "ZERO-TRUST EN TUS PIPELINES DE DESPLIEGUE",
        "cta": {
          "badge": "AUDITORÍA DE SEGURIDAD // SEDEV",
          "text": "Protege tus credenciales y entorno productivo. Link directo en mi perfil."
        }
      }
    }
  ]
};
