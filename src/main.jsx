import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './Components/Home/Home.jsx';
import Login from './Components/Login/Login.jsx';
import Register from './Components/Register/Register.jsx';
import AuthProvider from './Components/contexts/AuthContext/AuthProvider.jsx';
import AddCar from './Components/Add Car/AddCar.jsx';
import PrivateRoute from './Components/Routers/PrivateRoute.jsx';
import MyListings from './Components/My Listings/MyListings.jsx';
import MyBookings from './Components/My Bookings/MyBookings.jsx';
import BrowseCars from './Components/Browse Cars/BrowseCars.jsx';
import PageNotFound404 from './Components/PageNotFound404/PageNotFound404.jsx';
import CarDetails from './Components/CarDetails/CarDetails.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        loader: () => fetch('http://localhost:2005/newestCars'),
        Component: Home,
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/register',
        Component: Register,
      },
      {
        path: '/addCar',
        element: <PrivateRoute><AddCar></AddCar></PrivateRoute>,
      },
      {
        path: '/myListings',
        loader: () => fetch('http://localhost:2005/newestCars'),
        element: <PrivateRoute><MyListings></MyListings></PrivateRoute>,
      },
      {
        path: '/myBookings',
        element: <PrivateRoute><MyBookings></MyBookings></PrivateRoute>,
      },
      {
        path: '/browseCars',
        loader: () => fetch("http://localhost:2005/cars"),
        Component: BrowseCars,
      },
      {
        path: '/car/:id',
        loader: ({params}) => fetch(`http://localhost:2005/cars/${params.id}`),
        element: <PrivateRoute><CarDetails></CarDetails></PrivateRoute>,
      }
    ]
  },
  {
    path: '*',
    Component: PageNotFound404,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
