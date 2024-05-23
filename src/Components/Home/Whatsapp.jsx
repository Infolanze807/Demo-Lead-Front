import React, { useState } from "react";
import img from "../../Images/vecteezy_whatsapp-png-icon_16716480.png";
import { IoMdClose } from "react-icons/io";
import { NavLink } from "react-router-dom";

function Whatsapp() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div>
      {isVisible && (
      <div className="fixed top-24 right-3" >
            <div className="w-max hover:cursor-pointer rounded-full absolute right-3 top-5">
              <IoMdClose className="" onClick={handleClose} />
            </div>
        <NavLink to="/contact">
            <div className="flex bg-white p-4 shadow-lg rounded-md">
                <div className="border-[--three-color] border-s-8 pe-4"></div>
                <div>
                    <p className="text-[--three-color] text-lg font-semibold">Contact !</p>
                    <p className="text-sm text-gray-800">Contact Us & Get 10 leads for Free</p>
                </div>
            </div>
        </NavLink>
      </div>
    )}
      <div className="fixed bottom-3 left-3">
        <a href="https://wa.me/917016160435" target="_blank" rel="noreferrer">
          <img src={img} alt="Chat" className="w-9 md:w-10 lg:w-12" />
        </a>
      </div>
    </div>
  );
}

export default Whatsapp;
