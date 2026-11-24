# 🎙️ Guion de Locución Sincronizado
**Título:** [28] Rotación de lotes: por qué se te vencen productos en el fondo del anaquel  
**Categoría:** CORTEX · INVENTARIO & OPERACIONES (Control de Lotes & Vencimientos)  
**Duración Total:** 39.2s (7 cortes rápidos)  
**Total de Palabras:** 139 palabras (promedio: 213 WPM - ritmo óptimo)  
**Vídeo Asociado:** `nevox_28_cortex_fifo_fefo_lotes_vencimiento.mp4`  

---

## ⏱️ Tabla de Sincronización Fotograma a Fotograma

| Marca de Tiempo | Duración | Acción en Pantalla (Visual Cue) | Locución Exacta (Voice-Over) | Palabras / Ritmo |
| :--- | :---: | :--- | :--- | :---: |
| `00:00 - 00:05` | 5.5s | Pérdida oculta en anaqueles: El 14% de la merma anual ocurre por productos que se caducan en bodega | *"Llega mercancía nueva, los empleados la colocan encima de la vieja y lo que estaba al fondo se vence sin que nadie lo note."* | 24 (4.4 pal/s) |
| `00:05 - 00:11` | 5.6s | Ticker de merma acumulada: Pérdida directa de capital de trabajo por falta de rotación oportuna | *"En alimentos, medicamentos o cosméticos, botar una sola caja de producto vencido borra la ganancia de toda la semana."* | 19 (3.4 pal/s) |
| `00:11 - 00:16` | 5.8s | Flujo de rotación automática: Entrada con fecha de caducidad -> Algoritmo de rotación -> Despacho prioritario | *"El control por lotes asigna a cada entrada su fecha de vencimiento y fuerza al sistema a vender primero lo que vence antes."* | 23 (4.0 pal/s) |
| `00:16 - 00:22` | 5.6s | Validación de salida en pantalla: Descuento obligatorio del lote con fecha más próxima | *"El cajero o el despachador escanea el producto y el sistema le indica exactamente de qué lote y ubicación debe retirarlo."* | 21 (3.8 pal/s) |
| `00:22 - 00:28` | 5.5s | Comparativa: Descubrir producto vencido al botarlo (pérdida 100%) vs Alerta preventiva a 30 días para liquidar (recuperación 90%) | *"Treinta días antes del vencimiento recibes una alerta automática para lanzar promociones y recuperar el costo de inmediato."* | 18 (3.3 pal/s) |
| `00:28 - 00:33` | 5.6s | Matriz de eficiencia de almacén: Rotación desordenada vs Rotación por fecha garantizada | *"Cero mermas en bodega, cumplimiento estricto de normas sanitarias y rotación continua de tu capital invertido."* | 16 (2.9 pal/s) |
| `00:33 - 00:39` | 5.6s | Diagnóstico de rotación de lotes y vencimientos con palabra clave LOTES | *"Si tienes pérdidas por productos que se vencen en tus anaqueles, comenta LOTES y te enseñamos cómo controlarlo."* | 18 (3.2 pal/s) |

---

## 📜 Texto Completo para Teleprompter / Locutor (Copiar y Pegar)

Llega mercancía nueva, los empleados la colocan encima de la vieja y lo que estaba al fondo se vence sin que nadie lo note.

En alimentos, medicamentos o cosméticos, botar una sola caja de producto vencido borra la ganancia de toda la semana.

El control por lotes asigna a cada entrada su fecha de vencimiento y fuerza al sistema a vender primero lo que vence antes.

El cajero o el despachador escanea el producto y el sistema le indica exactamente de qué lote y ubicación debe retirarlo.

Treinta días antes del vencimiento recibes una alerta automática para lanzar promociones y recuperar el costo de inmediato.

Cero mermas en bodega, cumplimiento estricto de normas sanitarias y rotación continua de tu capital invertido.

Si tienes pérdidas por productos que se vencen en tus anaqueles, comenta LOTES y te enseñamos cómo controlarlo.

---

## ⚙️ Desglose Mecánico Escena por Escena (7 Cortes Rápidos)

