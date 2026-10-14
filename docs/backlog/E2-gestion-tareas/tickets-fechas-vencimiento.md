# FS-118 · Tickets de «Fecha de vencimiento y tareas vencidas»

**Historia:** [FS-118](./us-fechas-vencimiento.md) · **Épica:** E2 · Gestión de tareas

Cada ticket hereda los criterios de aceptación de la historia (CA-n). Su Definition of Done es una checklist de «cómo lo entregamos»: no añade criterios nuevos. Los tickets nombran la capa que tocan, pero no diseñan; las decisiones de implementación quedan para quien lo construya. No hay tickets de tipo Bug porque todavía no hay nada roto.

## Antes de empezar

**Prerrequisitos fuera de FS-118.** Hoy no existe nada de tareas en el repositorio, así que FS-118 se apoya en trabajo que debe llegar antes. Se nombran por su nombre porque no tienen identificador fijado:

- **Crear una tarea** y **la lista compartida**. Sin ellas no hay a qué ponerle fecha ni dónde verla.
- **Cambiar el estado de una tarea**, para verificar CA-11 y CA-12.
- **Base de pruebas del backend** (RNF-8 del PRD). Hoy solo existe `tests/bootstrap.ts`. El primer ticket que exija pruebas carga con ella.
- **FS-142 (filtrar por estado)**, solo para CA-14. Por eso CA-14 va en un ticket aparte, que no frena al resto.

**Decisión pendiente que afecta a FS-118.8:** dónde se edita la fecha después de crear la tarea. El detalle de tarea está fuera del MVP y los criterios no lo cierran. Hay que decidirlo antes de empezar ese ticket.

---

## Tickets

### FS-118.1 · Persistir la fecha de vencimiento de la tarea
**Tipo:** Migración/DB
**Hereda:** base de CA-1 a CA-5. No decide formato ni obligatoriedad.
**Definition of Done:**
- [ ] Migración nueva con subida y bajada que funcionan.
- [ ] `node ace migration:run` pasa y `database/schema.ts` queda regenerado y commiteado, sin editarlo a mano.
- [ ] La bajada se ha probado y deja la base como estaba.
- [ ] Las tareas que ya existían se conservan intactas y quedan sin fecha.
- [ ] `npm run lint` y `npm run typecheck` pasan.

**Depende de:** prerrequisito «crear una tarea» (la entidad de tarea tiene que existir).

### FS-118.2 · Reglas de vencimiento de una tarea
**Tipo:** Modelo/Dominio
**Hereda:** CA-7, CA-8, CA-9, CA-10, CA-11, CA-12, CA-13, CA-16 y CA-19.
**Definition of Done:**
- [ ] La regla «vencida» vive en el dominio, no en el controlador ni en la vista.
- [ ] El modelo no declara columnas a mano; solo añade lógica sobre el esquema generado.
- [ ] Pruebas unitarias para cada criterio heredado, incluidos los bordes: la fecha es hoy, no hay fecha, la tarea está hecha, se reabre.
- [ ] Las pruebas no dependen del reloj real; usan un «hoy» controlado.
- [ ] Hay una prueba que demuestra que la regla no modifica nunca el estado (CA-16).
- [ ] `lint` y `typecheck` pasan.

**Depende de:** FS-118.1.

### FS-118.3 · Crear una tarea con fecha de vencimiento opcional
**Tipo:** Endpoint/API
**Hereda:** CA-1, CA-2, CA-17, CA-18.
**Definition of Done:**
- [ ] La validación está en `app/validators` con `vine.create`, y la respuesta pasa por un transformer y `serialize()`.
- [ ] Una fecha que no existe (CA-17) devuelve un motivo comprensible y no crea la tarea.
- [ ] Una fecha pasada se admite (CA-18).
- [ ] Crear sin fecha sigue funcionando exactamente igual que antes (CA-2).
- [ ] Pruebas funcionales con aislamiento de base de datos (`testUtils.db()`) para el camino feliz y cada error.
- [ ] Exige sesión iniciada.
- [ ] El registro de controladores y cliente tipado generados se regenera y se commitea.
- [ ] Imports por subpath; `lint` y `typecheck` pasan.

**Depende de:** FS-118.1 y prerrequisito «crear una tarea».

