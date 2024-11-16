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

const TaskItemCard = ({ title, description, status, dueDate }: TaskItem) => {
  return (
    <div>
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3 justify-between p-5">
          <span className="text-3xl font-semibold">{title}</span>
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="light">
                <EllipsisVertical />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new">Edit</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardHeader>
        <CardBody className="p-5 pt-0 text-foreground-700 flex flex-col gap-4">
          <p>{description}</p>
          <div className="flex justify-between">
            <Chip color="warning" radius="sm">
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
    </div>
  );
};

export default TaskItemCard;
