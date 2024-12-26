import { createBrowserRouter } from "react-router-dom";
import Addcars from "../Components/AddCars/Addcars";
import CarDetails from "../Components/Cardetails/Cardetails";
import Home from "../Components/Home/Home";
import PrivateRouter from "../Components/PrivateRoute/PrivateRoute";
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
        element: (
          <PrivateRouter>
            <Addcars></Addcars>
          </PrivateRouter>
        ),
      },
      {
        path: "/mycar",
        element: (
          <PrivateRouter>
            <MyCar></MyCar>
          </PrivateRouter>
        ),
      },
      {
        path: "/mybookings",
        element: (
          <PrivateRouter>
            <Mybookings></Mybookings>
          </PrivateRouter>
        ),
      },
      {
        path: "/carDetails/:id",
        element: (
          <PrivateRouter>
            <CarDetails></CarDetails>
          </PrivateRouter>
        ),
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
