# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

## Cómo rellenarlo

- Un apartado `## Prompt N` por cada prompt.
- **Pega el prompt tal cual lo lanzaste**, dentro del bloque de código, aunque ocupe diez líneas
  y aunque tenga faltas. No lo reescribas para que quede bien: el que arreglaste mentalmente
  después no es el que lanzaste.
- Incluye también los que **no funcionaron**. Suelen ser los más útiles de leer.
- `Modelo` y `Herramienta` en todos. Si cambiaste de una a otra a mitad, se nota aquí.

---

## Prompt 1

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
analiza y generame esta información: necesito saber el status actual del proyecto 1- que funcionalidades ya estan construidas 2- cual es y como esta compuesto el modelo de datos. dame explicaciones precisas de cada punto.
```

**Qué salió:** respondió en formato de capacidades; el resumen del tramo 1 tuve que recortarlo (sobraban detalles de pantalla y nombres de tablas).

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Quiero definir el alcance del MVP de FlowSync. Parto de este párrafo:

"Quiero que FlowSync sea una herramienta para que los equipos remotos sepan en qué está trabajando cada uno sin tener que hacer reuniones de sincronización. Algo tipo tareas compartidas pero más en tiempo real y menos rollo que Jira."

Antes de proponer nada, hazme las 5 preguntas que más reducirían la incertidumbre sobre el problema, los usuarios y el alcance. Una sola ronda: después no hagas más preguntas.

No propongas alcance todavía. No hables de modelo de datos, endpoints ni arquitectura: esto es un documento de producto.

Las respuestas te las doy en el siguiente mensaje.
```

**Qué salió:** devolvió las 5 preguntas sin proponer alcance. Borrador propio refinado con ayuda antes de lanzarlo.

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
------ 
```

**Qué salió:** no respondió pregunta a pregunta; fue directo a 6 supuestos y 2 incoherencias. Uno de los supuestos ("cada equipo tiene su propia instalación") metía una decisión de despliegue; lo reformulé en términos de producto.

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
propon el alcance en 5 bloques: Problema - Usuarios - propuesta de valor - alcance - No alcance. Propon siendo agresiva recortando y justifica cada exclusión.
```

**Qué salió:** escribió los cinco bloques directamente en el fichero. Propuso 7 cosas dentro y 17 exclusiones, cada una justificada con la hipótesis que no valida, y señaló sus propios puntos débiles. Sin pedírselo, también infló el tramo 1 con una lista larga de detalles de pantalla; la quité.
