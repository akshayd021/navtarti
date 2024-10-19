import React, { useState } from "react";
import { logo, managment } from "../../assets";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa6";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Pass = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const goldPrice = 799;
  const PlatinumPrice = 1699;
  const DaysGold = 2499;
  const DaysPlatinum = 4799;
  const { slug } = useParams();
  const navigate = useNavigate();
  const [selecttype, setSelectType] = useState("Gold");

  const Platinum = slug?.includes("platinum");
  const Gold = slug?.includes("gold");
  const passType = Platinum ? "Platinum" : Gold ? "Gold" : "3-Day Combo";

  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  const total = () => {
    if (selectedDates.length > 1) {
      return Platinum ? DaysPlatinum : DaysGold;
    } else {
      return (passType !== "Gold" ? PlatinumPrice : goldPrice) * quantity;
    }
  };

  const subtotal = total();

  const handleDateSelect = (date) => {
    if (passType === "3-Day Combo") {
      if (selectedDates.includes(date)) {
        setSelectedDates(selectedDates.filter((d) => d !== date));
      } else {
        if (selectedDates.length < 3) {
          setSelectedDates([...selectedDates, date]);
        } else {
          alert("You can only select up to 3 dates.");
        }
      }
    } else {
      setSelectedDate(date);
    }
  };

  const handleBuyNow = async () => {
    if (
      (passType === "3-Day Combo" && selectedDates.length === 0) ||
      (passType !== "3-Day Combo" && !selectedDate)
    ) {
      alert("Please select at least 1 date.");
      return;
    }

    const passData = {
      type: passType === "3-Day Combo" ? selecttype : Platinum ? "Platinum" : "Gold",
      quantity,
      selectedDates: passType === "3-Day Combo" ? selectedDates : [selectedDate],
      price: subtotal,
    };

    try {
      const response = await axios.post(
        "http://192.168.29.219:5000/api/passes",
        passData
      );
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
    <div className="">
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
          Daily {passType} Tickets - Suvarn Navratri, Surat
        </h3>
        <h4 className="text-[25px] text-[#232323] font-semibold mt-5">
          Rs{" "}
          {Platinum
            ? PlatinumPrice
            : Gold
            ? goldPrice
            : selecttype === "Gold"
            ? DaysGold
            : DaysPlatinum}
          .00
        </h4>

        {passType !== "3-Day Combo" && (
          <>
            <h6 className="mt-8 text-[20px] font-semibold text-[#232323]">
              Tickets Type: {Platinum ? "Platinum" : "Gold"}
            </h6>
            <div className="p-[2px] mt-4 bg-gradient-to-r from-[#D9007A] via-[#FF9D00] to-[#530179] inline-block">
              <div className="bg-white">
                <button className="text-black px-4 py-2 font-semibold uppercase">
                  {Platinum ? "Platinum" : "GOLD"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <hr className="mx-5" />

      <div className="mt-5 text-left px-5 mb-10">
        <h6 className="mt-8 text-[20px] font-semibold text-[#232323]">
          Ticket Date:
        </h6>
        <div className="flex gap-6 items-center">
          {[
            "11/10/2024",
            "12/10/2024",
            "13/10/2024",
            "14/10/2024",
          ].map((date) => (
            <div
              key={date}
              className="p-[2px] mt-4 bg-gradient-to-r from-[#D9007A] via-[#FF9D00] to-[#530179] inline-block"
            >
              <div className="bg-white">
                {passType !== "3-Day Combo" ? (
                  <button
                    className={`text-black px-16 py-3 font-semibold ${
                      selectedDate === date ? "bg-gray-300" : ""
                    }`}
                    onClick={() => handleDateSelect(date)}
                  >
                    {date}
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2 px-8">
                    <input
                      type="checkbox"
                      className="w-5 h-5"
                      checked={selectedDates.includes(date)}
                      onChange={() => handleDateSelect(date)} // Change to onChange
                    />
                    <button
                      className={`text-black py-4 font-semibold`}
                      onClick={() => handleDateSelect(date)}
                    >
                      {date}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 ">
          {passType === "3-Day Combo" && (
            <>
              <h6 className="mt-8 text-[20px] font-semibold text-[#232323]">
                Tickets Type: {Platinum ? "Platinum" : "Gold"}
              </h6>
              <div className="flex gap-5 items-center">
                <div
                  className={`p-[2px] mt-4 ${
                    selecttype === "Gold"
                      ? "bg-gradient-to-r from-[#D9007A] via-[#FF9D00] to-[#530179]"
                      : "border-2"
                  } inline-block`}
                >
                  <div className="bg-white">
                    <button
                      onClick={() => setSelectType("Gold")}
                      className="text-black px-4 py-2 font-semibold uppercase"
                    >
                      Gold
                    </button>
                  </div>
                </div>
                <div
                  className={`p-[2px] mt-4 ${
                    selecttype !== "Gold"
                      ? "bg-gradient-to-r from-[#D9007A] via-[#FF9D00] to-[#530179]"
                      : "border-2"
                  } inline-block`}
                >
                  <div className="bg-white">
                    <button
                      onClick={() => setSelectType("Platinum")}
                      className="text-black px-4 py-2 font-semibold uppercase"
                    >
                      Platinum
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
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
              className="bg-gradient-to-r from-purple-800 via-pink-600 to-yellow-500 text-lg w-full text-white font-semibold py-3 px-4 rounded-sm"
              onClick={handleBuyNow}
            >
              BUY IT NOW
            </button>
          </div>
        </div>
      </div>

      <div className="w-full my-20">
        <img src={managment} alt="management" />
      </div>
    </div>
  );
};

export default Pass;
