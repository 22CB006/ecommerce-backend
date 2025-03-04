const cartController = require("../controllers/cartController");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", auth, cartController.createCart);
router.get("/",auth, cartController.getCart); 
router.delete("/:id", auth, cartController.deletecart);

module.exports = router;