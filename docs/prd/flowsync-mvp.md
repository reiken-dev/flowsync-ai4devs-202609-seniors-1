# PRD — FlowSync MVP

> **Estado:** borrador para construir · **Fecha:** 2026-10-13
> **Base de alcance:** [alcance-mvp.md](./alcance-mvp.md). Ese documento manda: si este PRD y el alcance se contradicen, gana el alcance.
> **Nota de documento:** aquí no hay diseño técnico. Ni modelo de datos, ni arquitectura, ni endpoints. Solo qué debe hacer el producto y cómo se comprueba.
> **Convención:** lo que no está decidido ni verificado va marcado como **[SUPUESTO]**.

---

## 1. Problema y contexto

En un equipo remoto, saber en qué anda un compañero cuesta hoy una de dos cosas: **interrumpirle** o **esperar a la daily**. La información existe, porque cada persona la tiene en la cabeza, pero no tiene ningún sitio donde vivir de forma consultable.

El coste no es la ignorancia en sí, sino sus dos consecuencias:

- **Trabajo duplicado.** Dos personas arrancan sobre lo mismo porque ninguna sabía de la otra. Episodio de referencia del equipo: dos personas tocaron el mismo módulo la misma semana y se perdieron dos días.
- **El impuesto de preguntar.** El «¿en qué estás?» constante por chat, más la ronda equivalente que consume la mitad de los 15 minutos de la daily.

**Qué cambia y qué no.** Desaparece la ronda de «¿en qué estás?». La daily **no** desaparece entera: la parte de bloqueos sigue viva y este MVP no la resuelve ni lo pretende.

**Contexto de partida.** Hoy FlowSync solo sabe dar de alta a una persona y dejarla entrar: crear una cuenta, iniciar sesión, ver el propio perfil y cerrar sesión. No existe ninguna noción de tarea, de estado ni de trabajo compartido. Todo eso está por construir.

**Contexto de validación.** El equipo de referencia es un **caso de estudio, no un cliente real**. No hay una daily real que cancelar ni una semana de uso que observar. Ninguna afirmación de este PRD está validada por uso real.

---

## 2. Usuarios y jobs-to-be-done

### Usuario primario

La persona que hace el trabajo, dentro de un equipo remoto **plano de 3 a 10 personas**. Escribe y lee en la misma superficie, y no reporta a nadie: el valor se cobra entre pares. Todos ven y editan lo mismo, sin jerarquía de permisos.

**Perfil de referencia:** equipo de 6 personas de producto SaaS, repartido en 3 husos horarios, que hoy usa un gestor de tareas pesado y una daily de 15 minutos por videollamada.

### Jobs-to-be-done

| # | Job | Situación | Resultado esperado |
|---|---|---|---|
| JTBD-1 | **Saber en qué anda el equipo sin molestar a nadie** | Llego por la mañana, o vuelvo de una reunión larga | Veo quién está en qué sin escribir a nadie ni esperar a la daily |
| JTBD-2 | **No empezar algo que otra persona ya está tocando** | Voy a arrancar una tarea nueva | Compruebo antes si ya hay alguien encima |
| JTBD-3 | **Elegir lo siguiente sabiendo qué está libre** | Acabo de cerrar algo y necesito lo próximo | Veo qué está pendiente y sin empezar, y puedo cogerlo |
| JTBD-4 | **Dejar constancia de en qué estoy sin que me cueste nada** | Me pongo con algo, o lo termino | Lo registro en un gesto sobre una lista que ya tengo abierta |
| JTBD-5 | **Dejar de recibir preguntas sobre cómo voy** | Estoy concentrado en una tarea | Mi estado está publicado, así que nadie necesita preguntarme |

JTBD-4 y JTBD-5 son la contrapartida que sostiene todo lo demás: quien escribe cobra en el momento, no solo quienes leen.

### No-usuarios, explícitamente

