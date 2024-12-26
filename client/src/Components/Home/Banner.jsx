import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const Banner = () => {
  // React Slick settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    arrows: false,
  };

  // Carousel images
  const images = [
    "https://i.ibb.co.com/r6Zjbr8/bg-banner.jpg",
    "https://i.ibb.co.com/tCJskXq/wolf-schram-19t6-J2-RVq-QE-unsplash.jpg",
    "https://i.ibb.co.com/qMvksNH/erik-mclean-ZRns2-R5azu0-unsplash.jpg",
  ];

  return (
    <div className="relative w-full h-screen">
      {/* React Slick Carousel */}
      <Slider {...settings} className="absolute inset-0 z-0">
        {images.map((image, index) => (
          <div key={index}>
            <div
              className="w-full h-screen bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          </div>
        ))}
      </Slider>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold shadow-lg">
          Drive Your Dreams Today!
        </h1>
        <button className="mt-6 px-8 py-4 text-lg font-medium text-white bg-primary hover:bg-primary-focus rounded-lg shadow-lg">
          <Link to="/availablecars">View Available Cars</Link>
        </button>
      </div>
    </div>
  );
};

export default Banner;
