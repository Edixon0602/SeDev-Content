# 🎙️ Guion de Locución Sincronizado
**Título:** [27] Cobranza mixta en caja: efectivo, divisas y vuelto digital sin descuadres  
**Categoría:** CORTEX · MULTI-MONEDA & CAJA (Punto de Venta & Cobranza Mixta)  
**Duración Total:** 39.2s (7 cortes rápidos)  
**Total de Palabras:** 151 palabras (promedio: 231 WPM - ritmo óptimo)  
**Vídeo Asociado:** `nevox_27_cortex_pos_pagos_mixtos_vuelto.mp4`  

---

## ⏱️ Tabla de Sincronización Fotograma a Fotograma

| Marca de Tiempo | Duración | Acción en Pantalla (Visual Cue) | Locución Exacta (Voice-Over) | Palabras / Ritmo |
| :--- | :---: | :--- | :--- | :---: |
| `00:00 - 00:05` | 5.5s | Simulación en caja: Transacción fragmentada en 3 métodos de pago simultáneos con cambio en moneda local | *"El cliente te paga con un billete de diez dólares en efectivo, pasa una tarjeta y te pide el vuelto por pago móvil."* | 23 (4.2 pal/s) |
| `00:05 - 00:11` | 5.6s | Descuadre nocturno: Tres cajeros contando billetes y recibos durante 2 horas tras bajar la santamaría | *"El cajero saca la calculadora del teléfono, se equivoca en la conversión y al cierre de la noche faltan quince dólares en la caja."* | 24 (4.3 pal/s) |
| `00:11 - 00:16` | 5.8s | Pantalla partida de cobranza multi-moneda: Desglose claro de divisas en efectivo, transferencias y vuelto exacto | *"Un punto de venta moderno resuelve esto en una sola pantalla: registra cada método de pago y calcula el vuelto exacto al instante."* | 23 (4.0 pal/s) |
| `00:16 - 00:22` | 5.6s | Asiento contable automático: Auditoría por método de pago con arqueo en tiempo real | *"Cada centavo queda asentado con la tasa exacta de ese minuto, auditando el origen de los fondos y emitiendo el comprobante."* | 21 (3.8 pal/s) |
| `00:22 - 00:28` | 5.5s | Velocidad de despacho en cola: De 240 segundos de espera por cliente a 35 segundos | *"La fila en caja pasa de demorarse cuatro minutos por cliente a menos de cuarenta segundos sin fricción."* | 18 (3.3 pal/s) |
| `00:28 - 00:33` | 5.6s | Arqueo de caja instantáneo: Conciliación en 30 segundos con cero faltantes por monedas | *"Al final del día el cierre de caja es automático: sabes exactamente cuánto hay en efectivo, cuánto en banco y cuánto en digital."* | 23 (4.1 pal/s) |
| `00:33 - 00:39` | 5.6s | Diagnóstico operativo de cobranza y arqueo con palabra clave CAJA | *"Si tus cajeros sufren con los pagos combinados y los vueltos complicados, comenta CAJA y te mostramos la solución."* | 19 (3.4 pal/s) |

---

## 📜 Texto Completo para Teleprompter / Locutor (Copiar y Pegar)

El cliente te paga con un billete de diez dólares en efectivo, pasa una tarjeta y te pide el vuelto por pago móvil.

El cajero saca la calculadora del teléfono, se equivoca en la conversión y al cierre de la noche faltan quince dólares en la caja.

Un punto de venta moderno resuelve esto en una sola pantalla: registra cada método de pago y calcula el vuelto exacto al instante.

Cada centavo queda asentado con la tasa exacta de ese minuto, auditando el origen de los fondos y emitiendo el comprobante.

La fila en caja pasa de demorarse cuatro minutos por cliente a menos de cuarenta segundos sin fricción.

Al final del día el cierre de caja es automático: sabes exactamente cuánto hay en efectivo, cuánto en banco y cuánto en digital.

Si tus cajeros sufren con los pagos combinados y los vueltos complicados, comenta CAJA y te mostramos la solución.

---

## ⚙️ Desglose Mecánico Escena por Escena (7 Cortes Rápidos)

