import React from "react";
import img1 from "../../Images/6155818-removebg.png";
import "./Home.css";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="lg:px-20 md:px-7 px-5 py-10 font-family bg-[--main-color]">
      <div className="grid lg:grid-cols-2 items-center">
        <div className="lg:order-1 order-2">
          <div className="w-max bg-[--second-color] p-2 px-3 rounded-lg uppercase shadow-md">
            Lead Generation
          </div>
          <div className="text-5xl lg:text-6xl md:text-6xl font-semibold pt-3">
            Lead Subscription
          </div>
          <div className="text-lg py-5">
            <p className="pb-4">
              Looking for freelance or remote work? Look no further than
              LeadHunter! As a top-notch freelancer site, we provide a platform
              where you can find and apply for exciting job leads. Don't miss
              out on the chance to work on your own terms - sign up with
              LeadHunter now!
            </p>
            <p>
              Join our community today and unlock your potential in the gig
              economy!
            </p>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-10 lg:pt-3 lg:px-0 md:px-0 px-5">
                <Link
                  to="/register"
                  className="text-black"
                >
            <div className=" rounded-lg text-center bg-[--second-color] py-7 shadow-md">
              <h3 className="text-5xl font-semibold">
                  99<sub className="text-sm">INR</sub>
              </h3>
              <p className="pt-2">Cost Per Month(CPM)</p>
            </div>
                </Link>
                <Link
                  to="/register"
                  className="text-black"
                >
            <div className=" rounded-lg text-center bg-[--second-color] py-7 shadow-md">
            <h3 className="text-5xl font-semibold">
                  999<sub className="text-sm">INR</sub>
              </h3>
              <p className="pt-2">Contract Per Year</p>
            </div>
                </Link>
          </div>
        </div>
        <div className="lg:order-2 order-1">
          <div>
            <img className="w-[640px] mx-auto" src={img1} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