### Escena 01: `disaster_monitor` (5.5s)
- **Visual Cue:** Pérdida oculta en anaqueles: El 14% de la merma anual ocurre por productos que se caducan en bodega
- **Voz en Off:** *"Llega mercancía nueva, los empleados la colocan encima de la vieja y lo que estaba al fondo se vence sin que nadie lo note."*
- **Componente:** `disaster_monitor`
- **Props Clave:**
```json
{
  "title": "EL CEMENTERIO DEL FONDO DEL ANAQUEL",
  "subtitle": "DESORDEN FÍSICO QUE CONSUME GANANCIAS",
  "crashedStatus": "PRODUCTOS CADUCADOS DESCUBIERTOS EN AUDITORÍA",
  "latencyNormal": 1,
  "latencyCrash": 180,
  "logs": [
    {
      "time": "Día 1",
      "level": "INFO",
      "text": "Entrada de Lote #1 (Vence en 60 días)",
      "color": "#38bdf8"
    },
    {
      "time": "Día 15",
      "level": "WARN",
      "text": "Entrada de Lote #2 colocada al frente del anaquel",
      "color": "#fbbf24"
    },
    {
      "time": "Día 45",
      "level": "WARN",
      "text": "Se vende Lote #2 mientras Lote #1 sigue al fondo",
      "color": "#fbbf24"
    },
    {
      "time": "Día 65",
      "level": "FATAL",
      "text": "Lote #1 caducado: $1,400 en producto que debe botarse",
      "color": "#ef4444"
    }
  ],
  "impactMetric": "$1,400 USD",
  "impactSub": "Mercancía perdida en una sola sección del depósito"
}
```

### Escena 02: `cost_ticker` (5.6s)
- **Visual Cue:** Ticker de merma acumulada: Pérdida directa de capital de trabajo por falta de rotación oportuna
- **Voz en Off:** *"En alimentos, medicamentos o cosméticos, botar una sola caja de producto vencido borra la ganancia de toda la semana."*
- **Componente:** `cost_ticker`
- **Props Clave:**
```json
{
  "title": "IMPACTO DE LA MERMA EN TU NEGOCIO",
  "subtitle": "CÓMO EL PRODUCTO CADUCADO DESTRUYE TU RENTABILIDAD",
  "cloudCost": 3200,
  "initialCost": 0,
  "breakdown": [
    {
      "name": "Cajas de producto vencido descartadas",
      "cost": "$2,200",
      "sub": "Costo de compra absorbido al 100% como pérdida",
      "color": "#ef4444"
    },
    {
      "name": "Espacio ocupado en bodega sin rotación",
      "cost": "$1,000",
      "sub": "Capital de trabajo congelado e inútil",
      "color": "#fbbf24"
    }
  ],
  "bareMetalCost": "$0 PÉRDIDAS CON CONTROL",
  "takeaway": "EL INVENTARIO QUE NO ROTA A TIEMPO ES DINERO TIRADO"
}
```

### Escena 03: `architecture_flow` (5.8s)
- **Visual Cue:** Flujo de rotación automática: Entrada con fecha de caducidad -> Algoritmo de rotación -> Despacho prioritario
- **Voz en Off:** *"El control por lotes asigna a cada entrada su fecha de vencimiento y fuerza al sistema a vender primero lo que vence antes."*
- **Componente:** `architecture_flow`
- **Props Clave:**
```json
{
  "title": "ROTACIÓN AUTOMÁTICA POR VENCIMIENTO",
  "subtitle": "ALGORITMO DE DESPACHO PRIORITARIO DE LOTES",
  "nodes": [
    {
      "id": "in",
      "label": "Recepción Mercancía",
      "sub": "Registro de lote + fecha",
      "status": "INSPECT",
      "color": "#38bdf8"
    },
    {
      "id": "lot",
      "label": "Matriz de Caducidad",
      "sub": "Orden cronológico estricto",
      "status": "SORTED",
      "color": "#00e5a0"
    },
    {
      "id": "pos",
      "label": "Venta en Caja",
      "sub": "Descuento del lote más antiguo",
      "status": "DISPATCH",
      "color": "#00e5a0"
    },
    {
      "id": "alert",
      "label": "Radar 30 Días",
      "sub": "Alerta para ofertas rápidas",
      "status": "WARNING",
      "color": "#fbbf24"
    }
  ],
  "pipelineStats": "100% TRAZABILIDAD SANITARIA · ROTACIÓN GARANTIZADA"
}
```