### Escena 01: `versus_race` (5.5s)
- **Visual Cue:** Simulación en caja: Transacción fragmentada en 3 métodos de pago simultáneos con cambio en moneda local
- **Voz en Off:** *"El cliente te paga con un billete de diez dólares en efectivo, pasa una tarjeta y te pide el vuelto por pago móvil."*
- **Componente:** `versus_race`
- **Props Clave:**
```json
{
  "title": "LA REALIDAD DEL PUNTO DE VENTA ACTUAL",
  "runnerA": {
    "name": "Pago Mixto Combinado",
    "time": "$10 USD Efectivo + Débito Tarjeta",
    "rate": "Vuelto solicitado en Pago Móvil",
    "color": "#fbbf24"
  },
  "runnerB": {
    "name": "Sistema Tradicional de Caja",
    "time": "BLOQUEADO",
    "rate": "No permite registrar vueltos cruzados",
    "color": "#ef4444"
  },
  "winnerDiff": "EL 65% DE LAS VENTAS EN MOSTRADOR SON COMBINADAS"
}
```

### Escena 02: `disaster_monitor` (5.6s)
- **Visual Cue:** Descuadre nocturno: Tres cajeros contando billetes y recibos durante 2 horas tras bajar la santamaría
- **Voz en Off:** *"El cajero saca la calculadora del teléfono, se equivoca en la conversión y al cierre de la noche faltan quince dólares en la caja."*
- **Componente:** `disaster_monitor`
- **Props Clave:**
```json
{
  "title": "DESCUADRE CRÓNICO DE CIERRE DE CAJA",
  "subtitle": "PÉRDIDA DE HORAS Y FALTANTES INEXPLICABLES",
  "crashedStatus": "ARQUEO FALLIDO: FALTANTE DE DINERO AL CERRAR TURNO",
  "latencyNormal": 15,
  "latencyCrash": 120,
  "logs": [
    {
      "time": "20:00",
      "level": "WARN",
      "text": "Inicio de arqueo manual en 3 cajas registradoras",
      "color": "#fbbf24"
    },
    {
      "time": "20:45",
      "level": "CRIT",
      "text": "Caja 2 presenta diferencia de -$15.40 USD en conversiones",
      "color": "#ef4444"
    },
    {
      "time": "21:30",
      "level": "FATAL",
      "text": "Comprobantes físicos no coinciden con libro de banco",
      "color": "#ef4444"
    }
  ],
  "impactMetric": "$350/MES",
  "impactSub": "Pérdidas acumuladas por errores de redondeo y vueltos mal dados"
}
```

### Escena 03: `architecture_flow` (5.8s)
- **Visual Cue:** Pantalla partida de cobranza multi-moneda: Desglose claro de divisas en efectivo, transferencias y vuelto exacto
- **Voz en Off:** *"Un punto de venta moderno resuelve esto en una sola pantalla: registra cada método de pago y calcula el vuelto exacto al instante."*
- **Componente:** `architecture_flow`
- **Props Clave:**
```json
{
  "title": "COBRANZA MULTI-MONEDA INTEGRADA",
  "subtitle": "CONCILIACIÓN MATEMÁTICA EN LA MISMA FACTURA",
  "nodes": [
    {
      "id": "cart",
      "label": "Total Venta",
      "sub": "$28.50 USD (o equivalente)",
      "status": "TOTAL",
      "color": "#38bdf8"
    },
    {
      "id": "m1",
      "label": "Efectivo USD",
      "sub": "Recibido $20.00 billlete",
      "status": "CASH",
      "color": "#00e5a0"
    },
    {
      "id": "m2",
      "label": "Punto de Venta",
      "sub": "Tarjeta cobrada en moneda local",
      "status": "CARD",
      "color": "#00e5a0"
    },
    {
      "id": "change",
      "label": "Vuelto Digital",
      "sub": "Pago Móvil calculado al centavo",
      "status": "EXACT",
      "color": "#fbbf24"
    }
  ],
  "pipelineStats": "SALDO FINAL: $0.00 DIFERENCIA · CERO ERRORES"
}
```

