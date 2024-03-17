import React, { useEffect, useState } from "react";
import "../CSS/product.css";
import "../CSS/main.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [isReload, setIsReload] = useState(false);

  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const fetchCart = async () => {
      const cart = await (await fetch("http://localhost:5000/cart")).json();
      setCartProducts(cart.cartProducts);
      setTotalPrice(cart.totalPrice);
    };
    fetchCart();
  }, []);

  const handleDelete = (prodId) => {
    if (window.confirm("Do you want to delete?")) {
      const body = JSON.stringify({ prodId: prodId });
      const fetchAddProduct = async () => {
        const res = await fetch("http://localhost:5000/cart", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: body,
        });
        // setIsReload(!isReload);

        window.location.reload(); //reload state de render lai cart
      };
      fetchAddProduct();
    }
  };

  return (
    <div className="cart">
      <h1>Cart</h1>
      {cartProducts.length === 0 && <h1>No Products in Cart!</h1>}

      {cartProducts &&
        cartProducts.map(function (prod) {
          return (
            <div key={prod.productData.id}>
              <p>
                {prod.productData.title} ({prod.qty}) Price:{" "}
                {prod.productData.price}
              </p>
              <button
                className="btn"
                type="submit"
                onClick={() => handleDelete(prod.productData.id)}
              >
                Delete
              </button>
            </div>
          );
        })}

      <h1>Total Price: {totalPrice}</h1>
    </div>
  );
};

export default Cart;
