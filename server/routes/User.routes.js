const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUser
} = require("../controllers/User.controllers");

// GET all users
router.get("", getUsers);

// GET a single user by ID
router.get("/:id", getUser);

// POST (Create a new user)
router.post("", createUser);

// PUT (Update user details)
router.put("/:id", updateUser);

// // DELETE (Remove a user)
// router.delete("/:id", userController.deleteUser);

module.exports = router;
