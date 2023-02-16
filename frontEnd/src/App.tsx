import { BrowserRouter } from "react-router-dom";
import Router from "./Components/Router";
import NavBar from "./Components/Navbar";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { AuthProvider } from "./context/AuthContext";
function App() {
  useContext(AuthContext);
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Router></Router>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
