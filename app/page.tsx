"use client";
import { Key, useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { ArrowDownNarrowWide, ArrowUpNarrowWide, PlusIcon } from "lucide-react";
import { Tab, Tabs } from "@nextui-org/tabs";
import { useDisclosure } from "@nextui-org/modal";

import TaskList from "@/components/organism/TaskList";
import { useTaskStore } from "@/store/TaskStore";
import { STATUS } from "@/types/constant";
import { mapKeyToStatus } from "@/utils/utils";
import FormModal from "@/components/molecules/FormModal";

export default function Home() {
  const {
    displayedTasks,
    tasks,
    loadTasks,
    filterByStatus,
    sortByDate,
    resetTasks,
  } = useTaskStore();
  const [selected, setSelected] = useState<string>("All");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleSelected = (key: Key) => {
    setSelected(key.toString());
    if (key !== "All") {
      filterByStatus(mapKeyToStatus(key.toString()));
    } else {
      loadTasks();
    }
  };

  const handleSort = () => {
    setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    sortByDate(order);
  };

  return (
    <section className="p-6 xl:p-12 bg-foreground-50 min-h-screen">
      <div className="flex flex-col gap-8">
        <span className="text-4xl font-bold">Project Title</span>
        <div className="flex justify-between">
          <div className="flex justify-between w-1/2 gap-4">
            <div className="flex w-full gap-4">
              <Select
                className="w-72"
                label="Search By"
                placeholder="Select an option"
              >
                <SelectItem key="title">Title</SelectItem>
                <SelectItem key="description"> Description</SelectItem>
              </Select>

              <Input
                isClearable
                label="Search"
                placeholder="Type to search..."
                radius="lg"
              />
            </div>
            <div>
              <Button
                className="bg-default-100 h-full"
                startContent={
                  order === "desc" ? (
                    <ArrowUpNarrowWide />
                  ) : (
                    <ArrowDownNarrowWide />
                  )
                }
                onClick={handleSort}
              >
                Sort By Due Date
              </Button>
            </div>
          </div>
          <div className="h-full">
            <Button
              color="primary"
              startContent={<PlusIcon />}
              onPress={onOpen}
            >
              Add New Task
            </Button>
            <FormModal isOpen={isOpen} onOpenChange={onOpenChange} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Tabs
            aria-label="Options"
            selectedKey={selected}
            onSelectionChange={handleSelected}
          >
            <Tab key="All" title="All" />
            <Tab key={STATUS.PENDING} title={STATUS.PENDING} />
            <Tab key={STATUS.IN_PROGRESS} title={STATUS.IN_PROGRESS} />
            <Tab key={STATUS.COMPLETED} title={STATUS.COMPLETED} />
          </Tabs>

          <TaskList data={displayedTasks} />
        </div>
      </div>
    </section>
  );
}
