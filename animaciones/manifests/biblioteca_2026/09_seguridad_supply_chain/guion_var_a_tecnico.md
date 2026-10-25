# Guion de Grabación: Anatomía de un malware en NPM: Robo de .env en scripts postinstall
> **Tema #09:** 09_seguridad_supply_chain  
> **Variación A (TÉCNICO / ARQUITECTURA)**  
> **Categoría:** CIBERSEGURIDAD & SUPPLY CHAIN  
> **Tono:** Seguridad ofensiva, análisis forense de paquetes, código malicioso  
> **Duración total:** 22.0s | **Palabras:** 88 palabras (~240 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:04.5]` (4.5s) | `kinetic_hook` | Gancho cinético sobre malware en dependencias | "¿Sabías que ejecutar npm install puede darle acceso total a tu computadora a un hacker? Así funciona un ataque de supply chain en 2026." | 24 |
| **2** | `[00:04.5 - 00:11.0]` (6.5s) | `code_terminal` | Terminal mostrando el payload malicioso oculto en package.json | "El paquete parece una utilidad inofensiva, pero su script postinstall lee tus variables de entorno y las envía codificadas a un servidor externo." | 23 |
| **3** | `[00:11.0 - 00:17.0]` (6.0s) | `network_pipeline` | Pipeline visual mostrando la exfiltración silenciosa hacia el servidor de comando y control | "El desarrollador ni siquiera se da cuenta porque el comando npm install termina exitosamente mientras sus credenciales viajan por la red." | 21 |
| **4** | `[00:17.0 - 00:22.0]` (5.0s) | `tradeoff_matrix` | Cierre con auditoría de seguridad de dependencias | "Audito la seguridad de dependencias y diseño pipelines Zero-Trust para empresas que quieren blindar su código. Link en mi biografía." | 20 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
¿Sabías que ejecutar npm install puede darle acceso total a tu computadora a un hacker? Así funciona un ataque de supply chain en 2026.

El paquete parece una utilidad inofensiva, pero su script postinstall lee tus variables de entorno y las envía codificadas a un servidor externo.

El desarrollador ni siquiera se da cuenta porque el comando npm install termina exitosamente mientras sus credenciales viajan por la red.

Audito la seguridad de dependencias y diseño pipelines Zero-Trust para empresas que quieren blindar su código. Link en mi biografía.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** seguridad_infra
- **Última Escena (CTA Leve):** 
  > *"Audito la seguridad de dependencias y diseño pipelines Zero-Trust para empresas que quieren blindar su código. Link en mi biografía."*
