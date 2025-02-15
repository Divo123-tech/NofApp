import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
import {Link} from "react-router-dom"
const SignIn = () => {
  return (
    <div className='px-16 py-12'>
      <h1 className='text-3xl text-[#2183d2] font-bold mb-16 font-[Kodchasan]'>Sign in</h1>
      <div className='flex flex-col gap-8 font-[Kodchasan]'>
        <div className='flex flex-col gap-4'>
            <h1 className='text-lg text-[#2183d2] font-semibold'>Email</h1>
            <input className='border-b border-[#2183d2] focus:outline-none w-full py-1'></input>
        </div>
        <div className='flex flex-col gap-4'>
            <h1 className='text-lg text-[#2183d2] font-semibold'>Password</h1>
            <input className='border-b border-[#2183d2] focus:outline-none w-full py-1'></input>
        </div>
      </div>
      <Link to="/tracker" className='mt-8 flex flex-col items-end'>
      <FaArrowRight size={22} color='#2183d2'/>
      </Link>
    </div>
  )
}

export default SignIn
