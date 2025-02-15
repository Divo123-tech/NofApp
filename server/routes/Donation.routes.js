const express = require("express");
const router = express.Router();
const {
  getDonation,
  createDonation,
  getUserDonations
} = require("../controllers/Donation.controllers");

// GET all users
router.get("", getDonation);

// GET a single donation by ID
router.get("/:id", getDonation);

// GET all donations for a specific user
router.get("/user/:userId", getUserDonations);

// POST (Create a new donation)
router.post("", createDonation);

// POST (Create a new donation)
router.post("/:id", createDonation);

module.exports = router;
