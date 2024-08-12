// routes/subscriptionRoute.js
const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

// Route to subscribe an email
router.post('/subscribe', subscriptionController.subscribeEmail);

module.exports = router;
