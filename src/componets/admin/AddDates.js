import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa"; // Icons

// Helper function to format date as dd/mm/yyyy
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const AddDates = () => {
  const [dates, setDates] = useState([""]); // Multiple dates array
  const [submittedDates, setSubmittedDates] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Fetch existing dates when the component mounts
  const fetchDates = async () => {
    try {
      const response = await axios.get("http://192.168.29.219:5000/api/dates");
      setSubmittedDates(response.data);
    } catch (error) {
      console.error("Error fetching dates:", error);
    }
  };

  useEffect(() => {
    fetchDates();
  }, [editValue]);

  // Add new date input field
  const handleAddDate = () => {
    setDates([...dates, ""]); // Add a new empty date input field
  };

  // Handle date input change
  const handleDateChange = (index, value) => {
    const newDates = [...dates];
    newDates[index] = value;
    setDates(newDates); // Update the date at the specific index
  };

  // Handle form submission for multiple dates

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if all dates are filled in
    const validDates = dates.filter((date) => date !== "");
  
    if (validDates.length === 0) {
      console.error("No valid dates to submit.");
      return;
    }
  
    try {
      const submissionPromises = validDates.map(async (date) => {
        const response = await axios.post("http://192.168.29.219:5000/api/create-date", { date });
        return response.data; // Return the response for each date
      });
  
      const submitted = await Promise.all(submissionPromises);
  
      setSubmittedDates([...submittedDates, ...submitted]);
  
      setDates([""]);
    } catch (error) {
      console.error("Error submitting dates:", error);
    }
  };
  
  // Update date
  const handleUpdateDate = async (id) => {
    try {
      const response = await axios.put(`http://192.168.29.219:5000/api/dates/${id}`, { date: editValue });
      const updatedDates = submittedDates.map((date) =>
        date._id === id ? { ...date, date: response.data.date } : date
      );
      setSubmittedDates(updatedDates);
      setEditIndex(null);
      setEditValue("");
    } catch (error) {
      console.error("Error updating date:", error);
    }
  };

  // Delete date
  const handleDeleteDate = async (id) => {
    try {
      await axios.delete(`http://192.168.29.219:5000/api/dates/${id}`);
      const updatedDates = submittedDates.filter((date) => date._id !== id);
      setSubmittedDates(updatedDates);
    } catch (error) {
      console.error("Error deleting date:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add Dates</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {dates.map((date, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="date"
              value={date}
              onChange={(e) => handleDateChange(index, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleAddDate}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Another Date
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Submit Dates
          </button>
        </div>
      </form>

      {/* Display Submitted Dates */}
      {submittedDates.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Submitted Dates</h2>
          <ul className="space-y-4">
            {submittedDates.map((date, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
                {editIndex === date._id ? (
                  <div className="flex-grow">
                    <input
                      type="date"
                      value={editValue}
                      defaultValue={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ) : (
                  <span className="text-gray-700">{formatDate(new Date(date.date))}</span>
                )}

                <div className="flex items-center space-x-2">
                  {editIndex === date._id ? (
                    <>
                      <button
                        onClick={() => handleUpdateDate(date._id)}
                        className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => setEditIndex(null)}
                        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                      >
                        <FaTimes />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditIndex(date._id);
                          setEditValue(date.date); // Set previous date when editing
                        }}
                        className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteDate(date._id)}
                        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AddDates;
