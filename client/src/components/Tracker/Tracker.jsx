import React from "react";
import hand from "../../assets/hand_blue.png";
import fire from "../../assets/fire.png";
import Calendar from "../Calendar/Calendar"; // Import Calendar component

const Tracker = () => {
  return (
    <div className="min-h-screen bg-[#d2f8bd] flex flex-col items-center justify-start px-6 py-8">
      <h1 className="text-2xl md:text-3xl text-[#2183d2] font-bold mb-4">Tracker</h1>

      {/* Calendar Component (Ensure No Extra Spacing) */}
      <div className="w-full">
        <Calendar />
      </div>

      {/* Two Boxes Always Side by Side - Works on Smallest Screens */}
      <div className="flex flex-row flex-wrap justify-center gap-4 w-full max-w-3xl mt-4">
        
        {/* Left Box (Coins) */}
        <div className="w-48 md:w-80 h-48 md:h-64 p-4 md:p-6 border-2 border-[#2183d2] rounded-2xl shadow-md flex flex-col justify-between">
          <h1 className="text-lg md:text-xl text-[#2183d2] font-semibold text-center">You have</h1>

          {/* Number & Image + Coins Side by Side */}
          <div className="flex flex-row items-center justify-center gap-3">
            {/* Number */}
            <div className="w-auto text-4xl md:text-7xl text-[#2183d2] font-bold mb-10">20</div>

            {/* Image and Coins */}
            <div className="flex flex-col items-center gap-2 mb-6">
              <img src={hand} alt="Hand" className="w-12 h-12 md:w-24 md:h-24 object-contain" />
              <h1 className="text-sm md:text-4xl text-[#2183d2] font-bold">Coins</h1>
            </div>
          </div>
        </div>

        {/* Right Box (Streak) */}
        <div className="w-48 md:w-80 h-48 md:h-64 p-4 md:p-6 border-2 border-[#2183d2] rounded-2xl shadow-md flex flex-col justify-between">
          <h1 className="text-lg md:text-xl text-[#2183d2] font-semibold text-center">Your Streak</h1>

          {/* Number & Image + Days Side by Side */}
          <div className="flex flex-row items-center justify-center gap-3">
            {/* Number */}
            <div className="w-auto text-4xl md:text-7xl text-[#2183d2] font-bold mb-10 ml-4">7</div>

            {/* Image and Days */}
            <div className="flex flex-col items-center gap-2 mb-6">
              <img src={fire} alt="Fire" className="w-12 h-12 md:w-24 md:h-24 object-contain ml-4" />
              <h1 className="text-sm md:text-4xl text-[#2183d2] font-bold">Days</h1>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Tracker;
