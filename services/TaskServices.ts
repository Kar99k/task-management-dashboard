import { LOCAL_STORAGE_KEY } from "@/types/constant";

class TaskService {
  static getTasks(): TaskItem[] {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);

    return data ? JSON.parse(data) : [];
  }

  // Adding a new task
  static addTask(task: TaskItem): TaskItem[] {
    const tasks = this.getTasks();

    tasks.push(task);
    this.saveTasks(tasks);

    return tasks;
  }

  // Updating an existing task
  static updateTask(updatedTask: TaskItem): TaskItem[] {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex((task) => task.id === updatedTask.id);

    if (taskIndex !== -1) {
      tasks[taskIndex] = updatedTask;
      this.saveTasks(tasks);
    }

    return tasks;
  }

  // Deleting a task by ID
  static deleteTask(taskId: number): TaskItem[] {
    const tasks = this.getTasks();
    const filteredTasks = tasks.filter((task) => task.id !== taskId);

    this.saveTasks(filteredTasks);

    return filteredTasks;
  }

  // Save tasks to local storage
  private static saveTasks(tasks: TaskItem[]): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }
}

export default TaskService;
