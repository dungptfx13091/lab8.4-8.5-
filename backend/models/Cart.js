const fs = require("fs");
const path = require("path");

const p = path.join(__dirname, "..", "datas", "carts.json");

const getCartFromFile = (cb) => {
  fs.readFile(p, "utf8", (error, data) => {
    let cart = { products: [], totalPrice: 0 };
    if (error) {
      cb(cart);
    } else {
      try {
        cart = JSON.parse(data);
        cb(cart);
      } catch (err) {
        cb(cart);
      }
    }
  });
};

module.exports = class Cart {
  static fetchCart(cb) {
    getCartFromFile(cb);
  }

  static addToCart(id, productPrice) {
    //Fetch the previous cart
    getCartFromFile((cart) => {
      //Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );

      const existingProduct = cart.products[existingProductIndex];

      let updatedProduct;

      //Add new product / increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = Number(updatedProduct.qty) + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = Number(cart.totalPrice) + Number(productPrice);

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProductCart(id, productPrice) {
    getCartFromFile((cart) => {
      const updatedCart = { ...cart };
      const product = updatedCart.products.find((prod) => prod.id === id);
      if (!product) {
        return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }
};
