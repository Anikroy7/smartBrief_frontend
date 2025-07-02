import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFoundPage from "../pages/NotFound";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DashboardLayout from "../components/layouts/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import Summaries from "../pages/dashboard/Summaries";
import UserManagement from "../pages/dashboard/UserManagement";
import PrivateRoute from "../pages/auth/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "summaries", element: <Summaries /> },
      { path: "users", element: <UserManagement /> },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
