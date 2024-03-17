import React, { useEffect, useState } from "react";
import "../CSS/product.css";
import "../CSS/main.css";
import AdminProductCard from "../components/AdminProductCard";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await (await fetch("http://localhost:5000/")).json();
      setProducts(data);
    };
    fetchProduct();
  }, []);
  return (
    <div className="adminProducts">
      <div className="grid">
        {products &&
          products.map((product, id) => {
            return (
              <AdminProductCard key={id} product={product} id={product.id} />
            );
          })}
      </div>
    </div>
  );
};

export default AdminProducts;
