import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState("grid");
  const [sortOption, setSortOption] = useState("");
  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("http://localhost:5000/availableCars");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars.filter(
    (car) =>
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (car.location &&
        car.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedCars = [...filteredCars];
  if (sortOption === "newest") {
    sortedCars.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  } else if (sortOption === "oldest") {
    sortedCars.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
  } else if (sortOption === "lowestPrice") {
    sortedCars.sort((a, b) => parseFloat(a.rent) - parseFloat(b.rent));
  } else if (sortOption === "highestPrice") {
    sortedCars.sort((a, b) => parseFloat(b.rent) - parseFloat(a.rent));
  }

  // Loader Component
  const Loader = () => (
    <div className="flex flex-col items-center justify-center h-screen">
      <svg
        className="animate-spin h-12 w-12 text-primary mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
      <p className="text-xl font-semibold">Loading data...</p>
    </div>
  );

  return (
    <div className="pt-20 w-[90%] md:w-[70%] mx-auto">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Available Cars - RenTaxi</title>
      </Helmet>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by model or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered"
            />

            {/* View Toggle Button */}
            <button
              onClick={() => setViewType(viewType === "grid" ? "list" : "grid")}
              className="btn btn-outline"
            >
              Switch to {viewType === "grid" ? "List" : "Grid"} View
            </button>

            {/* Sorting Dropdown */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="select select-bordered"
            >
              <option value="">-- Sort By --</option>
              <option value="newest">Date Added (Newest First)</option>
              <option value="oldest">Date Added (Oldest First)</option>
              <option value="lowestPrice">Price (Lowest First)</option>
              <option value="highestPrice">Price (Highest First)</option>
            </select>
          </div>

          {/* Cars List/Grid */}
          <div
            className={
              viewType === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col gap-6"
            }
          >
            {sortedCars.map((car) => (
              <div
                key={car._id}
                className={`card card-compact bg-base-100 w-full md:w-96 shadow-xl ${
                  viewType === "list" ? "md:flex md:w-full" : ""
                }`}
              >
                {/* Image Section */}
                <figure
                  className={`${
                    viewType === "list" ? "md:w-60" : "h-44"
                  } w-full overflow-hidden`}
                >
                  <img
                    src={car.image}
                    alt={car.model}
                    className="object-cover w-full h-full"
                  />
                </figure>

                {/* Card Body */}
                <div className="card-body space-y-3">
                  <h2 className="card-title">{car.model}</h2>
                  <p>{car.description}</p>
                  <p>
                    <span className="font-bold">Price Per Day: </span>
                    {car.rent}
                  </p>
                  <p>
                    <span className="font-bold">Availability: </span>
                    <span
                      className={`badge ${
                        car.bookingCount === 0
                          ? "badge-success"
                          : "badge-error text-lg"
                      }`}
                    >
                      {car.bookingCount === 0 ? "Available" : "Booked"}
                    </span>
                  </p>
                  <p>
                    <span className="font-bold">Features: </span>
                    <span>{car.features}</span>
                  </p>
                  <div className="card-actions justify-center">
                    {car.bookingCount === 0 ? (
                      <Link
                        to={`/carDetails/${car._id}`}
                        className="btn btn-wide btn-warning text-xl"
                      >
                        Book Now
                      </Link>
                    ) : (
                      <button
                        className="btn btn-wide btn-disabled text-xl cursor-not-allowed"
                        disabled
                      >
                        Book Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AvailableCars;
