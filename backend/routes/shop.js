const express = require("express");
const router = express.Router();
const productController = require("../controller/product");
const cartController = require("../controller/cart");

router.get("/cart", cartController.getCart);
router.post("/cart", cartController.addToCart);
router.delete("/cart", cartController.deleteCartItem);

router.get("/", productController.getProducts);
module.exports = router;
