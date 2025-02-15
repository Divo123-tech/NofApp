const DayLogs = require("../models/DayLogs.models");
const User = require("../models/User.models");

exports.createDayLog = async (req, res) => {
    const { user_id, streak_broken, mood, energyLevel, notes } = req.body;
  
    if (!mood || !energyLevel) 
        return res.status(400).json({ error: "Mood, and Energy level fields are required" });

    try {
    
      if(!streak_broken) {
        const user = await User.getUserById(user_id)
        const newStreak = user.current_streak + 1
        const newLongestStreak = user.longest_streak + 1
        const newCoins = user.coins + 1
        const newTotal = user.total_days_clean + 1
        User.updateUser(user_id, {"current_streak": newStreak, "coins": newCoins, "longest_streak": newLongestStreak, "total_days_clean": newTotal});
        // console.log(user)
      }
  
      const result = await DayLogs.createDaylog(user_id, streak_broken, mood, energyLevel, notes);
  
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
