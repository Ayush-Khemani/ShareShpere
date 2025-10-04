const pool = require('../db/db');

async function getNotifications(req, res) {
  try {
    const userId = req.user.id; 

    const [rows] = await pool.execute(
      'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );

    res.json({ notifications: rows });
  } catch (err) {
    console.error('Failed to fetch notifications:', err);
    res.status(500).json({ msg: 'Internal server error while fetching notifications' });
  }
}

module.exports = { getNotifications };
