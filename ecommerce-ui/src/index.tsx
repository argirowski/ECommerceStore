import React from "react";
import ReactDOM from "react-dom/client";
import "./app/layout/styles.css";
import { RouterProvider } from "react-router";
import { router } from "./app/routes/Routes";
import { Provider } from "react-redux";
import { store } from "./app/store/store";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
