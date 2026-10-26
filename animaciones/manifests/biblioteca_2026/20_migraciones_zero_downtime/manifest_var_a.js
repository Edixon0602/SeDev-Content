window.__DEFAULT_MANIFEST__ = {
  "title": "[20] El Patrón Expand & Contract: Modificar esquemas masivos con 0s downtime (Var A)",
  "category": "BASES DE DATOS & PRODUCCIÓN CRÍTICA",
  "slug": "20_migraciones_zero_downtime",
  "variation": "A",
  "fps": 30,
  "scenes": [
    {
      "id": "expand_phases_hook",
      "type": "architecture_flow",
      "duration": 6.5,
      "voiceover": "¿Cómo renombrar una columna en cincuenta millones de filas sin provocar un solo error 500? Nunca lo hagas en un solo paso: usa el patrón Expand & Contract.",
      "visual_cue": "Apertura directa con diagrama de las tres fases del patrón Expand & Contract",
      "props": {
        "header": "LAS TRES FASES DEL PATRÓN",
        "title": "TRANSICIÓN SEGURA DE ESQUEMA",
        "nodes": [
          {
            "id": "f1",
            "label": "1. FASE EXPAND",
            "sublabel": "Añadir columna nueva vacía (Nullable) sin locks",
            "color": "#38bdf8",
            "y": 160
          },
          {
            "id": "f2",
            "label": "2. DOBLE ESCRITURA Y BACKFILL",
            "sublabel": "La app escribe en ambas columnas y worker migra histórico",
            "color": "#fbbf24",
            "y": 520
          },
          {
            "id": "f3",
            "label": "3. FASE CONTRACT",
            "sublabel": "La app solo lee la nueva y drop seguro de la columna vieja",
            "color": "#10b981",
            "y": 880
          }
        ]
      }
    },
    {
      "id": "migration_sql",
      "type": "code_terminal",
      "duration": 6,
      "voiceover": "Hacerlo por fases te permite revertir en cualquier instante sin poner en riesgo la disponibilidad del negocio ni corromper datos.",
      "visual_cue": "Terminal mostrando script seguro de migración con pg_repack / gh-ost",
      "props": {
        "header": "MIGRACIÓN CON CONTROL DE BLOQUEOS",
        "title": "CERO EXCLUSIVE LOCKS EN TABLA",
        "filename": "db/migrations/20261025_safe_column.sql",
        "codeLines": [
          "-- 1. Añade columna sin bloquear lectores ni escritores:",
          "ALTER TABLE users ADD COLUMN phone_v2 VARCHAR(32);",
          "-- 2. Backfill en lotes pequeños para no saturar transacciones:",
          "UPDATE users SET phone_v2 = phone WHERE id BETWEEN $1 AND $2;",
          "-- 3. Deploy de código con lectura de phone_v2"
        ],
        "cursorLine": 4
      }
    },
    {
      "id": "cta_migration",
      "type": "tradeoff_matrix",
      "duration": 5,
      "voiceover": "Asesoro y acompaño a equipos en migraciones críticas de base de datos sin tiempo de inactividad. Agenda una sesión técnica en mi perfil.",
      "visual_cue": "Cierre con consultoría de migración crítica",
      "props": {
        "header": "CONSULTORÍA DE MIGRACIONES CRÍTICAS",
        "title": "CAMBIOS DE ESQUEMA SIN TIEMPO DE CAÍDA",
        "cta": {
          "badge": "CONSULTORÍA DE DATOS (Link en bio)",
          "text": "¿Planeas una migración compleja de base de datos? Link en mi perfil para acompañar a tu equipo."
        }
      }
    }
  ]
};
