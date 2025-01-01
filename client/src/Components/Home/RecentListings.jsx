import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const RecentListings = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/availableCars")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        data.reverse();

        setCars(data.splice(0, data.length / 2));
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-10 px-4 w-[90%] md:w-[75%] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-darkGray">
          Recent Listings
        </h2>
        <p className="text-center text-gray-600">Loading cars...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-10 px-4 w-[90%] md:w-[75%] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-darkGray">
          Recent Listings
        </h2>
        <p className="text-center text-red-500">Error: {error}</p>
      </section>
    );
  }

  return (
    <section className="py-10 px-4 w-[90%] md:w-[75%] mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-darkGray font-display">
        Recent Listings
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-white dark:bg-gray-700 shadow-custom hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden transform hover:scale-105"
          >
            <img
              src={car.image}
              alt={car.model}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-darkGray dark:text-white mb-2">
                {car.model}
              </h3>
              <p className="text-tealLight font-bold mb-2">{car.price}</p>
              <p
                className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full mb-4 ${
                  car.bookingCount === 0
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {car.bookingCount === 0 ? (
                  <FaCheckCircle className="mr-1" />
                ) : (
                  <FaTimesCircle className="mr-1" />
                )}
                {car.availability}
              </p>
              <p className="text-gray-500 dark:text-gray-300 text-sm mb-4">
                {car.datePosted}
              </p>
              <Link
                to={`/carDetails/${car._id}`}
                className="inline-flex items-center px-4 py-2 bg-tealLight text-white font-semibold rounded-lg shadow-md hover:bg-tealDark transition-colors duration-300"
              >
                View Details
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
    </section>
  );
};

export default RecentListings;
