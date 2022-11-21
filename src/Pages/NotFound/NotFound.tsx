import { Link } from "react-router-dom";
import { redirect } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex justify-center items-center flex-col align-middle w-full">
      <span className="text-xl w-full text-center text-stone-500">
        Not Found
      </span>
      <Link to="/">
        <button className="px-4 py-2 ml-3 bg-stone-300 rounded-lg text-stone-800 text-lg font-bold border-none hover:border-none mt-4">
          Go Home
        </button>
      </Link>
    </div>
  );
}
export default NotFound;
