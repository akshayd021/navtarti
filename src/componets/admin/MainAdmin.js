import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const UserDashboard = () => {
  const { id } = useParams(); // Get user ID from URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [extra, setExtra] = useState(false)

  // Fetch user details and passes
  useEffect(() => {
    const fetchUserWithPasses = async () => {
      try {
        const userResponse = await axios.get(
          `http://192.168.29.219:5000/api/get-pass/${id}`
        );
        // Set the user data correctly based on the response structure
        setUser(userResponse?.data?.pass); // The pass is inside `data.pass`
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user or pass data:", err);
        setError("Failed to load user and pass data");
        setLoading(false);
      }
    };

    fetchUserWithPasses();
  }, [id,extra]);

  const handlePassAction = async (dateId, action) => {
    try {
      setExtra(true)
      const response = await axios.post(
        `http://192.168.29.219:5000/api/pass/update-action`,
        {
          dateId,  // Pass the correct dateId
          action,  // Pass the action (accept or reject)
        }
      );
  
      if (response.data.success) {
        // Handle success, update UI accordingly
        alert(`Date has been ${action === "accept" ? "accepted" : "rejected"}`);
      } else {
        alert(`Failed to ${action} the date.`);
      }
    } catch (error) {
      console.error("Error processing pass action:", error);
      alert("Failed to process action for date.");
      setExtra(false)
    }
  };
  
  // Example call:

  

  if (loading) {
    return <div>Loading.. .</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-blue-300 p-10">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
        User Dashboard
      </h2>

      {/* User Information */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {user ? (
          <div className="bg-white shadow-lg rounded-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="space-y-6">
           <h2 className="text-center text-black font-semibold"> Your Pass Details</h2>

              {/* Pass Information */}
              {user.selectedDates && Array.isArray(user.selectedDates) ? (
                <div className="bg-gray-50 rounded-lg border p-6 space-y-4">
                  <div className="flex justify-between">
                    <div>
                      <span className="text-sm text-gray-500">Type</span>
                      <span className="block text-lg text-gray-800 font-semibold">
                        {user.type}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Price</span>
                      <span className="block text-lg text-gray-800 font-semibold">
                        ₹{user.price}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Quantity</span>
                      <span className="block text-lg text-gray-800 font-semibold">
                        {user.quantity}
                      </span>
                    </div>
                  </div>

                  {/* Dates and Actions */}
                  <div className="mt-4">
                    <span className="text-sm text-gray-500">Dates</span>
                    <div className="space-y-4">
                      {user.selectedDates.map((dateObj, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center gap-4"
                        >
                          <span className="text-gray-800 text-sm">
                            {new Date(dateObj.date).toLocaleDateString()}
                          </span>

                          {dateObj.status !== "pending" ? (
                            <span
                              className={`text-sm ${
                                dateObj.status === "accepted"
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              {dateObj.status.charAt(0).toUpperCase() +
                                dateObj.status.slice(1)}
                            </span>
                          ) : (
                            <div className="flex gap-2">
                              <button
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg focus:outline-none"
                                onClick={() =>
                                  handlePassAction(
                                    dateObj._id, // Pass the _id of the selected date
                                    "accept"
                                  )
                                }
                              >
                                {console.log(dateObj, "idif")}
                                Accept
                              </button>
                              <button
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg focus:outline-none"
                                onClick={() =>
                                  handlePassAction(
                                    dateObj._id, // Pass the _id of the selected date
                                    "reject"
                                  )
                                }
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div>No dates available</div>
              )}
            </div>
          </div>
        ) : (
          <div>No user data found</div>
        )}
      </div>

      {/* Super Admin Link */}
      <div className="flex justify-center w-full mt-8">
        <Link to="/admin/super-admin">
          <button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-2xl transition-transform duration-300">
            Go to Super Admin
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
