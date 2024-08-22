import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import Layout from "../components/layout/Layout";
import LoginPage from "../pages/LoginPage";
import ProtectedRoute from "./ProtectedRoute"; // ProtectedRoute import
import LocationPage from "../pages/LocationPage";
import InfoPage from "../pages/InfoPage";
import NotFoundPage from "../pages/NotFoundPage";
import Loading from "../pages/Loading";
import ShopMain from "../pages/Shop/ShopMain";
import ProductDetail from "../pages/Shop/ProductDetail";


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
    path: "/loading",
    element: (
      <ProtectedRoute>
        <Loading />
      </ProtectedRoute>
    ),
  },
  {
    path: "/shop",
    element: (
      <ProtectedRoute>
        <ShopMain />
      </ProtectedRoute>
    ),
  },
  {
    path: "/shop/:id", // New Route for ProductDetail
    element: (
      <ProtectedRoute>
        <ProductDetail />
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
  {
    path: "*",
    element: <NotFoundPage />, // 404 페이지 추가
  },
]);

export default Router;
