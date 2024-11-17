import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";

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

export const DateToCalendarDate = (date: Date): CalendarDate => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return new CalendarDate(year, month, day);
};

export const CalendarDateToDate = (calendarDate: CalendarDate): Date => {
  return new Date(calendarDate.year, calendarDate.month - 1, calendarDate.day);
};


