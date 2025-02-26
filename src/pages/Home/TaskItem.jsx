/* eslint-disable react/prop-types */
import { useDrag } from "react-dnd";
import { FiDelete } from "react-icons/fi";

const TaskItem = ({ task }) => {
  const handleDelete = () => {
    console.log("Deleted");
  };
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { task },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="p-2 m-2 bg-white shadow rounded cursor-pointer"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <h3 className="font-bold">{task.task}</h3>
      <p>{task.description}</p>
      <button onClick={handleDelete}>
        {" "}
        <FiDelete></FiDelete>
      </button>
    </div>
  );
};

export default TaskItem;
