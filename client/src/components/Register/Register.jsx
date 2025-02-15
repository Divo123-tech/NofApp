import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
const Register = () => {
  return (
    <div className='px-16 py-12'>
      <h1 className='text-3xl text-[#2183d2] font-bold mb-16'>Register</h1>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-4'>
            <h1 className='text-lg text-[#2183d2] font-semibold'>Username</h1>
            <input className='border-b border-[#2183d2] focus:outline-none w-full py-1'></input>
        </div>
        <div className='flex flex-col gap-4'>
            <h1 className='text-lg text-[#2183d2] font-semibold'>Email</h1>
            <input className='border-b border-[#2183d2] focus:outline-none w-full py-1'></input>
        </div>
        <div className='flex flex-col gap-4'>
            <h1 className='text-lg text-[#2183d2] font-semibold'>Make Password</h1>
            <input className='border-b border-[#2183d2] focus:outline-none w-full py-1'></input>
        </div>
        <div className='flex flex-col gap-4'>
            <h1 className='text-lg text-[#2183d2] font-semibold'>Repeat Password</h1>
            <input className='border-b border-[#2183d2] focus:outline-none w-full py-1'></input>
        </div>
        <div className='flex flex-col gap-4'>
            <h1 className='text-lg text-[#2183d2] font-semibold'>You are</h1>
            <select className='border-b border-[#2183d2] focus:outline-none w-full py-1 bg-transparent'>
                <option selected>Seeking help</option>
                <option>Helping</option>
                <option>Both</option>
            </select>
        </div>
      </div>
      <div className='mt-8 flex flex-col items-end'>
      <FaArrowRight size={22} color='#2183d2'/>
      </div>
    </div>
  )
}

export default Register