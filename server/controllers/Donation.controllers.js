const Donation = require("../models/Donations.models");

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
    res.status(201).json(newDonation);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
