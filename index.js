const express = require("express");
const app = express();
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const auctionRoutes = require("./routes/auctionRoutes");
const cors = require("cors");
const contactRoutes = require("./routes/contactRoutes");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://aryalakshmisece:Aryasece2910@cluster0.k18j5n2.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.use(express.json());
app.use(cors());

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
