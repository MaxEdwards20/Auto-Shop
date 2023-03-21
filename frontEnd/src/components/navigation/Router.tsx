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
import { ManagerPayEmployees } from "../manager/ManagerPayEmployees";
import { LogHours } from "../employee/LogHours";
import { CheckoutVehicle } from "../employee/CheckoutVehicle";
import { HelpUsers } from "../employee/HelpUsers";
import { EthicsViolation } from "../user/EthicsViolation";
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
      <Route path="/manager">
        <Route path="employees" element={<ManagerPayEmployees />}></Route>
        <Route path="purchase" element={<ManagerPurchaseVehicle />}></Route>
        <Route path="users" element={<ManagerUpdateUser />}></Route>
      </Route>
      <Route path="/employee">
        <Route path="hours" element={<LogHours />}></Route>
        <Route path="checkout-vehicle" element={<CheckoutVehicle />}></Route>
      </Route>
      <Route path="/reservations" element={<ReservationPage />} />
      <Route path="/help-users" element={<HelpUsers />}></Route>
      <Route path="/vehicles" element={<VehiclePage />} />
      <Route path="/user/ethics-violation" element={<EthicsViolation />} />
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
