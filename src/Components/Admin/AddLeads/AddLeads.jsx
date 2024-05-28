import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function AddLeads() {
  const [formType, setFormType] = useState('freelancer'); // State to toggle between forms
  const [freelancerFormData, setFreelancerFormData] = useState({
    title: "",
    description: "",
    tags: "",
    level: "",
    timestamp: "",
    duration: "",
    budget: "",
    link: "",
  });
  const [remoteFormData, setRemoteFormData] = useState({
    Title: "",
    Description: "",
    Level: "",
    Job_Type: "",
    Tags: "",
    Duration: "",
    Hourly_Rate_Budget: "",
    Project_Budget: "",
    Link: "",
  });
  const [file, setFile] = useState(null); // State for the file

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

  const token = localStorage.getItem("token");

  const handleChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === 'freelancer') {
      setFreelancerFormData({
        ...freelancerFormData,
        [name]: value,
      });
    } else if (formType === 'remote') {
      setRemoteFormData({
        ...remoteFormData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Update the file state
  };

  const handleSubmitForm = async (e, formType) => {
    e.preventDefault();
    try {
      const formData = formType === 'freelancer' ? freelancerFormData : remoteFormData;
      const apiUrl = formType === 'freelancer' ? `${process.env.REACT_APP_API_URL}/api/leads` : `${process.env.REACT_APP_API_URL}/api/remoteleads/remotelead`;

      const response = await axios.post(
        apiUrl,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);

      if (formType === 'freelancer') {
        setFreelancerFormData({
          title: "",
          description: "",
          tags: "",
          level: "",
          timestamp: "",
          duration: "",
          budget: "",
          link: "",
        });
      } else {
        setRemoteFormData({
          Title: "",
          Description: "",
          Level: "",
          Job_Type: "",
          Tags: "",
          Duration: "",
          Hourly_Rate_Budget: "",
          Project_Budget: "",
          Link: "",
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.alert('Token is expired, Please sign in again');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/');
      } else {
        toast.error("Error submitting form: " + (error.message || error.response.data.message));
        console.error("Error fetching data:", error.message);
      }
    }
  };

  // const handleSubmitFile = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);

  //     const response = await axios.post(
  //       `${process.env.REACT_APP_API_URL}/api/csv/importUser`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     toast.success(response.data.message);
  //     setFile(null);
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       window.alert('Token is expired, Please sign in again');
  //       localStorage.removeItem('token');
  //       localStorage.removeItem('role');
  //       navigate('/');
  //     } else {
  //       toast.error("Error submitting form: " + error.response.data.message);
  //       console.error("Error fetching data:", error);
  //     }
  //   }
  // };

  const handleSubmitFile = async (e, leadType) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file);
  
      let apiUrl;
      if (leadType === 'freelancer') {
        apiUrl = `${process.env.REACT_APP_API_URL}/api/csv/importUser`;
      } else if (leadType === 'remote') {
        apiUrl = `${process.env.REACT_APP_API_URL}/api/Remotecsv/importUser`;
      }
  
      const response = await axios.post(
        apiUrl,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      toast.success(response.data.message);
      setFile(null);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.alert('Token is expired, Please sign in again');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/');
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
              <div className="text-center mb-4">
                <button
                  className={`mx-2 px-4 py-2 ${formType === 'freelancer' ? 'bg-indigo-500 text-white' : 'bg-gray-300'} rounded-md`}
                  onClick={() => setFormType('freelancer')}
                >
                  Freelancer
                </button>
                <button
                  className={`mx-2 px-4 py-2 ${formType === 'remote' ? 'bg-indigo-500 text-white' : 'bg-gray-300'} rounded-md`}
                  onClick={() => setFormType('remote')}
                >
                  Remote
                </button>
              </div>
              {formType === 'freelancer' ? (
                <div>
                  <div className="text-4xl font-semibold mb-4 text-center">
                    Input Freelancer Lead Details
                  </div>
                  <form onSubmit={(e) => handleSubmitForm(e, 'freelancer')} className="pb-4">
                    {/* Freelancer form fields */}
                    <div className="mb-4">
                  <label htmlFor="title" className="block font-medium mb-1">
                    Add Title:
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={freelancerFormData.title}
                    onChange={(e) => handleChange(e, 'freelancer')}
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
                    value={freelancerFormData.description}
                    onChange={(e) => handleChange(e, 'freelancer')}
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
                    value={freelancerFormData.tags}
                    onChange={(e) => handleChange(e, 'freelancer')}
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
                    value={freelancerFormData.level}
                    onChange={(e) => handleChange(e, 'freelancer')}
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
                    value={freelancerFormData.timestamp}
                    onChange={(e) => handleChange(e, 'freelancer')}
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
                    value={freelancerFormData.duration}
                    onChange={(e) => handleChange(e, 'freelancer')}
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
                    value={freelancerFormData.budget}
                    onChange={(e) => handleChange(e, 'freelancer')}
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
                    value={freelancerFormData.link}
                    onChange={(e) => handleChange(e, 'freelancer')}
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
                  <form onSubmit={(e) => handleSubmitFile(e, 'freelancer')} className="pb-4">
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
              ) : (
                <div>
                  <div className="text-4xl font-semibold mb-4 text-center">
                    Input Remote Lead Details
                  </div>
                  <form onSubmit={(e) => handleSubmitForm(e, 'remote')} className="pb-4">
                    {/* Remote form fields */}
                    <div className="mb-4">
                      <label htmlFor="Title" className="block font-medium mb-1">
                        Add Title:
                      </label>
                      <input
                        type="text"
                        id="Title"
                        name="Title"
                        value={remoteFormData.Title}
                        onChange={(e) => handleChange(e, 'remote')}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="Description" className="block font-medium mb-1">
                        Add Description:
                      </label>
                      <input
                        type="text"
                        id="Description"
                        name="Description"
                        value={remoteFormData.Description}
                        onChange={(e) => handleChange(e, 'remote')}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="Level" className="block font-medium mb-1">
                        Add Level:
                      </label>
                      <input
                        type="text"
                        id="Level"
                        name="Level"
                        value={remoteFormData.Level}
                        onChange={(e) => handleChange(e, 'remote')}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="Job_Type" className="block font-medium mb-1">
                        Add Job Type:
                      </label>
                      <input
                        type="text"
                        id="Job_Type"
                        name="Job_Type"
                        value={remoteFormData.Job_Type}
                        onChange={(e) => handleChange(e, 'remote')}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="Tags" className="block font-medium mb-1">
                        Add Skills:
                      </label>
                      <input
                        type="text"
                        id="Tags"
                        name="Tags"
                        value={remoteFormData.Tags}
                        onChange={(e) => handleChange(e, 'remote')}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="Duration" className="block font-medium mb-1">
                        Add Duration:
                      </label>
                      <input
                        type="text"
                        id="Duration"
                        name="Duration"
                        value={remoteFormData.Duration}
                        onChange={(e) => handleChange(e, 'remote')}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="Hourly_Rate_Budget" className="block font-medium mb-1">
                        Add Hourly Rate Budget:
                      </label>
                      <input
                        type="text"
                        id="Hourly_Rate_Budget"
                        name="Hourly_Rate_Budget"
                        value={remoteFormData.Hourly_Rate_Budget}
                        onChange={(e) => handleChange(e, 'remote')}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="Project_Budget" className="block font-medium mb-1">
                        Add Project Budget:
                      </label>
                      <input
                        type="text"
                        id="Project_Budget"
                        name="Project_Budget"
                        value={remoteFormData.Project_Budget}
                        onChange={(e) => handleChange(e, 'remote')}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="Link" className="block font-medium mb-1">
                        Add Link:
                      </label>
                      <input
                        type="text"
                        id="Link"
                        name="Link"
                        value={remoteFormData.Link}
                        onChange={(e) => handleChange(e, 'remote')}
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
                    Upload RemoteLeads By Excel
                  </div>
                  <form onSubmit={(e) => handleSubmitFile(e, 'remote')} className="pb-4">
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddLeads;
