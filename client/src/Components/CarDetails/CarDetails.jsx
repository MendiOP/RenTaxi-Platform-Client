import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`https://car-rental-server-one.vercel.app/car/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching car details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading car details...</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>No car details available.</p>
      </div>
    );
  }

  // Handler to open the booking confirmation modal
  const handleBookNow = () => {
    setShowModal(true);
  };

  // Handler to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmBooking = () => {
    try {
      fetch(`https://car-rental-server-one.vercel.app/book/${car._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carCollectionId: car._id,
          image: car.image,
          model: car.model,
          rent: car.rent,
          availability: car.availability,
          userName: car.userName,
          userEmail: car.userEmail,
          bookingDate: car.bookingDate,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Booking confirmed for car:", data);
        });
    } catch (error) {
      console.error("Error confirming booking:", error);
    }

    console.log("Booking confirmed for car:", car._id);

    setShowModal(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Car Details - RenTaxi</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">{car.model}</h1>

      {/* Main content layout */}
      <div className="flex flex-col md:flex-row md:gap-8">
        <div className="mb-4 md:mb-0 md:w-1/2">
          <img
            src={car.image}
            alt={car.model}
            className="w-full h-auto object-cover rounded-md shadow"
          />
        </div>

        {/* Car details */}
        <div className="md:w-1/2 space-y-4">
          <p>
            <span className="font-bold">Price Per Day: </span>
            {car.rent}
          </p>
          <p>
            <span className="font-bold">Availability: </span>
            {car.availability}
          </p>
          <p>
            <span className="font-bold">Features: </span>
            {car.features}
          </p>
          <p>{car.description}</p>

          {/* Book Now Button */}
          <button className="btn btn-warning" onClick={handleBookNow}>
            Book Now
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal modal-open flex justify-center items-center">
          <div className="modal-box relative">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">Confirm Booking</h2>
            <div className="space-y-2">
              <p>
                <span className="font-bold">Model:</span> {car.model}
              </p>
              <p>
                <span className="font-bold">Price Per Day:</span> {car.rent}
              </p>
              <p>
                <span className="font-bold">Availability:</span>{" "}
                {car.availability}
              </p>
              <p>
                <span className="font-bold">Features:</span> {car.features}
              </p>
            </div>
            <div className="modal-action mt-6">
              <button className="btn" onClick={handleCloseModal}>
                Cancel
              </button>
              <button
                className="btn btn-warning"
                onClick={handleConfirmBooking}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
