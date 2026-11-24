# 🎙️ Guion de Locución Sincronizado
**Título:** [24] Cinco vendedores, un WhatsApp: cómo atender sin chocar ni duplicar mensajes  
**Categoría:** FLOWBOT · EQUIPO & MULTIAGENTE (Bandeja Multiagente & Operación)  
**Duración Total:** 39.2s (7 cortes rápidos)  
**Total de Palabras:** 143 palabras (promedio: 219 WPM - ritmo óptimo)  
**Vídeo Asociado:** `nevox_24_flowbot_multiagente_cero_choques.mp4`  

---

## ⏱️ Tabla de Sincronización Fotograma a Fotograma

| Marca de Tiempo | Duración | Acción en Pantalla (Visual Cue) | Locución Exacta (Voice-Over) | Palabras / Ritmo |
| :--- | :---: | :--- | :--- | :---: |
| `00:00 - 00:05` | 5.5s | Colisión en vivo: Dos asesores respondiendo precios distintos al mismo cliente en WhatsApp | *"Tener cinco vendedores pasándose el mismo teléfono de la empresa es la receta perfecta para perder ventas y duplicar respuestas."* | 20 (3.6 pal/s) |
| `00:05 - 00:11` | 5.6s | Fuga patrimonial de contactos comerciales: 3,500 clientes que se marchan con el empleado que renuncia | *"O peor: cada vendedor usa su teléfono personal, y cuando uno renuncia se lleva toda la lista de clientes del negocio en su bolsillo."* | 24 (4.3 pal/s) |
| `00:11 - 00:16` | 5.8s | Topología centralizada: Un número de WhatsApp -> Distribuidor inteligente -> 5 puestos de trabajo sincronizados | *"La solución es una bandeja multiagente unificada: un solo número oficial de WhatsApp atendido por diez personas desde sus computadoras."* | 20 (3.4 pal/s) |
| `00:16 - 00:22` | 5.6s | Reglas de asignación: Distribución equitativa y bloqueo de chat en tiempo real con presencia de agente | *"El sistema asigna los chats de forma equitativa por turnos o especialidad, bloqueando la conversación para que nadie se cruce."* | 20 (3.6 pal/s) |
| `00:22 - 00:28` | 5.5s | Comparativa: Control ciego con teléfonos físicos vs Panel de auditoría en vivo con métricas de servicio | *"El dueño del negocio supervisa en vivo tiempos de respuesta, mensajes enviados y el historial completo sin pedir permisos."* | 19 (3.5 pal/s) |
| `00:28 - 00:33` | 5.6s | Matriz de seguridad patrimonial: Propiedad total de la base de datos vs Dependencia de dispositivos personales | *"Tus datos y tus conversaciones quedan guardados en los servidores de tu empresa, no en la memoria de un teléfono ajeno."* | 21 (3.8 pal/s) |
| `00:33 - 00:39` | 5.6s | Diagnóstico de organización de equipos y canales con palabra clave BANDEJA | *"Si quieres profesionalizar la atención de tu equipo en un solo WhatsApp seguro, comenta BANDEJA y agendamos una demo."* | 19 (3.4 pal/s) |

---

## 📜 Texto Completo para Teleprompter / Locutor (Copiar y Pegar)

Tener cinco vendedores pasándose el mismo teléfono de la empresa es la receta perfecta para perder ventas y duplicar respuestas.

O peor: cada vendedor usa su teléfono personal, y cuando uno renuncia se lleva toda la lista de clientes del negocio en su bolsillo.

La solución es una bandeja multiagente unificada: un solo número oficial de WhatsApp atendido por diez personas desde sus computadoras.

El sistema asigna los chats de forma equitativa por turnos o especialidad, bloqueando la conversación para que nadie se cruce.

El dueño del negocio supervisa en vivo tiempos de respuesta, mensajes enviados y el historial completo sin pedir permisos.

Tus datos y tus conversaciones quedan guardados en los servidores de tu empresa, no en la memoria de un teléfono ajeno.

Si quieres profesionalizar la atención de tu equipo en un solo WhatsApp seguro, comenta BANDEJA y agendamos una demo.

---

## ⚙️ Desglose Mecánico Escena por Escena (7 Cortes Rápidos)

