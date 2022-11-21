import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "../app/store";
import Loading from "../components/common/Loading";
import { checkIsLogin } from "../features/loginSlice";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import NotFound from "../Pages/NotFound/NotFound";
import PrivateRoutes from "./PrivateRoutes/PrivateRoute";
import PublicRoutes from "./PublicRoutes/PublicRoutes";

interface LoginState {
  Login: {
    isLogin: boolean;
  };
}

const selectIsOn = (state: LoginState) => state.Login.isLogin;

// this promise is just for demo.
// call an API to check is user is logged in or not
const loginPromise = new Promise((resolve, reject) => {
  const token = localStorage.getItem("token");
  setTimeout(() => {
    if (token && token !== null) resolve(true);
    else reject(false);
  }, 2000);
});

function MainRoutes() {
  const isLogin = useSelector(selectIsOn);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  //You have to call an API for checking is this user is logged in or not.
  const checkLoginPromise = async () => {
    await loginPromise
      .then((isLogin) => {
        dispatch(checkIsLogin(isLogin ? true : false));
        setLoading(false);
      })
      .catch((err) => {
        dispatch(checkIsLogin(false));
        setLoading(false);
      });
  };
  useEffect(() => {
    checkLoginPromise();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          {/* common Routes define first */}
          <Route path="/cf" element={<Home />} />

          {/* these are private (protected) routes */}
          <Route path="/" element={<PrivateRoutes auth={isLogin} />}>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Home />} />
          </Route>

          {/* this is public route */}
          <Route path="/login" element={<PublicRoutes auth={isLogin} />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* if all routs are faild than show not found page 
          also this route must be define at the end */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}
export default MainRoutes;
