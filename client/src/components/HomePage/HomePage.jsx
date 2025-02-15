import React from 'react'
import {Link} from "react-router-dom"

const HomePage = () => {
  return (
      <div className="flex flex-col justify-center gap-8 items-center h-full relative">
        <div className='flex flex-col gap-4 font-semibold italic font-[Karla]'>
          <h1 className="text-7xl mr-20 text-[#2183d2]">Nof</h1>
          <h1 className="text-7xl ml-20 text-[#2183d2]">App</h1>
        </div>
        <div className='flex gap-12 font-[Kodchasan]'>
          <Link to="/register">
            <h1 className='text-xl font-light text-[#2183d2] border-b'>Register</h1>
          </Link>
          <Link to="/sign-in">
            <h1 className='text-xl font-light text-[#2183d2] border-b'>Sign In</h1>
          </Link>
        </div>
        <div className='absolute bottom-0 left-0 mb-4 ml-4 font-[Kodchasan]'>
          <h1 className='text-md text-[#2183d2]'>2025</h1>
          <h1 className='text-md text-[#2183d2]'>ECUM</h1>
          <h1 className='text-md text-[#2183d2]'>All rights reserved</h1>
        </div>
      </div>

  )
}

export default HomePage