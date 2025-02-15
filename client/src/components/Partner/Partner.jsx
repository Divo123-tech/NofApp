import React from "react";
import Calendar from "../Calendar/Calendar"; // Import Calendar component

const Partner = () => {
  return (
    <div className="min-h-screen bg-[#d2f8bd] flex flex-col items-center justify-start px-6 py-8">

      <div className="w-full text-left ml-10 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#2183d2] mb-3">Username</h1>
        <button class="bg-[#2183d2] text-white font-bold py-2 px-4 rounded-full">Remove accountability partner</button> 
      </div>
      <div className="w-full text-left ml-10">
        <h1 className="text-md md:text-3xl text-[#2183d2] mb-3">My accountability partner's calendar</h1>
      </div>
      {/* Calendar Component (Ensure No Extra Spacing) */}
      <div className="w-full">
        <Calendar />
      </div>

      
    </div>
  );
};

export default Partner;
