import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRupeeSign, FaTicketAlt, FaSearch, FaCalendarAlt } from "react-icons/fa";
import _ from "lodash";

const SuperAdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [totalPayment, setTotalPayment] = useState(0);
    const [totalGoldPass, setTotalGoldPass] = useState(0);
    const [totalPlatinumPass, setTotalPlatinumPass] = useState(0);
    const [totalPassOnSingleDate, setTotalPassOnSingleDate] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://192.168.29.219:5000/api/user/get-users`);
            setUsers(response.data);
            setFilteredUsers(response.data);
            calculateStats(response?.data);
        };
        fetchData();
    }, []);

    const calculateStats = (usersData) => {
        let totalPayment = 0;
        let goldPassCount = 0;
        let platinumPassCount = 0;
        let singleDateTotalPass = 0;

        usersData.forEach((user) => {
            user.passes.forEach((pass) => {
                if (user?.linkStatus === "accepted") {
                    totalPayment += pass.price * pass.quantity;

                    if (pass.type === "Gold") goldPassCount += pass.quantity;
                    else if (pass.type === "Platinum") platinumPassCount += pass.quantity;

                    if (new Date(pass.selectedDates[0]).toLocaleDateString() === "10/12/2024") {
                        singleDateTotalPass += pass.quantity;
                    }
                }
            });
        });

        setTotalPayment(totalPayment);
        setTotalGoldPass(goldPassCount);
        setTotalPlatinumPass(platinumPassCount);
        setTotalPassOnSingleDate(singleDateTotalPass);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query === "") {
            setFilteredUsers(users);
        } else {
            const lowercasedQuery = query.toLowerCase();
            const filtered = _.filter(users, (user) =>
                user.firstName.toLowerCase().includes(lowercasedQuery) ||
                user.lastName.toLowerCase().includes(lowercasedQuery) ||
                user.email.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredUsers(filtered);
        }
    };

    const handleDateFilter = (date) => {
        setSelectedDate(date);
        const filtered = users.map((user) => {
            const userFilteredPasses = user.passes.filter((pass) => {
                return new Date(pass.selectedDates[0]).toLocaleDateString() === date;
            });
            return { ...user, passes: userFilteredPasses };
        });
        setFilteredUsers(filtered);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">Super Admin Dashboard</h1>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                {[
                    { label: 'Total Payment', icon: FaRupeeSign, color: 'bg-gradient-to-r from-green-400 to-green-600', value: `₹${totalPayment.toFixed(2)}` },
                    { label: 'Total Gold Passes', icon: FaTicketAlt, color: 'bg-gradient-to-r from-yellow-400 to-yellow-600', value: totalGoldPass },
                    { label: 'Total Platinum Passes', icon: FaTicketAlt, color: 'bg-gradient-to-r from-purple-400 to-purple-600', value: totalPlatinumPass },
                    { label: 'Passes on 12 Oct 2024', icon: FaTicketAlt, color: 'bg-gradient-to-r from-blue-400 to-blue-600', value: totalPassOnSingleDate },
                ].map(({ label, icon: Icon, color, value }, idx) => (
                    <div key={idx} className={`${color} text-white shadow-xl rounded-lg p-6 text-center transform hover:scale-105 transition-transform`}>
                        <Icon className="text-4xl mx-auto mb-4" />
                        <h2 className="text-xl font-bold">{label}</h2>
                        <p className="text-2xl font-semibold">{value}</p>
                    </div>
                ))}
            </div>

            {/* Search and Filter */}
            <div className="flex justify-between mb-6">
                <div className="relative w-1/2">
                    <FaSearch className="absolute left-3 top-3 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search Users by Name or Email"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
                    <select
                        onChange={(e) => handleDateFilter(e.target.value)}
                        className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Filter by Date</option>
                        <option value="10/12/2024">12 Oct 2024</option>
                        <option value="10/11/2024">11 Oct 2024</option>
                        <option value="10/10/2024">10 Oct 2024</option>
                        <option value="10/09/2024">9 Oct 2024</option>
                    </select>
                </div>
            </div>

            {/* User Table */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-6 text-gray-700 font-bold text-left">#</th>
                            <th className="py-3 px-6 text-gray-700 font-bold text-left">Name</th>
                            <th className="py-3 px-6 text-gray-700 font-bold text-left">Mobile</th>
                            <th className="py-3 px-6 text-gray-700 font-bold text-left">Email</th>
                            <th className="py-3 px-6 text-gray-700 font-bold text-left">Pass Details</th>
                            <th className="py-3 px-6 text-gray-700 font-bold text-left">Total Payment</th>
                            <th className="py-3 px-6 text-gray-700 font-bold text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {filteredUsers.map((user, index) => {
                            let userTotalPayment = 0;
                            const passDetails = user.passes.map((pass) => {
                                userTotalPayment += pass.price * pass.quantity;
                                return (
                                    <div key={pass._id} className="mb-2">
                                        <p>
                                            <strong>Type:</strong> {pass.type} <br />
                                            <strong>Date:</strong> {new Date(pass.selectedDates[0]).toLocaleDateString()} <br />
                                            <strong>Quantity:</strong> {pass.quantity} <br />
                                            <strong>Total:</strong> ₹{(pass.price * pass.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                );
                            });

                            return (
                                <tr key={user._id} className="border-b hover:bg-gray-100">
                                    <td className="py-3 px-6">{index + 1}</td>
                                    <td className="py-3 px-6">{user.firstName} {user.lastName}</td>
                                    <td className="py-3 px-6">{user.mobile}</td>
                                    <td className="py-3 px-6">{user.email}</td>
                                    <td className="py-3 px-6">{passDetails}</td>
                                    <td className="py-3 px-6">₹{userTotalPayment.toFixed(2)}</td>
                                    <td className="py-3 px-6 capitalize">{user.linkStatus}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
