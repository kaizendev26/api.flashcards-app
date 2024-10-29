# Aplicación de Servidor para Repetición Espaciada

Aplicación de servidor inspirada en **Anki**, diseñada para gestionar el aprendizaje mediante la **repetición espaciada**. La aplicación permite a los usuarios crear, revisar y gestionar tarjetas de estudio.

## Descripción

La aplicación permite:
- **Persistencia de datos** que permite consultar, crear, eliminar y guardar tu progreso de estudio de mazos y cartas.
- **Una API RESTful** que permite acceder a los metodos que seran consultados del lado del cliente.
- **Consultar métodos** para agregar, actualizar, eliminar tarjetas y mazos, ajustar intervalos de revisión y visualizar tu progreso.

## Características

- **Gestión de Tarjetas**: Crear, editar, eliminar y clasificar tarjetas de estudio.
- **Algoritmo de Repetición Espaciada**: Basado en el modelo de Anki, ajusta automáticamente los intervalos de revisión según la dificultad de la tarjeta.
- **Conectividad a la Base de Datos**: Actualización y consulta de tarjetas en tiempo real.

## Uso

1. **Crear mazos**: Añade nuevos mazos para clasificar tus estudios de la forma que desees.
2. **Crear tarjetas**: Añade nuevas tarjetas de estudio.
3. **Consulta tus progrso**: Visualiza el progreso de tu estudio de cada mazo, ve el progreso de cuantas cartas has estudiado y cuantas te faltan de reforzar.
4. **Actualizar intervalos**: Después de cada revisión, actualiza la dificultad y el intervalo de cada tarjeta para mejorar la retención.

## Tecnologías Usadas

- **Node.js**: Utilizad0 para crear y ejecutar el backend de la aplicación.
- **Express.js**: Framework de Node.js para construir la API RESTful.
- **MySQL** Base de datos para almacenar y gestionar los mazos y tarjetas
- **Railway**: Para el despliegue de la aplicacion.
