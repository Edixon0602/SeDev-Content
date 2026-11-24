# 🎙️ Guion de Locución Sincronizado
**Título:** [29] Pregúntale a tu inventario: cómo obtener métricas de tu negocio sin saber Excel  
**Categoría:** CORTEX · INTELIGENCIA & ANALÍTICA (Asistente Inteligente de Datos)  
**Duración Total:** 39.2s (7 cortes rápidos)  
**Total de Palabras:** 146 palabras (promedio: 223 WPM - ritmo óptimo)  
**Vídeo Asociado:** `nevox_29_cortex_asistente_sql_ia.mp4`  

---

## ⏱️ Tabla de Sincronización Fotograma a Fotograma

| Marca de Tiempo | Duración | Acción en Pantalla (Visual Cue) | Locución Exacta (Voice-Over) | Palabras / Ritmo |
| :--- | :---: | :--- | :--- | :---: |
| `00:00 - 00:05` | 5.5s | Consulta en lenguaje natural: Dueño preguntando desde su teléfono: '¿Cuáles son los 5 productos con menor rotación este mes?' | *"Para saber cuánto ganaste esta semana o qué producto no se está vendiendo, no deberías tener que pedirle un informe a tu contador."* | 23 (4.2 pal/s) |
| `00:05 - 00:11` | 5.6s | Parálisis de análisis: Hojas de cálculo con 50 columnas, fórmulas rotas y datos desactualizados | *"La mayoría de los dueños toman decisiones a ciegas porque exportar datos a Excel y armar fórmulas toma horas que no tienen."* | 22 (3.9 pal/s) |
| `00:11 - 00:16` | 5.8s | Topología de asistente de datos: Lenguaje natural -> Motor seguro de solo lectura -> Respuesta matemática exacta | *"Conectamos un asistente de inteligencia artificial directo a la base de datos de tu inventario en un entorno completamente seguro."* | 20 (3.4 pal/s) |
| `00:16 - 00:22` | 5.6s | Auditoría interactiva en tiempo real: Detección instantánea de incrementos de costo de proveedores | *"Le escribes: '¿qué proveedor me subió precios este mes?' y en tres segundos te devuelve la lista exacta con los porcentajes."* | 21 (3.8 pal/s) |
| `00:22 - 00:28` | 5.5s | Comparativa de precisión: Inteligencia artificial genérica que inventa datos vs Asistente con acceso a registros reales | *"Sin alucinaciones ni inventos: el motor lee únicamente los registros reales de tus ventas y tus compras con permisos de solo lectura."* | 22 (4.0 pal/s) |
| `00:28 - 00:33` | 5.6s | Matriz de velocidad gerencial: Respuestas estratégicas en 3 segundos vs Esperar días por informes contables | *"Tienes un analista financiero trabajando las veinticuatro horas en tu bolsillo para cuidar cada centavo de tu empresa."* | 18 (3.2 pal/s) |
| `00:33 - 00:39` | 5.6s | Diagnóstico de analítica e inteligencia de negocio con palabra clave AUDITOR | *"Si quieres auditar tu negocio haciéndole preguntas en español directo a tus datos, comenta AUDITOR y te mostramos cómo funciona."* | 20 (3.6 pal/s) |

---

## 📜 Texto Completo para Teleprompter / Locutor (Copiar y Pegar)

Para saber cuánto ganaste esta semana o qué producto no se está vendiendo, no deberías tener que pedirle un informe a tu contador.

La mayoría de los dueños toman decisiones a ciegas porque exportar datos a Excel y armar fórmulas toma horas que no tienen.

Conectamos un asistente de inteligencia artificial directo a la base de datos de tu inventario en un entorno completamente seguro.

Le escribes: '¿qué proveedor me subió precios este mes?' y en tres segundos te devuelve la lista exacta con los porcentajes.

Sin alucinaciones ni inventos: el motor lee únicamente los registros reales de tus ventas y tus compras con permisos de solo lectura.

Tienes un analista financiero trabajando las veinticuatro horas en tu bolsillo para cuidar cada centavo de tu empresa.

Si quieres auditar tu negocio haciéndole preguntas en español directo a tus datos, comenta AUDITOR y te mostramos cómo funciona.

---

## ⚙️ Desglose Mecánico Escena por Escena (7 Cortes Rápidos)

