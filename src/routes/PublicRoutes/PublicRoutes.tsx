import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = (props: any) => {
  return props.auth ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
