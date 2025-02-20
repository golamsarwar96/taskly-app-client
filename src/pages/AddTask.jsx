import axios from "axios";
import toast from "react-hot-toast";

const AddTask = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const task = form.task.value;
    const description = form.description.value;
    const category = form.category.value;
    console.log(task, description, category);

    const taskInfo = {
      task: task,
      description: description,
      category: category,
    };

    //post req to db
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, taskInfo);
      toast.success("Task Added Successfully");
    } catch (err) {
      console.error(err);
      toast.error("Task Added Failed");
    }

    form.reset();
  };
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <h1 className="mt-10 text-4xl">ADD Task</h1>
      <div className="card bg-base-100 w-full max-w-xl shrink-0 shadow-2xl mt-6">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset">
              <label className="fieldset-label">Task</label>
              <input
                type="text"
                className="input input-warning w-full"
                placeholder="Task Name"
                name="task"
              />
              <label className="fieldset-label">Description</label>
              <textarea
                type="text"
                placeholder="Add Task Description"
                className="textarea textarea-warning w-full"
                name="description"
              ></textarea>
              <label className="fieldset-label">Category</label>
              <input
                type="text"
                className="input input-warning w-full"
                placeholder="Task Category"
                name="category"
              />
              <input
                type="submit"
                value="Add Task"
                className="btn bg-primaryColor text-warning mt-4"
              />
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
