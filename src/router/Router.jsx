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
import MyPage from "../pages/MyPage";
import Graph from "../pages/Graph/Graph";
import ShopCart from "../pages/Shop/ShopCart";
import CollectionPage from "../pages/CollectionPage";
import CreatePage from "../pages/CreatePage";
import HowMain from "../pages/How/HowMain";
import TransactionHistory from "../pages/TransactionHistory";
import HowDetail from "../pages/How/HowDetail";
import ShopPurchaseHistory from "../pages/Shop/ShopPurchaseHistory";
import CollectionDetailPage from "../pages/CollectionDetailPage";

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
    path: "/how",
    element: (
      <ProtectedRoute>
        <HowMain />
      </ProtectedRoute>
    ),
  },
  {
    path: "/how/:category",
    element: (
      <ProtectedRoute>
        <HowDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/graph",
    element: (
      <ProtectedRoute>
        <Graph />
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
    path: "/shop/:id", // Route for ProductDetail
    element: (
      <ProtectedRoute>
        <ProductDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/cart",
    element: (
      <ProtectedRoute>
        <ShopCart />
      </ProtectedRoute>
    ),
  },
  {
    path: "/shophistory",
    element: (
      <ProtectedRoute>
        <ShopPurchaseHistory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/collection",
    element: (
      <ProtectedRoute>
        <CollectionPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/collection/:id",
    element: (
      <ProtectedRoute>
        <CollectionDetailPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/create",
    element: (
      <ProtectedRoute>
        <CreatePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/recycle",
    element: (
      <ProtectedRoute>
        <TransactionHistory />
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
      {
        path: "/my",
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />, // 404 page
  },
]);

export default Router;
