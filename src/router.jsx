import { createBrowserRouter } from "react-router";
import MainLayout from "./layout/MainLayout";
import Login from "./modules/login/Login";
import Register from "./modules/register/Register";
import Dashboard from "./modules/dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true, // "index: true" means this page renders at the base parent path ("/")
        element: <Dashboard />,
      },
    ],
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