### Escena 01: `disaster_monitor` (5.5s)
- **Visual Cue:** Colisión en vivo: Dos asesores respondiendo precios distintos al mismo cliente en WhatsApp
- **Voz en Off:** *"Tener cinco vendedores pasándose el mismo teléfono de la empresa es la receta perfecta para perder ventas y duplicar respuestas."*
- **Componente:** `disaster_monitor`
- **Props Clave:**
```json
{
  "title": "COLISIÓN OPERATIVA EN EL MISMO TELÉFONO",
  "subtitle": "DESORGANIZACIÓN FRENTE AL CLIENTE",
  "crashedStatus": "RESPUESTAS CONTRADICTORIAS ENVIADAS AL MISMO TIEMPO",
  "latencyNormal": 1,
  "latencyCrash": 120,
  "logs": [
    {
      "time": "15:30",
      "level": "WARN",
      "text": "Vendedor A escribe: 'El producto cuesta $45'",
      "color": "#fbbf24"
    },
    {
      "time": "15:31",
      "level": "CRIT",
      "text": "Vendedor B toma el teléfono y dice: 'Cuesta $55'",
      "color": "#ef4444"
    },
    {
      "time": "15:32",
      "level": "FATAL",
      "text": "Cliente: '¿Con quién estoy hablando? Me parece sospechoso'",
      "color": "#ef4444"
    }
  ],
  "impactMetric": "DESCONFIANZA",
  "impactSub": "Pérdida inmediata de imagen profesional"
}
```

### Escena 02: `latency_scale` (5.6s)
- **Visual Cue:** Fuga patrimonial de contactos comerciales: 3,500 clientes que se marchan con el empleado que renuncia
- **Voz en Off:** *"O peor: cada vendedor usa su teléfono personal, y cuando uno renuncia se lleva toda la lista de clientes del negocio en su bolsillo."*
- **Componente:** `latency_scale`
- **Props Clave:**
```json
{
  "title": "FUGA DE ACTIVOS COMERCIALES",
  "subtitle": "BASE DE DATOS EN TELÉFONOS PRIVADOS",
  "markers": [
    {
      "label": "Mes 1-12: El vendedor crea relaciones desde su WhatsApp",
      "latency": 360,
      "color": "#fbbf24",
      "note": "La empresa no tiene copia de las conversaciones"
    },
    {
      "label": "Renuncia: El empleado borra el acceso de la laptop",
      "latency": 1,
      "color": "#ef4444",
      "note": "Los contactos quedan en su celular personal"
    },
    {
      "label": "Impacto: Abre negocio propio o va a la competencia",
      "latency": 30,
      "color": "#ef4444",
      "note": "Pérdida irreparable de cartera de clientes"
    }
  ],
  "takeaway": "EL HISTORIAL DE CONVERSACIONES DEBE SER PROPIEDAD DE TU EMPRESA"
}
```

### Escena 03: `architecture_flow` (5.8s)
- **Visual Cue:** Topología centralizada: Un número de WhatsApp -> Distribuidor inteligente -> 5 puestos de trabajo sincronizados
- **Voz en Off:** *"La solución es una bandeja multiagente unificada: un solo número oficial de WhatsApp atendido por diez personas desde sus computadoras."*
- **Componente:** `architecture_flow`
- **Props Clave:**
```json
{
  "title": "BANDEJA CENTRALIZADA MULTIAGENTE",
  "subtitle": "UN SOLO NÚMERO EMPRESARIAL PARA TODO EL EQUIPO",
  "nodes": [
    {
      "id": "line",
      "label": "Línea Oficial",
      "sub": "WhatsApp verificado",
      "status": "ONLINE",
      "color": "#00e5a0"
    },
    {
      "id": "hub",
      "label": "Distribuidor Central",
      "sub": "Control de colas y roles",
      "status": "CORE",
      "color": "#38bdf8"
    },
    {
      "id": "ag1",
      "label": "Puesto 1 (Ventas)",
      "sub": "Asesor asignado",
      "status": "BUSY",
      "color": "#00e5a0"
    },
    {
      "id": "ag2",
      "label": "Puesto 2 (Soporte)",
      "sub": "Asesor asignado",
      "status": "READY",
      "color": "#00e5a0"
    }
  ],
  "pipelineStats": "100% VISIBILIDAD DE CHATS · BLOQUEO ANTI-COLISIONES"
}
```

