import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const { createUser, updateUserProfile, googleSignIn } =
    useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];
    const formData = new FormData();
    formData.append("image", image);

    console.log(email, password);

    //imgbb
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      formData
    );
    const img_URL = data.data.display_url;

    //create user and save in db
    try {
      const result = await createUser(email, password);
      console.log(result);
      const userInfo = {
        email,
        name,
        img_URL,
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/users`, userInfo);
      await updateUserProfile(name, img_URL);

      toast.success("successfully signed up");
    } catch (err) {
      toast.error(err.message);
    }
  };

  //Google Sign In
  const handleThirdPartySignUp = async () => {
    try {
      const result = await googleSignIn();
      console.log(result);

      await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
        name: result.user?.displayName,
        email: result.user?.email?.email,
        image: result.user?.photoURL,
      });
    } catch {
      console.log("ERROR");
    }
  };

  return (
    <div className="flex justify-center items-center mt-40">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="name"
              placeholder="Your Name"
              name="name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              name="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              name="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div>
            <div>
              <input
                type="file"
                className="file-input file-input-bordered file-input-md w-full max-w-xs"
                id="image"
                name="image"
                accept="image/*"
                required
              />
            </div>
          </div>
          <div>
            <button className="btn" onClick={handleThirdPartySignUp}>
              Google Sign Up
            </button>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
