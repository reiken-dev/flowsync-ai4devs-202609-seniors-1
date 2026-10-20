## Purpose

Permitir que una persona cree una cuenta en FlowSync, inicie y cierre sesión, mantenga su sesión entre visitas y consulte su perfil. Describe el comportamiento actual, observable desde fuera, de las dos capas: la API HTTP y las pantallas.

## Requirements

### Requirement: Registro de cuenta

El sistema SHALL permitir crear una cuenta nueva mediante `POST /api/v1/auth/signup` y SHALL devolver, en la misma respuesta, el usuario creado y un token de acceso, de modo que quien se registra queda con la sesión iniciada.

#### Scenario: Registro correcto

- **WHEN** se envía el registro con `fullName` "Ada Lovelace", un `email` que no pertenece a ninguna cuenta, una `password` de entre 8 y 32 caracteres y una `passwordConfirmation` idéntica a `password`
- **THEN** responde 200 con `{ "data": { "user": {...}, "token": "..." } }`, donde `user` contiene `id`, `fullName`, `email`, `createdAt`, `updatedAt` e `initials`

#### Scenario: Registro sin nombre

- **WHEN** se envía el registro con `fullName` a `null` y el resto de campos válidos
- **THEN** responde 200 y el `user` devuelto tiene `fullName` a `null`

#### Scenario: La contraseña no se expone

- **WHEN** se completa un registro correcto
- **THEN** ninguna parte de la respuesta contiene la contraseña, en claro o cifrada

#### Scenario: El token devuelto sirve de inmediato

- **WHEN** se completa un registro correcto y se consulta el perfil con el token recibido
- **THEN** responde 200 con los datos del usuario recién creado

### Requirement: Validación del registro

El sistema SHALL rechazar con 422 cualquier registro que incumpla las reglas de los campos, SHALL informar de cada fallo con su campo, la regla incumplida y un mensaje, y SHALL NOT crear ninguna cuenta ni emitir ningún token cuando hay un fallo.

Las reglas son: `fullName` es obligatorio como clave pero admite `null`; `email` es obligatorio, con formato de email válido, de hasta 254 caracteres y no registrado todavía; `password` es obligatoria, de 8 a 32 caracteres; `passwordConfirmation` es obligatoria, de 8 a 32 caracteres e igual a `password`.

#### Scenario: Falta una clave

- **WHEN** se envía el registro sin la clave `fullName`, `email`, `password` o `passwordConfirmation`
- **THEN** responde 422 con una lista `errors` en la que cada elemento indica `message`, `rule` y `field`, y la regla incumplida de ese campo es `required`

#### Scenario: Email con formato inválido

- **WHEN** se envía el registro con un `email` que no tiene formato de email
- **THEN** responde 422 con un error sobre el campo `email` cuya regla es `email`

#### Scenario: Email demasiado largo

- **WHEN** se envía el registro con un `email` de más de 254 caracteres
- **THEN** responde 422 con un error sobre el campo `email` cuya regla es `maxLength`

#### Scenario: Email ya registrado

- **WHEN** se envía el registro con un `email` que ya pertenece a otra cuenta
- **THEN** responde 422 con un error sobre el campo `email` cuya regla es `database.unique`, y la cuenta existente no se modifica

#### Scenario: Contraseña demasiado corta

- **WHEN** se envía el registro con una `password` de menos de 8 caracteres
- **THEN** responde 422 con un error sobre el campo `password` cuya regla es `minLength`

#### Scenario: Contraseña demasiado larga

- **WHEN** se envía el registro con una `password` de más de 32 caracteres
- **THEN** responde 422 con un error sobre el campo `password` cuya regla es `maxLength`

#### Scenario: La confirmación no coincide

- **WHEN** se envía el registro con una `passwordConfirmation` distinta de `password`
- **THEN** responde 422 con un error sobre el campo `passwordConfirmation` cuya regla es `sameAs`

#### Scenario: Varios campos inválidos a la vez

- **WHEN** se envía el registro con más de un campo inválido
- **THEN** responde 422 y la lista `errors` incluye un error por cada campo inválido

### Requirement: Inicio de sesión

