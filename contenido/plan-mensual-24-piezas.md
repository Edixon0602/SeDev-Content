# Plan Editorial SeDev: 26 Guiones de 60 Segundos (Teleprompter & Edición)

> **Estructura unificada por pieza:**
> - **🎙️ Guion de Grabación:** Gancho directo (3-5s), Desarrollo en bloque continuo fluido (~130-150 palabras, listo para teleprompter sin interrupciones), y CTA contundente (5-7s).
> - **🎬 Ideas para Edición:** B-rolls específicos para tapar cortes, textos/callouts clave en pantalla y efectos de sonido (SFX) para mantener el ritmo visual y sonoro.

---

## PIEZA 01 | DEMO NEGOCIO
### Radar Inbound de Clientes B2B
**Semana 1 • Lunes** | *Audiencia:* Dueños de agencias, software houses, B2B y fundadores

#### 🎙️ Guion para Teleprompter

**Gancho:**
> "Mientras tu competencia pierde cuatro horas al día mandando mensajes fríos en LinkedIn que nadie responde, un script de cincuenta líneas me avisa quién está buscando contratar hoy mismo."

**Desarrollo:**
"Todos los días, en Reddit, X y foros nicho, hay fundadores pidiendo ayuda a gritos: se les cayó Stripe, se les rompió una integración o buscan quién les arme un MVP rápido. El error de todo el mundo es intentar buscar eso a mano. Mira mi pantalla: este bot corre cada cinco minutos en segundo plano, lee miles de posts públicos y usa IA para separar a los curiosos de la gente que ya tiene presupuesto listo. Cuando detecta a alguien urgido por contratar, me tira una alerta al teléfono con el link directo y qué problema tiene. Cero spam, cero ruegos en frío: solo llegar primero adonde ya hay plata sobre la mesa."

**CTA:**
> "Si vendes software o servicios B2B y quieres instalar este radar en tu negocio, escríbeme la palabra "RADAR" por privado y te muestro cómo funciona."

#### 🎬 Recursos de Edición & B-Rolls

**B-Rolls sugeridos:**
- 📹 Grabación del simulador en pantalla (demo-1-radar-inbound) mostrando alertas entrando en vivo.
- 📹 Zoom a tarjetas con etiquetas de presupuesto ($2,500 - $5,000) y botón para responder.
- 📹 Split screen: Búsqueda manual tediosa en LinkedIn vs Feed automatizado en consola minimalista.

**Textos en pantalla (Callouts):**
- `4 HORAS EN LINKEDIN VS 1 SCRIPT`
- `PRESUPUESTO: $3,500 DETECTADO`
- `CERO MENSAJES EN FRÍO`

**Efectos de sonido (SFX):**
- 🔊 *Ping sutil de notificación al entrar el lead*
- 🔊 *Whoosh suave en transiciones*

---

## PIEZA 02 | DATO CURIOSO
### El hombre que salvó a internet por 500ms de lag (XZ Utils)
**Semana 1 • Martes** | *Audiencia:* Desarrolladores, sysadmins y apasionados de la ciberseguridad

#### 🎙️ Guion para Teleprompter

**Gancho:**
> "Un programador notó que su consola tardaba medio segundo más de lo normal en abrir. Esos quinientos milisegundos salvaron al planeta del peor hackeo de la historia."

**Desarrollo:**
"Se llama Andres Freund. Estaba haciendo pruebas un viernes por la tarde cuando notó que entrar por SSH consumía un poco más de CPU y tardaba medio segundo extra. El noventa y nueve por ciento de nosotros habría reiniciado la laptop y seguido con su vida. Él no. Se puso a investigar qué demonios pasaba en memoria y destapó una película de terror: un supuesto colaborador llamado Jia Tan llevaba dos años infiltrado en XZ Utils, una librería que usan casi todos los servidores Linux del mundo. Se ganó la confianza del creador original y metió una puerta trasera invisible. Estaba a días de darle acceso total a bancos, hospitales y nubes de todo el planeta. Y todo se cayó porque a un dev le molestó medio segundo de lag."

**CTA:**
> "La próxima vez que te digan exagerado por optimizar medio segundo en tu código, mándales este video. Sígueme para más historias reales de ingeniería."

#### 🎬 Recursos de Edición & B-Rolls

**B-Rolls sugeridos:**
- 📹 Terminal Linux corriendo SSH con un cronómetro en pantalla congelándose en 0.500s.
- 📹 Foto de Andres Freund con titulares internacionales de prensa: "The engineer who saved the internet".
- 📹 Visualización de commits de Git en GitHub de "Jia Tan" infiltrándose a lo largo de dos años.

**Textos en pantalla (Callouts):**
- `500 MILISEGUNDOS DE LAG`
- `CVE-2024-3094: XZ UTILS BACKDOOR`
- `UN DEV SALVÓ INTERNET`

**Efectos de sonido (SFX):**
- 🔊 *Cronómetro haciendo tic-tac tenso*
- 🔊 *Sonido de tecleo acelerado*
- 🔊 *Impacto grave de revelación*

---

## PIEZA 03 | CONCEPTO DEV
### Optimistic Concurrency Control (La pelea por el último asiento)
**Semana 1 • Miércoles** | *Audiencia:* Desarrolladores backend, arquitectos de software y eCommerce

#### 🎙️ Guion para Teleprompter

**Gancho:**
> "Dos personas le dan clic a "Comprar el asiento 4B" en el mismo milisegundo. ¿Cómo hace la aerolínea para no vender el mismo asiento dos veces sin trabar toda la página?"

**Desarrollo:**
"La forma novata es bloquear la fila en la base de datos en cuanto el primer usuario entra a pagar. ¿El problema? Si ese tipo tarda diez minutos buscando la tarjeta o cierra la pestaña, el asiento queda secuestrado y nadie más puede comprarlo. Los sistemas grandes usan Control Optimista: no bloquean a nadie. A cada asiento le agregan una columna llamada "versión". Cuando los dos usuarios abren la página, ambos ven el asiento en versión uno. El primero que paga manda un comando muy simple: "actualiza el asiento a vendido y sube la versión a dos, pero SOLO si la versión sigue siendo uno". Cuando un milisegundo después llega el pago del segundo usuario, la base de datos ve que la versión ya cambió a dos, rebota la compra al instante y le pide que elija otro asiento."

**CTA:**
> "Una sola columna en tu tabla te ahorra bloqueos y cobros duplicados. Guarda este video para cuando te toque programar pagos o reservas."

#### 🎬 Recursos de Edición & B-Rolls

**B-Rolls sugeridos:**
- 📹 Mapa interactivo de asientos de avión con dos cursores intentando dar clic al mismo tiempo en el asiento 4B.
- 📹 Diagrama de base de datos mostrando la tabla: seats (id: 4B, status: booked, version: 1 -> 2).
- 📹 Sentencia SQL animada: UPDATE seats SET status = "booked", version = 2 WHERE id = "4B" AND version = 1; con check verde en Usuario 1 y cruz roja en Usuario 2.

**Textos en pantalla (Callouts):**
- `CONTROL DE CONCURRENCIA OPTIMISTA`
- `CERO FILAS BLOQUEADAS`
- `WHERE version = 1`

**Efectos de sonido (SFX):**
- 🔊 *Clic simultáneo de ratón doble*
- 🔊 *Campana suave de pago aprobado*
- 🔊 *Error pop sutil de asiento no disponible*

