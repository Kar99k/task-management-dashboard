import { create } from "zustand";

import TaskService from "@/services/TaskServices";
import { STATUS } from "@/types/constant";
import { mockTasks } from "@/data/mockData";

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  displayedTasks: [],

  loadTasks: () => {
    const tasks = TaskService.getTasks();

    set({ tasks, displayedTasks: tasks });
  },

  addMockTasks: () => {
    TaskService.saveTasks(mockTasks);
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
        const dateA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
        const dateB = b.dueDate ? new Date(b.dueDate).getTime() : 0;

        return order === "asc" ? dateA - dateB : dateB - dateA;
      }),
    }));
  },

  searchBy: ({ searchByOption, query, selected }: SearchProps) => {
    set((state) => ({
      displayedTasks: state.tasks.filter((task) => {
        if ((task.status as string) === selected || selected === "All") {
          const fieldToSearch =
            searchByOption === "Title" ? task.title : task.description;

          return fieldToSearch.toLowerCase().includes(query.toLowerCase());
        }
      }),
    }));
  },
}));
