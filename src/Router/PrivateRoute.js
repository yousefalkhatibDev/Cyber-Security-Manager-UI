import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const auth = window.sessionStorage.getItem("token");
  return auth ? children : <Navigate to={"/login"} />;
};

export default PrivateRoute;
