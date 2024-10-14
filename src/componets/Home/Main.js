import React from 'react';
import { calender, eventBaner, gift, logo, mainBg, managment, off1, off2, off3, pass1, pass2, pass3 } from '../../assets';
import { IoLocationOutline } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import Slider from './Slider';
import Highlights from './Highlights';
import { Link } from 'react-router-dom';

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
            </div>
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
                        <p className='text  -[15px]'>05 to 14 October, 2024 </p>
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


            <div className='mt-10'>
                <Slider />
            </div>
            <div className='my-10 cursor-pointer'>
                <img src={eventBaner} alt='event-managmet' className='w-full ' />
            </div>
            <div className='bg-[#f5f5f5] border-y py-10'>
                <h3 className='font-Great text-[#232323] text-[30px] text-center'>Enjoy Suvarn Offers This Navratri Season!</h3>
                <h2 className='font-Lexend text-[22px] text-[#232323] mt-1 font-[600] text-center'>Navratri Offers for You!</h2>
                <div className='flex justify-center items-center gap-10 mt-10 mx-auto'>
                    <div className='flex flex-col items-center'>
                        <img src={off1} alt='8% off' className='w-[295px]' />
                        <p className='text-[#3a0946] mt-1 text-[20px] font-bold'>Use code SNOFF8%</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <img src={off2} alt='8% off' className='w-[295px]' />
                        <p className='text-[#3a0946] mt-1 text-[20px] font-bold'>Use code SNOFF10%</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <img src={off3} alt='8% off' className='w-[295px]' />
                        <p className='text-[#3a0946] mt-1 text-[20px] font-bold'>Use code SNOFF12%</p>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center mt-10 gap-10 mx-auto'>
                <Link to={`/products/daily-gold-tickets-suvarn-navratri-surat`}>
                    <div className='bg-center bg-cover h-[170px] w-[378px] text-left px-6 py-4' style={{ backgroundImage: `url(${pass1})` }}>
                        <h4 className='text-[#8400b0] mt-1 text-[23px] font-bold capitalize'>Gold pass</h4>
                        <p className='text-[12px] text-[#343434] mt-1'>Premium Gateway to exclusive Navratri nights!</p>
                        <h4 className='text-[#191203] text-[26px] mt-1 font-bold'>Rs.899</h4>
                        <button className='bg-[#ccc] mt-1 px-[12px] py-1 text-[18px] rounded-lg text-[#232323]'>Book Now</button>
                    </div>
                </Link>
                <Link to={`/products/daily-platinum-tickets-suvarn-navratri-surat`}>
                    <div className='bg-center bg-cover h-[170px] w-[378px] text-left px-6 py-4' style={{ backgroundImage: `url(${pass2})` }}>
                        <h4 className='text-[#8400b0] mt-1 text-[23px] font-bold capitalize'>Platinum pass</h4>
                        <p className='text-[12px] text-[#343434] mt-1'>Enjoy closer proximity to the performances.</p>
                        <h4 className='text-[#191203] text-[26px] mt-1 font-bold'>Rs.1699</h4>
                        <button className='bg-[#ccc] mt-1 px-[12px] py-1 text-[18px] rounded-lg text-[#232323]'>Book Now</button>
                    </div>
                </Link>
            </div>
            <Link to={`/products/ultimate-3-day-combo-tickets-suvarn-navratri-surat`}>
                <div className='bg-center bg-cover h-[170px] w-[378px] text-left px-6 py-4 mx-auto my-10' style={{ backgroundImage: `url(${pass3})` }}>
                    <h4 className='text-[#8400b0] mt-1 text-[23px] font-bold capitalize'>3 Days Combo</h4>
                    <p className='text-[12px] text-[#343434] mt-1'> Get ready for non-stop Garba magical nights!</p>
                    <h4 className='text-[#191203] text-[26px] mt-1 font-bold'>Rs.2499</h4>
                    <button className='bg-[#ccc] mt-1 px-[12px] py-1 text-[18px] rounded-lg text-[#232323]'>Book Now</button>
                </div>
            </Link>
            <div className='w-full my-10'>
                <img src={managment} alt='managment' />
            </div>
            <div className='mt-10'>
                <Highlights />
            </div>
            <div className='my-10 px-10'>
                <h2 className='text-[32px] font-Great  text-black text-center'>Event Gifts</h2>
                <h1 className='text-black text-[32px] font-[600] text-center'>Our Complimentary Gifts For You</h1>
                <div className='flex justify-center items-center gap-10 mt-6'>
                    <div className='w-1/2'>
                        <img src={gift} alt='gift' />
                    </div>
                    <div className='w-1/2 text-left'>
                        <h3 className="text-[35px] font-bold bg-gradient-to-r from-[#D0007A] to-[#5D0179] bg-clip-text text-transparent">
                            સુવર્ન નવરાત્રી !!!...
                        </h3>
                        <p className='text-[18px] text-black font-[600] mt-2'>Fun Festival Raatri Delight with Navratri exclusive gifts! Participate and add joy with the following range of gifts:</p>
                        <ul className='list-disc ml-8 mt-3 text-black text-[18px] font-[500]'>
                            <li>Event Gifts</li>
                            <li>Leather Bag</li>
                            <li>Mug</li>
                            <li>Gift Hamper</li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainHeader;
