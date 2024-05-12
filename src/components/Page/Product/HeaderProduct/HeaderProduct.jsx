import React from "react";
import CarouselImage from "../CarouselImage/CarouselImage";
import "../HeaderProduct/HeaderProduct.css";

const HeaderProduct = () => {
  return (
    <div>
      <div className="headerProductContainer">
        <div className="headerTitle">
          <h1>Products</h1>
          <p>
            We display products based on the latest products we have. We believe in delivering quality
          </p>
        </div>
      </div>
      <CarouselImage />
    </div>
  );
};

export default HeaderProduct;
