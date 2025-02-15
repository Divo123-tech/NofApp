const { promisify } = require("util");

// Convert SQLite functions into Promises for async/await support
const dbGet = promisify(global.db.get).bind(global.db);
const dbAll = promisify(global.db.all).bind(global.db);
const dbRun = promisify(global.db.run).bind(global.db);

const Donation = {
  // Get a single donation by ID
  async getDonationById(id) {
    try {
      return await dbGet("SELECT * FROM donations WHERE id = ?", [id]);
    } catch (err) {
      throw new Error(err.message); 
    }
  },

  // Get all donations for a specific user
  async getDonationsByUserId(userId) {
    try {
      return await dbAll("SELECT * FROM donations WHERE user_id = ?", [userId]);
    } catch (err) {
      throw new Error(err.message);
    }
  },

  // Create a new donation
  async createDonation(user_id, charity, amount) {
    try {
      const result = await dbRun(
        "INSERT INTO donations (user_id, charity, amount) VALUES (?, ?, ?)",
        [user_id, charity, amount]
      );
      
      // Return the newly created donation
      return {
        id: result.lastID,
        user_id,
        charity,
        amount,
        date: new Date().toISOString() // Since we have DEFAULT CURRENT_TIMESTAMP in schema
      };
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

module.exports = Donation;