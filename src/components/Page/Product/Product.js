import React from "react";
import HeaderProduct from "./HeaderProduct/HeaderProduct";
import ProductList from "./ListProduct/ProductList";
import { TabTitle } from "../../../utils/tabTitlePage";

function Product() {
  TabTitle("Sima Industries | Product");

  return (
    <div className="Product">
      <HeaderProduct />
      <ProductList />
    </div>
  );
}

export default Product;
