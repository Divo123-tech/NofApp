const DayLogs = require("../models/DayLogs.models");

exports.createDayLog = async (req, res) => {
    const { streak_broken, mood, energyLevel, notes } = req.body;
  
    if (!streak_broken || !mood || !energyLevel || !notes) 
        return res.status(400).json({ error: "All fields are required" });

    try {
    
    //   if(!streak_broken) {
    //     User.updateUser(req.params.id, current_streak);
    //     console.log(user)
    //   }
  
      const result = await DayLogs.createDaylog(req.params.id, streak_broken, mood, energyLevel, notes);
  
      res.status(201).json({ message: "Day log created successfully", result });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

exports.getDayLog = async (req, res) => {
    const { date } = req.body;
    if (!date) {
      return res.status(400).json({ error: "Date parameter is required" });
    }
  
    try {
      const daylog = await DayLogs.getDaylog(req.params.id, date);
      if (!daylog) {
        return res.status(404).json({ error: "Day log not found" });
      }
      res.status(200).json(daylog);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  };
