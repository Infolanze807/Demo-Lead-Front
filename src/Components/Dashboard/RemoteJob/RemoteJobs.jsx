import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import axios from "axios";
import { MdClose } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import "../Leads/Leads.css";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function RemoteLeads() {
  const [showPopup, setShowPopup] = useState(false);
  const [leadDetails, setLeadDetails] = useState(null);
  const [remoteleads, setRemoteLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingClose, setLoadingClose] = useState(false);
  const [isActive, setIsActive] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (url = `${process.env.REACT_APP_API_URL}/api/remoteleads/remotelead`, params = {}) => {
    try {
      const response = await axios.get(url, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRemoteLeads(response.data);
      setCurrentPage(1);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.alert('Token is expired, Please sign in again')
        // Handle 401 Unauthorized error
        localStorage.removeItem('token'); // Remove token from localStorage
        localStorage.removeItem('role'); // If you have other related items, clear them as well
        navigate('/'); // Redirect to home page
      } else {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleLeadClick = (details) => {
    setLeadDetails(details);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setLeadDetails(null);
  };

  const redirectToLink = () => {
    if (leadDetails && leadDetails.Link) {
      window.open(leadDetails.Link, "_blank");
    }
  };

  const renderFirstParagraph = (description) => {
    if (Array.isArray(description)) {
      return description[0];
    } else {
      return description;
    }
  };

  const fetchRemoteLeadsByTag = async () => {
    setCurrentPage(1);
    setIsActive("");
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/remoteleads/remoteleadstag`,
        {
          params: {
            tags: searchTerm,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRemoteLeads(response.data);
      console.log("data", response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.alert('Token is expired, Please sign in again')
        // Handle 401 Unauthorized error
        localStorage.removeItem('token'); // Remove token from localStorage
        localStorage.removeItem('role'); // If you have other related items, clear them as well
        navigate('/'); // Redirect to home page
      } else {
        toast.error(error.response.data.message)
        console.error("Error fetching data:", error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };


  const clearSearchFilter = async () => {
    setIsActive("");
    setSearchTerm("");
    setLoadingClose(true);
    try {
      // Check if token is present and valid
      const token = localStorage.getItem('token');
      if (!token) {
          // If token is not present, show alert and do nothing
          window.alert('Token is expired or invalid. Please sign in again.');
          return;
      }
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/remoteleads/remotelead`,
        {
          headers: {
              Authorization: `Bearer ${token}`
          }
      }
      );
      setRemoteLeads(response.data);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingClose(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchRemoteLeadsByTag();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const totalPages = Math.ceil(remoteleads.length / 10);

  // Pagination logic
  const indexOfLastLead = currentPage * 10;
  const indexOfFirstLead = indexOfLastLead - 10;
  const currentRemoteLeads = remoteleads.slice(indexOfFirstLead, indexOfLastLead);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="px-4 lg:px-28 md:px-20 lg:py-10 md:py-10 py-4 bg-[--main-color] font-family">
      <div className="bg-white rounded-lg shadow-lg pb-5">
        {/* <div className='text-center py-8 text-[--three-color] uppercase text-4xl border-b mb-10'>Get Your RemoteLeads Here</div> */}
        <div className="border-b px-4 py-7 mb-10">
          <div className="">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center max-w-lg mx-auto"
            >
              <label htmlFor="voice-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  id="voice-search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="bg-[--main-color] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3 "
                  placeholder="Search HTML, CSS..."
                  required
                />
                <button
                  onClick={clearSearchFilter}
                  type="button"
                  className="absolute inset-y-0 end-0 flex outline-none items-center pe-3"
                >
                  {loadingClose && (
                    <FaSpinner className="animate-spin h-4 w-4" />
                  )}
                  {!loadingClose && (
                    <MdClose className="text-xl text-gray-500 hover:text-black" />
                  )}
                </button>
              </div>
              <button
                type="submit"
                className="inline-flex items-center p-3 ms-2 text-sm font-medium text-white bg-[--three-color] rounded-lg border border-[--three-color] hover:bg-white hover:text-[--three-color] relative"
                disabled={loading} // Disable the button while loading
                onClick={handleSearchSubmit}
              >
                {/* Conditional rendering of FaSpinner */}
                {loading && (
                  <FaSpinner className="animate-spin h-4 w-4 mr-1.5" />
                )}
                {/* Conditional rendering of SVG icon */}
                {!loading && (
                  <svg
                    className="w-3.5 h-3.5 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                )}
                {/* "Search" text */}
                Search
              </button>
            </form>
          </div>
          {/* <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 mt-7 lg:gap-5 md:gap-5 gap-2 lg:px-28">
            <button
              value="Web"
              onClick={() => fetchRemoteLeadsByTechnology("Web")}
              className={`${
                isActive === "Web"
                  ? "border-2 rounded p-1 px-4 border-[--three-color] text-white bg-[--three-color] mb-2 me-2"
                  : "border-2 rounded p-1 px-4 border-[--three-color] hover:text-white hover:bg-[--three-color] text-[--three-color] bg-white mb-2 me-2"
              }`}
            >
              {webLoading ? "Searching..." : "Web Development"}
            </button>
            <button
              value="Blockchain"
              onClick={() => fetchRemoteLeadsByTechnology("Blockchain")}
              className={`${
                isActive === "Blockchain"
                  ? "border-2 rounded p-1 px-4 border-[--three-color] text-white bg-[--three-color] mb-2 me-2"
                  : "border-2 rounded p-1 px-4 border-[--three-color] hover:text-white hover:bg-[--three-color] text-[--three-color] bg-white mb-2 me-2"
              }`}
            >
              {blockchainLoading ? "Searching..." : "Blockchain Development"}
            </button>
            <button
              value="App"
              onClick={() => fetchRemoteLeadsByTechnology("App")}
              className={`${
                isActive === "App"
                  ? "border-2 rounded p-1 px-4 border-[--three-color] text-white bg-[--three-color] mb-2 me-2"
                  : "border-2 rounded p-1 px-4 border-[--three-color] hover:text-white hover:bg-[--three-color] text-[--three-color] bg-white mb-2 me-2"
              }`}
            >
              {appLoading ? "Serching..." : "App Development"}
            </button>
          </div> */}
        </div>
        {currentRemoteLeads.map((lead, index) => (
          <div
            key={lead.id}
            className="grid lg:grid-cols-6 grid-col-3 border rounded-lg hover:shadow-md shadow-sm cursor-pointer items-center lead mb-5 m-4"
          >
            <div
              className="lg:col-span-4 col-span-2 p-5"
              onClick={() => handleLeadClick(lead)}
            >
              <div className="flex items-center">
                <div className="p-4 px-5 bg-[--main-color] w-max rounded-md me-4">
                  {index + 1 + (currentPage - 1) * 10}.
                </div>
                <div>
                  <div className="title font-semibold">{lead.Title}</div>
                  <div className="text-sm Remoteleads_wrap">
                    {renderFirstParagraph(lead.Description)}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="p-5 text-center"
              onClick={() => handleLeadClick(lead)}
            >
              {/* {Array.isArray(lead.tags) 
                ? lead.tags.map(tag => <div key={tag}>{tag}</div>)
                : lead.tags.split('\r\n').map(tag => <div key={tag}>{tag}</div>)
              } */}
              {Array.isArray(lead.Tags) ? (
                <div>{lead.Tags.length > 0 && lead.tags[0]}</div>
              ) : (
                <div>{lead.Tags.split("\n")[0]}</div>
              )}
            </div>
            <div
              className="m-5 text-center bg-[--main-color] rounded"
              onClick={() => handleLeadClick(lead)}
            >
              {lead.formattedCreatedAt}
            </div>
          </div>
        ))}
        <div className="flex justify-center mt-8 mb-3">
          <nav
            aria-label="Page navigation example"
            className="pagination-container flex space-x-2"
          >
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="disabled:opacity-50 px-3 py-1 bg-[--second-color] hover:bg-[--three-color] hover:text-white rounded h-full"
            >
              <FaChevronLeft />
            </button>
            <ul className="flex space-x-2 pagination-list">
              {Array.from({ length: Math.min(totalPages, 4) }, (_, i) => {
                const start = Math.max(0, currentPage - 4);
                const pageNumber = start + i + 1;
                return (
                  <li key={pageNumber}>
                    <button
                      onClick={() => paginate(pageNumber)}
                      className={`px-3 py-1 ${
                        currentPage === pageNumber
                          ? "bg-[--three-color] text-white"
                          : "bg-[--second-color] hover:bg-[--three-color] hover:text-white"
                      } rounded`}
                    >
                      {pageNumber}
                    </button>
                  </li>
                );
              })}
            </ul>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="disabled:opacity-50 px-3 py-1 bg-[--second-color] hover:bg-[--three-color] hover:text-white rounded h-full"
            >
              <FaChevronRight />
            </button>
          </nav>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 p-2 z-50">
          <div className="bg-white rounded-lg lg:w-[800px] md:w-[650px] w-[500px]">
            <div className="flex justify-between items-center border-b p-5 md:p-8 lg:p-8">
              <button
                className="text-gray-600 hover:text-black"
                onClick={closePopup}
              >
                <FaArrowLeft className="" />
              </button>
              <div>
                <button
                  onClick={redirectToLink}
                  className="uppercase text-sm bg-[--three-color] text-white p-2 px-3 rounded-md hover:bg-white hover:text-[--three-color] outline outline-2 outline-[--three-color] flex items-center"
                >
                  Send A Pitch&nbsp;
                  <MdKeyboardDoubleArrowRight className="text-lg" />
                </button>
              </div>
            </div>
            <div className="p-5 md:p-8 lg:p-8 rounded-b-lg">
              <div className="">
                <div className="text-3xl font-semibold text-center text-[--three-color]">
                  Lead Details
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center pb-2">
                  <p className="font-semibold text-lg">{leadDetails.Title}</p>
                  {leadDetails.Level && (
                    <div className="bg-[--second-color] text-xs px-2 py-1 rounded">
                      {leadDetails.Level}
                    </div>
                  )}
                </div>
                <div className="text-sm">
                  {Array.isArray(leadDetails.Description) ? (
                    leadDetails.Description.map((paragraph, index) => (
                      <p className="pb-1 flex items-center" key={index}>
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <p>{leadDetails.Description}</p>
                  )}
                </div>
                <div className="lg:flex lg:flex-row lg:justify-between flex-col pt-2 lg:items-center">
                  <div className="flex flex-wrap mt-2 justify-center">
                    {Array.isArray(leadDetails.Tags)
                      ? leadDetails.Tags.map((tagArray, index) =>
                          Array.isArray(tagArray) ? (
                            tagArray.map((tag, idx) => (
                              <span
                                key={idx}
                                className="bg-[--second-color] text-xs px-2 py-1 mr-2 mb-2 rounded"
                              >
                                {tag}
                              </span>
                            ))
                          ) : (
                            <span
                              key={index}
                              className="bg-[--second-color] text-xs px-2 py-1 mr-2 mb-2 rounded"
                            >
                              {tagArray}
                            </span>
                          )
                        )
                      : leadDetails.Tags.split("\n").map((tag, index) => (
                          <span
                            key={index}
                            className="bg-[--second-color] text-xs px-2 py-1 mr-2 mb-2 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                  </div>
                  <div className="text-xs lg:block md:flex flex justify-between font-semibold">
                    {leadDetails.Duration && (
                      <div className="me-2 text-nowrap">
                        Duration: {leadDetails.Duration}
                      </div>
                    )}
                    <div className="lg:pt-1">
                      {/* <div>Budget: {leadDetails.project_budget}</div>
                  <div>Hourly Rate: {leadDetails.Hourly_Rate_budget}</div> */}
                      {leadDetails.Project_Budget && (
                        <div className="text-nowrap">
                          Budget: {leadDetails.Project_Budget}
                        </div>
                      )}
                      {leadDetails.Hourly_Rate_Budget && (
                        <div className="text-nowrap">
                          Hourly Rate: {leadDetails.Hourly_Rate_Budget}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-gray-500 mt-2 text-sm">
                  {leadDetails.formattedCreatedAt}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RemoteLeads;