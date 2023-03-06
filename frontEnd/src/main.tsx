import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./components/Router";
import NavBar from "./components/Navbar";
import App from "./App";
import "./index.css";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";

// See tutorial at https://reactrouter.com/en/main/start/tutorial

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App></App>
  </React.StrictMode>
);
