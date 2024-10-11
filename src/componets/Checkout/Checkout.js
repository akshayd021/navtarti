import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { IoLocationOutline } from 'react-icons/io5'
import { logo } from '../../assets'

const Checkout = () => {
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
            <div className='flex justify-between items-center px-10'>
                <div className='w-1/2'>
                <div className='mt-5 flex justify-between items-center'>
                    <p>Contact</p>
                    <p>Login</p>
                    
                </div>
                </div>
                <div className='w-1/2 bg-gray-200 h-screen border-l border-l-red-300'>

                </div>
            </div>
        </div>
    )
}

export default Checkout