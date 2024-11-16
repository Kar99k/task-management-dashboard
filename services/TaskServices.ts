import { LOCAL_STORAGE_KEY, STATUS } from "@/types/constant";

class TaskService {
  // Get all tasks
  static getTasks(): TaskItem[] {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);

    return data ? JSON.parse(data) : [];
  }

  // Adding a new task
  static addTask(task: TaskItem): void {
    const tasks = this.getTasks();

    tasks.push(task);
    this.saveTasks(tasks);
  }

  // Updating an existing task
  static updateTask(updatedTask: TaskItem): void {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === updatedTask.id);

    if (taskIndex !== -1) {
      tasks[taskIndex] = updatedTask;
      this.saveTasks(tasks);
    }
  }

  // Deletinig a task by ID
  static deleteTask(taskId: number): void {
    const tasks = this.getTasks();
    const filteredTasks = tasks.filter((task) => task.id !== taskId);

    this.saveTasks(filteredTasks);
  }

  // Save tasks to local storage
  private static saveTasks(tasks: TaskItem[]): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }
}

export default TaskService;
