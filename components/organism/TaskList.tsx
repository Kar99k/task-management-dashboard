import TaskItemCard from "../molecules/TaskItemCard";

const TaskList = ({ data }: { data: TaskItem[] }) => {
  if (data.length === 0)
    return (
      <div className="text-foreground-700 text-2xl w-full text-center mt-56">
        Nothing to show ☹️
      </div>
    );

  return (
    <div className="flex justify-center xl:justify-normal">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {data.map((task, index) => {
          return (
            <TaskItemCard
              key={index}
              description={task.description}
              dueDate={task.dueDate ? new Date(task.dueDate) : null}
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
