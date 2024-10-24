import React, { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { gold, platinum } from '../../assets';
import moment from 'moment';
import axios from 'axios'; // Import axios

const UpdatePassModal = ({ pass, onClose, onUpdate }) => {
    const [quantity, setQuantity] = useState(pass.quantity);
    const [selectedDates, setSelectedDates] = useState(pass.selectedDates);
    const [selectType, setSelectType] = useState(pass.type);
    const [updatePass, setUpdatePass] = useState([])
    const goldPrice = 799;
    const platinumPrice = 1699;
    console.log(selectedDates, "pSS")

    const handleUpdate = async () => {
        // const updatedSelectedDates = selectedDates.map((d) => {
        //     const existingDate = pass.selectedDates.find(sd => sd.date === d.date);
        //     return existingDate ? { ...existingDate, status: "pending" } : { date: d?.date, status: "pending" };
        // });

        const updatedPass = {
            _id: pass._id, // Pass ID
            type: selectType,
            quantity,
            // selectedDates: updatedSelectedDates, // Use the corrected selectedDates
            // price: (selectType === 'Platinum' ? platinumPrice : goldPrice) * quantity * updatedSelectedDates.length,
        };

        try {
            const response = await axios.put(`${process.env.REACT_APP_URL}/api/pass/update-pass`, updatedPass, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Pass updated successfully:', response?.data);
            setUpdatePass(response?.data?.pass)
            localStorage.setItem("passes", JSON.stringify(response?.data?.pass));
            onUpdate(response.data);
            onClose();

        } catch (error) {
            console.error('Error updating pass:', error.response ? error.response.data : error.message);
        }
    };



    const increase = () => {
        setQuantity(quantity + 1);
    };

    const decrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleDateChange = (date) => {
        setSelectedDates((prev) =>
            prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
        );
    };


  
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-lg font-bold">Update Pass</h2>
                {updatePass}
                <div className="flex items-center mt-4">
                    <img src={pass.type === 'Platinum' ? platinum : gold} alt={pass.type} className="h-20 w-20 object-cover rounded" />
                    <div className="ml-4">
                        <p className="text-lg font-semibold">Type: {pass.type}</p>
                        <p className="text-md">Price: Rs. {(pass.type === 'Platinum' ? platinumPrice : goldPrice)} each</p>
                    </div>
                </div>
                <label className="block mt-4">
                    Quantity:
                </label>
                <div className="w-[25%] border mt-3 border-gray-300 flex gap-2 p-2 justify-between items-center rounded">
                    <FaMinus className="text-black cursor-pointer" onClick={decrease} />
                    <p className="text-black font-semibold">{quantity}</p>
                    <FaPlus className="text-black cursor-pointer" onClick={increase} />
                </div>

                {selectType === '3-Day Combo' ? (
                    <div className="mt-4">
                        <p>Date:</p>
                        {['Day-7 11 Oct', 'Day-8 12 Oct', 'Day- 9 13 Oct', 'Day-10 14 Oct'].map((date) => (
                            <div key={date} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedDates.includes(date)}
                                    onChange={() => handleDateChange(date)}
                                />
                                <label className="ml-2">{moment(date).format("DD/MM/YYYY")}</label>
                            </div>
                        ))}
                    </div>
                ) : (
                    ""
                )}

                <div className='flex gap-5 items-center mt-4'>
                    <div className={`p-[2px] ${selectType === "Gold" ? "bg-gradient-to-r from-[#D9007A] via-[#FF9D00] to-[#530179]" : "border-2"} inline-block`}>
                        <button onClick={() => setSelectType("Gold")} className="bg-white text-black px-4 py-2 font-semibold uppercase">
                            Gold
                        </button>
                    </div>
                    <div className={`p-[2px] ${selectType !== "Gold" ? "bg-gradient-to-r from-[#D9007A] via-[#FF9D00] to-[#530179]" : "border-2"} inline-block`}>
                        <button onClick={() => setSelectType("Platinum")} className="bg-white text-black px-4 py-2 font-semibold uppercase">
                            Platinum
                        </button>
                    </div>
                </div>

                <div className="mt-4 flex justify-between">
                    <button onClick={handleUpdate} className="bg-blue-500 text-white py-2 px-4 rounded">
                        Update
                    </button>
                    <button onClick={onClose} className="bg-gray-300 text-black py-2 px-4 rounded">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdatePassModal;
