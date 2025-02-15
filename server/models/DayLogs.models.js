const { promisify } = require("util");

// Convert SQLite functions into Promises for async/await support
const dbGet = promisify(global.db.get).bind(global.db);
const dbAll = promisify(global.db.all).bind(global.db);
const dbRun = promisify(global.db.run).bind(global.db);

const DayLog = {
    async createDaylog(userId, streak_broken, mood, energyLevel, notes) {
        const query = `
            INSERT INTO day_logs (user_id, streak_broken, mood, energy_level, notes)
            VALUES (?, ?, ?, ?, ?)
        `;
        try {
            await dbRun(query, [userId, streak_broken, mood, energyLevel, notes]);
            return { success: true };
        } catch (err) {
            console.error("Error creating day log:", err);
            throw new Error("Failed to create day log");
        }
    };
};

module.exports = DayLog;
