import { BrowserRouter } from "react-router-dom";
import Router from "./components/Router";
import NavBar from "./components/Navbar";
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
