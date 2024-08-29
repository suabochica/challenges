🏣 MeLi Requests
================

Paquete que consume la Cola expuesta por el `file-processing`, utiliza los valores para enviar peticiones a las APIs públicas de mercado libre, recupera una información específica y almacena esta información en un base de datos relacional.

🧰 Tech Stack
-------------

- [effect v3.5.6](https://www.npmjs.com/package/effect):  framework de TypeScript que provee un sistema de efectos funcional completo, inspirado en [ZIO](https://zio.dev/) para Scala.
- [@effect/schema v0.71.1](https://www.npmjs.com/package/@effect/schema): biblioteca para definir y usar esquemas par validar y transformar datos en TypeScript.
- [@effect/sql v0.9.4](https://www.npmjs.com/package/@effect/sql): biblioteca con un conjunto de herramientas SQL para effect.
- [@effect/sql-pg v0.9.14](https://www.npmjs.com/package/@effect/sql-pg): Implementacion de la biblioteca `@effect/sql` que usa la biblioteca `postgres.js`.
- [@effect/platform v0.62.2](https://www.npmjs.com/package/@effect/platform): biblioteca diseñada para crear abstracciones independientes a plataformas como Node.js, Bun y navegadores
- [@effect/platform-node v.057.2](https://www.npmjs.com/package/@effect/platform-node)

📁 Estructura del proyecto
--------------------------

- *adapters*: carpeta con las implementaciones de las interfaces de los puntos de entrada.
- *models*: carpeta en donde se definen las unidades que juegan el rol de las entidades.
- *database*: carpeta con el `init.sql` para crear la base de datos.
- *services*: carpeta con los puntos de entrada del paquete (e.g., la cola, las APIs públicas de MeLi y la base de datos)

<!--[mr-sequence](../../static/diagrams/02-mr-sequence.puml)-->

💊 Queue
---------

Se usa un sistema de colas con el módulo [Queue](https://effect.website/docs/guides/concurrency/queue) de Effect para recuperar el `id` y el `site` adjuntos a la elemento enviado en la cola.

☎️ Batch API calls
-----------------

Se usa módulo [Batching](https://effect.website/docs/guides/batching-caching#batching) de Effect para estructurar las peticiones, definir los resoludores y crear las consultas. El proceso de [batching](../../docs/theory.md) se explica en una de las respuestas del marco teórico.

🛢️ Base de datos
----------------

Una vez recuperada la información de los APIs públicos se ejecuta la consulta para insertar en la tabla `productos` de la `meli_db`. Aquí se utiliza la caja de herramientas de SQL para Effect, llamado [@effect/sql](https://github.com/Effect-TS/effect/tree/main/packages/sql)

🧞 Comandos
-----------

Estos comandos se ejecutan en el directorio raíz del paquete `meli-requests` . i.e., `meli-challenge/packages/meli-requests`

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `pnpm install`             | Instalar las dependencias                        |
| `pnpm run dev`             | Comienza el programa. Actualmente arroja un error de tipos.                   |
| `pnpm run dev:queue`       | Comienza el programa simula colas en Effect      |
| `pnpm run dev:api`         | Comienza el programa que hace las peticions a las APIS de meli. Actualmente arroja un contenido de effect que considero se atribuye a no haber logrado conseguir el Bearer Token para hacer las peticiones a las APIs de meli.  |
| `pnpm run dev:db`          | Comienza el programa se conecta a la base de datos postgres e inserta los datos. Actualmente arroja un SqlError  |

✅ Checklist
------------

- [ ] consume the MeLi APIs
- [ ] connection to the database