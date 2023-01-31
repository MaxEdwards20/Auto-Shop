import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App";
import NavBar from "./Components/Navbar";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import ErrorPage from "./error-page";

// See tutorial at https://reactrouter.com/en/main/start/tutorial
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NavBar />
    <RouterProvider router={router} />
  </React.StrictMode>
);
