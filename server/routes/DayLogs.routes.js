const express = require("express");
const router = express.Router();
const {
    createDayLog,
    getDayLog
} = require("../controllers/DayLogs.controllers");

// Route to create a new day log
router.post("/:id/:date", createDayLog);

// Route to get a day log by user ID and date
router.get("/:id/:date", getDayLog);

module.exports = router;
