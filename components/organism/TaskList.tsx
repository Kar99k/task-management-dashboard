import TaskItemCard from "../molecules/TaskItemCard";

import { mockTasks } from "@/data/mockData";

const TaskList = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mockTasks.map((task, index) => {
          return (
            <TaskItemCard
              key={index}
              description={task.description}
              dueDate={task.dueDate}
              id={123}
              status={task.status}
              title={task.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TaskList;
