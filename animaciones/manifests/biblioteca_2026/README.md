# Biblioteca SeDev 2026: 20 Temas en Tendencia (40 Vídeos)

Este directorio contiene los **20 temas de ingeniería de software en tendencia (octubre 2026)** preparados para producción, con 2 variaciones completas cada uno (40 vídeos en total).

Cada carpeta contiene:
- `guion_var_a_tecnico.md`: Guion escena a escena y texto continuo de teleprónter para la variación técnica.
- `guion_var_b_polemico.md`: Guion para la variación polémica/pragmática.
- `manifest_var_a.json` / `manifest_var_a.js`: Manifiesto reproducible en el player y motor de renderizado.
- `manifest_var_b.json` / `manifest_var_b.js`: Manifiesto alternativo.

---

## Índice Completo de Temáticas

| # | Slug / Carpeta | Variación A (Enfoque Técnico) | Variación B (Enfoque Polémico) | CTA Leve |
|---|---|---|---|---|
| **01** | [`01_monolito_modular`](./01_monolito_modular/) | Cómo estructurar un Monolito Modular sin código espagueti | Por qué tu startup NO necesita microservicios | `arquitectura` |
| **02** | [`02_sqlite_produccion`](./02_sqlite_produccion/) | 0ms de latencia: Arquitectura de SQLite embebido con Litestream | ¿SQLite aguanta 50K req/s? Desmitificando la concurrencia | `database` |
| **03** | [`03_duckdb_analytics`](./03_duckdb_analytics/) | Procesamiento Columnar Vectorizado: 10M filas en milisegundos | Snowflake es un desperdicio: Analítica in-process con Parquet | `cloud_costs` |
| **04** | [`04_ebpf_linux_kernel`](./04_ebpf_linux_kernel/) | eBPF: Cómo el Kernel de Linux intercepta tráfico a velocidad hardware | Muerte a los Sidecars de Kubernetes: Por qué eBPF lo cambia todo | `seguridad_infra` |
| **05** | [`05_mcp_agent_harness`](./05_mcp_agent_harness/) | Model Context Protocol (MCP): El estándar universal para IA y código | El "Prompting" ha muerto: Por qué la industria se mudó a los arneses de IA | `contratacion_senior` |
| **06** | [`06_verificacion_vs_vibe_coding`](./06_verificacion_vs_vibe_coding/) | Mutation & Property-Based Testing: Verificando código de IA | "Vibe Coding" es una bomba de tiempo: Por qué la deuda explotará | `calidad_software` |
| **07** | [`07_pgvector_vs_vectordb`](./07_pgvector_vs_vectordb/) | Algoritmo HNSW en memoria: Grafos vectoriales en PostgreSQL | No necesitas Pinecone: Todo tu stack de IA cabe en Postgres | `database` |
| **08** | [`08_rust_sistemas_criticos`](./08_rust_sistemas_criticos/) | El Borrow Checker de Rust: Cero fugas de memoria sin GC | Por qué Discord y Cloudflare mataron Go y adoptaron Rust | `contratacion_senior` |
| **09** | [`09_seguridad_supply_chain`](./09_seguridad_supply_chain/) | Anatomía de un malware en NPM: Robo de .env en scripts postinstall | GitHub desactiva postinstall: Cómo blindar tu pipeline Zero-Trust | `seguridad_infra` |
| **10** | [`10_exodo_bare_metal_kamal`](./10_exodo_bare_metal_kamal/) | Kamal en Producción: Despliegue Zero-Downtime sin Kubernetes | De $15.000 a $200 al mes: El éxodo de la nube a servidores Hetzner | `cloud_costs` |
| **11** | [`11_modelos_locales_vllm`](./11_modelos_locales_vllm/) | Cómo funciona la cuantización a 4 bits: GGUF sin perder inteligencia | Soberanía de Datos: Corre 100 tokens/s en local sin pagar APIs | `ia_privada` |
| **12** | [`12_sse_vs_websockets`](./12_sse_vs_websockets/) | Por qué Server-Sent Events es superior a WebSockets en HTTP/2 | No compliques tu stack: Deja de usar WebSockets para simples streams | `contratacion_senior` |
| **13** | [`13_bun_vs_node22`](./13_bun_vs_node22/) | V8 vs JavaScriptCore: Cómo Node 22 contraatacó con TypeScript nativo | ¿Vale la pena migrar a Bun en producción o Node.js ya cerró la brecha? | `performance_ts` |
| **14** | [`14_lsm_trees_vs_btrees`](./14_lsm_trees_vs_btrees/) | LSM Trees vs B-Trees: MemTable, SSTables y páginas en disco | ¿Por qué tu base colapsa en escrituras masivas? Postgres vs RocksDB | `database` |
| **15** | [`15_webassembly_servidor`](./15_webassembly_servidor/) | Sandboxing matemático: Wasmtime y aislamiento de código | ¿Morirá Docker en el Edge? Arranques en 1 milisegundo con WASM | `contratacion_senior` |
| **16** | [`16_fracaso_microfrontends`](./16_fracaso_microfrontends/) | La sobrecarga del bundle: Por qué Module Federation degradó la web | El desastre de los Micro-frontends: La vuelta al monorepo unificado | `arquitectura_frontend` |
| **17** | [`17_connection_pooling_pgbouncer`](./17_connection_pooling_pgbouncer/) | El costo de un fork() en Linux: Cómo 1000 conexiones matan a Postgres | Tu base de datos no está lenta, estás saturando el pool de conexiones | `database` |
| **18** | [`18_bloom_filters_probabilistic`](./18_bloom_filters_probabilistic/) | Bloom Filters: Cómo saber si un registro existe con 99% de certeza | Ahorra miles de dólares en queries usando filtros probabilísticos en Redis | `database` |
| **19** | [`19_cache_stale_while_revalidate`](./19_cache_stale_while_revalidate/) | Anatomía de un Cache Stampede y cómo el encabezado SWR lo neutraliza | Cómo servir respuestas en 5 milisegundos sin servir datos desactualizados | `arquitectura` |
| **20** | [`20_migraciones_zero_downtime`](./20_migraciones_zero_downtime/) | El Patrón Expand & Contract: Modificar esquemas masivos con 0s downtime | Nunca hagas ALTER TABLE a ciegas: Cómo evitar bloqueos de tabla | `migracion_critica` |

---

## ¿Cómo Previsualizar en el Player?

1. Abre `animaciones/player.html` en tu navegador Chrome (doble clic directo).
2. Haz clic en el botón superior **`[📂 Cargar otro JSON]`**.
3. Selecciona cualquier archivo `manifest_var_a.json` o `manifest_var_b.json` de esta biblioteca.
4. Verás las escenas, gráficos interactivos y el teleprónter sincronizado en tiempo real.
