import React from 'react'
import { flogo, footer } from '../../assets'
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa6";
import { MdCall, MdEmail } from "react-icons/md";
const Footer = () => {
    return (
        <div>
            <div
                className="bg-cover bg-center py-5 w-full"
                style={{ backgroundImage: `url(${footer})` }}
            >
                <div className='flex justify-center flex-col items-center'>
                    <img src={flogo} alt='footer-logo' className='pt-20 w-32' />
                    <p className='text-[#F5F5F5] text-[15px] my-4 text-center'>Join us for an unforgettable celebration filled <br /> with music, garba, and joy!</p>
                    <div className='flex justify-center items-center gap-8 mt-2'>
                        <FaInstagram className='text-[#F5F5F5] text-xl' />
                        <FaFacebook className='text-[#F5F5F5] text-xl' />
                        <FaYoutube className='text-[#F5F5F5] text-xl' />
                    </div>
                    <div className='flex items-center gap-4 mt-5 text-[#F5F5F5]'>
                        <MdCall className='text-[#F5F5F5] text-xl' />
                        <p className='text-[16px] '>9099952521</p>
                    </div>
                    <div className='flex items-center gap-4 mt-1 text-[#F5F5F5]'>
                        <MdEmail className='text-[#F5F5F5] text-xl' />
                        <p>suvarnnavratri@gmail.com</p>
                    </div>
                    <div className='flex items-center gap-4 mt-5 text-[#F5F5F5]'>
                        <p>Blog</p>
                        <p> Terms and Conditions</p>
                        <p>Privacy Policy</p>
                    </div>
                </div>
            </div>
            <div className='bg-[#0b0b0b] py-[28px]'>
                <h3 className='text-[16px] text-white font-[500] text-center'>
                    2024 Suvarn Navratri. All Rights Reserved. Made With ❤ by Actoscript | A Right Click
                </h3>
            </div>
        </div>
    )
}

export default Footer