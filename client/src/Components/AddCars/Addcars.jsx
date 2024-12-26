import { useState } from "react";

const Addcars = () => {
  const [details, setDetails] = useState({
    id: crypto.randomUUID(),
    model: "",
    rent: 0,
    registrationNumber: "",
    availability: "",
    features: [],
    description: "",
    bookingCount: 0,
    image: "",
    location: "",
  });

  const handleChange = (evt) => {
    const name = evt.target.name;
    let value = evt.target.value;

    if (name === "features") {
      value = value.split(",");
    }

    setDetails({
      ...details,
      [name]: value,
    });
  }
  return (
    <>
      <form className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11">
        <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]"></h2>

        {/* <!-- inputs --> */}
        <div className="space-y-9 text-white lg:space-y-10">
          {/* <!-- Model --> */}
          <div className="space-y-2 lg:space-y-3">
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
          {/* <!-- description --> */}
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="description">Description</label>
            <textarea
              className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
              type="text"
              name="description"
              id="description"
              value={details.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* <!-- Features --> */}
          <div className="space-y-2 lg:space-y-3">
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
          {/* <!-- Image url --> */}
          <div className="space-y-2 lg:space-y-3">
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
          {/* <!-- Location --> */}
          <div className="space-y-2 lg:space-y-3">
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
          {/* <!-- Vehicle Registration Number --> */}
          <div className="space-y-2 lg:space-y-3">
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

          {/* <!-- input group --> */}
          <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
            {/* <!--daily rent --> */}
            <div className="space-y-2 lg:space-y-3">
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
            {/* <!-- Availability --> */}
            <div className="space-y-2 lg:space-y-3">
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
        {/* <!-- inputs ends --> */}
        <div className="mt-16 flex justify-between lg:mt-20">
          <button className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80">
            Close
          </button>
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default Addcars;
