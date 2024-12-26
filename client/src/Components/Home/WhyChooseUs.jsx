import React from "react";
import {
  FaCar,
  FaDollarSign,
  FaHeadset,
  FaRegCalendarCheck,
} from "react-icons/fa";

const WhyChooseUs = () => {
  const points = [
    {
      icon: <FaCar className="text-primary text-4xl" />,
      title: "Wide Variety of Cars",
      description: "From budget-friendly options to luxury vehicles.",
    },
    {
      icon: <FaDollarSign className="text-primary text-4xl" />,
      title: "Affordable Prices",
      description: "Competitive daily rates you can count on.",
    },
    {
      icon: <FaRegCalendarCheck className="text-primary text-4xl" />,
      title: "Easy Booking Process",
      description: "Seamlessly book your ride in just a few clicks.",
    },
    {
      icon: <FaHeadset className="text-primary text-4xl" />,
      title: "Customer Support",
      description: "24/7 assistance for all your queries.",
    },
  ];

  return (
    <section className="px-6 py-12 lg:py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((point, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-white rounded-lg shadow-lg p-6"
            >
              <div className="mb-4">{point.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {point.title}
              </h3>
              <p className="text-gray-600">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
