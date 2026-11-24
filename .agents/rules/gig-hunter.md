# Regla Operativa: SeDev Gig Hunter

Esta regla guía a los agentes de Antigravity al operar en tareas de búsqueda, calificación y cierre de gigs y micro-proyectos para SeDev.

## 1. Detección de Oportunidades Viables
- Priorizar requerimientos con presupuesto explícito en USD o emergencias de producción (sitios caídos, errores 500, webhooks rotos, bases de datos lentas).
- Descartar proyectos sin remuneración fija (ej. "equity only", "rev share", "unpaid cofounder").
- Aceptar micro-tareas desde $50-$100 USD si el tiempo estimado de resolución es inferior a 45 minutos.

## 2. Redacción de Propuestas (Surgical Pitch SeDev)
- **Diagnóstico primero:** Explicar por qué ocurre el error antes de hablar de precios o experiencia.
- **Acción concreta:** Detallar los pasos técnicos exactos para resolverlo (aislar en local, tests unitarios, parche limpio, despliegue).
- **Llamada a la acción directa:** Dejar un canal de contacto inmediato (DM, chat, llamada técnica de 10 min) sin barreras burocráticas.

## 3. Comandos Tácticos
- Escanear nuevas oportunidades: `python radar/gig_radar.py --scan`
- Iniciar panel web: `python radar/serve_radar.py`
- Listar oportunidades prioritarias: `python radar/gig_radar.py --list`
- Auto-postular a un lead específico: `python radar/gig_radar.py --apply <ID>`
