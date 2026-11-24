window.__DEFAULT_MANIFEST__ = {
  "title": "[02] ¿Cómo Git guarda tus cambios sin duplicar tu disco?",
  "slug": "sedev_02_git_content_addressable",
  "category": "ESTRUCTURAS DE DATOS & INTERNALS",
  "tagline": "El árbol inmutable de hashes SHA-1 dentro de .git",
  "fps": 30,
  "outputDir": "animaciones/output_clips/sedev_brolls/sedev_02_git_content_addressable",
  "script": {
    "hook": "Llevas años haciendo git commit y git push todos los días, pero casi nadie sabe qué pasa realmente dentro de la carpeta punto git de su proyecto.",
    "broll1_lead": "Muchos creen que Git guarda diferencias de texto línea por línea como un archivo de Word. En realidad, Git es un almacén de objetos inmutables indexados por su hash SHA-1.",
    "camera_pivot": "Si tu proyecto pesa quinientos megas y solo cambias una coma en un archivo, Git no copia quinientos megas: crea un solo objeto nuevo de dos kilobytes y reutiliza todos los demás punteros.",
    "broll2_lead": "Una rama en Git no es una carpeta separada ni una copia de tu código; es simplemente un archivo de texto de cuarenta y un bytes que contiene el hash del último commit.",
    "outro": "Elegancia matemática pura diseñada por Linus Torvalds en solo dos semanas. Sígueme si quieres entender cómo funcionan las herramientas que usas a diario."
  },
  "brolls": [
    {
      "id": "broll_01_git_dag_tree",
      "purpose": "Árbol dirigido acíclico (DAG) ramificando commits y árboles",
      "type": "tree_hierarchy",
      "duration": 9,
      "props": {
        "theme": "light",
        "title": "ÁRBOL DIRIGIDO ACÍCLICO (DAG) DE GIT",
        "subtitle": "OBJETOS INMUTABLES IDENTIFICADOS POR SHA-1",
        "nodes": [
          {
            "id": "c1",
            "label": "COMMIT [a4f10b] · TREE ROOT",
            "sub": "Puntero al estado del proyecto",
            "x": 480,
            "y": 235,
            "w": 680,
            "color": "#0284c7"
          },
          {
            "id": "t1",
            "label": "TREE [src/app]",
            "sub": "Directorio empaquetado",
            "x": 245,
            "y": 455,
            "w": 390,
            "parent": "c1",
            "color": "#d97706",
            "activePath": true
          },
          {
            "id": "t2",
            "label": "TREE [package.json]",
            "sub": "Firma inmutable intacta",
            "x": 715,
            "y": 455,
            "w": 390,
            "parent": "c1",
            "color": "#059669",
            "activePath": false
          },
          {
            "id": "b1",
            "label": "BLOB [index.ts] · CONTENIDO",
            "sub": "Si no cambia, reutiliza el mismo hash",
            "x": 245,
            "y": 675,
            "w": 390,
            "parent": "t1",
            "color": "#059669",
            "activePath": true
          },
          {
            "id": "b0",
            "label": "HISTÓRICO SHARED",
            "sub": "Zero duplicación de bytes",
            "x": 715,
            "y": 675,
            "w": 390,
            "parent": "t2",
            "color": "#64748b",
            "activePath": false
          }
        ]
      },
      "voiceover": "Muchos creen que Git guarda diferencias de texto línea por línea como un archivo de Word. En realidad, Git es un almacén de objetos inmutables indexados por su hash SHA-1.",
      "visual_cue": "Árbol dirigido acíclico (DAG) ramificando commits y árboles"
    },
    {
      "id": "broll_02_git_refs_pointers",
      "purpose": "Inspector de punteros en .git/refs ocupando 41 bytes",
      "type": "memory_layout",
      "duration": 8.5,
      "props": {
        "theme": "light",
        "title": "ESTRUCTURA DE PUNTEROS EN .GIT/REFS",
        "subtitle": "UNA RAMA PESA LITERALMENTE 41 BYTES",
        "items": [
          {
            "addr": "refs/heads/main",
            "name": "PUNTERO COMMIT ACTIVO",
            "value": "7c8d9e2a1b4c... (41 bytes en disco)"
          },
          {
            "addr": "HEAD -> main",
            "name": "APUNTADOR SIMBÓLICO",
            "value": "Referencia directa al branch actual"
          },
          {
            "addr": "objects/pack/",
            "name": "DELTA COMPRESSION",
            "value": "Compresión zlib con deduplicación estricta"
          }
        ]
      },
      "voiceover": "Una rama en Git no es una carpeta separada ni una copia de tu código; es simplemente un archivo de texto de cuarenta y un bytes que contiene el hash del último commit.",
      "visual_cue": "Inspector de punteros en .git/refs ocupando 41 bytes"
    }
  ]
};
