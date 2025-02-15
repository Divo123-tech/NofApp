import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Modal, Box } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
const Calendar = () => {
  const [monthIndex, setMonthIndex] = useState(1); // February (0-based index)
  const [selectedDate, setSelectedDate] = useState(null); // Track selected date
  const [isDayFilled, setIsDayFilled] = useState(false);
  const [currentDayInfo, setCurrentDayInfo] = useState(null);
  const [open, setOpen] = useState(false);
  const year = new Date().getFullYear();

  // Get today's date
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();
  // Months array
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/daylogs/1",
          {
            date: "2025-02-15", // Body content
          }
        );

        console.log("Response:", response.data);
        setCurrentDayInfo(response.data);
        setIsDayFilled(true);
      } catch (error) {
        setCurrentDayInfo(null);
        setIsDayFilled(false);
        console.error(
          "Error posting daylog:",
          error.response ? error.response.data : error.message
        );
      }
    })();
  }, []);
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
    setOpen(true);
    if (
      year > currentYear ||
      (year === currentYear && monthIndex > currentMonth) ||
      (year === currentYear && monthIndex === currentMonth && day > currentDay)
    ) {
      return;
    }

    // Format the selected date as "YYYY-MM-DD"
    const formattedDate = `${year}-${String(monthIndex + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;

    setSelectedDate(day);
    console.log(formattedDate); // Log the selected date
  };

  return (
    <div className="flex justify-center items-center w-full mb-4">
      <div className="flex flex-col items-center p-8 border-2 border-[#2183d2] rounded-2xl shadow-lg w-[400px]">
        {/* Month Header with Arrows */}
        <div className="flex items-center gap-3 mb-4">
          <FaChevronLeft
            className="cursor-pointer text-[#2183d2] hover:opacity-80"
            onClick={handlePrevMonth}
          />
          <h2 className="text-xl font-bold text-[#2183d2]">
            {months[monthIndex]} {year}
          </h2>
          <FaChevronRight
            className="cursor-pointer text-[#2183d2] hover:opacity-80"
            onClick={handleNextMonth}
          />
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 w-full">
          {/* Days of the week */}
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="text-center font-semibold text-[#2183d2] text-sm"
            >
              {day}
            </div>
          ))}

          {/* Days of the month */}
          {days.map((day, index) => {
            // Check if the date is in the future (across all months)
            const isFutureDay =
              year > currentYear ||
              (year === currentYear && monthIndex > currentMonth) ||
              (year === currentYear &&
                monthIndex === currentMonth &&
                day > currentDay);

            return (
              <div
                key={index}
                className={`text-center w-10 h-10 flex items-center justify-center rounded-full text-md
                  ${
                    day === selectedDate
                      ? "bg-[#2183d2] text-white font-bold"
                      : "text-[#2183d2]"
                  }
                  ${
                    isFutureDay
                      ? "text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-200 cursor-pointer"
                  }
                  ${currentDayInfo != null && day == 16 ? "bg-green-300" : ""}`}
                onClick={() => handleDateClick(day)}
              >
                {day}
              </div>
            );
          })}
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2183d2] text-[#d2f8bd] p-6 rounded-lg shadow-lg w-2/3">
              {isDayFilled ? (
                <>
                <h2 className="text-3xl mb-2 font-[Kodchasan]">2025-02-15</h2>
                  <p className="text-lg font-[Karla]">
                    Mood: {currentDayInfo.mood}
                  </p>
                  <p className="text-lg font-[Karla]">
                    Energy Level: {currentDayInfo.energy_level} / 5
                  </p>
                  <p className="text-lg font-[Karla]">
                    Streak broken? : {currentDayInfo.streak_broken == 0 ? "NO!" : "yes :("}
                  </p>
                  <p className="text-lg font-[Karla]">
                    Notes: {currentDayInfo.notes}
                  </p>
                  <div className="flex justify-end gap-4 mt-4">
                    <button
                      onClick={() => setOpen(false)}
                      className="bg-[#d2f8bd] text-[#2183d2] px-4 py-2 rounded-md cursor-pointer"
                    >
                      Close
                    </button>
                    
                  </div>{" "}
                </>
              ) : (
                <>
                  <h2 className="text-3xl mb-2 font-[Kodchasan]">New Day</h2>
                  <p className="text-lg font-[Karla]">
                    No updates tracked yet today!
                  </p>
                  <div className="flex justify-end gap-4 mt-4">
                    <button
                      onClick={() => setOpen(false)}
                      className="bg-[#d2f8bd] text-[#2183d2] px-4 py-2 rounded-md cursor-pointer"
                    >
                      Close
                    </button>
                    <Link
                      to={"/survey"}
                      onClick={() => setOpen(false)}
                      className="bg-[#d2f8bd] text-[#2183d2] px-4 py-2 rounded-md cursor-pointer"
                    >
                      Start Tracking
                    </Link>
                  </div>{" "}
                </>
              )}
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
