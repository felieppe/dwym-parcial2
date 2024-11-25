# Asistente de Viajes en React Native

Este proyecto es una aplicación móvil desarrollada en React Native que permite a los usuarios explorar destinos de aventura, guardar sus favoritos y planificar sus viajes.

![dwym cover](https://github.com/user-attachments/assets/d9ba5f9d-1127-4247-b5bf-533726885c3f)

## Funcionalidades

*   **Vista de Destinos:**
    *   Muestra una lista de destinos con su nombre, dificultad y descripción.
    *   Los destinos se ordenan por cantidad de favoritos.
    *   Permite a los usuarios agregar nuevos destinos y editar los existentes.
    *   Los usuarios pueden eliminar destinos.

*   **Favoritos:**
    *   Los usuarios pueden marcar destinos como favoritos.
    *   Los favoritos se almacenan en el backend.

*   **Diferencias visuales entre Android/iOS:**
    *   El botón para agregar un nuevo destino tiene diferentes estilos en Android e iOS.

*   **Responsividad:**
    *   El listado de destinos se adapta a diferentes tamaños de pantalla.

## Backend

Se utiliza `json-server` como backend.

*   Endpoints:
    *   `GET /destinations`: Obtener todos los destinos
    *   `GET /destinations/:id`: Obtener un destino
    *   `POST /destinations`: Agregar un destino
    *   `PUT /destinations/:id`: Editar un destino
    *   `DELETE /destinations/:id`: Eliminar un destino

## Instalación

1.  Clonar el repositorio.
2.  Instalar las dependencias: `npm install`
3.  Levantar el backend: `json-server --port 8000 ./db.json --watch`
4.  Iniciar la aplicación: `npm start`
