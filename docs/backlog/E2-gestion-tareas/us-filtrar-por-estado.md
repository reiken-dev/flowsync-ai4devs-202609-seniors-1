# FS-142 · Filtrar la lista por estado

**Identificador:** FS-142 · **Épica:** E2 · Gestión de tareas

> **Como** persona del equipo, **quiero** filtrar la lista de tareas por estado (pendiente, en curso o hecho) **para** centrarme en lo pendiente y apartar de la vista lo que ya está hecho.

## Criterios de aceptación

### A · Filtrar y quitar el filtro

**CA-1 · Filtrar por un estado**
DADO una lista con tareas en los tres estados,
CUANDO filtro por un estado (pendiente, en curso o hecho),
ENTONCES veo solo las tareas de ese estado, sean de quien sean, y ninguna de otro estado.

**CA-2 · Quitar el filtro**
DADO una lista filtrada por un estado,
CUANDO quito el filtro,
ENTONCES vuelvo a ver todas las tareas, sin importar su estado.

**CA-3 · Sin filtro se ve todo**
DADO que abro la lista sin haber elegido ningún filtro,
CUANDO se muestra,
ENTONCES veo todas las tareas, incluidas las hechas. Qué muestra la vista por defecto sigue abierto en PO-7.

**CA-4 · El filtro muestra al equipo entero, no solo lo mío**
DADO una lista filtrada por un estado,
CUANDO miro el resultado,
ENTONCES incluye las tareas de todas las personas del equipo con ese estado. Ver «solo lo mío» no está en el MVP (PO-1).

**CA-5 · Se sabe qué filtro está activo**
DADO una lista filtrada,
CUANDO la miro,
ENTONCES veo qué estado estoy filtrando, para no confundir una lista corta con el total del equipo.

**CA-6 · Un solo estado a la vez**
DADO que quiero ver «todo lo que no está hecho»,
CUANDO uso el filtro,
ENTONCES solo puedo elegir un estado cada vez; combinar dos estados no está en el MVP.

### B · Resultados vacíos y estados que no existen

**CA-7 · Estado válido sin tareas**
DADO que no hay ninguna tarea en un estado válido (por ejemplo, ninguna «en curso»),
CUANDO filtro por ese estado,
ENTONCES la lista aparece vacía con un mensaje que dice que no hay tareas en ese estado. Una lista vacía por falta de tareas es un resultado correcto, distinto de un error.

**CA-8 · Estado que no existe**
DADO que se pide ver las tareas de un estado que no existe (por ejemplo, «bloqueado» o «archivado»),
CUANDO el sistema recibe esa petición,
ENTONCES me avisa de que ese estado no existe y me dice cuáles hay (pendiente, en curso y hecho).
Y no muestra una lista vacía como si fuera un resultado válido, ni cambia a otro filtro o a «todas» sin decírmelo.

### C · Filtro y el resto de la lista

**CA-9 · Cambiar el estado con el filtro activo**
DADO una lista filtrada por «pendiente»,
CUANDO paso una de sus tareas a «en curso»,
ENTONCES deja de aparecer en esa vista porque ya no cumple el filtro, y el sistema me confirma que se movió a «en curso» para que no parezca que se perdió.

**CA-10 · Crear una tarea con otro filtro activo**
DADO una lista filtrada por un estado que no es «pendiente»,
CUANDO creo una tarea (que nace pendiente),
ENTONCES la creación se confirma y se me dice que está en «pendiente», aunque no la vea en la vista filtrada.

**CA-11 · Actualizar conserva el filtro**
DADO una lista filtrada,
CUANDO actualizo la lista,
ENTONCES sigo viendo el mismo filtro y los cambios que hicieron otras personas.

**CA-12 · Las vencidas siguen distinguidas**
DADO una lista filtrada que incluye una tarea vencida,
CUANDO la miro,
ENTONCES esa tarea aparece distinguida como vencida, igual que sin filtro.

**CA-13 · El orden no cambia**
DADO una lista filtrada,
CUANDO la miro,
ENTONCES las tareas siguen en el mismo orden relativo que tienen sin filtro.

**CA-14 · Sin sesión no hay lista**
DADO una persona sin sesión iniciada,
CUANDO intenta ver tareas, con filtro o sin él,
ENTONCES no ve ninguna.
