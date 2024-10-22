import React, { useEffect, useState } from "react";
import { logo } from "../../assets";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa6";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { useDates } from "../../context/dateContext";
import { useAdminPass } from "../../context/AddminPassContext";

const Pass = () => {
  const [selectedDate, setSelectedDate] = useState(null); // Selected date
  const [selectedPassType, setSelectedPassType] = useState(""); // Selected pass type
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const { submittedDates, fetchDates } = useDates(); // Fetch available dates from context
  const { passes, fetchPasses: fetchAllPasses } = useAdminPass(); // Fetch all passes from context

  useEffect(() => {
    fetchAllPasses(); // Fetch passes for both combo and single pass options
    fetchDates(); // Fetch available dates
  }, []);

  // Handle quantity change
  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  // Calculate total price based on the selected pass type and quantity
  const total = () => {
    const pass = passes.find((p) => p.type === selectedPassType);
    return pass ? pass.price * quantity : 0;
  };

  const subtotal = total(); // Store the total value for display

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date); // Allow only one date selection
  };

  // Handle pass type selection
  const handlePassTypeSelect = (event) => {
    setSelectedPassType(event.target.value); // Select only one pass type
  };

  // Handle buy now click
  const handleBuyNow = async () => {
    if (!selectedDate || !selectedPassType) {
      alert("Please select a pass type and date.");
      return;
    }

    const pass = passes.find((p) => p.type === selectedPassType);

    const passData = {
      type: pass.type,
      quantity,
      selectedDates: [selectedDate], // Single selected date in required format
      price: pass.price,
    };

    try {
      const response = await axios.post("http://192.168.29.219:5000/api/passes", passData);
      let passes = JSON.parse(localStorage.getItem("passes")) || [];
      passes.push(response?.data);
      localStorage.setItem("passes", JSON.stringify(passes));
      navigate("/cart");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to purchase pass. Please try again.");
    }
  };

  return (
    <div>
      <div
        style={{
          background: "linear-gradient(90deg, rgba(15, 38, 51, 1) 0%, rgba(49, 38, 19, 1) 50%, rgba(47, 12, 12, 1) 100%)",
        }}
      >
        <div className="flex flex-row justify-between items-center p-5">
          <img src={logo} alt="logo" className="h-[87px] ml-3" />
          <div className="flex gap-2 items-center text-white -pt-3">
            <IoLocationOutline className="text-2xl" />
            <p className="text-lg">Surat</p>
            <div className="ml-10">
              <IoIosArrowDown />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 text-left px-5 mb-10">
        <h3 className="text-[#232323] font-bold uppercase text-[32px]">
          {`Tickets - Suvarn Navratri, Surat`}
        </h3>
        <h4 className="text-[25px] text-[#232323] font-semibold mt-5">
          Rs {total()}.00
        </h4>

        {/* Pass Type Selection */}
        <h6 className="mt-8 text-[20px] font-semibold text-[#232323]">Select Pass Type:</h6>
        <select
          value={selectedPassType}
          onChange={handlePassTypeSelect}
          className="border p-2 rounded"
        >
          <option value="">-- Select Pass Type --</option>
          {passes.map((pass) => (
            <option key={pass._id} value={pass.type}>
              {pass.type}
            </option>
          ))}
        </select>
      </div>
      <hr className="mx-5" />

      {/* Date Selection Section */}
      <div className="mt-5 text-left px-5 mb-10">
        <h6 className="mt-8 text-[20px] font-semibold text-[#232323]">Select Ticket Date:</h6>
        <div className="flex gap-6 items-center">
          {submittedDates?.map((dateObj) => (
            <div
              key={dateObj._id}
              className="p-[2px] mt-4 bg-gradient-to-r from-[#D9007A] via-[#FF9D00] to-[#530179] inline-block"
            >
              <div className="bg-white">
                <label className="flex items-center">
                  <input
                    type="radio"
                    className="mr-2"
                    checked={selectedDate === moment(dateObj.date).format("DD/MM/YYYY")}
                    onChange={() => handleDateSelect(moment(dateObj.date).format("DD/MM/YYYY"))}
                  />
                  {moment(dateObj.date).format("DD/MM/YYYY")}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="mx-5" />
      <div className="mt-5 px-5 text-left">
        <p className="text-[20px] font-[500] text-[#232323]">Subtotal: Rs. {subtotal.toLocaleString()}</p>
        <p className="text-[20px] font-[400] mt-2 text-[#232323]">Quantity:</p>
        <div className="flex items-center justify-center gap-6 my-4">
          <div className="w-[10%] border flex gap-4 p-3 justify-between items-center">
            <FaMinus className="text-black cursor-pointer" onClick={() => handleQuantityChange(-1)} />
            <p className="text-black font-semibold">{quantity}</p>
            <FaPlus className="text-black cursor-pointer" onClick={() => handleQuantityChange(1)} />
          </div>
          <div className="w-[90%]">
            <button
              className="bg-gradient-to-r from-purple-800 via-pink-600 to-yellow-500 text-lg w-full text-white font-semibold py-3 px-4 uppercase"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pass;
