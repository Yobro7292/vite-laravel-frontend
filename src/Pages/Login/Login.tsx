import { useState } from "react";
import { useAppDispatch } from "../../app/store";
import { setIsLogin, setToken } from "../../features/loginSlice";
import { useLoginMutation } from "../../services/AuthApi";

function Login() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loginStatus, response] = useLoginMutation();
  const dispatch = useAppDispatch();
  const onLogin = () => {
    const data = {
      email,
      password
    }
    loginStatus(data)
    .unwrap()
    .then((res) => {
      if(res && res.token){
        dispatch(setToken(res.token));
        dispatch(setIsLogin(true));
      }
    })
    .catch((error) => {
      console.log(error)
    })
  };
  return (
    <div className="flex justify-center items-center flex-col align-middle w-full">
      {response.isError && <span className="text-red-500 text-xl">Invalid username or password</span>}
      {response.isLoading && <span className="text-yellow-500 text-xl">Loading</span>}
      {response.isSuccess && <span className="text-emerald-500 text-xl">Success</span>}
      <div className="w-1/2 p-4 rounded-lg border border-green-700">
        <span className="text-green-500 text-xl">Email</span>
        <form>
        <input type="text" value={email} onChange={(e)=>{
          e.preventDefault();
          setEmail(e.target.value)
        }} className="w-full px-2 py-2 mt-2 bg-black text-white border-none rounded-md mb-8"
        autoComplete='username' />
        <span className="text-green-500 text-xl">Password</span>
        <input type="password" value={password} onChange={(e)=>{
          e.preventDefault();
          setPassword(e.target.value)
        }} className="w-full px-2 py-2 mt-2 bg-black text-white border-none rounded-md" autoComplete="current-password" />
      </form>
      </div>
      <button
        className="px-4 py-2 ml-3 bg-green-300 rounded-lg text-green-800 text-lg font-bold border-none hover:border-none mt-4"
        onClick={onLogin}
      >
        Login
      </button>
      
    </div>
  );
}
export default Login;
