import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthContext/AuthContext";
import AddcarsModal from "./AddcarsModal";

const Mycar = () => {
  const [cars, setCars] = useState([]);
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [carToUpdate, setCarToUpdate] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/myCar?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
      })
      .catch((error) => console.error(error));
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/deleteCar/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your car has been deleted.", "success");
              setCars((prev) => prev.filter((car) => car._id !== id));
            }
          });
      }
    });
  };

  const handleUpdate = (car) => {
    setCarToUpdate(car);
    setShowModal(true);
  };

  const closeModal = () => {
    setCarToUpdate(null);
    setShowModal(false);
  };

  const parseBookingDate = (dateStr) => {
    const [day, month, year] = dateStr.split("-");
    return new Date(year, Number(month) - 1, day);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    let sortedCars = [...cars];

    switch (value) {
      case "date-asc":
        sortedCars.sort(
          (a, b) =>
            parseBookingDate(a.bookingDate) - parseBookingDate(b.bookingDate)
        );
        break;

      case "date-desc":
        sortedCars.sort(
          (a, b) =>
            parseBookingDate(b.bookingDate) - parseBookingDate(a.bookingDate)
        );
        break;

      case "price-asc":
        sortedCars.sort((a, b) => Number(a.rent) - Number(b.rent));
        break;

      case "price-desc":
        sortedCars.sort((a, b) => Number(b.rent) - Number(a.rent));
        break;

      default:
        break;
    }

    setCars(sortedCars);
  };

  return (
    <div className="max-w-7xl mx-auto bg-white px-4 py-8 mt-10 mb-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h2 className="text-3xl font-bold text-red-600">My Cars</h2>

        <select
          onChange={handleSortChange}
          defaultValue=""
          className="border border-red-500 px-4 py-2 rounded-xl text-red-600 text-lg font-bold
                     hover:bg-red-600 hover:text-white transition duration-300"
        >
          <option value="" disabled>
            Sort By
          </option>
          <option value="date-asc">Date (Ascending)</option>
          <option value="date-desc">Date (Descending)</option>
          <option value="price-asc">Price (Ascending)</option>
          <option value="price-desc">Price (Descending)</option>
        </select>
      </div>

      {cars.length === 0 ? (
        <div className="text-center mt-10">
          <h3 className="text-xl text-gray-700 mb-4">
            You haven&apos;t added any cars yet!
          </h3>
          {/* Link to Add Car page */}
          <Link
            to="/addCar"
            className="inline-block border border-red-500 px-6 py-2 rounded-2xl text-red-600 text-lg font-bold
                         hover:bg-red-600 hover:text-white transition duration-300"
          >
            Add Car
          </Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 text-center">
              <thead className="bg-red-500 text-white text-lg">
                <tr>
                  <th className="py-3 px-4">Car Model</th>
                  <th className="py-3 px-4">Daily Rental Price</th>
                  <th className="py-3 px-4">Booking Count</th>
                  <th className="py-3 px-4">Availability</th>
                  <th className="py-3 px-4">Added Date</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white text-gray-700">
                {cars.map((car) => (
                  <tr
                    key={car._id}
                    className="hover:bg-yellow-50 transition-colors"
                  >
                    <td className="border border-gray-200 py-3 px-4">
                      <div className="flex items-center gap-4">
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
                    <td className="border border-gray-200 py-3 px-4 font-medium">
                      <span className="text-red-500">${car.rent}</span>
                    </td>
                    <td className="border border-gray-200 py-3 px-4 font-medium">
                      {car.bookingCount}
                    </td>
                    <td className="border border-gray-200 py-3 px-4">
                      <span className="badge badge-success">
                        {car.availability}
                      </span>
                    </td>
                    <td className="border border-gray-200 py-3 px-4">
                      <time className="text-yellow-600 font-medium">
                        {car.bookingDate}
                      </time>
                    </td>
                    <td className="border border-gray-200 py-3 px-4">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleDelete(car._id)}
                          className="btn btn-error btn-lg"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleUpdate(car)}
                          className="btn btn-info btn-lg"
                        >
                          Update
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showModal && (
            <AddcarsModal onClose={closeModal} carData={carToUpdate} />
          )}
        </>
      )}
    </div>
  );
};

export default Mycar;
