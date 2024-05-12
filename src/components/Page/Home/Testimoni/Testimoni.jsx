import React, { Component } from "react";
import Slider from "react-slick";
import "../Testimoni/Testimoni.css";
import TestimoniCard from "./TestimoniCard";
import Avatar from "../../../assets/avatar2.jpg";
import {data} from "./reviewsData"

export default class Testimoni extends Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 100,
      slidesToShow: 3,
      slidesToScroll: 3,
      arrows: false,
      autoplay: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
            autoplay: true,
          },
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
            autoplay: true,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
          },
        },
      ],
    };
    return (
      <div className="Testimoni">
        <div className="titletesti">
          <div className="nametesti">
            <p>Testimonials</p>
            <h1>What Our Customers Say</h1>
          </div>
          <div className="desctesti">
            <h3>
            Our custom furniture is made with you in mind. Our furniture is designed for comfort and quality. Our furnitures are best in class and the perfect balance of style and comfort.
            </h3>
          </div>
        </div>
        <Slider {...settings}>
        
            {data.map((item)=>{
              return(
                <div key={item.id}>
                <TestimoniCard
                  
                  testi={item.review}
                  avatar={Avatar}
                  name={item.reviewerName}
                  rating={item.ratings}
                />
                </div>
              )
            })}
          
        </Slider>
      </div>
    );
  }
}
