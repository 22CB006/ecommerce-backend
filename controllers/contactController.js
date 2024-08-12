const Contact = require('../models/contactModel');

// Create a new contact form submission
exports.createContact = async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all contact submissions (optional, for admin use)
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({});
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single contact submission by ID (optional, for admin use)
exports.getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (contact) {
            res.json(contact);
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a contact submission by ID (optional, for admin use)
exports.deleteContact = async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (deletedContact) {
            res.json({ message: 'Contact deleted successfully' });
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
