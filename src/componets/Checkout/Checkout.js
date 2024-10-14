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
                <div className='flex flex-row justify-between items  p-5'>
                    <img src={logo} alt='ladn' className=' h-[87px] ml-3' />
                    <div className='flex gap-2 items-center text-white -pt-3'>
                        <IoLocationOutline className='text-2xl' />
                        <p className='text-lg'>Surat</p>
                        <div className='ml-10'> <IoIosArrowDown />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-between  px-10'>
                <div className='w-1/2 pr-5'>
                    <div className='mt-5 flex justify-between '>
                        <p className='text-black text-xl font-[600]'>Contact</p>
                        <p className='underline text-blue-500 cursor-pointer'>Login</p>
                    </div>
                    <div className='flex items-center gap-3 mt-2'>
                        <input type='email' placeholder='Enter Email Name' className='mt-4 border px-5 py-2 w-full rounded-md' />
                        <input type='number' placeholder='Enter Mobile Number' className='mt-4 border px-5 py-2 w-full rounded-md' />
                    </div>
                    <div className='flex items-center gap-3 mt-4'>
                        <input type='checkbox' className='' />
                        <p className='text-gray-600'>Email me with news and offers</p>
                    </div>
                    <p className='text-black text-xl mt-4 font-[600]'>Delivery</p>
                    <select className='mt-4 border px-2 py-2 w-full rounded-md' >
                        <option>india</option>
                    </select>
                    <div className='flex items-center gap-3 mt-2'>
                        <input type='text' placeholder='Enter First Name' className='mt-4 border px-5 py-2 w-full rounded-md' />
                        <input type='text' placeholder='Enter Last Name' className='mt-4 border px-5 py-2 w-full rounded-md' />
                    </div>
                    <option className='text-sm mt-3'>Address</option>
                    <input type='text' placeholder='Enter Address' className='mt-1 border px-5 py-2 w-full rounded-md' />
                    <div className='flex items-center gap-3 mt-4'>
                        <input type='checkbox' className='' />
                        <p className='text-gray-600'>
                            Save this information for next time</p>
                    </div>
                    <div className='flex items-center gap-3 mt-4'>
                        <input type='checkbox' className='' />
                        <p className='text-gray-600'>
                            Text me with news and offers</p>
                    </div>
                    <button type='submit' className='w-full py-2 text-center text-white bg-blue-700 rounded-md my-4'>Pay Now</button>
                </div>

                <div className='w-1/2 bg-gray-200 h-screen border-l border-l-red-300'>

                </div>
            </div>
        </div>
    )
}

export default Checkout