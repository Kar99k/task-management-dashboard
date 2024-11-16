"use client";
import { Key, useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { ArrowUpNarrowWide, PlusIcon } from "lucide-react";
import { Tab, Tabs } from "@nextui-org/tabs";

import TaskList from "@/components/organism/TaskList";
import TaskService from "@/services/TaskServices";
import { useTaskStore } from "@/store/TaskStore";
import { STATUS } from "@/types/constant";
import { mapKeyToStatus } from "@/utils/utils";

export default function Home() {
  const [tasks, setTasks] = useState<TaskItem[]>(TaskService.getTasks());
  const {
    displayedTasks,
    loadTasks,
    addTask,
    updateTask,
    deleteTask,
    filterByStatus,
    sortByDate,
    resetTasks,
  } = useTaskStore();

  const [selected, setSelected] = useState<string>("All");

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
                startContent={<ArrowUpNarrowWide />}
              >
                Sort By Due Date
              </Button>
            </div>
          </div>
          <div className="h-full">
            <Button color="primary" startContent={<PlusIcon />}>
              Add New Task
            </Button>
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