El sistema SHALL permitir iniciar sesión mediante `POST /api/v1/auth/login` con `email` y `password`, y SHALL devolver el usuario y un token de acceso nuevo con la misma forma que el registro.

#### Scenario: Credenciales correctas

- **WHEN** se envía el inicio de sesión con el `email` y la `password` de una cuenta existente
- **THEN** responde 200 con `{ "data": { "user": {...}, "token": "..." } }` y el `user` es el de esa cuenta

#### Scenario: Cada inicio de sesión emite un token distinto

- **WHEN** la misma cuenta inicia sesión dos veces
- **THEN** recibe dos tokens distintos y ambos son válidos a la vez

#### Scenario: Contraseña incorrecta

- **WHEN** se envía el inicio de sesión con un `email` registrado y una `password` equivocada
- **THEN** responde 400, no devuelve token y no emite ninguno

#### Scenario: Email no registrado

- **WHEN** se envía el inicio de sesión con un `email` que no pertenece a ninguna cuenta
- **THEN** responde 400, con la misma respuesta que ante una contraseña incorrecta, de modo que no revela si el email existe

### Requirement: Validación del inicio de sesión

El sistema SHALL rechazar con 422 los inicios de sesión mal formados antes de comprobar credenciales, con la misma estructura de errores que el registro.

Las reglas son: `email` obligatorio, con formato de email válido y de hasta 254 caracteres; `password` obligatoria, sin límites de longitud.

#### Scenario: Faltan campos

- **WHEN** se envía el inicio de sesión sin `email` o sin `password`
- **THEN** responde 422 con un error de regla `required` sobre cada campo ausente

#### Scenario: Email con formato inválido

- **WHEN** se envía el inicio de sesión con un `email` que no tiene formato de email
- **THEN** responde 422 con un error sobre el campo `email` cuya regla es `email`

#### Scenario: Contraseña corta en el inicio de sesión

- **WHEN** se envía el inicio de sesión con una `password` de menos de 8 caracteres
- **THEN** no se rechaza por longitud: se comprueban las credenciales y, si no coinciden, responde 400

### Requirement: Consulta del perfil

El sistema SHALL permitir a una persona autenticada consultar su propio perfil mediante `GET /api/v1/account/profile`, enviando su token de acceso en la cabecera `Authorization` con el esquema `Bearer`.

#### Scenario: Token válido

- **WHEN** se consulta el perfil con un token vigente
- **THEN** responde 200 con `{ "data": {...} }`, donde el contenido es el usuario dueño del token con `id`, `fullName`, `email`, `createdAt`, `updatedAt` e `initials`

#### Scenario: Sin token

- **WHEN** se consulta el perfil sin cabecera `Authorization`
- **THEN** responde 401 y no devuelve datos de ningún usuario

#### Scenario: Token desconocido o malformado

- **WHEN** se consulta el perfil con un token que no corresponde a ningún acceso emitido
- **THEN** responde 401

#### Scenario: Token ya cerrado

- **WHEN** se consulta el perfil con un token cuya sesión fue cerrada
- **THEN** responde 401

### Requirement: Cierre de sesión

El sistema SHALL permitir cerrar sesión mediante `POST /api/v1/account/logout`, invalidando únicamente el token con el que se hace la petición.

#### Scenario: Cierre correcto

- **WHEN** se cierra sesión con un token vigente
- **THEN** responde 200 con el mensaje "Logged out successfully" y ese token deja de ser válido

#### Scenario: Otras sesiones siguen activas

- **WHEN** una cuenta tiene dos tokens vigentes y se cierra sesión con uno de ellos
- **THEN** el otro token sigue siendo válido

#### Scenario: Cierre sin autenticar

- **WHEN** se intenta cerrar sesión sin token o con un token inválido
- **THEN** responde 401

### Requirement: Rutas públicas y privadas de la API

El sistema SHALL exigir autenticación en todas las rutas de cuenta (`/api/v1/account/*`) y SHALL dejar abiertas las de acceso (`/api/v1/auth/*`). La autenticación SHALL basarse en tokens de acceso enviados por petición, sin sesión de navegador.

#### Scenario: Registro e inicio de sesión sin token

- **WHEN** se llama al registro o al inicio de sesión sin cabecera `Authorization`
- **THEN** la petición se procesa con normalidad

