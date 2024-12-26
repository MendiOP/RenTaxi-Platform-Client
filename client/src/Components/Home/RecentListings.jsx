import React from "react";

const RecentListings = () => {
  const cars = [
    {
      id: 1,
      image: "https://via.placeholder.com/150",
      model: "Toyota Camry 2023",
      price: "$45/day",
      availability: "Available",
      datePosted: "Added 2 days ago",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/150",
      model: "Honda Accord 2022",
      price: "$50/day",
      availability: "Unavailable",
      datePosted: "Added 5 days ago",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/150",
      model: "Ford Mustang 2021",
      price: "$70/day",
      availability: "Available",
      datePosted: "Added 3 days ago",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/150",
      model: "Tesla Model 3 2023",
      price: "$90/day",
      availability: "Available",
      datePosted: "Added 1 day ago",
    },
    {
      id: 5,
      image: "https://via.placeholder.com/150",
      model: "BMW X5 2020",
      price: "$80/day",
      availability: "Unavailable",
      datePosted: "Added 7 days ago",
    },
    {
      id: 6,
      image: "https://via.placeholder.com/150",
      model: "Audi Q7 2022",
      price: "$85/day",
      availability: "Available",
      datePosted: "Added 4 days ago",
    },
  ];

  return (
    <section className="py-10 px-4 w-[90%] md:w-[75%] mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">Recent Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white shadow-md hover:shadow-lg hover:scale-105 transition transform duration-300 rounded-lg overflow-hidden"
          >
            <img
              src={car.image}
              alt={car.model}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{car.model}</h3>
              <p className="text-gray-600 mb-2">{car.price}</p>
              <p
                className={`inline-block px-3 py-1 text-sm font-medium rounded-full mb-2 ${
                  car.availability === "Available"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {car.availability}
              </p>
              <p className="text-gray-400 text-sm">{car.datePosted}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentListings;
