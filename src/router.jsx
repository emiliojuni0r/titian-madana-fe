import { createBrowserRouter } from "react-router";
import MainLayout from "./layout/MainLayout";
import Login from "./modules/login/Login";
import Register from "./modules/register/Register";
import Dashboard from "./modules/dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

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
            path: '/analitik',
            element: <Dashboard />,
          },
        ],
      },
      // Kamu bisa menambahkan halaman internal lainnya di sini
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