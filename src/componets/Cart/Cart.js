import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { gold, logo, platinum } from "../../assets";
import { FaEdit } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import UpdatePassModal from "./UpdatePassModel";
import moment from "moment";
import _ from "lodash"; // for lodash grouping

const Cart = () => {
    const [passes, setPasses] = useState(
        JSON.parse(localStorage.getItem("passes")) || []
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPass, setSelectedPass] = useState(null);

    const goldPrice = 799;
    const PlatinumPrice = 1699;

    // Group passes by selectedDates and type, and sum their quantities
    const groupedPasses = _.values(
        passes.reduce((acc, pass) => {
            const key = `${pass.type}-${pass.selectedDates.join(",")}`;
            if (!acc[key]) {
                acc[key] = { ...pass };
            } else {
                acc[key].quantity += pass.quantity;
                acc[key].price += pass.price; 
            }
            return acc;
        }, {})
    );

    const subtotal = groupedPasses.reduce((acc, pass) => acc + pass.price, 0);

    const openModal = (pass) => {
        setSelectedPass(pass);
        setIsModalOpen(true);
    };

    const updatePass = (updatedPass) => {
        const updatedPasses = passes.map((pass) =>
            pass.type === updatedPass.type && pass.selectedDates.toString() === updatedPass.selectedDates.toString()
                ? updatedPass
                : pass
        );
        setPasses(updatedPasses);
        localStorage.setItem("passes", JSON.stringify(updatedPasses));
    };

    useEffect(() => {
        const savedPasses = JSON.parse(localStorage.getItem("passes")) || [];
        setPasses(savedPasses);
    }, []);

    const handleDelete = (index) => {
        const updatedPasses = passes.filter((_, i) => i !== index);
        setPasses(updatedPasses);
        localStorage.setItem("passes", JSON.stringify(updatedPasses));
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
            <div className="px-5">
                <div className="flex justify-between items-start gap-10">
                    {groupedPasses?.length === 0 && (
                        <div className="text-center flex justify-center items-center">
                            No pass Found
                        </div>
                    )}
                    {groupedPasses?.length > 0 && (
                        <div className="w-3/4 rounded-lg ">
                            <div className="flex justify-between items-center bg-gray-300 p-3">
                                <div className="w-1/2 text-lg font-semibold">Product</div>
                                <div className="w-1/2 flex justify-between gap-10">
                                    <p className="font-semibold">Price</p>
                                    <p className="font-semibold">Quantity</p>
                                    <p className="font-semibold mr-16">Total</p>
                                </div>
                            </div>
                            <div className="py-5 ">
                                {groupedPasses?.map((pass, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center border py-8 px-3"
                                    >
                                        <div className="flex items-center gap-5 w-1/2">
                                            <img
                                                src={pass.type === "Gold" ? gold : platinum}
                                                alt="gold"
                                                className="h-20 w-20 object-cover rounded-full"
                                            />
                                            <div>
                                                <p className="text-sm font-medium">
                                                    Daily {pass.type} Tickets - Suvarn Navratri, Surat
                                                </p>
                                                {pass.selectedDates.length > 1 && (
                                                    <div className="flex gap-4 items-center">
                                                        <p className="text-sm text-gray-600">{pass.type}</p>
                                                        <FaEdit
                                                            className="text-gray-600 cursor-pointer"
                                                            onClick={() => openModal(pass)}
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex gap-4 items-center text-gray-600">
                                                    <p>
                                                        {pass.selectedDates.map((date, index) => (
                                                            <p className="text-sm" key={index}>
                                                                {moment(date).format("DD/MM/YYYY")}
                                                            </p>
                                                        ))}
                                                    </p>
                                                    {pass.selectedDates.length <= 1 && (
                                                        <FaEdit
                                                            className="text-black cursor-pointer"
                                                            onClick={() => openModal(pass)}
                                                        />
                                                    )}
                                                </div>
                                                <p className="text-gray-500">Suvarn Navratri</p>
                                            </div>
                                        </div>
                                        <div className="w-1/2 flex justify-between items-center">
                                            <p className="text-lg font-semibold">
                                                Rs.
                                                {pass.type === "Gold" ? goldPrice : PlatinumPrice}
                                            </p>
                                            <div className="w-[10%] border border-gray-300 flex gap-2 p-2 justify-center items-center rounded">
                                                <p className="text-black font-semibold">
                                                    {pass.quantity}
                                                </p>
                                            </div>
                                            <p className="text-lg font-semibold">
                                                Rs. {pass.price}.00
                                            </p>
                                            <IoCloseSharp
                                                className="text-xl cursor-pointer"
                                                onClick={() => handleDelete(index)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="w-1/4 mt-2 ">
                        <h2 className="text-[12px] uppercase font-bold mb-4 border-b-2 border-black pb-2">
                            Order Summary
                        </h2>
                        <div className="flex justify-between items-center text-[12px] border-b pb-1">
                            <p className="font-[500]">SubTotal </p>
                            <p className="font-bold">Rs.{subtotal}</p>
                        </div>
                        <div className="flex justify-between items-center mt-2 text-[12px] border-y pt-2 pb-3">
                            <p className="font-[500] uppercase">Total: </p>
                            <p className="font-bold">Rs.{subtotal}</p>
                        </div>
                        <Link to={"/checkout/123456778999"}>
                            <button className="mt-4 bg-[#232323] text-white font-semibold py-2 px-4 w-full rounded-sm hover:bg-gray-300 hover:text-black">
                                Checkout
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Modal for Updating Pass */}
            {isModalOpen && (
                <UpdatePassModal
                    pass={selectedPass}
                    onClose={() => setIsModalOpen(false)}
                    onUpdate={updatePass}
                />
            )}
        </div>
    );
};

export default Cart;
