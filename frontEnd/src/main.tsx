import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Components/Router";
import NavBar from "./Components/Navbar";
import App from "./App";
import "./index.css";
import "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

// See tutorial at https://reactrouter.com/en/main/start/tutorial

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
);
