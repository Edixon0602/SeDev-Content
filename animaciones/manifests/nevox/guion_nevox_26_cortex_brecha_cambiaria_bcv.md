# 🎙️ Guion de Locución Sincronizado
**Título:** [26] La trampa de la tasa de cambio: cómo proteger tu margen sin quebrar  
**Categoría:** CORTEX · MULTI-MONEDA & CAJA (Brecha Cambiaria & Protección de Margen)  
**Duración Total:** 39.2s (7 cortes rápidos)  
**Total de Palabras:** 154 palabras (promedio: 236 WPM - ritmo óptimo)  
**Vídeo Asociado:** `nevox_26_cortex_brecha_cambiaria_bcv.mp4`  

---

## ⏱️ Tabla de Sincronización Fotograma a Fotograma

| Marca de Tiempo | Duración | Acción en Pantalla (Visual Cue) | Locución Exacta (Voice-Over) | Palabras / Ritmo |
| :--- | :---: | :--- | :--- | :---: |
| `00:00 - 00:05` | 5.5s | Erosión de capital: Margen teórico en papel (+30%) vs Margen real al reponer inventario (-8%) | *"Vendes a tasa oficial pensando que estás ganando un treinta por ciento, pero cuando vas a reponer la mercancía ya no te alcanza."* | 23 (4.2 pal/s) |
| `00:05 - 00:11` | 5.6s | Monitor de brecha cambiaria: Gráfica de divergencia entre tasa oficial de facturación y costo de reposición | *"Es la trampa más común en el comercio: calcular tus costos en una moneda y cobrar en otra sin medir la brecha cambiaria real del día."* | 26 (4.6 pal/s) |
| `00:11 - 00:16` | 5.8s | Arquitectura de recálculo dinámico: Monitor de tasas -> Matriz de márgenes de seguridad -> Precios automáticos en caja | *"Diseñamos un sistema con sincronización de tasas que recalcula al instante tus precios en ambas monedas protegiendo tu margen mínimo."* | 20 (3.4 pal/s) |
| `00:16 - 00:22` | 5.6s | Reglas de fijación de precios en el sistema: Margen objetivo garantizado frente a cualquier cambio de tasa | *"Al ingresar cada producto defines tu costo base de reposición y el sistema genera los precios en moneda local cumpliendo la ley sin perder dinero."* | 25 (4.5 pal/s) |
| `00:22 - 00:28` | 5.5s | Carrera de adaptación en mostrador: Ajuste manual tienda por tienda (4 horas) vs Actualización en red (1 segundo) | *"Mientras otros comerciantes actualizan etiquetas a mano con una calculadora, el punto de venta ajusta los montos en un clic."* | 20 (3.6 pal/s) |
| `00:28 - 00:33` | 5.6s | Matriz de solidez comercial: Flujo de caja protegido y clientes conformes vs Descapitalización gradual | *"Facturas con total transparencia hacia tus clientes mientras mantienes blindado tu flujo de caja frente a cualquier devaluación."* | 18 (3.2 pal/s) |
| `00:33 - 00:39` | 5.6s | Diagnóstico financiero de protección de inventarios con palabra clave MARGEN | *"Si tienes un comercio y quieres blindar tus márgenes de ganancia contra la brecha de tasas, comenta MARGEN y vemos tu caso."* | 22 (3.9 pal/s) |

---

## 📜 Texto Completo para Teleprompter / Locutor (Copiar y Pegar)

Vendes a tasa oficial pensando que estás ganando un treinta por ciento, pero cuando vas a reponer la mercancía ya no te alcanza.

Es la trampa más común en el comercio: calcular tus costos en una moneda y cobrar en otra sin medir la brecha cambiaria real del día.

Diseñamos un sistema con sincronización de tasas que recalcula al instante tus precios en ambas monedas protegiendo tu margen mínimo.

Al ingresar cada producto defines tu costo base de reposición y el sistema genera los precios en moneda local cumpliendo la ley sin perder dinero.

Mientras otros comerciantes actualizan etiquetas a mano con una calculadora, el punto de venta ajusta los montos en un clic.

Facturas con total transparencia hacia tus clientes mientras mantienes blindado tu flujo de caja frente a cualquier devaluación.

Si tienes un comercio y quieres blindar tus márgenes de ganancia contra la brecha de tasas, comenta MARGEN y vemos tu caso.

---

## ⚙️ Desglose Mecánico Escena por Escena (7 Cortes Rápidos)

### Escena 01: `cost_ticker` (5.5s)
- **Visual Cue:** Erosión de capital: Margen teórico en papel (+30%) vs Margen real al reponer inventario (-8%)
- **Voz en Off:** *"Vendes a tasa oficial pensando que estás ganando un treinta por ciento, pero cuando vas a reponer la mercancía ya no te alcanza."*
- **Componente:** `cost_ticker`
- **Props Clave:**
```json
{
  "title": "LA TRAMPA MATEMÁTICA DE LA DOBLE TASA",
  "subtitle": "ILUSIÓN DE GANANCIA VS DESCAPITALIZACIÓN REAL",
  "cloudCost": 30,
  "initialCost": -8,
  "breakdown": [
    {
      "name": "Margen teórico facturado a tasa oficial",
      "cost": "+30%",
      "sub": "Ganancia calculada en el papel",
      "color": "#00e5a0"
    },
    {
      "name": "Brecha de reposición con proveedores",
      "cost": "-38%",
      "sub": "Diferencia de costo de reposición del inventario",
      "color": "#ef4444"
    }
  ],
  "bareMetalCost": "-8% PÉRDIDA NETA",
  "takeaway": "TRABAJAR SIN CONTROL DE COSTOS DE REPOSICIÓN TE COME EL CAPITAL"
}
```

### Escena 02: `disaster_monitor` (5.6s)
- **Visual Cue:** Monitor de brecha cambiaria: Gráfica de divergencia entre tasa oficial de facturación y costo de reposición
- **Voz en Off:** *"Es la trampa más común en el comercio: calcular tus costos en una moneda y cobrar en otra sin medir la brecha cambiaria real del día."*
- **Componente:** `disaster_monitor`
- **Props Clave:**
```json
{
  "title": "MONITOR DE DIVERGENCIA CAMBIARIA",
  "subtitle": "DESFASAJES QUE AFECTAN EL FLUJO DE CAJA",
  "crashedStatus": "DESCAPITALIZACIÓN SILENCIOSA DETECTADA",
  "latencyNormal": 1,
  "latencyCrash": 25,
  "logs": [
    {
      "time": "09:00",
      "level": "INFO",
      "text": "Tasa oficial publicada para el día",
      "color": "#38bdf8"
    },
    {
      "time": "11:30",
      "level": "WARN",
      "text": "Proveedor incrementa lista de costos en divisas",
      "color": "#fbbf24"
    },
    {
      "time": "14:00",
      "level": "CRIT",
      "text": "Venta masiva a precio desactualizado genera pérdida",
      "color": "#ef4444"
    },
    {
      "time": "18:00",
      "level": "FATAL",
      "text": "Caja llena de moneda local desvalorizada para recomprar",
      "color": "#ef4444"
    }
  ],
  "impactMetric": "-18% MARGEN",
  "impactSub": "Pérdida neta de poder de compra del negocio"
}
```

### Escena 03: `architecture_flow` (5.8s)
- **Visual Cue:** Arquitectura de recálculo dinámico: Monitor de tasas -> Matriz de márgenes de seguridad -> Precios automáticos en caja
- **Voz en Off:** *"Diseñamos un sistema con sincronización de tasas que recalcula al instante tus precios en ambas monedas protegiendo tu margen mínimo."*
- **Componente:** `architecture_flow`
- **Props Clave:**
```json
{
  "title": "SISTEMA DE PRECIOS BIMONEDA PROTEGIDOS",
  "subtitle": "CUMPLIMIENTO LEGAL CON SALUD FINANCIERA",
  "nodes": [
    {
      "id": "rate",
      "label": "Monitor de Tasas",
      "sub": "Actualización diaria oficial",
      "status": "SYNC",
      "color": "#38bdf8"
    },
    {
      "id": "cost",
      "label": "Costo Base en Divisas",
      "sub": "Valor real de reposición",
      "status": "SECURE",
      "color": "#00e5a0"
    },
    {
      "id": "engine",
      "label": "Regla de Margen Mínimo",
      "sub": "Protección matemática",
      "status": "SAFE",
      "color": "#00e5a0"
    },
    {
      "id": "pos",
      "label": "Punto de Venta",
      "sub": "Precios ajustados en 1 clic",
      "status": "READY",
      "color": "#fbbf24"
    }
  ],
  "pipelineStats": "RECALCULO EN 0.4s · MARGEN DE GANANCIA BLINDADO"
}
```

