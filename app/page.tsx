"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { ArrowUpNarrowWide, PlusIcon } from "lucide-react";

import TaskItemCard from "@/components/molecules/TaskItemCard";
import { STATUS } from "@/types/status";
import TaskList from "@/components/organism/TaskList";
export default function Home() {
  return (
    <section className="p-6 xl:p-12 bg-foreground-50 min-h-screen">
      <div className="flex flex-col gap-8">
        <span className="text-4xl font-bold">Project Title</span>
        <div className="flex justify-between">
          <div className="flex justify-between w-1/2 gap-4">
            <div className="flex w-full gap-4">
              <Select
                label="Search By"
                placeholder="Select an option"
                className="w-72"
              >
                <SelectItem key="title">Title</SelectItem>
                <SelectItem key="description"> Description</SelectItem>
              </Select>

              <Input
                label="Search"
                isClearable
                radius="lg"
                placeholder="Type to search..."
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
            <Button startContent={<PlusIcon />} color="primary">
              Add New Task
            </Button>
          </div>
        </div>

        <div className="">
          <TaskList />
        </div>
      </div>
    </section>
  );
}
