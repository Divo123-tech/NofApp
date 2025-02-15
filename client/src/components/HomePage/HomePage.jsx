import React from 'react'
import {Link} from "react-router-dom"

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center gap-8 items-center h-full">
      <div className='flex flex-col gap-4 font-semibold italic'>
        <h1 className="text-7xl mr-20  text-[#2183d2]">Nof</h1>
        <h1 className="text-7xl ml-20  text-[#2183d2]">App</h1>
      </div>
      <div className='flex gap-12'>
        <Link to="/register">
          <h1 className='text-xl font-light text-[#2183d2] border-b'>Register</h1>
        </Link>
        <Link to="/sign-in">
          <h1 className='text-xl font-light text-[#2183d2] border-b'>Sign In</h1>
        </Link>
      </div>
      <div className=''>
        <h1>2025</h1>
        <h1>ECUM</h1>
        <h1>All rights reserved</h1>
      </div>
    </div>
  )
}

export default HomePage