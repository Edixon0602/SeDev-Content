# 🎙️ Guion de Locución Sincronizado
**Título:** [30] El colapso del multialmacén: por qué Excel rompe el stock entre tus sucursales  
**Categoría:** CORTEX · INVENTARIO & OPERACIONES (Multialmacén & Transferencias)  
**Duración Total:** 39.2s (7 cortes rápidos)  
**Total de Palabras:** 140 palabras (promedio: 214 WPM - ritmo óptimo)  
**Vídeo Asociado:** `nevox_30_cortex_multialmacen_vs_excel.mp4`  

---

## ⏱️ Tabla de Sincronización Fotograma a Fotograma

| Marca de Tiempo | Duración | Acción en Pantalla (Visual Cue) | Locución Exacta (Voice-Over) | Palabras / Ritmo |
| :--- | :---: | :--- | :--- | :---: |
| `00:00 - 00:05` | 5.5s | Stepper de expansión comercial: Apertura de Sucursal 2 -> Conflicto de stock compartido -> Pérdida de control de mercancía | *"Abrir una segunda sucursal y seguir usando una hoja de cálculo para controlar el stock es la fórmula garantizada para el desastre."* | 22 (4.0 pal/s) |
| `00:05 - 00:11` | 5.6s | Monitor de inventario fantasma: Doble venta accidental, orden cancelada y reclamo enfurecido de cliente | *"Vendes la última unidad en una tienda mientras el depósito central ya la había comprometido para otro cliente."* | 18 (3.2 pal/s) |
| `00:11 - 00:16` | 5.8s | Topología de transferencias seguras: Almacén Central -> En tránsito con guía formal -> Recepción confirmada en Sucursal | *"Un sistema multialmacén sincroniza cada depósito en la nube con transferencias blindadas que requieren confirmación de salida y llegada."* | 19 (3.3 pal/s) |
| `00:16 - 00:22` | 5.6s | Estados de existencia en el sistema: Físico, Disponible y En Tránsito claramente separados | *"La mercancía nunca desaparece en el camino: mientras viaja queda marcada 'en tránsito' y ningún vendedor puede venderla por error."* | 20 (3.6 pal/s) |
| `00:22 - 00:28` | 5.5s | Balanceo inteligente de inventario: Mover producto estancado entre tiendas en lugar de comprar más a proveedores | *"Si una tienda se queda sin mercancía, el sistema sugiere traslados automáticos desde la sucursal con menor rotación."* | 18 (3.3 pal/s) |
| `00:28 - 00:33` | 5.6s | Matriz de control multisede: 100% de trazabilidad entre tiendas con auditoría por usuario | *"Pasas de tener mercancía perdida y recuentos interminables a saber el valor exacto de tus activos en cada punto de venta."* | 21 (3.8 pal/s) |
| `00:33 - 00:39` | 5.6s | Diagnóstico operativo multisede y almacenes con palabra clave ALMACEN | *"Si manejas más de una sede o almacén y sufres con los descuadres de inventario, comenta ALMACEN y te enseñamos la arquitectura."* | 22 (3.9 pal/s) |

---

## 📜 Texto Completo para Teleprompter / Locutor (Copiar y Pegar)

Abrir una segunda sucursal y seguir usando una hoja de cálculo para controlar el stock es la fórmula garantizada para el desastre.

Vendes la última unidad en una tienda mientras el depósito central ya la había comprometido para otro cliente.

Un sistema multialmacén sincroniza cada depósito en la nube con transferencias blindadas que requieren confirmación de salida y llegada.

La mercancía nunca desaparece en el camino: mientras viaja queda marcada 'en tránsito' y ningún vendedor puede venderla por error.

Si una tienda se queda sin mercancía, el sistema sugiere traslados automáticos desde la sucursal con menor rotación.

Pasas de tener mercancía perdida y recuentos interminables a saber el valor exacto de tus activos en cada punto de venta.

Si manejas más de una sede o almacén y sufres con los descuadres de inventario, comenta ALMACEN y te enseñamos la arquitectura.

---

## ⚙️ Desglose Mecánico Escena por Escena (7 Cortes Rápidos)

