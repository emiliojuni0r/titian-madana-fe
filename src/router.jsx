import { createBrowserRouter } from "react-router";
import MainLayout from "./layout/MainLayout";
import Login from "./modules/login/Login";
import Dashboard from "./modules/dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Analitik from "./modules/analitik/Analitik";
import Tender from "./modules/tender/Tender";
import Monitoring from "./modules/monitoring/Monitoring";
import Arsip from "./modules/arsip/Arsip";
import AccountManagement from "./modules/register/AccountManagement";
import RoleRoute from "./components/RoleRoute";

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />, // ini route guard (redirect ke login jika blm auth)
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
          {
            path: '/arsip',
            element: <Arsip />,
          },
          {
            path: '/monitoring',
            element: <Monitoring />,
          },
          {
            element: <RoleRoute allowedRoles={['superadmin']} />, // 2. Guard Role: Wajib Superadmin
            children: [
              {
                path: 'manageAccount',
                element: <AccountManagement />
              },
              {
                path: 'scraping',
                element: <Tender />
              }
            ]
          }
        ],
      },
    ]
  },
  {
    path: 'login',
    element: <Login />,
  },

])