### FS-118.4 · Poner, cambiar y quitar la fecha de una tarea existente
**Tipo:** Endpoint/API
**Hereda:** CA-3, CA-4, CA-5, CA-6, CA-17, CA-18, CA-20.
**Definition of Done:**
- [ ] Mismas convenciones de validación y respuesta que FS-118.3.
- [ ] Poner, cambiar y quitar no alteran el título, el responsable ni el estado.
- [ ] Cualquier persona con sesión puede hacerlo sobre una tarea ajena (CA-6).
- [ ] Ante una fecha inválida, la tarea queda como estaba.
- [ ] Prueba de dos cambios casi simultáneos: prevalece el último guardado (CA-20).
- [ ] Pruebas funcionales con aislamiento de base de datos para el camino feliz y cada error.
- [ ] Registro generado regenerado y commiteado; `lint` y `typecheck` pasan.

**Depende de:** FS-118.1.

### FS-118.5 · La lista devuelve la fecha y si cada tarea está vencida
**Tipo:** Endpoint/API
**Hereda:** CA-1, CA-2, CA-7, CA-9, CA-10, CA-11, CA-12, CA-13.
**Definition of Done:**
- [ ] De cada tarea se devuelve su fecha, si la tiene, y si está vencida.
- [ ] El carácter «vencida» lo decide la regla de FS-118.2, no se recalcula aquí.
- [ ] «Hoy» es el de quien consulta (CA-19).
- [ ] La respuesta pasa por transformer y `serialize()`.
- [ ] Pruebas funcionales, con reloj controlado, que cambian el estado y la fecha de una tarea y comprueban que la lista refleja el cambio.
- [ ] Registro generado regenerado y commiteado; `lint` y `typecheck` pasan.

**Depende de:** FS-118.1, FS-118.2 y prerrequisito «lista compartida».

### FS-118.6 · Mostrar la fecha y distinguir las tareas vencidas en la lista
**Tipo:** Frontend
**Hereda:** CA-1, CA-2, CA-7, CA-8, CA-9, CA-10, CA-11, CA-12, CA-13.
**Definition of Done:**
- [ ] Todo acceso a la API pasa por `lib/api.ts`.
- [ ] La tarea sin fecha no muestra ninguna; la vencida se distingue de un vistazo; la de hoy y la hecha no se marcan.
- [ ] Componentes de shadcn traídos con la CLI, no editados a mano.
- [ ] `npm run build` y `npm run lint` pasan.
- [ ] Como el frontend no tiene runner de pruebas, se verifica a mano cada criterio heredado y se deja constancia de qué se comprobó.

**Depende de:** FS-118.5.

### FS-118.7 · Indicar la fecha al crear la tarea
**Tipo:** Frontend
**Hereda:** CA-1, CA-2, CA-17, CA-18.
**Definition of Done:**
- [ ] El formulario sigue funcionando con solo el título, sin pedir fecha (CA-2).
- [ ] Una fecha inválida muestra el motivo en castellano a través de `ApiError`, sin perder lo que la persona escribió.
- [ ] Una fecha pasada se admite.
- [ ] Todo acceso a la API pasa por `lib/api.ts`.
- [ ] `build` y `lint` pasan; verificación manual de cada criterio heredado.

**Depende de:** FS-118.3 y prerrequisito «crear una tarea».

### FS-118.8 · Poner, cambiar y quitar la fecha de una tarea desde la lista
**Tipo:** Frontend
**Hereda:** CA-3, CA-4, CA-5, CA-6, CA-17, CA-20.
**Definition of Done:**
- [ ] Se hace desde donde se haya decidido (ver la decisión pendiente de arriba), sin añadir pantallas fuera del MVP.
- [ ] Un error de fecha muestra su motivo y la tarea queda como estaba.
- [ ] Tras quitar una fecha, la tarea deja de poder aparecer vencida.
- [ ] Si otra persona cambió la fecha entretanto, al actualizar se ve la vigente.
- [ ] `build` y `lint` pasan; verificación manual de cada criterio heredado.

**Depende de:** FS-118.4, FS-118.6 y la decisión pendiente.
**Aviso de tamaño:** si pasa de media jornada, se parte en «poner y cambiar» y «quitar».

### FS-118.9 · Pruebas transversales: paso del día, husos horarios y sin notificaciones
**Tipo:** Test
**Hereda:** CA-15, CA-19, CA-21.
**Definition of Done:**
- [ ] Pruebas automáticas con reloj controlado: una tarea con fecha hoy pasa a vencida al abrir o actualizar el día siguiente (CA-15).
- [ ] Dos personas con distinto «hoy» ven la misma tarea con distinto resultado (CA-19).
- [ ] Al pasar a vencida no se genera ninguna notificación de ningún tipo (CA-21).
- [ ] Las pruebas son reproducibles y no dependen del orden ni del estado previo de la base de datos.
- [ ] Se ejecutan con `npm test` y pasan.

**Depende de:** FS-118.5 y FS-118.6.

