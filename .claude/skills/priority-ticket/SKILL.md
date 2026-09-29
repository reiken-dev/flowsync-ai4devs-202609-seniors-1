---
name: priority-ticket
description: Trae el ticket de mayor prioridad asignado al usuario logeado en Jira (vía MCP) y arranca el trabajo sobre él. Usar al empezar una tarea nueva.
---

# Priority ticket

El flujo del tablero usa estos estados: **To Do → In Progress → In Review → Done**. Para buscar, filtra por categoría (`statusCategory`) en lugar de por nombre, así la consulta no depende del idioma del tablero. Para mover el ticket, obtén las transiciones disponibles (`getTransitionsForJiraIssue`) y elige la que lleva al estado destino.

1. Consulta Jira vía MCP con `assignee = currentUser() AND statusCategory = "To Do" ORDER BY priority DESC, created ASC` y toma el primero. No consideres tickets en "In Progress" o "In Review": evita re-tomar uno que ya está en marcha o cerrado. Si no hay ninguno asignado, lista los tickets abiertos sin asignar y pregunta al usuario cuál tomar antes de asignar nada.
2. Resume sus criterios de aceptación.
3. Entra en plan mode y propone cómo implementarlo (sigue las convenciones de AGENTS.md/CLAUDE.md si existen).
4. En cuanto el usuario apruebe el plan: mueve el ticket a "In Progress".
5. Al terminar (con el PR ya creado siguiendo las reglas de CLAUDE.md): mueve el ticket a "In Review" y deja un comentario en el ticket con el enlace al PR.
