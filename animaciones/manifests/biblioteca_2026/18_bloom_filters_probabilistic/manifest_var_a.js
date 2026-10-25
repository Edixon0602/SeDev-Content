window.__DEFAULT_MANIFEST__ = {
  "title": "[18] Bloom Filters: Cómo saber si un registro existe con 99% de certeza (Var A)",
  "category": "ESTRUCTURAS DE DATOS & CACHÉ",
  "slug": "18_bloom_filters_probabilistic",
  "variation": "A",
  "fps": 30,
  "scenes": [
    {
      "id": "hook_bloom",
      "type": "kinetic_hook",
      "duration": 4.5,
      "voiceover": "¿Cómo saber si un usuario ya leyó un artículo entre quinientos millones de registros usando solo un par de bits de memoria? Con Bloom Filters.",
      "visual_cue": "Gancho cinético sobre estructuras probabilísticas",
      "props": {
        "badge": "ESTRUCTURAS DE DATOS 2026",
        "lines": [
          {
            "text": "BLOOM FILTERS:",
            "color": "#ffffff"
          },
          {
            "text": "MAGIA EN BITS",
            "color": "#10b981"
          }
        ],
        "subtitle": "CONSULTAS PROBABILÍSTICAS EN O(1)",
        "icon": "memory"
      }
    },
    {
      "id": "bloom_math",
      "type": "memory_layout",
      "duration": 6.5,
      "voiceover": "Un Bloom Filter aplica múltiples funciones hash a una clave y enciende bits en un array. Si algún bit es cero, el elemento definitivamente no existe.",
      "visual_cue": "Array de bits encendiéndose por hashes SHA-256 / Murmur3",
      "props": {
        "header": "MECANISMO DE HASHING",
        "title": "ARRAY DE BITS Y CERO FALSOS NEGATIVOS",
        "items": [
          {
            "name": "CLAVE: \"user_98412\"",
            "addr": "3 FUNCIONES HASH",
            "value": "Bits calculados: [14, 52, 88]",
            "color": "#38bdf8"
          },
          {
            "name": "ARRAY DE BITS (RAM)",
            "addr": "BIT 52 = 0",
            "value": "✔ GARANTIZADO: El elemento NO existe en disco",
            "color": "#10b981"
          }
        ]
      }
    },
    {
      "id": "bloom_code",
      "type": "code_terminal",
      "duration": 6,
      "voiceover": "Puede tener falsos positivos leves, pero jamás un falso negativo. Esto ahorra millones de lecturas innecesarias al disco en Cassandra y Redis.",
      "visual_cue": "Terminal ejecutando comandos BF.EXISTS en Redis",
      "props": {
        "header": "REDIS BLOOM FILTER NATIVO",
        "title": "CONSULTA DE EXISTENCIA EN SUB-MILISEGUNDO",
        "filename": "cache/bloom.sh",
        "codeLines": [
          "# Comprueba existencia en RAM sin tocar base de datos principal",
          "BF.ADD post_views \"usr_42:post_991\"",
          "BF.EXISTS post_views \"usr_42:post_991\" -> (integer) 1",
          "BF.EXISTS post_views \"usr_88:post_991\" -> (integer) 0",
          "# Ahorro: 99% de lecturas a base de datos descartadas en RAM"
        ],
        "cursorLine": 4
      }
    },
    {
      "id": "cta_bloom",
      "type": "tradeoff_matrix",
      "duration": 5,
      "voiceover": "Diseño arquitecturas de caché y capas probabilísticas para reducir la carga de bases de datos. Link en mi perfil para auditar tu sistema.",
      "visual_cue": "Cierre con llamado a auditoría de caché y performance",
      "props": {
        "header": "AUDITORÍA DE CACHÉ & ALTO RENDIMIENTO",
        "title": "PROTEGE TU BASE DE CONSULTAS INÚTILES",
        "cta": {
          "badge": "AUDITORÍA DE DATOS & CACHÉ // SEDEV",
          "text": "¿Tu base de datos sufre por queries repetitivas? Link en mi perfil para auditar tu caché."
        }
      }
    }
  ]
};
