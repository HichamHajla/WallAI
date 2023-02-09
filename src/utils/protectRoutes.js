
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    return (
      localStorage.getItem('usertoken') ? (
        <Outlet />
      ) : (
        <Navigate to="/" />
      )
    );
  };

export default ProtectedRoutes;