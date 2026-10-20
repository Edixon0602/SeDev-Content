const fs = require('fs');
const path = require('path');

const pieces = [
  // --- SEMANA 1 ---
  {
    id: 1,
    week: 1,
    day: 'Lunes',
    category: 'DEMO NEGOCIO',
    title: 'Radar Inbound de Clientes B2B',
    target: 'Dueños de agencias, software houses, B2B y fundadores',
    gancho: 'Mientras tu competencia pierde cuatro horas al día mandando mensajes fríos en LinkedIn que nadie responde, un script de cincuenta líneas me avisa quién está buscando contratar hoy mismo.',
    desarrollo: 'Todos los días, en Reddit, X y foros nicho, hay fundadores pidiendo ayuda a gritos: se les cayó Stripe, se les rompió una integración o buscan quién les arme un MVP rápido. El error de todo el mundo es intentar buscar eso a mano. Mira mi pantalla: este bot corre cada cinco minutos en segundo plano, lee miles de posts públicos y usa IA para separar a los curiosos de la gente que ya tiene presupuesto listo. Cuando detecta a alguien urgido por contratar, me tira una alerta al teléfono con el link directo y qué problema tiene. Cero spam, cero ruegos en frío: solo llegar primero adonde ya hay plata sobre la mesa.',
    cta: 'Si vendes software o servicios B2B y quieres instalar este radar en tu negocio, escríbeme la palabra "RADAR" por privado y te muestro cómo funciona.',
    edicion: {
      b_rolls: [
        'Grabación del simulador en pantalla (demo-1-radar-inbound) mostrando alertas entrando en vivo.',
        'Zoom a tarjetas con etiquetas de presupuesto ($2,500 - $5,000) y botón para responder.',
        'Split screen: Búsqueda manual tediosa en LinkedIn vs Feed automatizado en consola minimalista.'
      ],
      textos_pantalla: ['4 HORAS EN LINKEDIN VS 1 SCRIPT', 'PRESUPUESTO: $3,500 DETECTADO', 'CERO MENSAJES EN FRÍO'],
      sfx: ['Ping sutil de notificación al entrar el lead', 'Whoosh suave en transiciones']
    }
  },
  {
    id: 2,
    week: 1,
    day: 'Martes',
    category: 'DATO CURIOSO',
    title: 'El hombre que salvó a internet por 500ms de lag (XZ Utils)',
    target: 'Desarrolladores, sysadmins y apasionados de la ciberseguridad',
    gancho: 'Un programador notó que su consola tardaba medio segundo más de lo normal en abrir. Esos quinientos milisegundos salvaron al planeta del peor hackeo de la historia.',
    desarrollo: 'Se llama Andres Freund. Estaba haciendo pruebas un viernes por la tarde cuando notó que entrar por SSH consumía un poco más de CPU y tardaba medio segundo extra. El noventa y nueve por ciento de nosotros habría reiniciado la laptop y seguido con su vida. Él no. Se puso a investigar qué demonios pasaba en memoria y destapó una película de terror: un supuesto colaborador llamado Jia Tan llevaba dos años infiltrado en XZ Utils, una librería que usan casi todos los servidores Linux del mundo. Se ganó la confianza del creador original y metió una puerta trasera invisible. Estaba a días de darle acceso total a bancos, hospitales y nubes de todo el planeta. Y todo se cayó porque a un dev le molestó medio segundo de lag.',
    cta: 'La próxima vez que te digan exagerado por optimizar medio segundo en tu código, mándales este video. Sígueme para más historias reales de ingeniería.',
    edicion: {
      b_rolls: [
        'Terminal Linux corriendo SSH con un cronómetro en pantalla congelándose en 0.500s.',
        'Foto de Andres Freund con titulares internacionales de prensa: "The engineer who saved the internet".',
        'Visualización de commits de Git en GitHub de "Jia Tan" infiltrándose a lo largo de dos años.'
      ],
      textos_pantalla: ['500 MILISEGUNDOS DE LAG', 'CVE-2024-3094: XZ UTILS BACKDOOR', 'UN DEV SALVÓ INTERNET'],
      sfx: ['Cronómetro haciendo tic-tac tenso', 'Sonido de tecleo acelerado', 'Impacto grave de revelación']
    }
  },
  {
    id: 3,
    week: 1,
    day: 'Miércoles',
    category: 'CONCEPTO DEV',
    title: 'Optimistic Concurrency Control (La pelea por el último asiento)',
    target: 'Desarrolladores backend, arquitectos de software y eCommerce',
    gancho: 'Dos personas le dan clic a "Comprar el asiento 4B" en el mismo milisegundo. ¿Cómo hace la aerolínea para no vender el mismo asiento dos veces sin trabar toda la página?',
    desarrollo: 'La forma novata es bloquear la fila en la base de datos en cuanto el primer usuario entra a pagar. ¿El problema? Si ese tipo tarda diez minutos buscando la tarjeta o cierra la pestaña, el asiento queda secuestrado y nadie más puede comprarlo. Los sistemas grandes usan Control Optimista: no bloquean a nadie. A cada asiento le agregan una columna llamada "versión". Cuando los dos usuarios abren la página, ambos ven el asiento en versión uno. El primero que paga manda un comando muy simple: "actualiza el asiento a vendido y sube la versión a dos, pero SOLO si la versión sigue siendo uno". Cuando un milisegundo después llega el pago del segundo usuario, la base de datos ve que la versión ya cambió a dos, rebota la compra al instante y le pide que elija otro asiento.',
    cta: 'Una sola columna en tu tabla te ahorra bloqueos y cobros duplicados. Guarda este video para cuando te toque programar pagos o reservas.',
    edicion: {
      b_rolls: [
        'Mapa interactivo de asientos de avión con dos cursores intentando dar clic al mismo tiempo en el asiento 4B.',
        'Diagrama de base de datos mostrando la tabla: seats (id: 4B, status: booked, version: 1 -> 2).',
        'Sentencia SQL animada: UPDATE seats SET status = "booked", version = 2 WHERE id = "4B" AND version = 1; con check verde en Usuario 1 y cruz roja en Usuario 2.'
      ],
      textos_pantalla: ['CONTROL DE CONCURRENCIA OPTIMISTA', 'CERO FILAS BLOQUEADAS', 'WHERE version = 1'],
      sfx: ['Clic simultáneo de ratón doble', 'Campana suave de pago aprobado', 'Error pop sutil de asiento no disponible']
    }
  },
  {
    id: 4,
    week: 1,
    day: 'Jueves',
    category: 'NOTICIA & DEBATE',
    title: 'El día que 21 campos tumbaron el planeta (CrowdStrike)',
    target: 'Devs, administradores de sistemas y líderes tecnológicos',
    gancho: 'Ocho millones de computadoras muertas, aeropuertos cerrados y hospitales a oscuras. ¿La causa? Un archivo de texto que tenía veintiún datos en lugar de veinte.',
    desarrollo: 'Cuando cayó CrowdStrike, medio mundo pensó que era la tercera guerra mundial cibernética. La realidad técnica fue mucho más ridícula. Su antivirus corre en el corazón de Windows, el famoso Ring Cero: si algo falla ahí, no se cierra el programa, se muere toda la computadora con pantalla azul. Ese viernes mandaron una actualización silenciosa a todo el planeta. El código que leía el archivo esperaba recibir exactamente veinte valores... y alguien mandó veintiuno. Al intentar leer esa posición extra que no existía en memoria, Windows entró en pánico y se reinició en bucle infinito. ¿Lo peor? Como la máquina ni siquiera prendía para conectarse a internet, tuvieron que ir técnicos a pie, computadora por computadora, con un pendrive en la mano.',
    cta: 'Mándale esto a ese compañero que le encanta subir cambios a producción un viernes a las cinco de la tarde.',
    edicion: {
      b_rolls: [
        'Tomas de pantallas de aeropuertos de todo el mundo en azul con la Blue Screen of Death (BSOD).',
        'Diagrama del kernel de Windows: Ring 3 (User) vs Ring 0 (Kernel) colapsando en rojo.',
        'Visualización del código: Array de 20 elementos intentando leer índice [20] out-of-bounds.'
      ],
      textos_pantalla: ['8.5 MILLONES DE PCs MUERTAS', '21 CAMPOS EN LUGAR DE 20', 'NUNCA DESPLIEGUES UN VIERNES'],
      sfx: ['Alarma de aeropuerto distante', 'Sonido de error de Windows BSOD', 'Glitch visual en pantalla']
    }
  },
  {
    id: 5,
    week: 1,
    day: 'Viernes',
    category: 'NOTICIA & DEBATE',
    title: 'Anthropic y el Ingreso Básico Universal (El dilema de la IA)',
    target: 'Desarrolladores, comunidad tech y debate económico',
    gancho: 'El creador de Claude acaba de admitir que su inteligencia artificial va a borrar millones de empleos de oficina y programación. ¿Su solución? Que las empresas de IA te paguen un subsidio mensual.',
    desarrollo: 'Dario Amodei, el CEO de Anthropic, soltó una bomba que incomodó a todo Silicon Valley. Dijo abiertamente que los agentes de IA van a avanzar tan rápido que el mercado laboral no se va a poder adaptar a tiempo, y que millones de programadores, abogados y analistas van a quedar fuera del juego. Para que la economía no colapse, propuso que los gobiernos le cobren un impuesto gigante a las empresas de IA y repartan ese dinero como un Ingreso Básico Universal. Piénsalo un segundo: te automatizan el trabajo con tu propio código, le cobran millones a las empresas por el software y a ti te tiran una pensión para que no protestes. Mitad de la industria dice que es honestidad brutal; la otra mitad dice que es la excusa perfecta para quedarse con todo el mercado.',
    cta: 'Te leo en los comentarios: ¿aceptarías un sueldo básico pagado por las empresas de IA o crees que nos están vendiendo humo?',
    edicion: {
      b_rolls: [
        'Titular del manifiesto de Dario Amodei sobre fondo negro mate (#050505).',
        'Gráfica minimalista de 1.5px: Productividad de agentes (subiendo) vs Demanda de desarrolladores júnior (cayendo).',
        'Captura del documento oficial del Fondo de Beneficio Público (Public Benefit Fund) de Anthropic.'
      ],
      textos_pantalla: ['ANTHROPIC: IMPUESTO A LA IA = SUELDO BÁSICO', 'DESPLAZAMIENTO LABORAL EN SOFTWARE', '¿HONESTIDAD O MONOPOLIO?'],
      sfx: ['Tono bajo y sobrio de notificación', 'Sonido seco de tecleo al resaltar titular']
    }
  },
  {
    id: 6,
    week: 1,
    day: 'Sábado',
    category: 'DESARROLLO CON IA',
    title: 'Los 3 Conceptos Obligatorios para Programar con IA en Producción',
    target: 'Desarrolladores de software, fullstack y arquitectos de IA',
    gancho: 'Si crees que programar con IA es solo mandarle un prompt largo y rezar para que funcione, tu app se va a romper el primer día en producción. Hay tres conceptos que tienes que dominar sí o sí:',
    desarrollo: 'Uno: Evals, o pruebas para IA. En código normal haces un test donde dos más dos siempre da cuatro. Pero un modelo nunca responde igual dos veces. Un eval es armar una lista de cincuenta casos reales, correrlos antes de cada deploy y medir qué porcentaje pasa. Si tocas el prompt y tu precisión cae del noventa y ocho al setenta por ciento, frenas todo antes de romper producción. Dos: Ingeniería de contexto. Meterle diez páginas de texto al prompt no lo hace más inteligente: lo marea, lo vuelve lento y lo hace alucinar. Tu trabajo no es escribir testamentos, es filtrar y pasarle solo los tres datos exactos que necesita en ese segundo. Y tres: Respuestas estructuradas. Deja de poner "por favor responde solo en JSON", porque un día te va a responder "¡Claro, aquí tienes!" y te va a tumbar el backend. Usa schemas con Zod o Pydantic en la API para obligar al modelo a devolver el objeto exacto o nada.',
    cta: 'Guarda esto para cuando armes tu próximo backend con IA. ¿Cuál de estos tres ya usas en tus proyectos? Te leo abajo.',
    edicion: {
      b_rolls: [
        'Terminal corriendo suite de evals: 48/50 tests pasando (96% Pass Rate) vs fallo en rojo al tocar el prompt.',
        'Visual limpio: Bloque de texto gigante tachado vs Ventana con solo 3 datos clave en verde.',
        'Código en editor: Schema de Zod/Pydantic forzando el JSON sin texto conversacional extra.'
      ],
      textos_pantalla: ['1. EVALS (TESTS PARA MODELOS NO DETERMINISTAS)', '2. CONTEXTO LIMPIO (MENOS TOKENS = CERO ALUCINACIÓN)', '3. STRUCTURED OUTPUTS (CERO JSON ROTO)'],
      sfx: ['Pop seco al marcar cada punto', 'Error sutil al mostrar el backend roto']
    }
  },
  {
    id: 7,
    week: 1,
    day: 'Domingo',
    category: 'DESARROLLO CON IA',
    title: 'La crisis del "AI Slop" en GitHub: El 98% de PRs son basura',
    target: 'Desarrolladores open source, creadores de software y GitHub users',
    gancho: 'Proyectos legendarios del software libre están cerrando sus puertas por culpa de la IA: el noventa y ocho por ciento de las contribuciones que reciben hoy son basura automática.',
    desarrollo: 'Está pasando ahora mismo en repositorios como cURL, Godot y Coolify. Miles de personas están usando bots con IA para escanear proyectos famosos y mandar pull requests automáticos a lo loco, solo para inflar su perfil de GitHub o cazar recompensas. El código que mandan parece limpio por encima, pero cuando el creador del proyecto se sienta a revisarlo, descubre que inventa funciones que no existen, rompe la arquitectura o mete agujeros de seguridad. Ahí está la trampa mortal: a un idiota le toma cinco segundos generar mil líneas con ChatGPT, pero al mantenedor le toma dos horas de su vida revisar esa basura para terminar borrándola. Están quemando vivos a los creadores del código que sostiene internet.',
    cta: 'Usar IA para programar está brutal, pero mandar código a un proyecto sin siquiera leerlo es de parásitos. ¿Te ha tocado revisar código basura hecho con IA en tu trabajo?',
    edicion: {
      b_rolls: [
        'Captura de pantalla de GitHub con cientos de PRs cerrados en rojo con el tag "AI SPAM / INVALID".',
        'Tweet de Daniel Stenberg (creador de cURL) denunciando el cierre de su bug bounty por reportes falsos de IA.',
        'Gráfica mostrando 98% de spam en repositorios de Coolify.'
      ],
      textos_pantalla: ['98% DE PULL REQUESTS SON BASURA', '5 SEGUNDOS GENERARLO VS 2 HORAS REVISARLO', 'REPOSITORIOS CERRANDO EN GITHUB'],
      sfx: ['Notificaciones de GitHub bombardeando la pantalla', 'Sonido de botón de papelera o borrado masivo']
    }
  },
  {
    id: 8,
    week: 1,
    day: 'Extra S1',
    category: 'DESARROLLO CON IA',
    title: 'La crisis de identidad del dev: Burnout histórico en 2026',
    target: 'Desarrolladores de software, líderes técnicos y seniors',
    gancho: 'Se supone que la IA nos iba a ahorrar trabajo, pero el burnout en programadores acaba de tocar el punto más alto de la historia. ¿Qué demonios está pasando?',
    desarrollo: 'La última encuesta de Stack Overflow sacó a la luz lo que muchos comentan en privado: programar dejó de ser divertido para muchísima gente. Nos metimos a esta carrera porque nos gustaba pensar, armar arquitecturas y resolver rompecabezas lógicos. Pero hoy, en miles de empresas, el programador pasó de ser el arquitecto a ser el conserje de la IA. Te pasas ocho horas al día revisando miles de líneas de código ajeno escupido por un modelo, arreglando bugs silenciosos que nadie entiende, mientras tu jefe te exige entregar el triple de rápido porque "ahora tienes IA". Nos quitaron la parte creativa de escribir código y nos dejaron la parte más agotadora: auditar y limpiar un basurero ajeno contra reloj.',
    cta: 'Sé sincero en los comentarios: ¿sientes que hoy disfrutas más programando que hace tres años o te sientes un revisor de fábrica?',
    edicion: {
      b_rolls: [
        'Gráfica oficial del Stack Overflow Developer Survey mostrando la curva de satisfacción en caída libre.',
        'Grabación de un dev con expresión de agotamiento frente a un monitor lleno de diffs gigantescos en GitHub.',
        'Titulares de prensa sobre despidos en Big Tech contrastados con compras récord de clusters de GPUs.'
      ],
      textos_pantalla: ['BURNOUT DEV EN MÁXIMOS HISTÓRICOS', 'DE ARQUITECTOS A CONSERJES DE IA', 'EL TRIPLE DE PRESIÓN POR ENTREGAR'],
      sfx: ['Suspiro o sonido ambiental de oficina solitaria', 'Efecto de reloj monótono de fábrica']
    }
  },

  // --- SEMANA 2 ---
  {
    id: 9,
    week: 2,
    day: 'Lunes',
    category: 'DEMO NEGOCIO',
    title: 'QA Autónomo con Navegador Real',
    target: 'Fundadores de software, agencias web, dueños de eCommerce',
    gancho: 'Este bot acaba de encontrar un bug en el carrito de compras que le estaba haciendo perder miles de dólares a una tienda online. Y lo encontró a las tres de la mañana.',
    desarrollo: 'Probar una web a mano antes de cada cambio es un castigo, y los tests tradicionales con código se rompen apenas alguien cambia el nombre de una clase en el CSS. Mira lo que armamos acá: es un agente de QA que usa un navegador real igual que un humano. Le das una instrucción simple como "entra a la tienda, agrega un par de zapatillas, aplica un cupón y llega hasta el pago". El agente mira la pantalla, mueve el cursor, llena los campos y verifica que todo cuadre. Si un botón no hace clic, si el descuento calcula mal o si el servidor tira un error quinientos por detrás, te graba el video exacto del fallo y te manda el error de consola directo a Slack.',
    cta: 'Si tienes un eCommerce o un SaaS y estás cansado de que tus propios clientes sean los que descubran los bugs en producción, escríbeme "QA" al privado.',
    edicion: {
      b_rolls: [
        'Grabación del demo interactivo (demo-2-qa-autonomo) con el navegador simulado en acción.',
        'Bounding boxes verdes escaneando inputs y botones en tiempo real.',
        'Reporte de error en rojo destacando: "500 Internal Server Error en /api/checkout".'
      ],
      textos_pantalla: ['QA MANUAL VS AGENTE AUTÓNOMO', 'PRUEBA DE COMPRA REAL 24/7', 'BUG DETECTADO EN 12 SEGUNDOS'],
      sfx: ['Clicks mecánicos de tipeo y clics en botones', 'Tono suave de alerta al detectar el bug']
    }
  },
  {
    id: 10,
    week: 2,
    day: 'Martes',
    category: 'CONCEPTO DEV',
    title: 'Backpressure (Por qué tu servidor explota por falta de RAM)',
    target: 'Desarrolladores backend, Node.js, Go y streaming de datos',
    gancho: 'Si a tu servidor le entran diez mil datos por segundo pero tu base de datos solo puede guardar quinientos, tu app no se pone lenta: explota y se apaga por falta de memoria.',
    desarrollo: 'Imagínate que intentas vaciar un balde de agua dentro de una botella usando un embudo pequeño. Si tiras todo el balde de golpe, el embudo no da abasto y el agua se desborda por toda la mesa. En backend pasa exactamente lo mismo. Si lees un archivo gigante o recibes miles de eventos rapidísimo, pero el paso siguiente es lento, todos esos datos que están haciendo fila se quedan esperando en la memoria RAM. En diez segundos llenas la memoria y el servidor muere con un Out Of Memory. La solución se llama Backpressure o contrapresión: cuando la base de datos ve que su fila de espera se está llenando, le manda una señal hacia atrás al servidor para que pause la entrada de datos hasta que termine de tragar. Así procesas cincuenta gigabytes usando apenas veinte megas de RAM.',
    cta: 'Dominar esto es lo que separa un proyecto de tutorial de un backend que aguanta tráfico de verdad. Guárdalo y sígueme para más arquitectura sin humo.',
    edicion: {
      b_rolls: [
        'Clip animado minimalista (p08_backpressure.mp4) mostrando la cola saturándose en rojo y el pulso de PAUSE activando el flujo controlado.',
        'Transición a la cola vaciándose ordenadamente en verde esmeralda a ritmo constante.',
        'Gráfica de consumo de RAM manteniéndose plana en 25MB mientras procesa un archivo de 50GB.'
      ],
      textos_pantalla: ['BACKPRESSURE (CONTRAPRESIÓN)', 'EVITA EL CRASH POR OUT OF MEMORY', '50 GB PROCESADOS CON 20 MB DE RAM'],
      sfx: ['Alarma de advertencia de memoria al 100%', 'Sonido de válvula de presión cerrándose con escape suave', 'Tono suave de estabilidad en servidor']
    }
  },
  {
    id: 11,
    week: 2,
    day: 'Miércoles',
    category: 'CONCEPTO DEV',
    title: 'Eventual Consistency: Por qué tu like no aparece',
    target: 'Desarrolladores frontend y backend',
    gancho: 'Le das like a un video, recargas la página y tu like desapareció. ¿Está roto el servidor? No, te están mintiendo a propósito para que la app se sienta instantánea.',
    desarrollo: 'Piénsalo así: cuando un famoso sube una foto, millones de personas le dan like al mismo segundo desde Japón, España y Argentina. Si cada vez que alguien toca el corazón la base de datos tuviera que bloquear el contador mundial, sumar uno y avisarle a todos los servidores del planeta antes de pintarte el corazón en rojo, la app tardaría cinco segundos por cada clic. Sería inusable. Por eso usan Consistencia Eventual. Cuando das like, tu teléfono te pinta el corazón rojo de inmediato para dejarte feliz, le avisa al servidor de tu país y sigue de largo. Por detrás, los servidores se van pasando el chisme cada tantos segundos hasta que el número real se acomoda para todos.',
    cta: 'Para los likes está perfecto, pero si haces esto con el saldo de un banco te fundes en cinco minutos. Sígueme para entender cómo funcionan las grandes apps por dentro.',
    edicion: {
      b_rolls: [
        'Animación de un feed de redes sociales con el corazón activándose instantáneamente.',
        'Mapa global estilizado mostrando pulsos de sincronización entre Tokio, Londres y Virginia.',
        'Gráfico explicativo del Teorema CAP (Consistencia vs Disponibilidad).'
      ],
      textos_pantalla: ['CONSISTENCIA EVENTUAL', 'VELOCIDAD VS EXACTITUD', 'UI INSTANTÁNEA // SYNC EN SEGUNDO PLANO'],
      sfx: ['Pop de corazón / like', 'Pulsos de sonar de red mundial']
    }
  },
  {
    id: 12,
    week: 2,
    day: 'Jueves',
    category: 'NOTICIA & DEBATE',
    title: 'La rebelión del Open Source: La traición de Redis y Valkey',
    target: 'Desarrolladores backend, DevOps y comunidad de código abierto',
    gancho: 'Redis intentó cobrarle a la fuerza a toda la industria por el código que la comunidad construyó gratis durante diez años. En cuarenta y ocho horas, la comunidad los dejó sin negocio.',
    desarrollo: 'Durante una década, Redis fue el rey indiscutible del caché en bases de datos. Era código abierto y miles de programadores de todo el mundo ayudaron a mejorarlo gratis. Pero de un día para otro, los directivos de la empresa cambiaron la licencia y cerraron el proyecto para obligar a las grandes nubes a pasar por caja. Pensaron que tenían a toda la industria agarrada del cuello. ¿Qué pasó? Al día siguiente, los ingenieros más pesados del proyecto, junto con la Linux Foundation, AWS y Google, agarraron la última versión libre, le cambiaron el nombre a Valkey y siguieron trabajando ahí. En pocos meses, las empresas migraron, las distribuciones de Linux borraron a Redis por defecto y la jugada les salió carísima.',
    cta: 'En el open source, el valor no está en la marca, está en la gente que mantiene el código. ¿En tu trabajo siguen en Redis o ya se pasaron a Valkey?',
    edicion: {
      b_rolls: [
        'Logo rojo clásico de Redis agrietándose y transformándose en el nuevo logo de Valkey.',
        'Comunicado de la Linux Foundation anunciando el respaldo de AWS, Google y Oracle a Valkey.',
        'Terminal ejecutando valkey-server reemplazando los binarios antiguos con 100% de compatibilidad.'
      ],
      textos_pantalla: ['LA TRAICIÓN DE REDIS', 'FORK EN 48 HORAS: NACE VALKEY', 'NADIE ES DUEÑO DE LA COMUNIDAD'],
      sfx: ['Efecto de cristal rompiéndose', 'Whoosh de renacimiento digital', 'Tecleo en terminal']
    }
  },
  {
    id: 13,
    week: 2,
    day: 'Viernes',
    category: 'DESARROLLO CON IA',
    title: 'El fin de la burbuja del hardware: El impacto DeepSeek',
    target: 'Ingenieros de IA, fundadores y comunidad tech',
    gancho: 'Mientras en Silicon Valley decían que era imposible competir en IA sin gastar cien mil millones de dólares en chips, un grupo de ingenieros lo logró con seis millones y a pura matemática.',
    desarrollo: 'Las grandes tecnológicas nos vendieron el cuento de que la única forma de crear inteligencia artificial de primer nivel era comprando millones de tarjetas gráficas de Nvidia y quemando el presupuesto de un país entero. Pero cuando salió DeepSeek, les arruinó el negocio en una mañana. Como tenían prohibido comprar los chips más nuevos por las sanciones, no les quedó otra que usar el cerebro: optimizaron el código a bajo nivel, hicieron que el modelo active solo una fracción pequeñita de su cerebro para responder cada palabra y lograron el mismo nivel que los modelos más caros del mundo gastando una fracción ridícula. Y para rematar la jugada, regalaron el código abierto para que cualquiera lo descargue gratis.',
    cta: 'La escasez siempre ha sido la madre de la buena ingeniería. ¿Crees que los modelos abiertos van a terminar ganándole a los cerrados? Te leo.',
    edicion: {
      b_rolls: [
        'Gráfica del desplome bursátil de acciones tech tras el anuncio de DeepSeek.',
        'Diagrama de arquitectura Mixture of Experts (MoE) activando solo los nodos necesarios por palabra.',
        'Captura del repositorio de GitHub de DeepSeek sumando decenas de miles de estrellas en horas.'
      ],
      textos_pantalla: ['INGENIERÍA > FUERZA BRUTA', '$6 MILLONES VS $100,000 MILLONES', 'CÓDIGO ABIERTO PARA TODOS'],
      sfx: ['Alarma de bolsa de valores', 'Efecto de impacto sísmico sutil', 'Ding de estrellas en GitHub']
    }
  },
  {
    id: 14,
    week: 2,
    day: 'Sábado',
    category: 'DESARROLLO CON IA',
    title: 'Model Context Protocol (MCP): El USB-C para la IA',
    target: 'Arquitectos de software y desarrolladores de agentes',
    gancho: 'Antes, cada celular tenía un cargador distinto hasta que llegó el USB-C. En inteligencia artificial acaba de pasar exactamente lo mismo, y se llama MCP.',
    desarrollo: 'Hasta hace poco, conectar una IA con las herramientas de tu empresa era un dolor de cabeza. Si querías que leyera tu base de datos en Postgres, tus tickets de Jira y tus mensajes de Slack, tenías que programar integraciones a medida para cada modelo. Si al mes siguiente salía un modelo mejor y querías cambiar, tenías que tirar todo el código a la basura y volver a empezar. El protocolo MCP soluciona este desastre: es un conector universal. Tú armas un pequeño puente MCP para tu base de datos una sola vez en la vida, y automáticamente cualquier agente, editor de código o modelo de IA sabe cómo enchufarse y usarlo sin que tengas que tocar una sola línea más.',
    cta: 'Si estás creando agentes o automatizaciones hoy y no estás usando MCP, estás trabajando el doble. Guarda este video y pruébalo esta semana.',
    edicion: {
      b_rolls: [
        'Ilustración de maraña de cables propietarios transformándose en un puerto USB-C único y limpio.',
        'Diagrama de arquitectura: Host (Claude / Cursor / Agent) <-> MCP <-> Servidores de Herramientas.',
        'Inspección de herramientas en consola listando mcp_postgres_query, mcp_github_issue.'
      ],
      textos_pantalla: ['MODEL CONTEXT PROTOCOL (MCP)', 'EL USB-C DE LA INTELIGENCIA ARTIFICIAL', 'PROGRAMA EL PUENTE UNA SOLA VEZ'],
      sfx: ['Sonido de clic de puerto USB conectándose', 'Swoosh suave de transición']
    }
  },

  // --- SEMANA 3 ---
  {
    id: 15,
    week: 3,
    day: 'Lunes',
    category: 'DEMO NEGOCIO',
    title: 'Optimizador de Rutas Logísticas en Tiempo Real',
    target: 'Empresas de logística, distribución, última milla, flotas',
    gancho: 'Si tu empresa tiene camiones o camionetas haciendo entregas en la calle, probablemente estás tirando el treinta por ciento del dinero en combustible solo porque salen en el orden equivocado.',
    desarrollo: 'Parece una tontería, pero si un repartidor tiene que hacer apenas diez paradas en un día, existen más de tres millones de combinaciones posibles para hacer ese recorrido. Si encima tienes cincuenta entregas, horarios que cumplir, tráfico y camiones con distinto tamaño, armar las rutas a ojo en un Excel es quemar billetes todos los días. Mira esta herramienta que construimos: le cargas las direcciones del día, calcula el tráfico real y en dos segundos le arma a cada chofer la ruta exacta en el celular para no dar ni una sola vuelta de más. En una flota mediana, eso significa ahorrar miles de dólares al mes en diésel y horas extras desde la primera semana.',
    cta: 'Si manejas logística, distribución o reparto y quieres ver cuánto combustible puede ahorrarse tu flota, escríbeme "RUTA" al privado y hacemos una prueba con tus datos.',
    edicion: {
      b_rolls: [
        'Grabación del demo interactivo (demo-3-optimizador-rutas) con el mapa y nodos de entrega.',
        'Transición de líneas rojas caóticas reorganizándose en rutas vectoriales verdes óptimas.',
        'Tarjeta de métricas mostrando: "-28.4% distancia", "3.5 horas ahorradas por vehículo".'
      ],
      textos_pantalla: ['-30% GASTO EN COMBUSTIBLE', '10 PARADAS = 3.6 MILLONES DE RUTAS', 'RUTA ÓPTIMA EN 2 SEGUNDOS'],
      sfx: ['Sonido de aceleración de motor distante', 'Trazo vectorial fluido en pantalla']
    }
  },
  {
    id: 16,
    week: 3,
    day: 'Martes',
    category: 'CONCEPTO DEV',
    title: 'Índices en Bases de Datos y B-Trees (El libro sin índice)',
    target: 'Desarrolladores backend, fullstack y administradores de bases de datos',
    gancho: 'Tu base de datos no está lenta porque necesites pagar un servidor más grande en AWS. Está lenta porque te olvidaste de poner una línea de código.',
    desarrollo: 'Imagínate que te doy un libro de mil páginas sin índice y te pido que busques dónde aparece el nombre "Carlos". No te queda otra que empezar en la página uno y leer hoja por hoja hasta el final. Eso es exactamente lo que hace tu base de datos cuando haces un WHERE sobre una columna sin índice: se lee el millón de filas una por una y te clava cuarenta segundos de espera. Cuando agregas un índice, el motor crea por detrás un árbol ordenado llamado B-Tree. En vez de leer fila por fila, va descartando mitades: ¿está en la primera mitad o en la segunda? En tres saltos llega directo al dato que buscabas. La misma consulta pasa de tardar cuarenta segundos a tardar dos milisegundos.',
    cta: 'Antes de meterle tarjeta de crédito al servidor, revisa tus índices. Eso sí: no le pongas índices a todo a lo loco o vas a volver lentos los guardados. Sígueme para más tips de backend.',
    edicion: {
      b_rolls: [
        'Persona hojeando desesperadamente un libro grueso página a página vs alguien yendo directo al índice alfabético.',
        'Visualización animada de un árbol B-Tree dividiendo nodos en mitades y haciendo match en verde.',
        'Terminal de Postgres corriendo EXPLAIN ANALYZE mostrando el salto de Seq Scan (38,000ms) a Index Scan (2.4ms).'
      ],
      textos_pantalla: ['SIN ÍNDICE: 40 SEGUNDOS', 'CON B-TREE INDEX: 2 MILISEGUNDOS', 'CREATE INDEX ON users(email);'],
      sfx: ['Hojas de papel pasando con frustración', 'Beep de éxito de escáner digital']
    }
  },
  {
    id: 17,
    week: 3,
    day: 'Miércoles',
    category: 'CONCEPTO DEV',
    title: 'Connection Pooling: Por qué tu base de datos colapsa',
    target: 'Desarrolladores backend y fullstack',
    gancho: 'El error número uno que tumba a las startups cuando tienen su primer pico de usuarios no es el código lento: es quedarse sin conexiones en la base de datos.',
    desarrollo: 'Cada vez que tu backend se conecta desde cero a Postgres o MySQL, tiene que hacer todo un ritual pesado: abrir el canal de red, validar seguridad, chequear usuario y contraseña y reservar memoria. Si entran diez usuarios no pasa nada. Pero si te haces viral y entran dos mil personas al mismo tiempo, y tu código abre una conexión nueva por cada clic, la base de datos colapsa en tres segundos con el famoso error "Too many connections". La solución se llama Connection Pooling: en vez de abrir y cerrar la puerta mil veces, dejas veinte conexiones abiertas fijas en una fila. Cuando entra un usuario, usa una conexión prestada por dos milisegundos, hace su consulta y la suelta enseguida para el que viene atrás.',
    cta: 'Con veinte conexiones bien recicladas atiendes a decenas de miles de usuarios sin despeinarte. Guarda este video para que no te agarre desprevenido en producción.',
    edicion: {
      b_rolls: [
        'Diagrama animado de tráfico: Cientos de flechas saturando un icono de base de datos en rojo.',
        'Paso a la fila de conexiones (Pool de 20 canales) despachando a miles de usuarios ordenadamente.',
        'Captura de terminal de PgBouncer gestionando pools activos.'
      ],
      textos_pantalla: ['FATAL: TOO MANY CONNECTIONS', 'CONNECTION POOLING', '20 CONEXIONES PARA 10,000 USUARIOS'],
      sfx: ['Alarma grave de colapso de base de datos', 'Sonido de flujo hidráulico ordenado']
    }
  },
  {
    id: 18,
    week: 3,
    day: 'Jueves',
    category: 'NOTICIA & DEBATE',
    title: 'Guerra civil en Linux: La renuncia por Rust en el Kernel',
    target: 'Programadores de C, Rust, sistemas y kernel developers',
    gancho: 'Se desató una guerra civil dentro de Linux: los programadores de toda la vida en C están bloqueando a los de Rust, y uno de los líderes del proyecto acaba de pegar el portazo en vivo.',
    desarrollo: 'Wedson Almeida, el ingeniero que lideraba la misión de meter el lenguaje Rust dentro del corazón de Linux, renunció harto y dijo que no aguantaba más las trabas ridículas de la vieja guardia. El choque es generacional: siete de cada diez fallos graves de seguridad en sistemas operativos existen porque el lenguaje C te deja equivocarte con la memoria muy fácil. Rust hace que esos errores sean imposibles desde antes de compilar. Pero varios veteranos que llevan treinta años manteniendo Linux en C dijeron básicamente: "a mí nadie me va a obligar a aprender un lenguaje nuevo a mi edad", y empezaron a boicotear los avances en las conferencias. Incluso Linus Torvalds tuvo que salir a calmar las aguas porque el proyecto está partido al medio.',
    cta: 'Te toca ser juez en los comentarios: ¿tienen razón los veteranos en defender su código en C o deberían dar el brazo a torcer por la seguridad de Rust?',
    edicion: {
      b_rolls: [
        'Correo de despedida en la Linux Kernel Mailing List (LKML) con la frase de Wedson destacada.',
        'Video del Linux Summit mostrando a veteranos de C discutiendo tensamente en el micrófono.',
        'Gráfica de Microsoft y Google mostrando que el 70% de bugs críticos son errores de memoria en C/C++.'
      ],
      textos_pantalla: ['GUERRA CIVIL EN LINUX', 'VIEJA GUARDIA DE C VS RUST', '70% DE LOS FALLOS SON DE MEMORIA'],
      sfx: ['Golpe de micrófono tenso', 'Sonido de correo electrónico enviado', 'Campana de debate']
    }
  },
  {
    id: 19,
    week: 3,
    day: 'Viernes',
    category: 'DESARROLLO CON IA',
    title: 'Context Window vs RAG: La trampa de los 2M de tokens',
    target: 'Desarrolladores que construyen apps con IA y CTOs',
    gancho: 'Que un modelo de IA hoy te deje meterle dos millones de tokens en el prompt no significa que tengas que tirarle tu base de datos entera en cada pregunta.',
    desarrollo: 'Cada vez que sale un modelo con ventana de contexto gigante, todo el mundo sale a decir que el RAG murió. Hasta que lo suben a producción y les llega la factura a fin de mes. Si le mandas un libro entero de datos en cada mensaje que escribe un usuario, te pasan tres cosas horribles: primero, cada pregunta te cuesta una fortuna; segundo, el usuario se queda mirando un circulito de carga durante treinta segundos; y tercero, el modelo se marea entre tanta basura y termina inventando datos. La forma inteligente sigue siendo buscar primero qué tres párrafos hablan del tema y pasarle al modelo únicamente esos tres párrafos. Respuesta en medio segundo, cero alucinaciones y cien veces más barato.',
    cta: 'En ingeniería de IA, meter más texto a lo bruto casi siempre es la peor arquitectura. Sígueme si quieres aprender a construir productos con IA que sí sean rentables.',
    edicion: {
      b_rolls: [
        'Gráfico animado comparando costos y tiempo: 2M tokens ($$$ / 35s) vs 3 chunks filtrados ($ / 0.4s).',
        'Diagrama limpio: Búsqueda vectorial extrayendo solo 3 bloques relevantes hacia el modelo.',
        'Contador de latencia cayendo de 35 segundos a 400 milisegundos.'
      ],
      textos_pantalla: ['2M DE TOKENS != BASE DE DATOS', '35 SEGUNDOS VS 400 MILISEGUNDOS', 'FILTRA PRIMERO, PREGUNTA DESPUÉS'],
      sfx: ['Sonido de caja registradora / dinero gastado', 'Click limpio de match vectorial']
    }
  },
  {
    id: 20,
    week: 3,
    day: 'Sábado',
    category: 'NOTICIA & DEBATE',
    title: 'Ataques a la cadena de suministro en npm',
    target: 'Desarrolladores web y líderes técnicos',
    gancho: 'Tu servidor puede tener la mejor seguridad del mundo, pero si haces "npm install" a ciegas, un desconocido puede vaciarte las claves de producción en tres segundos.',
    desarrollo: 'Abre cualquier proyecto moderno de JavaScript: tú instalaste diez librerías conocidas, pero adentro de la carpeta node_modules hay más de mil quinientos paquetes que ni sabes quién escribió. Los hackers ya no pierden tiempo intentando romper tu firewall. Lo que hacen hoy es buscar a algún programador cansado que mantiene una librería chiquita pero que todo el mundo descarga por rebote, le compran o le roban la cuenta, y meten diez líneas de código malicioso. Cuando tu servidor descarga la actualización para compilar, ese script se ejecuta solo, lee tus variables de entorno y les manda tus llaves de AWS y de la base de datos directo a su servidor. Sin tocar una sola línea de tu código.',
    cta: 'Fija las versiones exactas de tus paquetes y desactiva los scripts automáticos en tus despliegues hoy mismo. Mándale esto al encargado de DevOps de tu equipo.',
    edicion: {
      b_rolls: [
        'Terminal corriendo npm audit mostrando alertas críticas en color rojo.',
        'Árbol gigante de dependencias profundas ramificándose en pantalla desde un solo paquete.',
        'Captura de flag --ignore-scripts protegiendo el pipeline de despliegue.'
      ],
      textos_pantalla: ['EL PELIGRO OCULTO DE NPM INSTALL', '1,500 PAQUETES QUE NO CONOCES', 'USA --ignore-scripts EN PRODUCCIÓN'],
      sfx: ['Alarma digital sutil de seguridad', 'Tecleo rápido en consola']
    }
  },

  // --- SEMANA 4 ---
  {
    id: 21,
    week: 4,
    day: 'Lunes',
    category: 'CONCEPTO DEV',
    title: 'Rate Limiting y Token Bucket (El vaso con fichas)',
    target: 'Desarrolladores backend, arquitectos de software y creadores de APIs',
    gancho: '¿Cómo hace un servidor para dejar pasar a un usuario normal que hace diez clics seguidos, pero bloquear al instante a un bot que intenta tumbar la página?',
    desarrollo: 'Si dejas tu API abierta sin filtro, cualquier gracioso con un bucle for en Python te manda diez mil peticiones en un segundo y te funde el servidor o la tarjeta de crédito. Para frenarlo sin molestar a los usuarios reales se usa el algoritmo Token Bucket, o cubo de fichas. Imagínate que a cada usuario le das un vaso con diez fichas. Cada vez que pide algo al servidor, le cobras una ficha. Mientras tanto, el sistema le va regalando dos fichas nuevas cada segundo. Si un humano hace tres clics rápidos, gasta tres fichas y sigue navegando feliz. Pero si entra un bot y tira cincuenta peticiones de golpe, vacía el vaso en un milisegundo y el servidor le cierra la puerta en la cara con un error 429 sin siquiera tocar la base de datos.',
    cta: 'Pon esto en Redis delante de tu login y de tus endpoints de IA antes de salir a producción. Guarda el video para cuando te toque configurarlo.',
    edicion: {
      b_rolls: [
        'Animación minimalista de un contenedor con 10 bloques; peticiones normales gastan y recargan, pero una ráfaga de bot lo vacía y activa bloqueo HTTP 429.',
        'Captura de respuesta en terminal con código HTTP 429 Too Many Requests y cabecera Retry-After: 30.',
        'Diagrama limpio de Redis filtrando por IP antes de llegar al backend.'
      ],
      textos_pantalla: ['ALGORITMO TOKEN BUCKET', 'HTTP 429: TOO MANY REQUESTS', 'BLINDA TU API CON REDIS'],
      sfx: ['Fichas cayendo rítmicamente', 'Sonido de escudo o rebote metálico al saltar el 429', 'Click seco']
    }
  },
  {
    id: 22,
    week: 4,
    day: 'Martes',
    category: 'CONCEPTO DEV',
    title: 'Garbage Collection: Cómo tu lenguaje limpia la memoria',
    target: 'Desarrolladores de lenguajes de alto nivel (JS, Python, Go, Java)',
    gancho: 'Cada vez que creas una variable en tu código estás ocupando un pedacito de memoria RAM. Si tú nunca la borras a mano, ¿por qué tu servidor no explota a las dos horas?',
    desarrollo: 'En lenguajes de la vieja escuela como C, si pides memoria para guardar un dato y te olvidas de liberarla con código cuando terminas de usarla, esa memoria queda secuestrada para siempre. Se llama Memory Leak y te apaga el servidor en pocos días. Por suerte, lenguajes como JavaScript, Python o Go traen un barrendero invisible llamado Garbage Collector. Cada tanto, este proceso frena un instante, mira todas las variables que siguen vivas en tu app y les pone una etiqueta. Todo lo que quedó suelto y sin etiqueta porque ya terminó la función donde vivía, lo barre de un plumazo y recupera esa RAM para que la vuelvas a usar.',
    cta: 'Nos ahorra mil dolores de cabeza, pero cuando el barrendero se pone a limpiar en el peor momento, tu app pega esos famosos micro-tirones. Sígueme para entender cómo funciona tu código por debajo.',
    edicion: {
      b_rolls: [
        'Animación de bloques en memoria RAM: Nodos conectados en verde vs Nodos sueltos en gris.',
        'Línea de barrido limpiando los nodos sueltos y liberando espacio.',
        'Gráfica en diente de sierra del consumo de memoria RAM subiendo y bajando tras cada limpieza.'
      ],
      textos_pantalla: ['GARBAGE COLLECTOR', 'EL BARRENDERO DE LA MEMORIA RAM', 'MARK & SWEEP EN SEGUNDO PLANO'],
      sfx: ['Sonido de escáner digital', 'Efecto de barrido limpio']
    }
  },
  {
    id: 23,
    week: 4,
    day: 'Miércoles',
    category: 'CONCEPTO DEV',
    title: 'Circuit Breaker Pattern (La llave térmica de tu backend)',
    target: 'Desarrolladores backend, cloud engineers y arquitectos de sistemas',
    gancho: 'Si hoy se cae Stripe o se cae una API externa que usa tu app, ¿tu página muestra un mensajito de error y sigue andando, o se muere tu servidor entero con ellos?',
    desarrollo: 'En tu casa tienes una llave térmica: si enchufas una estufa en corto, salta la térmica y corta la luz de ese enchufe para que no se te prenda fuego toda la instalación. En backend existe exactamente el mismo invento y se llama Circuit Breaker. Si tu servidor llama a una API externa que se quedó colgada y tarda treinta segundos en responder, tus usuarios van a empezar a recargar la página desesperados. En dos minutos vas a tener miles de peticiones atoradas esperando respuesta hasta que tu propio servidor reviente. Con un Circuit Breaker, al quinto error seguido el interruptor salta: durante un minuto ni siquiera intenta llamar a la API caída, responde al instante con un plan B y mantiene el resto de tu plataforma volando.',
    cta: 'Que se caiga un proveedor externo no es tu culpa; que tu plataforma entera muera por eso, sí. Guarda este patrón para tu arquitectura.',
    edicion: {
      b_rolls: [
        'Interruptor térmico saltando para cortar un cortocircuito.',
        'Diagrama de tres estados del Circuit Breaker: Cerrado (Normal) -> Abierto (Fallo detectado, respuesta inmediata) -> Semiabierto (Probando si ya volvió).',
        'Gráfica de latencia del servidor manteniéndose plana en 10ms gracias al corte a tiempo.'
      ],
      textos_pantalla: ['PATRÓN CIRCUIT BREAKER', 'LA LLAVE TÉRMICA DE TU BACKEND', 'SI UN PROVEEDOR CAE, TU APP NO'],
      sfx: ['Clack seco de interruptor eléctrico bajando', 'Alarma leve', 'Zumbido suave de estabilidad recuperada']
    }
  },
  {
    id: 24,
    week: 4,
    day: 'Jueves',
    category: 'NOTICIA & DEBATE',
    title: 'Turbopack y la muerte de Webpack: Todo se reescribe en Rust',
    target: 'Desarrolladores frontend, fullstack y arquitectura web',
    gancho: 'Usar herramientas hechas en JavaScript para compilar proyectos gigantes de JavaScript fue un error histórico, y por fin toda la industria lo está corrigiendo con Rust.',
    desarrollo: 'Durante diez años nos acostumbramos a algo absurdo: tocar una línea de código, guardar, y quedarnos mirando la consola treinta segundos esperando a que Webpack terminara de empaquetar todo. ¿Por qué tardaba tanto? Porque JavaScript corre en un solo hilo y no nació para procesar millones de líneas de texto a fuerza bruta. Hoy, las herramientas que mueven la web moderna como Turbopack, Vite con Rolldown o Biome se están reescribiendo desde cero en Rust. Al correr directo sobre el procesador usando todos los núcleos a la vez, lo que antes tardaba medio minuto ahora se actualiza en el navegador en diez milisegundos, antes de que termines de soltar la tecla.',
    cta: 'JavaScript sigue siendo el rey en el navegador, pero por debajo el motor ahora es de Rust. ¿Todavía sufres con Webpack en tu trabajo o ya migraron?',
    edicion: {
      b_rolls: [
        'Cronómetro comparativo: Webpack tardando 42 segundos en compilar vs Turbopack/Rolldown en 15 milisegundos.',
        'Terminal mostrando compilación instantánea al guardar cambios.',
        'Gráfica de todos los núcleos del procesador trabajando en paralelo con Rust.'
      ],
      textos_pantalla: ['EL FIN DE WEBPACK', 'JS EN EL NAVEGADOR, RUST EN EL MOTOR', 'DE 40 SEGUNDOS A 10 MILISEGUNDOS'],
      sfx: ['Reloj lento -> acelerón instantáneo', 'Campana rápida de hot-reload']
    }
  },
  {
    id: 25,
    week: 4,
    day: 'Viernes',
    category: 'DATO CURIOSO',
    title: 'Knight Capital: El bug de $440M en 45 minutos',
    target: 'Devs, inversores y directores de tecnología',
    gancho: 'Un ingeniero se olvidó de actualizar uno de los ocho servidores de la empresa. Cuarenta y cinco minutos después, la compañía había perdido cuatrocientos cuarenta millones de dólares y quebró.',
    desarrollo: 'Pasó en Wall Street con Knight Capital, una de las firmas de inversión más grandes de Estados Unidos. Tenían que subir una actualización a su sistema de compras automáticas antes de que abriera la bolsa. El encargado hizo el deploy a mano: actualizó siete servidores, pero por error se salteó el octavo. Cuando sonó la campana a las nueve y media de la mañana, ese servidor viejo despertó una función de prueba que llevaba ocho años muerta en el código y que nadie había borrado. El servidor se volvió loco: empezó a comprar acciones carísimas y a venderlas centavos más baratas miles de veces por segundo. Perdieron diez millones de dólares por minuto durante cuarenta y cinco minutos hasta que alguien bajó el enchufe.',
    cta: 'Dos lecciones que valen cuatrocientos millones: borra el código muerto y jamás hagas un deploy a mano. Mándale esto a tu equipo.',
    edicion: {
      b_rolls: [
        'Gráfica financiera cayendo en picada vertical.',
        'Titular histórico de Bloomberg: "Knight Capital loss reaches $440 million".',
        'Diagrama de 8 servidores: 7 actualizados en verde y el octavo en rojo disparando órdenes sin control.'
      ],
      textos_pantalla: ['EL BUG DE LOS $440 MILLONES', '7 SERVIDORES ACTUALIZADOS, 1 OLVIDADO', 'JAMÁS DESPLIEGUES A MANO'],
      sfx: ['Campana de apertura de Wall Street', 'Alarma rápida de pérdida financiera', 'Corte seco de corriente']
    }
  },
  {
    id: 26,
    week: 4,
    day: 'Sábado',
    category: 'CONCEPTO DEV',
    title: 'Zero-Downtime Deployment (Blue-Green vs Canary)',
    target: 'DevOps, sysadmins y desarrolladores de producto',
    gancho: 'Si cada vez que subes una versión nueva a producción tienes que tirar la página abajo diez minutos y poner un cartel de "Estamos en mantenimiento", estás trabajando como en el año dos mil.',
    desarrollo: 'Hoy ninguna empresa seria apaga su sistema para actualizarlo. Hay dos formas muy limpias de subir cambios en caliente sin que nadie se entere. La primera se llama Blue-Green: tienes dos servidores gemelos, el Azul que está atendiendo a la gente ahora mismo, y el Verde que está en espera. Subes la versión nueva al Verde, la pruebas tranquilo, y cuando ves que anda joya, cambias una llave en el router para que todo el tráfico pase al Verde en un milisegundo. Si algo falla, vuelves al Azul en un clic. La segunda es Canary: le muestras la versión nueva solo al cinco por ciento de los usuarios. Si no salta ningún error en consola, vas subiendo el porcentaje de a poco hasta llegar al cien.',
    cta: 'Desplegar un martes al mediodía sin transpirar no tiene precio. Guarda este video y compártelo con tu equipo de desarrollo.',
    edicion: {
      b_rolls: [
        'Cartel viejo de "Sitio en mantenimiento" tachándose en rojo.',
        'Diagrama animado de Load Balancer cambiando el flujo del servidor Azul al Verde en un clic.',
        'Barra de tráfico Canary subiendo de 5% a 100% con indicador de 0% errores.'
      ],
      textos_pantalla: ['CERO TIEMPO DE CAÍDA', 'BLUE-GREEN VS CANARY DEPLOY', 'ACTUALIZA SIN APAGAR LA WEB'],
      sfx: ['Sonido de conmutador haciendo clic limpio', 'Campana suave de confirmación']
    }
  }
];