### Escena 01: `terminal_split` (5.5s)
- **Visual Cue:** Consulta en lenguaje natural: Dueño preguntando desde su teléfono: '¿Cuáles son los 5 productos con menor rotación este mes?'
- **Voz en Off:** *"Para saber cuánto ganaste esta semana o qué producto no se está vendiendo, no deberías tener que pedirle un informe a tu contador."*
- **Componente:** `terminal_split`
- **Props Clave:**
```json
{
  "title": "AUDITORÍA INMEDIATA EN LENGUAJE NATURAL",
  "fileLeft": "pregunta_del_dueno.txt",
  "codeLeft": "Dueño escribe en la aplicación:\n'¿Cuáles son los 5 productos con menor rotación este mes y cuánto dinero representan en inventario parado?'\n[Consulta enviada en lenguaje humano]",
  "fileRight": "respuesta_ejecutiva.json",
  "codeRight": "{\n  \"productos_estancados\": 5,\n  \"capital_inmovilizado\": \"$4,120 USD\",\n  \"item_critico\": \"Batería 65A (82 días sin venta)\",\n  \"accion_recomendada\": \"Lanzar combo promocional\"\n}",
  "analysis": "RESPUESTA DIRECTA SIN ESPERAR POR REPORTES EXTERNOS"
}
```

### Escena 02: `disaster_monitor` (5.6s)
- **Visual Cue:** Parálisis de análisis: Hojas de cálculo con 50 columnas, fórmulas rotas y datos desactualizados
- **Voz en Off:** *"La mayoría de los dueños toman decisiones a ciegas porque exportar datos a Excel y armar fórmulas toma horas que no tienen."*
- **Componente:** `disaster_monitor`
- **Props Clave:**
```json
{
  "title": "PARÁLISIS POR EXCESO DE ARCHIVOS",
  "subtitle": "DECISIONES A CIEGAS POR FALTA DE TIEMPO",
  "crashedStatus": "REPORTE DESACTUALIZADO · DECISIÓN TOMADA A CIEGAS",
  "latencyNormal": 1,
  "latencyCrash": 48,
  "logs": [
    {
      "time": "Lunes",
      "level": "INFO",
      "text": "Dueño pide informe de ventas por categoría",
      "color": "#38bdf8"
    },
    {
      "time": "Martes",
      "level": "WARN",
      "text": "Administrador exporta 3 archivos CSV con datos dispares",
      "color": "#fbbf24"
    },
    {
      "time": "Miércoles",
      "level": "CRIT",
      "text": "Fórmula de suma rota genera número equivocado",
      "color": "#ef4444"
    },
    {
      "time": "Jueves",
      "level": "FATAL",
      "text": "Se compra mercancía equivocada por error del reporte",
      "color": "#ef4444"
    }
  ],
  "impactMetric": "3 DÍAS PERDIDOS",
  "impactSub": "Tiempo necesario para obtener una simple cifra de ventas"
}
```

### Escena 03: `architecture_flow` (5.8s)
- **Visual Cue:** Topología de asistente de datos: Lenguaje natural -> Motor seguro de solo lectura -> Respuesta matemática exacta
- **Voz en Off:** *"Conectamos un asistente de inteligencia artificial directo a la base de datos de tu inventario en un entorno completamente seguro."*
- **Componente:** `architecture_flow`
- **Props Clave:**
```json
{
  "title": "ASISTENTE DE DATOS CONEXIÓN DIRECTA",
  "subtitle": "CONSULTAS BLINDADAS DE SOLO LECTURA",
  "nodes": [
    {
      "id": "chat",
      "label": "Pregunta en Español",
      "sub": "Texto libre desde app o chat",
      "status": "INPUT",
      "color": "#38bdf8"
    },
    {
      "id": "ai",
      "label": "Motor de IA Interno",
      "sub": "Comprensión del modelo de datos",
      "status": "TRANSLATE",
      "color": "#00e5a0"
    },
    {
      "id": "db",
      "label": "Base de Datos Segura",
      "sub": "Sandbox de solo lectura",
      "status": "QUERY",
      "color": "#00e5a0"
    },
    {
      "id": "out",
      "label": "Resumen Ejecutivo",
      "sub": "Métricas exactas al instante",
      "status": "OUTPUT",
      "color": "#fbbf24"
    }
  ],
  "pipelineStats": "CONSULTA PROCESADA EN 1.2s · CERO RIESGO DE MODIFICACIÓN"
}
```

