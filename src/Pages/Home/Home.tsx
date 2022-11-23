import { useDispatch } from "react-redux";
import { removeToken } from "../../features/loginSlice";

function Home() {
  const dispatch = useDispatch()
const onLogout = () => {
  dispatch(removeToken());
}
  return (
    <div>
      <p className="text-white">Home</p> <br />
      <button className="px-4 py-1 bg-red-400 rounded-lg shadow-xl" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}
export default Home;
