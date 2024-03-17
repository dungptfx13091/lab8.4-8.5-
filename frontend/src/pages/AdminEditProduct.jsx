import React, { useState, useEffect } from "react";
import "../CSS/forms.css";
import "../CSS/main.css";
import { useNavigate, useSearchParams } from "react-router-dom";

const AdminEditProduct = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const prodId = searchParams.get("prodId");

  const [product, setProduct] = useState({
    id: "",
    title: "",
    imageUrl: "",
    description: "",
    price: "",
  });

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await (
        await fetch("http://localhost:5000/product/detail?prodId=" + prodId)
      ).json();
      if (data.error) {
        navigate("/");
      } else {
        setProduct(data);

        setFormData({
          title: data.title,
          imageUrl: data.imageUrl,
          description: data.description,
          price: data.price,
        });
      }
    };
    fetchProduct();
  }, []);

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [key]: value });
    setProduct({ ...product, [key]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const body = JSON.stringify(formData);
    const fetchUpdateProduct = async () => {
      const res = await fetch(
        "http://localhost:5000/update-product?prodId=" + prodId,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: body,
        }
      );
      navigate("/admin/products");
    };
    fetchUpdateProduct();
  };

  return (
    <div className="addProduct">
      <form className="product-form" onSubmit={handleUpdate} method="POST">
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={product.title}
            onChange={handleChange}
          />

          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
          />

          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            id="price"
            value={product.price}
            onChange={handleChange}
          />

          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={product.description}
            onChange={handleChange}
          />
        </div>
        <button className="btn" type="submit">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default AdminEditProduct;
