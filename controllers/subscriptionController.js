// controllers/subscriptionController.js
const Subscription = require('../models/subscriptionModel');

// Subscribe a new email
exports.subscribeEmail = async (req, res) => {
    try {
        const { email } = req.body;
        // Check if the email already exists
        const existingSubscription = await Subscription.findOne({ email });
        if (existingSubscription) {
            return res.status(400).json({ message: 'Email is already subscribed' });
        }
        // Create a new subscription
        const newSubscription = new Subscription({ email });
        await newSubscription.save();
        res.status(201).json({ message: 'Successfully subscribed' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
