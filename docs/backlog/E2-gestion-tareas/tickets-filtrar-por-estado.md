# FS-142 · Tickets de «Filtrar la lista por estado»

**Historia:** [FS-142](./us-filtrar-por-estado.md) · **Épica:** E2 · Gestión de tareas

Cada ticket hereda los criterios de aceptación de la historia (CA-n). Su Definition of Done es una checklist de «cómo lo entregamos»: no añade criterios nuevos. Los tickets nombran la capa que tocan, pero no diseñan; las decisiones de implementación quedan para quien lo construya. No hay tickets de tipo Bug porque todavía no hay nada roto. Tampoco hay ticket de Migración/DB: el filtro actúa sobre el estado que ya existe gracias al prerrequisito «cambiar el estado de una tarea».

## Antes de empezar

**Prerrequisitos fuera de FS-142.** Se nombran por su nombre porque no tienen identificador fijado:

- **Crear una tarea** y **la lista compartida**.
- **Cambiar el estado de una tarea**. Es la que fija los tres estados fijos y se necesita para CA-9.
- **Base de pruebas del backend**. Hoy solo existe `tests/bootstrap.ts`.
- **FS-118.5 y FS-118.6**, solo para CA-12 (las vencidas siguen distinguidas con filtro). Por eso va en un ticket aparte.

**Puntos abiertos que afectan a criterios de esta historia:**

- CA-3 depende de la vista por defecto (PO-7 del PRD).
- CA-13 depende del orden de la lista (PO-2 del PRD).
- Si el filtro se recuerda entre visitas no está decidido y no tiene criterio. Eso condiciona si la interfaz puede llegar a pedir un estado inexistente (CA-8), como pasaría con un enlace guardado. La garantía de CA-8 queda en el backend; la interfaz solo debe mostrar bien el aviso si le llega.

---

## Tickets

### FS-142.1 · Regla de filtrado por estado
**Tipo:** Modelo/Dominio
**Hereda:** CA-1, CA-6, CA-8, CA-13.
**Definition of Done:**
- [ ] La regla vive en el dominio, no en el controlador ni en la vista: dado un estado válido, selecciona solo las tareas de ese estado.
- [ ] Reutiliza el conjunto de tres estados que ya existe; no lo duplica.
- [ ] Distingue un estado válido de uno que no existe, y para el segundo devuelve un fallo identificable, no una lista vacía.
- [ ] Admite un solo estado a la vez.
- [ ] Mantiene el orden relativo de las tareas.
- [ ] Pruebas unitarias para cada criterio heredado, incluidos los bordes: estado válido sin tareas y estado inexistente.
- [ ] `lint` y `typecheck` pasan.

**Depende de:** prerrequisito «cambiar el estado de una tarea».

### FS-142.2 · La lista admite filtrar por un estado
**Tipo:** Endpoint/API
**Hereda:** CA-1, CA-2, CA-3, CA-4, CA-6, CA-7, CA-13, CA-14.
**Definition of Done:**
- [ ] La validación del estado pedido está en `app/validators` con `vine.create`, y la respuesta pasa por un transformer y `serialize()`.
- [ ] Con un estado válido devuelve solo las tareas de ese estado, de cualquier persona del equipo.
- [ ] Sin filtro devuelve todas, como hasta ahora.
- [ ] Un estado válido sin tareas devuelve una lista vacía correcta, sin tratarlo como error.
- [ ] Exige sesión iniciada; sin sesión no se ve ninguna tarea, filtrada o no.
- [ ] Pruebas funcionales con aislamiento de base de datos (`testUtils.db()`) para el camino feliz y cada caso límite.
- [ ] El registro de controladores y cliente tipado generados se regenera y se commitea.
- [ ] Imports por subpath; `lint` y `typecheck` pasan.

**Depende de:** FS-142.1 y prerrequisito «lista compartida».

### FS-142.3 · Avisar cuando se pide un estado que no existe
**Tipo:** Endpoint/API
**Hereda:** CA-8.
**Definition of Done:**
- [ ] Un estado que no existe produce un aviso de error que dice que ese estado no existe e indica cuáles hay (pendiente, en curso y hecho).
- [ ] No devuelve una lista vacía, ni cae en silencio a «todas» o a otro estado.
- [ ] El mensaje sigue el formato de errores del proyecto y es entendible por la persona.
- [ ] Pruebas funcionales con aislamiento de base de datos: estados inventados, vacíos y con otra escritura, y que ninguno devuelva resultados.
- [ ] Registro generado regenerado y commiteado; `lint` y `typecheck` pasan.

