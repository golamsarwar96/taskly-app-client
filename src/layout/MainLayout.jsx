import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

const MainLayout = () => {
  return (
    <div className="font-kumbh">
      <Navbar></Navbar>
      <section>
        <Outlet></Outlet>
      </section>
    </div>
  );
};

export default MainLayout;