#### Scenario: Registro con un token ajeno enviado

- **WHEN** se llama al registro o al inicio de sesión con un token inválido en la cabecera `Authorization`
- **THEN** la petición se procesa con normalidad, sin rechazarla por el token

#### Scenario: Rutas de cuenta sin credenciales

- **WHEN** se llama a cualquier ruta bajo `/api/v1/account` sin un token válido
- **THEN** responde 401

### Requirement: Formato de las respuestas

El sistema SHALL responder siempre en JSON, aunque la petición no lo pida, y SHALL envolver las respuestas correctas de cuentas y acceso en una clave `data`. Los errores de validación SHALL llegar como una lista `errors`.

#### Scenario: Petición sin cabecera Accept

- **WHEN** se llama a cualquier ruta sin indicar que se acepta JSON, o indicando otro formato
- **THEN** la respuesta, incluidas las de error, sigue siendo JSON

#### Scenario: Respuesta correcta

- **WHEN** una operación de cuentas y acceso termina con éxito y devuelve datos
- **THEN** los datos viajan dentro de `data`

### Requirement: Datos públicos y iniciales del usuario

El sistema SHALL exponer de un usuario únicamente `id`, `fullName`, `email`, `createdAt`, `updatedAt` e `initials`, y SHALL calcular `initials` a partir del nombre o, si no hay nombre, del email.

#### Scenario: Nombre con dos o más palabras

- **WHEN** el usuario tiene `fullName` "Ada Lovelace"
- **THEN** `initials` es "AL", en mayúsculas

#### Scenario: Nombre de una sola palabra

- **WHEN** el usuario tiene `fullName` "Ada"
- **THEN** `initials` es "AD", las dos primeras letras en mayúsculas

#### Scenario: Usuario sin nombre

- **WHEN** el usuario tiene `fullName` a `null` y su email es "grace@example.com"
- **THEN** `initials` es "GR", las dos primeras letras de la parte local del email en mayúsculas

### Requirement: Rutas de la aplicación y redirecciones

La aplicación SHALL ofrecer tres pantallas: inicio de sesión en `/login`, registro en `/register` y perfil en `/profile`. Cualquier otra dirección SHALL redirigir a `/profile`, sustituyendo la entrada del historial.

#### Scenario: Dirección desconocida con sesión

- **WHEN** una persona con sesión abre una dirección que no existe
- **THEN** acaba en `/profile`

#### Scenario: Dirección desconocida sin sesión

- **WHEN** una persona sin sesión abre una dirección que no existe
- **THEN** pasa por `/profile` y, al no tener sesión, acaba en `/login`

#### Scenario: La raíz

- **WHEN** se abre la raíz del sitio
- **THEN** se comporta como una dirección desconocida: lleva a `/profile` o, sin sesión, a `/login`

### Requirement: Protección de rutas privadas

La aplicación SHALL mostrar el perfil solo a quien tiene sesión válida, y SHALL NOT redirigir a nadie mientras se comprueba un token guardado, para que recargar la página no expulse a quien sí tiene sesión.

#### Scenario: Sin sesión

- **WHEN** una persona sin sesión abre `/profile`
- **THEN** se la redirige a `/login` sin dejar `/profile` en el historial

#### Scenario: Con sesión

- **WHEN** una persona con sesión abre `/profile`
- **THEN** ve su perfil

#### Scenario: Comprobación en curso

- **WHEN** se abre `/profile` mientras se está validando un token guardado
- **THEN** se muestra un indicador de carga accesible con el texto "Cargando…" y no se redirige hasta conocer el resultado

### Requirement: Rutas solo para visitantes

La aplicación SHALL impedir que una persona con sesión use las pantallas de inicio de sesión y registro, redirigiéndola al perfil.

#### Scenario: Con sesión

- **WHEN** una persona con sesión abre `/login` o `/register`
- **THEN** se la redirige a `/profile` sin dejar la dirección original en el historial

#### Scenario: Sin sesión

- **WHEN** una persona sin sesión abre `/login` o `/register`
- **THEN** ve la pantalla correspondiente

#### Scenario: Comprobación en curso

