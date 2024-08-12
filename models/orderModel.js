const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerName: String,
    customerAddress: String,
    phoneNumber: Number,
    product_id: String,
    productName: String, 
    orderDate: Number, 
    estimateDeliveryDate: Number,
    userEmail: String,
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;