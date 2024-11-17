import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { CalendarClock, EllipsisVertical } from "lucide-react";
import { useDisclosure } from "@nextui-org/modal";

import FormModal from "./FormModal";

import { STATUS } from "@/types/constant";
import { useTaskStore } from "@/store/TaskStore";

const TaskItemCard = ({
  title,
  description,
  status,
  dueDate,
  id,
}: TaskItem) => {
  const { deleteTask } = useTaskStore();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDelete = (id: number) => {
    deleteTask(id);
  };

  return (
    <div>
      <Card className="min-w-[360px]">
        <CardHeader className="flex gap-3 justify-between p-5 items-start">
          <span className="text-3xl font-semibold">{title}</span>
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="light">
                <EllipsisVertical />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new" onPress={onOpen}>
                Edit
              </DropdownItem>
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                onClick={() => handleDelete(id)}
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>
        <CardBody className="p-5 pt-0 text-foreground-700 flex flex-col gap-4">
          <p>{description}</p>
          <div className="flex justify-between">
            <Chip
              color={
                status === STATUS.COMPLETED
                  ? "success"
                  : status === STATUS.IN_PROGRESS
                    ? "warning"
                    : "danger"
              }
              radius="sm"
            >
              {status}
            </Chip>

            <Chip
              className="font-semibold"
              color="danger"
              startContent={<CalendarClock />}
              variant="light"
            >
              {dueDate?.toLocaleDateString()}
            </Chip>
          </div>
        </CardBody>
        <Divider />
      </Card>
      <FormModal
        isOpen={isOpen}
        task={{ title, description, status, dueDate, id }}
        onOpenChange={onOpenChange}
      />
    </div>
  );
};

export default TaskItemCard;