### Escena 04: `terminal_split` (5.6s)
- **Visual Cue:** Auditoría interactiva en tiempo real: Detección instantánea de incrementos de costo de proveedores
- **Voz en Off:** *"Le escribes: '¿qué proveedor me subió precios este mes?' y en tres segundos te devuelve la lista exacta con los porcentajes."*
- **Componente:** `terminal_split`
- **Props Clave:**
```json
{
  "title": "AUDITORÍA DE COSTOS EN SEGUNDOS",
  "fileLeft": "consulta_costos.txt",
  "codeLeft": "Dueño: '¿Qué proveedores aumentaron precios más de un 10% en las últimas dos semanas?'",
  "fileRight": "resultado_auditoria.json",
  "codeRight": "[\n  { \"proveedor\": \"Distribuidora Central\", \"incremento\": \"+14.2%\", \"rubro\": \"Lácteos\" },\n  { \"proveedor\": \"Importadora Andina\", \"incremento\": \"+11.0%\", \"rubro\": \"Empaques\" }\n]\n[Alerta]: Sugerencia de renegociación disponible",
  "analysis": "DETECCIÓN INMEDIATA DE GASTOS OCULTOS"
}
```

### Escena 05: `versus_race` (5.5s)
- **Visual Cue:** Comparativa de precisión: Inteligencia artificial genérica que inventa datos vs Asistente con acceso a registros reales
- **Voz en Off:** *"Sin alucinaciones ni inventos: el motor lee únicamente los registros reales de tus ventas y tus compras con permisos de solo lectura."*
- **Componente:** `versus_race`
- **Props Clave:**
```json
{
  "title": "PRECISIÓN ANALÍTICA: GENÉRICO VS CONECTADO",
  "runnerA": {
    "name": "IA Genérica sin conexión a tus datos",
    "time": "Alucinaciones",
    "rate": "Respuestas vagas e inventadas",
    "color": "#ef4444"
  },
  "runnerB": {
    "name": "Cortex Asistente de Negocio",
    "time": "100% Preciso",
    "rate": "Validado contra tus facturas reales",
    "color": "#00e5a0"
  },
  "winnerDiff": "DATOS MATEMÁTICOS AUDITABLES AL CENTAVO"
}
```

### Escena 06: `tradeoff_matrix` (5.6s)
- **Visual Cue:** Matriz de velocidad gerencial: Respuestas estratégicas en 3 segundos vs Esperar días por informes contables
- **Voz en Off:** *"Tienes un analista financiero trabajando las veinticuatro horas en tu bolsillo para cuidar cada centavo de tu empresa."*
- **Componente:** `tradeoff_matrix`
- **Props Clave:**
```json
{
  "title": "VALOR GERENCIAL PARA EL FUNDADOR",
  "dimX": "Tiempo de Respuesta",
  "dimY": "Profundidad del Análisis",
  "quadrants": [
    {
      "name": "Preguntar al Contador",
      "value": "3 a 5 días de demora / Resumen estático",
      "color": "#fbbf24"
    },
    {
      "name": "Revisar Sistema a Mano",
      "value": "Navegar 15 menús complejos para una cifra",
      "color": "#ef4444"
    },
    {
      "name": "Cortex Asistente IA",
      "value": "Pregunta en español y respuesta ejecutiva en 3 segundos",
      "color": "#00e5a0"
    }
  ],
  "verdict": "CONTROL TOTAL DE TU NEGOCIO DESDE TU TELÉFONO"
}
```

### Escena 07: `cost_ticker` (5.6s)
- **Visual Cue:** Diagnóstico de analítica e inteligencia de negocio con palabra clave AUDITOR
- **Voz en Off:** *"Si quieres auditar tu negocio haciéndole preguntas en español directo a tus datos, comenta AUDITOR y te mostramos cómo funciona."*
- **Componente:** `cost_ticker`
- **Props Clave:**
```json
{
  "title": "DIAGNÓSTICO DE ANALÍTICA INTELIGENTE",
  "subtitle": "CONVIERTE TUS DATOS DE VENTAS EN DECISIONES RÁPIDAS",
  "cloudCost": 3800,
  "initialCost": 120,
  "breakdown": [
    {
      "name": "Sueldos dedicados a armar reportes manuales",
      "cost": "$2,400/mes",
      "sub": "Horas de oficina gastadas en consolidar Excel",
      "color": "#fbbf24"
    },
    {
      "name": "Dinero perdido por compras mal calculadas",
      "cost": "$1,400/mes",
      "sub": "Sobre-stock adquirido por falta de visibilidad",
      "color": "#ef4444"
    }
  ],
  "bareMetalCost": "ASISTENTE INTELIGENTE",
  "takeaway": "ESCRIBE 'AUDITOR' PARA PROBAR EL ASISTENTE CON TUS DATOS"
}
```
