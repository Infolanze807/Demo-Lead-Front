import React, { useState, useEffect } from "react";
import { CgCloseR } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function ShowLeads() {
  const [activeTab, setActiveTab] = useState("freelance");
  const [freelanceLeads, setFreelanceLeads] = useState([]);
  const [remoteLeads, setRemoteLeads] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [showFreelanceUpdateForm, setShowFreelanceUpdateForm] = useState(false);
  const [showRemoteUpdateForm, setShowRemoteUpdateForm] = useState(false);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const [freelanceFormData, setFreelanceFormData] = useState({
    title: "",
    description: "",
    tags: "",
    timestamp: "",
    level: "",
    duration: "",
    project_budget: "",
    link: "",
  });

  const navigate = useNavigate();

  const [remoteFormData, setRemoteFormData] = useState({
    Title: "",
    Description: "",
    Tags: "",
    timestamp: "",
    Level: "",
    Duration: "",
    Project_Budget: "",
    Link: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData("freelance");
    fetchData("remote");
  }, []);

  const fetchLeads = async (type, token) => {
    try {
      let apiUrl = "";
      if (type === "freelance") {
        apiUrl = `${process.env.REACT_APP_API_URL}/api/leads`;
      } else if (type === "remote") {
        apiUrl = `${process.env.REACT_APP_API_URL}/api/remoteleads/remotelead`;
      }
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.data) {
        throw new Error("Failed to fetch data");
      }
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        window.alert("Token is expired, Please sign in again");
        localStorage.removeItem("token"); // Remove token from localStorage
        localStorage.removeItem("role"); // If you have other related items, clear them as well
        // Redirect to home page or login page as per your requirement
        return null;
      } else {
        toast.error(
          "Error fetching data: " +
            (error.message || error.response.data.message)
        );
        console.error("Error fetching data:", error);
        return null;
      }
    }
  };

  const fetchData = async (type) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Handle case when token is not available
        return;
      }
      const data = await fetchLeads(type, token);
      if (type === "freelance") {
        setFreelanceLeads(data || []); // Ensure data is not null
      } else if (type === "remote") {
        setRemoteLeads(data || []); // Ensure data is not null
      }
    } catch (error) {
      toast.error(
        "Error fetching data: " + (error.message || error.response.data.message)
      );
      console.error("Error fetching data:", error.message);
    }
  };

  const handleDeleteLead = async (_id, type) => {
    try {
      // Log the token to ensure it's correct
      console.log("Token:", token);

      let apiUrl = "";
      if (type === "freelance") {
        apiUrl = `${process.env.REACT_APP_API_URL}/api/leads/lead`;
      } else if (type === "remote") {
        apiUrl = `${process.env.REACT_APP_API_URL}/api/remoteleads/remote`;
      }
      const response = await fetch(`${apiUrl}/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure the token is included here
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete lead");
      }
      const data = await response.json();
      toast.success(data.message);
      console.log("Delete Response:", data);
      if (type === "freelance") {
        setFreelanceLeads((prevLeads) =>
          prevLeads.filter((lead) => lead._id !== _id)
        );
      } else if (type === "remote") {
        setRemoteLeads((prevLeads) =>
          prevLeads.filter((lead) => lead._id !== _id)
        );
      }
    } catch (error) {
      toast.error(
        "Error deleting lead: " + (error.message || error.response.data.message)
      );
      console.error("Error deleting lead:", error.message);
    }
  };

  const handleMultipleDelete = async (type) => {
    try {
      let apiUrl = "";
      if (type === "freelance") {
        apiUrl = `${process.env.REACT_APP_API_URL}/api/leads/multiple`;
      } else if (type === "remote") {
        apiUrl = `${process.env.REACT_APP_API_URL}/api/remoteleads/multiple`;
      }
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ids: selectedLeads }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete leads");
      }
      const data = await response.json();
      toast.success(data.message);
      if (type === "freelance") {
        setFreelanceLeads((prevLeads) =>
          prevLeads.filter((lead) => !selectedLeads.includes(lead._id))
        );
      } else if (type === "remote") {
        setRemoteLeads((prevLeads) =>
          prevLeads.filter((lead) => !selectedLeads.includes(lead._id))
        );
      }
      setSelectedLeads([]); // Clear selected leads after deletion
    } catch (error) {
      toast.error(
        "Error deleting leads: " +
          (error.message || error.response.data.message)
      );
      console.error("Error deleting leads:", error.message);
    }
  };

  const editPopup = (_id, type) => {
    setSelectedLeadId(_id);
    setSelectedType(type);
    if (type === "freelance") {
      setShowFreelanceUpdateForm(true);
      setShowRemoteUpdateForm(false); // Close the remote update form

      // Find the lead in the freelanceLeads array by its _id
      const selectedLead = freelanceLeads.find((lead) => lead._id === _id);

      // Populate the form data with the existing values
      setFreelanceFormData({
        title: selectedLead.title,
        description: selectedLead.description,
        tags: Array.isArray(selectedLead.tags)
          ? selectedLead.tags.join(", ")
          : selectedLead.tags,
        timestamp: selectedLead.timestamp,
        level: selectedLead.level,
        duration: selectedLead.duration,
        project_budget: selectedLead.project_budget,
        link: selectedLead.link,
      });
    } else if (type === "remote") {
      setShowRemoteUpdateForm(true);
      setShowFreelanceUpdateForm(false); // Close the freelance update form

      // Find the lead in the remoteLeads array by its _id
      const selectedLead = remoteLeads.find((lead) => lead._id === _id);

      // Populate the form data with the existing values
      setRemoteFormData({
        Title: selectedLead.Title,
        Description: selectedLead.Description,
        Tags: Array.isArray(selectedLead.Tags)
          ? selectedLead.Tags.join(", ")
          : selectedLead.Tags,
        timestamp: selectedLead.timestamp,
        Level: selectedLead.Level,
        Duration: selectedLead.Duration,
        Project_Budget: selectedLead.Project_Budget,
        Link: selectedLead.Link,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFreelanceFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setRemoteFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e, _id) => {
    if (e && e.target) {
      const { checked } = e.target;
      setSelectedLeads((prevSelectedLeads) => {
        if (checked) {
          return [...prevSelectedLeads, _id];
        } else {
          return prevSelectedLeads.filter((id) => id !== _id);
        }
      });
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      let apiUrl = "";
      let formData = {};
      if (selectedType === "freelance") {
        apiUrl = `${process.env.REACT_APP_API_URL}/api/leads/lead/${selectedLeadId}`;
        formData = freelanceFormData;
      } else if (selectedType === "remote") {
        apiUrl = `${process.env.REACT_APP_API_URL}/api/remoteleads/remote/${selectedLeadId}`;
        formData = remoteFormData;
      }
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to update lead");
      }
      toast.success("Lead updated successfully");
      // Reset form data and hide update form
      if (selectedType === "freelance") {
        // toast.success(response.data.message)
        setShowFreelanceUpdateForm(false);
        setFreelanceFormData({}); // Reset form data
        // console.log("data", response)
      } else if (selectedType === "remote") {
        toast.success(response.data.message);
        setShowRemoteUpdateForm(false);
        // console.log("data", response.data.message)
        setRemoteFormData({}); // Reset form data
      }
      // Refetch data after update to reflect changes
      fetchData(selectedType);
    } catch (error) {
      console.error("Error updating lead:", error.message);
    }
  };

  return (
    <div className="font-family bg-[--main-color]">
      <div className="px-4 lg:px-28 md:px-20 py-10">
        <div className="bg-white lg:p-10 md:p-10 p-2 rounded-lg shadow-lg">
          <div className="">
            <div className="text-4xl font-semibold mb-6 mt-4 text-center">
              All Leads Display
            </div>
            <div className="flex justify-center mb-4">
              <button
                className={`mr-4 font-semibold text-gray-600 hover:text-black ${
                  activeTab === "freelance" ? "border-b-2 border-black" : ""
                }`}
                onClick={() => setActiveTab("freelance")}
              >
                Freelance
              </button>
              <button
                className={`font-semibold text-gray-600 hover:text-black ${
                  activeTab === "remote" ? "border-b-2 border-black" : ""
                }`}
                onClick={() => setActiveTab("remote")}
              >
                Remote
              </button>
            </div>
            <div>
              {activeTab === "freelance" && (
                <div>
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={() => handleMultipleDelete("freelance")}
                      className="font-semibold text-gray-600 hover:text-black shadow-md cursor-pointer border p-2 px-5 rounded-md hover:bg-gray-300"
                    >
                      Delete Selected
                    </button>
                  </div>
                  {freelanceLeads.map((lead, index) => (
                    <div
                      key={lead._id}
                      className="lg:p-10 md:p-10 p-2 border rounded-md shadow-lg mb-5"
                    >
                      <div className="flex justify-between items-center">
                        <p>
                          <strong>Id:</strong>
                          {index + 1}
                        </p>
                        <input
                type="checkbox"
                checked={selectedLeads.includes(lead._id)}
                onChange={(e) => handleCheckboxChange(e, lead._id)}
              />
                      </div>
                      <p>
                        <strong>Title:</strong> {lead.title}
                      </p>
                      <p>
                        <strong>Description:</strong>{" "}
                        {Array.isArray(lead.description)
                          ? lead.description.join(", ")
                          : lead.description}
                      </p>
                      <p>
                        <strong>Tags:</strong>{" "}
                        {Array.isArray(lead.tags)
                          ? lead.tags.join(", ")
                          : lead.tags}
                      </p>
                      <p>
                        <strong>Timestamp:</strong> {lead.timestamp}
                      </p>
                      <p>
                        <strong>Level:</strong> {lead.level}
                      </p>
                      <p>
                        <strong>Duration:</strong> {lead.duration}
                      </p>
                      <p>
                        <strong>Budget:</strong> {lead.project_budget}
                      </p>
                      <p className="break-words">
                        <strong>Link:</strong> {lead.link}
                      </p>
                      <p>
                        <strong>Created At:</strong>
                        {lead.formattedCreatedAt}
                      </p>
                      <div className="text-center pt-3">
                        <button
                          onClick={() => editPopup(lead._id, "freelance")}
                          className="font-semibold text-gray-600 hover:text-black shadow-md cursor-pointer border p-2 px-5 rounded-md hover:bg-gray-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteLead(lead._id, "freelance")
                          }
                          className="font-semibold text-gray-600 hover:text-black shadow-md cursor-pointer border p-2 px-5 rounded-md hover:bg-gray-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "remote" && (
                <div>
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={() => handleMultipleDelete("remote")}
                      className="font-semibold text-gray-600 hover:text-black shadow-md cursor-pointer border p-2 px-5 rounded-md hover:bg-gray-300"
                    >
                      Delete Selected
                    </button>
                  </div>
                  {remoteLeads.map((lead, index) => (
                    <div
                      key={lead._id}
                      className="lg:p-10 md:p-10 p-2 border rounded-md shadow-lg mb-5"
                    >
                      <div className="flex justify-between items-center">
                        <p>
                          <strong>Id:</strong>
                          {index + 1}
                        </p>
                        <input
                          type="checkbox"
                          checked={selectedLeads.includes(lead._id)}
                          onChange={() => handleCheckboxChange(lead._id)}
                        />
                      </div>
                      <p>
                        <strong>Title:</strong> {lead.Title}
                      </p>
                      <p>
                        <strong>Description:</strong>{" "}
                        {Array.isArray(lead.Description)
                          ? lead.Description.join(", ")
                          : lead.Description}
                      </p>
                      <p>
                        <strong>Tags:</strong>{" "}
                        {Array.isArray(lead.Tags)
                          ? lead.Tags.join(", ")
                          : lead.Tags}
                      </p>
                      <p>
                        <strong>Timestamp:</strong> {lead.timestamp}
                      </p>
                      <p>
                        <strong>Level:</strong> {lead.Level}
                      </p>
                      <p>
                        <strong>Duration:</strong> {lead.Duration}
                      </p>
                      <p>
                        <strong>Budget:</strong> {lead.Project_Budget}
                      </p>
                      <p className="break-words">
                        <strong>Link:</strong> {lead.Link}
                      </p>
                      <p>
                        <strong>Created At:</strong>
                        {lead.formattedCreatedAt}
                      </p>
                      <div className="text-center pt-3">
                        <button
                          onClick={() => editPopup(lead._id, "remote")}
                          className="font-semibold text-gray-600 hover:text-black shadow-md cursor-pointer border p-2 px-5 rounded-md hover:bg-gray-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteLead(lead._id, "remote")}
                          className="font-semibold text-gray-600 hover:text-black shadow-md cursor-pointer border p-2 px-5 rounded-md hover:bg-gray-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Freelance Update Form Modal */}
      {showFreelanceUpdateForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <form
              onSubmit={handleEdit}
              className="w-[250px] md:w-[320px] lg:w-[450px] grid gap-2 relative"
            >
              <button className="text-black">
                <CgCloseR
                  className="right-[-15px] top-[-20px] absolute text-2xl text-[--three-color]"
                  onClick={() => setShowFreelanceUpdateForm(false)}
                />
              </button>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={freelanceFormData.title}
                onChange={handleChange}
                className="rounded-xl"
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={freelanceFormData.description}
                onChange={handleChange}
                className="rounded-xl"
              />
              <input
                type="text"
                name="tags"
                placeholder="Tags"
                value={freelanceFormData.tags}
                onChange={handleChange}
                className="rounded-xl"
              />
              <input
                type="text"
                name="timestamp"
                placeholder="Timestamp"
                value={freelanceFormData.timestamp}
                onChange={handleChange}
                className="rounded-xl"
              />
              <input
                type="text"
                name="level"
                placeholder="Level"
                value={freelanceFormData.level}
                onChange={handleChange}
                className="rounded-xl"
              />
              <input
                type="text"
                name="duration"
                placeholder="Duration"
                value={freelanceFormData.duration}
                onChange={handleChange}
                className="rounded-xl"
              />
              <input
                type="text"
                name="project_budget"
                placeholder="Project Budget"
                value={freelanceFormData.project_budget}
                onChange={handleChange}
                className="rounded-xl"
              />
              <input
                type="text"
                name="link"
                placeholder="Link"
                value={freelanceFormData.link}
                onChange={handleChange}
                className="rounded-xl"
              />
              <button
                type="submit"
                className="rounded-xl w-full bg-[--three-color] text-white p-2"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Remote Update Form Modal */}
      {showRemoteUpdateForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <form
              onSubmit={handleEdit}
              className="w-[250px] md:w-[320px] lg:w-[450px] grid gap-2 relative"
            >
              <button className="text-black">
                <CgCloseR
                  className="right-[-15px] top-[-20px] absolute text-2xl text-[--three-color]"
                  onClick={() => setShowRemoteUpdateForm(false)}
                />
              </button>
              <input
                type="text"
                name="Title"
                placeholder="Title"
                value={remoteFormData.Title}
                onChange={handleChange}
                className="rounded-xl"
              />
              <input
                type="text"
                name="Description"
                placeholder="Description"
                value={remoteFormData.Description}
                onChange={handleChange}
                className="rounded-xl"
              />
              <input
                type="text"
                name="Tags"
                placeholder="Tags"
                value={remoteFormData.Tags}
                onChange={handleChange}
                className="rounded-xl"
              />
              <input
                type="text"
                name="timestamp"
                placeholder="Timestamp"
                value={remoteFormData.timestamp}
                onChange={handleChange}
                className="rounded-xl"
              />
              <input
                type="text"
                name="Level"
                placeholder="Level"
                value={remoteFormData.Level}
                onChange={handleChange}
                className="rounded-xl"
              />
              <input
                type="text"
                name="Duration"
                placeholder="Duration"
                value={remoteFormData.Duration}
                onChange={handleChange}
                className="rounded-xl"
              />
              <input
                type="text"
                name="Project_Budget"
                placeholder="Project Budget"
                value={remoteFormData.Project_Budget}
                onChange={handleChange}
                className="rounded-xl"
              />
              <input
                type="text"
                name="Link"
                placeholder="Link"
                value={remoteFormData.Link}
                onChange={handleChange}
                className="rounded-xl"
              />
              <button
                type="submit"
                className="rounded-xl w-full bg-[--three-color] text-white p-2"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
 
export default ShowLeads;
