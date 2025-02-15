import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { useNavigate } from "react-router-dom";
const Survey = () => {
  const [selectedYesNo, setSelectedYesNo] = useState(null); // Track Yes/No selection
  const [selected, setSelected] = useState(null); // Track urges selection
  const [text, setText] = useState(""); // Track user input
  const navigate = useNavigate()
  const options = ["1", "2", "3", "4", "5"]; // Numbered options for urges

  // Function to count words (max 100 words)
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const isLimitReached = wordCount > 100;



  const uploadDaylog = async() => {
    try {
      const requestBody = {
        user_id: 1,  // Replace with actual user_id
        streak_broken: false, // Example value, change as needed
        mood: "good", // Example value
        energyLevel: 4, // Example value
        notes: "Had a productive day!", // Example value
      };
  
      const response = await axios.post(
        "http://localhost:3000/api/daylogs",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Daylog uploaded:", response.data);
      navigate("/tracker")
    } catch (error) {
      console.error("Error uploading daylog:", error.response?.data || error.message);
    }
  }

  return (
    <div className="bg-[#d2f8bd] px-16 py-8">
      <h1 className="text-3xl text-[#2183d2] font-bold mb-6">Track</h1>

      <div className="flex flex-col gap-8">
        {/* Streak Question */}
        <div className="flex flex-col gap-4">
          <h1 className="text-lg text-[#2183d2] font-semibold mb-2">Did you break your streak?</h1>

          {/* Yes & No Buttons (Clickable) */}
          <div className="flex justify-center gap-4">
            <button
              className={`w-48 border-2 border-[#2183d2] font-semibold py-2 px-6 rounded-full transition duration-200
                ${selectedYesNo === "Yes" ? "bg-[#2183d2] text-white" : "bg-transparent text-[#2183d2]"}`}
              onClick={() => setSelectedYesNo("Yes")}
            >
              Yes
            </button>
            <button
              className={`w-48 border-2 border-[#2183d2] font-semibold py-2 px-6 rounded-full transition duration-200
                ${selectedYesNo === "No" ? "bg-[#2183d2] text-white" : "bg-transparent text-[#2183d2]"}`}
              onClick={() => setSelectedYesNo("No")}
            >
              No
            </button>
          </div>
        </div>

        {/* Mood Dropdown */}
        <div className="flex flex-col gap-4">
          <h1 className="text-lg text-[#2183d2] font-semibold mb-2">How was your mood today?</h1>
          <select className="border-b border-[#2183d2] focus:outline-none w-full py-1 bg-transparent text-[#2183d2]">
            <option selected>Great</option>
            <option>Good</option>
            <option>Neutral</option>
            <option>Bad</option>
            <option>Terrible</option>
          </select>
        </div>

        {/* Horizontal Circle Options */}
        <div className="flex flex-col gap-4">
          <h1 className="text-lg text-[#2183d2] font-semibold mb-2">How was your energy level today?</h1>
          <div className="flex justify-center items-center gap-4">
            {options.map((option, index) => (
              <div
                key={index}
                className={`w-12 h-12 flex items-center justify-center rounded-full border-2 
                  ${selected === option ? "bg-[#2183d2] text-white font-bold" : "border-[#2183d2] text-[#2183d2]"}
                  cursor-pointer transition duration-200`}
                onClick={() => setSelected(option)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>

        {/* User Input Textbox (100 Words) */}
        <div className="flex flex-col gap-4">
          <h1 className="text-lg text-[#2183d2] font-semibold mb-2">Notes about your day</h1>
          <textarea
            className={`w-full max-w-md h-32 border-2 border-[#2183d2] rounded-2xl px-4 py-2 bg-transparent 
              text-[#2183d2] text-lg placeholder-[#2183d2] focus:outline-none focus:ring-2 focus:ring-[#2183d2] resize-none transition-all
              ${isLimitReached ? "border-red-500" : ""}`}
            placeholder="Write here... (max 100 words)"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <p className={`text-sm ${isLimitReached ? "text-red-500" : "text-[#2183d2]"}`}>
            {wordCount} / 100 words
          </p>
        </div>
      </div>

      {/* Save Button (Centered) */}
      <div className="w-full flex justify-center mt-6 cursor-pointer">
        <button className="w-36 bg-[#2183d2] text-white font-semibold py-2 px-6 rounded-full cursor-pointer" onClick={uploadDaylog}>
          Save
        </button>
      </div >
    </div>
  );
};

export default Survey;
