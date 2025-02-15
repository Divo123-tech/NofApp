import React from "react";
import Calendar from "../Calendar/Calendar"; // Import Calendar component

const Partner = () => {
  return (
    <div className="min-h-screen bg-[#d2f8bd] flex flex-col items-center justify-start px-6 py-8">

      <h1 className="text-lg md:text-3xl text-[#2183d2]">Partner</h1>
      {/* Calendar Component (Ensure No Extra Spacing) */}
      <div className="w-full">
        <Calendar />
      </div>

      
    </div>
  );
};

export default Partner;
