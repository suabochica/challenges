🤓 Consigna Teórica
===================

🧵 Procesos, hilos y corrutinas
-------------------------------

> Una **corrutina** vive en un **hilo**,
> un **hilo** vive en un **proceso**,
> un **proceso** vive en un **núcleo**,
> el **núcleo** vive en la **CPU**

- Un caso en el que usarías procesos para resolver un problema y por qué.

Un proceso es una tarea computacional específica. Es el concepto más utilizado para la ejecución de tareas. Un problema para usar procesos es encontrar el valor mínimo en una matriz de números.

- Un caso en el que usarías threads para resolver un problema y por qué.

Un hilo es un segmento del proceso. Continuando con el ejemplo de encontrar el valor mínimo en una matriz 3x3 de números, se crea un hilo por fila, el primer hilo en terminar su tarea registra el valor en un espacio de memoria compartido. Cuando termine el segundo hilo, se compara si el valor de la segunda fila es menor al registrado; si es menor el valor se actualiza el valor del espacio de memoria; de lo contrario, se deja el valor previo. El mismo paso se ejecuta con el tercer hilo. 

Como se puede observar, hay un paso de validación en los hilos al momento de registrar el valor en memoria, por lo tanto las operaciones con hilos son bloqueantes.

- Un caso en el que usarías corrutinas para resolver un problema y por qué.

Una corrutina es un modelo simplificado de programación asíncrona que permite escribir código no bloqueante en un estilo no sequencial. Un problema a trabajar con corrutinas es recuperar datos de una based de datos o hacer peticiones HTTP en un red sin bloquear la ejecución de la aplicación web.

🕙 Optimización de recursos del sistema operativo
-------------------------------------------------

Si tuvieras 1.000.000 de elementos y tuvieras que consultar para cada uno de ellos información en una API HTTP. ¿Cómo lo harías? Explicar.

🧭 Análisis de complejidad
--------------------------

- Dados 4 algoritmos A, B, C y D que cumplen la misma funcionalidad, con complejidades O(n2), O(n3), O(2n) y O(n log n), respectivamente, ¿Cuál de los algoritmos favorecerías y cuál descartarías en principio? Explicar por qué.

- Asume que dispones de dos bases de datos para utilizar en diferentes problemas a resolver. La primera llamada AlfaDB tiene una complejidad de O(1) en consulta y O(n2) en escritura. La segunda llamada BetaDB que tiene una
complejidad de O(log n) tanto para consulta, como para escritura. ¿Describe en forma sucinta, qué casos de uso podrías atacar con cada una?
