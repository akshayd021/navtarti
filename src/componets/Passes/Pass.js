import React from 'react'
import { logo, managment } from '../../assets'
import { IoLocationOutline } from 'react-icons/io5'
import { IoIosArrowDown } from 'react-icons/io'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const Pass = () => {
    return (
        <div className=''>
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

            <div className='mt-5 text-left px-5 mb-10'>
                <h3 className='text-[#232323] font-bold uppercase text-[32px]'>Daily Gold Tickets - Suvarn Navratri, Surat</h3>
                <h4 className='text-[25px] text-[#232323] font-semibold mt-5'>Rs. 1,000.00</h4>
                <h6 className='mt-8 text-[20px] font-semibold text-[#232323]'>Tickets Type: Gold</h6>
                <div className="p-[2px] mt-4 bg-gradient-to-r from-[#D9007A] via-[#FF9D00] to-[#530179] inline-block ">
                    <div className="bg-white">
                        <button className=" text-black px-4 py-2 font-semibold ">
                            GOLD
                        </button>
                    </div>
                </div>
            </div>
            <hr className='mx-5' />

            <div className='mt-5 text-left px-5 mb-10'>
                <h6 className='mt-8 text-[20px] font-semibold text-[#232323]'>      Ticket Date: Day-7 11 Oct / Fri</h6>
                <div className='flex gap-6 items-center'>
                    <div className="p-[2px] mt-4 bg-gradient-to-r from-[#D9007A] via-[#FF9D00] to-[#530179] inline-block ">
                        <div className="bg-white">
                            <button className=" text-black px-16 py-3 font-semibold ">
                                Day-7 11 Oct / Fri
                            </button>
                        </div>
                    </div>
                    <div className="p-[2px] mt-4 bg-gradient-to-r from-[#D9007A] via-[#FF9D00] to-[#530179] inline-block ">
                        <div className="bg-white">
                            <button className=" text-black px-16 py-3 font-semibold ">
                                Day-8 12 Oct / Sat
                            </button>
                        </div>
                    </div>
                    <div className="p-[2px] mt-4 bg-gradient-to-r from-[#D9007A] via-[#FF9D00] to-[#530179] inline-block ">
                        <div className="bg-white">
                            <button className=" text-black px-16 py-3 font-semibold ">
                                Day-9 13 Oct / Sun
                            </button>
                        </div>
                    </div>
                    <div className="p-[2px] mt-4 bg-gradient-to-r from-[#D9007A] via-[#FF9D00] to-[#530179] inline-block ">
                        <div className="bg-white">
                            <button className=" text-black px-16 py-3 font-semibold ">
                                Day-10 14 Oct / Mon
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <hr className='mx-5' />
            <div className='mt-5 px-5 text-left'>
                <p className='text-[20px] font-[500] text-[#232323]'>Subtotal: Rs. 1,000.00</p>
                <p className='text-[20px] font-[400] mt-2 text-[#232323]'>Quantity:</p>
                <div className='flex items-center justify-center gap-6 my-4'>
                    <div className='w-[10%] border flex gap-4 p-3 justify-between items-center'>
                        <FaMinus className='text-black' />
                        <p className='text-black font-semibold'>1</p>
                        <FaPlus className='text-black' />
                    </div>
                    <div className='w-[90%]'>
                        <Link to={'/cart'}>
                        <button className="bg-gradient-to-r from-purple-800 via-pink-600 to-yellow-500 text-lg w-full  text-white font-semibold py-3 px-4 rounded-sm">
                            BUY IT NOW
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='w-full my-20'>
                <img src={managment} alt='managment' />
            </div>

        </div>
    )
}

export default Pass