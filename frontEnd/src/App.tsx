import { BrowserRouter } from "react-router-dom";
import Router from "./components/Router";
import NavBar from "./components/Navbar";
import { UserContext } from "./contexts/AuthContext";
import { useUserInfo } from "./hooks/useUserInfo";
import { useEffect } from "react";

function App() {
  const {
    user,
    setNewUser,
    logout,
    api,
    vehicles,
    setNewVehicles,
    manager,
    setNewManager,
  } = useUserInfo();


  return (
    <UserContext.Provider
      value={{
        user,
        setNewUser,
        logout,
        api,
        isAuthenticated,
        vehicles,
        setNewVehicles,
        manager,
        setNewManager,
      }}
    >
      <BrowserRouter>
        <NavBar></NavBar>
        <Router></Router>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
