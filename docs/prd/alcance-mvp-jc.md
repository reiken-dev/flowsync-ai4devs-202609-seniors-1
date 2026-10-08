# Alcance MVP — FlowSync (JC)

## 1. El terreno que ya existe

Hoy FlowSync permite crear una cuenta, iniciar sesión, ver el propio perfil y cerrar sesión.
En datos solo existe el usuario y sus sesiones; no existen tareas, proyectos ni equipos.
Para el MVP esto significa que la identidad y el acceso ya están resueltos y no se vuelven a especificar,
y que todo lo relativo a las tareas y a ver el estado del equipo es nuevo.

## 2. El interrogatorio

Preguntas que hizo la IA antes de proponer (una sola ronda), con la respuesta del producto:

1. **¿Quién lo usa y quién decide adoptarlo?** Equipos remotos de 3–10 personas, roles planos, todos ven y editan lo mismo. Caso de estudio: 6 personas, 3 husos horarios, gestor de tareas pesado y daily de 15 min. Lo adopta el propio equipo (supuesto).
2. **¿Qué dolor quita y a quién?** El "¿en qué estás?" constante y el trabajo duplicado (dos personas, mismo módulo, dos días perdidos). Lo cobran los pares, no un manager. Los bloqueos no los resuelve.
3. **¿Qué es "tiempo real"?** Ver los cambios de estado de las tareas sin refrescar ni preguntar. Frescura, no presencia: el estado es de la tarea, no de la persona. Lo actualiza quien hace la tarea, en dos clics.
4. **¿Qué no debe ser?** Ni sprints, ni estimaciones, ni épicas, ni backlog priorizado, ni informes, ni vigilancia. Sustituye al gestor de tareas, no convive con él.
5. **¿Cómo sabremos que funciona?** A una semana de uso real, el equipo cancela la ronda de "¿en qué estás?" de la daily y nadie pide que vuelva.

Supuestos (lo que la ficha no cubría):

- Solo el título es obligatorio; una tarea sin responsable está libre.
- Tres estados fijos, no configurables: pendiente, en curso, hecha.
- La lista actualizada sin refrescar ya es el "resumen que espera". Un resumen de cambios desde la última visita queda en duda.
- Cualquiera con cuenta entra en el espacio único y ve y edita todo; el MVP no controla quién accede. Es un riesgo aceptado, no una función.
- La adopción la decide el equipo, sin comprador ni manager.

Incoherencias que señaló la IA:

- Tiempo real sin presencia: se ve qué cambió en una tarea, pero nunca quién está conectado.
- Sustituir al gestor sin importar nada: el equipo empieza con la lista vacía, lo que agrava el riesgo #1 (información vieja).

Retirado del documento por bajar de nivel: cómo se interpreta la fecha de vencimiento entre husos horarios. Es una regla para un criterio de aceptación, no una decisión de alcance.

## 3. El alcance

### Problema

En un equipo remoto pequeño nadie ve en qué está el resto sin interrumpir a alguien. El coste es doble: la mitad de cada daily se va en la ronda de "¿en qué estás?", y el resto del día en preguntas por chat. Cuando esa ronda no llega a tiempo, dos personas empiezan lo mismo sin saberlo (caso real: mismo módulo, misma semana, dos días perdidos). El gestor de tareas actual no lo evita, porque actualizarlo cuesta tanto que se queda viejo.

### Usuarios

Equipos remotos de 3 a 10 personas con roles planos, donde todos ven y editan lo mismo. Caso de estudio: un equipo de producto SaaS de 6 personas, repartido en 3 husos horarios, con un gestor pesado y una daily de 15 minutos. El valor lo cobran los pares: quien iba a empezar algo ya cogido y quien hoy recibe la pregunta "¿cómo va?". No hay manager como usuario ni como destinatario.

### Propuesta de valor

Una lista compartida que hace a la vez de cola de trabajo personal y de estado del equipo. Actualizarla cuesta dos clics, y quien la actualiza cobra en el momento: decide desde ella qué coger y deja de recibir preguntas. Los demás ven los cambios sin refrescar ni preguntar. La decisión que cambia es no empezar lo que otro ya está tocando y elegir lo siguiente sabiendo qué está libre. No promete eliminar la daily, solo su ronda de "¿en qué estás?".

### Alcance

Una sola vertical de punta a punta: **la lista compartida de tareas, viva**. La cuenta, el acceso y el perfil ya existen y no se vuelven a especificar.

1. **Crear una tarea con solo el título.** El responsable es opcional.
2. **Una única lista compartida** con todas las tareas del espacio, donde se ve de cada una su título, responsable y estado.
3. **Cambiar el estado en dos clics desde la lista**, entre tres estados fijos: pendiente, en curso y hecha.
4. **Coger una tarea libre o cambiar de responsable desde la lista.** Una tarea sin responsable se distingue a simple vista como libre. Sin reasignar, la lista mentiría en cuanto una tarea cambie de manos, y H2 depende de que la lista diga la verdad.
5. **Ver los cambios de los demás sin refrescar**: cualquier tarea creada, cogida o cambiada de estado aparece en la lista abierta de los demás.

### NO-alcance

Cada exclusión dice qué hipótesis no ayuda a validar. Las hipótesis del MVP son dos: (H1) un equipo mantiene el estado al día si cuesta dos clics, y (H2) con ese estado a la vista la ronda de "¿en qué estás?" sobra y no se duplica trabajo.

