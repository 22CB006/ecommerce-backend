const ProductController = require("../controllers/productController");
const express = require("express");
const router = express.Router();

router.get("/", ProductController.getProducts);
router.post("/",ProductController.addProducts)

module.exports = router;