---

## PIEZA 04 | NOTICIA & DEBATE
### El día que 21 campos tumbaron el planeta (CrowdStrike)
**Semana 1 • Jueves** | *Audiencia:* Devs, administradores de sistemas y líderes tecnológicos

#### 🎙️ Guion para Teleprompter

**Gancho:**
> "Ocho millones de computadoras muertas, aeropuertos cerrados y hospitales a oscuras. ¿La causa? Un archivo de texto que tenía veintiún datos en lugar de veinte."

**Desarrollo:**
"Cuando cayó CrowdStrike, medio mundo pensó que era la tercera guerra mundial cibernética. La realidad técnica fue mucho más ridícula. Su antivirus corre en el corazón de Windows, el famoso Ring Cero: si algo falla ahí, no se cierra el programa, se muere toda la computadora con pantalla azul. Ese viernes mandaron una actualización silenciosa a todo el planeta. El código que leía el archivo esperaba recibir exactamente veinte valores... y alguien mandó veintiuno. Al intentar leer esa posición extra que no existía en memoria, Windows entró en pánico y se reinició en bucle infinito. ¿Lo peor? Como la máquina ni siquiera prendía para conectarse a internet, tuvieron que ir técnicos a pie, computadora por computadora, con un pendrive en la mano."

**CTA:**
> "Mándale esto a ese compañero que le encanta subir cambios a producción un viernes a las cinco de la tarde."

#### 🎬 Recursos de Edición & B-Rolls

**B-Rolls sugeridos:**
- 📹 Tomas de pantallas de aeropuertos de todo el mundo en azul con la Blue Screen of Death (BSOD).
- 📹 Diagrama del kernel de Windows: Ring 3 (User) vs Ring 0 (Kernel) colapsando en rojo.
- 📹 Visualización del código: Array de 20 elementos intentando leer índice [20] out-of-bounds.

**Textos en pantalla (Callouts):**
- `8.5 MILLONES DE PCs MUERTAS`
- `21 CAMPOS EN LUGAR DE 20`
- `NUNCA DESPLIEGUES UN VIERNES`

**Efectos de sonido (SFX):**
- 🔊 *Alarma de aeropuerto distante*
- 🔊 *Sonido de error de Windows BSOD*
- 🔊 *Glitch visual en pantalla*

---

## PIEZA 05 | NOTICIA & DEBATE
### Anthropic y el Ingreso Básico Universal (El dilema de la IA)
**Semana 1 • Viernes** | *Audiencia:* Desarrolladores, comunidad tech y debate económico

#### 🎙️ Guion para Teleprompter

**Gancho:**
> "El creador de Claude acaba de admitir que su inteligencia artificial va a borrar millones de empleos de oficina y programación. ¿Su solución? Que las empresas de IA te paguen un subsidio mensual."

**Desarrollo:**
"Dario Amodei, el CEO de Anthropic, soltó una bomba que incomodó a todo Silicon Valley. Dijo abiertamente que los agentes de IA van a avanzar tan rápido que el mercado laboral no se va a poder adaptar a tiempo, y que millones de programadores, abogados y analistas van a quedar fuera del juego. Para que la economía no colapse, propuso que los gobiernos le cobren un impuesto gigante a las empresas de IA y repartan ese dinero como un Ingreso Básico Universal. Piénsalo un segundo: te automatizan el trabajo con tu propio código, le cobran millones a las empresas por el software y a ti te tiran una pensión para que no protestes. Mitad de la industria dice que es honestidad brutal; la otra mitad dice que es la excusa perfecta para quedarse con todo el mercado."

**CTA:**
> "Te leo en los comentarios: ¿aceptarías un sueldo básico pagado por las empresas de IA o crees que nos están vendiendo humo?"

#### 🎬 Recursos de Edición & B-Rolls

