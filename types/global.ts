import { STATUS } from "./constant";

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
