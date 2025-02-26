/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  console.log(user, user?.email);
  const location = useLocation();

  if (loading)
    return <span className="loading loading-spinner loading-lg"></span>;

  if (user && user?.email) return children;

  return <Navigate to="/login" state={location.pathname}></Navigate>;
};

export default PrivateRoute;
