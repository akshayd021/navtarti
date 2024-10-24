import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../loader/Loader";

const UserDashboard = ({ token }) => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserWithPasses = async () => {
      setLoading(true);
      try {
        const userResponse = await axios.get(
          `${process.env.REACT_APP_URL}/api/get-pass/${id}`
        );
        setUser(userResponse?.data?.pass);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user or pass data:", err);
        setLoading(false);
      }
    };

    fetchUserWithPasses();
  }, [id]);

  const handlePassAction = async (dateId, action) => {
    if (token) {
      try {
        setLoading(true);
        const response = await axios.post(
          `${process.env.REACT_APP_URL}/api/pass/update-action`,
          {
            dateId,
            action,
          }
        );

        if (response.data.success) {
          alert(
            `Date has been ${action === "confirm" ? "Confirmed" : "Canceled"}`
          );
          setLoading(false);
        } else {
          alert(`Failed to ${action} the date.`);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error processing pass action:", error);
        alert("Failed to process action for date.");
        setLoading(false);
      }
    } else {
      alert("Only Admin can do this");
      setLoading(false);
      setTimeout(() => {
        navigate("/login", { state: { from: location } });
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-blue-300 p-6 md:p-10">
      {loading && <Loader />}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6 md:mb-10">
        User Dashboard
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {user ? (
          <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-center text-black font-semibold">
                Your Pass Details
              </h2>

              {user.selectedDates && Array.isArray(user.selectedDates) ? (
                <div className="bg-gray-50 rounded-lg border p-4 md:p-6 space-y-4">
                  <div className="flex flex-col md:flex-row justify-between">
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

                  <div className="mt-4">
                    <span className="text-sm text-gray-500">Dates</span>
                    <div className="space-y-4">
                      {user.selectedDates.map((dateObj, index) => (
                        <div
                          key={index}
                          className="flex flex-col md:flex-row justify-between items-center gap-4"
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
                            <div className="flex flex-col md:flex-row gap-2">
                              {dateObj.status === "canceled" ? (
                                <button
                                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg focus:outline-none"
                                  onClick={() =>
                                    handlePassAction(dateObj._id, "confirm")
                                  }
                                >
                                  Accept
                                </button>
                              ) : (
                                <>
                                  <button
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg focus:outline-none"
                                    onClick={() =>
                                      handlePassAction(dateObj._id, "confirm")
                                    }
                                  >
                                    Accept
                                  </button>
                                  <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg focus:outline-none"
                                    onClick={() =>
                                      handlePassAction(dateObj._id, "cancel")
                                    }
                                  >
                                    Cancel
                                  </button>
                                </>
                              )}
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

      <div className="flex justify-center w-full mt-6 md:mt-8">
        <Link to="/admin/super-admin">
          <button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-2xl transition-transform duration-300">
            Go to Super Admin
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
