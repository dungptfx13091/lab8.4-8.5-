import React, { useState } from "react";
import "../CSS/forms.css";
import "../CSS/main.css";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "A Book",
    imageUrl:
      "https://www.publicdomainpictures.net/pictures/10000/velka/1-1210009435EGmE.jpg",
    description: "This is an awesome book!",
    price: "19",
  });

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = JSON.stringify(formData);
    const fetchAddProduct = async () => {
      const res = await fetch("http://localhost:5000/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: body,
      });
      navigate("/");
    };
    fetchAddProduct();
  };

  return (
    <div className="addProduct">
      <form className="product-form" onSubmit={handleSubmit} method="POST">
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
          />

          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />

          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            id="price"
            value={formData.price}
            onChange={handleChange}
          />

          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <button className="btn" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
