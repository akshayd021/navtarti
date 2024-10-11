import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { IoLocationOutline } from 'react-icons/io5'
import { gold, logo } from '../../assets'
import { FaEdit } from "react-icons/fa";
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { IoCloseSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Cart = () => {
    return (
        <div>
            <div
                style={{
                    background: 'linear-gradient(90deg, rgba(15, 38, 51, 1) 0%, rgba(49, 38, 19, 1) 50%, rgba(47, 12, 12, 1) 100%)',
                }}
                className=""
            >
                <div className='flex flex-row justify-between items-center  p-5'>
                    <img src={logo} alt='ladn' className=' h-[87px] ml-3' />
                    <div className='flex gap-2 items-center text-white -pt-3'>
                        <IoLocationOutline className='text-2xl' />
                        <p className='text-lg'>Surat</p>
                        <div className='ml-10'> <IoIosArrowDown />
                        </div>
                    </div>
                </div>
            </div>
            <div className='px-5'>
                <div className="flex justify-between items-start gap-10">
                    {/* Left Side */}
                    <div className="w-3/4  rounded-lg ">
                        <div className="flex justify-between items-center bg-gray-300 p-3">
                            <div className="w-1/2 text-lg font-semibold">Product</div>
                            <div className="w-1/2 flex justify-between gap-10">
                                <p className="font-semibold">Price</p>
                                <p className="font-semibold">Quantity</p>
                                <p className="font-semibold mr-16">Total</p>
                            </div>
                        </div>
                        <div className=" py-5 ">
                            <div className="flex items-center border py-8 px-3">
                                <div className="flex  items-center gap-5 w-1/2">
                                    <img src={gold} alt="gold" className="h-20 w-20 object-cover rounded" />                                    <div>
                                        <p className="text-sm font-medium">Daily Gold Tickets - Suvarn Navratri, Surat</p>
                                        <div className="flex gap-4 items-center text-gray-600">
                                            <p>Gold / Day-8 12 Oct / Sat</p>
                                            <FaEdit className="text-blue-500 cursor-pointer" />
                                        </div>
                                        <p className="text-gray-500">Suvarn Navratri</p>
                                    </div>
                                </div>
                                <div className="w-1/2 flex justify-between items-center">
                                    <p className="text-lg font-semibold">Rs. 1,000.00</p>
                                    <div className="w-[25%] border  border-gray-300 flex gap-2 p-2 justify-between items-center rounded">
                                        <FaMinus className="text-black cursor-pointer" />
                                        <p className="text-black font-semibold">1</p>
                                        <FaPlus className="text-black cursor-pointer" />
                                    </div>
                                    <p className="text-lg font-semibold">Rs. 1,000.00</p>
                                    <IoCloseSharp className='text-xl' />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-1/4  mt-2 ">
                        <h2 className="text-[12px] uppercase font-bold mb-4 border-b-2 border-black pb-2">Order Summary</h2>
                        <div className='flex justify-between items-center text-[12px] border-b pb-1'>
                            <p className='font-[500]'>SubTotal </p>
                            <p className='font-bold'>Rs. 1,000.00</p>
                        </div>
                        <div className='flex justify-between items-center mt-2 text-[12px] border-y pt-2 pb-3'>
                            <p className='font-[500] uppercase'>Total: </p>
                            <p className='font-bold'>Rs. 1,000.00</p>
                        </div>
                        <Link to={'/checkout/123456778999'}>
                            <button className="mt-4 bg-[#232323] text-white font-semibold py-2 px-4 w-full rounded-sm hover:bg-gray-300 hover:text-black
                        ">
                                Checkout
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart