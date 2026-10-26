# Guion de Grabación: Anatomía de un malware en NPM: Robo de .env en scripts postinstall
> **Tema #09:** 09_seguridad_supply_chain  
> **Variación A (TÉCNICO / ARQUITECTURA)**  
> **Categoría:** CIBERSEGURIDAD & DEVOPS  
> **Tono:** Forense, seguridad defensiva, terminal hacker ético  
> **Duración total:** 17.5s | **Palabras:** 78 palabras (~267 palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
| **1** | `[00:00.0 - 00:06.0]` (6.0s) | `kernel_sandbox_viz` | Visualizador del kernel interceptando llamada al sistema de robo de variables .env | "Un simple npm install puede vaciar las variables de entorno de tu servidor si un paquete secuestrado ejecuta un script de postinstall con permisos de red." | 26 |
| **2** | `[00:06.0 - 00:12.0]` (6.0s) | `code_terminal` | Terminal mostrando el código ofuscado dentro del package.json de un paquete comprometido | "El script malicioso lee tu archivo .env con las claves de AWS y Stripe y las envía codificadas en base sesenta y cuatro a un servidor en el extranjero." | 29 |
| **3** | `[00:12.0 - 00:17.5]` (5.5s) | `terminal_split` | Terminal mostrando política de bloqueo de scripts y llamada a la acción | "Audito pipelines de CI/CD e implemento políticas Zero-Trust para aislar procesos de build en producción. Link en mi perfil para blindar tu repositorio." | 23 |

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

```text
Un simple npm install puede vaciar las variables de entorno de tu servidor si un paquete secuestrado ejecuta un script de postinstall con permisos de red.

El script malicioso lee tu archivo .env con las claves de AWS y Stripe y las envía codificadas en base sesenta y cuatro a un servidor en el extranjero.

Audito pipelines de CI/CD e implemento políticas Zero-Trust para aislar procesos de build en producción. Link en mi perfil para blindar tu repositorio.
```

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** auditoria_seguridad
- **Última Escena (CTA Leve):** 
  > *"Audito pipelines de CI/CD e implemento políticas Zero-Trust para aislar procesos de build en producción. Link en mi perfil para blindar tu repositorio."*