- **WHEN** se abre `/login` o `/register` mientras se está validando un token guardado
- **THEN** se muestra el indicador de carga y no se muestra el formulario hasta conocer el resultado

### Requirement: Pantalla de registro

La aplicación SHALL ofrecer en `/register` un formulario titulado "Crea tu cuenta" con los campos "Nombre completo" (opcional), "Email", "Contraseña" (con la ayuda "Entre 8 y 32 caracteres.") y "Repite la contraseña", un botón "Crear cuenta" y un enlace "Inicia sesión" hacia `/login`.

#### Scenario: Registro correcto

- **WHEN** la persona completa el formulario con datos válidos y lo envía
- **THEN** se crea la cuenta, la sesión queda iniciada y se la lleva al perfil

#### Scenario: Envío en curso

- **WHEN** el formulario se está enviando
- **THEN** el botón queda deshabilitado y muestra "Creando cuenta…"

#### Scenario: Nombre en blanco

- **WHEN** la persona deja el nombre vacío o solo con espacios
- **THEN** la cuenta se crea sin nombre y en el perfil se muestra "Sin nombre"

#### Scenario: Nombre con espacios alrededor

- **WHEN** la persona escribe un nombre con espacios al principio o al final
- **THEN** se guarda sin esos espacios

#### Scenario: Contraseñas distintas

- **WHEN** la persona envía el formulario con la contraseña y su repetición distintas
- **THEN** se muestra bajo "Repite la contraseña" el mensaje "Las contraseñas no coinciden." sin hacer ninguna petición al servidor

#### Scenario: Email ya registrado

- **WHEN** el servidor responde que el email ya existe
- **THEN** se muestra bajo "Email" el mensaje "Ese email ya está registrado. Inicia sesión en su lugar."

#### Scenario: Enlace al inicio de sesión

- **WHEN** la persona pulsa "Inicia sesión"
- **THEN** navega a `/login`

### Requirement: Pantalla de inicio de sesión

La aplicación SHALL ofrecer en `/login` un formulario titulado "Inicia sesión" con los campos "Email" y "Contraseña", un botón "Entrar" y un enlace "Crea una" hacia `/register`.

#### Scenario: Inicio de sesión correcto

- **WHEN** la persona envía credenciales correctas
- **THEN** la sesión queda iniciada y se la lleva al perfil

#### Scenario: Envío en curso

- **WHEN** el formulario se está enviando
- **THEN** el botón queda deshabilitado y muestra "Entrando…"

#### Scenario: Credenciales incorrectas

- **WHEN** el servidor rechaza las credenciales
- **THEN** se muestra un aviso general con "El email o la contraseña no son correctos." y los campos conservan lo escrito

#### Scenario: Campo vacío o email mal formado

- **WHEN** la persona envía el formulario con un campo vacío o con un email sin formato válido
- **THEN** el navegador no bloquea el envío y el error del servidor se muestra bajo el campo afectado, por ejemplo "Falta rellenar el email." o "Introduce una dirección de email válida."

#### Scenario: Enlace al registro

- **WHEN** la persona pulsa "Crea una"
- **THEN** navega a `/register`

### Requirement: Presentación de errores en los formularios

Los formularios de acceso SHALL mostrar los errores en castellano, bajo el campo al que pertenecen cuando el campo está en pantalla, y SHALL mostrar en un aviso general los errores que no se pueden asociar a un campo visible, de modo que ningún error se quede sin enseñar.

#### Scenario: Error de un campo visible

- **WHEN** el servidor devuelve un fallo de validación sobre un campo del formulario
- **THEN** el mensaje aparece bajo ese campo, el campo se marca como inválido y no se muestra aviso general

#### Scenario: Error de un campo no visible

- **WHEN** el servidor devuelve un fallo de validación sobre un campo que el formulario no tiene
- **THEN** el mensaje se muestra en el aviso general

#### Scenario: Servidor inaccesible

- **WHEN** no se puede contactar con el servidor
- **THEN** el aviso general dice "No se pudo conectar con el servidor. Comprueba que el backend está arrancado."

#### Scenario: Error del servidor

- **WHEN** el servidor responde con un error inesperado o con un cuerpo que no es JSON
- **THEN** el aviso general dice "Algo ha ido mal en el servidor. Inténtalo de nuevo en un momento."

