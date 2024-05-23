import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { RiLockPasswordLine } from "react-icons/ri";
import { MdKey, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPassword() {
  const { userId, token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    const verifyLink = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/passwordReset/${userId}/${token}`, {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          if (!data.status) {
            navigate('/reset-error');
          }
        } else {
          // toast.error("Failed to verify link.");
          navigate('/reset-error');
        }
      } catch (error) {
        console.error('Error verifying link:', error.message);
        toast.error("An error occurred while verifying link.");
      }
    };

    verifyLink();
  }, [userId, token, navigate]);

  const handleSubmit = async () => {
    // Password validation logic
    if (password.trim() === '') {
      setPasswordError('Password is required.');
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }
    setIsLoading(true);
    // Make API call to update password
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/passwordReset/${userId}/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update password');
      }
      console.log('Password updated successfully');
      toast.success("Password reset successful!");
      setPassword("");
      setConfirmPassword("");
      setPasswordError("");
      setIsLoading(false);
      // navigate('/login'); 
    } catch (error) {
      console.error('Error updating password:', error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-[--main-color] font-family'>
      <div className='lg:max-w-lg md:max-w-lg px-5 lg:py-20 md:py-10 py-10 mx-auto'>
        <div className='border rounded-md lg:p-10 md:p-10 p-5 py-10 text-center bg-white'>
          <div><RiLockPasswordLine className='text-6xl mx-auto text-[--three-color]' /></div>
          <div className='text-2xl font-semibold pt-5 pb-2'>Reset Password</div>
          <div className='text-sm text-gray-500'>Enter your new password.</div>
          <div className='pt-4 pb-5'>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm"><MdKey /></span>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="block w-full rounded-md border-0 py-1.5 ps-9 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
                placeholder="Enter your new password"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={togglePasswordVisibility}>
                {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </span>
            </div>
            <div className="relative mt-4 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm"><MdKey /></span>
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="block w-full rounded-md border-0 py-1.5 ps-9 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm leading-6"
                placeholder="Re-enter your new password"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
              </span>
            </div>
            {passwordError && <div className="text-red-500 text-sm mt-1">{passwordError}</div>}
            <button className='bg-[--three-color] hover:bg-white hover:text-[--three-color] outline outline-[--three-color] p-2 px-5 rounded-md text-sm text-white uppercase mt-5' onClick={handleSubmit}>{isLoading ? "Loading..." : "Submit"}</button>
          </div>
          <div><NavLink to="/login" className="text-sm text-[--three-color] hover:text-black">Back to Login</NavLink></div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
