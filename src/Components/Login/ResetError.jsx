import React from 'react'
import { NavLink } from 'react-router-dom';
import { BiError } from "react-icons/bi";

function ResetError() {
  return (
    <div className='bg-[--main-color] font-family'>
      <div className='lg:max-w-lg md:max-w-lg px-5 lg:py-20 md:py-10 py-10 mx-auto'>
        <div className='border rounded-md lg:p-10 md:p-10 p-5 py-10 text-center bg-white'>
          <div><BiError className='text-6xl mx-auto text-[--three-color]' /></div>
          <div className='text-2xl font-semibold pt-5 pb-2'>Oops, this link is not valid</div>
          <div className='text-sm text-gray-500'>Maybe the link has expired, revoked, or maybe it was not copied correctly.</div>
          <div className='pt-5'><NavLink to="/register" className="text-sm text-[--three-color] hover:text-black">Back To Login</NavLink></div>
        </div>
      </div>
    </div>
  )
}

export default ResetError;