- **El lead o manager que busca visibilidad hacia arriba.** No hay reporte ascendente. Diseñar para esa persona haría que el usuario primario escribiese distinto, y se perderían los dos.
- **El equipo que necesita planificar** (sprints, estimaciones, prioridades, informes). Ese equipo tiene Jira y hace bien en tenerlo.

---

## 3. Propuesta de valor

> **Ver en qué anda el equipo y qué hay libre, sin interrumpir a nadie.**

FlowSync es la respuesta a una pregunta concreta, *¿en qué está cada uno y qué hay libre?*, disponible cada vez que se consulta y legible **sin coste social**.

### El intercambio que lo sostiene

Actualizar cuesta dos clics sobre una lista que la persona **ya está mirando por su propio interés**, porque esa lista es su cola de trabajo. A cambio, deja de recibir interrupciones preguntándole cómo va. De ahí el principio de diseño que no se negocia:

> **La superficie donde elijo mi siguiente tarea y la superficie donde cambio el estado son la misma.**

En cuanto actualizar deje de ser algo que hago *para mí* y pase a ser algo que hago *para que otros vean*, se convierte en reporte, y el reporte se abandona.

### Decisiones que cambia

1. No empezar algo que otra persona ya está tocando.
2. Elegir lo siguiente sabiendo qué está libre.

### Posicionamiento

Es **donde se hace el trabajo**, no donde se cuenta. Sustituye al gestor de tareas: FlowSync crea las tareas y no las lee de ningún otro sitio. Convivir con otro gestor exigiría doble actualización, que es como muere esta categoría de producto.

### Qué significa «ver sin preguntar» aquí

La frescura del MVP es **al abrir o volver a la lista**: quien llega ve el estado actual del equipo. **Eso no es «ahora mismo».** Una lista que lleva horas abierta puede mostrar un estado viejo, y el MVP ni lo detecta ni lo avisa: la promesa es «al día cada vez que se abre o se actualiza», no «al día en todo momento». Es frescura, no presencia: el estado es de la **tarea**, nunca de la persona. No hay chat, ni videollamada, ni indicadores de quién está conectado. La señal es un resumen que espera, no un aviso que interrumpe.

---

## 4. Alcance / Fuera de alcance

### 4.1 Dentro (la vertical)

**Entro, veo en qué anda el equipo, cambio el estado de lo mío en un gesto y otra persona lo ve sin preguntarme.**

Una capability terminada de punta a punta, no el andamiaje amplio de un producto.

1. Una lista única compartida: quien se registra queda dentro y ve las tareas de todos.
2. Crear una tarea con solo el título.
3. Tres estados fijos y no configurables: pendiente, en curso y hecho.
4. Cambiar el estado desde la propia lista, en dos clics.
5. Reasignar el responsable.
6. Filtrar la lista por estado.
7. Fecha de vencimiento opcional.

Condición transversal: el trabajo llega con pruebas automáticas.

### 4.2 Fuera, y por qué

| Fuera | Motivo |
|---|---|
| Actualización en vivo, sin refrescar | La frescura del MVP es al abrir la lista. Cubre el caso principal y la actualización en vivo cuesta mucho para lo que valida. |
| Abrir una tarea (detalle) y editar el título | Impacto bajo: corregir un título equivale a crear otra tarea. |
| Borrar tarea | Es higiene. Una tarea equivocada se marca como hecha y el filtro la saca de la vista. |
| Estado «bloqueado» | Es la mitad de la daily que se declara sin resolver. |
| Presencia e indicadores de actividad | Es vigilancia y se rechaza a propósito. |
| Notificaciones push e integración con Slack | Rompen «resumen que espera, no aviso que interrumpe». |
| Comentarios en tareas | Convierten la herramienta en chat. |
| Entidad «equipo», varios equipos, roles y permisos | Con 3 a 10 personas planas, todos ven y editan lo mismo. |
| Estado derivado de Git, CI o calendario | Es otro producto, con integraciones de terceros. |
| Sprints, estimaciones, épicas, backlog priorizado e informes | Quien los necesita no es el usuario de FlowSync. |
| Convivir con otro gestor de tareas | Exige doble actualización. |

