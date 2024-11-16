import { STATUS } from "./status";

export {};

declare global {
  interface TaskItem {
    id: number;
    title: string;
    description: string;
    status: STATUS;
    dueDate: Date;
  }

  type TaskList = TaskItem[];
}
