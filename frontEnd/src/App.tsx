import { BrowserRouter } from "react-router-dom";
import Router from "./components/Router";
import NavBar from "./components/Navbar";
import { useState } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Api } from "./lib/api";
import { useUserInfo } from "./hooks/useApi";

function App() {
  const { user, login, logout, api, isAuthenticated, userPermission } =
    useUserInfo();
  return (
    <AuthContext.Provider
      value={{ user, login, logout, api, isAuthenticated, userPermission }}
    >
      <BrowserRouter>
        <NavBar></NavBar>
        <Router></Router>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
