import { BrowserRouter } from "react-router-dom";
import Router from "./components/navigation/Router";
import NavBar from "./components/navigation/Navbar";
import { UserContext } from "./contexts/UserContext";
import { useUserInfo } from "./hooks/useUserInfo";
import { useVehicleInfo } from "./hooks/useVehicleInfo";
import { useManagerInfo } from "./hooks/useManagerInfo";
import { useEffect } from "react";
import { VehicleContext } from "./contexts/VehicleContext";
import { ManagerContext } from "./contexts/ManagerContext";

function App() {
  const {
    user,
    setNewUser,
    logout,
    api,
    addMoney,
    subtractMoney,
    addNewReservation,
  } = useUserInfo();
  const { vehicles, setNewVehicles } = useVehicleInfo();
  const { manager, setNewManager } = useManagerInfo();

  return (
    <VehicleContext.Provider value={{ vehicles, setNewVehicles }}>
      <ManagerContext.Provider value={{ manager, setNewManager }}>
        <UserContext.Provider
          value={{
            user,
            setNewUser,
            logout,
            api,
            addMoney,
            subtractMoney,
            addNewReservation,
          }}
        >
          <BrowserRouter>
            <NavBar></NavBar>
            <Router></Router>
          </BrowserRouter>
        </UserContext.Provider>
      </ManagerContext.Provider>
    </VehicleContext.Provider>
  );
}

export default App;
