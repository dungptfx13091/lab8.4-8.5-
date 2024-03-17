const Cart = require("../models/Cart");
const Product = require("../models/product");

exports.getCart = async (req, res, next) => {
  Cart.fetchCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.json({ cartProducts: cartProducts, totalPrice: cart.totalPrice });
    });
  });
};

exports.addToCart = (req, res, next) => {
  const prodId = req.body.prodId;

  Product.findById(prodId, (product) => {
    Cart.addToCart(prodId, product.price);
  });

  res.json("Added To Cart");
};

exports.deleteCartItem = (req, res, next) => {
  const prodId = req.body.prodId;

  try {
    Product.findById(prodId, (product) => {
      Cart.deleteProductCart(prodId, product.price);
    });
    res.json({ message: "Delete Product Sucess!" });
  } catch (error) {
    console.log(err);
  }
};
