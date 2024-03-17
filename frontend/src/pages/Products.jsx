import React, { useEffect, useState } from "react";
import "../CSS/product.css";
import "../CSS/main.css";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const data = await (await fetch("http://localhost:5000/")).json();
      setProducts(data);
    };
    fetchProduct();
  }, []);
  return (
    <div className="products">
      <div className="grid">
        {products &&
          products.map((product, id) => {
            return <ProductCard product={product} id={id} key={id} />;
          })}
      </div>
    </div>
  );
};

export default Products;
