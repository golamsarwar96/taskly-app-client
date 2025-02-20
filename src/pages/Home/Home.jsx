import Done from "./TaskColumn/Done";
import InProgress from "./TaskColumn/InProgress";
import ToDo from "./TaskColumn/ToDo";

const Home = () => {
  return (
    <div className="px-8">
      <h1>Home</h1>
      <div className="grid md:grid-cols-3 grid-cols-1">
        <ToDo></ToDo>
        <InProgress></InProgress>
        <Done></Done>
      </div>
    </div>
  );
};

export default Home;
