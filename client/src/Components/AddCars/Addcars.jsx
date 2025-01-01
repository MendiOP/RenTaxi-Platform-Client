import { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthContext/AuthContext";

const Addcars = () => {
  const { user } = useContext(AuthContext);
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  const initialDetails = {
    model: "",
    rent: "",
    registrationNumber: "",
    availability: "",
    features: "",
    description: "",
    bookingCount: 0,
    image: "",
    location: "",
    userName: user?.displayName || "",
    userEmail: user?.email || "",
    bookingDate: formattedDate,
  };

  const [details, setDetails] = useState(initialDetails);
  const [isSubmitting, setIsSubmitting] = useState(false); // New loading state

  const handleChange = (event) => {
    const { name, value } = event.target;

    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true); // Start loading

    try {
      const res = await fetch("http://localhost:5000/addCar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });

      const data = await res.json();

      if (res.ok && data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Your car has been added.",
          icon: "success",
          confirmButtonText: "OK",
        });
        setDetails(initialDetails); // Reset form
      } else {
        throw new Error(data.message || "Failed to add car.");
      }
    } catch (error) {
      console.error("Error adding car:", error);
      Swal.fire({
        title: "Error!",
        text: "Could not add the car. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsSubmitting(false); // End loading
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add Car - RenTaxi</title>
      </Helmet>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Add a New Car
        </h2>

        {/* Car Model */}
        <div className="space-y-2">
          <label htmlFor="model" className="block text-gray-700 font-medium">
            Car Model
          </label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="model"
            id="model"
            value={details.model}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            placeholder="Enter the car model"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium"
          >
            Description
          </label>
          <textarea
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="description"
            id="description"
            value={details.description}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            placeholder="Enter a brief description of the car"
            rows="4"
          />
        </div>

        {/* Features */}
        <div className="space-y-2">
          <label htmlFor="features" className="block text-gray-700 font-medium">
            Features
          </label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="features"
            id="features"
            value={details.features}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            placeholder="List key features (e.g., GPS, AC)"
          />
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <label htmlFor="image" className="block text-gray-700 font-medium">
            Image URL
          </label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="url"
            name="image"
            id="image"
            value={details.image}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            placeholder="https://example.com/car-image.jpg"
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label htmlFor="location" className="block text-gray-700 font-medium">
            Location
          </label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="location"
            id="location"
            value={details.location}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            placeholder="Enter the location"
          />
        </div>

        {/* Vehicle Registration Number */}
        <div className="space-y-2">
          <label
            htmlFor="registrationNumber"
            className="block text-gray-700 font-medium"
          >
            Vehicle Registration Number
          </label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="registrationNumber"
            id="registrationNumber"
            value={details.registrationNumber}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            placeholder="e.g., ABC-1234"
          />
        </div>

        {/* Daily Rent and Availability */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Daily Rent */}
          <div className="space-y-2">
            <label htmlFor="rent" className="block text-gray-700 font-medium">
              Daily Rent ($)
            </label>
            <input
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              name="rent"
              id="rent"
              value={details.rent}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              min="0"
              placeholder="e.g., 50"
            />
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <label
              htmlFor="availability"
              className="block text-gray-700 font-medium"
            >
              Availability
            </label>
            <select
              className="w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="availability"
              id="availability"
              value={details.availability}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            >
              <option value="">Select Availability</option>
              <option value="available">Available</option>
              <option value="notAvailable">Not Available</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="reset"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors disabled:opacity-50"
            disabled={isSubmitting}
          >
            Reset
          </button>
          <button
            type="submit"
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center ${
              isSubmitting ? "cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
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
                Saving...
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addcars;
