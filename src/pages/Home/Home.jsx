import { useContext, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import TaskColumn from "./TaskColumn";
import { HTML5Backend } from "react-dnd-html5-backend";
import bgTaskly from "../../assets/images/bg-taskly.png";
import { AuthContext } from "../../provider/AuthProvider";

const Home = () => {
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "https://taskly-app-server.vercel.app/tasks"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const fetchedTasks = await response.json();

        // Filter tasks based on the user's email
        const userTasks = fetchedTasks.filter(
          (task) => task?.user_email === user?.email
        );

        // Ensure the categories are initialized properly
        const categorizedTasks = { todo: [], inProgress: [], done: [] };

        userTasks.forEach((task) => {
          const categoryKey = task.category?.toLowerCase();
          if (categorizedTasks[categoryKey]) {
            categorizedTasks[categoryKey].push(task);
          } else {
            console.warn(`Invalid category: ${task.category}`);
          }
        });

        setTasks(categorizedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [user?.email]);

  const moveTask = (task, newColumn) => {
    setTasks((prevTasks) => {
      const newTasks = {
        todo: prevTasks.todo.filter((t) => t.id !== task.id),
        inProgress: prevTasks.inProgress.filter((t) => t.id !== task.id),
        done: prevTasks.done.filter((t) => t.id !== task.id),
      };

      if (!newTasks[newColumn]) {
        console.error(`Invalid column type: ${newColumn}`);
        return prevTasks;
      }

      newTasks[newColumn] = [
        ...newTasks[newColumn],
        { ...task, category: newColumn },
      ];

      return newTasks;
    });
  };

  return (
    <div
      className="flex flex-col lg:flex-row gap-10 justify-center items-start pt-32 h-screen max-h-screen bg-cover"
      style={{ backgroundImage: `url(${bgTaskly})` }}
    >
      <DndProvider backend={HTML5Backend}>
        <div className="">
          <div className="grid md:grid-cols-3 grid-cols-1 justify-center items-center gap-10">
            <TaskColumn
              title="To Do"
              tasks={tasks.todo}
              onDrop={moveTask}
              columnType="todo"
            />
            <TaskColumn
              title="In Progress"
              tasks={tasks.inProgress}
              onDrop={moveTask}
              columnType="inProgress"
            />
            <TaskColumn
              title="Done"
              tasks={tasks.done}
              onDrop={moveTask}
              columnType="done"
            />
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default Home;
