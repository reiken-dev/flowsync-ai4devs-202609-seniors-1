# Backlog del MVP: E2 · Gestión de tareas

> **Origen:** [PRD del MVP](../prd/flowsync-mvp.md) y [alcance del MVP](../prd/alcance-mvp.md). Los criterios de aceptación viven en las historias. Este archivo recoge lo que cruza historias: la matriz de impacto y complejidad y el orden del backlog.

## Qué hay en esta carpeta

| Archivo | Contenido |
|---|---|
| [`E2-gestion-tareas/us-fechas-vencimiento.md`](./E2-gestion-tareas/us-fechas-vencimiento.md) | Historia **FS-118** con sus criterios de aceptación |
| [`E2-gestion-tareas/tickets-fechas-vencimiento.md`](./E2-gestion-tareas/tickets-fechas-vencimiento.md) | Tickets FS-118.1 a FS-118.10, grafo de dependencias y orden de implementación |
| [`E2-gestion-tareas/us-filtrar-por-estado.md`](./E2-gestion-tareas/us-filtrar-por-estado.md) | Historia **FS-142** con sus criterios de aceptación |
| [`E2-gestion-tareas/tickets-filtrar-por-estado.md`](./E2-gestion-tareas/tickets-filtrar-por-estado.md) | Tickets FS-142.1 a FS-142.7 y orden sugerido |

Solo FS-118 y FS-142 están descompuestas en criterios y tickets. El resto de historias de la matriz son una valoración a nivel de historia, con menos base.

**Sobre los nombres.** Los únicos identificadores fijados son FS-118 y FS-142. Las etiquetas E2-1 a E2-6 son nombres provisionales de trabajo para el resto de historias del MVP:

| Etiqueta | Historia |
|---|---|
| E2-1 | Crear una tarea con solo el título |
| E2-2 | No crear tareas sin título |
| E2-3 | La tarea nace mía y pendiente |
| E2-4 | Cambiar el estado desde la lista |
| E2-5 | Quedarme con una tarea pendiente de otra persona |
| E2-6 | Asignar una tarea a otra persona |

---

## Matriz impacto / complejidad

**Impacto** es cuánto sirve a la promesa central: *ver en qué anda el equipo y qué hay libre, sin interrumpir a nadie*. **Complejidad** es el esfuerzo relativo de construcción, no el riesgo. Ambas valoraciones son cualitativas, no medidas.

Las historias marcadas *(fuera)* están fuera del MVP o sin decidir. Se incluyen para que quede claro por qué no entran.

| Impacto \ Complejidad | Baja | Media | Alta |
|---|---|---|---|
| **Alto** | ★ E2-3 Nace mía y pendiente<br>★ «Mis tareas» / agrupar por responsable *(fuera, PO-1)* | E2-4 Cambiar estado desde la lista<br>E2-5 Quedarme con una tarea ajena<br>FS-142 Filtrar por estado | E2-1 Crear tarea con solo el título |
| **Medio** | E2-2 Título obligatorio<br>Ocultar «hecho» en la vista por defecto *(fuera, PO-7)* | Estado «bloqueado» *(fuera)*<br>Refresco periódico de la lista *(variante barata del sync)* | Sync en tiempo real (E3) *(fuera)*<br>Avisar a quien pierde una tarea *(fuera)* |
| **Bajo** | Editar título *(fuera)*<br>Borrar tarea *(fuera)*<br>E2-6 Asignar a otra persona | FS-118 Fecha de vencimiento<br>Abrir tarea / detalle *(fuera)*<br>Prioridad, estimación, etiquetas *(fuera)* | Comentarios en tareas *(fuera)* |

### Quick wins (★ alto impacto, baja complejidad)

Salen solo dos, y ninguno es limpio:

- **★ E2-3 · Nace mía y pendiente.** Es lo que hace que crear cueste segundos. Es casi gratis solo si se entrega con E2-1, porque no tiene valor por separado.
- **★ «Mis tareas» / agrupar por responsable.** Es el hueco señalado en la revisión del PRD (PO-1): sin esto, actualizar se parece a reportar. Reutiliza el mecanismo de filtrado de FS-142, por eso es barato una vez existe. Está fuera del MVP hasta que se decida PO-1.

El backlog tiene pocos quick wins porque el dominio parte de cero: casi todo lo de alto impacto cuelga de crear tareas y de la lista compartida.

### Notas sobre las posiciones menos obvias

- **Sync en tiempo real: impacto medio, complejidad alta.** El PRD lo recortó a propósito. Sirve al caso de duplicados a mitad del día, pero no al caso estrella de la mañana. Es la pieza más cara del backlog y mejora la frescura de unos datos que quizá estén viejos de todos modos (riesgo #1).
- **Refresco periódico: la variante barata.** Una actualización cada pocos segundos cubre buena parte de lo que aporta el sync real con bastante menos coste. Es PO-3: toca el recorte de la actualización en vivo y requiere decidirlo.
- **FS-118: impacto bajo.** El propio PRD reconoce que no sirve a las dos decisiones centrales. Está dentro por decisión, no por lo que aporta.
- **FS-142: impacto alto con una condición.** Si PO-7 acaba ocultando lo hecho en la vista por defecto, el filtro pierde parte de su valor.
- **Avisar al perder una tarea: impacto medio, pero choca con RF-15** (no hay notificaciones). No es solo caro, contradice una decisión.

---

## Orden de backlog priorizado

La dependencia manda sobre el impacto: nada de E2 se ve sin la lista.

| # | Historia | Motivo |
|---|---|---|
| 1 | **Base de pruebas + lista compartida (E3)** | Es el sustrato. No es de E2, pero todo lo demás cuelga de aquí |
| 2 | **E2-1 Crear tarea**, con **E2-3** (nace mía y pendiente) y **E2-2** (título obligatorio) | Arranca el dominio entero |
| 3 | **E2-4 Cambiar el estado desde la lista** | Es el corazón del producto |
| 4 | **FS-142 Filtrar por estado** | Evita que la lista se degrade con lo hecho |
| 5 | **E2-5 + E2-6 Reasignar** | Se hacen juntos porque es la misma operación. Cierra «elegir lo siguiente sabiendo qué está libre» |
| 6 | **FS-118 Fecha de vencimiento** | Va tarde a propósito: impacto bajo, y sus tickets 4 y 8 esperan la decisión de dónde se edita |

**Candidatos a entrar antes, si se decide:**

- «Mis tareas» (PO-1), justo después de FS-142.
- Ocultar lo hecho por defecto (PO-7).

Son baratos y el primero sostiene el principio de diseño del PRD.

**Después del MVP, solo si el riesgo #1 se valida:**

7. Refresco periódico de la lista.
8. Estado «bloqueado», que abre la otra mitad de la daily.
9. Editar título, abrir tarea y borrar tarea.
10. Sync en tiempo real (E3), al final.

**No recomendados.** Comentarios, avisos al reasignar y prioridad/estimación contradicen decisiones de producto (chat, RF-15 y no planificar).

### Por qué el sync en tiempo real va el último

Invertir en que el estado llegue al instante solo tiene sentido si el estado se mantiene al día. Esa es la hipótesis que el MVP debe validar primero. Si la gente no actualiza, un sync perfecto transmite datos viejos más rápido.
