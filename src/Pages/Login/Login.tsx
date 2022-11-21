import { useAppDispatch } from "../../app/store";
import { checkIsLogin } from "../../features/loginSlice";

function Login() {
  const dispatch = useAppDispatch();
  const onLogin = () => {
    localStorage.setItem("token", "123456");
    dispatch(checkIsLogin(true));
  };
  return (
    <div className="flex justify-center items-center flex-col align-middle">
      <span className="text-xl w-full text-center text-orange-500">
        Login Component
      </span>
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
