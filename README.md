# TaskFlow: Gestor de tareas

**TaskFlow** es una aplicación web para la gestión de tareas, desarrollada como parte del Bootcamp de Desarrollo de Aplicaciones Front-End Trainee RTD-25-01-05-0011-1 de SENCE.

Permite crear, visualizar y marcar tareas como completadas de manera sencilla por el usuario. También permite ver el clima actual en la barra superior bajo la barra de navegadión.

### Características

Esta aplicación permite al usuario:

- Crear y agregar tareas a una lista:
  - Utiliza fecha y hora local de creación
  - Requiere feha límite para completar cada tarea
- Cambiar el estado de la tarea entre "Pendiente" y "Completada" con un click.
- Eliminar tareas
- Ver el tiempo faltante (conteo regresivo) para completar cada tarea
- Ver el clima actual al momento de usarla (temperatura en °C, °F y humedad)

### Tecnologías utilizadas

- **HTML5** → Estructura de la interfaz
- **JavaScript (ES6)** → lógica y manipulación del DOM
- **pnpm** → gestor de dependencias
- **Bootstrap** → estilos

### Estructura del proyecto

TaskFlow/
│── index.html # Página principal

│── assets/ # Recursos gráficos y estilos

│── docs/ # Documentación adicional

│── package.json # Dependencias y scripts

│── pnpm-lock.yaml # Bloqueo de versiones

│── node_modules/ # Librerías instaladas

### Instalación y uso

1. Abre tu editor de código (como VSCode, por ejemplo) y ejecuta los siguientes comandos en la terminal:
   1. Clonar el repositorio:
      git clone https://github.com/galarragae/ABP_M5_TaskFlow.git
   2. Instalar dependencias:
      pnpm install
2. Abre el proyecto en el navegador y comienza a agregar tareas, cambiar el estado de las mismas o eliminarlas.

### ¿Qué encontrarás en este proyecto?

#### 1. Orientación a Objetos en JavaScript

En esta primera parte, se utiliza la POO para estructurar el proyecto y se definen dos clases principales:

- Clase Task (Tarea)
  - Propiedades:
    - id
    - description (descripción)
    - status (estado -inicialmente “pendiente”-)
    - creationDate (fecha de creación)
    - dueDate (fecha límite)
  - Método: changeStatus (cambiar estado de la tarea: alterna entre “pendiente” y “completada”).

- Clase TaskManager (gestor de tareas)
  - Administra un arreglo de tareas, inicialmente vacío
  - Se encarga de la persistencia y actualización de la lista.
  - Métodos:
    - addTask (agregar tarea)
    - deleteTask (eliminar tarea)
    - findTask (encontrar una tarea)
    - changeStatus (cambiar estado de la tarea)
    - showTaskList (renderizar la lista de tareas)
    - saveTask (actualiza la lista de tareas en local storage)

#### 2. Uso de ES6+

Este código código utiliza varias características modernas de JavaScript:

- let y const (versus var para las variables en versiones más antiguas).
- Template literals para agregar la descripción de cada tarea en el DOM de manera dinámica.
- Arrow functions en los manejadores de eventos.
- Uso de JSON.stringify y JSON.parse para manipular datos en localStorage.

#### 3. Eventos y Manipulación del DOM

La aplicación responde a la interacción del usuario:

- Formulario HTML para agregar tareas.
- Eventos submit y click para crear, cambiar estado y eliminar tareas.
- Función showTasks() que reconstruye dinámicamente la lista en el DOM.
- Botones individuales para cada acción sobre las tareas.

#### 4. Asincronía

Se ha implementado asincronía con:

- setTimeout() → muestra un alert simulando retardo al agregar una tarea.
- setInterval() → actualiza el conteo regresivo desde el momento actual hasta la fecha límite de cada tarea cada 1 segundo.

#### 5. Consumo de APIs

Se integra el consumo de una API externa:

- Uso de fetch para obtener datos desde la APIWeather.
- Manejo de errores con try/catch.
- Persistencia en localStorage para guardar y recuperar tareas.
