# Guion de Grabación: Anatomía de un malware en NPM: Robo de .env en scripts postinstall
> **Tema #09:** 09_seguridad_supply_chain  
> **Variación A (TÉCNICO / ARQUITECTURA)**  
> **Categoría:** CIBERSEGURIDAD & SUPPLY CHAIN  
> **Tono:** Seguridad ofensiva, análisis forense de paquetes, código malicioso  
> **Duración total:** 17.5s | **Palabras:** 64 palabras (~219 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:06.5]` (6.5s) | `code_terminal` | Apertura directa con terminal mostrando el payload malicioso oculto en package.json | "Ejecutar npm install puede darle acceso total a tus claves privadas a un atacante. Así roba un script postinstall tus variables de entorno." | 23 |
| **2** | `[00:06.5 - 00:12.5]` (6.0s) | `network_pipeline` | Pipeline visual mostrando la exfiltración silenciosa hacia el servidor de comando y control | "El desarrollador ni siquiera se da cuenta porque el comando npm install termina exitosamente mientras sus credenciales viajan por la red." | 21 |
| **3** | `[00:12.5 - 00:17.5]` (5.0s) | `tradeoff_matrix` | Cierre con auditoría de seguridad de dependencias | "Audito la seguridad de dependencias y diseño pipelines Zero-Trust para empresas que quieren blindar su código. Link en mi biografía." | 20 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
Ejecutar npm install puede darle acceso total a tus claves privadas a un atacante. Así roba un script postinstall tus variables de entorno.

El desarrollador ni siquiera se da cuenta porque el comando npm install termina exitosamente mientras sus credenciales viajan por la red.

Audito la seguridad de dependencias y diseño pipelines Zero-Trust para empresas que quieren blindar su código. Link en mi biografía.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** seguridad_infra
- **Última Escena (CTA Leve):** 
  > *"Audito la seguridad de dependencias y diseño pipelines Zero-Trust para empresas que quieren blindar su código. Link en mi biografía."*
