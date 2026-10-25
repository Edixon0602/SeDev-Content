window.__DEFAULT_MANIFEST__ = {
  "title": "[14] LSM Trees vs B-Trees: MemTable, SSTables y páginas en disco (Var A)",
  "category": "SISTEMAS DE ALMACENAMIENTO & BASES DE DATOS",
  "slug": "14_lsm_trees_vs_btrees",
  "variation": "A",
  "fps": 30,
  "scenes": [
    {
      "id": "hook_lsm",
      "type": "kinetic_hook",
      "duration": 4.5,
      "voiceover": "¿Por qué bases de datos como Cassandra y RocksDB escriben a velocidades inhumanas mientras Postgres prefiere B-Trees? La clave está en los LSM Trees.",
      "visual_cue": "Gancho cinético sobre almacenamiento interno",
      "props": {
        "badge": "INTERNAL STORAGE ENGINES",
        "lines": [
          {
            "text": "LSM TREES VS B-TREES",
            "color": "#ffffff"
          },
          {
            "text": "CÓMO ESCRIBEN EN DISCO",
            "color": "#10b981"
          }
        ],
        "subtitle": "MEMTABLE // SSTABLES // BÚSQUEDA BINARIA",
        "icon": "tree"
      }
    },
    {
      "id": "lsm_flow",
      "type": "architecture_flow",
      "duration": 6.5,
      "voiceover": "Un LSM Tree escribe primero en una MemTable en memoria RAM y luego vuelca bloques secuenciales inmutables en disco, logrando escrituras casi a velocidad de cable.",
      "visual_cue": "Diagrama de flujo: MemTable en RAM -> Append-Only WAL -> Flush a SSTables en NVMe",
      "props": {
        "header": "FLUJO DE ESCRITURA EN LSM",
        "title": "ESCRITURAS SECUENCIALES INMUTABLES",
        "nodes": [
          {
            "id": "ram",
            "label": "MEMTABLE (SKIPLIST EN RAM)",
            "sublabel": "Escrituras directas O(1) en memoria DDR5",
            "color": "#10b981",
            "y": 160
          },
          {
            "id": "wal",
            "label": "APPEND-ONLY LOG EN NVMe",
            "sublabel": "Cero escrituras aleatorias // Máximo throughput",
            "color": "#fbbf24",
            "y": 520
          },
          {
            "id": "sst",
            "label": "SSTABLES INMUTABLES EN DISCO",
            "sublabel": "Compactación en segundo plano por niveles",
            "color": "#38bdf8",
            "y": 880
          }
        ]
      }
    },
    {
      "id": "btree_diff",
      "type": "tradeoff_matrix",
      "duration": 6,
      "voiceover": "En cambio, un B-Tree sobrescribe páginas en ubicaciones aleatorias. Es más lento para escribir, pero sus lecturas son instantáneas con un solo salto.",
      "visual_cue": "Matriz técnica de compensaciones entre motores",
      "props": {
        "header": "COMPENSACIONES DE HARDWARE",
        "title": "LSM-TREE VS B-TREE",
        "colA": "LSM-TREE (ROCKSDB)",
        "colB": "B-TREE (POSTGRESQL)",
        "rows": [
          {
            "dim": "Velocidad de Escritura",
            "a": "✔ Ultra rápida (Append-only)",
            "b": "✖ Lenta (Random page writes)",
            "aGood": true
          },
          {
            "dim": "Velocidad de Lectura puntual",
            "a": "✖ Requiere mirar Bloom Filters",
            "b": "✔ 1 solo seek O(log N)",
            "aGood": false
          },
          {
            "dim": "Amplificación de Escritura",
            "a": "Alta (Por compactación)",
            "b": "Baja (Páginas directas)",
            "aGood": false
          }
        ]
      }
    },
    {
      "id": "cta_lsm",
      "type": "tradeoff_matrix",
      "duration": 5,
      "voiceover": "Audito motores de persistencia y diagnostico cuellos de botella de disco en sistemas con cargas masivas. Link en mi perfil.",
      "visual_cue": "Cierre con llamado a auditoría de bases de datos",
      "props": {
        "header": "AUDITORÍA DE BASES DE DATOS & I/O",
        "title": "RESOLUCIÓN DE CUELLOS DE BOTELLA",
        "cta": {
          "badge": "AUDITORÍA DE DATOS // SEDEV",
          "text": "¿Tu base de datos sufre por escrituras masivas? Link en mi perfil para agendar tu auditoría."
        }
      }
    }
  ]
};