---

## 5. Épicas del MVP

- **E1 · Cuentas y acceso** — Registrarse, entrar, ver el propio perfil y salir; quien se registra queda dentro del espacio compartido. *Ya existe en gran parte; solo se añade el acceso al espacio.*
- **E2 · Gestión de tareas** — Crear tareas, cambiarles el estado, reasignarlas, ponerles fecha de vencimiento y filtrar la lista por estado.
- **E3 · Actividad del equipo** — Ver las tareas de todo el equipo en una única lista compartida y con el estado al día cada vez que se abre.

---

## 6. Requisitos funcionales (a nivel producto)

Cada requisito dice qué debe hacer el sistema y cómo se comprueba. No describe cómo se construye.

### E1 · Cuentas y acceso

- **RF-1.** Una persona puede crear una cuenta, iniciar sesión, ver su propio perfil y cerrar sesión. *Ya existe; no se vuelve a especificar y no debe romperse.*
- **RF-2.** Toda persona con sesión iniciada accede al **mismo espacio compartido** y ve las mismas tareas que el resto. Una persona sin sesión no ve ninguna tarea.

### E2 · Gestión de tareas

- **RF-3.** Cualquier persona con sesión puede crear una tarea indicando **solo el título**. La tarea queda creada sin pedir ningún otro dato.
- **RF-4.** No se puede crear una tarea sin título, ni con un título formado solo por espacios. El sistema indica el motivo y no crea la tarea.
- **RF-5.** Toda tarea nace **asignada a quien la crea** y en estado **pendiente**. Ninguna tarea puede existir sin responsable.
- **RF-6.** Una tarea tiene exactamente uno de tres estados: **pendiente, en curso o hecho**. El conjunto es fijo y no se puede configurar.
- **RF-7.** Cualquier persona con sesión puede cambiar el estado de cualquier tarea **desde la propia lista**, en **dos clics o menos**, sin abrir otra pantalla.
- **RF-8.** Cualquier persona con sesión puede cambiar el responsable de una tarea, incluida una asignada a otra persona, y puede asignársela a sí misma. El responsable debe ser siempre una persona con cuenta.
- **RF-9.** Una tarea puede tener una **fecha de vencimiento opcional**, que se puede añadir al crearla o después, cambiar y quitar.
- **RF-10.** Una tarea está **vencida** si tiene fecha de vencimiento anterior a hoy y su estado no es hecho. Una tarea sin fecha nunca aparece como vencida, y una tarea hecha tampoco. La lista distingue visualmente las vencidas.
- **RF-11.** La lista se puede **filtrar por estado** (pendiente, en curso o hecho). Sin filtro se ven todas. Quitar el filtro devuelve la lista completa.

### E3 · Actividad del equipo

- **RF-12.** La lista muestra, para cada tarea: título, responsable, estado y fecha de vencimiento si la tiene.
- **RF-13.** Lo que hace una persona (crear, reasignar, cambiar de estado) lo ven las demás **al abrir o volver a la lista**, sin que nadie tenga que preguntar. Actualizar a mano la lista siempre muestra el estado más reciente.
- **RF-14.** La lista **no muestra** quién está conectado ni ningún indicador de actividad de las personas. El estado pertenece a la tarea.
- **RF-15.** El sistema **no envía notificaciones** (push, correo, chat) como consecuencia de los cambios en las tareas.
- **RF-16.** Si dos personas modifican la misma tarea casi a la vez, el sistema conserva un resultado coherente y quien llega tarde ve el estado vigente al refrescar. **[SUPUESTO]** La regla es que prevalece el último cambio guardado; es una decisión de producto pendiente de confirmar.
- **RF-17.** El **orden** de la lista es estable y predecible entre visitas. **[SUPUESTO]** Orden por creación, la más reciente primero; la regla definitiva se decide al detallar las historias.

