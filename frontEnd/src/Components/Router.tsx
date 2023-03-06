import { Route, Routes } from "react-router-dom";
import ErrorPage from "../pages/error-page";
import HomePage from "../pages/home-page";
import ReservationPage from "../pages/reservation-page";
import AccountInfoPage from "../pages/account-info-page";
import LoginPage from "../pages/log-in-page";
import VehiclePage from "../pages/vehicle-page";
import AdminPage from "../pages/admin-page";
import CreateAccount from "./CreateAccount";
import NavBar from "./Navbar";
function Router() {
  return (
    // See tutorial at https://www.youtube.com/watch?v=Ul3y1LXxzdU
    <Routes>
      <Route path="/" element={<HomePage></HomePage>} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/reservation" element={<ReservationPage />} />
      <Route path="/vehicles" element={<VehiclePage />} />
      <Route path="/account">
        <Route index element={<AccountInfoPage />} />
        <Route path="vehicles" element={<VehiclePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="create" element={<CreateAccount />} />
      </Route>
      <Route path="/vehicles/new"></Route>
      <Route path="*" element={<ErrorPage />}></Route>
    </Routes>
  );
}
export default Router;
