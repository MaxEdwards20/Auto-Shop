import { Route, Routes } from "react-router-dom";
import ErrorPage from "../pages/error-page";
import HomePage from "../pages/home-page";
import ReservationPage from "../pages/reservation-page";
import Dashboard from "../pages/account-dashboard";
import LoginPage from "../pages/login-page";
import VehiclePage from "../pages/vehicle-page";
import AdminPage from "../pages/admin-page";
import CreateAccount from "./CreateAccount";
import { useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
function Router() {
  const { vehicles, setNewVehicles, api } = useContext(AuthContext);
  // Load all the vehicles into the context
  useEffect(() => {
    api.getAllVehicles().then((cars) => {
      if (!cars) {
        return;
      }
      setNewVehicles(cars);
    });
  }, []);

  return (
    // See tutorial at https://www.youtube.com/watch?v=Ul3y1LXxzdU
    <Routes>
      <Route path="/" element={<HomePage></HomePage>} />
      <Route path="/home" element={<HomePage></HomePage>} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/reservations" element={<ReservationPage />} />
      <Route path="/vehicles" element={<VehiclePage />} />
      <Route path="/account">
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="create" element={<CreateAccount />} />
      </Route>
      <Route path="/vehicles/new"></Route>
      <Route path="*" element={<ErrorPage />}></Route>
    </Routes>
  );
}
export default Router;
