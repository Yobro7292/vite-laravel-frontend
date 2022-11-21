import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/store";
import { checkIsLogin } from "../../features/loginSlice";

function Home() {
  const dispatch = useAppDispatch();
  const onLogout = () => {
    localStorage.removeItem("token");
    dispatch(checkIsLogin(false));
  };
  return (
    <div className="flex justify-center items-center flex-col align-middle">
      <span className="text-xl w-full text-center text-lime-500">
        Home Component
      </span>
      <button
        className="px-4 py-2 ml-3 bg-red-300 rounded-lg text-red-800 text-lg font-bold border-none hover:border-none mt-4"
        onClick={onLogout}
      >
        Logout
      </button>
      <Link to="/notfound">
        <button className="px-4 py-2 ml-3 bg-red-300 rounded-lg text-red-800 text-lg font-bold border-none hover:border-none mt-4">
          To another page
        </button>
      </Link>
    </div>
  );
}
export default Home;
