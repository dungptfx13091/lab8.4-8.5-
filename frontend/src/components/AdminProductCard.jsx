import React from "react";
import "../CSS/product.css";
import "../CSS/main.css";
import { useNavigate } from "react-router-dom";

const AdminProductCard = (props) => {
  const navigate = useNavigate();

  const handleEditProduct = (e) => {
    e.preventDefault();
    const prodId = props.id;

    const path = "/admin/edit?prodId=" + prodId;
    navigate(path);
  };

  const handleDeleteProduct = (e) => {
    e.preventDefault();
    //
    const prodId = props.id;
    console.log("delete", prodId);
    if (window.confirm("Do you want to delete?")) {
      const body = JSON.stringify({ prodId: prodId });
      const fetchAddProduct = async () => {
        const res = await fetch("http://localhost:5000/delete-product", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: body,
        });
        window.location.reload();
      };
      fetchAddProduct();
    }
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
        <button className="btn" onClick={handleEditProduct}>
          {" "}
          Edit{" "}
        </button>
        <button className="btn" onClick={handleDeleteProduct}>
          Delete
        </button>
      </div>
    </article>
  );
};

export default AdminProductCard;
