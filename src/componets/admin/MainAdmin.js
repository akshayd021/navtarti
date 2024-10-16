import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPhoneAlt, FaEnvelope, FaRupeeSign } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersWithPasses = async () => {
      try {
        const usersResponse = await axios.get(
          `http://192.168.29.219:5000/api/user/get-users`
        );
        setUsers(usersResponse?.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user or pass data:", err);
        setError("Failed to load user and pass data");
        setLoading(false);
      }
    };

    fetchUsersWithPasses();
  }, []);

  const handleAction = async (dummyLink, action) => {
    try {
      const response = await axios.post(`http://192.168.29.219:5000/api/user/verify-link`, {
        dummyLink,
        action,
      });

      if (response.data.success) {
        alert(`Link has been ${action === 'accept' ? 'accepted' : 'rejected'}`);
      }
    } catch (error) {
      console.error("Error processing link:", error);
      alert("Failed to process link");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-blue-300 p-10">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Admin Dashboard
      </h2>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => {
          const totalPayment = user.passes?.reduce(
            (acc, pass) => acc + pass.price * pass.quantity,
            0
          );

          return (
            <div key={user._id} className="bg-white shadow-lg rounded-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              
              {/* Link Status */}
              {user.linkStatus === 'pending' && (
                <div className="flex gap-4 mb-4">
                  <button
                    className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-lg transition-transform duration-200"
                    onClick={() => handleAction(user.dummyLink, 'accept')}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-lg transition-transform duration-200"
                    onClick={() => handleAction(user.dummyLink, 'reject')}
                  >
                    Reject
                  </button>
                </div>
              )}

              <p className={`text-sm font-semibold mb-2 ${user.linkStatus === 'accepted' ? 'text-green-500' : 'text-red-500'}`}>
                Link {user.linkStatus}
              </p>

              {/* User Details */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Full Name</span>
                    <span className="text-xl font-semibold text-gray-800">{user.firstName} {user.lastName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPhoneAlt className="text-green-500" />
                    <span className="text-gray-800">{user.mobile}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-blue-500" />
                  <span className="text-gray-800">{user.email}</span>
                </div>

                {/* Pass Information */}
                <div className="mt-6 border-t pt-4">
                  <h3 className="text-lg font-semibold text-gray-600">Pass Information</h3>
                  <div className="flex items-center mt-2">
                    <FaRupeeSign className="text-green-500" />
                    {user.passes.length > 0 ? (
                      <span className="text-lg text-gray-800 font-semibold">
                        ₹{totalPayment.toFixed(2)}
                      </span>
                    ) : (
                      <span className="text-gray-500">No passes available</span>
                    )}
                  </div>
                </div>

                {user.passes.length > 0 && (
                  user.passes.map((pass) => (
                    <div key={pass._id} className="mt-4 p-4 bg-gray-50 rounded-lg border">
                      <div className="flex justify-between">
                        <div>
                          <span className="text-sm text-gray-500">Type</span>
                          <span className="block text-gray-800">{pass.type}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Price</span>
                          <span className="block text-gray-800">₹{pass.price}</span>
                        </div>
                        <div>
                          <span className="text-sm text-gray-500">Quantity</span>
                          <span className="block text-gray-800">{pass.quantity}</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-sm text-gray-500">Dates</span>
                        <div className="flex flex-wrap gap-2">
                          {pass.selectedDates.map((date, index) => (
                            <span key={index} className="text-gray-800 text-sm">
                              {new Date(date).toLocaleDateString()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}

        <div className="flex justify-center w-full mt-8">
          <Link to="/admin/super-admin">
            <button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-2xl transition-transform duration-300">
              Go to Super Admin
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