**B-Rolls sugeridos:**
- 📹 Titular del manifiesto de Dario Amodei sobre fondo negro mate (#050505).
- 📹 Gráfica minimalista de 1.5px: Productividad de agentes (subiendo) vs Demanda de desarrolladores júnior (cayendo).
- 📹 Captura del documento oficial del Fondo de Beneficio Público (Public Benefit Fund) de Anthropic.

**Textos en pantalla (Callouts):**
- `ANTHROPIC: IMPUESTO A LA IA = SUELDO BÁSICO`
- `DESPLAZAMIENTO LABORAL EN SOFTWARE`
- `¿HONESTIDAD O MONOPOLIO?`

**Efectos de sonido (SFX):**
- 🔊 *Tono bajo y sobrio de notificación*
- 🔊 *Sonido seco de tecleo al resaltar titular*

---

## PIEZA 06 | DESARROLLO CON IA
### Los 3 Conceptos Obligatorios para Programar con IA en Producción
**Semana 1 • Sábado** | *Audiencia:* Desarrolladores de software, fullstack y arquitectos de IA

#### 🎙️ Guion para Teleprompter

**Gancho:**
> "Si crees que programar con IA es solo mandarle un prompt largo y rezar para que funcione, tu app se va a romper el primer día en producción. Hay tres conceptos que tienes que dominar sí o sí:"

**Desarrollo:**
"Uno: Evals, o pruebas para IA. En código normal haces un test donde dos más dos siempre da cuatro. Pero un modelo nunca responde igual dos veces. Un eval es armar una lista de cincuenta casos reales, correrlos antes de cada deploy y medir qué porcentaje pasa. Si tocas el prompt y tu precisión cae del noventa y ocho al setenta por ciento, frenas todo antes de romper producción. Dos: Ingeniería de contexto. Meterle diez páginas de texto al prompt no lo hace más inteligente: lo marea, lo vuelve lento y lo hace alucinar. Tu trabajo no es escribir testamentos, es filtrar y pasarle solo los tres datos exactos que necesita en ese segundo. Y tres: Respuestas estructuradas. Deja de poner "por favor responde solo en JSON", porque un día te va a responder "¡Claro, aquí tienes!" y te va a tumbar el backend. Usa schemas con Zod o Pydantic en la API para obligar al modelo a devolver el objeto exacto o nada."

**CTA:**
> "Guarda esto para cuando armes tu próximo backend con IA. ¿Cuál de estos tres ya usas en tus proyectos? Te leo abajo."

#### 🎬 Recursos de Edición & B-Rolls

**B-Rolls sugeridos:**
- 📹 Terminal corriendo suite de evals: 48/50 tests pasando (96% Pass Rate) vs fallo en rojo al tocar el prompt.
- 📹 Visual limpio: Bloque de texto gigante tachado vs Ventana con solo 3 datos clave en verde.
- 📹 Código en editor: Schema de Zod/Pydantic forzando el JSON sin texto conversacional extra.

**Textos en pantalla (Callouts):**
- `1. EVALS (TESTS PARA MODELOS NO DETERMINISTAS)`
- `2. CONTEXTO LIMPIO (MENOS TOKENS = CERO ALUCINACIÓN)`
- `3. STRUCTURED OUTPUTS (CERO JSON ROTO)`

**Efectos de sonido (SFX):**
- 🔊 *Pop seco al marcar cada punto*
- 🔊 *Error sutil al mostrar el backend roto*

---

## PIEZA 07 | DESARROLLO CON IA
### La crisis del "AI Slop" en GitHub: El 98% de PRs son basura
**Semana 1 • Domingo** | *Audiencia:* Desarrolladores open source, creadores de software y GitHub users

#### 🎙️ Guion para Teleprompter

**Gancho:**
> "Proyectos legendarios del software libre están cerrando sus puertas por culpa de la IA: el noventa y ocho por ciento de las contribuciones que reciben hoy son basura automática."

**Desarrollo:**
"Está pasando ahora mismo en repositorios como cURL, Godot y Coolify. Miles de personas están usando bots con IA para escanear proyectos famosos y mandar pull requests automáticos a lo loco, solo para inflar su perfil de GitHub o cazar recompensas. El código que mandan parece limpio por encima, pero cuando el creador del proyecto se sienta a revisarlo, descubre que inventa funciones que no existen, rompe la arquitectura o mete agujeros de seguridad. Ahí está la trampa mortal: a un idiota le toma cinco segundos generar mil líneas con ChatGPT, pero al mantenedor le toma dos horas de su vida revisar esa basura para terminar borrándola. Están quemando vivos a los creadores del código que sostiene internet."

**CTA:**
> "Usar IA para programar está brutal, pero mandar código a un proyecto sin siquiera leerlo es de parásitos. ¿Te ha tocado revisar código basura hecho con IA en tu trabajo?"

#### 🎬 Recursos de Edición & B-Rolls

**B-Rolls sugeridos:**
- 📹 Captura de pantalla de GitHub con cientos de PRs cerrados en rojo con el tag "AI SPAM / INVALID".
- 📹 Tweet de Daniel Stenberg (creador de cURL) denunciando el cierre de su bug bounty por reportes falsos de IA.
- 📹 Gráfica mostrando 98% de spam en repositorios de Coolify.

**Textos en pantalla (Callouts):**
- `98% DE PULL REQUESTS SON BASURA`
- `5 SEGUNDOS GENERARLO VS 2 HORAS REVISARLO`
- `REPOSITORIOS CERRANDO EN GITHUB`

**Efectos de sonido (SFX):**
- 🔊 *Notificaciones de GitHub bombardeando la pantalla*
- 🔊 *Sonido de botón de papelera o borrado masivo*

---

## PIEZA 08 | DESARROLLO CON IA
### La crisis de identidad del dev: Burnout histórico en 2026
**Semana 1 • Extra S1** | *Audiencia:* Desarrolladores de software, líderes técnicos y seniors

#### 🎙️ Guion para Teleprompter

**Gancho:**
> "Se supone que la IA nos iba a ahorrar trabajo, pero el burnout en programadores acaba de tocar el punto más alto de la historia. ¿Qué demonios está pasando?"

**Desarrollo:**
"La última encuesta de Stack Overflow sacó a la luz lo que muchos comentan en privado: programar dejó de ser divertido para muchísima gente. Nos metimos a esta carrera porque nos gustaba pensar, armar arquitecturas y resolver rompecabezas lógicos. Pero hoy, en miles de empresas, el programador pasó de ser el arquitecto a ser el conserje de la IA. Te pasas ocho horas al día revisando miles de líneas de código ajeno escupido por un modelo, arreglando bugs silenciosos que nadie entiende, mientras tu jefe te exige entregar el triple de rápido porque "ahora tienes IA". Nos quitaron la parte creativa de escribir código y nos dejaron la parte más agotadora: auditar y limpiar un basurero ajeno contra reloj."

**CTA:**
> "Sé sincero en los comentarios: ¿sientes que hoy disfrutas más programando que hace tres años o te sientes un revisor de fábrica?"

#### 🎬 Recursos de Edición & B-Rolls

**B-Rolls sugeridos:**
- 📹 Gráfica oficial del Stack Overflow Developer Survey mostrando la curva de satisfacción en caída libre.
- 📹 Grabación de un dev con expresión de agotamiento frente a un monitor lleno de diffs gigantescos en GitHub.
- 📹 Titulares de prensa sobre despidos en Big Tech contrastados con compras récord de clusters de GPUs.

**Textos en pantalla (Callouts):**
- `BURNOUT DEV EN MÁXIMOS HISTÓRICOS`
- `DE ARQUITECTOS A CONSERJES DE IA`
- `EL TRIPLE DE PRESIÓN POR ENTREGAR`

**Efectos de sonido (SFX):**
- 🔊 *Suspiro o sonido ambiental de oficina solitaria*
- 🔊 *Efecto de reloj monótono de fábrica*

---

## PIEZA 09 | DEMO NEGOCIO
### QA Autónomo con Navegador Real
**Semana 2 • Lunes** | *Audiencia:* Fundadores de software, agencias web, dueños de eCommerce

#### 🎙️ Guion para Teleprompter

**Gancho:**
> "Este bot acaba de encontrar un bug en el carrito de compras que le estaba haciendo perder miles de dólares a una tienda online. Y lo encontró a las tres de la mañana."

**Desarrollo:**
"Probar una web a mano antes de cada cambio es un castigo, y los tests tradicionales con código se rompen apenas alguien cambia el nombre de una clase en el CSS. Mira lo que armamos acá: es un agente de QA que usa un navegador real igual que un humano. Le das una instrucción simple como "entra a la tienda, agrega un par de zapatillas, aplica un cupón y llega hasta el pago". El agente mira la pantalla, mueve el cursor, llena los campos y verifica que todo cuadre. Si un botón no hace clic, si el descuento calcula mal o si el servidor tira un error quinientos por detrás, te graba el video exacto del fallo y te manda el error de consola directo a Slack."

**CTA:**
> "Si tienes un eCommerce o un SaaS y estás cansado de que tus propios clientes sean los que descubran los bugs en producción, escríbeme "QA" al privado."

#### 🎬 Recursos de Edición & B-Rolls

**B-Rolls sugeridos:**
- 📹 Grabación del demo interactivo (demo-2-qa-autonomo) con el navegador simulado en acción.
- 📹 Bounding boxes verdes escaneando inputs y botones en tiempo real.
- 📹 Reporte de error en rojo destacando: "500 Internal Server Error en /api/checkout".

**Textos en pantalla (Callouts):**
- `QA MANUAL VS AGENTE AUTÓNOMO`
- `PRUEBA DE COMPRA REAL 24/7`
- `BUG DETECTADO EN 12 SEGUNDOS`

**Efectos de sonido (SFX):**
- 🔊 *Clicks mecánicos de tipeo y clics en botones*
- 🔊 *Tono suave de alerta al detectar el bug*

---

## PIEZA 10 | CONCEPTO DEV
### Backpressure (Por qué tu servidor explota por falta de RAM)
**Semana 2 • Martes** | *Audiencia:* Desarrolladores backend, Node.js, Go y streaming de datos

#### 🎙️ Guion para Teleprompter

**Gancho:**
> "Si a tu servidor le entran diez mil datos por segundo pero tu base de datos solo puede guardar quinientos, tu app no se pone lenta: explota y se apaga por falta de memoria."

**Desarrollo:**
"Imagínate que intentas vaciar un balde de agua dentro de una botella usando un embudo pequeño. Si tiras todo el balde de golpe, el embudo no da abasto y el agua se desborda por toda la mesa. En backend pasa exactamente lo mismo. Si lees un archivo gigante o recibes miles de eventos rapidísimo, pero el paso siguiente es lento, todos esos datos que están haciendo fila se quedan esperando en la memoria RAM. En diez segundos llenas la memoria y el servidor muere con un Out Of Memory. La solución se llama Backpressure o contrapresión: cuando la base de datos ve que su fila de espera se está llenando, le manda una señal hacia atrás al servidor para que pause la entrada de datos hasta que termine de tragar. Así procesas cincuenta gigabytes usando apenas veinte megas de RAM."

**CTA:**
> "Dominar esto es lo que separa un proyecto de tutorial de un backend que aguanta tráfico de verdad. Guárdalo y sígueme para más arquitectura sin humo."

#### 🎬 Recursos de Edición & B-Rolls

**B-Rolls sugeridos:**
- 📹 Clip animado minimalista (p08_backpressure.mp4) mostrando la cola saturándose en rojo y el pulso de PAUSE activando el flujo controlado.
- 📹 Transición a la cola vaciándose ordenadamente en verde esmeralda a ritmo constante.
- 📹 Gráfica de consumo de RAM manteniéndose plana en 25MB mientras procesa un archivo de 50GB.

**Textos en pantalla (Callouts):**
- `BACKPRESSURE (CONTRAPRESIÓN)`
- `EVITA EL CRASH POR OUT OF MEMORY`
- `50 GB PROCESADOS CON 20 MB DE RAM`

**Efectos de sonido (SFX):**
- 🔊 *Alarma de advertencia de memoria al 100%*
- 🔊 *Sonido de válvula de presión cerrándose con escape suave*
- 🔊 *Tono suave de estabilidad en servidor*

---

## PIEZA 11 | CONCEPTO DEV
### Eventual Consistency: Por qué tu like no aparece
**Semana 2 • Miércoles** | *Audiencia:* Desarrolladores frontend y backend

#### 🎙️ Guion para Teleprompter

**Gancho:**
> "Le das like a un video, recargas la página y tu like desapareció. ¿Está roto el servidor? No, te están mintiendo a propósito para que la app se sienta instantánea."

**Desarrollo:**
"Piénsalo así: cuando un famoso sube una foto, millones de personas le dan like al mismo segundo desde Japón, España y Argentina. Si cada vez que alguien toca el corazón la base de datos tuviera que bloquear el contador mundial, sumar uno y avisarle a todos los servidores del planeta antes de pintarte el corazón en rojo, la app tardaría cinco segundos por cada clic. Sería inusable. Por eso usan Consistencia Eventual. Cuando das like, tu teléfono te pinta el corazón rojo de inmediato para dejarte feliz, le avisa al servidor de tu país y sigue de largo. Por detrás, los servidores se van pasando el chisme cada tantos segundos hasta que el número real se acomoda para todos."

**CTA:**
> "Para los likes está perfecto, pero si haces esto con el saldo de un banco te fundes en cinco minutos. Sígueme para entender cómo funcionan las grandes apps por dentro."

#### 🎬 Recursos de Edición & B-Rolls

**B-Rolls sugeridos:**
- 📹 Animación de un feed de redes sociales con el corazón activándose instantáneamente.
- 📹 Mapa global estilizado mostrando pulsos de sincronización entre Tokio, Londres y Virginia.
- 📹 Gráfico explicativo del Teorema CAP (Consistencia vs Disponibilidad).

**Textos en pantalla (Callouts):**
- `CONSISTENCIA EVENTUAL`
- `VELOCIDAD VS EXACTITUD`
- `UI INSTANTÁNEA // SYNC EN SEGUNDO PLANO`

**Efectos de sonido (SFX):**
- 🔊 *Pop de corazón / like*
- 🔊 *Pulsos de sonar de red mundial*

---

## PIEZA 12 | NOTICIA & DEBATE
### La rebelión del Open Source: La traición de Redis y Valkey
**Semana 2 • Jueves** | *Audiencia:* Desarrolladores backend, DevOps y comunidad de código abierto

#### 🎙️ Guion para Teleprompter

**Gancho:**
> "Redis intentó cobrarle a la fuerza a toda la industria por el código que la comunidad construyó gratis durante diez años. En cuarenta y ocho horas, la comunidad los dejó sin negocio."

**Desarrollo:**
"Durante una década, Redis fue el rey indiscutible del caché en bases de datos. Era código abierto y miles de programadores de todo el mundo ayudaron a mejorarlo gratis. Pero de un día para otro, los directivos de la empresa cambiaron la licencia y cerraron el proyecto para obligar a las grandes nubes a pasar por caja. Pensaron que tenían a toda la industria agarrada del cuello. ¿Qué pasó? Al día siguiente, los ingenieros más pesados del proyecto, junto con la Linux Foundation, AWS y Google, agarraron la última versión libre, le cambiaron el nombre a Valkey y siguieron trabajando ahí. En pocos meses, las empresas migraron, las distribuciones de Linux borraron a Redis por defecto y la jugada les salió carísima."

**CTA:**
> "En el open source, el valor no está en la marca, está en la gente que mantiene el código. ¿En tu trabajo siguen en Redis o ya se pasaron a Valkey?"

#### 🎬 Recursos de Edición & B-Rolls

**B-Rolls sugeridos:**
- 📹 Logo rojo clásico de Redis agrietándose y transformándose en el nuevo logo de Valkey.
- 📹 Comunicado de la Linux Foundation anunciando el respaldo de AWS, Google y Oracle a Valkey.
- 📹 Terminal ejecutando valkey-server reemplazando los binarios antiguos con 100% de compatibilidad.

**Textos en pantalla (Callouts):**
- `LA TRAICIÓN DE REDIS`
- `FORK EN 48 HORAS: NACE VALKEY`
- `NADIE ES DUEÑO DE LA COMUNIDAD`

**Efectos de sonido (SFX):**
- 🔊 *Efecto de cristal rompiéndose*
- 🔊 *Whoosh de renacimiento digital*
- 🔊 *Tecleo en terminal*

---

## PIEZA 13 | DESARROLLO CON IA
### El fin de la burbuja del hardware: El impacto DeepSeek
**Semana 2 • Viernes** | *Audiencia:* Ingenieros de IA, fundadores y comunidad tech

#### 🎙️ Guion para Teleprompter

**Gancho:**
> "Mientras en Silicon Valley decían que era imposible competir en IA sin gastar cien mil millones de dólares en chips, un grupo de ingenieros lo logró con seis millones y a pura matemática."

**Desarrollo:**
"Las grandes tecnológicas nos vendieron el cuento de que la única forma de crear inteligencia artificial de primer nivel era comprando millones de tarjetas gráficas de Nvidia y quemando el presupuesto de un país entero. Pero cuando salió DeepSeek, les arruinó el negocio en una mañana. Como tenían prohibido comprar los chips más nuevos por las sanciones, no les quedó otra que usar el cerebro: optimizaron el código a bajo nivel, hicieron que el modelo active solo una fracción pequeñita de su cerebro para responder cada palabra y lograron el mismo nivel que los modelos más caros del mundo gastando una fracción ridícula. Y para rematar la jugada, regalaron el código abierto para que cualquiera lo descargue gratis."

**CTA:**
> "La escasez siempre ha sido la madre de la buena ingeniería. ¿Crees que los modelos abiertos van a terminar ganándole a los cerrados? Te leo."

#### 🎬 Recursos de Edición & B-Rolls

**B-Rolls sugeridos:**
- 📹 Gráfica del desplome bursátil de acciones tech tras el anuncio de DeepSeek.
- 📹 Diagrama de arquitectura Mixture of Experts (MoE) activando solo los nodos necesarios por palabra.
- 📹 Captura del repositorio de GitHub de DeepSeek sumando decenas de miles de estrellas en horas.

**Textos en pantalla (Callouts):**
- `INGENIERÍA > FUERZA BRUTA`
- `$6 MILLONES VS $100,000 MILLONES`
- `CÓDIGO ABIERTO PARA TODOS`

**Efectos de sonido (SFX):**
- 🔊 *Alarma de bolsa de valores*
- 🔊 *Efecto de impacto sísmico sutil*
- 🔊 *Ding de estrellas en GitHub*

---

## PIEZA 14 | DESARROLLO CON IA
### Model Context Protocol (MCP): El USB-C para la IA
**Semana 2 • Sábado** | *Audiencia:* Arquitectos de software y desarrolladores de agentes

#### 🎙️ Guion para Teleprompter

**Gancho:**
> "Antes, cada celular tenía un cargador distinto hasta que llegó el USB-C. En inteligencia artificial acaba de pasar exactamente lo mismo, y se llama MCP."

**Desarrollo:**
"Hasta hace poco, conectar una IA con las herramientas de tu empresa era un dolor de cabeza. Si querías que leyera tu base de datos en Postgres, tus tickets de Jira y tus mensajes de Slack, tenías que programar integraciones a medida para cada modelo. Si al mes siguiente salía un modelo mejor y querías cambiar, tenías que tirar todo el código a la basura y volver a empezar. El protocolo MCP soluciona este desastre: es un conector universal. Tú armas un pequeño puente MCP para tu base de datos una sola vez en la vida, y automáticamente cualquier agente, editor de código o modelo de IA sabe cómo enchufarse y usarlo sin que tengas que tocar una sola línea más."

**CTA:**
> "Si estás creando agentes o automatizaciones hoy y no estás usando MCP, estás trabajando el doble. Guarda este video y pruébalo esta semana."

#### 🎬 Recursos de Edición & B-Rolls

**B-Rolls sugeridos:**
- 📹 Ilustración de maraña de cables propietarios transformándose en un puerto USB-C único y limpio.
- 📹 Diagrama de arquitectura: Host (Claude / Cursor / Agent) <-> MCP <-> Servidores de Herramientas.
- 📹 Inspección de herramientas en consola listando mcp_postgres_query, mcp_github_issue.

**Textos en pantalla (Callouts):**
- `MODEL CONTEXT PROTOCOL (MCP)`
- `EL USB-C DE LA INTELIGENCIA ARTIFICIAL`
- `PROGRAMA EL PUENTE UNA SOLA VEZ`

**Efectos de sonido (SFX):**
- 🔊 *Sonido de clic de puerto USB conectándose*
- 🔊 *Swoosh suave de transición*

---

## PIEZA 15 | DEMO NEGOCIO
### Optimizador de Rutas Logísticas en Tiempo Real
**Semana 3 • Lunes** | *Audiencia:* Empresas de logística, distribución, última milla, flotas

#### 🎙️ Guion para Teleprompter

**Gancho:**
> "Si tu empresa tiene camiones o camionetas haciendo entregas en la calle, probablemente estás tirando el treinta por ciento del dinero en combustible solo porque salen en el orden equivocado."

**Desarrollo:**
"Parece una tontería, pero si un repartidor tiene que hacer apenas diez paradas en un día, existen más de tres millones de combinaciones posibles para hacer ese recorrido. Si encima tienes cincuenta entregas, horarios que cumplir, tráfico y camiones con distinto tamaño, armar las rutas a ojo en un Excel es quemar billetes todos los días. Mira esta herramienta que construimos: le cargas las direcciones del día, calcula el tráfico real y en dos segundos le arma a cada chofer la ruta exacta en el celular para no dar ni una sola vuelta de más. En una flota mediana, eso significa ahorrar miles de dólares al mes en diésel y horas extras desde la primera semana."

**CTA:**
> "Si manejas logística, distribución o reparto y quieres ver cuánto combustible puede ahorrarse tu flota, escríbeme "RUTA" al privado y hacemos una prueba con tus datos."

#### 🎬 Recursos de Edición & B-Rolls

**B-Rolls sugeridos:**
- 📹 Grabación del demo interactivo (demo-3-optimizador-rutas) con el mapa y nodos de entrega.
- 📹 Transición de líneas rojas caóticas reorganizándose en rutas vectoriales verdes óptimas.
- 📹 Tarjeta de métricas mostrando: "-28.4% distancia", "3.5 horas ahorradas por vehículo".

**Textos en pantalla (Callouts):**
- `-30% GASTO EN COMBUSTIBLE`
- `10 PARADAS = 3.6 MILLONES DE RUTAS`
- `RUTA ÓPTIMA EN 2 SEGUNDOS`

**Efectos de sonido (SFX):**
- 🔊 *Sonido de aceleración de motor distante*
- 🔊 *Trazo vectorial fluido en pantalla*

---

## PIEZA 16 | CONCEPTO DEV
### Índices en Bases de Datos y B-Trees (El libro sin índice)
**Semana 3 • Martes** | *Audiencia:* Desarrolladores backend, fullstack y administradores de bases de datos

#### 🎙️ Guion para Teleprompter

**Gancho:**
> "Tu base de datos no está lenta porque necesites pagar un servidor más grande en AWS. Está lenta porque te olvidaste de poner una línea de código."

**Desarrollo:**
"Imagínate que te doy un libro de mil páginas sin índice y te pido que busques dónde aparece el nombre "Carlos". No te queda otra que empezar en la página uno y leer hoja por hoja hasta el final. Eso es exactamente lo que hace tu base de datos cuando haces un WHERE sobre una columna sin índice: se lee el millón de filas una por una y te clava cuarenta segundos de espera. Cuando agregas un índice, el motor crea por detrás un árbol ordenado llamado B-Tree. En vez de leer fila por fila, va descartando mitades: ¿está en la primera mitad o en la segunda? En tres saltos llega directo al dato que buscabas. La misma consulta pasa de tardar cuarenta segundos a tardar dos milisegundos."

**CTA:**
> "Antes de meterle tarjeta de crédito al servidor, revisa tus índices. Eso sí: no le pongas índices a todo a lo loco o vas a volver lentos los guardados. Sígueme para más tips de backend."

#### 🎬 Recursos de Edición & B-Rolls

**B-Rolls sugeridos:**
- 📹 Persona hojeando desesperadamente un libro grueso página a página vs alguien yendo directo al índice alfabético.
- 📹 Visualización animada de un árbol B-Tree dividiendo nodos en mitades y haciendo match en verde.
- 📹 Terminal de Postgres corriendo EXPLAIN ANALYZE mostrando el salto de Seq Scan (38,000ms) a Index Scan (2.4ms).

**Textos en pantalla (Callouts):**
- `SIN ÍNDICE: 40 SEGUNDOS`
- `CON B-TREE INDEX: 2 MILISEGUNDOS`
- `CREATE INDEX ON users(email);`

**Efectos de sonido (SFX):**
- 🔊 *Hojas de papel pasando con frustración*
- 🔊 *Beep de éxito de escáner digital*

---

## PIEZA 17 | CONCEPTO DEV
### Connection Pooling: Por qué tu base de datos colapsa
**Semana 3 • Miércoles** | *Audiencia:* Desarrolladores backend y fullstack

#### 🎙️ Guion para Teleprompter

**Gancho:**
> "El error número uno que tumba a las startups cuando tienen su primer pico de usuarios no es el código lento: es quedarse sin conexiones en la base de datos."

**Desarrollo:**
"Cada vez que tu backend se conecta desde cero a Postgres o MySQL, tiene que hacer todo un ritual pesado: abrir el canal de red, validar seguridad, chequear usuario y contraseña y reservar memoria. Si entran diez usuarios no pasa nada. Pero si te haces viral y entran dos mil personas al mismo tiempo, y tu código abre una conexión nueva por cada clic, la base de datos colapsa en tres segundos con el famoso error "Too many connections". La solución se llama Connection Pooling: en vez de abrir y cerrar la puerta mil veces, dejas veinte conexiones abiertas fijas en una fila. Cuando entra un usuario, usa una conexión prestada por dos milisegundos, hace su consulta y la suelta enseguida para el que viene atrás."

**CTA:**
> "Con veinte conexiones bien recicladas atiendes a decenas de miles de usuarios sin despeinarte. Guarda este video para que no te agarre desprevenido en producción."

#### 🎬 Recursos de Edición & B-Rolls

**B-Rolls sugeridos:**
- 📹 Diagrama animado de tráfico: Cientos de flechas saturando un icono de base de datos en rojo.
- 📹 Paso a la fila de conexiones (Pool de 20 canales) despachando a miles de usuarios ordenadamente.
- 📹 Captura de terminal de PgBouncer gestionando pools activos.

**Textos en pantalla (Callouts):**
- `FATAL: TOO MANY CONNECTIONS`
- `CONNECTION POOLING`
- `20 CONEXIONES PARA 10,000 USUARIOS`

**Efectos de sonido (SFX):**
- 🔊 *Alarma grave de colapso de base de datos*
- 🔊 *Sonido de flujo hidráulico ordenado*

---

## PIEZA 18 | NOTICIA & DEBATE
### Guerra civil en Linux: La renuncia por Rust en el Kernel
**Semana 3 • Jueves** | *Audiencia:* Programadores de C, Rust, sistemas y kernel developers

#### 🎙️ Guion para Teleprompter

**Gancho:**
> "Se desató una guerra civil dentro de Linux: los programadores de toda la vida en C están bloqueando a los de Rust, y uno de los líderes del proyecto acaba de pegar el portazo en vivo."

**Desarrollo:**
"Wedson Almeida, el ingeniero que lideraba la misión de meter el lenguaje Rust dentro del corazón de Linux, renunció harto y dijo que no aguantaba más las trabas ridículas de la vieja guardia. El choque es generacional: siete de cada diez fallos graves de seguridad en sistemas operativos existen porque el lenguaje C te deja equivocarte con la memoria muy fácil. Rust hace que esos errores sean imposibles desde antes de compilar. Pero varios veteranos que llevan treinta años manteniendo Linux en C dijeron básicamente: "a mí nadie me va a obligar a aprender un lenguaje nuevo a mi edad", y empezaron a boicotear los avances en las conferencias. Incluso Linus Torvalds tuvo que salir a calmar las aguas porque el proyecto está partido al medio."

**CTA:**
> "Te toca ser juez en los comentarios: ¿tienen razón los veteranos en defender su código en C o deberían dar el brazo a torcer por la seguridad de Rust?"

#### 🎬 Recursos de Edición & B-Rolls

**B-Rolls sugeridos:**
- 📹 Correo de despedida en la Linux Kernel Mailing List (LKML) con la frase de Wedson destacada.
- 📹 Video del Linux Summit mostrando a veteranos de C discutiendo tensamente en el micrófono.
- 📹 Gráfica de Microsoft y Google mostrando que el 70% de bugs críticos son errores de memoria en C/C++.

**Textos en pantalla (Callouts):**
- `GUERRA CIVIL EN LINUX`
- `VIEJA GUARDIA DE C VS RUST`
- `70% DE LOS FALLOS SON DE MEMORIA`

**Efectos de sonido (SFX):**
- 🔊 *Golpe de micrófono tenso*
- 🔊 *Sonido de correo electrónico enviado*
- 🔊 *Campana de debate*

---

## PIEZA 19 | DESARROLLO CON IA
### Context Window vs RAG: La trampa de los 2M de tokens
**Semana 3 • Viernes** | *Audiencia:* Desarrolladores que construyen apps con IA y CTOs

#### 🎙️ Guion para Teleprompter

**Gancho:**
> "Que un modelo de IA hoy te deje meterle dos millones de tokens en el prompt no significa que tengas que tirarle tu base de datos entera en cada pregunta."

**Desarrollo:**
"Cada vez que sale un modelo con ventana de contexto gigante, todo el mundo sale a decir que el RAG murió. Hasta que lo suben a producción y les llega la factura a fin de mes. Si le mandas un libro entero de datos en cada mensaje que escribe un usuario, te pasan tres cosas horribles: primero, cada pregunta te cuesta una fortuna; segundo, el usuario se queda mirando un circulito de carga durante treinta segundos; y tercero, el modelo se marea entre tanta basura y termina inventando datos. La forma inteligente sigue siendo buscar primero qué tres párrafos hablan del tema y pasarle al modelo únicamente esos tres párrafos. Respuesta en medio segundo, cero alucinaciones y cien veces más barato."

**CTA:**
> "En ingeniería de IA, meter más texto a lo bruto casi siempre es la peor arquitectura. Sígueme si quieres aprender a construir productos con IA que sí sean rentables."

#### 🎬 Recursos de Edición & B-Rolls

**B-Rolls sugeridos:**
- 📹 Gráfico animado comparando costos y tiempo: 2M tokens ($$$ / 35s) vs 3 chunks filtrados ($ / 0.4s).
- 📹 Diagrama limpio: Búsqueda vectorial extrayendo solo 3 bloques relevantes hacia el modelo.
- 📹 Contador de latencia cayendo de 35 segundos a 400 milisegundos.

**Textos en pantalla (Callouts):**
- `2M DE TOKENS != BASE DE DATOS`
- `35 SEGUNDOS VS 400 MILISEGUNDOS`
- `FILTRA PRIMERO, PREGUNTA DESPUÉS`

**Efectos de sonido (SFX):**
- 🔊 *Sonido de caja registradora / dinero gastado*
- 🔊 *Click limpio de match vectorial*

---

## PIEZA 20 | NOTICIA & DEBATE
### Ataques a la cadena de suministro en npm
**Semana 3 • Sábado** | *Audiencia:* Desarrolladores web y líderes técnicos

#### 🎙️ Guion para Teleprompter

**Gancho:**
> "Tu servidor puede tener la mejor seguridad del mundo, pero si haces "npm install" a ciegas, un desconocido puede vaciarte las claves de producción en tres segundos."

**Desarrollo:**
"Abre cualquier proyecto moderno de JavaScript: tú instalaste diez librerías conocidas, pero adentro de la carpeta node_modules hay más de mil quinientos paquetes que ni sabes quién escribió. Los hackers ya no pierden tiempo intentando romper tu firewall. Lo que hacen hoy es buscar a algún programador cansado que mantiene una librería chiquita pero que todo el mundo descarga por rebote, le compran o le roban la cuenta, y meten diez líneas de código malicioso. Cuando tu servidor descarga la actualización para compilar, ese script se ejecuta solo, lee tus variables de entorno y les manda tus llaves de AWS y de la base de datos directo a su servidor. Sin tocar una sola línea de tu código."

**CTA:**
> "Fija las versiones exactas de tus paquetes y desactiva los scripts automáticos en tus despliegues hoy mismo. Mándale esto al encargado de DevOps de tu equipo."

#### 🎬 Recursos de Edición & B-Rolls

**B-Rolls sugeridos:**
- 📹 Terminal corriendo npm audit mostrando alertas críticas en color rojo.
- 📹 Árbol gigante de dependencias profundas ramificándose en pantalla desde un solo paquete.
- 📹 Captura de flag --ignore-scripts protegiendo el pipeline de despliegue.

**Textos en pantalla (Callouts):**
- `EL PELIGRO OCULTO DE NPM INSTALL`
- `1,500 PAQUETES QUE NO CONOCES`
- `USA --ignore-scripts EN PRODUCCIÓN`

**Efectos de sonido (SFX):**
- 🔊 *Alarma digital sutil de seguridad*
- 🔊 *Tecleo rápido en consola*

---

## PIEZA 21 | CONCEPTO DEV
### Rate Limiting y Token Bucket (El vaso con fichas)
**Semana 4 • Lunes** | *Audiencia:* Desarrolladores backend, arquitectos de software y creadores de APIs

#### 🎙️ Guion para Teleprompter

**Gancho:**
> "¿Cómo hace un servidor para dejar pasar a un usuario normal que hace diez clics seguidos, pero bloquear al instante a un bot que intenta tumbar la página?"

**Desarrollo:**
"Si dejas tu API abierta sin filtro, cualquier gracioso con un bucle for en Python te manda diez mil peticiones en un segundo y te funde el servidor o la tarjeta de crédito. Para frenarlo sin molestar a los usuarios reales se usa el algoritmo Token Bucket, o cubo de fichas. Imagínate que a cada usuario le das un vaso con diez fichas. Cada vez que pide algo al servidor, le cobras una ficha. Mientras tanto, el sistema le va regalando dos fichas nuevas cada segundo. Si un humano hace tres clics rápidos, gasta tres fichas y sigue navegando feliz. Pero si entra un bot y tira cincuenta peticiones de golpe, vacía el vaso en un milisegundo y el servidor le cierra la puerta en la cara con un error 429 sin siquiera tocar la base de datos."

**CTA:**
> "Pon esto en Redis delante de tu login y de tus endpoints de IA antes de salir a producción. Guarda el video para cuando te toque configurarlo."

#### 🎬 Recursos de Edición & B-Rolls

**B-Rolls sugeridos:**
- 📹 Animación minimalista de un contenedor con 10 bloques; peticiones normales gastan y recargan, pero una ráfaga de bot lo vacía y activa bloqueo HTTP 429.
- 📹 Captura de respuesta en terminal con código HTTP 429 Too Many Requests y cabecera Retry-After: 30.
- 📹 Diagrama limpio de Redis filtrando por IP antes de llegar al backend.

**Textos en pantalla (Callouts):**
- `ALGORITMO TOKEN BUCKET`
- `HTTP 429: TOO MANY REQUESTS`
- `BLINDA TU API CON REDIS`

**Efectos de sonido (SFX):**
- 🔊 *Fichas cayendo rítmicamente*
- 🔊 *Sonido de escudo o rebote metálico al saltar el 429*
- 🔊 *Click seco*

---

## PIEZA 22 | CONCEPTO DEV
### Garbage Collection: Cómo tu lenguaje limpia la memoria
**Semana 4 • Martes** | *Audiencia:* Desarrolladores de lenguajes de alto nivel (JS, Python, Go, Java)

#### 🎙️ Guion para Teleprompter

**Gancho:**
> "Cada vez que creas una variable en tu código estás ocupando un pedacito de memoria RAM. Si tú nunca la borras a mano, ¿por qué tu servidor no explota a las dos horas?"

**Desarrollo:**
"En lenguajes de la vieja escuela como C, si pides memoria para guardar un dato y te olvidas de liberarla con código cuando terminas de usarla, esa memoria queda secuestrada para siempre. Se llama Memory Leak y te apaga el servidor en pocos días. Por suerte, lenguajes como JavaScript, Python o Go traen un barrendero invisible llamado Garbage Collector. Cada tanto, este proceso frena un instante, mira todas las variables que siguen vivas en tu app y les pone una etiqueta. Todo lo que quedó suelto y sin etiqueta porque ya terminó la función donde vivía, lo barre de un plumazo y recupera esa RAM para que la vuelvas a usar."

**CTA:**
> "Nos ahorra mil dolores de cabeza, pero cuando el barrendero se pone a limpiar en el peor momento, tu app pega esos famosos micro-tirones. Sígueme para entender cómo funciona tu código por debajo."

#### 🎬 Recursos de Edición & B-Rolls

**B-Rolls sugeridos:**
- 📹 Animación de bloques en memoria RAM: Nodos conectados en verde vs Nodos sueltos en gris.
- 📹 Línea de barrido limpiando los nodos sueltos y liberando espacio.
- 📹 Gráfica en diente de sierra del consumo de memoria RAM subiendo y bajando tras cada limpieza.

**Textos en pantalla (Callouts):**
- `GARBAGE COLLECTOR`
- `EL BARRENDERO DE LA MEMORIA RAM`
- `MARK & SWEEP EN SEGUNDO PLANO`

**Efectos de sonido (SFX):**
- 🔊 *Sonido de escáner digital*
- 🔊 *Efecto de barrido limpio*

---

## PIEZA 23 | CONCEPTO DEV
### Circuit Breaker Pattern (La llave térmica de tu backend)
**Semana 4 • Miércoles** | *Audiencia:* Desarrolladores backend, cloud engineers y arquitectos de sistemas

#### 🎙️ Guion para Teleprompter

**Gancho:**
> "Si hoy se cae Stripe o se cae una API externa que usa tu app, ¿tu página muestra un mensajito de error y sigue andando, o se muere tu servidor entero con ellos?"

**Desarrollo:**
"En tu casa tienes una llave térmica: si enchufas una estufa en corto, salta la térmica y corta la luz de ese enchufe para que no se te prenda fuego toda la instalación. En backend existe exactamente el mismo invento y se llama Circuit Breaker. Si tu servidor llama a una API externa que se quedó colgada y tarda treinta segundos en responder, tus usuarios van a empezar a recargar la página desesperados. En dos minutos vas a tener miles de peticiones atoradas esperando respuesta hasta que tu propio servidor reviente. Con un Circuit Breaker, al quinto error seguido el interruptor salta: durante un minuto ni siquiera intenta llamar a la API caída, responde al instante con un plan B y mantiene el resto de tu plataforma volando."

**CTA:**
> "Que se caiga un proveedor externo no es tu culpa; que tu plataforma entera muera por eso, sí. Guarda este patrón para tu arquitectura."

#### 🎬 Recursos de Edición & B-Rolls

**B-Rolls sugeridos:**
- 📹 Interruptor térmico saltando para cortar un cortocircuito.
- 📹 Diagrama de tres estados del Circuit Breaker: Cerrado (Normal) -> Abierto (Fallo detectado, respuesta inmediata) -> Semiabierto (Probando si ya volvió).
- 📹 Gráfica de latencia del servidor manteniéndose plana en 10ms gracias al corte a tiempo.

**Textos en pantalla (Callouts):**
- `PATRÓN CIRCUIT BREAKER`
- `LA LLAVE TÉRMICA DE TU BACKEND`
- `SI UN PROVEEDOR CAE, TU APP NO`

**Efectos de sonido (SFX):**
- 🔊 *Clack seco de interruptor eléctrico bajando*
- 🔊 *Alarma leve*
- 🔊 *Zumbido suave de estabilidad recuperada*

---

## PIEZA 24 | NOTICIA & DEBATE
### Turbopack y la muerte de Webpack: Todo se reescribe en Rust
**Semana 4 • Jueves** | *Audiencia:* Desarrolladores frontend, fullstack y arquitectura web

#### 🎙️ Guion para Teleprompter

**Gancho:**
> "Usar herramientas hechas en JavaScript para compilar proyectos gigantes de JavaScript fue un error histórico, y por fin toda la industria lo está corrigiendo con Rust."

**Desarrollo:**
"Durante diez años nos acostumbramos a algo absurdo: tocar una línea de código, guardar, y quedarnos mirando la consola treinta segundos esperando a que Webpack terminara de empaquetar todo. ¿Por qué tardaba tanto? Porque JavaScript corre en un solo hilo y no nació para procesar millones de líneas de texto a fuerza bruta. Hoy, las herramientas que mueven la web moderna como Turbopack, Vite con Rolldown o Biome se están reescribiendo desde cero en Rust. Al correr directo sobre el procesador usando todos los núcleos a la vez, lo que antes tardaba medio minuto ahora se actualiza en el navegador en diez milisegundos, antes de que termines de soltar la tecla."

**CTA:**
> "JavaScript sigue siendo el rey en el navegador, pero por debajo el motor ahora es de Rust. ¿Todavía sufres con Webpack en tu trabajo o ya migraron?"

#### 🎬 Recursos de Edición & B-Rolls

**B-Rolls sugeridos:**
- 📹 Cronómetro comparativo: Webpack tardando 42 segundos en compilar vs Turbopack/Rolldown en 15 milisegundos.
- 📹 Terminal mostrando compilación instantánea al guardar cambios.
- 📹 Gráfica de todos los núcleos del procesador trabajando en paralelo con Rust.

**Textos en pantalla (Callouts):**
- `EL FIN DE WEBPACK`
- `JS EN EL NAVEGADOR, RUST EN EL MOTOR`
- `DE 40 SEGUNDOS A 10 MILISEGUNDOS`

**Efectos de sonido (SFX):**
- 🔊 *Reloj lento -> acelerón instantáneo*
- 🔊 *Campana rápida de hot-reload*

---

## PIEZA 25 | DATO CURIOSO
### Knight Capital: El bug de $440M en 45 minutos
**Semana 4 • Viernes** | *Audiencia:* Devs, inversores y directores de tecnología

#### 🎙️ Guion para Teleprompter

**Gancho:**
> "Un ingeniero se olvidó de actualizar uno de los ocho servidores de la empresa. Cuarenta y cinco minutos después, la compañía había perdido cuatrocientos cuarenta millones de dólares y quebró."

**Desarrollo:**
"Pasó en Wall Street con Knight Capital, una de las firmas de inversión más grandes de Estados Unidos. Tenían que subir una actualización a su sistema de compras automáticas antes de que abriera la bolsa. El encargado hizo el deploy a mano: actualizó siete servidores, pero por error se salteó el octavo. Cuando sonó la campana a las nueve y media de la mañana, ese servidor viejo despertó una función de prueba que llevaba ocho años muerta en el código y que nadie había borrado. El servidor se volvió loco: empezó a comprar acciones carísimas y a venderlas centavos más baratas miles de veces por segundo. Perdieron diez millones de dólares por minuto durante cuarenta y cinco minutos hasta que alguien bajó el enchufe."

**CTA:**
> "Dos lecciones que valen cuatrocientos millones: borra el código muerto y jamás hagas un deploy a mano. Mándale esto a tu equipo."

#### 🎬 Recursos de Edición & B-Rolls

**B-Rolls sugeridos:**
- 📹 Gráfica financiera cayendo en picada vertical.
- 📹 Titular histórico de Bloomberg: "Knight Capital loss reaches $440 million".
- 📹 Diagrama de 8 servidores: 7 actualizados en verde y el octavo en rojo disparando órdenes sin control.

**Textos en pantalla (Callouts):**
- `EL BUG DE LOS $440 MILLONES`
- `7 SERVIDORES ACTUALIZADOS, 1 OLVIDADO`
- `JAMÁS DESPLIEGUES A MANO`

**Efectos de sonido (SFX):**
- 🔊 *Campana de apertura de Wall Street*
- 🔊 *Alarma rápida de pérdida financiera*
- 🔊 *Corte seco de corriente*

---

## PIEZA 26 | CONCEPTO DEV
### Zero-Downtime Deployment (Blue-Green vs Canary)
**Semana 4 • Sábado** | *Audiencia:* DevOps, sysadmins y desarrolladores de producto

#### 🎙️ Guion para Teleprompter

**Gancho:**
> "Si cada vez que subes una versión nueva a producción tienes que tirar la página abajo diez minutos y poner un cartel de "Estamos en mantenimiento", estás trabajando como en el año dos mil."

**Desarrollo:**
"Hoy ninguna empresa seria apaga su sistema para actualizarlo. Hay dos formas muy limpias de subir cambios en caliente sin que nadie se entere. La primera se llama Blue-Green: tienes dos servidores gemelos, el Azul que está atendiendo a la gente ahora mismo, y el Verde que está en espera. Subes la versión nueva al Verde, la pruebas tranquilo, y cuando ves que anda joya, cambias una llave en el router para que todo el tráfico pase al Verde en un milisegundo. Si algo falla, vuelves al Azul en un clic. La segunda es Canary: le muestras la versión nueva solo al cinco por ciento de los usuarios. Si no salta ningún error en consola, vas subiendo el porcentaje de a poco hasta llegar al cien."

**CTA:**
> "Desplegar un martes al mediodía sin transpirar no tiene precio. Guarda este video y compártelo con tu equipo de desarrollo."

#### 🎬 Recursos de Edición & B-Rolls

**B-Rolls sugeridos:**
- 📹 Cartel viejo de "Sitio en mantenimiento" tachándose en rojo.
- 📹 Diagrama animado de Load Balancer cambiando el flujo del servidor Azul al Verde en un clic.
- 📹 Barra de tráfico Canary subiendo de 5% a 100% con indicador de 0% errores.

**Textos en pantalla (Callouts):**
- `CERO TIEMPO DE CAÍDA`
- `BLUE-GREEN VS CANARY DEPLOY`
- `ACTUALIZA SIN APAGAR LA WEB`

**Efectos de sonido (SFX):**
- 🔊 *Sonido de conmutador haciendo clic limpio*
- 🔊 *Campana suave de confirmación*

---

