const express = require("express");
const router = express.Router();
const productController = require("../controller/product");

router.post("/add-product", productController.addProduct);

router.get("/product/detail", productController.getProductDetail);

router.post("/update-product", productController.updateProduct);

router.delete("/delete-product", productController.deleteProduct);

module.exports = router;
