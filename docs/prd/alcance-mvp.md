# FlowSync — Alcance del MVP

> Alcance consensuado, base para escribir el PRD. Si algo no está aquí, no está acordado.
> Este documento no contiene diseño técnico: ni modelo de datos, ni endpoints, ni latencias.

**Punto de partida.** Hoy FlowSync permite crear una cuenta, iniciar sesión, ver el propio perfil y cerrar sesión. No existe ninguna noción de tarea, de estado ni de trabajo compartido. La identidad y el acceso ya están resueltos y no se vuelven a especificar.

---

## 1. Problema

Saber en qué anda un compañero cuesta hoy una interrupción o esperar a la daily. La información existe, porque cada persona la tiene en la cabeza, pero no tiene un sitio donde vivir de forma consultable.

El coste tiene dos consecuencias:

- **Trabajo duplicado.** Dos personas empiezan sobre lo mismo porque ninguna sabía de la otra. Episodio de referencia: dos personas tocaron el mismo módulo la misma semana y se perdieron dos días.
- **El impuesto de preguntar.** El «¿en qué estás?» constante por chat, más la ronda equivalente que consume la mitad de los 15 minutos de la daily.

**Qué desaparece y qué no.** Desaparece la ronda de «¿en qué estás?». La daily **no** desaparece entera: la parte de bloqueos sigue viva y este MVP no la resuelve.

## 2. Usuarios

**Usuario primario:** la persona que hace el trabajo, dentro de un equipo remoto plano de 3 a 10 personas. Todos ven y editan lo mismo, sin jerarquía de permisos. El valor lo cobran los pares, no un manager.

**Caso de referencia:** un equipo de 6 personas de producto SaaS, repartido en 3 husos horarios, que hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada.

> **Es un caso de estudio, no un cliente real.** No hay una daily real que cancelar ni una semana de uso que observar. Ninguna afirmación de este documento está validada por uso.

**No-usuarios, explícitamente:**

- El lead o manager que busca visibilidad hacia arriba. No hay reporte ascendente, y diseñar para él haría que el usuario primario escribiese distinto.
- El equipo que necesita planificar (sprints, estimaciones, prioridades, informes). Ese equipo tiene Jira y hace bien en tenerlo.

## 3. Propuesta de valor

> **Ver en qué anda el equipo y qué hay libre, sin interrumpir a nadie.**

FlowSync es la respuesta siempre disponible a una pregunta concreta: *¿en qué está cada uno, y qué hay libre?*, legible sin coste social.

**El intercambio que lo sostiene.** Actualizar cuesta dos clics sobre una lista que la persona ya mira por interés propio, porque es su cola de trabajo. A cambio, deja de recibir interrupciones preguntándole cómo va. El principio de diseño que no se negocia: la superficie donde elijo mi siguiente tarea y la superficie donde cambio el estado son la misma. Si actualizar pasa a ser algo que hago *para que otros vean*, se convierte en reporte y se abandona.

**Decisiones que cambia:**

1. No empezar algo que otra persona ya está tocando.
2. Elegir lo siguiente sabiendo qué está libre.

**Posicionamiento.** Es donde se hace el trabajo, no donde se cuenta. Sustituye al gestor de tareas: FlowSync crea las tareas y no las lee de ningún otro sitio.

**Cómo sabríamos que funciona.** A una semana de uso real, el equipo cancela la ronda de «¿en qué estás?» de la daily y nadie pide que vuelva. Si la siguen haciendo igual, no funcionó. Hoy no es medible, porque no hay equipo real.

## 4. Alcance (IN)

Una sola vertical, terminada de punta a punta: **la lista compartida de tareas**. Prevalece una vertical fina y usable sobre tres a medias.

1. **Una lista única compartida.** Quien se registra queda dentro y ve las tareas de todos, con título, responsable y estado de cada una.
2. **Crear una tarea con solo el título.** La tarea nace asignada a quien la crea y en estado pendiente.
3. **Tres estados fijos y no configurables:** pendiente, en curso y hecho.
4. **Cambiar el estado desde la propia lista, en dos clics.**
5. **Reasignar el responsable.** Es la forma de coger una tarea pendiente de otra persona, y la que hace cumplir «elegir lo siguiente sabiendo qué está libre».
6. **Filtrar la lista por estado**, para centrarse en lo pendiente y sacar de la vista lo hecho.

**Condición transversal:** el trabajo llega con pruebas automáticas.

## 5. NO-alcance (OUT) y por qué

### Recortes sobre lo planteado inicialmente

- **Fecha de vencimiento.** Sirve a planificar, que es lo que se renuncia a hacer, y no sirve a ninguna de las dos decisiones centrales. Es lo primero que se descarta.
- **Actualización en vivo, sin refrescar.** La frescura del MVP es *al abrir o volver a la lista*. Cubre el caso principal («llego por la mañana y veo qué se ha movido»), y la actualización en vivo cuesta mucho para lo que valida. Queda como supuesto a validar, no como promesa.

### Recortes de producto

- **Abrir una tarea (detalle) y editar el título.** Impacto bajo: corregir un título equivale a crear otra tarea, y el detalle solo existiría para alojar campos que ya no están.
- **Borrar tarea.** Es higiene. Una tarea equivocada se marca como hecha y el filtro la saca de la vista.
- **Estado «bloqueado».** Es la mitad de la daily que se declara sin resolver. Añadirlo sería prometer lo que no se entrega.
- **Presencia e indicadores de actividad** («quién está conectado»). Es vigilancia y se rechaza a propósito. El estado es de la tarea, nunca de la persona.
- **Notificaciones push e integración con Slack.** Rompen «resumen que espera, no aviso que interrumpe» y recrearían el problema que se resuelve.
- **Comentarios en tareas.** Convierten la herramienta en chat, y el chat ya existe.
- **Entidad «equipo», varios equipos, roles y permisos.** Con 3 a 10 personas planas, todos ven y editan lo mismo. Es un supuesto, no un olvido.
- **Estado derivado de Git, CI o calendario.** Es otro producto, con integraciones y OAuth de terceros. El estado lo escribe quien hace la tarea.
- **Sprints, estimaciones, épicas, backlog priorizado e informes.** Quien los necesita no es el usuario de FlowSync.
- **Convivir con otro gestor de tareas.** Exige doble actualización, que es como muere esta categoría de producto.

## 6. Supuestos y riesgos anotados, no construidos

- **Información vieja (riesgo #1).** Si el estado se queda sin actualizar, el producto pierde su sentido. La mitigación es que actualizar cueste dos clics, no obligar a nadie. Es lo primero a validar.
- **Espacio único con registro abierto.** Cualquiera que se registre ve y edita todo. Es aceptable para el caso de estudio y no para uso real.
- **«Libre» significa pendiente.** Como toda tarea tiene responsable, una tarea libre es una pendiente que nadie ha empezado.
- **Éxito no validado.** El criterio de la semana de uso real no puede comprobarse hoy.
