const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.get("/", userController.getUser);
router.post("/", userController.addUser);
router.post("/login", userController.login);

module.exports = router;