#### Scenario: Un nuevo envío limpia los errores

- **WHEN** la persona vuelve a enviar el formulario tras un error
- **THEN** los errores anteriores desaparecen mientras se procesa el nuevo envío

### Requirement: Estado de la sesión

La aplicación SHALL mantener un estado de sesión con tres valores —cargando, autenticada y anónima— y SHALL conservar el token de acceso en el almacenamiento persistente del navegador para que la sesión sobreviva a recargas y a cerrar y abrir la pestaña.

#### Scenario: Primera visita

- **WHEN** se abre la aplicación y no hay token guardado
- **THEN** la sesión es anónima desde el primer momento, sin pasar por cargando

#### Scenario: Token guardado válido

- **WHEN** se abre la aplicación con un token guardado que el servidor reconoce
- **THEN** la sesión pasa de cargando a autenticada con los datos del perfil obtenidos del servidor

#### Scenario: Token guardado rechazado

- **WHEN** se abre la aplicación con un token guardado y el servidor responde 401
- **THEN** el token se borra, la sesión es anónima y en `/login` se muestra el aviso "Tu sesión ha caducado. Vuelve a iniciar sesión."

#### Scenario: Servidor caído al restaurar

- **WHEN** se abre la aplicación con un token guardado y el servidor no responde o falla con un error distinto de 401
- **THEN** la sesión es anónima, el token guardado se conserva para el siguiente intento y en `/login` se muestra el motivo del fallo

#### Scenario: El aviso de sesión perdida

- **WHEN** hay un aviso de sesión perdida y la persona inicia sesión con éxito o cierra sesión
- **THEN** el aviso desaparece

#### Scenario: Prioridad de los avisos en el login

- **WHEN** en `/login` coinciden un error del intento actual y el aviso de una sesión perdida
- **THEN** se muestra el error del intento actual

### Requirement: Inicio de sesión y registro desde la aplicación

La aplicación SHALL iniciar la sesión en cuanto el servidor confirme un registro o un inicio de sesión, guardando el token y los datos del usuario.

#### Scenario: Sesión tras acceder

- **WHEN** el servidor confirma un registro o un inicio de sesión
- **THEN** el token queda guardado de forma persistente, el estado pasa a autenticado y el usuario actual es el devuelto por el servidor

#### Scenario: Acceso fallido

- **WHEN** el servidor rechaza un registro o un inicio de sesión
- **THEN** no se guarda ningún token y el estado de la sesión no cambia

### Requirement: Perfil

La aplicación SHALL mostrar en `/profile` las iniciales, el nombre, el email y la fecha de alta de la persona con sesión, junto con un botón para cerrar sesión.

#### Scenario: Datos mostrados

- **WHEN** una persona con nombre "Ada Lovelace" abre su perfil
- **THEN** ve un círculo con "AL", el nombre "Ada Lovelace", su email y la fila "Miembro desde" con su fecha de alta en formato largo en castellano

#### Scenario: Persona sin nombre

- **WHEN** una persona sin nombre abre su perfil
- **THEN** en lugar del nombre se muestra "Sin nombre"

### Requirement: Cierre de sesión desde la aplicación

La aplicación SHALL cerrar la sesión local siempre que la persona lo pida, aunque el servidor no responda, y SHALL llevarla a `/login`.

#### Scenario: Cierre correcto

- **WHEN** la persona pulsa "Cerrar sesión"
- **THEN** el token guardado se borra, el estado pasa a anónimo, el servidor invalida el token y se la lleva a `/login`

#### Scenario: Envío en curso

- **WHEN** la persona acaba de pulsar "Cerrar sesión"
- **THEN** el botón queda deshabilitado y muestra "Cerrando sesión…"

#### Scenario: Fallo del servidor al cerrar

- **WHEN** la persona cierra sesión y el servidor falla, no responde o ya no reconoce el token
- **THEN** la sesión local se cierra igualmente, se la lleva a `/login` y no se muestra ningún error

#### Scenario: Volver atrás tras cerrar sesión

- **WHEN** la persona cierra sesión y usa el historial para volver a `/profile`
- **THEN** se la redirige de nuevo a `/login`
