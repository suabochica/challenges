MeLi Frontend Challenge
=======================

![MercadoLibre](./static/imgs/00-meli.png "MercadoLibre")

Monorepo con una solución al reto frontend de mercado libre.

🧰 Tech Stack
-------------

- [nodejs](https://nodejs.org/en)
- [nextjs](https://www.nextjs.org/): el framework de React para la web

Bienvenido a la prueba práctica para aspirantes al áread de frontend de MeLi.

A continuación presentamos el diseño y descripción funcional de una aplicación que sera la base del trabajo que deberas desarrollar.

La aplicación consta de 3 componentes principales: la caja de búsqueda, la visualización de resultados, y la descripción del detalle del producto.

Es importante tener en cuenta:

- Usabilidad
- SEO
- Rendimiento
- Escalabilidad

Los datos tiene que ser recuperados de los APIs de Mercado Libre.

Las vistas son navegables de manera independiente y cuentan cons u propia URL:

- `/`: Caja de búsqueda
- `/items?search=""`: Resultados de búsqueda
- `/items/:id`: Detalle del producto

Se debe construir los siguientes endpoints para ser utilizados en las vistas:

- `api/items?query:query`: recuperando información de `https://api.mercadolibre.com/sites/MLA/search?q=:query` (e.g. `https://api.mercadolibre.com/sites/MLA/search?q=iphone&limit=4`)

- `api/items/:id`: consultando los siguientes endpoints `https://api.mercadolibre.com/items/:id` y `https://api.mercadolibre.com/items/:id/description` (e.g. `https://api.mercadolibre.com/items/MLA1935980882`)

La vista de caja de búsqueda debe permitir ingresar el producto a buscar y al enviar el formulario navegar a la vista de resultados de búsqueda, visualizando solo 4 productos. Luego, al hacer clic sobre uno de ello, debe navegar a la vista de detalle de producto.

dado un id de producto, debería poder ingresar directamente a la vista de detalles de producto.

Getting Started
---------------

Corre el serevidor de desarrollo con:

```bash
pnpm dev
```