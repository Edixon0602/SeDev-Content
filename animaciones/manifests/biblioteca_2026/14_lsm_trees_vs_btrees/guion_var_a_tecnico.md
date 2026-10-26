# Guion de Grabación: LSM Trees vs B-Trees: MemTable, SSTables y páginas en disco
> **Tema #14:** 14_lsm_trees_vs_btrees  
> **Variación A (TÉCNICO / ARQUITECTURA)**  
> **Categoría:** SISTEMAS DE ALMACENAMIENTO & BASES DE DATOS  
> **Tono:** Ciencia del almacenamiento en disco, escrituras secuenciales vs aleatorias  
> **Duración total:** 17.5s | **Palabras:** 71 palabras (~243 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:06.5]` (6.5s) | `architecture_flow` | Apertura directa con arquitectura de escritura secuencial: MemTable a SSTables | "¿Por qué RocksDB escribe a velocidades récord mientras Postgres prefiere B-Trees? Un LSM Tree escribe en una MemTable en RAM y luego vuelca bloques secuenciales inmutables en disco." | 28 |
| **2** | `[00:06.5 - 00:12.5]` (6.0s) | `tradeoff_matrix` | Matriz técnica de compensaciones entre motores | "En cambio, un B-Tree sobrescribe páginas en ubicaciones aleatorias. Es más lento para escribir, pero sus lecturas son instantáneas con un solo salto." | 23 |
| **3** | `[00:12.5 - 00:17.5]` (5.0s) | `tradeoff_matrix` | Cierre con llamado a auditoría de bases de datos | "Audito motores de persistencia y diagnostico cuellos de botella de disco en sistemas con cargas masivas. Link en mi perfil." | 20 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
¿Por qué RocksDB escribe a velocidades récord mientras Postgres prefiere B-Trees? Un LSM Tree escribe en una MemTable en RAM y luego vuelca bloques secuenciales inmutables en disco.

En cambio, un B-Tree sobrescribe páginas en ubicaciones aleatorias. Es más lento para escribir, pero sus lecturas son instantáneas con un solo salto.

Audito motores de persistencia y diagnostico cuellos de botella de disco en sistemas con cargas masivas. Link en mi perfil.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** database
- **Última Escena (CTA Leve):** 
  > *"Audito motores de persistencia y diagnostico cuellos de botella de disco en sistemas con cargas masivas. Link en mi perfil."*
