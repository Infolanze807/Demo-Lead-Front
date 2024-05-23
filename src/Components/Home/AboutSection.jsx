import React from 'react'
import { IoMdCheckboxOutline } from "react-icons/io";
import { NavLink } from 'react-router-dom';

function AboutSection() {

    const includedFeatures = [
        'Leads added daily',
        'Search, filter & track leads',
        'Proven marketing strategies',
        'Exclusive growth only leads',
        'Up to date reports and reporting',
      ]

  return (
    <div className='lg:px-36 md:px-20 px-5 pb-16 pt-14 font-family'>
        <div>
        <div className="bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">Transparent Pricing</div>
          <p className="mt-6 text-lg leading-8 text-gray-600">
          Ready to get started on your next lead? Our diverse pricing models tailor our services to your needs.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-16 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Membership Price</h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
            We work for you. So we don’t take a percentage of your client fees. You just make one simple and affordable payment.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-[--three-color]">What’s included</h4>
              <div className="h-px flex-auto bg-gray-100" />
            </div>
            <ul
            //   role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <IoMdCheckboxOutline className=" text-[--three-color] h-6 w-5 flex-none" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-[--main-color] py-10 text-center ring-1 ring-inset h-full ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <div className="mx-auto max-w-xs px-3">
                <p className="text-base font-semibold text-gray-600">Pay once, own it forever</p>
                <div className='flex justify-center'>
                    <div className=''>
                    <p className="mt-6 flex items-baseline justify-center gap-x-2 border-e-2 pe-3">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">99</span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">INR / Month</span>
                </p>
                    </div>
                    <div className="">
                    <p className="mt-6 flex items-baseline justify-center gap-x-2 ps-3">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">999</span>
                  <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">INR / Year</span>
                </p>
                    </div>
                </div>
                <NavLink
                  to="/register"
                  className="mt-10 block w-full rounded-md bg-[--three-color] outline outline-2 outline-[--three-color] hover:bg-white hover:text-[--three-color] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm"
                >
                  Get access
                </NavLink>
                <p className="mt-6 text-xs leading-5 text-gray-600">
                  Invoices and receipts available for easy company reimbursement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        </div>

    </div>
  )
}

export default AboutSection