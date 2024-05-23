import React from 'react'
// import ServiceImg from "../../Images/giving-back.png";
import { MdOutlineWeb } from "react-icons/md";
 
function ServiceSection() {
  return (
    <div className='font-family'>
        <div className='lg:px-36 md:px-20 px-5 py-10 lg:pb-20'>
            <div className='text-4xl font-semibold text-center pb-10 text-[--three-color]'>Technologys We Provide on Leads:</div>
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-10'>
              <div className='border bg-[--main-color] rounded lg:p-8 md:p-8 p-4 shadow-md'>
                <div className='flex items-center'>
                  <div className='p-6 rounded-full bg-white me-7'>
                    <MdOutlineWeb className='text-4xl text-[--three-color]'  />
                  </div>
                  <div>
                    <div className='text-2xl font-semibold'>Web Design & Development</div>
                    <div className='pt-1 text-sm lg:block md:block hidden'>Utilizing React JS, Node JS, Shopify, JavaScript, and PHP, we provide top-notch web design and development services that are both innovative and efficient.</div>
                  </div>
                </div>
              </div>
              <div className='border bg-[--main-color] rounded  lg:p-8 md:p-8 p-4 shadow-md'>
                <div className='flex items-center'>
                  <div className='p-6 rounded-full bg-white me-7'>
                    <MdOutlineWeb className='text-4xl text-[--three-color]'  />
                  </div>
                  <div>
                    <div className='text-2xl font-semibold'>Graphic Design</div>
                    <div className='pt-1  text-sm lg:block md:block hidden'> Utilizing cutting-edge technology, we specialize in graphic design that seamlessly integrates UI and UX elements.</div>
                  </div>
                </div>
              </div>
              <div className='border bg-[--main-color] rounded lg:p-8 md:p-8 p-4 shadow-md'>
                <div className='flex items-center'>
                  <div className='p-6 rounded-full bg-white me-7'>
                    <MdOutlineWeb className='text-4xl text-[--three-color]'  />
                  </div>
                  <div>
                    <div className='text-2xl font-semibold'>Blockchain Development</div>
                    <div className='pt-1 text-sm lg:block md:block hidden '>Blockchain development involves creating and managing decentralized ledgers using cryptography for transparency, immutability, and security across systems.</div>
                  </div>
                </div>
              </div>
              <div className='border bg-[--main-color] rounded lg:p-8 md:p-8 p-4 shadow-md'>
                <div className='flex items-center'>
                  <div className='p-6 rounded-full bg-white me-7'>
                    <MdOutlineWeb className='text-4xl text-[--three-color]'  />
                  </div>
                  <div>
                    <div className='text-2xl font-semibold'>E-commerce</div>
                    <div className='pt-1  text-sm lg:block md:block hidden'>Utilizing cutting-edge technologies, we specialize in e-commerce website development to create innovative online shopping experiences.</div>
                  </div>
                </div>
              </div>
              <div className='border bg-[--main-color] rounded lg:p-8 md:p-8 p-4 shadow-md'>
                <div className='flex items-center'>
                  <div className='p-6 rounded-full bg-white me-7'>
                    <MdOutlineWeb className='text-4xl text-[--three-color]'  />
                  </div>
                  <div>
                    <div className='text-2xl font-semibold'>Software Design & Development</div>
                    <div className='pt-1  text-sm lg:block md:block hidden'>Software development and designing involve the process of creating and implementing computer programs and applications.</div>
                  </div>
                </div>
              </div>
              <div className='border bg-[--main-color] rounded lg:p-8 md:p-8 p-4 shadow-md'>
                <div className='flex items-center'>
                  <div className='p-6 rounded-full bg-white me-7'>
                    <MdOutlineWeb className='text-4xl text-[--three-color]'  />
                  </div>
                  <div>
                    <div className='text-2xl font-semibold'>Search Engine Optimization</div>
                    <div className='pt-1  text-sm lg:block md:block hidden'>SEO enhances website visibility and ranking through strategic techniques, boosting organic traffic and maximizing online presence effectively.</div>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default ServiceSection