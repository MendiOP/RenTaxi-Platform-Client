import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState("grid");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/availableCars")
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
      });
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

  return (
    <div className="pt-20 w-[90%] md:w-[70%] mx-auto">
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
                alt="Car"
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
                <span className="badge badge-success">{car.availability}</span>
              </p>
              <p>
                <span className="font-bold">Features: </span>
                <span>{car.features}</span>
              </p>
              <div className="card-actions justify-center">
                <Link
                  to={`/carDetails/${car._id}`}
                  className="btn btn-wide btn-warning text-xl"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCars;