### Escena 04: `terminal_split` (5.6s)
- **Visual Cue:** Reglas de fijación de precios en el sistema: Margen objetivo garantizado frente a cualquier cambio de tasa
- **Voz en Off:** *"Al ingresar cada producto defines tu costo base de reposición y el sistema genera los precios en moneda local cumpliendo la ley sin perder dinero."*
- **Componente:** `terminal_split`
- **Props Clave:**
```json
{
  "title": "PROTECCIÓN AUTOMÁTICA DEL CORRELATIVO",
  "fileLeft": "calculo_manual_desfasado.txt",
  "codeLeft": "Precio fijado hace 2 semanas: 120 Bs\nCosto de reposición actual: $3.20 USD\nTasa del día: 45 Bs/USD\nIngreso en USD reales: 120 / 45 = $2.66 USD\n[RESULTADO]: Pierdes $0.54 por cada unidad vendida",
  "fileRight": "cortex_precio_bimoneda.json",
  "codeRight": "{\n  \"producto\": \"Aceite Motor 1L\",\n  \"costo_reposicion_usd\": 3.20,\n  \"margen_minimo_requerido\": \"35%\",\n  \"precio_sugerido_usd\": 4.32,\n  \"tasa_oficial_dia\": 45.00,\n  \"precio_caja_bs\": 194.40,\n  \"margen_real_protegido\": \"35.0%\"\n}",
  "analysis": "TU GANANCIA SE MANTIENE INTACTA SIN IMPORTAR LA FECHA"
}
```

### Escena 05: `versus_race` (5.5s)
- **Visual Cue:** Carrera de adaptación en mostrador: Ajuste manual tienda por tienda (4 horas) vs Actualización en red (1 segundo)
- **Voz en Off:** *"Mientras otros comerciantes actualizan etiquetas a mano con una calculadora, el punto de venta ajusta los montos en un clic."*
- **Componente:** `versus_race`
- **Props Clave:**
```json
{
  "title": "VELOCIDAD DE ACTUALIZACIÓN DE PRECIOS",
  "runnerA": {
    "name": "Ajuste manual con calculadora por pasillo",
    "time": "4 horas",
    "rate": "Errores humanos frecuentes",
    "color": "#ef4444"
  },
  "runnerB": {
    "name": "Cortex Sistema Bimoneda Central",
    "time": "1 segundo",
    "rate": "Todo el catálogo sincronizado",
    "color": "#00e5a0"
  },
  "winnerDiff": "CERO VENTAS A PRECIO VIEJO DURANTE LA MAÑANA"
}
```

### Escena 06: `tradeoff_matrix` (5.6s)
- **Visual Cue:** Matriz de solidez comercial: Flujo de caja protegido y clientes conformes vs Descapitalización gradual
- **Voz en Off:** *"Facturas con total transparencia hacia tus clientes mientras mantienes blindado tu flujo de caja frente a cualquier devaluación."*
- **Componente:** `tradeoff_matrix`
- **Props Clave:**
```json
{
  "title": "SOSTENIBILIDAD DEL COMERCIO",
  "dimX": "Claridad al Cliente",
  "dimY": "Protección Financiera",
  "quadrants": [
    {
      "name": "Precios en Papelitos",
      "value": "Desconfianza del cliente / Cero auditoría",
      "color": "#ef4444"
    },
    {
      "name": "Cálculo a Ojo en Caja",
      "value": "Descuadres constantes al final del día",
      "color": "#fbbf24"
    },
    {
      "name": "Cortex Bimoneda",
      "value": "Precios legales, transparentes y margen asegurado",
      "color": "#00e5a0"
    }
  ],
  "verdict": "UN NEGOCIO QUE NO PROTEGE SU REPOSICIÓN TRABAJA PARA QUEBRAR"
}
```

### Escena 07: `cost_ticker` (5.6s)
- **Visual Cue:** Diagnóstico financiero de protección de inventarios con palabra clave MARGEN
- **Voz en Off:** *"Si tienes un comercio y quieres blindar tus márgenes de ganancia contra la brecha de tasas, comenta MARGEN y vemos tu caso."*
- **Componente:** `cost_ticker`
- **Props Clave:**
```json
{
  "title": "DIAGNÓSTICO DE PROTECCIÓN DE MÁRGENES",
  "subtitle": "EVITA LA DESCAPITALIZACIÓN DE TU INVENTARIO",
  "cloudCost": 5200,
  "initialCost": 150,
  "breakdown": [
    {
      "name": "Pérdida silenciosa por desfase de tasas",
      "cost": "$3,800/mes",
      "sub": "Ventas realizadas por debajo del costo real",
      "color": "#ef4444"
    },
    {
      "name": "Horas de personal corrigiendo etiquetas",
      "cost": "$1,400/mes",
      "sub": "Tiempo operativo perdido cada semana",
      "color": "#fbbf24"
    }
  ],
  "bareMetalCost": "BLINDAJE BIMONEDA",
  "takeaway": "ESCRIBE 'MARGEN' PARA AUDITAR TUS PRECIOS DE REPOSICIÓN"
}
```
