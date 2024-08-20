import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import Layout from "../components/layout/Layout";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute"; // ProtectedRoute import
import LocationPage from "../pages/LocationPage";
import InfoPage from "../pages/InfoPage";

const Router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/location",
    element: (
      <ProtectedRoute>
        <LocationPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/info",
    element: (
      <ProtectedRoute>
        <InfoPage />
      </ProtectedRoute>
    ),
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default Router;
