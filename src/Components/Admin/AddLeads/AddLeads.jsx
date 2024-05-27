import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function AddLeads() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    level: "",
    timestamp: "",
    duration: "",
    budget: "",
    link: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
      navigate('/register');
    } else if (role === 'Basic') {
      navigate('/dashboard');
    }
  }, [navigate]);


  const [file, setFile] = useState(null); // State for the file

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Update the file state
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/leads`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message)
      // console.log('data', response.data);
      
      
      // console.log(response.data.message);
      // Optionally, you can reset the form after successful submission
      setFormData({
        title: "",
        description: "",
        tags: "",
        level: "",
        timestamp: "",
        duration: "",
        budget: "",
        link: "",
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.alert('Token is expired, Please sign in again')
        // Handle 401 Unauthorized error
        localStorage.removeItem('token'); // Remove token from localStorage
        localStorage.removeItem('role'); // If you have other related items, clear them as well
        navigate('/'); // Redirect to home page
      } else {
        toast.error("Error submitting form: " + (error.message || error.response.data.message));
        console.error("Error fetching data:", error.message);
      }
    }
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file); // Append the file to FormData

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/csv/importUser`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('data', response.data);

      // console.log("File uploaded successfully!");
      toast.success(response.data.message);
      // Optionally, you can reset the file input after successful upload
      setFile(null);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.alert('Token is expired, Please sign in again')
        // Handle 401 Unauthorized error
        localStorage.removeItem('token'); // Remove token from localStorage
        localStorage.removeItem('role'); // If you have other related items, clear them as well
        navigate('/'); // Redirect to home page
      } else {
        toast.error("Error submitting form: " + error.response.data.message);
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <div className="font-family bg-[--main-color]">
      <div className="px-4 lg:px-28 md:px-20 py-10">
        <div>
          <div>
            <div className="mx-auto bg-white rounded-lg shadow-lg p-8">
              <div className="text-4xl font-semibold mb-4 text-center">
                Input Leads Details
              </div>
              <form onSubmit={handleSubmitForm} className="pb-4">
                <div className="mb-4">
                  <label htmlFor="title" className="block font-medium mb-1">
                    Add Title:
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block font-medium mb-1"
                  >
                    Add Description:
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="tags" className="block font-medium mb-1">
                    Add Skills:
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="level" className="block font-medium mb-1">
                    Add Level:
                  </label>
                  <input
                    type="text"
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="timestamp" className="block font-medium mb-1">
                    Add Time:
                  </label>
                  <input
                    type="text"
                    id="timestamp"
                    name="timestamp"
                    value={formData.timestamp}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="durationl" className="block font-medium mb-1">
                    Add Durection:
                  </label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="budget" className="block font-medium mb-1">
                    Add Budget:
                  </label>
                  <input
                    type="text"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="link" className="block font-medium mb-1">
                    Add Link:
                  </label>
                  <input
                    type="text"
                    id="link"
                    name="link"
                    value={formData.link}
                    onChange={handleChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-indigo-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300"
                  >
                    Submit Form Data
                  </button>
                </div>
              </form>
              <hr className="pb-4" />
              <div className="text-4xl font-semibold mb-4 text-center">
                Upload Leads By Excel
              </div>
              <form onSubmit={handleSubmitFile} className="pb-4">
                <div className="mb-4">
                  {/* <label htmlFor="file" className="block font-medium mb-1">
                    Choose File:
                  </label> */}
                  <input
                    type="file"
                    id="file"
                    name="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-indigo-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-600 transition duration-300"
                  >
                    Upload File
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddLeads;
