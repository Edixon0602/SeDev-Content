window.__DEFAULT_MANIFEST__ = {
  "title": "[01] Cómo estructurar un Monolito Modular sin código espagueti (Var A)",
  "category": "ARQUITECTURA DE SOFTWARE",
  "slug": "01_monolito_modular",
  "variation": "A",
  "fps": 30,
  "scenes": [
    {
      "id": "hook",
      "type": "architecture_flow",
      "duration": 6,
      "voiceover": "¿Tu monolito se volvió un monstruo inmanejable? El error no fue el monolito: fue no definir límites de dominio.",
      "visual_cue": "Diagrama de arquitectura con límites estrictos de dominio y módulos aislados",
      "props": {
        "header": "ARQUITECTURA MODERNA",
        "title": "LÍMITES DE DOMINIO EN UN SOLO BINARIO",
        "nodes": [
          {
            "id": "api",
            "label": "API ROUTER UNIFICADO",
            "sublabel": "Fastify / Axum Gateway",
            "color": "#38bdf8",
            "y": 160
          },
          {
            "id": "modules",
            "label": "MÓDULOS DE DOMINIO (DDD)",
            "sublabel": "Auth · Orders · Billing (Aislamiento en RAM)",
            "color": "#10b981",
            "y": 520
          },
          {
            "id": "storage",
            "label": "POSTGRES TRANSACCIONAL",
            "sublabel": "Esquemas lógicos separados con ACID nativo",
            "color": "#fbbf24",
            "y": 880
          }
        ]
      }
    },
    {
      "id": "problem",
      "type": "tradeoff_matrix",
      "duration": 5.5,
      "voiceover": "Partir tu app en veinte microservicios solo multiplicó la latencia de red y los fallos distribuidos.",
      "visual_cue": "Tabla comparativa mostrando la sobrecarga de microservicios vs monolito modular",
      "props": {
        "header": "DIAGNÓSTICO ARQUITECTÓNICO",
        "title": "EL COSTE OCULTO DE DISTRIBUIR",
        "subtitle": "LATENCIA DE RED VS LLAMADAS EN RAM",
        "colA": "MONOLITO MODULAR",
        "colB": "MICROSERVICIOS",
        "rows": [
          {
            "dim": "Llamadas internas",
            "a": "< 0.01ms (RAM)",
            "b": "15-40ms (HTTP)",
            "aGood": true
          },
          {
            "dim": "Transacciones",
            "a": "ACID Nativas",
            "b": "Saga Pattern (Frágil)",
            "aGood": true
          },
          {
            "dim": "Despliegues",
            "a": "1 Pipeline simple",
            "b": "15 Pipelines K8s",
            "aGood": true
          }
        ]
      }
    },
    {
      "id": "code_boundary",
      "type": "code_terminal",
      "duration": 6,
      "voiceover": "En código, prohibimos las importaciones directas entre módulos. Cada dominio expone una interfaz pública estricta.",
      "visual_cue": "Terminal mostrando TypeScript haciendo cumplir límites de módulos con ESLint",
      "props": {
        "header": "REGLAS EN CI/CD",
        "title": "ENFORCEMENT DE IMPORTACIONES",
        "filename": "packages/orders/domain.ts",
        "codeLines": [
          "# Importación profunda bloqueada por el linter:",
          "import { PaymentModel } from \"@app/billing/internal\"; // ERROR",
          "",
          "# Comunicación correcta por contrato público:",
          "import { BillingFacade } from \"@app/billing\";",
          "const invoice = await BillingFacade.charge(order.id);"
        ],
        "cursorLine": 5
      }
    },
    {
      "id": "acid_power",
      "type": "metrics_comparison",
      "duration": 5.5,
      "voiceover": "Lo mejor: conservas transacciones ACID completas. Si el pago falla, la orden se cancela sin dramas distribuidos.",
      "visual_cue": "Métricas de fiabilidad de transacciones: 100% consistencia vs eventual consistency",
      "props": {
        "header": "INTEGRIDAD DE DATOS",
        "metricA": {
          "label": "MICROSERVICIOS (SAGA)",
          "value": "84.2%",
          "sub": "Fallos de consistencia eventual",
          "color": "#ef4444"
        },
        "metricB": {
          "label": "MONOLITO MODULAR",
          "value": "100%",
          "sub": "Garantía ACID en una sola base",
          "color": "#10b981"
        }
      }
    },
    {
      "id": "cta",
      "type": "terminal_split",
      "duration": 5,
      "voiceover": "Si tu equipo está atrapado en un laberinto de microservicios y quieres migrar a un monolito modular limpio, link en mi bio para auditar tu arquitectura.",
      "visual_cue": "Terminal de auditoría con verificación de arquitectura y llamada a la acción",
      "props": {
        "header": "AUDITORÍA DE ARQUITECTURA (Link en bio)",
        "title": "SIMPLIFICA TU CODEBASE",
        "leftTitle": "ANÁLISIS DE MIGRACIÓN",
        "rightTitle": "BENEFICIOS CLAVE",
        "leftText": "$ npx audit-architecture --inspect\n✔ Dependencias cíclicas: 0 detectadas\n✔ Aislamiento de módulos: 100% verificado\n✔ Latencia interna: 0.01ms (In-Memory)",
        "rightText": "• Despliegue en 1 comando\n• Cero sobrecarga de Kubernetes\n• Ahorro del 60% en costos de nube\n• Agenda tu sesión: enlace en el perfil"
      }
    }
  ]
};
