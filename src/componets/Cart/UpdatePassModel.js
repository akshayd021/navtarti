import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';

const UpdatePassModal = ({ pass, onClose, onUpdate }) => {
    const [quantity, setQuantity] = useState(pass.quantity);
    const [selectedDate, setSelectedDate] = useState(pass.selectedDates[0]);
    const goldPrice = 799;
    const platinumPrice = 1699;

    console.log(selectedDate)

    const handleUpdate = () => {
        const updatedPass = {
            ...pass,
            quantity,
            selectedDates: [selectedDate],
            price: (pass.type === 'Platinum' ? platinumPrice : goldPrice) * quantity
        };
        onUpdate(updatedPass);
        onClose();
    };

    const Increse = () => {
        setQuantity(quantity + 1)
    }
    const Decrease = () => {
        setQuantity(quantity - 1)
    }


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-lg font-bold">Update Pass</h2>
                <div className="flex items-center mt-4">
                    <img
                        src={pass.type === 'Platinum' ? 'path_to_platinum_image' : 'path_to_gold_image'}
                        alt={pass.type}
                        className="h-20 w-20 object-cover rounded"
                    />
                    <div className="ml-4">
                        <p className="text-lg font-semibold">Type: {pass.type}</p>
                        <p className="text-md">Price: Rs. {(pass.type === 'Platinum' ? platinumPrice : goldPrice)} each</p>
                    </div>
                </div>
                <label className="block mt-4">
                    Quantity:

                    <div className="w-[25%] border border-gray-300 flex gap-2 p-2 justify-between items-center rounded">
                        <FaMinus className="text-black cursor-pointer" onClick={Decrease} />
                        <p className="text-black font-semibold">{quantity}</p>
                        <FaPlus className="text-black cursor-pointer" onClick={Increse} />
                    </div>
                </label>
                <label className="block mt-4 ">
                    Date:
                    <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="border rounded px-2 py-1 w-full mt-2"
                    >
                        <option value="Day-7 11 Oct">Day-7 11 Oct</option>
                        <option value="Day-8 12 Oct">Day-8 12 Oct</option>
                        <option value="Day-9 13 Oct">Day-9 13 Oct</option>
                        <option value="Day-10 14 Oct">Day-10 14 Oct</option>
                    </select>
                </label>
                <div className="mt-4 flex justify-between">
                    <button
                        onClick={handleUpdate}
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Update
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-black py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdatePassModal;
