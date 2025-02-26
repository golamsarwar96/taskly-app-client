/* eslint-disable react/prop-types */
import { useDrop } from "react-dnd";
import TaskItem from "./TaskItem";

const TaskColumn = ({ title, tasks, onDrop, columnType }) => {
  const [, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => onDrop(item.task, columnType),
  }));

  return (
    <div ref={drop} className="w-[80%] p-4 bg-gray-200 min-h-[200px] rounded">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskColumn;
