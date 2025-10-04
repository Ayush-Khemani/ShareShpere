const express = require('express');
const pool = require('../db/db.js');
const router = express.Router();
const { getNotifications } = require('../controllers/notificationController');
const { authenticateUserFromToken } = require('../middleware/protectRoutes'); 


router.get('/get-notifications', authenticateUserFromToken, getNotifications);

router.delete('/clear', authenticateUserFromToken, async (req, res) => {
  const userId = req.user.id;
  try {
    await pool.execute('DELETE FROM notifications WHERE user_id = ?', [userId]);
    res.json({ msg: 'Notifications cleared successfully' });
  } catch (err) {
    console.error('Error clearing notifications:', err);
    res.status(500).json({ msg: 'Internal server error while clearing notifications' });
  }
});


module.exports = router;
