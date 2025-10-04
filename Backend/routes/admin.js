const express = require('express');
const router = express.Router();
const { authenticateUserFromToken } = require('../middleware/protectRoutes');
const { checkAdmin } = require('../middleware/checkAdmin');
const { 
    getPendingItems, 
    approveItem, 
    rejectItem, 
    getAllUsers 
} = require('../controllers/adminController');

// All admin routes require authentication and admin role
router.use(authenticateUserFromToken);
router.use(checkAdmin);

router.get('/pending-items', getPendingItems);
router.put('/approve-item/:itemId', approveItem);
router.delete('/reject-item/:itemId', rejectItem);
router.get('/users', getAllUsers);

module.exports = router;