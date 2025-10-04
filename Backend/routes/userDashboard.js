const express = require('express');
const router = express.Router();
const { authenticateUserFromToken } = require('../middleware/protectRoutes');
const { getMyItems, deleteMyItem } = require('../controllers/userDashboardController');

router.get('/my-items', authenticateUserFromToken, getMyItems);
router.delete('/my-items/:itemId', authenticateUserFromToken, deleteMyItem);

module.exports = router;