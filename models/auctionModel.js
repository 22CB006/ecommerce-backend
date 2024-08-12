const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    place: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    estimate: {
        type: String,
    },
    result: {
        type: String,
    },
    inclusive: {
        type: String,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    countdown: {
        type: String,
    },
});

const Auction = mongoose.model("Auction", auctionSchema);
module.exports = Auction;
