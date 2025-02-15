import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Calendar = () => {
  const [monthIndex, setMonthIndex] = useState(1); // February (0-based index)
  const [selectedDate, setSelectedDate] = useState(null); // Track selected date
  const year = new Date().getFullYear();

  // Get today's date
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  // Months array
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  
  // Get first day of the month
  const firstDay = new Date(year, monthIndex, 1).getDay();
  
  // Get total days in the month (February adjusts for leap years)
  const totalDays = new Date(year, monthIndex + 1, 0).getDate();
  
  // Days of the week
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Create an array for days, including empty slots before first day
  const days = Array.from({ length: firstDay }, () => "").concat(
    Array.from({ length: totalDays }, (_, i) => i + 1)
  );

  // Navigate between months (cycles within year)
  const handlePrevMonth = () => {
    setMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
    setSelectedDate(null); // Reset selected date when changing months
  };

  const handleNextMonth = () => {
    setMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
    setSelectedDate(null); // Reset selected date when changing months
  };

  // Handle date selection
  const handleDateClick = (day) => {
    if (!day) return; // Ignore empty slots

    // Block future dates
    if (year > currentYear || (year === currentYear && monthIndex > currentMonth) || 
        (year === currentYear && monthIndex === currentMonth && day > currentDay)) {
      return;
    }

    // Format the selected date as "YYYY-MM-DD"
    const formattedDate = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    setSelectedDate(day);
    console.log(formattedDate); // Log the selected date
  };

  return (
    <div className="flex justify-center items-center w-full mb-6">
      <div className="flex flex-col items-center p-10 border-2 border-[#2183d2] rounded-2xl shadow-lg w-[400px]">
        {/* Month Header with Arrows */}
        <div className="flex items-center gap-4 mb-6">
          <FaChevronLeft className="cursor-pointer text-[#2183d2] hover:opacity-80" onClick={handlePrevMonth} />
          <h2 className="text-3xl font-bold text-[#2183d2]">{months[monthIndex]} {year}</h2>
          <FaChevronRight className="cursor-pointer text-[#2183d2] hover:opacity-80" onClick={handleNextMonth} />
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-4 w-full">
          {/* Days of the week */}
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center font-semibold text-[#2183d2] text-lg">
              {day}
            </div>
          ))}

          {/* Days of the month */}
          {days.map((day, index) => {
            // Check if the date is in the future (across all months)
            const isFutureDay = 
              year > currentYear || 
              (year === currentYear && monthIndex > currentMonth) || 
              (year === currentYear && monthIndex === currentMonth && day > currentDay);

            return (
              <div
                key={index}
                className={`text-center w-14 h-14 flex items-center justify-center rounded-full text-xl
                  ${day === selectedDate ? "bg-[#2183d2] text-white font-bold" : "text-[#2183d2]"}
                  ${isFutureDay ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200 cursor-pointer"}`}
                onClick={() => handleDateClick(day)}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