### Escena 04: `terminal_split` (5.6s)
- **Visual Cue:** Reglas de asignación: Distribución equitativa y bloqueo de chat en tiempo real con presencia de agente
- **Voz en Off:** *"El sistema asigna los chats de forma equitativa por turnos o especialidad, bloqueando la conversación para que nadie se cruce."*
- **Componente:** `terminal_split`
- **Props Clave:**
```json
{
  "title": "ASIGNACIÓN Y BLOQUEO EN TIEMPO REAL",
  "fileLeft": "regla_asignacion.json",
  "codeLeft": "{\n  \"estrategia\": \"round_robin\",\n  \"departamento\": \"ventas_corporativas\",\n  \"agente_activo\": \"Elena Gómez\",\n  \"estado_chat\": \"bloqueado_para_otros\",\n  \"motivo\": \"Elena está respondiendo en este momento\"\n}",
  "fileRight": "interfaz_asesor.log",
  "codeRight": "[14:22] Elena entró al chat con Cliente #8812\n[14:22] Candado visual activado para 4 asesores\n[14:23] Vendedor Carlos ve advertencia: 'Elena atendiendo'\n[14:24] 0 respuestas duplicadas registradas",
  "analysis": "CERO INTERFERENCIAS ENTRE MIEMBROS DEL EQUIPO"
}
```

### Escena 05: `versus_race` (5.5s)
- **Visual Cue:** Comparativa: Control ciego con teléfonos físicos vs Panel de auditoría en vivo con métricas de servicio
- **Voz en Off:** *"El dueño del negocio supervisa en vivo tiempos de respuesta, mensajes enviados y el historial completo sin pedir permisos."*
- **Componente:** `versus_race`
- **Props Clave:**
```json
{
  "title": "SUPERVISIÓN DIRECTA DEL DUEÑO",
  "runnerA": {
    "name": "Teléfonos físicos individuales",
    "time": "0% control",
    "rate": "Cajas negras sin auditoría",
    "color": "#ef4444"
  },
  "runnerB": {
    "name": "Bandeja FlowBot Centralizada",
    "time": "100% control",
    "rate": "Métricas y chats en tiempo real",
    "color": "#00e5a0"
  },
  "winnerDiff": "AUDITORÍA COMPLETA DE CADA MENSAJE ENVIADO"
}
```

### Escena 06: `tradeoff_matrix` (5.6s)
- **Visual Cue:** Matriz de seguridad patrimonial: Propiedad total de la base de datos vs Dependencia de dispositivos personales
- **Voz en Off:** *"Tus datos y tus conversaciones quedan guardados en los servidores de tu empresa, no en la memoria de un teléfono ajeno."*
- **Componente:** `tradeoff_matrix`
- **Props Clave:**
```json
{
  "title": "SEGURIDAD DE LA INFORMACIÓN COMERCIAL",
  "dimX": "Propiedad de Datos",
  "dimY": "Continuidad del Negocio",
  "quadrants": [
    {
      "name": "WhatsApp en Celulares de Empleados",
      "value": "Datos en riesgo / Cero continuidad si renuncian",
      "color": "#ef4444"
    },
    {
      "name": "WhatsApp Business Web Básico",
      "value": "Límite de 4 sesiones / Se desconecta a cada rato",
      "color": "#fbbf24"
    },
    {
      "name": "FlowBot Multiagente Cloud",
      "value": "Base de datos propia en servidor seguro",
      "color": "#00e5a0"
    }
  ],
  "verdict": "TU CLIENTE LE COMPRA A TU EMPRESA, NO AL CELULAR DE UN ASESOR"
}
```

### Escena 07: `cost_ticker` (5.6s)
- **Visual Cue:** Diagnóstico de organización de equipos y canales con palabra clave BANDEJA
- **Voz en Off:** *"Si quieres profesionalizar la atención de tu equipo en un solo WhatsApp seguro, comenta BANDEJA y agendamos una demo."*
- **Componente:** `cost_ticker`
- **Props Clave:**
```json
{
  "title": "DIAGNÓSTICO DE ATENCIÓN MULTIAGENTE",
  "subtitle": "UNIFICA LA COMUNICACIÓN DE TU EMPRESA",
  "cloudCost": 3500,
  "initialCost": 150,
  "breakdown": [
    {
      "name": "Pérdida por clientes duplicados o mal atendidos",
      "cost": "$2,100/mes",
      "sub": "Errores de comunicación en mostrador",
      "color": "#ef4444"
    },
    {
      "name": "Fuga de clientes por rotación de asesores",
      "cost": "$1,400/mes",
      "sub": "Cartera llevada por exempleados",
      "color": "#fbbf24"
    }
  ],
  "bareMetalCost": "BANDEJA CENTRALIZADA",
  "takeaway": "ESCRIBE 'BANDEJA' PARA PROBAR LA PLATAFORMA MULTIAGENTE"
}
```
