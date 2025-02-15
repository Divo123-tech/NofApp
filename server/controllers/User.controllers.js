const User = require("../models/User.models");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  const { username, email, password_hash } = req.body;
  if (!username || !email || !password_hash)
    return res.status(400).json({ error: "Name and email required" });

  try {
    const newUser = await User.createUser(username, email, password_hash);
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const fields = req.body; // Get the fields from the request body

  if (Object.keys(fields).length === 0) {
    return res.status(400).json({ error: "No fields provided to update" });
  }

  try {
    await User.updateUser(id, fields);
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
