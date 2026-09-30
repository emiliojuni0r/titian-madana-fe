import { createBrowserRouter } from "react-router";
import MainLayout from "./layout/MainLayout";
import Login from "./modules/login/Login";
import Register from "./modules/register/Register";
import Dashboard from "./modules/dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Analitik from "./modules/analitik/Analitik";
import Tender from "./modules/tender/Tender";

export const router = createBrowserRouter([
  {
    // element: <ProtectedRoute />, // ini route guard (redirect ke login jika blm auth)
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: '/tender',
            element: <Tender />,
          },
          {
            path: '/analitik',
            element: <Analitik />,
          },
        ],
      },
    ]
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'register',
    element: <Register />
  }

])