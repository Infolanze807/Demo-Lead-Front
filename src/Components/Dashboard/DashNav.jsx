  import React, { useState } from "react";
  import { NavLink } from "react-router-dom";
  import { FaBars } from "react-icons/fa6";
  import { AiOutlineClose } from "react-icons/ai";
  import "../../Components/Header/Header.css";
  import Logo from "../../Images/Logo-Blue-1.png";

  function DashNav({ role }) {
    const [isActive, setIsActive] = useState(1);
    const [isOpen, setIsOpen] = useState(true);

    const handleNavSelected = (e) => {
      setIsActive(e.target.id);
      setIsOpen(true);
    };

    const handleLogout = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
          method: "GET",
          credentials: "include",
        });

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        
        if (response.ok) {
          // Clear local session state if needed
          console.log("Logged out successfully");
          window.location.href = "/";
        } else {
          console.error("Logout failed");
        }
      } catch (error) {
        console.error("Error occurred during logout", error);
      }
    };


    return (
      <div className="fixed w-full z-50">
        <nav className="bg-white w-full shadow-lg lg:px-20 md:px-7 px-4 font-family border-b ">
          <div className=" flex flex-wrap items-center justify-between mx-auto">
            <div className="z-40">
            <img className="w-44 lg:w-48 md:w-44 z-40 " src={Logo} alt="nishant" />
            </div>
            <div className="flex lg:order-2 space-x-3 lg:space-x-0 rtl:space-x-reverse">
            <NavLink 
              // to="/" 
              activeclassname="active"
              id="0"
              // onClick={(e) => handleNavSelected(e)}
              onClick={(e) => handleLogout()}
              className={`hidden lg:block lg:px-8 md:px-8 px-6 z-40 hover:bg-[--three-color] bg-white text-[--three-color] outline outline-2 hover:text-white outline-[--three-color] font-medium rounded-md text-sm py-2 text-center ${
                isActive === "0" ? "active hover:text-white cursor-pointer" : "hover:text-white cursor-pointer"
              }`}
            >
              LogOut
            </NavLink>
              <button
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="lg:hidden absolute   cursor-pointer h-fit z-40"
                >
                  {isOpen ? <FaBars className="text-2xl" /> : <AiOutlineClose className="text-2xl" />}
                </div>
              </button>
            </div>
            <div
              className={`z-[-1] lg:-z-0 nav-menu lg:flex lg:pb-0 lg:py-0 md:py-7 py-7 lg:items-center text-base absolute  lg:static right-0 w-full lg:w-auto md:pl-0 transition-all duration-500 ease-in 
            ${isOpen ? " top-[-220px]" : "top-[29px]"}` }
              id="navbar-sticky"
            >
              <ul className="gap-4 z-[-1] flex flex-col nav-menu p-4 lg::p-0 mt-4 lg:mb-0 md:mb-4 mb-4 font-medium rounded-lg lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {role === "Admin" && (
                <li className="text-gray-400">
                <NavLink
                  id="1"
                  to='/add-leads'
                  activeclassname="active"
                  onClick={(e) => handleNavSelected(e)}
                  className={
                    isActive === "1"
                      ? "active mr-5  hover:text-black  cursor-pointer "
                      : "mr-5  hover:text-black  cursor-pointer"
                  }
                >
                Add Leads
                </NavLink>
                </li>
                )}
                {role === "Admin" && (
                <li className="text-gray-400">
                <NavLink
                  id="4"
                  to='/show-leads'
                  activeclassname="active"
                  onClick={(e) => handleNavSelected(e)}
                  className={
                    isActive === "4"
                      ? "active mr-5  hover:text-black  cursor-pointer "
                      : "mr-5  hover:text-black  cursor-pointer"
                  }
                >
                Show Leads
                </NavLink>
                </li>
                )}
                {role !== "Admin" && (
                <li className="text-gray-400">
                <NavLink
                  to="/dashboard"
                  id="2"
                  activeclassname="active"
                  onClick={(e) => handleNavSelected(e)}
                  className={
                    isActive === "2"
                      ? "active mr-5  hover:text-black  cursor-pointer "
                      : "mr-5  hover:text-black  cursor-pointer "
                  }
                >
                 FreeLancing Jobs
                </NavLink>
                </li>
                 )}
                 {role !== "Admin" && (
                <li className="text-gray-400">
                <NavLink
                  to="/remote-job"
                  id="3"
                  activeclassname="active"
                  onClick={(e) => handleNavSelected(e)}
                  className={
                    isActive === "3"
                      ? "active mr-5  hover:text-black  cursor-pointer "
                      : "mr-5  hover:text-black  cursor-pointer "
                  }
                >
                  Remote Jobs
                </NavLink>
                </li>
                 )}
                 <li className="text-gray-400 lg:hidden block">
                 <NavLink
                  to="/"
                  id="4"
                  activeclassname="active"
                  onClick={(e) => handleLogout(e)}
                  className={
                    isActive === "4"
                      ? " active mr-5  hover:text-black  cursor-pointer "
                      : "mr-5  hover:text-black  cursor-pointer "
                  }
                >
                  Logout
                </NavLink>
                </li>
            {/* <NavLink 
              // to="/" 
              activeclassname="active"
              id="0"
              // onClick={(e) => handleNavSelected(e)}
              onClick={(e) => handleLogout()}
              className={`lg:hidden block w-4/12 text-center${
                isActive === "0" ? "active hover:text-white cursor-pointer" : "hover:text-white cursor-pointer"
              }`}
            >
              LogOut
            </NavLink> */}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }

  export default DashNav;

