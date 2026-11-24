# 🎙️ Guion de Locución Sincronizado
**Título:** [21] El cementerio de leads: por qué tardar 4 horas en WhatsApp mata tus ventas  
**Categoría:** FLOWBOT · INTAKE & CONVERSIÓN (Fuga de Prospectos & Velocidad de Respuesta)  
**Duración Total:** 39.2s (7 cortes rápidos)  
**Total de Palabras:** 147 palabras (promedio: 225 WPM - ritmo óptimo)  
**Vídeo Asociado:** `nevox_21_flowbot_cementerio_leads.mp4`  

---

## ⏱️ Tabla de Sincronización Fotograma a Fotograma

| Marca de Tiempo | Duración | Acción en Pantalla (Visual Cue) | Locución Exacta (Voice-Over) | Palabras / Ritmo |
| :--- | :---: | :--- | :--- | :---: |
| `00:00 - 00:05` | 5.5s | Escala de conversión cayendo abruptamente: 391% a los 5 minutos vs 0.8% a las 4 horas | *"Si pagas anuncios para llevar prospectos a WhatsApp y tardas cuatro horas en responder, estás tirando tu presupuesto a la basura."* | 21 (3.8 pal/s) |
| `00:05 - 00:11` | 5.6s | Monitor de abandono de lead: timeline de enfriamiento y compra en negocio rival | *"El cliente escribe con la tarjeta en la mano, no recibe respuesta inmediata y a los diez minutos ya le compró a tu competencia."* | 24 (4.3 pal/s) |
| `00:11 - 00:16` | 5.6s | Diagrama de flujo reactivo: Mensaje entrante -> Motor en la nube (<80ms) -> Calificador automático | *"Un motor con conexión oficial a WhatsApp intercepta el mensaje entrante en menos de dos segundos y valida la intención de compra."* | 22 (3.9 pal/s) |
| `00:16 - 00:22` | 5.8s | Cirugía de código: Menú rígido de botones rotos vs Motor conversacional guiado | *"Sin formularios aburridos ni bots torpes: tres preguntas clave en lenguaje natural que filtran a los curiosos de los compradores reales."* | 21 (3.6 pal/s) |
| `00:22 - 00:28` | 5.5s | Carrera de velocidad: Atención manual (14,400s) vs Motor automatizado (18s) | *"Mientras un operador manual tarda doscientos minutos en contestar, el sistema califica y agenda la cita en dieciocho segundos."* | 19 (3.5 pal/s) |
| `00:28 - 00:33` | 5.6s | Matriz de optimización de tiempo: 85% filtrando spam manual vs 85% cerrando ventas calientes | *"Tus vendedores reciben prospectos listos para pagar con presupuesto validado en lugar de perder el día saludando desconocidos."* | 18 (3.2 pal/s) |
| `00:33 - 00:39` | 5.6s | Diagnóstico de fugas operativas en WhatsApp con palabra clave FLOW | *"Si sientes que tu equipo pierde ventas en WhatsApp por responder tarde, comenta FLOW y te muestro el flujo exacto que usamos."* | 22 (3.9 pal/s) |

---

## 📜 Texto Completo para Teleprompter / Locutor (Copiar y Pegar)

Si pagas anuncios para llevar prospectos a WhatsApp y tardas cuatro horas en responder, estás tirando tu presupuesto a la basura.

El cliente escribe con la tarjeta en la mano, no recibe respuesta inmediata y a los diez minutos ya le compró a tu competencia.

Un motor con conexión oficial a WhatsApp intercepta el mensaje entrante en menos de dos segundos y valida la intención de compra.

Sin formularios aburridos ni bots torpes: tres preguntas clave en lenguaje natural que filtran a los curiosos de los compradores reales.

Mientras un operador manual tarda doscientos minutos en contestar, el sistema califica y agenda la cita en dieciocho segundos.

Tus vendedores reciben prospectos listos para pagar con presupuesto validado en lugar de perder el día saludando desconocidos.

Si sientes que tu equipo pierde ventas en WhatsApp por responder tarde, comenta FLOW y te muestro el flujo exacto que usamos.

---

## ⚙️ Desglose Mecánico Escena por Escena (7 Cortes Rápidos)

