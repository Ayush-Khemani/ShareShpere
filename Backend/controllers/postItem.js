const pool = require('../db/db');
const { getMatchingSubscriptions, createNotification } = require('../models/subscriptionModel');

async function postItem(req, res) {
  const { name, category, condition } = req.body;
  const imagePath = req.file.path;
  console.log(req.user);

  const userId = req.user.id;

  console.log({
    name,
    category,
    condition,
    imagePath,
    userId
  });


  try {
    await pool.execute(
      'INSERT INTO items (user_id, name, category, item_condition, photo_path, is_approved) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, name, category, condition, imagePath, false]
    );
    // Fetch matching subscriptions
    const matchingSubs = await getMatchingSubscriptions({
    name,
    category,
    item_condition: condition
});

    // Create notifications for each matching subscription
    for (const sub of matchingSubs) {
      await createNotification({
        user_id: sub.user_id,
        item_name: name,
        category,
        item_condition: condition,
        message: `A new item matching your subscription is available: ${name}`
      });
    }


    res.status(201).json({ msg: 'Item submitted for approval' });
  } catch (err) {
    console.error('Error inserting item:', err);
    res.status(500).json({ msg: 'Internal server error while posting item' });
  }
}

module.exports = { postItem };
