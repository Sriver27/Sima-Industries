import React from "react";
import HeaderProduct from "./HeaderProduct/HeaderProduct";
import ProductList from "./ListProduct/ProductList";
import { TabTitle } from "../../../utils/tabTitlePage";
import { useLocation } from "react-router-dom";

function Product() {
  TabTitle("Sima Industries | Product");

  const location = useLocation();
  const { collection } = location.state || {};

  return (
    <div className="Product">
      {console.log("collection:", collection)}
      <HeaderProduct />
      {collection != {}?<ProductList currTab = {collection} />:<ProductList />}
    </div>
  );
}

export default Product;
