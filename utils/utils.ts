import { STATUS } from "@/types/constant";

export const mapKeyToStatus = (key: string): STATUS => {
  switch (key) {
    case "In Progress":
      return STATUS.IN_PROGRESS;
    case "Pending":
      return STATUS.PENDING;
    case "Completed":
      return STATUS.COMPLETED;
    default:
      return STATUS.COMPLETED;
  }
};
