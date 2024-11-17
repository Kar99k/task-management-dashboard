import { create } from "zustand";

import TaskService from "@/services/TaskServices";
import { STATUS } from "@/types/constant";

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  displayedTasks: [],

  loadTasks: () => {
    const tasks = TaskService.getTasks();

    set({ tasks, displayedTasks: tasks });
  },

  addTask: (task: TaskItem) => {
    const updatedTasks = TaskService.addTask(task);

    set({ tasks: updatedTasks, displayedTasks: updatedTasks });
  },

  updateTask: (updatedTask: TaskItem) => {
    const updatedTasks = TaskService.updateTask(updatedTask);

    set({ tasks: updatedTasks, displayedTasks: updatedTasks });
  },

  deleteTask: (taskId: number) => {
    const updatedTasks = TaskService.deleteTask(taskId);

    set({ tasks: updatedTasks, displayedTasks: updatedTasks });
  },

  filterByStatus: (status: STATUS) => {
    set((state) => ({
      displayedTasks: state.tasks.filter((task) => task.status === status),
    }));
  },

  sortByDate: (order: "asc" | "desc") => {
    set((state) => ({
      displayedTasks: [...state.displayedTasks].sort((a, b) => {
        const dateA = new Date(a.dueDate).getTime();
        const dateB = new Date(b.dueDate).getTime();

        return order === "asc" ? dateA - dateB : dateB - dateA;
      }),
    }));
  },

  resetTasks: () => {
    set((state) => ({
      displayedTasks: state.tasks,
    }));
  },

  searchBy: ({ searchByOption, query }: SearchProps) => {
    set((state) => ({
      displayedTasks: state.tasks.filter((task) => {
        const fieldToSearch =
          searchByOption === "Title" ? task.title : task.description;

        return fieldToSearch.toLowerCase().includes(query.toLowerCase());
      }),
    }));
  },
}));
