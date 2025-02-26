import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import bgTaskly from "../../assets/images/bg-taskly.png";
import axios from "axios";

const Login = () => {
  const { userLogin, googleSignIn } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    console.log(email, password);

    try {
      const result = await userLogin(email, password);
      console.log(result);
      navigate(from, { replace: true });
      toast.success("Successfully Logged In");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  //Google Sign In
  const handleThirdPartySignIn = async () => {
    try {
      const result = await googleSignIn();
      console.log(result);

      await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
        name: result.user?.displayName,
        email: result.user?.email?.email,
        image: result.user?.photoURL,
      });
      toast.success("Successfully Logged In");
      navigate("/");
    } catch {
      toast.error("ERROR");
    }
  };
  return (
    <div
      className="flex flex-col gap-10 items-center h-screen max-h-[1000px] bg-cover "
      style={{ backgroundImage: `url(${bgTaskly})` }}
    >
      <div className="text-center lg:mt-32 mt-10">
        <h1 className="text-white text-5xl font-bold">
          <span className="lg:*:text-accentColor">Welcome</span> To Task
          <span className="lg:text-accentColor">ly</span>.
        </h1>
        <p className="text-white text-3xl font-bold mt-4 bg-primaryColor">
          Login and add Tasks easily and efficiently
        </p>
      </div>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleSubmit} className="card-body">
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
          <div className="form-control mt-6 space-y-3">
            <button
              className="bg-accentColor px-5 py-2 w-full font-bold text-white"
              onClick={handleThirdPartySignIn}
            >
              Sign in with Google
            </button>
            <button className="bg-accentColor px-5 py-2 w-full font-bold text-white">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
