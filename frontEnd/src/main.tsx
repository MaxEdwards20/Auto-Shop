import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App";
import NavBar from "./Components/Navbar";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NavBar />
    <App />
  </React.StrictMode>
);
