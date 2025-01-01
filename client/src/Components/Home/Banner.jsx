import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    arrows: false,
    pauseOnHover: true,
    adaptiveHeight: true,
  };

  // Carousel images
  const images = [
    "https://i.ibb.co/r6Zjbr8/bg-banner.jpg",
    "https://i.ibb.co/tCJskXq/wolf-schram-19t6-J2-RVq-QE-unsplash.jpg",
    "https://i.ibb.co/qMvksNH/erik-mclean-ZRns2-R5azu0-unsplash.jpg",
  ];

  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
      {/* React Slick Carousel */}
      <Slider {...settings} className="absolute inset-0 z-0">
        {images.map((image, index) => (
          <div key={index} className="w-full h-[70vh] md:h-[80vh]">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover brightness-75"
            />
          </div>
        ))}
      </Slider>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-darkGray to-tealDark opacity-50 z-10"></div>

      {/* Content */}

      <div className="absolute inset-0 z-20 backdrop-blur-sm flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold mb-3 text-white drop-shadow-lg font-display">
          Drive Your Dreams Today!
        </h1>
        <p className="text-base sm:text-lg lg:text-lg mb-6 text-white max-w-2xl drop-shadow-md">
          Experience the freedom and flexibility of owning your own ride. Choose
          from a wide range of vehicles that suit your style and budget.
        </p>
        <Link
          to="/availablecars"
          className="flex items-center px-7 py-3 text-base font-semibold text-white bg-tealLight hover:bg-tealDark transition-colors duration-300 rounded-lg shadow-lg transform hover:scale-105 group"
        >
          <span>View Available Cars</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default Banner;
