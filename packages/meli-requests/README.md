🏣 MeLi Requests
================

Paquete que consume la cola expuesta por el `file-processing`, utiliza los valores para enviar peticiones a las APIs públicas de mercado libre, recupera una información específica y almacenar esta información en un base de datos relacional.

🧰 Tech Stack
-------------

- [effect v3.5.6](https://www.npmjs.com/package/effect):  framework de TypeScript que provee un sistema de efectos funcional completo, inspirado en ZIO.
- [@effect/schema v0.71.1](https://www.npmjs.com/package/@effect/schema): biblioteca para definir y usar esquemas par validar y transformar datos en TypeScript.
- [@effect/sql v0.9.4](https://www.npmjs.com/package/@effect/sql): biblioteca con un conjunto de herramientas SQL para effect.
- [@effect/sql-pg v0.9.14](https://www.npmjs.com/package/@effect/sql-pg): Implementacion de la biblioteca `@effect/sql` que usa la biblioteca `postgres.js`.
- [@effect/platform v0.62.2](https://www.npmjs.com/package/@effect/platform): biblioteca diseñada para crear abstracciones independientes a plataformas como Node.js, Bun y navegadores
- [@effect/platform-node v.057.2](https://www.npmjs.com/package/@effect/platform-node)

📁 Estructura del proyecto
--------------------------

- *adapters*: carpeta con las implementaciones de las interfaces de los puntos de entrada.
- *models*: carpeta en donde se definen las unidades que juegan el rol de las entidades.
- *database*: carpeta en donde se específican las rutas que vamos a exponer con express.
- *services*: carpeta con los puntos de entrada del paquete (e.g., el archivo `.csv` y el `POST endpoint`)

🧞 Comandos
-----------

Estos comandos se ejecutan en el directorio raíz del paquete `meli-requests` . i.e., `meli-challenge/packages/meli-requests`

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `pnpm install`             | Instalar las dependencias                        |
| `pnpm run dev`             | Comienza el programa                             |

✅ Checklist
------------

- [ ] consume the MeLi APIs
- [ ] connection to the database