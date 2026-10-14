# FS-118 · Fecha de vencimiento y tareas vencidas

**Identificador:** FS-118 · **Épica:** E2 · Gestión de tareas

> **Como** persona del equipo, **quiero** poder indicar una fecha de vencimiento opcional en una tarea (al crearla o después, cambiarla o quitarla) y distinguir de un vistazo las tareas que se han pasado de plazo, **para** ver qué va atrasado sin tener que preguntar a nadie.

## Criterios de aceptación

### A · Poner, cambiar y quitar la fecha

**CA-1 · Crear con fecha**
DADO que estoy creando una tarea,
CUANDO indico un título y una fecha de vencimiento,
ENTONCES la tarea aparece en la lista con esa fecha.

**CA-2 · Crear sin fecha**
DADO que estoy creando una tarea,
CUANDO indico solo el título,
ENTONCES la tarea se crea sin pedirme fecha y no muestra ninguna.

**CA-3 · Añadir la fecha después**
DADO una tarea que no tiene fecha,
CUANDO le añado una fecha de vencimiento,
ENTONCES la tarea pasa a mostrar esa fecha, y el título, el responsable y el estado no cambian.

**CA-4 · Cambiar la fecha**
DADO una tarea con fecha,
CUANDO la cambio por otra,
ENTONCES la tarea muestra solo la nueva fecha.

**CA-5 · Quitar la fecha**
DADO una tarea con fecha,
CUANDO la quito,
ENTONCES la tarea deja de mostrar fecha y deja de poder aparecer como vencida.

**CA-6 · Cualquier persona puede tocar la fecha**
DADO una tarea asignada a otra persona,
CUANDO pongo, cambio o quito su fecha,
ENTONCES el cambio se aplica, igual que con el resto de los cambios de una tarea ajena en el MVP (roles planos).

### B · Cuándo una tarea está vencida

**CA-7 · Vencida**
DADO una tarea con fecha anterior a hoy y cuyo estado no es «hecho»,
CUANDO miro la lista,
ENTONCES la veo distinguida visualmente como vencida.

**CA-8 · El día del vencimiento todavía no está vencida**
DADO una tarea cuya fecha es hoy y que no está hecha,
CUANDO miro la lista,
ENTONCES no aparece como vencida.

**CA-9 · Sin fecha nunca vence**
DADO una tarea sin fecha,
CUANDO pasa el tiempo, sea cual sea su estado,
ENTONCES nunca aparece como vencida.

**CA-10 · Una tarea hecha no vence**
DADO una tarea con fecha anterior a hoy y en estado «hecho»,
CUANDO miro la lista,
ENTONCES no aparece como vencida.

**CA-11 · Terminarla quita el aviso**
DADO una tarea vencida,
CUANDO la marco como «hecho»,
ENTONCES deja de aparecer como vencida.

**CA-12 · Reabrirla la vuelve a marcar**
DADO una tarea en «hecho» cuya fecha es anterior a hoy,
CUANDO la paso a «pendiente» o «en curso»,
ENTONCES vuelve a aparecer como vencida.

**CA-13 · Aplazar la fecha quita el aviso**
DADO una tarea vencida,
CUANDO cambio su fecha a hoy o a un día futuro,
ENTONCES deja de aparecer como vencida.

**CA-14 · Las vencidas se ven con cualquier filtro**
DADO una tarea vencida,
CUANDO filtro la lista por un estado que no es «hecho»,
ENTONCES la tarea sigue apareciendo distinguida como vencida entre las que cumplen el filtro.

**CA-15 · El paso del día se nota al abrir, no en vivo**
DADO una tarea cuya fecha es hoy y no está hecha,
CUANDO llega el día siguiente y abro o actualizo la lista,
ENTONCES aparece como vencida. Con una lista ya abierta desde el día anterior, no tiene por qué cambiar hasta que se actualice (coherente con «al abrir o actualizar»).

**CA-16 · Estar vencida no cambia el estado**
DADO una tarea vencida,
CUANDO pasa el tiempo,
ENTONCES su estado sigue siendo el que puso una persona; el sistema nunca lo modifica por sí solo.

### C · Casos límite y errores

**CA-17 · Fecha inválida**
DADO que estoy poniendo o cambiando una fecha,
CUANDO escribo algo que no es una fecha real (por ejemplo, un 30 de febrero),
ENTONCES el sistema me dice el motivo y la tarea queda como estaba.

**CA-18 · Fecha ya pasada al ponerla**
DADO que estoy poniendo una fecha anterior a hoy en una tarea no hecha,
CUANDO la guardo,
ENTONCES se admite, y la tarea aparece como vencida desde ese momento.

**CA-19 · Husos horarios**
DADO una tarea con fecha de vencimiento y dos personas en husos horarios distintos,
CUANDO cada una la mira un mismo instante,
ENTONCES la fecha es un día de calendario sin hora, y cada persona juzga si está vencida según su propio «hoy». Por eso una tarea puede verse vencida para una y no para la otra, y el MVP lo acepta.

**CA-20 · Dos personas cambian la fecha a la vez**
DADO una tarea cuya fecha cambian dos personas casi a la vez,
CUANDO ambas guardan,
ENTONCES prevalece la última guardada, y quien llegó antes ve la fecha vigente al actualizar.

**CA-21 · Vencer no avisa a nadie**
DADO una tarea que pasa a estar vencida,
CUANDO eso ocurre,
ENTONCES nadie recibe notificación de ningún tipo; se ve solo en la lista.
