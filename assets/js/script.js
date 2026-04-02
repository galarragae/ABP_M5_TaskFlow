// Importar las clases modularizadas
import Task from "./classes/Task.js";
import TaskManager from "./classes/TaskManager.js";
import { success, error, options } from "./APIs/geolocation.js";

const taskForm = document.getElementById("task-form");
const tasksList = document.getElementById("tasks-list");

// Instanciar las clases
const taskManager = new TaskManager();

// Crear una alerta para que el usuario sepa que se está agregando la tarea
const insertAlert = (className, message) => {
  const alert = `
  <div class="alert alert-${className} alert-dismissible fade show" role="alert">
  ${message}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  `;

  document.getElementById("alert-container").innerHTML = alert;
};

// Contador regresivo

const countdownTimer = (dueDate) => {
  const actualDate = new Date().getTime();
  const timingDifference = dueDate - actualDate; // Diferencia en milisegundos

  const days = Math.floor(timingDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timingDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor(
    (timingDifference % (1000 * 60 * 60)) / (1000 * 60),
  );
  const seconds = Math.floor((timingDifference % (1000 * 60)) / 1000);

  return `${days} días, ${hours} horas, ${minutes} minutos y ${seconds} segundos`;
};

// Función para renderizar tareas
const tasksListRendering = () => {
  tasksList.innerHTML = "";
  const tasksArray = taskManager.showTasksList();

  tasksArray.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center",
    );

    // SPAN para cuenta regresiva!!!
    const span = document.createElement("span");
    // dataset --> hace referencia a data-id, data-label, data-cualquierCosa
    span.dataset.id = task.id;
    span.classList.add("date-countdown", "small", "text-muted");
    span.textContent = countdownTimer(task.dueDate);

    const { description, status } = task;
    li.textContent = `${description} ---> ${status ? "Completada" : "Pendiente"}`;

    // Botones para eliminar y cambiar estado de una tarea
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger", "btn-sm", "delete-button");
    deleteButton.textContent = "Eliminar";
    deleteButton.dataset.id = task.id;

    const changeButton = document.createElement("button");
    changeButton.classList.add("btn", "btn-success", "btn-sm", "change-button");
    changeButton.textContent = "Cambiar estado";
    changeButton.dataset.id = task.id;

    li.appendChild(span);
    li.appendChild(changeButton);
    li.appendChild(deleteButton);
    tasksList.appendChild(li);
  });
};

tasksListRendering(); // Para la primera carga de tareas

// ===============================================================================
// Actualizar el contador regresivo de cada tarea cada 1 segundo
// ===============================================================================

setInterval(() => {
  // Capturar los <span> donde va cada cuenta regresiva
  const countdown = document.querySelectorAll(".date-countdown");
  countdown.forEach((span) => {
    // Extraer el id del <span> (es el mismo de la tarea)
    const id = Number(span.dataset.id);
    // Encontrar la tarea correspondiente
    const task = taskManager.showTasksList().find((task) => task.id === id);
    if (task) {
      // Si es que hay tarea, actualizar el temporizador de la respectiva tarea
      span.textContent = countdownTimer(task.dueDate);
    }
  });
}, 1000);

// ===============================================================================
// Evento submit para el form (agregar tareas a la lista renderizada)
// ===============================================================================

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Insertar la alerta para que el usuario sepa que se está agregando la tarea
  insertAlert(
    "warning",
    "<strong>Agregando tarea a la lista</strong>, por favor espere...",
  );

  // Simular un retraso al agregar tarea
  setTimeout(() => {
    const description = document.getElementById("task-description").value;
    const dueDate = document.getElementById("due-date").value;
    const deadline = dueDate ? new Date(dueDate).getTime() : undefined; // new Date().getTime() devuelve los milisegundos desde 01/01/1970
    const newTask = new Task(
      Date.now(), // id
      description, // description
      false, // status
      new Date().toLocaleDateString("es-CL"), // creationDate
      deadline, // dueDate
    );

    taskManager.addTask(newTask);

    event.target.reset();
    insertAlert("success", "¡Tarea agregada exitosamente a la lista!");

    tasksListRendering();
  }, 1000);
});

// ===============================================================================
// Delegación de eventos: Event Listener (clicks en Eliminar y Cambiar estado)
// ===============================================================================

tasksList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-button")) {
    const id = Number(event.target.dataset.id);
    // console.log(event.target); // Para corroborar si está tomando el elemento que corresponde
    taskManager.deleteTask(id);
    tasksListRendering();
  }
});

tasksList.addEventListener("click", (event) => {
  if (event.target.classList.contains("change-button")) {
    const id = Number(event.target.dataset.id);

    taskManager.changeStatus(id);
    tasksListRendering();
  }
});

// Geolocation API (del navegador)
navigator.geolocation.getCurrentPosition(success, error, options);
