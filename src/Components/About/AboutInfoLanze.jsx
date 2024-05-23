import React from "react";
import AboutInfoImg from "../../Images/about info.jpg";

function AboutInfo() {
  return (
    <div className="font-family">
      <div className="lg:px-36 md:px-20 px-5 pt-5 pb-20">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-16 items-center">
          <div className="lg:order-2">
            <img className="mx-auto w-[550px]" src={AboutInfoImg} alt="" />
          </div>
          <div className="text-lg lg:order-1">
          <div className="text-5xl font-semibold text-[--three-color] pb-5">About Lead Hunter</div>
            <div className="pb-4 lg:pe-4">
              LeadHunter is a dynamic platform that serves as a dedicated
              marketplace for freelancers seeking employment opportunities and
              project assignments. Our platform efficiently connects skilled
              professionals with prospective clients, facilitating seamless
              collaboration and project fulfillment.
            </div>
            <div>
              Our commitment to quality and reliability ensures that both
              freelancers and clients experience a streamlined and effective
              process, ultimately fostering success and satisfaction on all
              fronts. Join LeadHunter today to unlock a world of possibilities
              for your freelance career or to fulfill your project needs with
              top-tier talent.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutInfo;
