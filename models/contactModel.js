const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
    },
    department: {
        type: String,
        required: true,
    },
    query: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
