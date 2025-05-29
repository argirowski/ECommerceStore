import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import App from "../layout/App";
import ProductDetails from "../../features/catalogue/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import { ContactPage } from "@mui/icons-material";
import Catalogue from "../../features/catalogue/Catalogue";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import LoginForm from "../../features/account/LoginForm";
import RegisterForm from "../../features/account/RegisterForm";
import RequireAuth from "./RequireAuth";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import CheckoutSuccess from "../../features/checkout/CheckoutSuccess";
import OrdersPage from "../../features/orders/OrdersPage";
import OrdersDetailedPage from "../../features/orders/OrdersDetailedPage";
import InventoryPage from "../../features/admin/InventoryPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          { path: "checkout", element: <CheckoutPage /> },
          { path: "checkout/success", element: <CheckoutSuccess /> },
          { path: "orders", element: <OrdersPage /> },
          { path: "orders/:id", element: <OrdersDetailedPage /> },
          { path: "inventory", element: <InventoryPage /> },
        ],
      },
      { path: "", element: <HomePage /> },
      { path: "products", element: <Catalogue /> },
      { path: "products/:id", element: <ProductDetails /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "basket", element: <BasketPage /> },
      { path: "server-error", element: <ServerError /> },
      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterForm /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