---

## 7. Requisitos no funcionales

Las cifras marcadas como supuesto son de partida para poder comprobarlas, no resultado de medición.

- **RNF-1. Esfuerzo de actualización.** Cambiar el estado de una tarea cuesta **como máximo dos clics** y ninguna pantalla intermedia. Es el requisito que sostiene la propuesta de valor.
- **RNF-2. Coste de creación.** Crear una tarea no pide más que el título. **[SUPUESTO]** Una persona entrenada la crea en menos de 10 segundos.
- **RNF-3. Fluidez con el tamaño esperado.** La lista sigue siendo usable con el uso previsto: 3 a 10 personas. **[SUPUESTO]** Hasta unas 500 tareas en total sin degradación apreciable.
- **RNF-4. Datos al día.** Tras cualquier cambio, quien abre o actualiza la lista ve el dato nuevo y no uno antiguo.
- **RNF-5. Privacidad entre personas ajenas.** Quien no tiene sesión no puede ver ninguna tarea. Dentro del espacio, todos ven todo (ver riesgos).
- **RNF-6. Fecha entre husos horarios.** **[SUPUESTO]** La fecha de vencimiento es un **día de calendario sin hora**, y «hoy» se entiende en la zona horaria de quien mira. Con 3 husos horarios, una tarea puede aparecer vencida un día distinto para dos personas; el MVP lo acepta.
- **RNF-7. Navegadores.** **[SUPUESTO]** Funciona en las versiones recientes de los navegadores de escritorio habituales. Móvil queda fuera de la primera entrega.
- **RNF-8. Verificabilidad.** Todo requisito funcional llega con pruebas automáticas que lo comprueban. Hoy no existe ninguna base de pruebas en el repositorio, y su coste de arranque lo asume el primer trabajo que las exija.
- **RNF-9. No regresión de acceso.** Lo que ya funciona (registro, inicio y cierre de sesión, perfil) sigue funcionando igual.

---

## 8. Restricciones

- **Stack actual, sin cambios:** backend AdonisJS 7 y frontend React 19. Este PRD no propone cambiar el stack.
- **La autenticación ya existe** (RF-1). No se reespecifica ni se rehace; el MVP se apoya en ella.
- **No hay nada de tareas todavía.** Todo lo de E2 y E3 se construye desde cero.
- **Una sola vertical.** Prevalece una capability terminada de punta a punta sobre tres a medias. Si el tiempo aprieta, lo primero que se recorta es la fecha de vencimiento (RF-9 y RF-10).
- **Espacio único.** No hay noción de equipo: quien se registra entra en el mismo espacio. **[SUPUESTO]** Registro abierto aceptable solo para el caso de estudio; antes de un uso real habría que decidir quién puede entrar.
- **Sin validación real.** No hay equipo ni cliente reales; las métricas de la sección 9 no pueden medirse hoy.

---

## 9. Métricas de éxito

**Métrica principal (no medible hoy).** A una semana de uso real, el equipo **cancela la ronda de «¿en qué estás?» de la daily y nadie pide que vuelva**. Si la siguen haciendo igual, no funcionó. No hay equipo real, así que esta métrica no puede comprobarse con el caso de estudio.

**Lo que sí se puede comprobar hoy** (criterios de aceptación del MVP):

| Métrica | Cómo se comprueba | Umbral |
|---|---|---|
| Recorrido completo | Una persona se registra, crea una tarea, la pasa a en curso y otra persona la ve al abrir la lista | Funciona de punta a punta |
| Coste de actualizar | Contar los clics para cambiar el estado desde la lista | ≤ 2 |
| Coste de crear | Crear una tarea con solo el título | Sin más campos obligatorios |
| Cobertura del alcance | Cada requisito RF-1 a RF-17 tiene al menos una prueba automática que pasa | 100 % |

