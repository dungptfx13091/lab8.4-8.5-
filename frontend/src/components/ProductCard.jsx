import React from "react";
import "../CSS/product.css";
import "../CSS/main.css";
import { useNavigate } from "react-router-dom";

const ProductCard = (props) => {
  const navigate = useNavigate();
  const handleAddCart = (e) => {
    e.preventDefault();
    const body = JSON.stringify({ prodId: props.id });
    const fetchAddToCart = async () => {
      const res = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      });
      navigate("/cart");
    };
    fetchAddToCart();
  };
  return (
    <article key={props.id} className="card product-item">
      <header className="card__header">
        <h1 className="product__title">{props.product.title}</h1>
      </header>
      <div className="card__image">
        <img
          src="https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg"
          alt="A Book"
        />
      </div>
      <div className="card__content">
        <h2 className="product__price">{props.product.price}</h2>
        <p className="product__description">{props.product.description}</p>
      </div>
      <div className="card__actions">
        <button className="btn">Details</button>
        <button className="btn" onClick={handleAddCart}>
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
