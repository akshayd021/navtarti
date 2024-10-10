import React from 'react';
import { calender, logo, mainBg } from '../../assets';
import { IoLocationOutline } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
const MainHeader = () => {
    return (
        <div>
            <div
                className="bg-cover bg-center h-[554px] w-full"
                style={{ backgroundImage: `url(${mainBg})` }}
            >
                <div className='flex flex-row justify-between items-center px-5 pt-5'>
                    <img src={logo} alt='ladn' className='mb-5 h-[87px] ml-3' />
                    <div className='flex gap-2 items-center text-white -pt-3'>
                        <IoLocationOutline className='text-2xl' />
                        <p className='text-lg'>Surat</p>
                        <div className='ml-10'> <IoIosArrowDown />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-start items-start h-full p-6'>
                    <div className='max-w-lg text-left mt-20 ml-14'>
                        <h2 className='text-white text-[39px] font-Lexend capitalize font-bold'>
                            Ultimate Navratri Experience
                        </h2>
                        <p className='mt-5 text-2xl text-center font-semibold font-Lexend  text-white'>
                            10 Nights of Glory, Grace, and Gold—Get ready to Ignite the spirit of divine goddess!
                        </p>
                    </div>
                </div>
            </div>.
            <div className='flex justify-between gap-10 mt-10 px-5'>
                <div className='flex flex-col w-1/2'>

                    <h1 className='text-[25px] text-left font-bold mb-1 text-[#232323]'>
                        SUVARN NAVRATRI, SURAT - <span className='text-[#5D0179]'>2024</span>   </h1>
                    <p className='text-[14px] text-[#b3b3b3] text-left'>
                        Biggest Navratri Festival of the year. <br />
                        Electrifying Performances | Garba | Premium Decor
                    </p>
                    <h1 className='text-[25px] mt-10 mb-5 text-left font-bold text-[#232323]'>
                        Highlights </h1>

                    <ul className='list-disc text-left ml-10 text-[#929292] '>
                        <li>With 10 years of experience in organizing the biggest Navratri event in India.</li>
                        <li>Enjoy performances by the best folk singers from India, bringing authentic music and energy.</li>
                        <li> Experience the fully air-conditioned Navratri festival in Surat, ensuring comfort throughout the celebrations. </li>
                        <li>Garba to the beats powered by the world's best band and renowned sound artists.</li>
                        <li>Benefit from extensive secure parking areas, ensuring a hassle-free experience.</li>
                    </ul>
                    <p className='text-[#b3b3b3] text-left font-Lexend mt-1'>Join us for an unforgettable celebration filled with music, garba, and joy!</p>
                    <h3 className='text-[#004a77] mt-1 underline inline-flex text-[18px] font-Lexend'>Find us on the map to Our Location</h3>
                </div>
                <div className='border p-7 rounded-lg w-[470px] h-[178px]'>
                    <div className='flex gap-4 items-center text-black font-semibold pb-2 border-gray-600 border-b'>
                        <img src={calender} alt='calender' className='w-6' />
                        <p className='text-[15px]'>05 to 14 October, 2024 </p>
                        <h6>Our Location</h6>
                    </div>
                    <div className='flex justify-between items-center'>
                        <div className='flex flex-col mt-5'>
                            <p className='text-black text-[14px]'>Price from:</p>
                            <h3 className='text-[26px] text-black font-semibold'>₹899</h3>
                        </div>
                        <div className='flex px-5 text-white items-center gap-3 rounded-lg py-1.5 bg-gradient-to-r from-[#D0007A] to-[#5D0179]'>
                            <FaCartShopping />
                            <span>Select ticket</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default MainHeader;
