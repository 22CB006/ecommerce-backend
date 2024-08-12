const express = require('express');
const router = express.Router();
const auctionController = require('../controllers/auctionController');
const auth = require('../middleware/auth'); 

// Protect these routes with the auth middleware
router.get('/', auth, auctionController.getAllAuctions);
router.get('/:id', auth, auctionController.getAuctionById);
router.post('/', auth, auctionController.createAuction);
router.put('/:id', auth, auctionController.updateAuction);
router.delete('/:id', auth, auctionController.deleteAuction);

module.exports = router;
