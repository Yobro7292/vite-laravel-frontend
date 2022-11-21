import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = (props: any) => {
  return props.auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