- **Resumen de cambios "desde tu última visita".** Si la lista viva no basta para ponerse al día al volver, H2 ya habrá fallado por otro motivo. Primero se valida si la lista basta sola.
- **Presencia, "quién está conectado" o indicadores de actividad.** Se rechaza a propósito porque es vigilancia: el estado es de la tarea, no de la persona. Además, convierte el producto en algo que se rellena para que te vean, y eso destruye H1.
- **Historial de quién cambió qué y cuándo.** No cambia la decisión de qué coger, que solo depende del estado actual, y se acerca a la auditoría de personas.
- **Notificaciones (push, email o in-app).** La señal es un resumen que espera, no un aviso que interrumpe. Una notificación reproduce la interrupción que el producto quiere quitar.
- **Integración con Slack.** Supone convivir con otra herramienta y saca la información de la lista, justo cuando H2 depende de que la lista sea el sitio donde se mira.
- **Estado derivado de Git, PRs, CI o calendario.** Es otro producto, con integraciones y OAuth de terceros, y además ocultaría H1: si el estado se rellena solo, nunca sabremos si el equipo lo mantendría a mano.
- **Importar tareas de otro gestor.** La lista vacía es una fricción real del arranque, pero una importación valida que los datos viajan, no que el equipo actualice después (H1). Para 6 personas, volver a teclear lo que está en curso es asumible.
- **Comentarios en tareas.** Convierten la lista en un chat, y la ficha deja fuera explícitamente el chat. No ayudan a saber quién está en qué.
- **Estado "bloqueado" y gestión de bloqueos.** Se asume que el MVP no resuelve los bloqueos, que siguen en la daily. Un cuarto estado haría prometer algo que no se cumple.
- **Estados configurables o flujos de trabajo.** Son exactamente el "rollo de Jira". Tres estados fijos bastan para saber qué está libre, cogido o terminado.
- **Sprints, estimaciones, épicas, backlog priorizado y ordenación manual.** Hay una renuncia explícita. Un equipo que los necesite no es nuestro usuario, y no tocan ni H1 ni H2.
- **Informes, analítica y métricas de equipo.** No hay nadie arriba que los lea. El éxito se mide preguntando al equipo si canceló la ronda, no con un panel.
- **Fecha de vencimiento y marca de pasada de plazo.** La pide la ficha, pero no valida ni H1 ni H2: saber quién está en qué no depende de cuándo vence. Además, cada campo más sube el coste de crear una tarea, que es la condición de H1.
- **Filtrar la lista por estado.** También lo pide la ficha, pero con 3 a 10 personas la lista es corta y lo libre se ve sin filtrar. No cambia ninguna decisión que la lista entera no permita ya.
- **Editar el título u otros datos de una tarea.** Un título mal escrito no hace mentir a la lista: sigue diciendo quién está en qué. Si el error es grave, se crea otra tarea y la mala se marca como hecha.
- **Vista "mis tareas" o filtro por responsable.** La decisión que cambia es "qué está libre", y la marca de libre ya se ve a simple vista en la lista. Una vista por persona empuja a mirar a la gente en vez de al trabajo.
- **Descripción, etiquetas, adjuntos y subtareas.** Cada campo extra sube el coste de crear y actualizar por encima de los "segundos", que es la condición de H1.
- **Borrar o archivar tareas.** "Hecha" cubre el ciclo de vida. Borrar no valida nada. Riesgo aceptado: sin filtro ni archivo, las hechas se acumulan en la lista; en una semana de prueba con 6 personas es asumible.
- **Varios equipos, invitaciones, roles y permisos.** Hay un espacio único con roles planos. El control de acceso queda como riesgo aceptado (ver supuestos), no como función.
- **Edición simultánea de una misma tarea, app móvil y modo sin conexión.** "Tiempo real" significa frescura de la lista, no colaboración sobre un documento. Lo demás amplía canales sin tocar ninguna hipótesis.

---

## Parte B: las tres líneas

1. **Los dos números:** la IA propuso 7 dentro del alcance; quedaron 5.
2. **Tres cosas que dejé fuera, y por qué:**
   - **Fecha de vencimiento:** no ayuda a validar H2, porque saber quién está en qué y qué está libre no depende de cuándo vence nada, y además le añade un campo a crear tarea, en contra de H1.
   - **Filtro por estado:** no ayuda a validar H2, porque con 6 personas la lista entera cabe a la vista y lo libre se distingue sin filtrar; el filtro no cambia ninguna decisión.
   - **Editar una tarea:** no ayuda a validar ni H1 ni H2, porque un título mal escrito no hace mentir a la lista sobre quién está en qué; lo que tiene que poder cambiarse (estado y responsable) ya está dentro.
3. **La exclusión de la que menos seguro estoy:** la fecha de vencimiento. No terminé de entender qué decisión cambia: la ficha la pide "para ver qué se ha pasado de plazo", pero todo lo demás habla de coordinación entre pares, y nadie en este producto mira los retrasos para decidir algo. Chocaban dos cosas que pide la misma ficha: sustituir de verdad al gestor de tareas (y un equipo real tiene entregas con fecha) frente a una vertical fina que solo valide la coordinación. Si la quito, las fechas acabarán apuntadas en otro sitio, y eso es convivir con otra herramienta, justo lo que la ficha dice que mata esta categoría. Entraría si en la semana de prueba el equipo empieza a escribir la fecha dentro del título ("(vence viernes)") o mantiene una lista de plazos fuera de FlowSync.

