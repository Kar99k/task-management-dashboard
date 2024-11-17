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
  const { displayedTasks, loadTasks, filterByStatus, sortByDate, searchBy } =
    useTaskStore();
  const [selected, setSelected] = useState<string>("All");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [searchByOption, setSearchBy] = useState<Options>("Title");
  const [query, setQuery] = useState<string>("");

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

  useEffect(() => {
    searchBy({ searchByOption, query, selected });
  }, [searchByOption, query]);

  return (
    <section className="p-6 xl:p-12 bg-foreground-50 min-h-screen">
      <div className="flex flex-col gap-8">
        <span className="text-4xl font-bold">Task Managment Dashboard</span>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="flex flex-col gap-4 sm:w-1/2 max-w-xl">
              <Select
                className=""
                label="Search By"
                placeholder="Select an option"
                selectedKeys={new Set([searchByOption])}
                variant="bordered"
                onChange={(e) => setSearchBy(e.target.value as Options)}
              >
                <SelectItem key="Title">Title</SelectItem>
                <SelectItem key="Description"> Description</SelectItem>
              </Select>

              <Input
                label="Search"
                placeholder="Type to search..."
                radius="lg"
                value={query}
                variant="bordered"
                onValueChange={setQuery}
              />
            </div>
            <Button
              className="max-w-48"
              color="warning"
              startContent={
                order === "desc" ? (
                  <ArrowUpNarrowWide size={16} />
                ) : (
                  <ArrowDownNarrowWide size={16} />
                )
              }
              variant="flat"
              onClick={handleSort}
            >
              Sort By Due Date
            </Button>
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
