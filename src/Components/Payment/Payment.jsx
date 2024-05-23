import React, {useEffect} from "react";
import { NavLink } from "react-router-dom";
import { TbDiscountCheckFilled } from "react-icons/tb";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Payment() {

  useEffect(() => {
    // Show success notification when component mounts
    toast.success("Signup Successful!");
  }, []);

  return (
    <div className='bg-[--main-color] font-family'>
      <div className='lg:max-w-md md:max-w-md px-5 lg:py-20 md:py-10 py-10 mx-auto'>
        <div className='border shadow rounded-md lg:p-10 md:p-10 p-5 py-10 text-center bg-white'>
          <div><TbDiscountCheckFilled className='text-7xl mx-auto text-[--three-color]' /></div>
          <div className="pt-5 text-xs">Powered by Lead Hunter</div>
          <div className='text-2xl font-semibold pt-2 pb-4'>Your Payment is Successful!</div>
          <div className='text-sm text-gray-500'>Thank you for your payment. An automated payment receipt will be send to your register e-mail.</div>
          {/* <div className='pt-4 pb-5'>
            <div className="relative mt-2 rounded-md shadow-sm">
            </div>
            <button className=' bg-[--three-color] text-white hover:text-[--three-color] p-2 px-5 hover:bg-white outline outline-[--three-color] rounded-md text-sm text-[--three-color] uppercase mt-5'>Submit</button>
          </div> */}
          <div className="pt-8"><NavLink to="/register" className="bg-[--three-color] text-white hover:text-[--three-color] p-2 px-5 hover:bg-white outline outline-[--three-color] rounded-md text-sm text-[--three-color] uppercase">Back To Login</NavLink></div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
