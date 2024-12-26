import { updateProfile } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthContext/AuthContext";

const Register = () => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { createUser } = useContext(AuthContext);

  const validatePassword = (value) => {
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const isLongEnough = value.length >= 6;

    if (!hasUppercase) {
      setPasswordError("Password must have at least one uppercase letter.");
    } else if (!hasLowercase) {
      setPasswordError("Password must have at least one lowercase letter.");
    } else if (!isLongEnough) {
      setPasswordError("Password must be at least 6 characters long.");
    } else {
      setPasswordError("");
    }

    setPassword(value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        return updateProfile(user, {
          displayName: name,
          photoURL: photoUrl,
        }).then(() => {
          console.log("Registration successful!");
          Swal.fire({
            title: `Hello ${name}!`,
            text: "You have successfully Registered!",
            icon: "success",
          });
          setIsRegistered(true);
        });
      })
      .catch((error) => {
        setPasswordError(error.message);
        console.error(error);
      })
      .finally(() => setLoading(false));

    setEmail("");
    setName("");
    setPhotoUrl("");
    setPassword("");
  };

  if (isRegistered) {
    console.log("Redirecting to login...");
    return <Navigate to="/" />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Register - RenTaxi</title>
        </Helmet>
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        <p className="ml-4 text-lg font-semibold">
          Registering, please wait...
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 dark:bg-faltu">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register - RenTaxi</title>
      </Helmet>
      <div className="w-full max-w-md bg-white px-8 py-3 rounded-xl shadow-md space-y-6 dark:bg-teal-600 mx-auto">
        <ToastContainer />
        <h1 className="text-2xl font-semibold text-gray-700 text-center">
          Create an Account
        </h1>

        <form className="space-y-5" onSubmit={handleFormSubmit}>
          {/* Name Input */}
          <div>
            <label className="block mb-2 text-lg font-semibold text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your full name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block mb-2 text-lg font-semibold text-gray-600">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Photo URL Input */}
          <div>
            <label className="block mb-2 text-lg font-semibold text-gray-600">
              Photo URL
            </label>
            <input
              type="url"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="Enter your photo URL"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="block mb-2 text-lg font-semibold text-gray-600">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none ${
                  passwordError
                    ? "border-red-500"
                    : "focus:ring focus:ring-blue-300"
                }`}
                value={password}
                onChange={(e) => validatePassword(e.target.value)}
                placeholder="Create a strong password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Password Error Message */}
            {passwordError && (
              <p className="mt-2 text-sm text-red-500">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
          >
            Register
          </button>
        </form>

        {/* Link to Login */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline font-semibold"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
