import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { FaCalendarAlt, FaRegSadTear, FaTrash } from "react-icons/fa"; // Added icon for no data
import { AuthContext } from "../../AuthContext/AuthContext";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Mybookings = () => {
  const [cars, setCars] = useState([]);
  const { user } = useContext(AuthContext);

  // State to manage the cancellation modal
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedCarIdForCancel, setSelectedCarIdForCancel] = useState(null);

  // State to manage the modification modal
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [selectedCarIdForModify, setSelectedCarIdForModify] = useState(null);
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/myBookings?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setCars(data);
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
        });
    }
  }, [user]);

  // Utility function to calculate the number of days between two dates
  const calculateDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = endDate - startDate;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates
    return daysDiff > 0 ? daysDiff : 1;
  };

  // Function to open the cancellation modal
  const openCancelModal = (id) => {
    setSelectedCarIdForCancel(id);
    setIsCancelModalOpen(true);
  };

  // Function to close the cancellation modal
  const closeCancelModal = () => {
    setSelectedCarIdForCancel(null);
    setIsCancelModalOpen(false);
  };

  // Function to handle the cancellation after confirmation
  const confirmCancel = () => {
    if (!selectedCarIdForCancel) return;

    fetch(`http://localhost:5000/cancelBooking/${selectedCarIdForCancel}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          setCars((prev) =>
            prev.filter((car) => car._id !== selectedCarIdForCancel)
          );
          closeCancelModal();
        } else {
          alert("Failed to cancel the booking. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error canceling booking:", error);
        closeCancelModal();
      });
  };

  // Function to open the modification modal
  const openModifyModal = (id) => {
    const carToModify = cars.find((car) => car._id === id);
    if (carToModify && carToModify.bookingDate) {
      const dates = carToModify.bookingDate.split(" to ");
      setNewStartDate(dates[0] || "");
      setNewEndDate(dates[1] || "");
    }
    setSelectedCarIdForModify(id);
    setIsModifyModalOpen(true);
  };

  // Function to close the modification modal
  const closeModifyModal = () => {
    setSelectedCarIdForModify(null);
    setIsModifyModalOpen(false);
    setNewStartDate("");
    setNewEndDate("");
  };

  // Function to handle the date modification after confirmation
  const confirmModify = () => {
    if (!selectedCarIdForModify || !newStartDate || !newEndDate) {
      alert("Please select both start and end dates.");
      return;
    }

    // Ensure that the start date is before the end date
    if (new Date(newStartDate) > new Date(newEndDate)) {
      alert("Start date cannot be after end date.");
      return;
    }

    // Prepare the data to be sent to the server
    const updatedBooking = {
      bookingDate: `${newStartDate} to ${newEndDate}`,
    };

    console.log("Updated booking:", updatedBooking);

    fetch(`http://localhost:5000/updateBooking/${selectedCarIdForModify}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBooking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          // Update the local state with the new dates
          setCars((prevCars) =>
            prevCars.map((car) =>
              car._id === selectedCarIdForModify
                ? { ...car, bookingDate: updatedBooking.bookingDate }
                : car
            )
          );
          closeModifyModal();
        } else {
          alert("Failed to update the booking. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error updating booking:", error);
        closeModifyModal();
      });
  };

  // Prepare data for Chart.js
  const prepareChartData = () => {
    // Extract rental prices from cars
    const rentalPrices = cars.map((car) => car.rent);

    // Define price ranges (you can adjust these as needed)
    const priceRanges = [
      { label: "$0 - $500", min: 0, max: 500 },
      { label: "$501 - $1000", min: 501, max: 1000 },
      { label: "$1001 - $1500", min: 1001, max: 1500 },
      { label: "$1501 - $2000", min: 1501, max: 2000 },
      { label: "$2001+", min: 2001, max: Infinity },
    ];

    // Count bookings in each price range
    const counts = priceRanges.map((range) => {
      return rentalPrices.filter(
        (price) => price >= range.min && price <= range.max
      ).length;
    });

    return {
      labels: priceRanges.map((range) => range.label),
      datasets: [
        {
          label: "Number of Bookings",
          data: counts,
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        precision: 0,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="p-4 flex justify-center">
      <div className="w-full sm:w-11/12 md:w-7/12 lg:w-7/12 mx-auto">
        {cars.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <FaRegSadTear className="text-6xl text-gray-400 mb-4" />
            <p className="text-xl text-gray-600">You have no bookings yet.</p>
          </div>
        ) : (
          <>
            {/* Chart Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Bookings by Daily Rental Price
              </h2>
              <div className="w-full h-64 md:h-96">
                <Bar data={prepareChartData()} options={chartOptions} />
              </div>
            </div>

            {/* Bookings Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 text-center">
                <thead className="bg-red-500 text-white text-lg">
                  <tr>
                    <th className="py-3 px-2 sm:px-4">Car Model</th>
                    <th className="py-3 px-2 sm:px-4">Total Price</th>
                    <th className="py-3 px-2 sm:px-4">Status</th>
                    <th className="py-3 px-2 sm:px-4">Booking Dates</th>
                    <th className="py-3 px-2 sm:px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-gray-700">
                  {cars.map((car) => {
                    // Extract booking dates
                    let startDate = "";
                    let endDate = "";
                    if (car.bookingDate) {
                      const dates = car.bookingDate.split(" to ");
                      startDate = dates[0] || "";
                      endDate = dates[1] || "";
                    }

                    // Calculate total price
                    const days = calculateDays(startDate, endDate);
                    const totalPrice = days * car.rent;

                    return (
                      <tr
                        key={car._id}
                        className="hover:bg-yellow-50 transition-colors"
                      >
                        <td className="border border-gray-200 py-3 px-2 sm:px-4">
                          <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="avatar">
                              <div className="mask mask-squircle h-16 w-16">
                                <img
                                  src={car.image}
                                  alt="Car"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-semibold text-base md:text-lg text-red-600">
                                {car.model}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="border border-gray-200 py-3 px-2 sm:px-4 font-medium">
                          <span className="text-red-500">${totalPrice}</span>
                        </td>

                        <td className="border border-gray-200 py-3 px-2 sm:px-4">
                          <span
                            className={`badge ${
                              car.availability === "available"
                                ? "badge-success"
                                : "badge-warning"
                            }`}
                          >
                            {car.availability}
                          </span>
                        </td>
                        <td className="border border-gray-200 py-3 px-2 sm:px-4">
                          <time className="text-yellow-600 font-medium">
                            {startDate && endDate
                              ? `${startDate} to ${endDate}`
                              : "N/A"}
                          </time>
                        </td>
                        <td className="border border-gray-200 py-3 px-2 sm:px-4">
                          <div className="flex flex-col sm:flex-row gap-2 justify-center">
                            {/* Cancel Button */}
                            <button
                              onClick={() => openCancelModal(car._id)}
                              className="btn btn-error btn-sm sm:btn-md flex items-center justify-center"
                            >
                              <FaTrash className="mr-1 sm:mr-2" />
                              <span className="hidden sm:inline">Cancel</span>
                            </button>
                            {/* Modify Date Button */}
                            <button
                              onClick={() => openModifyModal(car._id)}
                              className="btn btn-info btn-sm sm:btn-md flex items-center justify-center"
                            >
                              <FaCalendarAlt className="mr-1 sm:mr-2" />
                              <span className="hidden sm:inline">
                                Modify Date
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Confirmation Modal for Cancellation */}
        {isCancelModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md mx-auto">
              <h2 className="text-xl font-semibold mb-4">
                Confirm Cancellation
              </h2>
              <p className="mb-6">
                Are you sure you want to cancel this booking?
              </p>
              <div className="flex flex-col sm:flex-row justify-end gap-4">
                <button
                  onClick={confirmCancel}
                  className="btn btn-error w-full sm:w-auto"
                >
                  Yes
                </button>
                <button
                  onClick={closeCancelModal}
                  className="btn btn-secondary w-full sm:w-auto"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modification Modal */}
        {isModifyModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md mx-auto">
              <h2 className="text-xl font-semibold mb-4">
                Modify Booking Dates
              </h2>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Start Date:</label>
                <input
                  type="date"
                  value={newStartDate}
                  onChange={(e) => setNewStartDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">End Date:</label>
                <input
                  type="date"
                  value={newEndDate}
                  onChange={(e) => setNewEndDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-4">
                <button
                  onClick={confirmModify}
                  className="btn btn-primary w-full sm:w-auto"
                >
                  Confirm
                </button>
                <button
                  onClick={closeModifyModal}
                  className="btn btn-secondary w-full sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mybookings;
