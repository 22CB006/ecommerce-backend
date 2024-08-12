const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const auth = require('../middleware/auth'); 

// Create a new contact submission
router.post('/', auth, contactController.createContact); // Apply the auth middleware here

// Optional routes for admin usage
router.get('/', auth, contactController.getAllContacts); // Protect admin routes with auth as well
router.get('/:id', auth, contactController.getContactById);
router.delete('/:id', auth, contactController.deleteContact);

module.exports = router;
