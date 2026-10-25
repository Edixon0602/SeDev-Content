# Guion de Grabación: LSM Trees vs B-Trees: MemTable, SSTables y páginas en disco
> **Tema #14:** 14_lsm_trees_vs_btrees  
> **Variación A (TÉCNICO / ARQUITECTURA)**  
> **Categoría:** SISTEMAS DE ALMACENAMIENTO & BASES DE DATOS  
> **Tono:** Ciencia del almacenamiento en disco, escrituras secuenciales vs aleatorias  
> **Duración total:** 22.0s | **Palabras:** 93 palabras (~254 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:04.5]` (4.5s) | `kinetic_hook` | Gancho cinético sobre almacenamiento interno | "¿Por qué bases de datos como Cassandra y RocksDB escriben a velocidades inhumanas mientras Postgres prefiere B-Trees? La clave está en los LSM Trees." | 24 |
| **2** | `[00:04.5 - 00:11.0]` (6.5s) | `architecture_flow` | Diagrama de flujo: MemTable en RAM -> Append-Only WAL -> Flush a SSTables en NVMe | "Un LSM Tree escribe primero en una MemTable en memoria RAM y luego vuelca bloques secuenciales inmutables en disco, logrando escrituras casi a velocidad de cable." | 26 |
| **3** | `[00:11.0 - 00:17.0]` (6.0s) | `tradeoff_matrix` | Matriz técnica de compensaciones entre motores | "En cambio, un B-Tree sobrescribe páginas en ubicaciones aleatorias. Es más lento para escribir, pero sus lecturas son instantáneas con un solo salto." | 23 |
| **4** | `[00:17.0 - 00:22.0]` (5.0s) | `tradeoff_matrix` | Cierre con llamado a auditoría de bases de datos | "Audito motores de persistencia y diagnostico cuellos de botella de disco en sistemas con cargas masivas. Link en mi perfil." | 20 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
¿Por qué bases de datos como Cassandra y RocksDB escriben a velocidades inhumanas mientras Postgres prefiere B-Trees? La clave está en los LSM Trees.

Un LSM Tree escribe primero en una MemTable en memoria RAM y luego vuelca bloques secuenciales inmutables en disco, logrando escrituras casi a velocidad de cable.

En cambio, un B-Tree sobrescribe páginas en ubicaciones aleatorias. Es más lento para escribir, pero sus lecturas son instantáneas con un solo salto.

Audito motores de persistencia y diagnostico cuellos de botella de disco en sistemas con cargas masivas. Link en mi perfil.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** database
- **Última Escena (CTA Leve):** 
  > *"Audito motores de persistencia y diagnostico cuellos de botella de disco en sistemas con cargas masivas. Link en mi perfil."*
