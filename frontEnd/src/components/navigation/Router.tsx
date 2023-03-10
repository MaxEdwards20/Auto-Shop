import { Route, Routes } from "react-router-dom";
import { useEffect, useContext } from "react";
import ErrorPage from "../../pages/error-page";
import HomePage from "../../pages/home-page";
import ReservationPage from "../../pages/reservation-page";
import Dashboard from "../../pages/account-dashboard";
import LoginPage from "../../pages/login-page";
import VehiclePage from "../../pages/vehicle-page";
import { ManagerPage } from "../../pages/manager-page";
import CreateAccountForm from "../user/CreateAccount";
import { UserContext } from "../../contexts/UserContext";
import { initializeFrontend } from "../../hooks/initializers";
import { UnAuthDashboard } from "../user/UnAuthDashboard";
import { VehicleContext } from "../../contexts/VehicleContext";
import { ManagerContext } from "../../contexts/ManagerContext";
import { ManagerUpdateUser } from "../manager/ManagerUpdateUser";
import { ManagerPurchaseVehicle } from "../manager/ManagerPurchaseVehicle";
function Router() {
  const { setNewVehicles } = useContext(VehicleContext);
  const { setNewManager } = useContext(ManagerContext);
  const { api } = useContext(UserContext);
  // Load all the vehicles into the context
  useEffect(() => {
    initializeFrontend({ api, setNewVehicles, setNewManager });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage></HomePage>} />
      <Route path="/home" element={<HomePage></HomePage>} />
      <Route path="/manager" element={<ManagerPage />}>
        <Route path="employees"></Route>
        <Route path="purchase" element={<ManagerPurchaseVehicle />}></Route>
        <Route path="users" element={<ManagerUpdateUser />}></Route>
      </Route>
      <Route path="/reservations" element={<ReservationPage />} />
      <Route path="/vehicles" element={<VehiclePage />} />
      <Route path="/account">
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="create" element={<CreateAccountForm />} />
      </Route>
      <Route
        path="/unauthorized"
        element={<UnAuthDashboard></UnAuthDashboard>}
      ></Route>

      <Route path="*" element={<ErrorPage />}></Route>
    </Routes>
  );
}
export default Router;