// 1. Build Markdown
let md = '# Plan Editorial SeDev: 26 Guiones de 60 Segundos (Teleprompter & Edición)\n\n';
md += '> **Estructura unificada por pieza:**\n';
md += '> - **🎙️ Guion de Grabación:** Gancho directo (3-5s), Desarrollo en bloque continuo fluido (~130-150 palabras, listo para teleprompter sin interrupciones), y CTA contundente (5-7s).\n';
md += '> - **🎬 Ideas para Edición:** B-rolls específicos para tapar cortes, textos/callouts clave en pantalla y efectos de sonido (SFX) para mantener el ritmo visual y sonoro.\n\n';
md += '---\n\n';

pieces.forEach(p => {
  md += `## PIEZA ${String(p.id).padStart(2, '0')} | ${p.category}\n`;
  md += `### ${p.title}\n`;
  md += `**Semana ${p.week} • ${p.day}** | *Audiencia:* ${p.target}\n\n`;
  md += `#### 🎙️ Guion para Teleprompter\n\n`;
  md += `**Gancho:**\n> "${p.gancho}"\n\n`;
  md += `**Desarrollo:**\n"${p.desarrollo}"\n\n`;
  md += `**CTA:**\n> "${p.cta}"\n\n`;
  md += `#### 🎬 Recursos de Edición & B-Rolls\n\n`;
  md += `**B-Rolls sugeridos:**\n`;
  p.edicion.b_rolls.forEach(b => {
    md += `- 📹 ${b}\n`;
  });
  md += `\n**Textos en pantalla (Callouts):**\n`;
  p.edicion.textos_pantalla.forEach(t => {
    md += `- \`${t}\`\n`;
  });
  md += `\n**Efectos de sonido (SFX):**\n`;
  p.edicion.sfx.forEach(s => {
    md += `- 🔊 *${s}*\n`;
  });
  md += `\n---\n\n`;
});

