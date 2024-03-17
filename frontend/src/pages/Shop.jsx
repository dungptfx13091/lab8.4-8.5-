import React, { useEffect, useState } from "react";
import "../CSS/product.css";
import "../CSS/main.css";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      const data = await (await fetch("http://localhost:5000/")).json();
      setProducts(data);
    };
    fetchProduct();
  }, []);
  return (
    <div className="shop">
      <div className="grid">
        {products &&
          products.map((product, id) => {
            return <ProductCard key={id} product={product} id={product.id} />;
          })}
      </div>
    </div>
  );
};

export default Shop;
