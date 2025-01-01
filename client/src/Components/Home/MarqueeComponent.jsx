import React from "react";
import Marquee from "react-fast-marquee";

const MarqueeComponent = () => {
  return (
    <section className="w-full bg-tealDark py-4">
      <div className="max-w-7xl mx-auto">
        <Marquee
          gradient={false}
          speed={50}
          pauseOnHover={true}
          className="flex items-center"
        >
          <div className="flex space-x-8">
            <span className="text-white text-lg font-semibold flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-tealLight"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7h18M3 12h18m-9 5h9"
                />
              </svg>
              Special Offer: 20% Off on All Bookings!
            </span>
            <span className="text-white text-lg font-semibold flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-tealLight"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.65-4.275A9.863 9.863 0 011 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              New Arrivals: Latest Models Available Now!
            </span>
            <span className="text-white text-lg font-semibold flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-tealLight"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Limited Time: Free Pickup and Drop-off Services!
            </span>
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default MarqueeComponent;
