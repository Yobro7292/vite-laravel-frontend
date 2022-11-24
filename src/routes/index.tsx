import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "../app/store";
import Loading from "../components/common/Loading";
import { setIsLogin, setToken, setUser } from "../features/loginSlice";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import NotFound from "../Pages/NotFound/NotFound";
import Register from "../Pages/Register/Register";
import ResetPassword from "../Pages/ResetPassword/ResetPassword";
import AuthApi, { useVerifyTokenMutation } from "../services/AuthApi";
import PrivateRoutes from "./PrivateRoutes/PrivateRoute";
import PublicRoutes from "./PublicRoutes/PublicRoutes";

interface LoginState {
  Login: {
    isLogin: boolean;
  };
}

const selectIsOn = (state: LoginState) => state.Login.isLogin;

export const authTokenKey:string = import.meta.env.VITE_TOKEN_KEY


function MainRoutes() {
  const isLogin = useSelector(selectIsOn);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('Loading...');
  const [tokenStauts, response] = useVerifyTokenMutation<any>();
  const dispatch = useAppDispatch();

  const verifyToken = () => {
    setLoadingMsg('Fetching Token...')
    const localToken:string | null | undefined = localStorage.getItem(authTokenKey);
    if(localToken && localToken.trim() !== ''){
    setLoadingMsg('Verifying Token...')
      //if user already login and token is available in localstorage
      //verifytokenAPI call here
      const data={
        token: localToken
      }
      tokenStauts(data)
      .unwrap()
      .then((res)=>{
        if(res){
          if(res.success && res.user !== null)
          {
            setLoadingMsg('Token Verified <br /> Loading Assets...')
            dispatch(setIsLogin(true));
            dispatch(setUser(res.user));
            dispatch(setToken(localToken));
            dispatch(AuthApi.util.resetApiState())
            setLoading(false)
          }
        }
      }).catch((error)=>{
        setLoadingMsg('Invalid Token')
        setLoading(false)
      console.log(error)
      })
    } else {
      // not verify 
      setLoadingMsg('Token not found')
      localStorage.removeItem(authTokenKey) 
      setLoading(false)
    }
  }
  useEffect(() => {
    setLoading(true)
    verifyToken();
  }, []);
  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center">
      {loading && (<Loading message={loadingMsg} />)} 
      {!loading  && (
        <Routes>
          {/* common Routes define first */}
          {/* <Route path="/cf" element={<Home />} /> */}

          {/* these are private (protected) routes */}
          <Route path="/" element={<PrivateRoutes auth={isLogin} />}>
            <Route path="/" element={<Home isVerified={isLogin} />} />
            <Route path="/dashboard" element={<Home isVerified={isLogin} />} />
          </Route>

          {/* this is public route */}
          <Route path="/" element={<PublicRoutes auth={isLogin} />}>
            <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          {/* if all routs are faild than show not found page 
          also this route must be define at the end */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
      </div> 
    </>
  );
}
export default MainRoutes;
