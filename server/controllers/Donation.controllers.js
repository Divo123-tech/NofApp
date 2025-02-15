const Donation = require("../models/Donations.models");
const User = require("../models/User.models")
exports.getDonation = async (req, res) => {
  try {
    const donation = await Donation.getDonationById(req.params.id);
    if (!donation) return res.status(404).json({ error: "Donation not found" });
    res.json(donation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserDonations = async (req, res) => {
  try {
    const donations = await Donation.getDonationsByUserId(req.params.userId);
    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createDonation = async (req, res) => {
  const { user_id, charity, amount } = req.body;
  if (!user_id || !charity || !amount)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const newDonation = await Donation.createDonation(user_id, charity, amount);
    const user = await User.getUserById(user_id)
    const newTotal = user.total_donated + amount
    User.updateUser(user_id, {"total_donated": newTotal});
    
    res.status(201).json(newDonation);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