### Escena 01: `migration_stepper_viz` (5.5s)
- **Visual Cue:** Stepper de expansión comercial: Apertura de Sucursal 2 -> Conflicto de stock compartido -> Pérdida de control de mercancía
- **Voz en Off:** *"Abrir una segunda sucursal y seguir usando una hoja de cálculo para controlar el stock es la fórmula garantizada para el desastre."*
- **Componente:** `migration_stepper_viz`
- **Props Clave:**
```json
{
  "title": "EL COLAPSO DEL CRECIMIENTO EN EXCEL",
  "steps": [
    {
      "num": "01",
      "title": "Una sola tienda",
      "sub": "Excel funciona de milagro con un solo cajero",
      "status": "done"
    },
    {
      "num": "02",
      "title": "Apertura Sucursal 2",
      "sub": "Dos tiendas editando el mismo archivo",
      "status": "active"
    },
    {
      "num": "03",
      "title": "Descuadres Cruzados",
      "sub": "Ventas duplicadas y pérdidas en tránsito",
      "status": "failed"
    }
  ]
}
```

### Escena 02: `disaster_monitor` (5.6s)
- **Visual Cue:** Monitor de inventario fantasma: Doble venta accidental, orden cancelada y reclamo enfurecido de cliente
- **Voz en Off:** *"Vendes la última unidad en una tienda mientras el depósito central ya la había comprometido para otro cliente."*
- **Componente:** `disaster_monitor`
- **Props Clave:**
```json
{
  "title": "INVENTARIO FANTASMA Y DOBLE VENTA",
  "subtitle": "CONFLICTO DE EXISTENCIAS ENTRE PUNTOS DE VENTA",
  "crashedStatus": "SOBREVENTA CRÍTICA: PRODUCTO COMPROMETIDO EN DOS LUGARES",
  "latencyNormal": 1,
  "latencyCrash": 360,
  "logs": [
    {
      "time": "16:10",
      "level": "INFO",
      "text": "Sucursal Norte vende última planta eléctrica en stock",
      "color": "#38bdf8"
    },
    {
      "time": "16:12",
      "level": "CRIT",
      "text": "Sucursal Centro vende el mismo equipo a cliente corporativo",
      "color": "#ef4444"
    },
    {
      "time": "16:25",
      "level": "FATAL",
      "text": "Choque en depósito: Solo existe 1 unidad física real",
      "color": "#ef4444"
    }
  ],
  "impactMetric": "-$2,400 USD",
  "impactSub": "Devolución forzosa y pérdida de cliente corporativo"
}
```

### Escena 03: `architecture_flow` (5.8s)
- **Visual Cue:** Topología de transferencias seguras: Almacén Central -> En tránsito con guía formal -> Recepción confirmada en Sucursal
- **Voz en Off:** *"Un sistema multialmacén sincroniza cada depósito en la nube con transferencias blindadas que requieren confirmación de salida y llegada."*
- **Componente:** `architecture_flow`
- **Props Clave:**
```json
{
  "title": "RED MULTIALMACÉN EN TIEMPO REAL",
  "subtitle": "TRANSFERENCIAS CON DOBLE VALIDACIÓN DIGITAL",
  "nodes": [
    {
      "id": "depot",
      "label": "Depósito Central",
      "sub": "Stock empaquetado",
      "status": "DISPATCHED",
      "color": "#38bdf8"
    },
    {
      "id": "transit",
      "label": "Guía en Tránsito",
      "sub": "Bloqueado para la venta",
      "status": "IN_TRANSIT",
      "color": "#fbbf24"
    },
    {
      "id": "store",
      "label": "Sucursal Destino",
      "sub": "Recepción y conteo físico",
      "status": "RECEIVED",
      "color": "#00e5a0"
    },
    {
      "id": "audit",
      "label": "Auditoría en Red",
      "sub": "Ajuste automático de stock",
      "status": "BALANCED",
      "color": "#00e5a0"
    }
  ],
  "pipelineStats": "0 EXTRAVÍOS EN CARRETERA · CONCILIACIÓN INMEDIATA"
}
```

