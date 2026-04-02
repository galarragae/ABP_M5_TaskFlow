import Task from "./Task.js";

// 2. Crear clase gestor de tareas (TaskManager)
class TaskManager {
  // tasks = [];

  // Vamos al localStorage para buscar las tareas (si no se hace este constructor,
  // la lista de tareas seguiría siendo un objeto, pero plano)
  constructor() {
    // Por cada tarea que haya, vamos a crear una instancia de tarea
    this.tasks =
      JSON.parse(localStorage.getItem("tasks"))?.map(
        (task) =>
          new Task(
            task.id,
            task.description,
            task.status,
            task.creationDate,
            task.dueDate,
          ),
      ) || [];
  }

  // -------- Agregar una tarea --------
  addTask(task) {
    this.tasks.push(task);
    this.#saveTask();
  }

  // -------- Eliminar una tarea --------
  deleteTask(id) {
    let foundTask = this.#findTask(id);
    if (!foundTask) {
      console.log("Task not found");
      return; // Salimos de la función y no hace nada más
    }

    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.#saveTask();
  }

  // -------- Encontrar una tarea -------
  #findTask(id) {
    return this.tasks.find((task) => task.id === id);
  }

  // -------- Cambiar es estado de una tarea --------
  changeStatus(id) {
    let foundTask = this.#findTask(id);
    if (!foundTask) {
      console.log("Task not found");
      return; // Salimos de la función y no hace nada más
    }

    // Si encontró la tarea:
    foundTask.changeStatus();
    this.#saveTask();
  }

  // -------- Mostrar lista de tareas --------
  showTasksList() {
    return this.tasks;
  }

  #saveTask = () => {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  };
}

export default TaskManager;