**Depende de:** FS-142.2.

### FS-142.4 · Control de filtro en la lista
**Tipo:** Frontend
**Hereda:** CA-1, CA-2, CA-3, CA-5, CA-6, CA-7, CA-8, CA-13.
**Definition of Done:**
- [ ] Todo acceso a la API pasa por `lib/api.ts`.
- [ ] Se puede elegir un solo estado a la vez y quitar el filtro; sin filtro se ve todo.
- [ ] Siempre se ve qué filtro está activo.
- [ ] Un estado válido sin tareas muestra el mensaje de que no hay tareas en ese estado, distinto de un error.
- [ ] Si llega el aviso de estado inexistente, se muestra en castellano a través de `ApiError`, con los estados válidos, y no una lista vacía.
- [ ] Componentes de shadcn traídos con la CLI, no editados a mano.
- [ ] `npm run build` y `npm run lint` pasan.
- [ ] Como el frontend no tiene runner de pruebas, se verifica a mano cada criterio heredado y se deja constancia de qué se comprobó.

**Depende de:** FS-142.2 (y FS-142.3 para el aviso).

### FS-142.5 · El filtro al cambiar de estado, crear o actualizar
**Tipo:** Frontend
**Hereda:** CA-9, CA-10, CA-11.
**Definition of Done:**
- [ ] Al pasar una tarea a otro estado con el filtro puesto, deja de verse en esa vista y se confirma a qué estado se movió.
- [ ] Al crear una tarea con un filtro distinto de «pendiente», se confirma la creación y se dice que está en «pendiente».
- [ ] Actualizar la lista conserva el filtro y trae los cambios de otras personas.
- [ ] Todo acceso a la API pasa por `lib/api.ts`.
- [ ] `build` y `lint` pasan; verificación manual de cada criterio heredado.

**Depende de:** FS-142.4 y prerrequisitos «cambiar el estado» y «crear una tarea».

### FS-142.6 · Prueba transversal: equipo entero, cambios ajenos y orden
**Tipo:** Test
**Hereda:** CA-4, CA-11, CA-13.
**Definition of Done:**
- [ ] Prueba automática con dos personas: lo que una cambia lo ve la otra con su filtro activo tras actualizar.
- [ ] El filtro muestra tareas de varias personas, no solo las de quien consulta.
- [ ] El orden relativo con filtro coincide con el de sin filtro.
- [ ] Reproducible, con aislamiento de base de datos, sin depender del orden de ejecución.
- [ ] Se ejecuta con `npm test` y pasa.

**Depende de:** FS-142.2.

### FS-142.7 · Prueba: las vencidas siguen distinguidas con filtro
**Tipo:** Test
**Hereda:** CA-12.
**Definition of Done:**
- [ ] Prueba automática: con una tarea vencida, filtrar por «pendiente» o «en curso» la sigue mostrando distinguida.
- [ ] Reproducible y con aislamiento de base de datos.
- [ ] Se ejecuta con `npm test` y pasa.
- [ ] Si FS-118.10 ya existe, no se duplica: es la misma regla vista desde dos historias, y esta prueba la referencia en lugar de repetirla.

**Depende de:** FS-142.2, FS-118.5 y FS-118.6.

---

## Orden y cobertura

**Orden sugerido:** 1 → 2 → (3, 4, 6) → 5 → 7.

| Criterio | Tickets |
|---|---|
| CA-1 | 1, 2, 4 |
| CA-2, CA-3 | 2, 4 |
| CA-4 | 2, 6 |
| CA-5 | 4 |
| CA-6 | 1, 2, 4 |
| CA-7 | 2, 4 |
| CA-8 | 1, 3, 4 |
| CA-9, CA-10 | 5 |
| CA-11 | 5, 6 |
| CA-12 | 7 |
| CA-13 | 1, 2, 4, 6 |
| CA-14 | 2 |

Los 14 criterios están cubiertos.

**Solape con FS-118.** CA-12 de esta historia y CA-14 de FS-118 son la misma regla vista desde dos lados. Si las dos historias van en paralelo, conviene que un solo ticket la implemente y el otro la enlace.
