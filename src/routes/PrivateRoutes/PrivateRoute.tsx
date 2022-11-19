import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  const user = localStorage.getItem('token');
  if (user) {
    console.log('Token found in Private');
    return true;
  } else {
    return false;
  }
};

const PrivateRoutes = (props: any) => {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
