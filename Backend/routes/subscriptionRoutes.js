const express =  require("express");
const { subscribeNotification } = require( "../controllers/subscriptionController.js");
const { authenticateUserFromToken } = require("../middleware/protectRoutes.js");

const router = express.Router();

router.post("/subscribe", authenticateUserFromToken, subscribeNotification);

module.exports = router;
