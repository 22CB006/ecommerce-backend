const express = require("express");
const app = express();
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const auctionRoutes = require("./routes/auctionRoutes");
const contactRoutes = require("./routes/contactRoutes");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/ecommerce")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

app.use(express.json());

// Use routes
app.use("/product", productRoutes);
app.use("/user", userRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);
app.use("/auction", auctionRoutes); 
app.use("/contact", contactRoutes);


app.listen(3000, () => {
    console.log("Server running on port 3000");
});
