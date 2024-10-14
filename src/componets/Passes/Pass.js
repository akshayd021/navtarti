import React, { useState } from 'react';
import { logo, managment } from '../../assets';
import { IoLocationOutline } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Pass = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const goldPrice = 799;
    const PlatinumPrice = 1699;
    const { slug } = useParams();
    const navigate = useNavigate();

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const Platinum = slug?.includes('platinum');

    const handleQuantityChange = (change) => {
        setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
    };

    const subtotal = selectedDate ? (!Platinum ? goldPrice : PlatinumPrice) * quantity : 0;

    const handleBuyNow = async () => {
        if (!selectedDate) {
            alert('Please select a date.');
            return;
        }

        const passData = {
            type: Platinum ? "Platinum" : 'Gold',
            quantity,
            selectedDates: [selectedDate],
            price: subtotal,
        };

        let passes = JSON.parse(localStorage.getItem('passes')) || [];
        passes.push(passData);
        localStorage.setItem('passes', JSON.stringify(passes));

        console.log('All Passes:', passes);

        // Optionally, redirect to cart or show success message
        navigate('/cart');

        // try {
        //     const response = await axios.post('http://localhost:5000/api/passes', passData);
        //     console.log('Pass purchased successfully:', response?.data);
        // } catch (error) {
        //     console.error('Error:', error);
        //     alert('Failed to purchase pass. Please try again.');
        // }
    };

    return (
        <div className=''>
            <div
                style={{
                    background: 'linear-gradient(90deg, rgba(15, 38, 51, 1) 0%, rgba(49, 38, 19, 1) 50%, rgba(47, 12, 12, 1) 100%)',
                }}
            >
                <div className='flex flex-row justify-between items-center p-5'>
                    <img src={logo} alt='logo' className='h-[87px] ml-3' />
                    <div className='flex gap-2 items-center text-white -pt-3'>
                        <IoLocationOutline className='text-2xl' />
                        <p className='text-lg'>Surat</p>
                        <div className='ml-10'><IoIosArrowDown /></div>
                    </div>
                </div>
            </div>

            <div className='mt-5 text-left px-5 mb-10'>
                <h3 className='text-[#232323] font-bold uppercase text-[32px]'>Daily Gold Tickets - Suvarn Navratri, Surat</h3>
                <h4 className='text-[25px] text-[#232323] font-semibold mt-5'>Rs {Platinum ? PlatinumPrice : goldPrice}.00</h4>
                <h6 className='mt-8 text-[20px] font-semibold text-[#232323]'>Tickets Type: {Platinum ? "Platinum" : "Gold"}</h6>
                <div className="p-[2px] mt-4 bg-gradient-to-r from-[#D9007A] via-[#FF9D00] to-[#530179] inline-block">
                    <div className="bg-white">
                        <button className="text-black px-4 py-2 font-semibold uppercase">
                            {Platinum ? "Platinum" : "GOLD"}
                        </button>
                    </div>
                </div>
            </div>
            <hr className='mx-5' />

            <div className='mt-5 text-left px-5 mb-10'>
                <h6 className='mt-8 text-[20px] font-semibold text-[#232323]'>Ticket Date:</h6>
                <div className='flex gap-6 items-center'>
                    {['Day-7 11 Oct / Fri', 'Day-8 12 Oct / Sat', 'Day-9 13 Oct / Sun', 'Day-10 14 Oct / Mon'].map((date) => (
                        <div key={date} className="p-[2px] mt-4 bg-gradient-to-r from-[#D9007A] via-[#FF9D00] to-[#530179] inline-block">
                            <div className="bg-white">
                                <button
                                    className={`text-black px-16 py-3 font-semibold ${selectedDate === date ? 'bg-gray-300' : ''}`}
                                    onClick={() => handleDateSelect(date)}
                                >
                                    {date}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <hr className='mx-5' />
            <div className='mt-5 px-5 text-left'>
                <p className='text-[20px] font-[500] text-[#232323]'>Subtotal: Rs. {subtotal.toLocaleString()}</p>
                <p className='text-[20px] font-[400] mt-2 text-[#232323]'>Quantity:</p>
                <div className='flex items-center justify-center gap-6 my-4'>
                    <div className='w-[10%] border flex gap-4 p-3 justify-between items-center'>
                        <FaMinus className='text-black cursor-pointer' onClick={() => handleQuantityChange(-1)} />
                        <p className='text-black font-semibold'>{quantity}</p>
                        <FaPlus className='text-black cursor-pointer' onClick={() => handleQuantityChange(1)} />
                    </div>
                    <div className='w-[90%]'>
                        <button
                            className="bg-gradient-to-r from-purple-800 via-pink-600 to-yellow-500 text-lg w-full text-white font-semibold py-3 px-4 rounded-sm"
                            onClick={handleBuyNow}
                        >
                            BUY IT NOW
                        </button>
                    </div>
                </div>
            </div>

            <div className='w-full my-20'>
                <img src={managment} alt='management' />
            </div>
        </div>
    );
};

export default Pass;
