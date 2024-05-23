import React from 'react'
import { FaInbox } from "react-icons/fa";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { MdAccessTime } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";
import { FiLock } from "react-icons/fi";
import { GrDocumentText } from "react-icons/gr";


function ServiceSection() {
  return (
    <div className=' font-family'>
        <div className='lg:px-32 md:px-16 px-5 py-20'>
            <div className='text-center text-4xl font-bold pb-14 lg:w-[600px] md:w-[500px] mx-auto'>Designed to help you build your business</div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-9 text-center'>
                <div className='p-7 py-20 rounded-md shadow-lg border'>
                    <div className=''><FaInbox className='text-7xl bg-[--second-color] text-[--three-color] p-5 rounded-lg mx-auto' /></div>
                    <div className='text-3xl font-medium py-3'>Quality leads</div>
                    <div className='text-gray-700'>Quality leads show high interest and engagement with products or services.</div>
                </div>
                <div className='p-7 py-20 rounded-md shadow-lg border'>
                    <div className=''><BsFillPersonCheckFill className='text-7xl bg-[--second-color] text-[--three-color] p-5 rounded-lg mx-auto' /></div>
                    <div className='text-3xl font-medium py-3'>Daily leads</div>
                    <div className='text-gray-700'>Fresh web development leads are added to your account daily.</div>
                </div>
                <div className='p-7 py-20 rounded-md shadow-lg border'>
                    <div className=''><MdAccessTime className='text-7xl bg-[--second-color] text-[--three-color] p-5 rounded-lg mx-auto' /></div>
                    <div className='text-3xl font-medium py-3'>Save time</div>
                    <div className='text-gray-700'>The only source of leads you'll need to grow your business.</div>
                </div>
                <div className='p-7 py-20 rounded-md shadow-lg border'>
                    <div className=''><IoMdCheckboxOutline className='text-7xl bg-[--second-color] text-[--three-color] p-5 rounded-lg mx-auto' /></div>
                    <div className='text-3xl font-medium py-3'>Accurate</div>
                    <div className='text-gray-700'>Leads are verified using costly tools to ensure accurate and up-to-date information.</div>
                </div>
                <div className='p-7 py-20 rounded-md shadow-lg border'>
                    <div className=''><FiLock className='text-7xl bg-[--second-color] text-[--three-color] p-5 rounded-lg mx-auto' /></div>
                    <div className='text-3xl font-medium py-3'>Exclusive leads</div>
                    <div className='text-gray-700'>Our exclusive leads have not been purchased from any other sources.</div>
                </div>
                <div className='p-7 py-20 rounded-md shadow-lg border'>
                    <div className=''><GrDocumentText className='text-7xl bg-[--second-color] text-[--three-color] p-5 rounded-lg mx-auto' /></div>
                    <div className='text-3xl font-medium py-3'>Data you need</div>
                    <div className='text-gray-700'>The data you need to find and engage the best prospects, so you can close more deals.</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ServiceSection