import React from "react";
import { Link } from "react-router-dom";

const SpecialOffers = () => {
  const offers = [
    {
      id: 1,
      title: "Get 15% off for weekend rentals!",
      description:
        "Enjoy exclusive discounts on weekend bookings. Book now and save big!",
      buttonText: "Book Now",
    },
    {
      id: 2,
      title: "Luxury cars at $99/day this holiday season!",
      description:
        "Drive in style this holiday season with our limited-time luxury car offers.",
      buttonText: "Book Now",
    },
    {
      id: 3,
      title: "Get 15% off for weekend rentals!",
      description:
        "Enjoy exclusive discounts on weekend bookings. Book now and save big!",
      buttonText: "Book Now",
    },
    {
      id: 4,
      title: "Luxury cars at $99/day this holiday season!",
      description:
        "Drive in style this holiday season with our limited-time luxury car offers.",
      buttonText: "Book Now",
    },
  ];

  return (
    <section className="py-10 px-4 rounded-xl bg-gray-100">
      <div className="bg-gray-100 w-[90%] md:w-[75%] mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">
          Special Offers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {offers.map((offer, index) => (
            <div
              key={offer.id}
              className={`bg-white shadow-md rounded-lg p-6 flex flex-col items-start transition-transform duration-300 ease-in-out hover:scale-105 ${
                index % 2 === 0 ? "animate-slideInLeft" : "animate-slideInRight"
              }`}
            >
              <h3 className="text-lg font-semibold mb-3">{offer.title}</h3>
              <p className="text-gray-600 mb-4">{offer.description}</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
                <Link to="/availablecars">{offer.buttonText}</Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