### Escena 04: `terminal_split` (5.6s)
- **Visual Cue:** Validación de salida en pantalla: Descuento obligatorio del lote con fecha más próxima
- **Voz en Off:** *"El cajero o el despachador escanea el producto y el sistema le indica exactamente de qué lote y ubicación debe retirarlo."*
- **Componente:** `terminal_split`
- **Props Clave:**
```json
{
  "title": "DESCUENTO DE INVENTARIO EN VIVO",
  "fileLeft": "deposito_desordenado.txt",
  "codeLeft": "Despachador toma la primera caja a la vista\nCaja retirada: Lote #99 (Vence en 2027)\nCaja que quedó olvidada: Lote #12 (Vence en 15 días)\n[Resultado]: El lote viejo se vence en el depósito",
  "fileRight": "cortex_despacho_guiado.json",
  "codeRight": "{\n  \"producto\": \"Fórmula Láctea 800g\",\n  \"instruccion_deposito\": \"Retirar de Estante B-03\",\n  \"lote_requerido\": \"LOTE-2026-A\",\n  \"vencimiento\": \"18 días restantes\",\n  \"estado_salida\": \"ROTACION_CORRECTA\"\n}",
  "analysis": "CERO PRODUCTOS OLVIDADOS EN EL DEPÓSITO"
}
```

### Escena 05: `versus_race` (5.5s)
- **Visual Cue:** Comparativa: Descubrir producto vencido al botarlo (pérdida 100%) vs Alerta preventiva a 30 días para liquidar (recuperación 90%)
- **Voz en Off:** *"Treinta días antes del vencimiento recibes una alerta automática para lanzar promociones y recuperar el costo de inmediato."*
- **Componente:** `versus_race`
- **Props Clave:**
```json
{
  "title": "GESTIÓN PREVENTIVA VS MERMA PASIVA",
  "runnerA": {
    "name": "Esperar a ver el producto vencido",
    "time": "Pérdida 100%",
    "rate": "Dinero tirado a la basura",
    "color": "#ef4444"
  },
  "runnerB": {
    "name": "Alerta Cortex a 30 días",
    "time": "Recupera 90%",
    "rate": "Promoción express de liquidación",
    "color": "#00e5a0"
  },
  "winnerDiff": "TRANSFORMA RIESGO DE PÉRDIDA EN LIQUIDEZ INMEDIATA"
}
```

### Escena 06: `tradeoff_matrix` (5.6s)
- **Visual Cue:** Matriz de eficiencia de almacén: Rotación desordenada vs Rotación por fecha garantizada
- **Voz en Off:** *"Cero mermas en bodega, cumplimiento estricto de normas sanitarias y rotación continua de tu capital invertido."*
- **Componente:** `tradeoff_matrix`
- **Props Clave:**
```json
{
  "title": "CONTROL OPERATIVO DE BODEGA",
  "dimX": "Control de Fechas",
  "dimY": "Eficiencia de Capital",
  "quadrants": [
    {
      "name": "Gestión a Ojo",
      "value": "Pérdidas constantes por vencimientos no vistos",
      "color": "#ef4444"
    },
    {
      "name": "Anotación en Cuadernos",
      "value": "Nadie revisa las fechas hasta que ya es tarde",
      "color": "#fbbf24"
    },
    {
      "name": "Cortex Lotes",
      "value": "Salida automatizada y alertas de liquidación temprana",
      "color": "#00e5a0"
    }
  ],
  "verdict": "CADA ARTÍCULO EN TU BODEGA TIENE FECHA DE SALIDA PREVISTA"
}
```

### Escena 07: `cost_ticker` (5.6s)
- **Visual Cue:** Diagnóstico de rotación de lotes y vencimientos con palabra clave LOTES
- **Voz en Off:** *"Si tienes pérdidas por productos que se vencen en tus anaqueles, comenta LOTES y te enseñamos cómo controlarlo."*
- **Componente:** `cost_ticker`
- **Props Clave:**
```json
{
  "title": "DIAGNÓSTICO DE CONTROL DE LOTES",
  "subtitle": "ELIMINA LA MERMA EN ALIMENTOS Y MEDICAMENTOS",
  "cloudCost": 4500,
  "initialCost": 100,
  "breakdown": [
    {
      "name": "Pérdida anual promedio por mercancía vencida",
      "cost": "$3,500/año",
      "sub": "Cajas de producto descartadas en almacén",
      "color": "#ef4444"
    },
    {
      "name": "Multas o sanciones por producto caducado exhibido",
      "cost": "$1,000",
      "sub": "Riesgos regulatorios evitables",
      "color": "#fbbf24"
    }
  ],
  "bareMetalCost": "CONTROL DE LOTES",
  "takeaway": "ESCRIBE 'LOTES' PARA IMPLEMENTAR ROTACIÓN INTELIGENTE"
}
```
