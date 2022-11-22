import { useEffect } from 'react';
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
  useState,
} from 'react';
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../app/store";
import Loading from '../../components/common/Loading';
import { checkIsLogin } from "../../features/loginSlice";
import { useProductsQuery, useSingleProductQuery } from "../../services/ProductsApi";

function Home() {

    const dispatch = useAppDispatch();
    const [id, setId] = useState<number>(6)
    const [returnData, setReturnData] = useState<any>(null)
    const onLogout = () => {
      localStorage.removeItem("token");
      dispatch(checkIsLogin(false));
    };
    const onNext = () => {
      setReturnData(null)
      setId(id+1)
    }
    const singleProduct:any = useSingleProductQuery(id);
    useEffect(()=>{
      if(singleProduct.isSuccess){
        setReturnData(singleProduct.data)
      }
    },[singleProduct])
  return (
    <div className='grid grid-cols-2 gap-0 justify-between w-full justify-items-center p-5'>
      <div className='w-[80%] h-[50vh] mx-4  py-6 px-4 border-2 border-black rounded-lg overflow-auto'>
        {singleProduct.isSuccess && <p className='text-emerald-600 text-lg'>Data Fetched</p>}
        {singleProduct.error && <p className='text-red-600 text-lg'>Error while fatching</p>}
        <div className='flex flex-col justify-end align-bottom h-[90%]'>
        <div className='flex justify-center items-center w-full rounded-xl '>
          <button className='w-full h-12 mx-4 rounded-xl bg-sky-400 text-sky-800 hover:bg-sky-300 font-bold flex justify-center items-center'
          onClick={onLogout}
          >
            LogOut
          </button>
          <button className='w-full h-12 mx-4 rounded-xl bg-green-400 text-green-800 hover:bg-green-300 font-bold flex justify-center items-center'
          onClick={onNext}
          >
            Next
          </button>
        </div>
        </div>
      </div>
      <div className='w-[80%] h-[50vh] mx-4  py-6 px-4 bg-slate-800 rounded-lg overflow-auto'>
        {singleProduct.isFetching && <Loading />}
        {singleProduct.isSuccess && returnData && (
          <div className='w-[600px] h-full flex justify-start items-center'>
            <img src={returnData.images[0]} alt="product_123" className='w-[40%] rounded-2xl shadow-xl shadow-gray-800' />
          <pre className='text-green-500 font-light whitespace-pre-wrap ml-6'>
            {JSON.stringify(returnData)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
export default Home;
