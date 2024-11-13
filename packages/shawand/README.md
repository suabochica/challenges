Shawand
=======

El propósito de esta prueba es evaluar tus habilidades en desarrollo backend y frontend. Debes construir una aplicación web que permita a los usuarios cargar un archivo CSV con datos pre formateados y mostrar esos datos como tarjetas en el sitio webkitURL, pudiendo filtrar los datos.

Instrucciones
-------------

- **Tienes 48 horas para completar la prueba.**
- **Tu solución debe incluir pruebas automatizadas** tanto pra el frontend como para el backend con una cobertura por encima del 80% y probar todas las funciones.
- **No crees 2 repositorios**, asegúrate de incluir todo el código en el mismos repositorio de GitHub. Crea una carpeta "frontend" y otra "backend" dentro del repositorio y códifica directamente en ellas.
- El frontend y el backend deben funcionar simplemente ejecutando `npm install` seguido de `npm run dev` para ejecutar la aplicación o `npm run test` para ejecutar las pruebas.
- **No agregues instrucciones adicionales o comandos de Docker al README**, si algo más necesita ser ejecutado antes de iniciar la aplicación, asegúrate de incluirlo en tu script de desarrollo.
- **Los archivos JavaScript** solo están permitidos en archivos de configuración `lib`, todo tu código _debe_ estar en **TypeScript** y completamente tipado.
- Despliega tu código en un servicio de hosting (Render o Vercel)

Características del frontend
----------------------------

- Debe ejecutarse en el puerto `4000`, y todo debe estar en la ruta `/` como una aplicación de una sola página (SPA) usando React.
- Un botón para **seleccionar un archivo CSV** desde la máquina local y otro botón para _cargar el archivo seleccionado_.
- Una **barra de búsqueda** que permita a los usuarios buscar datos dentro del archivo CSV cargado.
- La barra de búsqueda debe **actualizar las tarjetas mostrada** con los resultados coincidentes.
- Los datos CSV cargados deben mostrarse como **tarjetas en el sitio web**, con cada tarjeta mostrando todos los datos de una sola fila del archivo CSV.
- Un **diseño responsivo** que funcione en dispositivos de escritorio y móviles.
- Manejo de errores claro y amigable para el usuario.

Características del backend
---------------------------

- Debe ejecutarse en el puerto `3000`
- El backend debe implementarse como una **API RESTful** utilizando **Node**. No uses un framework con opiniones como Adonis on Nest.
- Los siguientes endpoints deben ser expuestos por el backend:
  - `POST /api/files`: endpoint que acepta la carga de un archivo CSV desde el frontend y almacena los datos en una base de datos. Se debe usar la clave "file" en la solicitud. Esta ruta debe devolver el estado 200 y un objeto con la clave "message" con el valor "El archivo se cargo correctamente. En caso de error, debe devolver el estado 500 y el valor de la llave "message debe ser "No se pudo cargar el archivo".
  - `GET /api/users`: endpoint que permite al frontend buscar a través de los datos CSV cargados por medio de un parámetro de consulta `?q=` para definir los términos de búsqueda. El filtro debe buscar coincidencias parciales y también debe ser insensible a mayúsculas o minúsculas. Esta ruta debe devolver el estado 200 con un objeto con la clave "data" que contiene un arreglo de objetos que coinciden con la búsqueda realizada.

🧰 Tech Stack
-------------

Backend:

- [nodejs](https://nodejs.org/en)
- [multer](https://www.npmjs.com/package/multer), un middleware para manejar el `multipart/form-data` usado para la carga de archivos.
- [convert-csv-to-json](https://www.npmjs.com/package/convert-csv-to-json), para convertir archivos CSV a JSON con node.

Frontend:

- [vite](https://vite.dev), para generar el proyecto frontend.
- [React + SWC](https://react.dev), como biblioteca web UI.
- [TypeScript](https://typescriptlang.com), como super conjunto de JavaScript para el manejo de tipos.
- [Sonner](https://www.npmjs.com/package/sonner), como componente web para notificar los errores.
- [useDebounce](https://usehooks.com/usedebounce), como hook personalizado para almacenar los parámetros de la búsqueda por un periodo de tiempo.
