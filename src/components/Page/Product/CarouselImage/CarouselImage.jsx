import React, { Component } from "react";
import Slider from "react-slick";

import "../CarouselImage/CarouselImage.css";
import CarouselHeader from "./CarouselHeader";

import CarouselImg1 from "../../../assets/CarouselImage1.png";
import CarouselImg2 from "../../../assets/CarouselImage2.png";
import CarouselImg3 from "../../../assets/CarouselImage3.png";

export default class CarouselImage extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 100,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      pauseOnFocus: true,
    };
    return (
      <div className="CarouselImgContainer">
        <Slider {...settings}>
          <div>
            <CarouselHeader
              headerImg={CarouselImg1}
              title="Elevate Your Space with Timeless Elegance"
              desc="Transform any space into something sophisticated and stylish."
            />
          </div>
          <div>
            <CarouselHeader
              headerImg={CarouselImg2}
              title="Crafting Comfort, Inspiring Design"
              desc="The quality craftsmanship and inspiring designs of furniture, appealing to customers who value both comfort and aesthetics in their home furnishings."
            />
          </div>
          <div>
            <CarouselHeader
              headerImg={CarouselImg3}
              title="Where Function Meets Fashion"
              desc="Furniture not only serves practical purposes but also adds a touch of style and trendiness to any room."
            />
          </div>
        </Slider>
      </div>
    );
  }
}
