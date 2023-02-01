import { Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/error-page";
import HomePage from "./pages/home-page";
import ReservationPage from "./pages/reservation-page";
import AccountInfoPage from "./pages/account-info-page";
import LoginPage from "./pages/log-in-page";
import VehiclePage from "./pages/vehicle-page";
function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/reservation" element={<ReservationPage />} />
      <Route path="/account" element={<AccountInfoPage />} />
      <Route path="/account/vehicles" element={<VehiclePage />} />
      <Route path="/account/login" element={<LoginPage />} />
    </Routes>
  );
}

export default Router;
