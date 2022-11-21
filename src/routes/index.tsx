import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import NotFound from '../Pages/NotFound/NotFound';
import PrivateRoutes from './PrivateRoutes/PrivateRoute';
import PublicRoutes from './PublicRoutes/PublicRoutes';

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="/login" element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
}
export default MainRoutes;
