🗄️ File Processing
==================

Paquete que procesa un archivo `.csv`, recupera su contenido y lo expone a través de un concepto de [Colas](https://effect.website/docs/guides/concurrency/queue) definido por effect para que sea consumido por el paquete `meli-requests`

🧰 Tech Stack
-------------

- [effect v3.5.6](https://www.npmjs.com/package/effect):  framework de TypeScript que provee un sistema de efectos funcional completo, inspirado en ZIO.
- [express v4.19.2](https://www.npmjs.com/package/express): framework web para Node.js
- [@effect/platform v0.62.2](https://www.npmjs.com/package/@effect/platform): biblioteca diseñada para crear abstracciones independientes a plataformas como Node.js, Bun y navegadores
- [@effect/platform-node v.057.2](https://www.npmjs.com/package/@effect/platform-node)

📁 Estructura del proyecto
--------------------------

- *adapters*: carpeta con las implementaciones de las interfaces de los puntos de entrada.
- *models*: carpeta en donde se definen las unidades que juegan el rol de las entidades.
- *router*: carpeta en donde se específican las rutas que vamos a exponer con express.
- *services*: carpeta con los puntos de entrada del paquete (e.g., el archivo `.csv` y el `POST endpoint`)
- *support*: carpeta con utilidaes transversales para el proyecto.

La relación entre las carpetas se procura hacer en una secuencia como ilustra el siguiente diagrama:

<!--[sequence](../../static/diagrams/01-sequence.puml)-->

🔀 Endpoints
------------

A continuación se listan los endpoints expuestos por este paquete

Health

- `GET health/classic`, para hacer una revisión de estado del servidor HTTP clásico.
- `GET health/effect`, para hacer un ping sobre el servidor HTTP.

Items

- `GET items/id/0` retorna un item definido por el adaptador `RecordAdapter`. Sus fines son de pruebas sobre el servidor HTTP.


Files

- `POST files/fileupload` 

🧞 Comandos
-----------

Estos comandos se ejecutan en el directorio raíz del paquete `file-processing` . i.e., `meli-challenge/packages/file-processing`

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `pnpm install`             | Instalar las dependencias                        |
| `pnpm run dev`             | Comienza el programa                             |

✅ Checklist
------------

- [ ] create post endpoint to upload file
- [ ] read file from filepath