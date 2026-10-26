window.__DEFAULT_MANIFEST__ = {
  "title": "[14] LSM Trees vs B-Trees: MemTable, SSTables y páginas en disco (Var A)",
  "category": "ESTRUCTURAS DE DATOS & DB INTERNALS",
  "slug": "14_lsm_trees_vs_btrees",
  "variation": "A",
  "fps": 30,
  "scenes": [
    {
      "id": "storage_engine_lsm",
      "type": "storage_engine_viz",
      "duration": 6.5,
      "voiceover": "Si tu base de datos colapsa cuando recibe millones de escrituras por segundo, estás usando la estructura de datos equivocada.",
      "visual_cue": "Visualizador del motor de almacenamiento LSM Tree con MemTable en RAM y compactación de SSTables",
      "props": {
        "mode": "lsm",
        "badge": "ESTRUCTURAS DE ALMACENAMIENTO",
        "title": "LSM-TREE: LOG-STRUCTURED MERGE",
        "subtitle": "MEMTABLE EN RAM => FLUSH SECUENCIAL A SSTABLE"
      }
    },
    {
      "id": "tree_hierarchy_btree",
      "type": "tree_hierarchy",
      "duration": 6,
      "voiceover": "Los B-Trees de PostgreSQL modifican páginas en disco de forma aleatoria, lo que desgasta los discos SSD y satura el canal de I/O.",
      "visual_cue": "Visualizador del árbol B balanceado mostrando el coste de la división de páginas",
      "props": {
        "badge": "ESTRUCTURA B-TREE",
        "title": "PÁGINAS BALANCED-TREE EN DISCO",
        "items": [
          {
            "name": "Root Node",
            "level": 0
          },
          {
            "name": "Internal Page A",
            "level": 1
          },
          {
            "name": "Internal Page B",
            "level": 1
          },
          {
            "name": "Leaf Disk Page (4 KB)",
            "level": 2
          }
        ]
      }
    },
    {
      "id": "latency_lsm",
      "type": "latency_scale",
      "duration": 5,
      "voiceover": "Los LSM Trees como RocksDB convierten cada escritura en una operación secuencial en memoria, multiplicando el throughput por diez.",
      "visual_cue": "Escala de latencia comparando escrituras aleatorias en B-Tree vs escrituras append-only en LSM",
      "props": {
        "header": "MÉTRICAS DE RENDIMIENTO",
        "title": "THROUGHPUT DE ESCRITURA",
        "subtitle": "ESCRITURAS ALEATORIAS VS SECUENCIALES"
      }
    }
  ]
};
