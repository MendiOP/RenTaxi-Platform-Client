import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import AuthProviderContext from "./AuthProviderContext/AuthProviderContext";
import "./index.css";
import router from "./Router/Router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProviderContext>
      <RouterProvider router={router} />
    </AuthProviderContext>
  </StrictMode>
);
