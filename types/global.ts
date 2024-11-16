import { STATUS } from "./constant";

export {};

declare global {
  interface TaskItem {
    id: number;
    title: string;
    description: string;
    status: STATUS;
    dueDate: Date | null;
  }

  type TaskList = TaskItem[];

  interface TaskStore {
    tasks: TaskItem[]; // All tasks
    displayedTasks: TaskItem[]; // Filtered and sorted tasks
    loadTasks: () => void; // Load tasks from TaskService
    addTask: (task: TaskItem) => void;
    updateTask: (task: TaskItem) => void;
    deleteTask: (taskId: number) => void;
    filterByStatus: (status: STATUS) => void;
    sortByDate: (order: "asc" | "desc") => void;
    resetTasks: () => void;
  }

  interface FormModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    task?: TaskItem;
  }
}
