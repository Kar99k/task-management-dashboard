export {};

declare global {
  enum STATUS {
    IN_PROGRESS = "In Progress",
    PENDING = "Pending",
    COMPLETED = "Completed",
  }

  interface TaskItem {
    title: string;
    description: string;
    status: STATUS;
    dueDate: Date;
  }

  type TaskList = TaskItem[];
}