### Escena 04: `terminal_split` (5.6s)
- **Visual Cue:** Asiento contable automático: Auditoría por método de pago con arqueo en tiempo real
- **Voz en Off:** *"Cada centavo queda asentado con la tasa exacta de ese minuto, auditando el origen de los fondos y emitiendo el comprobante."*
- **Componente:** `terminal_split`
- **Props Clave:**
```json
{
  "title": "AUDITORÍA DEL TICKET EN VIVO",
  "fileLeft": "recibo_manual_papel.txt",
  "codeLeft": "Ticket #412\nTotal: 1,280 Bs\nCliente dio $20 billete arrugado\nSe dio vuelto por pago móvil 380 Bs\n[Nota cajero]: Revisar si la tasa era la de la mañana",
  "fileRight": "cortex_ticket_auditado.json",
  "codeRight": "{\n  \"ticket_id\": \"POS-9921\",\n  \"total_usd\": 28.50,\n  \"tasa_aplicada\": 45.10,\n  \"pagos\": [\n    { \"metodo\": \"efectivo_usd\", \"monto\": 20.00 },\n    { \"metodo\": \"tarjeta_debito\", \"monto_bs\": 383.35, \"usd_eq\": 8.50 }\n  ],\n  \"vuelto_entregado\": 0.00,\n  \"balance\": \"CUADRADO_EXACTO\"\n}",
  "analysis": "TRAZABILIDAD TOTAL DE CADA MOVIMIENTO EN CAJA"
}
```

### Escena 05: `latency_scale` (5.5s)
- **Visual Cue:** Velocidad de despacho en cola: De 240 segundos de espera por cliente a 35 segundos
- **Voz en Off:** *"La fila en caja pasa de demorarse cuatro minutos por cliente a menos de cuarenta segundos sin fricción."*
- **Componente:** `latency_scale`
- **Props Clave:**
```json
{
  "title": "TIEMPO DE ESPERA EN MOSTRADOR",
  "subtitle": "ATENCIÓN ÁGIL QUE MULTIPLICA LAS VENTAS",
  "markers": [
    {
      "label": "Cálculo manual con teléfono",
      "latency": 240,
      "color": "#ef4444",
      "note": "Fila larga, clientes abandonan compras"
    },
    {
      "label": "Punto de venta clásico desactualizado",
      "latency": 150,
      "color": "#fbbf24",
      "note": "Demoras al cambiar de pantalla"
    },
    {
      "label": "Cortex POS Multi-Moneda",
      "latency": 35,
      "color": "#00e5a0",
      "note": "Cobro fluido y salida inmediata"
    }
  ],
  "takeaway": "REDUCES LA COLA EN UN 85% EN HORAS PICO"
}
```

### Escena 06: `tradeoff_matrix` (5.6s)
- **Visual Cue:** Arqueo de caja instantáneo: Conciliación en 30 segundos con cero faltantes por monedas
- **Voz en Off:** *"Al final del día el cierre de caja es automático: sabes exactamente cuánto hay en efectivo, cuánto en banco y cuánto en digital."*
- **Componente:** `tradeoff_matrix`
- **Props Clave:**
```json
{
  "title": "CONCILIACIÓN AL CIERRE DE TURNO",
  "dimX": "Tiempo de Arqueo",
  "dimY": "Precisión de Fondos",
  "quadrants": [
    {
      "name": "Cierre Manual en Papel",
      "value": "2 horas de conteo / Errores casi seguros",
      "color": "#ef4444"
    },
    {
      "name": "Software No Adaptado",
      "value": "Todo mezclado en una sola cuenta ficticia",
      "color": "#fbbf24"
    },
    {
      "name": "Cortex POS",
      "value": "Cierre en 30 segundos desglosado por cada moneda",
      "color": "#00e5a0"
    }
  ],
  "verdict": "TUS CAJEROS ENTREGAN CUENTAS CLARAS SIN ESTRÉS"
}
```

### Escena 07: `cost_ticker` (5.6s)
- **Visual Cue:** Diagnóstico operativo de cobranza y arqueo con palabra clave CAJA
- **Voz en Off:** *"Si tus cajeros sufren con los pagos combinados y los vueltos complicados, comenta CAJA y te mostramos la solución."*
- **Componente:** `cost_ticker`
- **Props Clave:**
```json
{
  "title": "DIAGNÓSTICO DE COBRANZA EN CAJA",
  "subtitle": "ELIMINA LOS DESCUADRES DE DINERO EN TU NEGOCIO",
  "cloudCost": 2200,
  "initialCost": 80,
  "breakdown": [
    {
      "name": "Pérdidas mensuales por redondeos y descuadres",
      "cost": "$1,200/mes",
      "sub": "Diferencias acumuladas no recuperadas",
      "color": "#ef4444"
    },
    {
      "name": "Horas extras de personal cerrando caja",
      "cost": "$1,000/mes",
      "sub": "Tiempo perdido después del cierre de tienda",
      "color": "#fbbf24"
    }
  ],
  "bareMetalCost": "POS MULTI-MONEDA",
  "takeaway": "ESCRIBE 'CAJA' PARA VER EL PUNTO DE VENTA EN ACCIÓN"
}
```
