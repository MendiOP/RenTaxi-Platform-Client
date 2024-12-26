import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthContext/AuthContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const from = location.state?.from?.pathname || "/";
  localStorage.setItem("email", email);

  const { signInUser, signInWithGoogle } = useContext(AuthContext);

  const handleLogin = (event) => {
    event.preventDefault();

    setLoading(true);
    signInUser(email, password)
      .then((userCredential) => {
        Swal.fire({
          title: `Welcome Back ${userCredential.user.displayName}!`,
          text: "You have successfully Logged In!",
          icon: "success",
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(true);
      })
      .finally(() => setLoading(false));

    setEmail("");
    setPassword("");
    setError("");
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log("Google Sign-In successful:", user);
        Swal.fire({
          title: `Welcome ${user.displayName}!`,
          text: "You have successfully Logged In!",
          icon: "success",
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Google Sign-In error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        <p className="ml-4 text-lg font-semibold">Logging, please wait...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-fit justify-center bg-gray-100 px-4 mt-10  mb-10 p-5">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md space-y-6">
        {/* Form Title */}
        <h1 className="text-2xl font-semibold text-gray-700 text-center">
          Login to Your Account
        </h1>

        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email Input */}
          <div>
            <label className="block mb-2 text-lg font-semibold text-gray-600">
              Email
            </label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <span className="flex items-center px-4 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
              </span>
              <input
                type="email"
                className="w-full px-4 py-2 text-gray-700 focus:outline-none dark:text-faltu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          {/* Password Input */}
          <div>
            <label className="block mb-2 text-lg font-semibold text-gray-600">
              Password
            </label>
            <div className="flex items-center border rounded-lg overflow-hidden relative">
              {/* Lock Icon */}
              <span className="flex items-center px-4 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>

              {/* Password Input */}
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 text-gray-700 focus:outline-none dark:text-faltu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />

              {/* Eye Icon for Toggling Password Visibility */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-500"
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          {/* Error Message for invalid login */}
          <div className="mb-4">
            {error && (
              <div className="flex items-center p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <p className="text-base font-bold">
                  Invalid credentials or login issue. Try again.
                </p>
              </div>
            )}
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
          >
            Login
          </button>
        </form>

        {/* Google Login */}
        <div className="text-center">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 flex items-center justify-center gap-2 border rounded-lg text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="h-5 w-5"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.69 0 6.54 1.5 8.45 2.93l6.25-6.25C34.7 3.09 29.8 1 24 1 14.64 1 6.92 6.55 3.37 14.2l7.25 5.64C12.88 14.45 18 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.63 24c0-1.55-.14-3.05-.4-4.5H24v9.04h12.6C34.44 32.75 29.8 36 24 36c-6 0-11.1-4.95-12.38-11.35l-7.25 5.64C6.92 41.45 14.64 47 24 47c11.91 0 22-8.69 22-23z"
              />
            </svg>
            Sign in with Google
          </button>
        </div>

        {/* Register Redirect */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:underline font-semibold"
          >
            Register here
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
