import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../AuthContext/AuthContext";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-center loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user) return children;

  return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRouter;
