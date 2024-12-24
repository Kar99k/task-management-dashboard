import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Input, Textarea } from "@nextui-org/input";
import { today, getLocalTimeZone } from "@internationalized/date";
import { DatePicker } from "@nextui-org/date-picker";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";

import { STATUS } from "@/types/constant";
import { useTaskStore } from "@/store/TaskStore";
import { CalendarDateToDate, DateToCalendarDate } from "@/utils/utils";

const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onOpenChange,
  task,
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<Date | null>();
  const [status, setStatus] = useState<STATUS>(STATUS.PENDING);
  const [error, setError] = useState<ErrorState>({
    title: { errorMessage: "", isError: false },
    dueDate: { errorMessage: "", isError: false },
  });

  const validateFields = (title: string, dueDate: Date | null): boolean => {
    let isValid = true;

    // Title Validation
    const titleError = { errorMessage: "", isError: false };

    if (!title.trim()) {
      titleError.errorMessage = "Task Title is required.";
      titleError.isError = true;
      isValid = false;
    } else if (title.length < 4) {
      titleError.errorMessage = "Task Title must be at least 4 characters.";
      titleError.isError = true;
      isValid = false;
    }

    // Due Date Validation
    const dueDateError = { errorMessage: "", isError: false };
    const today = new Date();

    today.setHours(0, 0, 0, 0); // Normalize today's date
    if (!dueDate) {
      dueDateError.errorMessage = "Due Date is required.";
      dueDateError.isError = true;
      isValid = false;
    } else if (dueDate < today) {
      dueDateError.errorMessage = "Due Date cannot be in the past.";
      dueDateError.isError = true;
      isValid = false;
    }

    // Update error state
    setError({
      title: titleError,
      dueDate: dueDateError,
    });

    return isValid;
  };

  const { addTask, updateTask } = useTaskStore();

  const clearField = () => {
    setTitle("");
    setDescription("");
    setDueDate(null);
    setStatus(STATUS.PENDING);
    setError({
      title: { errorMessage: "", isError: false },
      dueDate: { errorMessage: "", isError: false },
    });
  };

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate);
      setStatus(task.status);
    } else {
      clearField();
    }
  }, [task]);

  const handleSubmit = () => {
    if (validateFields(title, dueDate || null)) {
      const newTask: TaskItem = {
        id: task?.id || Date.now(),
        title,
        description,
        status,
        dueDate: dueDate || null,
      };

      if (task) {
        updateTask(newTask);
        clearField();
      } else {
        addTask(newTask);
        clearField();
      }

      onOpenChange(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {task ? "Edit Task" : "Create New Task"}
            </ModalHeader>
            <ModalBody>
              <Input
                isRequired
                errorMessage={error.title.errorMessage}
                isInvalid={error.title.isError}
                label="Task Title"
                placeholder="Enter Task Title"
                type="text"
                validationBehavior="native"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Textarea
                label="Description"
                placeholder="Enter your description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="flex gap-4">
                <DatePicker
                  isRequired
                  errorMessage={error.dueDate.errorMessage}
                  isInvalid={error.dueDate.isError}
                  label="Due Date"
                  minValue={today(getLocalTimeZone())}
                  validationBehavior="native"
                  value={dueDate ? DateToCalendarDate(dueDate) : undefined}
                  onChange={(date: any) => setDueDate(CalendarDateToDate(date))}
                />
                {task && (
                  <Select
                    label="Status"
                    placeholder="Select Status"
                    selectedKeys={new Set([status])}
                    onChange={(e) => setStatus(e.target.value as STATUS)}
                  >
                    {Object.values(STATUS).map((value) => {
                      return <SelectItem key={value}>{value}</SelectItem>;
                    })}
                  </Select>
                )}
              </div>
            </ModalBody>
            <ModalFooter className="flex w-full justify-center gap-4">
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                className="text-white"
                color="success"
                onPress={handleSubmit}
              >
                {task ? "Update" : "Create"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default FormModal;
