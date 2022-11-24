import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/store";
import { removeToken } from "../../features/loginSlice";
interface HomePropsInterface {
  isVerified : boolean
}
interface LoginState {
  Login: {
   user: {
    name: string;
   }
  };
}
const user = (state: LoginState) => state.Login.user;

const Home:React.FC<HomePropsInterface> = (props) => {
  const USER = useSelector(user);
  const dispatch = useAppDispatch()
const onLogout = () => {
  dispatch(removeToken());
}
  return (
    <div>
      <p className="text-emerald-400 text-sm mb-4">Welcome {USER.name}</p> <br />
      <p className="text-white">Home</p> <br />
      <button className="px-4 py-1 bg-red-400 rounded-lg shadow-xl" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}
export default Home;
