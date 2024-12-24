import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home";
import Addcars from "./../Components/AddCars/Addcars";
import Availablecars from "./../Components/AvailableCars/Availablecars";
import ErrorPage from "./../Components/Error/ErrorPage";
import Login from "./../Components/Login/Login";
import MyCar from "./../Components/MyCar/MyCar";
import Mybookings from "./../Components/Mybookings/Mybookings";
import Register from "./../Components/Register/Register";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/availablecars",
        element: <Availablecars></Availablecars>,
      },
      {
        path: "/addcar",
        element: <Addcars></Addcars>,
      },
      {
        path: "/mycar",
        element: <MyCar></MyCar>,
      },
      {
        path: "/mybookings",
        element: <Mybookings></Mybookings>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default Router;
