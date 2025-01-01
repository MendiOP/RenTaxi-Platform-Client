import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthContext/AuthContext";

const AddcarsModal = ({ onClose, carData, onCarUpdated }) => {
  const { user } = useContext(AuthContext);

  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  const initialDetails = {
    model: "",
    rent: 0,
    registrationNumber: "",
    availability: "",
    features: "",
    description: "",
    bookingCount: 0,
    image: "",
    location: "",
    userName: user.displayName,
    userEmail: user.email,
    bookingDate: formattedDate,
  };

  // If we have carData, we use it to populate the form (Update); else use initialDetails (Add)
  const [details, setDetails] = useState(carData);

  // Watch for changes in carData (e.g., different "Update" click)
  useEffect(() => {
    if (carData) {
      setDetails(carData);
    } else {
      setDetails(initialDetails);
    }
  }, [carData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // If we have details._id, then we do update

    fetch(`http://localhost:5000/updateCar/${details._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Car details have been updated.",
            icon: "success",
            confirmButtonText: "OK",
          });
          onCarUpdated(details);
          onClose();
        }
      })
      .catch((error) => {
        console.error("Error updating car:", error);
        Swal.fire({
          title: "Error!",
          text: "Could not update the car. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    /* 
      Overlay: We use "absolute" + "top-0 left-0 w-full h-full" so it 
      doesn't lock scrolling of the background. It's semi-transparent 
      but doesn't prevent scrolling behind it.
    */
    <div className="absolute top-0 left-0 w-full h-full z-50 bg-black bg-opacity-50 flex items-start justify-center">
      {/* Modal container: smaller max-height & scrollable content */}
      <div className="mt-10 w-full max-w-[740px] max-h-[80vh] overflow-y-auto rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:p-11 relative">
        <h2 className="mb-6 text-center text-2xl font-bold text-white lg:mb-8 lg:text-[28px]">
          {details._id ? "Update Car" : "Add a New Car"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 text-white lg:space-y-8">
            {/* Car Model */}
            <div className="space-y-2">
              <label htmlFor="model">Car Model</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="model"
                id="model"
                value={details.model}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description">Description</label>
              <textarea
                className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                name="description"
                id="description"
                value={details.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Features */}
            <div className="space-y-2">
              <label htmlFor="features">Features</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="features"
                id="features"
                value={details.features}
                onChange={handleChange}
                required
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <label htmlFor="image">Image URL</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="image"
                id="image"
                value={details.image}
                onChange={handleChange}
                required
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label htmlFor="location">Location</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="location"
                id="location"
                value={details.location}
                onChange={handleChange}
                required
              />
            </div>

            {/* Vehicle Registration Number */}
            <div className="space-y-2">
              <label htmlFor="registrationNumber">
                Vehicle Registration Number
              </label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="registrationNumber"
                id="registrationNumber"
                value={details.registrationNumber}
                onChange={handleChange}
                required
              />
            </div>

            {/* Daily Rent & Availability */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Daily Rent */}
              <div className="space-y-2">
                <label htmlFor="rent">Daily Rent</label>
                <input
                  className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                  type="number"
                  name="rent"
                  id="rent"
                  value={details.rent}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Availability */}
              <div className="space-y-2">
                <label htmlFor="availability">Availability</label>
                <select
                  className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                  name="availability"
                  id="availability"
                  value={details.availability}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Availability</option>
                  <option value="available">Available</option>
                  <option value="notAvailable">Not Available</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="rounded bg-red-600 px-4 py-2 text-white hover:opacity-80"
            >
              Close
            </button>
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:opacity-80"
            >
              {details._id ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddcarsModal;
