const express = require('express');
const {authenticateUserFromToken} = require('../middleware/protectRoutes');
const router = express.Router();


router.get('/profile', authenticateUserFromToken, function(req, res) {
    res.status(200).json({
        msg : "Welcome to your profile",
        user : req.user
    })
})



module.exports = router;
