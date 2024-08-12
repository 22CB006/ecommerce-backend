const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // Corrected typo from 'bcrpt' to 'bcrypt'

// Get all users
exports.getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    console.log(err);
  }
};

// Add a new user
exports.addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();
    res.send(newUser);
  } catch (err) {
    console.log(err);
  }
};

// User login
exports.login = async (req, res) => { // Corrected parameter order
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("Invalid Email or Password");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json("Invalid Email or Password");
    }
    const token = jwt.sign({ user_id: user._id }, "secret_token", {
      expiresIn: "24h", // Adjusted expiry time for better practice
    });
    res.status(200).json({ token }); // Returning token in JSON format
  } catch (err) {
    console.error(err);
    res.status(500).json("Server Error"); // Added error response for better handling
  }
};
