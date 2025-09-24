const express = require('express');
const router = express.Router();

const {validateLogin, checkLoginCredentials, validateRegisteration} = require('../middleware/authMiddleware');
const {loginUser, registerUser} = require('../controllers/authController');



router.post('/login', validateLogin, checkLoginCredentials ,loginUser);

router.post('/registeration', validateRegisteration , registerUser);

module.exports = router;