**Métricas de seguimiento en uso real** (para cuando exista un equipo). Los umbrales son **[SUPUESTO]** y deben fijarse antes de medir:

- **Información al día:** proporción de tareas «en curso» cuyo estado se ha tocado en los últimos días. Es el riesgo #1; si baja, el producto pierde su sentido.
- **Adopción:** proporción de las personas del equipo que cambian el estado de al menos una tarea cada semana.
- **Duplicados evitados:** número de veces que alguien dice haber visto en la lista que otra persona ya estaba con algo. Se recoge en una conversación, no se infiere.

**Riesgos que afectan a las métricas:**

- **Información vieja (riesgo #1).** La mitigación es que actualizar cueste dos clics, no obligar a nadie.
- **Éxito no validado.** El criterio de la semana de uso real no puede comprobarse hoy.
- **La fecha de vencimiento no sirve a las dos decisiones centrales.** Se mantiene por decisión explícita y es lo primero que se recorta.

---

## 10. Puntos abiertos

Salen de una revisión adversarial del propio PRD. Ninguno está decidido. Cada uno lleva el argumento resumido y lo que haría falta para decidirlo. La fecha de vencimiento y el filtrado por estado **siguen dentro del alcance, bajo E2**: los puntos que los cuestionan están aquí y no mueven nada al fuera de alcance.

### 10.1 Decisiones de producto

- **PO-1 · Cola personal y lectura por persona (RF-11, RF-12).** *Argumento:* el intercambio que sostiene el producto es que la lista es la cola de trabajo de cada persona, pero ningún requisito permite ver «lo mío» ni agrupar por responsable. Sin eso, actualizar se parece a reportar. *Para decidir:* observar cómo elige su siguiente tarea una persona del caso de referencia y probar una lista de unas 20 tareas de 6 personas con tres lentes (filtro por responsable, agrupación, vista aparte).
- **PO-2 · Orden de la lista (RF-17).** *Argumento:* el orden por creación no responde a «quién está en qué». Depende de PO-1. *Para decidir:* resolver PO-1 y comparar orden por creación, por estado y por responsable.
- **PO-3 · Qué cuenta como «volver a la lista» y si se avisa de la antigüedad (RF-13).** *Argumento:* sin saber cuánto hace que cambió una tarea, el lector no sabe cuánto fiarse, y es la única defensa directa contra el riesgo #1. Un indicador de antigüedad es de la tarea, no de la persona, así que no choca con RF-14. Una actualización periódica de la lista tocaría el recorte de la actualización en vivo. *Para decidir:* definir si cambiar de pestaña o una actualización periódica cuentan como «volver», y qué coste de construcción tiene cada opción.
- **PO-4 · Conflictos de edición (RF-16).** *Argumento:* con listas viejas por diseño, dos personas tocando la misma tarea no es un caso raro, y «prevalece el último» pierde un cambio en silencio. *Para decidir:* con qué frecuencia coinciden en la misma tarea en el equipo de referencia y cuánto cuesta perder un cambio frente a avisar.
- **PO-5 · Arranque con la lista vacía.** *Argumento:* el producto sustituye al gestor actual y no importa nada, así que el primer día la lista está vacía o desactualizada, justo cuando se evalúa. Este riesgo no estaba en el PRD. *Para decidir:* cuánto trabajo en curso tiene el equipo al empezar y si bastaría una carga manual inicial o hace falta importar.
- **PO-6 · Qué es «libre» y reasignar sin aviso (RF-5, RF-8, RF-15).** *Argumento:* toda tarea tiene responsable, así que «libre» significa «pendiente de alguien». Cualquiera puede quedarse la tarea de otro sin avisarle, y la persona afectada se entera al abrir la lista. *Para decidir:* si el equipo necesita tareas sin dueño (eso rompe RF-5) o basta una convención social, y si reasignar la tarea de otro requiere algún aviso dentro de la propia lista.
- **PO-7 · Vista por defecto y acumulación de tareas hechas (RF-11, RNF-3).** *Argumento:* sin borrar ni archivar, las tareas hechas se acumulan en la vista sin filtro. Mi estimación, no medida, es del orden de cientos al año para 6 personas, por encima del supuesto de RNF-3. El filtro por estado se mantiene. *Para decidir:* medir el volumen real de tareas por semana y decidir si la vista por defecto oculta las hechas sin quitar la posibilidad de verlas.
- **PO-8 · Fecha de vencimiento entre husos horarios (RF-9, RF-10, RNF-6).** *Argumento:* con 3 husos horarios, «hoy» depende de quien mira, y una tarea puede aparecer vencida un día distinto para dos personas. La fecha se mantiene en E2. *Para decidir:* elegir la referencia de «hoy» (la de quien mira, la de quien creó la tarea o una zona fija del equipo) con ejemplos de los 3 husos.
- **PO-9 · Aviso de títulos parecidos (RF-3, RF-4).** *Argumento:* el dolor principal es el trabajo duplicado, y nada avisa si alguien crea una tarea igual a otra. *Para decidir:* si merece construirse un aviso o basta con que la persona mire la lista antes, y cuánto cuesta.
- **PO-10 · Registro abierto, trazabilidad y deshacer (RF-2, RF-8).** *Argumento:* cualquiera que se registre ve y modifica todo, incluido asignar tareas a cuentas ajenas al equipo, sin registro de quién cambió qué. Es aceptable para el caso de estudio y no para uso real. *Para decidir:* dónde se despliega, quién puede registrarse y si hace falta algún rastro de cambios antes de usarlo con un equipo real.
- **PO-11 · Móvil (RNF-7).** *Argumento:* el caso de uso es «llego por la mañana» o «vuelvo de una reunión», y no hay datos de que sea desde el escritorio. *Para decidir:* cómo consultan hoy el estado las personas del equipo de referencia.
- **PO-12 · Criterio de fracaso de la métrica principal (sección 9).** *Argumento:* la métrica principal no se puede medir hoy y tampoco dice qué resultado significa «no funcionó» ni qué se haría entonces. *Para decidir:* fijar antes de medir qué resultado tras una semana equivale a fracaso y qué decisión se toma.
- **PO-13 · Significado de «actividad» en E3 (RF-14).** *Argumento:* la épica se llama «Actividad del equipo» y RF-14 prohíbe indicadores de actividad de las personas. Se entiende como cambios en las tareas, no en las personas, pero no está dicho. *Para decidir:* confirmar que ese es el sentido o renombrar la épica.

### 10.2 Se resuelven durante la construcción

- **Qué cuenta como «dos clics» y «pantalla intermedia» (RF-7, RNF-1).** Se fija al diseñar la interacción y se comprueba con una prueba de interacción.
- **Cómo se distingue una tarea vencida (RF-10).** Se decide al diseñarlo, con un criterio que una prueba pueda comprobar.
- **Límites del título (RF-4).** Longitud máxima y tratamiento de espacios.
- **«Persona entrenada» y «versiones recientes» (RNF-2, RNF-7).** Se sustituyen por un criterio medible y una lista concreta de navegadores.
- **Base de pruebas (RNF-8).** No existe ninguna, y RF-1 (la autenticación que ya funciona) tampoco tiene pruebas. La métrica de cobertura incluye RF-1. El primer trabajo que las exija carga con el coste de montarlas.
- **Métricas de seguimiento (sección 9).** Falta definir «los últimos días», qué umbral de adopción vale y cómo se recogen los duplicados evitados. Además, medir la información al día exige registrar cuándo cambia cada estado, y ningún requisito lo pide todavía.
