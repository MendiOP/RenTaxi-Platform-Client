import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Oopps...</title>
      </Helmet>
      <img
        src="https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif"
        alt="Error GIF"
        className="w-64 h-64"
      />
      <h1 className="mt-4 text-4xl font-bold text-gray-800">
        Oops! Something went wrong.
      </h1>
      <p className="mt-2 text-lg text-gray-600">
        We couldn't find the page you're looking for.
      </p>
      <button
        onClick={handleGoHome}
        className="mt-6 px-6 py-3 text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