### Escena 04: `terminal_split` (5.6s)
- **Visual Cue:** Estados de existencia en el sistema: Físico, Disponible y En Tránsito claramente separados
- **Voz en Off:** *"La mercancía nunca desaparece en el camino: mientras viaja queda marcada 'en tránsito' y ningún vendedor puede venderla por error."*
- **Componente:** `terminal_split`
- **Props Clave:**
```json
{
  "title": "AISLAMIENTO DE STOCK EN TRÁNSITO",
  "fileLeft": "excel_desordenado.csv",
  "codeLeft": "Item,StockTotal\nGenerador 5KVA,3\n[Problema]: 1 está en la tienda, 2 van en el camión\nEl vendedor ve '3' y promete entrega inmediata a 3 clientes",
  "fileRight": "cortex_existencias.json",
  "codeRight": "{\n  \"producto\": \"Generador 5KVA\",\n  \"stock_disponible_tienda\": 1,\n  \"en_transito_camion\": 2,\n  \"guia_despacho\": \"TR-8812\",\n  \"hora_estimada_llegada\": \"18:00\",\n  \"bloqueado_para_venta_inmediata\": true\n}",
  "analysis": "SEGURIDAD ABSOLUTA EN LO QUE REALMENTE SE PUEDE ENTREGAR"
}
```

### Escena 05: `versus_race` (5.5s)
- **Visual Cue:** Balanceo inteligente de inventario: Mover producto estancado entre tiendas en lugar de comprar más a proveedores
- **Voz en Off:** *"Si una tienda se queda sin mercancía, el sistema sugiere traslados automáticos desde la sucursal con menor rotación."*
- **Componente:** `versus_race`
- **Props Clave:**
```json
{
  "title": "BALANCEO INTELIGENTE ENTRE TIENDAS",
  "runnerA": {
    "name": "Comprar mercancía nueva teniendo stock parado",
    "time": "Gasto innecesario",
    "rate": "$5,000 en sobrecompra",
    "color": "#ef4444"
  },
  "runnerB": {
    "name": "Rebalanceo automático Cortex",
    "time": "Traslado en 24h",
    "rate": "Aprovecha el stock existente",
    "color": "#00e5a0"
  },
  "winnerDiff": "AHORRO MASIVO DE CAPITAL DE TRABAJO"
}
```

### Escena 06: `tradeoff_matrix` (5.6s)
- **Visual Cue:** Matriz de control multisede: 100% de trazabilidad entre tiendas con auditoría por usuario
- **Voz en Off:** *"Pasas de tener mercancía perdida y recuentos interminables a saber el valor exacto de tus activos en cada punto de venta."*
- **Componente:** `tradeoff_matrix`
- **Props Clave:**
```json
{
  "title": "CONTROL TOTAL MULTI-SUCURSAL",
  "dimX": "Número de Sedes",
  "dimY": "Precisión de Stock",
  "quadrants": [
    {
      "name": "Hojas de Cálculo Compartidas",
      "value": "Colapso a partir de la 2da sede / Stock fantasma",
      "color": "#ef4444"
    },
    {
      "name": "Sistemas Aislados por Tienda",
      "value": "Cajas negras sin comunicación entre sí",
      "color": "#fbbf24"
    },
    {
      "name": "Cortex Multialmacén Cloud",
      "value": "Visión panorámica central con permisos por rol",
      "color": "#00e5a0"
    }
  ],
  "verdict": "ESCALA A DIEZ SUCURSALES CON LA MISMA PAZ MENTAL"
}
```

### Escena 07: `cost_ticker` (5.6s)
- **Visual Cue:** Diagnóstico operativo multisede y almacenes con palabra clave ALMACEN
- **Voz en Off:** *"Si manejas más de una sede o almacén y sufres con los descuadres de inventario, comenta ALMACEN y te enseñamos la arquitectura."*
- **Componente:** `cost_ticker`
- **Props Clave:**
```json
{
  "title": "DIAGNÓSTICO MULTIALMACÉN Y STOCK",
  "subtitle": "CONECTA TUS SUCURSALES EN UNA SOLA PLATAFORMA",
  "cloudCost": 6500,
  "initialCost": 200,
  "breakdown": [
    {
      "name": "Mercancía perdida o extraviada en traslados",
      "cost": "$4,200/año",
      "sub": "Falta de control de guías de entrega",
      "color": "#ef4444"
    },
    {
      "name": "Ventas caídas por falta de stock coordinado",
      "cost": "$2,300/mes",
      "sub": "Clientes que no esperaron el traslado",
      "color": "#fbbf24"
    }
  ],
  "bareMetalCost": "MULTIALMACÉN CLOUD",
  "takeaway": "ESCRIBE 'ALMACEN' PARA UNIFICAR TUS SUCURSALES"
}
```
