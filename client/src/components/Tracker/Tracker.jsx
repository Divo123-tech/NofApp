import React from "react";
import hand from "../../assets/hand.png"; // Import Hand Image
import Calendar from "../Calendar/Calendar"; // Import Calendar component

const Tracker = () => {
  return (
    <div className="min-h-screen bg-[#d2f8bd] flex flex-col items-center justify-start px-6 py-8 md:px-16 md:py-12">
      <h1 className="text-2xl md:text-3xl text-[#2183d2] font-bold mb-6">Tracker</h1>

      {/* Calendar Component */}
      <Calendar />

      {/* "You have" Text Above */}
      <h1 className="text-lg md:text-xl text-[#2183d2] font-semibold text-center mt-6 mb-4">You have</h1>

      {/* Two Boxes (Responsive: Stack on Small Screens) */}
      <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-4 md:space-y-0 w-full max-w-md md:max-w-2xl">
        {/* Left Box (Text and Hand Image) */}
        <div className="w-full md:w-80 h-40 p-6 border-2 border-[#2183d2] rounded-lg shadow-md flex flex-col justify-center">
          {/* 20 and Image Side by Side */}
          <div className="flex items-center justify-between">
            <h1 className="text-5xl md:text-7xl text-[#2183d2] font-bold">20</h1>
            <img src={hand} alt="Hand" className="w-14 h-14 md:w-16 md:h-16 object-contain" />
          </div>
        </div>

        {/* Right Box (Content Box) */}
        <div className="w-full md:w-80 h-40 p-6 border-2 border-[#2183d2] rounded-lg shadow-md">
          {/* Content */}
        </div>
      </div>
    </div>
  );
};

export default Tracker;
