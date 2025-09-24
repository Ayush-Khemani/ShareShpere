const express = require('express');

const { upload } = require('../middleware/uploadImage');
const { validateImageType } = require('../middleware/validateImagetype');
const {authenticateUserFromToken} = require('../middleware/protectRoutes');
const {validateDonateItem} = require('../middleware/validateDonateItem');
const {postItem} = require('../controllers/postItem')
const {GetItems} = require('../controllers/getIems');
const {SearchAndFilterItems} = require('../controllers/SearchAndFilterItems');
const router = express.Router();



// Send the request to the admin for the approval
router.post('/donate-item', authenticateUserFromToken, upload.single('photo'), validateImageType ,validateDonateItem, postItem)

router.get('/get-items', GetItems);

router.get('/search-items', SearchAndFilterItems);

module.exports = router;