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

  const { addTask, updateTask } = useTaskStore();

  const clearField = () => {
    setTitle("");
    setDescription("");
    setDueDate(null);
    setStatus(STATUS.PENDING);
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
                  label="Due Date"
                  minValue={today(getLocalTimeZone())}
                  validationBehavior="native"
                  value={dueDate ? DateToCalendarDate(dueDate) : undefined}
                  onChange={(date) => setDueDate(CalendarDateToDate(date))}
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