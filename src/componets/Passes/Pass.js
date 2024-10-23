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
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedPassType, setSelectedPassType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();
  const [pass, setPass] = useState([]);
  const { submittedDates, fetchDates } = useDates();
  const { passes, fetchPasses: fetchAllPasses } = useAdminPass();

  const isCombo = id.includes("combo");
  const comboDays = id.includes("3-days-combo") ? 3 : id.includes("5-days-combo") ? 5 : null;

  const fetchSinglePass = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/api/get-pass/${id}`);
      setPass(response?.data);
    } catch (error) {
      console.error("Error fetching pass:", error);
    }
  };

  useEffect(() => {
    if (isCombo) {
      fetchAllPasses();
    } else {
      fetchSinglePass();
    }
    fetchDates();
  }, []);

  console.log(comboDays, isCombo , "combo")
  // Handle quantity change
  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  // Calculate total price based on the selected pass type and quantity
  const total = () => {
    const pass = passes.find((p) => p.type === selectedPassType);
    return pass ? pass.price * quantity : 0;
  };

  const subtotal = total();

  // Handle pass type selection
  const handlePassTypeSelect = (event) => {
    setSelectedPassType(event.target.value);
    setSelectedDates([]);
  };

  // Handle date selection logic
  const handleDateSelect = (date) => {
    if (selectedDates.includes(date)) {
      setSelectedDates(selectedDates.filter((d) => d !== date));
    } else if (selectedDates.length < comboDays) {
      setSelectedDates([...selectedDates, date]);
    }
  };

  // Handle "Buy Now" click
  const handleBuyNow = async () => {
    if (isCombo && selectedDates.length !== comboDays) {
      alert(`Please select exactly ${comboDays} dates for a combo pass.`);
      return;
    }

    if (!isCombo && selectedDates.length !== 1) {
      alert("Please select a date.");
      return;
    }

    if (!selectedPassType) {
      alert("Please select a pass type.");
      return;
    }

    const pass = passes.find((p) => p.type === selectedPassType);
    const passData = {
      type: pass.type,
      quantity,
      selectedDates,
      price: pass.price,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/api/passes`, passData);
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
          background:
            "linear-gradient(90deg, rgba(15, 38, 51, 1) 0%, rgba(49, 38, 19, 1) 50%, rgba(47, 12, 12, 1) 100%)",
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
        {isCombo ? (
          <>
            <h6 className="mt-8 text-[20px] font-semibold text-[#232323]">
              Select Pass Type:
            </h6>
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
          </>
        ) : (
          <p
            className={`p-[2px] mt-4 bg-gradient-to-r from-[#D9007A] via-[#FF9D00] to-[#530179] inline-block "border"}`}
          >
            {passes?.map((c) => c.type)}
          </p>
        )}
      </div>
      <hr className="mx-5" />

      {/* Date Selection Section */}
      <div className="mt-5 text-left px-5 mb-10">
        <h6 className="mt-8 text-[20px] font-semibold text-[#232323]">
          {isCombo ? `Select ${comboDays} Ticket Dates:` : "Select Ticket Date:"}
        </h6>
        <div className="flex gap-6 items-center">
          {submittedDates?.map((dateObj) => {
            const formattedDate = moment(dateObj.date).format("DD/MM/YYYY");
            const isSelected = selectedDates.includes(formattedDate);

            return (
              <div
                key={dateObj._id}
                className={`p-[2px] mt-4 bg-gradient-to-r from-[#D9007A] via-[#FF9D00] to-[#530179] inline-block ${
                  isSelected ? "border border-black" : ""
                }`}
              >
                <div className="bg-white">
                  <label className="flex items-center gap-2 py-3 px-5">
                    <input
                      type="checkbox"
                      className="w-5 h-5"
                      checked={isSelected}
                      onChange={() => handleDateSelect(formattedDate)}
                      disabled={
                        !isSelected && isCombo && selectedDates.length === comboDays
                      } // Disable if max combo dates are selected
                    />
                    {formattedDate}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <hr className="mx-5" />
      <div className="mt-5 px-5 text-left">
        <p className="text-[20px] font-[500] text-[#232323]">
          Subtotal: Rs. {subtotal.toLocaleString()}
        </p>
        <p className="text-[20px] font-[400] mt-2 text-[#232323]">Quantity:</p>
        <div className="flex items-center justify-center gap-6 my-4">
          <div className="w-[10%] border flex gap-4 p-3 justify-between items-center">
            <FaMinus
              className="text-black cursor-pointer"
              onClick={() => handleQuantityChange(-1)}
            />
            <p className="text-black font-semibold">{quantity}</p>
            <FaPlus
              className="text-black cursor-pointer"
              onClick={() => handleQuantityChange(1)}
            />
          </div>
          <div className="w-[90%]">
            <button
              className="bg-gradient-to-r from-purple-800 via-pink-600 to-yellow-500 text-lg w-full text-white font-semibold py-3 px-4 uppercase"
              onClick={handleBuyNow}
              disabled={
                isCombo
                  ? selectedDates.length !== comboDays
                  : selectedDates.length !== 1
              } // Disable if date selection is incomplete
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
