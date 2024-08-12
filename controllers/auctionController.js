const Auction = require('../models/auctionModel');

// Get all auctions
exports.getAllAuctions = async (req, res) => {
    try {
        const auctions = await Auction.find({});
        res.json(auctions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single auction by ID
exports.getAuctionById = async (req, res) => {
    try {
        const auction = await Auction.findById(req.params.id);
        if (auction) {
            res.json(auction);
        } else {
            res.status(404).json({ message: 'Auction not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new auction
exports.createAuction = async (req, res) => {
    try {
        const newAuction = new Auction(req.body);
        const savedAuction = await newAuction.save();
        res.status(201).json(savedAuction);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an auction
exports.updateAuction = async (req, res) => {
    try {
        const updatedAuction = await Auction.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedAuction) {
            res.json(updatedAuction);
        } else {
            res.status(404).json({ message: 'Auction not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an auction
exports.deleteAuction = async (req, res) => {
    try {
        const deletedAuction = await Auction.findByIdAndDelete(req.params.id);
        if (deletedAuction) {
            res.json({ message: 'Auction deleted successfully' });
        } else {
            res.status(404).json({ message: 'Auction not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