fs.writeFileSync(path.join('contenido', 'plan-mensual-24-piezas.md'), md, 'utf8');
console.log('Markdown generated successfully! Total pieces:', pieces.length);

// 2. Build Tracker HTML
const trackerHtml = `<!DOCTYPE html>
<html lang="es" class="h-full">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SeDev — Plan Editorial de 60 Segundos</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #fafafa;
      color: #171717;
    }
    ::selection { background-color: #171717; color: #fff; }
    .badge-demo { background: #111; color: #fff; }
    .badge-lore { background: #f0f0f0; color: #444; border: 1px solid #ddd; }
    .badge-dev { background: #f4f4f5; color: #27272a; border: 1px solid #e4e4e7; }
    .badge-news { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
    .badge-ai { background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; }
  </style>
</head>
<body class="min-h-full flex flex-col p-6 md:p-12 max-w-6xl mx-auto">

  <header class="border-b border-neutral-200 pb-8 mb-8">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <p class="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-1">SeDev • Teleprompter & Edición</p>
        <h1 class="text-3xl font-semibold tracking-tight text-neutral-900">Plan Editorial de 60 Segundos</h1>
        <p class="text-sm text-neutral-500 mt-1">26 piezas unificadas: Gancho, texto corrido para teleprompter, CTA y recursos de edición (B-rolls, callouts y SFX).</p>
      </div>

      <div class="flex items-center gap-6 text-sm">
        <div>
          <span class="block text-xs text-neutral-400 uppercase tracking-wider">Grabadas</span>
          <span id="counter" class="text-2xl font-semibold text-neutral-900">0 <span class="text-xs font-normal text-neutral-400">/ 26</span></span>
        </div>
        <div class="w-32">
          <div class="flex justify-between text-xs text-neutral-500 mb-1">
            <span>Avance</span>
            <span id="pct">0%</span>
          </div>
          <div class="w-full bg-neutral-200 rounded-full h-1.5 overflow-hidden">
            <div id="progress-bar" class="bg-neutral-900 h-1.5 rounded-full transition-all duration-300" style="width: 0%"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-neutral-100">
      <div class="flex flex-wrap gap-2 text-xs">
        <button onclick="setFilter('all')" class="filter-btn px-3 py-1.5 rounded-full border border-neutral-900 bg-neutral-900 text-white font-medium">Todos (26)</button>
        <button onclick="setFilter('week-1')" class="filter-btn px-3 py-1.5 rounded-full border border-neutral-200 text-neutral-600 hover:border-neutral-400">Semana 1 (8)</button>
        <button onclick="setFilter('week-2')" class="filter-btn px-3 py-1.5 rounded-full border border-neutral-200 text-neutral-600 hover:border-neutral-400">Semana 2 (6)</button>
        <button onclick="setFilter('week-3')" class="filter-btn px-3 py-1.5 rounded-full border border-neutral-200 text-neutral-600 hover:border-neutral-400">Semana 3 (6)</button>
        <button onclick="setFilter('week-4')" class="filter-btn px-3 py-1.5 rounded-full border border-neutral-200 text-neutral-600 hover:border-neutral-400">Semana 4 (6)</button>
      </div>

      <div class="flex items-center gap-3">
        <select id="filter-cat" onchange="render()" class="text-xs bg-white border border-neutral-200 rounded px-2.5 py-1.5 text-neutral-700 focus:outline-none focus:border-neutral-400">
          <option value="all">Todas las categorías</option>
          <option value="DEMO NEGOCIO">Demos Negocio (3)</option>
          <option value="CONCEPTO DEV">Conceptos Dev (9)</option>
          <option value="DATO CURIOSO">Datos Curiosos (2)</option>
          <option value="NOTICIA & DEBATE">Noticias & Debates (6)</option>
          <option value="DESARROLLO CON IA">Desarrollo con IA (6)</option>
        </select>

        <select id="filter-status" onchange="render()" class="text-xs bg-white border border-neutral-200 rounded px-2.5 py-1.5 text-neutral-700 focus:outline-none focus:border-neutral-400">
          <option value="all">Todos los estados</option>
          <option value="pending">Pendientes</option>
          <option value="done">Grabados</option>
        </select>

        <button onclick="resetData()" class="text-xs text-neutral-400 hover:text-neutral-700 ml-2">Reiniciar</button>
      </div>
    </div>
  </header>

  <main class="flex-1">
    <div id="grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
    <div id="empty" class="hidden text-center py-20 text-sm text-neutral-400">No hay piezas con este filtro.</div>
  </main>

  <!-- Modal Teleprompter & Edición -->
  <div id="modal" class="fixed inset-0 bg-neutral-900/40 backdrop-blur-[2px] z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white border border-neutral-200 rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col shadow-xl overflow-hidden">
      <div class="p-5 border-b border-neutral-100 flex items-start justify-between">
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <span id="modal-category" class="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded"></span>
            <span id="modal-meta" class="text-xs text-neutral-400"></span>
          </div>
          <h2 id="modal-title" class="text-lg font-semibold text-neutral-900"></h2>
          <p id="modal-target" class="text-xs text-neutral-500 mt-0.5"></p>
        </div>
        <button onclick="closeModal()" class="text-neutral-400 hover:text-neutral-800 p-1 text-sm">✕</button>
      </div>

      <div class="p-6 overflow-y-auto space-y-6 flex-1 text-sm leading-relaxed">
        <!-- Teleprompter Box -->
        <div class="border border-neutral-200 bg-neutral-50/60 rounded-md p-4 space-y-3">
          <div class="flex items-center justify-between pb-2 border-b border-neutral-200/60">
            <span class="text-xs font-semibold uppercase tracking-wider text-neutral-700">🎙️ Teleprompter (~60 seg)</span>
            <span class="text-[11px] text-neutral-400">Texto continuo sin cortes</span>
          </div>

          <div>
            <span class="text-[11px] font-semibold uppercase tracking-wider text-amber-700 block mb-0.5">Gancho (3-5s)</span>
            <p id="modal-gancho" class="text-neutral-900 font-medium"></p>
          </div>

          <div>
            <span class="text-[11px] font-semibold uppercase tracking-wider text-blue-700 block mb-0.5">Desarrollo (45-50s)</span>
            <p id="modal-desarrollo" class="text-neutral-800 leading-relaxed"></p>
          </div>

          <div>
            <span class="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 block mb-0.5">CTA (5-7s)</span>
            <p id="modal-cta" class="text-neutral-900 font-medium"></p>
          </div>
        </div>

        <!-- Recursos de Edición Box -->
        <div class="border border-neutral-200 rounded-md p-4 space-y-3">
          <span class="text-xs font-semibold uppercase tracking-wider text-neutral-700 block pb-2 border-b border-neutral-100">🎬 Recursos de Edición & B-Rolls</span>
          
          <div>
            <span class="text-xs font-medium text-neutral-500 block mb-1">B-Rolls Sugeridos:</span>
            <ul id="modal-brolls" class="list-disc list-inside text-neutral-700 text-xs space-y-1"></ul>
          </div>

          <div>
            <span class="text-xs font-medium text-neutral-500 block mb-1">Textos en Pantalla (Callouts):</span>
            <div id="modal-callouts" class="flex flex-wrap gap-1.5"></div>
          </div>

          <div>
            <span class="text-xs font-medium text-neutral-500 block mb-1">Efectos de Sonido (SFX):</span>
            <div id="modal-sfx" class="text-xs text-neutral-600 italic"></div>
          </div>
        </div>
      </div>

      <div class="p-4 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between">
        <label class="flex items-center gap-2 cursor-pointer text-xs text-neutral-700">
          <input type="checkbox" id="modal-check" onchange="toggleFromModal()" class="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-0">
          <span>Marcar como grabado</span>
        </label>
        <button onclick="closeModal()" class="px-4 py-1.5 text-xs bg-neutral-900 text-white rounded hover:bg-neutral-800">Cerrar</button>
      </div>
    </div>
  </div>

  <footer class="mt-12 pt-6 border-t border-neutral-200 text-center text-xs text-neutral-400">
    SeDev • Sistema de Producción de Contenido Técnico & Demos B2B
  </footer>

  <script>
    const plan = ${JSON.stringify(pieces, null, 2)};

    let activeFilter = 'all';
    let currentModalId = null;

    function getSavedState() {
      try {
        return JSON.parse(localStorage.getItem('sedev_recorded_items') || '[]');
      } catch (e) {
        return [];
      }
    }

    function saveState(arr) {
      localStorage.setItem('sedev_recorded_items', JSON.stringify(arr));
      updateProgress();
    }

    function toggleRecorded(id) {
      let saved = getSavedState();
      if (saved.includes(id)) {
        saved = saved.filter(x => x !== id);
      } else {
        saved.push(id);
      }
      saveState(saved);
      render();
    }

    function toggleFromModal() {
      if (currentModalId !== null) {
        toggleRecorded(currentModalId);
        const saved = getSavedState();
        document.getElementById('modal-check').checked = saved.includes(currentModalId);
      }
    }

    function updateProgress() {
      const saved = getSavedState();
      const count = saved.length;
      const total = plan.length;
      const pct = Math.round((count / total) * 100);

      document.getElementById('counter').innerHTML = \`\${count} <span class="text-xs font-normal text-neutral-400">/ \${total}</span>\`;
      document.getElementById('pct').innerText = \`\${pct}%\`;
      document.getElementById('progress-bar').style.width = \`\${pct}%\`;
    }

    function setFilter(f) {
      activeFilter = f;
      document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-neutral-900', 'text-white', 'border-neutral-900');
        btn.classList.add('border-neutral-200', 'text-neutral-600');
      });
      event.target.classList.remove('border-neutral-200', 'text-neutral-600');
      event.target.classList.add('bg-neutral-900', 'text-white', 'border-neutral-900');
      render();
    }

    function getBadgeClass(cat) {
      switch (cat) {
        case 'DEMO NEGOCIO': return 'badge-demo';
        case 'DATO CURIOSO': return 'badge-lore';
        case 'CONCEPTO DEV': return 'badge-dev';
        case 'NOTICIA & DEBATE': return 'badge-news';
        case 'DESARROLLO CON IA': return 'badge-ai';
        default: return 'badge-dev';
      }
    }

    function openModal(id) {
      currentModalId = id;
      const item = plan.find(x => x.id === id);
      if (!item) return;

      const saved = getSavedState();
      document.getElementById('modal-check').checked = saved.includes(id);

      const catBadge = document.getElementById('modal-category');
      catBadge.innerText = item.category;
      catBadge.className = \`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded \${getBadgeClass(item.category)}\`;

      document.getElementById('modal-meta').innerText = \`Semana \${item.week} • \${item.day} • Pieza #\${item.id}\`;
      document.getElementById('modal-title').innerText = item.title;
      document.getElementById('modal-target').innerText = \`Target: \${item.target}\`;

      document.getElementById('modal-gancho').innerText = item.gancho;
      document.getElementById('modal-desarrollo').innerText = item.desarrollo;
      document.getElementById('modal-cta').innerText = item.cta;

      // Edición
      const brollsList = document.getElementById('modal-brolls');
      brollsList.innerHTML = item.edicion.b_rolls.map(b => \`<li>\${b}</li>\`).join('');

      const calloutsBox = document.getElementById('modal-callouts');
      calloutsBox.innerHTML = item.edicion.textos_pantalla.map(t => \`<span class="bg-neutral-100 text-neutral-800 border border-neutral-200 font-mono text-[11px] px-2 py-0.5 rounded">\${t}</span>\`).join('');

      document.getElementById('modal-sfx').innerText = item.edicion.sfx.join(' • ');

      document.getElementById('modal').classList.remove('hidden');
    }

    function closeModal() {
      document.getElementById('modal').classList.add('hidden');
      currentModalId = null;
    }

    function resetData() {
      if (confirm('¿Reiniciar todo el progreso a 0?')) {
        localStorage.removeItem('sedev_recorded_items');
        updateProgress();
        render();
      }
    }

    function render() {
      const grid = document.getElementById('grid');
      const empty = document.getElementById('empty');
      const catFilter = document.getElementById('filter-cat').value;
      const statusFilter = document.getElementById('filter-status').value;
      const saved = getSavedState();

      let filtered = plan.filter(item => {
        if (activeFilter.startsWith('week-')) {
          const w = parseInt(activeFilter.split('-')[1]);
          if (item.week !== w) return false;
        }
        if (catFilter !== 'all' && item.category !== catFilter) return false;
        if (statusFilter === 'pending' && saved.includes(item.id)) return false;
        if (statusFilter === 'done' && !saved.includes(item.id)) return false;
        return true;
      });

      if (filtered.length === 0) {
        grid.innerHTML = '';
        empty.classList.remove('hidden');
        return;
      }

      empty.classList.add('hidden');
      grid.innerHTML = filtered.map(item => {
        const isDone = saved.includes(item.id);
        return \`
          <div class="border \${isDone ? 'border-neutral-200 bg-neutral-50/70 opacity-75' : 'border-neutral-200 bg-white shadow-sm hover:border-neutral-400'} rounded-lg p-5 flex flex-col justify-between transition-all">
            <div>
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded \${getBadgeClass(item.category)}">\${item.category}</span>
                <span class="text-xs text-neutral-400 font-mono">#\${String(item.id).padStart(2, '0')}</span>
              </div>
              <h3 class="font-semibold text-neutral-900 text-sm tracking-tight mb-1">\${item.title}</h3>
              <p class="text-xs text-neutral-500 mb-3">Sem \${item.week} • \${item.day}</p>
              
              <div class="bg-neutral-50 border border-neutral-100 rounded p-2.5 mb-3 text-xs text-neutral-700 italic line-clamp-2">
                "\${item.gancho}"
              </div>
            </div>

            <div class="pt-3 border-t border-neutral-100 flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer text-xs text-neutral-600">
                <input type="checkbox" onchange="toggleRecorded(\${item.id})" \${isDone ? 'checked' : ''} class="w-3.5 h-3.5 rounded border-neutral-300 text-neutral-900 focus:ring-0">
                <span>\${isDone ? 'Grabado' : 'Pendiente'}</span>
              </label>

              <button onclick="openModal(\${item.id})" class="text-xs font-medium text-neutral-900 hover:underline">
                Ver Guion & Edición →
              </button>
            </div>
          </div>
        \`;
      }).join('');
    }

    // Close on escape
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });

    updateProgress();
    render();
  </script>
</body>
</html>`;

fs.writeFileSync(path.join('contenido', 'plan-mensual-24-piezas.md'), md, 'utf8');
fs.writeFileSync(path.join('contenido', 'tracker_contenido_sedev.html'), trackerHtml, 'utf8');
fs.writeFileSync('C:\\\\Users\\\\Edixon\\\\Desktop\\\\tracker_contenido_sedev.html', trackerHtml, 'utf8');
fs.writeFileSync('C:\\\\Users\\\\Edixon\\\\.gemini\\\\antigravity\\\\brain\\\\ba15ad57-1937-46a4-a775-5280885c080b\\\\tracker_contenido_sedev.html', trackerHtml, 'utf8');
console.log('Build completed! Total pieces written:', pieces.length);
