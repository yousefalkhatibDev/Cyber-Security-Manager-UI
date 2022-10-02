import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const auth = window.sessionStorage.getItem("token");
  return auth ? children : <Navigate to={"/login"} />;
};

export default PrivateRoute;