### FS-118.10 · Prueba: las vencidas se ven con cualquier filtro
**Tipo:** Test
**Hereda:** CA-14.
**Definition of Done:**
- [ ] Prueba automática: con una tarea vencida, filtrar por «pendiente» o «en curso» la sigue mostrando distinguida.
- [ ] Reproducible y con aislamiento de base de datos.
- [ ] Se ejecuta con `npm test` y pasa.

**Depende de:** FS-118.5, FS-118.6 y **FS-142** (filtrar por estado). Es el único ticket que espera a otra historia.

---

## Cobertura de criterios

| Criterio | Tickets |
|---|---|
| CA-1, CA-2 | 3, 5, 6, 7 |
| CA-3, CA-4, CA-5 | 4, 8 |
| CA-6 | 4, 8 |
| CA-7 a CA-13 | 2, 5, 6 |
| CA-14 | 10 |
| CA-15 | 9 |
| CA-16 | 2 |
| CA-17 | 3, 4, 7, 8 |
| CA-18 | 3, 4, 7 |
| CA-19 | 2, 5, 9 |
| CA-20 | 4, 8 |
| CA-21 | 9 |

Los 21 criterios están cubiertos.

## Grafo de dependencias

Un ticket no puede empezar hasta que están hechos los que tiene encima.

```
 externos: «crear tarea» · «lista compartida» · base de pruebas
                          │
                      FS-118.1  Migración
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
      FS-118.2        FS-118.3        FS-118.4
      Dominio        API: crear      API: poner/cambiar/
          │               │          quitar fecha
          ▼               ▼               │
      FS-118.5        FS-118.7            │
      API: lista      UI: crear           │
          │                               │
          ▼                               │
      FS-118.6 ───────────────────────────┤
      UI: lista y vencidas                ▼
          │  │                        FS-118.8
          │  │                        UI: editar fecha
          │  │                        (+ decisión pendiente)
          ▼  ▼
   FS-118.9    FS-118.10
   Test        Test
   transversal   ▲
                 └── FS-142 (filtrar por estado)
```

### Quién bloquea a quién

| Ticket | Lo bloquean | Bloquea a |
|---|---|---|
| FS-118.1 | «crear tarea» (externo) | 2, 3, 4 (y 5 a través de 2) |
| FS-118.2 | 1 | 5 |
| FS-118.3 | 1, «crear tarea» | 7 |
| FS-118.4 | 1 | 8 |
| FS-118.5 | 1, 2, «lista compartida» | 6, 9, 10 |
| FS-118.6 | 5 | 8, 9, 10 |
| FS-118.7 | 3, «crear tarea» | nada |
| FS-118.8 | 4, 6, decisión de dónde se edita | nada |
| FS-118.9 | 5, 6 | nada |
| FS-118.10 | 5, 6, FS-142 | nada |

**Camino crítico:** 1 → 2 → 5 → 6 → 8. Son cinco tickets seguidos y no se pueden acortar.

## Orden de implementación recomendado

Una sola persona, en cortes que se pueden enseñar:

1. **Corte 1: poner una fecha al crear y verla** (hasta aquí hay algo demostrable)
   1. FS-118.1 Migración. Desbloquea tres ramas a la vez.
   2. FS-118.2 Reglas de vencimiento.
   3. FS-118.3 API de crear con fecha.
   4. FS-118.5 La lista devuelve fecha y vencida.
   5. FS-118.6 La lista muestra fecha y vencidas.
   6. FS-118.7 UI de crear con fecha.
2. **Corte 2: cambiar y quitar la fecha**
   7. FS-118.4 API de poner, cambiar y quitar.
   8. FS-118.8 UI de editar, cuando se haya decidido dónde.
3. **Cierre**
   9. FS-118.9 Pruebas transversales.
   10. FS-118.10 Prueba con filtro, cuando exista FS-142.

Con dos personas, tras FS-118.2 el trabajo se reparte en paralelo:

- **Backend:** 3 → 4 → 5.
- **Frontend:** 7 cuando termine el 3, y 6 cuando termine el 5.
- **Pruebas:** 9 cuando estén 5 y 6.

### Lo que puede frenar el trabajo

- **FS-118.8 espera una decisión, no código.** Decidir dónde se edita la fecha antes de llegar a ese ticket, porque si no el camino crítico se para al final.
- **FS-118.10 espera a otra historia.** Es el único ticket que depende de FS-142. Si FS-142 se retrasa, FS-118 puede cerrarse sin él y dejarlo como último pendiente.
- El corte 1 pone la fecha solo al crear. Hasta FS-118.4 no hay forma de añadirla a una tarea ya creada (CA-3 a CA-5), así que la historia no está completa hasta el corte 2.
