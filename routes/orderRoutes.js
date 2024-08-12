const orderController = require("../controllers/orderController");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", auth, orderController.createOrder);
router.get("/",auth, orderController.getOrder); 
router.delete("/:order_id", auth, orderController.deleteOrder);

module.exports = router;