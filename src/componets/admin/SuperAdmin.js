import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaRupeeSign,
  FaTicketAlt,
  FaSearch,
  FaCalendarAlt,
} from "react-icons/fa";
import _ from "lodash";
import moment from "moment";
import { Link, useHistory } from "react-router-dom";
import { useDates } from "../../context/dateContext";

const SuperAdminDashboard = () => {
  const [passes, setPass] = useState([]);
  const [filteredPasses, setFilteredPasses] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalGoldPass, setTotalGoldPass] = useState(0);
  const [totalPlatinumPass, setTotalPlatinumPass] = useState(0);
  const [totalPassOnSingleDate, setTotalPassOnSingleDate] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [status, setStatus] = useState("");
  const { submittedDates } = useDates(); // Access dates from the context

  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get the token from localStorage (or sessionStorage)
    
    // If no token found, redirect to login
    if (!token) {
      history.push("/login");
    }
  }, [history]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_URL}/api/pass/get-passes`
      );
      setPass(response.data?.passes);
      setFilteredPasses(response.data?.passes);
      calculateStats(response.data?.passes);
    };
    fetchData();
  }, []);

  const calculateStats = (passesData) => {
    let totalPayment = 0;
    let goldPassCount = 0;
    let platinumPassCount = 0;
    let singleDateTotalPass = 0;

    passesData.forEach((pass) => {
      totalPayment += pass.price * pass.quantity;
      if (pass.type === "Gold") {
        goldPassCount += pass.quantity;
      } else if (pass.type === "Platinum") {
        platinumPassCount += pass.quantity;
      }
      if (
        pass.selectedDates.some((date) =>
          moment(date.date).isSame("2024-10-12")
        )
      ) {
        singleDateTotalPass += pass.quantity;
      }
    });

    setTotalPayment(totalPayment);
    setTotalGoldPass(goldPassCount);
    setTotalPlatinumPass(platinumPassCount);
    setTotalPassOnSingleDate(singleDateTotalPass);
  };

  // Combine the search, date, and status filters
  const applyFilters = (passesData, query, dateFilter, statusFilter) => {
    let filtered = passesData;

    if (query) {
      const lowercasedQuery = query.toLowerCase();
      filtered = _.filter(filtered, (pass) => {
        return (
          _.includes(pass.type.toLowerCase(), lowercasedQuery) || // Search by type
          _.includes(pass.price.toString(), lowercasedQuery) || // Search by price
          _.includes(pass.quantity.toString(), lowercasedQuery) || 
          _.includes(pass.firstName.toString(), lowercasedQuery) ||// Search by quantity
          _.includes(pass.lastName.toString(), lowercasedQuery) ||
          _.includes(moment(pass.date).format("DD/MM/YYYY"), lowercasedQuery) // Search by date
        );
      });
    }

    if (dateFilter) {
      filtered = filtered.filter((pass) =>
        pass.selectedDates.some(
          (date) => moment(date.date).format("DD/MM/YYYY") === dateFilter
        )
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((pass) =>
        pass.selectedDates.some((date) => date.status === statusFilter)
      );
    }

    setFilteredPasses(filtered);
    calculateStats(filtered); // Recalculate stats for the filtered passes
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    applyFilters(passes, query, selectedDate, status);
  };

  const handleDateFilter = (date) => {
    setSelectedDate(date);
    applyFilters(passes, searchQuery, date, status);
  };

  const handleStatus = (status) => {
    setStatus(status);
    applyFilters(passes, searchQuery, selectedDate, status);
  };

  console.log("filer", passes)

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">
        Super Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {[
          {
            label: "Total Payment",
            icon: FaRupeeSign,
            color: "bg-gradient-to-r from-green-400 to-green-600",
            value: `₹${totalPayment.toFixed(2)}`,
          },
          {
            label: "Total Gold Passes",
            icon: FaTicketAlt,
            color: "bg-gradient-to-r from-yellow-400 to-yellow-600",
            value: totalGoldPass,
          },
          {
            label: "Total Platinum Passes",
            icon: FaTicketAlt,
            color: "bg-gradient-to-r from-purple-400 to-purple-600",
            value: totalPlatinumPass,
          },
          {
            label: "Passes on 12 Oct 2024",
            icon: FaTicketAlt,
            color: "bg-gradient-to-r from-blue-400 to-blue-600",
            value: totalPassOnSingleDate,
          },
        ].map(({ label, icon: Icon, color, value }, idx) => (
          <div
            key={idx}
            className={`${color} text-white shadow-xl rounded-lg p-6 text-center transform hover:scale-105 transition-transform`}
          >
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
            placeholder="Search Passes by Type, UserName, Price, Quantity or Date"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Link to={"/admin/add-event"} >
        Add Event </Link>
        <Link to={"/admin/create-pass"} >
        Add Pass </Link>
       
        <div className="flex items-center gap-3">
          <select
            onChange={(e) => handleStatus(e.target.value)}
            className="px-2 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Filter by Status</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="pending">Pending</option>
          </select>
          <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
            <select
              onChange={(e) => handleDateFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Filter by Date</option>
              {submittedDates?.map((date, i)=>(

              <option value={moment(date?.date).format('DD/MM/YYYY')}>{moment(date?.date).format('DD/MM/YYYY')}</option>
              ))}
      
            </select>
          </div>
        </div>
      </div>
      {console.log(submittedDates, "submit")}

      {/* User Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-gray-700 font-bold text-left">#</th>
              <th className="py-3 px-6 text-gray-700 font-bold text-left">
                Type
              </th>
              <th className="py-3 px-6 text-gray-700 font-bold text-left">
                User Name
              </th>
              <th className="py-3 px-6 text-gray-700 font-bold text-left">
                Quantity
              </th>
              <th className="py-3 px-6 text-gray-700 font-bold text-left">
                Price
              </th>
              <th className="py-3 px-6 text-gray-700 font-bold text-left">
                Buy date
              </th>
              <th className="py-3 px-6 text-gray-700 font-bold text-left">
                Pass Date
              </th>
              <th className="py-3 px-6 text-gray-700 font-bold text-left">
                Status
              </th>
              <th className="py-3 px-6 text-gray-700 font-bold text-left">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {filteredPasses.length > 0 ? (
              filteredPasses.map((pass, idx) => (
                <tr key={pass._id} className="border-b border-gray-200">
                  <td className="py-3 px-6">{idx + 1}</td>
                  <td className="py-3 px-6">{pass.type}</td>
                  <td className="py-3 px-6">{pass.firstName ||"not"} {pass.lastName}</td>
                  <td className="py-3 px-6">{pass.quantity}</td>
                  <td className="py-3 px-6">₹{pass.price.toFixed(2)}</td>
                  <td className="py-3 px-6">
                    {moment(pass.date).format("DD/MM/YYYY")}
                  </td>

                  {/* Pass Date Column */}
                  <td className="py-3 px-6">
                    {pass.selectedDates.map((date, i) => (
                      <p key={i}>{moment(date.date).format("DD/MM/YYYY")}</p>
                    ))}
                  </td>

                  {/* Status Column with Text Color */}
                  <td className="py-3 px-6">
                    {pass.selectedDates.map((date, i) => (
                      <p
                        key={i}
                        className={`capitalize ${
                          date.status === "accepted"
                            ? "text-green-500 font-semibold"
                            : date.status === "rejected"
                            ? "text-red-600 font-semibold"
                            : "text-gray-600"
                        }`}
                      >
                        {date.status}
                      </p>
                    ))}
                  </td>

                  <td className="py-3 px-6">
                    ₹{(pass.price * pass.quantity).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-3 px-6 text-center">
                  No passes found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
