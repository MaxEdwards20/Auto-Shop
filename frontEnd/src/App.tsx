import { BrowserRouter } from "react-router-dom";
import Router from "./components/Router";
import NavBar from "./components/Navbar";
import { AuthContext } from "./contexts/AuthContext";
import { useUserInfo } from "./hooks/useApi";
import { useEffect } from "react";

function App() {
  const {
    user,
    setNewUser,
    logout,
    api,
    isAuthenticated,
    userPermission,
    vehicles,
    setNewVehicles,
  } = useUserInfo();

  return (
    <AuthContext.Provider
      value={{
        user,
        setNewUser,
        logout,
        api,
        isAuthenticated,
        userPermission,
        vehicles,
        setNewVehicles,
      }}
    >
      <BrowserRouter>
        <NavBar></NavBar>
        <Router></Router>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
