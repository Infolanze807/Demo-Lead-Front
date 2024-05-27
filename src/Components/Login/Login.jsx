import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import LoginImg from "../../Images/6310507-Photoroom.png-Photoroom.png";
import { RiLoginBoxLine } from "react-icons/ri";
import { SiGnuprivacyguard } from "react-icons/si";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { MdKey, MdVisibilityOff, MdVisibility } from "react-icons/md";
import { SiGmail } from "react-icons/si";
import { IoPerson } from "react-icons/io5";
import { IoIosCall } from "react-icons/io";

function LoginDemo({ role }) {
  const navigate = useNavigate();

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  // State variables for login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginEmailError, setLoginEmailError] = useState(false);
  const [loginPasswordError, setLoginPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // State variables for signup form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phonenumberError, setPhonenumberError] = useState(false);
  const [signupPasswordError, setSignupPasswordError] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentStatusError, setPaymentStatusError] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [error, setError] = useState(null);

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "loginEmail") {
      setLoginEmail(value);
      // setLoginEmailError(value.length === 0);
    } else if (name === "loginPassword") {
      setLoginPassword(value);
    }
  };

  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phonenumber":
        setPhoneNumber(value);
        break;
      case "signupPassword":
        setSignupPassword(value);
        break;
      case "paymentStatus":
        setPaymentStatus(value);
        break;
      default:
        break;
    }
  };

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    if (!loginEmail || !loginPassword) {
      setLoginEmailError(!loginEmail);
      setLoginPasswordError(!loginPassword);
      setIsLoading(false);
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginEmail)) {
      setLoginEmailError(true);
      setIsLoading(false);
      toast.error("Please enter a valid email address");
      return;
    }
    if (loginPassword.length < 6) {
      setLoginPasswordError(true);
      setIsLoading(false);
      toast.error("Password must be at least 6 characters");
      return;
    }
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          email: loginEmail,
          password: loginPassword,
        }
      );
  
      if (response.data.user === true) {
        console.log("Login successful", response.data);
        const { token, role, message } = response.data;
        notifySuccess(message);
  
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
  
        if (role === "Admin") {
          navigate("/add-leads");
        } else {
          navigate("/dashboard");
        }
      } else {
        // Handle incorrect password or other authentication errors
        notifyError(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        notifyError(error.response.data.message);
      } else {
        notifyError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  

  const handleSignupFormSubmit = async (e) => {
    e.preventDefault();
    // Validation for signup form fields
    if (!name || !email || !phonenumber || !signupPassword) {
      setNameError(!name);
      setEmailError(!email);
      setPhonenumberError(!phonenumber);
      setSignupPasswordError(!signupPassword);
      return;
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
      toast.error("Please enter a valid email address");
      return;
    }

    // Validate phone number length
    if (!/^\d{8,12}$/.test(phonenumber)) {
      setPhonenumberError(true);
      toast.error("Please enter a valid phone number");
      return;
    }

    // Validate password minimum length
    if (signupPassword.length < 6) {
      setSignupPasswordError(true);
      toast.error("Password must be at least 6 characters");
      return;
    }
    handlePopup();
  };

  const handlePopup = () => {
    setShowPopup(true);
  };

  const handlePaymentSubmit = async () => {
    try {
      if (!paymentStatus) {
        toast.error("Please select a payment option!");
        return;
      }
      if (!termsChecked) {
        toast.error("Please agree to the Terms and Conditions!");
        return;
      }

      setIsPaymentLoading(true);
      let amount;
      switch (paymentStatus) {
        case "99":
          amount = 99;
          break;
        case "999":
          amount = 999;
          break;
        default:
          setPaymentStatusError(true);
          return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/phonepe/payment`,
        {
          name,
          email,
          phonenumber,
          password: signupPassword,
          amount,
        }
      );
      if (response.data.status === false) {
        notifyError(response.data.message);
      } else if (response.data.status === true) {
        window.location.href = response.data.url;
        // navigate("/register");
      }
      setIsPaymentLoading(false);
    } catch (error) {
      notifyError(error.message);
      setIsPaymentLoading(false);
    }
  };

  const handleSwitchForm = () => {
    setIsLoginForm(!isLoginForm);
    setName("");
    setEmail("");
    setPhoneNumber("");
    setSignupPassword("");
    setLoginEmail("");
    setLoginPassword("");
  };

  return (
    <div className="bg-[--main-color]">
      {/* <ToastContainer />   */}
      <div className="container mx-auto font-family">
        <section id="formHolder">
          <div className="grid lg:grid-cols-2 md:grid-cols-1">
            {/* Brand Box */}
            <div className=" brand lg:rounded-md  rounded-b-md">
              <div className="text-center lg:pt-16 pt-5 pb-5">
                <div>
                  <img className="w-64 mx-auto" src={LoginImg} alt="img" />
                </div>
                <div className="lg:text-4xl text-3xl pt-3 text-[--three-color]">
                  Welcome to the Lead Hunter
                </div>
                <div className="text-sm font-semibold text-gray-600 pt-3">
                  Log in / Registration
                </div>
              </div>
            </div>

            {/* Form Box */}
            <div className="form">
              {/* Login Form */}
              <div
                className={`login lg:rounded-md rounded-b-md form-peice ${
                  isLoginForm ? "switched" : ""
                }`}
              >
                <form className="login-form" onSubmit={handleLoginFormSubmit}>
                  <div className="text-center">
                    <div>
                      <SiGnuprivacyguard className="text-5xl mx-auto text-[--three-color]" />
                    </div>
                    <div className="text-3xl font-semibold pt-3 pb-4 uppercase">
                      Sign In
                    </div>
                  </div>
                  <div className="form-group mt-1">
                    <label htmlFor="loginemail" className="">
                      Email Address :
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">
                          <SiGmail className="text-xs" />
                        </span>
                      </div>
                      <input
                        type="email"
                        name="loginEmail"
                        id="loginEmail"
                        className="block w-full rounded-md border-0 py-1.5 ps-9 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
                        placeholder="Enter Your Email"
                        value={loginEmail}
                        onChange={handleLoginInputChange}
                        required
                      />
                      {loginEmailError && (
                        <span className="error">
                          Please enter your email address
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="form-group mt-1">
                    <label htmlFor="loginPassword" className="">
                      Password :
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">
                          <MdKey />
                        </span>
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="loginPassword"
                        id="loginPassword"
                        value={loginPassword}
                        onChange={handleLoginInputChange}
                        className="block w-full rounded-md border-0 py-1.5 ps-9 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
                        placeholder="Enter Your Password"
                        required
                      />
                      <span
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                      </span>
                      {loginPasswordError && (
                        <span className="error">
                          Please enter your password
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-end">
                    <NavLink
                      to="/forgot-password"
                      className="text-xs text-[--three-color] hover:text-gray-600"
                    >
                      Forgot Password?
                    </NavLink>
                  </div>
                  <div className="CTA">
                    <input
                      className="button_1 hover:cursor-pointer"
                      type="submit"
                      value={isLoading ? "Loading..." : "Login"}
                      disabled={isLoading}
                    />
                    <div className="text-sm pt-4 flex justify-center">
                      Don't have an account?&nbsp;
                      <div
                        className="switch text-[--three-color] hover:cursor-pointer hover:text-red-600"
                        onClick={handleSwitchForm}
                      >
                        Sign Up
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* Signup Form */}

              {/* onSubmit={handleSignupFormSubmit} */}

              <div
                className={`signup lg:rounded-md rounded-b-md form-peice ${
                  isLoginForm ? "" : "switched"
                }`}
              >
                <form className="signup-form" onSubmit={handleSignupFormSubmit}>
                  <div className="text-center">
                    <div>
                      <RiLoginBoxLine className="text-5xl mx-auto text-[--three-color]" />
                    </div>
                    <div className="text-3xl font-semibold pt-2 pb-4 uppercase">
                      Sign Up
                    </div>
                  </div>
                  <div className="form-group mt-1">
                    <label htmlFor="name" className="">
                      Full Name :
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">
                          <IoPerson className="text-xs" />
                        </span>
                      </div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="block w-full rounded-md border-0 py-1.5 ps-9 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
                        placeholder="Enter Your Name"
                        value={name}
                        onChange={handleSignupInputChange}
                        required
                      />
                      {nameError && (
                      <span className="error">Please enter your full name</span>
                    )}
                    </div>
                  </div>
                  <div className="form-group mt-1">
                    <label htmlFor="email" className="">
                      Email Address :
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">
                          <SiGmail className="text-xs" />
                        </span>
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="block w-full rounded-md border-0 py-1.5 ps-9 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={handleSignupInputChange}
                        required
                      />
                      {emailError && (
                      <span className="error">
                        Please enter your email address
                      </span>
                    )}
                    </div>
                  </div>
                  <div className="form-group mt-1">
                    <label htmlFor="phonenumber" className="">
                      Phone Number :
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">
                          <IoIosCall className="text-sm" />
                        </span>
                      </div>
                      <input
                        type="text"
                        name="phonenumber"
                        id="phonenumber"
                        className="block w-full rounded-md border-0 py-1.5 ps-9 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
                        placeholder="Enter Your Number"
                        value={phonenumber}
                        onChange={handleSignupInputChange}
                        required
                      />
                      {phonenumberError && (
                      <span className="error">
                        Please enter your phone number
                      </span>
                    )}
                    </div>
                  </div>
                  <div className="form-group mt-1">
                    <label htmlFor="signupPassword" className="">
                      Password :
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-gray-500 sm:text-sm">
                          <MdKey />
                        </span>
                      </div>
                      <input
                        type={showPassword1 ? "text" : "password"}
                        name="signupPassword"
                        id="signupPassword"
                        value={signupPassword}
                        onChange={handleSignupInputChange}
                        required
                        className="block w-full rounded-md border-0 py-1.5 ps-9 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
                        placeholder="Enter Your Password"
                      />
                      <span
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={() => setShowPassword1(!showPassword1)}
                      >
                        {showPassword1 ? <MdVisibilityOff /> : <MdVisibility />}
                      </span>
                      {signupPasswordError && (
                      <span className="error">
                        Password must be at least 8 characters
                      </span>
                    )}
                    </div>
                  </div>
                  <div className="CTA">
                    <input
                      className="button_1 hover:cursor-pointer"
                      type="submit"
                      value="Sign Up"
                    />
                    {/* <button onClick={handlePopup}>Submit</button> */}
                    <div className="text-sm pt-3 flex justify-center">
                      Already have an account?&nbsp;
                      <div
                        className="switch text-[--three-color] hover:cursor-pointer hover:text-red-600"
                        onClick={handleSwitchForm}
                      >
                        Login
                      </div>
                    </div>
                  </div>
                  {showPopup && (
                    <div className="popup fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 p-5 z-50">
                      <div className="bg-white rounded-md p-5">
                        <div className="justify-between flex pb-5">
                          <div className="text-lg">Choose Subscribtion:</div>
                          <button
                            className="hover:text-red-700"
                            onClick={() => setShowPopup(false)}
                          >
                            <IoClose className="text-xl" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 max-w-xl mx-auto gap-3">
                          <div className="border text-center lg:p-7 p-5 rounded shadow-md bg-[--main-color]">
                            <div className="lg:text-3xl text-2xl font-semibold">
                              99<sub>/Month</sub>
                            </div>
                            <div className="pt-2">
                              <input
                                type="checkbox"
                                checked={paymentStatus === "99"}
                                onChange={() => setPaymentStatus("99")}
                              />
                            </div>
                          </div>
                          <div className="border lg:p-7 p-5 text-center rounded shadow-md bg-[--main-color]">
                            <div className="lg:text-3xl text-2xl font-semibold">
                              999<sub>/Year</sub>
                            </div>
                            <div className="pt-2">
                              <input
                                type="checkbox"
                                checked={paymentStatus === "999"}
                                onChange={() => setPaymentStatus("999")}
                              />
                            </div>
                          </div>
                        </div>
                        {paymentStatusError && (
                          <span className="error">
                            Please select one option
                          </span>
                        )}
                        <div className="mt-10 flex items-center">
                          <div>
                            <label className="">
                              <input
                                type="checkbox"
                                className="mr-2"
                                checked={termsChecked}
                                onChange={() => setTermsChecked(!termsChecked)}
                              />
                            </label>
                          </div>
                          <div className="text-sm pt-1">
                            I agree to the{" "}
                            <NavLink
                              to="/terms-and-conditions"
                              className="text-[--three-color] hover:text-black"
                            >
                              Terms and Conditions!
                            </NavLink>
                          </div>
                        </div>
                        <div className="CTA">
                          <button
                            className="button_1 p-1 px-3"
                            onClick={handlePaymentSubmit}
                            disabled={isPaymentLoading} // Disable button when loading
                          >
                            {isPaymentLoading ? "Loading..." : "Submit Payment"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default LoginDemo;
