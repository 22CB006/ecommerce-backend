const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');

exports.createOrder = async (req, res) => {
    const { user_id } = req.user;
    const { product_id } = req.body;

    try {
        
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        
        const product = await Product.findById(product_id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        
        const orderDate = Date.now();
        const estimateDeliveryDate = new Date(orderDate);
        estimateDeliveryDate.setDate(estimateDeliveryDate.getDate() + 10); 

        
        const order = new Order({
            customerName: user.name,
            customerAddress: user.address,
            phoneNumber: user.phone_num,
            product_id: product_id,
            productName: product.name,
            orderDate: orderDate,
            estimateDeliveryDate: estimateDeliveryDate.getTime(), 
            userEmail: user.email,
        });

        await order.save();
        res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getOrder = async (req, res) => {
    const { user_id } = req.user;

    try {
        const orders = await Order.find({ user_id });
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.deleteOrder = async (req, res) => {
    const { order_id } = req.params;

    try {
        const order = await Order.findByIdAndDelete(order_id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};