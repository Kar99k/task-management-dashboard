import { STATUS } from "@/types/status";

export const mockTasks: TaskItem[] = [
  {
    id: 1,
    title: "Complete project report",
    description: "Detailed explanation for task completion.",
    status: STATUS.IN_PROGRESS,
    dueDate: new Date("2023-12-01"),
  },
  {
    id: 2,
    title: "Update team meeting notes",
    description: "Ensure accuracy in all updates.",
    status: STATUS.PENDING,
    dueDate: new Date("2023-12-05"),
  },
  {
    id: 3,
    title: "Review pull requests",
    description: "Critical to deliver on time.",
    status: STATUS.COMPLETED,
    dueDate: new Date("2023-11-30"),
  },
  {
    id: 4,
    title: "Finalize design specs",
    description: "Review with the team before submission.",
    status: STATUS.IN_PROGRESS,
    dueDate: new Date("2023-12-10"),
  },
  {
    id: 5,
    title: "Fix critical bugs",
    description: "Coordinate with stakeholders.",
    status: STATUS.PENDING,
    dueDate: new Date("2023-12-15"),
  },
  {
    id: 6,
    title: "Test feature deployment",
    description: "Follow QA best practices.",
    status: STATUS.COMPLETED,
    dueDate: new Date("2023-11-28"),
  },
  {
    id: 7,
    title: "Organize project files",
    description: "Clean up unused resources.",
    status: STATUS.IN_PROGRESS,
    dueDate: new Date("2023-12-07"),
  },
  {
    id: 8,
    title: "Prepare for presentation",
    description: "Incorporate feedback into the process.",
    status: STATUS.PENDING,
    dueDate: new Date("2023-12-12"),
  },
  {
    id: 9,
    title: "Research new tools",
    description: "Explore alternatives for better performance.",
    status: STATUS.IN_PROGRESS,
    dueDate: new Date("2023-12-20"),
  },
  {
    id: 10,
    title: "Set up CI/CD pipeline",
    description: "Document the setup process thoroughly.",
    status: STATUS.COMPLETED,
    dueDate: new Date("2023-12-01"),
  },
];
