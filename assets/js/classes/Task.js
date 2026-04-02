// 1. Crear clase tarea (Task)
class Task {
  constructor(id, description, status, creationDate, dueDate) {
    this.id = id; // número o string
    this.description = description; // string (input)
    this.status = status; // boolean
    this.creationDate = creationDate; // string
    this.dueDate = dueDate;
  }

  changeStatus() {
    this.status = !this.status; // automáticamente será false
  }
}

export default Task;
