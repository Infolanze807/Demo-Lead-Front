import React, {useState} from "react";
import ContactImg from "../../Images//5138237-Photoroom.png-Photoroom.png";
import { NavLink } from "react-router-dom";

function ContactSection() {
  const [isActive, setIsActive] = useState(false);
  const handleNavLinkClick = () => {
    setIsActive(true); // Set isActive to true when NavLink is clicked
  };

  return (
    <div className="">
      <div className="bg-[--main-color] font-family">
        <div className="lg:px-36 md:px-20 px-5 py-16">
          <div className="grid lg:grid-cols-2 grid-cols-1 items-center">
            <div>
              <div><img className="lg:w-[560px] md:w-[500px] w-[400px] lg:mx-0 md:mx-auto mx-auto" src={ContactImg} alt="Contact" /></div>
            </div>
            <div className=" lg:pt-0 md:pt-7 pt-7 lg:px-10 md:px-4 lg:text-start md:text-center text-center">
              <div className="pb-1 font-semibold text-lg">Get in touch!</div>
              <div className="text-4xl font-bold pb-5">
                Explore how our services can be integrated with{" "}
                <span className=" text-[--three-color]">Your Business.</span>
              </div>
              <div className="font-semibold">
                We're just a conversation away!
              </div>
              <NavLink
                className={`w-max hover:text-[--three-color] text-white outline outline-2 outline-[--three-color] bg-[--three-color] hover:bg-white font-semibold rounded-md text-sm px-6 py-3 mt-4 block lg:mx-0 md:mx-auto mx-auto ${isActive ? 'active' : ''}`}
                to="/contact"
                onClick={handleNavLinkClick}
              >
                Get Started
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
