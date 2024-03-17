const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.json(products);
  });
};

exports.getProductDetail = (req, res, next) => {
  const prodId = req.query.prodId;

  Product.findById(prodId, (product) => {
    if (!product) {
      res.json({ error: "Product Not Found" });
    } else {
      res.json(product);
    }
  });
};

exports.addProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  const newProduct = new Product(null, title, imageUrl, description, price);
  newProduct.save();

  res.json({ message: "Add Product Success!" });
};

exports.updateProduct = (req, res, next) => {
  const prodId = req.query.prodId;

  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;

  const updatedProduct = new Product(
    prodId,
    title,
    imageUrl,
    description,
    price
  );
  updatedProduct.save();
  res.json({ message: "Update Product Success!" });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.prodId;
  try {
    Product.deleteById(prodId);
    res.json({ message: "Delete Product Sucess!" });
  } catch (error) {
    console.log(err);
  }
};
