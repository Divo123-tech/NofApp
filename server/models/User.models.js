const { promisify } = require("util");

// Convert SQLite functions into Promises for async/await support
const dbGet = promisify(global.db.get).bind(global.db);
const dbAll = promisify(global.db.all).bind(global.db);
const dbRun = promisify(global.db.run).bind(global.db);

const User = {
  // Get all users
  async getAllUsers() {
    try {
      return await dbAll("SELECT * FROM users");
    } catch (err) {
      throw new Error(err.message);
    }
  },

  // Get a single user by ID
  async getUserById(id) {
    try {
      return await dbGet("SELECT * FROM users WHERE id = ?", [id]);
    } catch (err) {
      throw new Error(err.message);
    }
  },

  // Create a new user
  async createUser(username, email, password_hash) {
    try {
      const result = await dbRun(
        "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
        [username, email, password_hash]
      );
      return { username, email, password_hash }; // SQLite does not return inserted row automatically
    } catch (err) {
      throw new Error(err.message);
    }
  },

  // Update a user by ID
  async updateUser(id, fields) {
    // Initialize an empty array to hold the SET clause
    const setClauses = [];
    const params = [];
    console.log(fields);
    // Loop through each field in the request body
    for (const key in fields) {
      // if (fields.hasOwnProperty(key)) {
      setClauses.push(`${key} = ?`);
      params.push(fields[key]);
      // }
    }
    // print(setClauses);
    console.log(setClauses);
    // Add the user id to the parameters for the WHERE clause
    params.push(Number(id));
    console.log(params);

    // Build the SQL query string with dynamic SET clauses
    const query = `UPDATE users SET ${setClauses.join(", ")} WHERE id = ?`;
    console.log(query);
    try {
      // Execute the query
      const result = await dbRun(query, params);
      return result; // Return whether the update was successful
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },
  // Delete a user by ID
  async deleteUser(id) {
    try {
      const result = await dbRun("DELETE FROM users WHERE id = ?", [id]);
      return result.changes > 0; // Return true if a row was deleted
    } catch (err) {
      throw new Error(err.message);
    }
  },
};

module.exports = User;
