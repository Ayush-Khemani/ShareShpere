const { createSubscription } = require( "../models/subscriptionModel.js");

const subscribeNotification = async (req, res) => {
  try {
    const userId = req.user.id;
    const { searchQuery, category } = req.body;

    if (!searchQuery && !category)
      return res.status(400).json({ message: "Search query or category required" });

    const subscription = await createSubscription(userId, searchQuery, category);
    res.status(201).json({ message: "Subscription created", subscription });
  } catch (err) {
    console.error("Error subscribing:", err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {subscribeNotification};