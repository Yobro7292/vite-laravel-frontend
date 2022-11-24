import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/store";
import { setIsLogin, setToken, setUser } from "../../features/loginSlice";
import { authTokenKey } from "../../routes";
import { useRegisterMutation } from "../../services/AuthApi";

function Register() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [c_password, setC_Password] = useState<string>("");
  const [warning, setWarning] = useState<string>("");
  const [registerStatus, response] = useRegisterMutation<any>();
  const dispatch = useAppDispatch();
  const onRegister = () => {
    if (password !== c_password) {
      setWarning("Password should match with confirm password");
    } else if (email === "" || name === "" || password === "") {
      setWarning("Please provide proper data");
    } else {
      setWarning('')
      const data = {
        name,
        email,
        password,
        confirm_password: c_password,
      };
      registerStatus(data)
      .unwrap()
      .then((res)=>{
        if(res){
          console.log(res);
          if(res.success) dispatch(setIsLogin(true));
          if(res.token){
            dispatch(setToken(res.token));
            localStorage.setItem(authTokenKey, res.token);
          }
          if(res.user) dispatch(setUser(res.user))
        }
      })
      .catch((error)=>{
        console.log(error);
      })
    }
  };
  return (
    <div className="flex justify-center items-center flex-col align-middle w-full">
      {warning && (
        <p className="text-lg text-red-500 font-medium mb-5">{warning}</p>
      )}
      {response.isError && <span className="text-red-500 text-xl">{response.error.data.message}</span>}
      {response.isLoading && <span className="text-yellow-500 text-xl">Loading</span>}
      {response.isSuccess && <span className="text-emerald-500 text-xl">Success</span>}
      <div className="w-1/2 p-4 rounded-lg border border-green-700">
        <form>
          <span className="text-green-500 text-xl">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              e.preventDefault();
              setName(e.target.value);
            }}
            className="w-full px-2 py-2  bg-black text-white border-none rounded-md"
            autoComplete="username"
          />
          <span className="text-green-500 text-xl">Email</span>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              e.preventDefault();
              setEmail(e.target.value);
            }}
            className="w-full px-2 py-2  bg-black text-white border-none rounded-md"
            autoComplete="username"
          />
          <span className="text-green-500 text-xl">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              e.preventDefault();
              setPassword(e.target.value);
            }}
            className="w-full px-2 py-2  bg-black text-white border-none rounded-md"
            autoComplete="current-password"
          />
          <span className="text-green-500 text-xl">Confirm Password</span>
          <input
            type="password"
            value={c_password}
            onChange={(e) => {
              e.preventDefault();
              setC_Password(e.target.value);
            }}
            className="w-full px-2 py-2  bg-black text-white border-none rounded-md"
            autoComplete="current-password"
          />
        </form>
      </div>
      <button
        className="px-4 py-2 ml-3 bg-green-300 rounded-lg text-green-800 text-lg font-bold border-none hover:border-none mt-4"
        onClick={onRegister}
      >
        Register
      </button>
      <p className="text-white text-sm mt-6">Already have account?
      <Link to='/login'>
        <span className="text-emerald-500 text-sm decoration-white decoration-solid">
          {" "}Login Here</span>
      </Link>
      </p>
    </div>
  );
}
export default Register;
