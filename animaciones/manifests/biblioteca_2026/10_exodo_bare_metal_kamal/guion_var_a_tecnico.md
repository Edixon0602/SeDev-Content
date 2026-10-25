# Guion de Grabación: Kamal en Producción: Despliegue Zero-Downtime sin Kubernetes
> **Tema #10:** 10_exodo_bare_metal_kamal  
> **Variación A (TÉCNICO / ARQUITECTURA)**  
> **Categoría:** INFRAESTRUCTURA & CLOUD COSTS  
> **Tono:** Ingeniería práctica de operaciones, simplicidad en servidores dedicados  
> **Duración total:** 22.0s | **Palabras:** 96 palabras (~262 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:04.5]` (4.5s) | `kinetic_hook` | Gancho cinético sobre Kamal y bare metal | "¿Cómo desplegar aplicaciones en contenedores con cero tiempo de inactividad sin la pesadilla de mantener un clúster de Kubernetes? Con Kamal." | 21 |
| **2** | `[00:04.5 - 00:11.0]` (6.5s) | `architecture_flow` | Diagrama de despliegue blue/green con proxy de balanceo | "Kamal levanta el nuevo contenedor, verifica el health check, cambia el tráfico a nivel de proxy Traefik y destruye el contenedor viejo sin perder una petición." | 26 |
| **3** | `[00:11.0 - 00:17.0]` (6.0s) | `code_terminal` | Terminal ejecutando kamal deploy con salida de docker tags | "Todo se configura en un simple archivo YAML. Un comando en tu terminal y tu aplicación queda en producción en tus propios servidores." | 23 |
| **4** | `[00:17.0 - 00:22.0]` (5.0s) | `tradeoff_matrix` | Cierre con auditoría y migración cloud | "Si tu empresa quema dinero en AWS y quieres migrar a una infraestructura simple en servidores dedicados, te asesoro en el proceso. Link en mi perfil." | 26 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
¿Cómo desplegar aplicaciones en contenedores con cero tiempo de inactividad sin la pesadilla de mantener un clúster de Kubernetes? Con Kamal.

Kamal levanta el nuevo contenedor, verifica el health check, cambia el tráfico a nivel de proxy Traefik y destruye el contenedor viejo sin perder una petición.

Todo se configura en un simple archivo YAML. Un comando en tu terminal y tu aplicación queda en producción en tus propios servidores.

Si tu empresa quema dinero en AWS y quieres migrar a una infraestructura simple en servidores dedicados, te asesoro en el proceso. Link en mi perfil.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** cloud_costs
- **Última Escena (CTA Leve):** 
  > *"Si tu empresa quema dinero en AWS y quieres migrar a una infraestructura simple en servidores dedicados, te asesoro en el proceso. Link en mi perfil."*
