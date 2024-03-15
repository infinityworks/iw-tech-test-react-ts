import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import HomePage from "./routes/HomePage";
import Establishment from "./routes/Establishment";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { EstablishmentFavouriteProvider } from "./components/EstablishmentFavoriteTable";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/establishment/:establishmentId",
    element: <Establishment />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <EstablishmentFavouriteProvider>
        <RouterProvider router={router} />
      </EstablishmentFavouriteProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
