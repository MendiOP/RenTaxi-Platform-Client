import React from "react";
import { FaCalendarAlt, FaCarSide, FaGift, FaPercentage } from "react-icons/fa";
import { Link } from "react-router-dom";

const SpecialOffers = () => {
  const offers = [
    {
      id: 1,
      title: "Get 15% Off on Weekend Rentals!",
      description:
        "Enjoy exclusive discounts on weekend bookings. Book now and save big!",
      buttonText: "Book Now",
      icon: <FaPercentage />,
      badge: "Limited Time",
      image: "https://i.ibb.co.com/RBDCNBw/pexels-photosbycollis-3056057.jpg", // Replace with actual image URLs
    },
    {
      id: 2,
      title: "Luxury Cars at $999/day This Holiday Season!",
      description:
        "Drive in style this holiday season with our limited-time luxury car offers.",
      buttonText: "Book Now",
      icon: <FaGift />,
      badge: "Exclusive",
      image: "https://i.ibb.co.com/7jZhxSg/dealer-1816358-1280.jpg", // Replace with actual image URLs
    },
    {
      id: 3,
      title: "Free Pickup and Drop-off Services!",
      description:
        "Avail our complimentary pickup and drop-off services with every booking.",
      buttonText: "Book Now",
      icon: <FaCarSide />,
      badge: "New",
      image: "https://i.ibb.co.com/Pc7T4kz/pexels-uriel-mont-6280718.jpg", // Replace with actual image URLs
    },
    {
      id: 4,
      title: "Early Bird Special: 20% Off!",
      description:
        "Book your rental car early and enjoy a 20% discount on your total bill.",
      buttonText: "Book Now",
      icon: <FaCalendarAlt />,
      badge: "Limited Offer",
      image: "https://i.ibb.co.com/bPZmc2y/early.png", // Replace with actual image URLs
    },
  ];

  return (
    <section className="py-16 px-4 w-full bg-gradient-to-r from-tealDark to-tealLight">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-12 font-display">
          Special Offers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {offers.map((offer, index) => (
            <div
              key={offer.id}
              className={`relative bg-white dark:bg-gray-800 shadow-custom hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden transform hover:scale-105 ${
                index % 2 === 0 ? "animate-slideInLeft" : "animate-slideInRight"
              }`}
            >
              {/* Offer Image */}
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-48 object-cover object-center"
                loading="lazy"
              />

              {/* Badge */}
              <span className="absolute top-4 left-4 bg-accent text-white text-xs font-semibold px-2 py-1 rounded-full">
                {offer.badge}
              </span>

              {/* Offer Content */}
              <div className="p-6 flex flex-col justify-between">
                {/* Icon */}
                <div className="text-tealLight mb-4">
                  {React.cloneElement(offer.icon, { className: "text-4xl" })}
                </div>

                {/* Offer Title */}
                <h3 className="text-xl font-semibold text-darkGray dark:text-white mb-3 font-opensans">
                  {offer.title}
                </h3>

                {/* Offer Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-6 font-body">
                  {offer.description}
                </p>

                <Link
                  to="/availablecars"
                  className="inline-flex items-center bg-tealLight hover:bg-tealDark text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-tealLight transition-colors duration-300"
                >
                  {offer.buttonText}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
