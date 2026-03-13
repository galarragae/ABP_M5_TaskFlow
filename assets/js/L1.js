class Task {
  constructor(id, description, status, creationDate) {
    this.id = id; // número o string
    this.description = description; // string (input)
    this.status = status; // boolean
    this.creationDate = creationDate; // string
  }

  changeStatus() {
    this.status = !this.status; // automáticamente será false
  }
}

class TaskManager {
  #tasks = [];

  // -------- Agregar una tarea --------
  addTask(task) {
    this.#tasks.push(task);
  }

  // -------- Eliminar una tarea --------
  deleteTask(id) {
    let foundTask = this.#findTask(id);
    if (!foundTask) {
      console.log("Task not found");
      return; // Salimos de la función y no hace nada más
    }

    this.#tasks = this.#tasks.filter((task) => task.id !== id);
  }

  // -------- Encontrar una tarea -------
  #findTask(id) {
    return this.#tasks.find((task) => task.id === id);
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
  }

  // -------- Mostrar lista de tareas --------
  showTasksList() {
    return this.#tasks;
  }
}

// Instanciar las clases
const taskManager = new TaskManager();
taskManager.addTask(
  new Task(1, "Tarea 1", true, new Date().toLocaleString("es-CL")),
);
taskManager.addTask(
  new Task(2, "Tarea 2", false, new Date().toLocaleString("es-CL")),
);
taskManager.addTask(
  new Task(3, "Tarea 3", true, new Date().toLocaleString("es-CL")),
);

// -------- Mostrar lista de tareas --------
console.log(`\n-------- Mostrar lista de tareas --------\n`);
console.log(taskManager.showTasksList());

// -------- Eliminar una tarea --------
console.log(`\n-------- Eliminar una tarea --------\n`);
taskManager.deleteTask(1);
console.log(`Después de eliminar la tarea con id 1`);
console.log(taskManager.showTasksList());


// -------- Uso del objeto Date --------
console.log(`\n-------- Uso del objeto Date --------\n`);
const date = new Date();
const [month, day, year, hours, minutes, seconds] = [
  date.getMonth(),
  date.getDate(),
  date.getFullYear(),
  date.getHours(),
  date.getMinutes(),
  date.getSeconds(),
];

console.log(`${day}/${month + 1}/${year} - ${hours}:${minutes}:${seconds}`); // Enero es el mes 0, por eso: month + 1
// Feha y hora en formato local:
// Date -> objeto preconstruido de JS // 'es-CL' lenguaje: español, ubicación: Chile
console.log(new Date().toLocaleString("es-CL"));
