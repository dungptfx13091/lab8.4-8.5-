import React from "react";
import "../CSS/main.css";

import { useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <header className="main-header">
      <nav className="main-header__nav">
        <ul className="main-header__item-list">
          <li className="main-header__item">
            <a className={path === "/" ? "active" : ""} href="/">
              Shop
            </a>
          </li>
          <li className="main-header__item">
            <a
              className={path === "/products" ? "active" : ""}
              href="/products"
            >
              Products
            </a>
          </li>
          <li className="main-header__item">
            <a className={path === "/cart" ? "active" : ""} href="/cart">
              Cart
            </a>
          </li>
          <li className="main-header__item">
            <a
              className={path === "/add-product" ? "active" : ""}
              href="/add-product"
            >
              Add Product
            </a>
          </li>
          <li className="main-header__item">
            <a
              className={path.includes("/admin/") ? "active" : ""}
              href="/admin/products"
            >
              Admin Products
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
