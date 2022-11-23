import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "../app/store";
import Loading from "../components/common/Loading";
import { setIsLogin } from "../features/loginSlice";
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

export const authTokenKey:string = import.meta.env.VITE_TOKEN_KEY
const localToken:string | null | undefined = localStorage.getItem(authTokenKey);

function MainRoutes() {
  const isLogin = useSelector(selectIsOn);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const verifyToken = () => {
    if(localToken && localToken.trim() !== ''){
      //if user already login and token is available in localstorage
      //verifytokenAPI call here
    } else {
      // not verify 
      localStorage.removeItem(authTokenKey) 
    }
  }
  useEffect(() => {
    verifyToken();
  }, []);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          {/* common Routes define first */}
          {/* <Route path="/cf" element={<Home />} /> */}

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
