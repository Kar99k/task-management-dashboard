import TaskItemCard from "../molecules/TaskItemCard";

const TaskList = ({ data }: { data: TaskItem[] }) => {
  return (
    <div className="flex justify-center md:justify-normal">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.map((task, index) => {
          return (
            <TaskItemCard
              key={index}
              description={task.description}
              dueDate={new Date(task.dueDate)}
              id={task.id}
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