### Escena 01: `latency_scale` (5.5s)
- **Visual Cue:** Escala de conversión cayendo abruptamente: 391% a los 5 minutos vs 0.8% a las 4 horas
- **Voz en Off:** *"Si pagas anuncios para llevar prospectos a WhatsApp y tardas cuatro horas en responder, estás tirando tu presupuesto a la basura."*
- **Componente:** `latency_scale`
- **Props Clave:**
```json
{
  "title": "EROSIÓN DE CONVERSIÓN EN WHATSAPP",
  "subtitle": "PROBABILIDAD DE CIERRE SEGÚN TIEMPO DE RESPUESTA",
  "markers": [
    {
      "label": "< 5 minutos (Intake Automático)",
      "latency": 5,
      "color": "#00e5a0",
      "note": "+391% probabilidad de cierre"
    },
    {
      "label": "30 minutos (Demora Promedio)",
      "latency": 30,
      "color": "#fbbf24",
      "note": "-62% interés del comprador"
    },
    {
      "label": "4 horas (Atención Manual Tradicional)",
      "latency": 240,
      "color": "#ef4444",
      "note": "Prospecto comprado por la competencia"
    }
  ],
  "takeaway": "EL 78% DE LOS CLIENTES COMPRA AL PRIMERO QUE RESPONDE"
}
```

### Escena 02: `disaster_monitor` (5.6s)
- **Visual Cue:** Monitor de abandono de lead: timeline de enfriamiento y compra en negocio rival
- **Voz en Off:** *"El cliente escribe con la tarjeta en la mano, no recibe respuesta inmediata y a los diez minutos ya le compró a tu competencia."*
- **Componente:** `disaster_monitor`
- **Props Clave:**
```json
{
  "title": "ENFRIAMIENTO CRÍTICO DE PROSPECTOS",
  "subtitle": "VENTA PERDIDA POR LATENCIA OPERATIVA",
  "crashedStatus": "LEAD ABANDONADO · COMPRA COMPLETADA EN OTRO PROVEEDOR",
  "latencyNormal": 18,
  "latencyCrash": 14400,
  "logs": [
    {
      "time": "10:02",
      "level": "INFO",
      "text": "Prospecto escribe solicitando precio y entrega inmediata",
      "color": "#38bdf8"
    },
    {
      "time": "10:14",
      "level": "WARN",
      "text": "Sin respuesta del asesor asignado (12 min en espera)",
      "color": "#fbbf24"
    },
    {
      "time": "10:25",
      "level": "CRIT",
      "text": "Prospecto abre chat con competidor y concreta pago",
      "color": "#ef4444"
    },
    {
      "time": "14:10",
      "level": "ERR",
      "text": "Asesor manual responde: '¡Hola feliz tarde!' (Lead frío)",
      "color": "#71717a"
    }
  ],
  "impactMetric": "$1,850 USD",
  "impactSub": "Pérdida semanal en prospectos que no esperaron"
}
```

### Escena 03: `architecture_flow` (5.6s)
- **Visual Cue:** Diagrama de flujo reactivo: Mensaje entrante -> Motor en la nube (<80ms) -> Calificador automático
- **Voz en Off:** *"Un motor con conexión oficial a WhatsApp intercepta el mensaje entrante en menos de dos segundos y valida la intención de compra."*
- **Componente:** `architecture_flow`
- **Props Clave:**
```json
{
  "title": "MOTOR DE INTAKE OFICIAL EN LA NUBE",
  "subtitle": "ARQUITECTURA REACTIVA DE ATENCIÓN INMEDIATA",
  "nodes": [
    {
      "id": "msg",
      "label": "Mensaje WhatsApp",
      "sub": "Cliente entrante",
      "status": "OK",
      "color": "#38bdf8"
    },
    {
      "id": "gateway",
      "label": "Conexión Oficial",
      "sub": "Webhook seguro <80ms",
      "status": "FAST",
      "color": "#00e5a0"
    },
    {
      "id": "engine",
      "label": "Motor de IA",
      "sub": "Detección de intención",
      "status": "ACTIVE",
      "color": "#00e5a0"
    },
    {
      "id": "crm",
      "label": "Ficha en CRM",
      "sub": "Lead calificado + Cita",
      "status": "READY",
      "color": "#fbbf24"
    }
  ],
  "pipelineStats": "TIEMPO DE RESPUESTA: 1.8 SEGUNDOS · CERO ESPERAS"
}
```

