# Guion de Grabación: Algoritmo HNSW en memoria: Grafos vectoriales en PostgreSQL
> **Tema #07:** 07_pgvector_vs_vectordb  
> **Variación A (TÉCNICO / ARQUITECTURA)**  
> **Categoría:** BASES DE DATOS & IA  
> **Tono:** Científico, matemáticas discretas, algoritmos de grafos  
> **Duración total:** 17.5s | **Palabras:** 64 palabras (~219 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:06.5]` (6.5s) | `storage_engine_viz` | Visualizador del grafo vectorial HNSW navegable en capas en la memoria de Postgres | "¿Cómo busca pgvector embeddings entre millones de documentos en dos milisegundos? Utiliza el algoritmo HNSW en memoria." | 17 |
| **2** | `[00:06.5 - 00:12.0]` (5.5s) | `latency_scale` | Escala de latencia: join in-memory en Postgres vs llamada HTTP externa a Pinecone | "Al estar en la misma base de datos relacional, el join entre el vector y los datos del usuario toma cero coma cinco milisegundos." | 24 |
| **3** | `[00:12.0 - 00:17.5]` (5.5s) | `metrics_comparison` | Comparativa de costos: Pinecone dedicado vs Postgres unificado | "Todo tu stack de IA cabe en Postgres con pgvector. Link en mi bio si quieres simplificar tu arquitectura y recortar costes innecesarios." | 23 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
¿Cómo busca pgvector embeddings entre millones de documentos en dos milisegundos? Utiliza el algoritmo HNSW en memoria.

Al estar en la misma base de datos relacional, el join entre el vector y los datos del usuario toma cero coma cinco milisegundos.

Todo tu stack de IA cabe en Postgres con pgvector. Link en mi bio si quieres simplificar tu arquitectura y recortar costes innecesarios.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** arquitectura_ia
- **Última Escena (CTA Leve):** 
  > *"Todo tu stack de IA cabe en Postgres con pgvector. Link en mi bio si quieres simplificar tu arquitectura y recortar costes innecesarios."*