### Escena 04: `terminal_split` (5.8s)
- **Visual Cue:** Cirugía de código: Menú rígido de botones rotos vs Motor conversacional guiado
- **Voz en Off:** *"Sin formularios aburridos ni bots torpes: tres preguntas clave en lenguaje natural que filtran a los curiosos de los compradores reales."*
- **Componente:** `terminal_split`
- **Props Clave:**
```json
{
  "title": "CALIFICACIÓN CONVERSACIONAL INTELIGENTE",
  "fileLeft": "bot_antiguo_arbol.txt",
  "codeLeft": "1. Presione 1 para Ventas\n2. Presione 2 para Horarios\n3. Presione 3 para Dirección\n> Cliente: 'Hola, tienen stock inmediato del modelo pro?'\n> Bot: 'Opción no válida. Ingrese un número.'\n[Cliente abandona chat frustrado]",
  "fileRight": "flowbot_intake_ia.json",
  "codeRight": "{\n  \"intencion\": \"compra_inmediata\",\n  \"producto_solicitado\": \"Modelo Pro\",\n  \"stock_disponible\": true,\n  \"presupuesto_validado\": true,\n  \"accion\": \"transferir_asesor_prioritario\"\n}",
  "analysis": "EXTRACCIÓN DE INTENCIÓN REAL EN ESPAÑOL DIRECTO"
}
```

### Escena 05: `versus_race` (5.5s)
- **Visual Cue:** Carrera de velocidad: Atención manual (14,400s) vs Motor automatizado (18s)
- **Voz en Off:** *"Mientras un operador manual tarda doscientos minutos en contestar, el sistema califica y agenda la cita en dieciocho segundos."*
- **Componente:** `versus_race`
- **Props Clave:**
```json
{
  "title": "VELOCIDAD DE CAPTACIÓN: MANUAL VS MOTOR IA",
  "runnerA": {
    "name": "Respuesta Manual con Teléfono",
    "time": "14,400s",
    "rate": "240 min promedio",
    "color": "#ef4444"
  },
  "runnerB": {
    "name": "FlowBot Motor Oficial",
    "time": "18s",
    "rate": "Calificado y agendado",
    "color": "#00e5a0"
  },
  "winnerDiff": "800x MÁS RÁPIDO · CONVERSIÓN RETENIDA AL 100%"
}
```

### Escena 06: `tradeoff_matrix` (5.6s)
- **Visual Cue:** Matriz de optimización de tiempo: 85% filtrando spam manual vs 85% cerrando ventas calientes
- **Voz en Off:** *"Tus vendedores reciben prospectos listos para pagar con presupuesto validado en lugar de perder el día saludando desconocidos."*
- **Componente:** `tradeoff_matrix`
- **Props Clave:**
```json
{
  "title": "ENFOQUE DEL EQUIPO COMERCIAL",
  "dimX": "Tiempo en Operación",
  "dimY": "Tasa de Cierre",
  "quadrants": [
    {
      "name": "Chat Manual Desordenado",
      "value": "85% tiempo en saludar curiosos / 5% cierres",
      "color": "#ef4444"
    },
    {
      "name": "Bot Rígido de Opciones",
      "value": "Menú molesto / 70% abandono de leads",
      "color": "#fbbf24"
    },
    {
      "name": "FlowBot Calificado",
      "value": "85% tiempo cerrando clientes listos / 38% cierres",
      "color": "#00e5a0"
    }
  ],
  "verdict": "TUS VENDEDORES PASAN A HABLAR ÚNICAMENTE CON QUIEN PUEDE PAGAR"
}
```

### Escena 07: `cost_ticker` (5.6s)
- **Visual Cue:** Diagnóstico de fugas operativas en WhatsApp con palabra clave FLOW
- **Voz en Off:** *"Si sientes que tu equipo pierde ventas en WhatsApp por responder tarde, comenta FLOW y te muestro el flujo exacto que usamos."*
- **Componente:** `cost_ticker`
- **Props Clave:**
```json
{
  "title": "DIAGNÓSTICO DE VELOCIDAD DE VENTAS",
  "subtitle": "RECUPERA EL 40% DE PROSPECTOS PERDIDOS",
  "cloudCost": 2800,
  "initialCost": 120,
  "breakdown": [
    {
      "name": "Leads perdidos por demoras de 4h+",
      "cost": "$1,850/mes",
      "sub": "Clientes que compraron en la competencia",
      "color": "#ef4444"
    },
    {
      "name": "Horas de asesores saludando spam",
      "cost": "$950/mes",
      "sub": "Salarios consumidos en tareas no productivas",
      "color": "#fbbf24"
    }
  ],
  "bareMetalCost": "INSTALACIÓN DIRECTA",
  "takeaway": "ESCRIBE 'FLOW' PARA AUDITAR TU INTAKE DE WHATSAPP"
}
```
