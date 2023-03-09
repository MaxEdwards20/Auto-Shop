import ManagerUpdateUser from "../components/ManagerUpdateUser";

import { checkUserIsManagerAndRedirect } from "../hooks/validationHooks";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { ManagerContext } from "../contexts/ManagerContext";
import { ManagerPurchaseVehicle } from "../components/ManagerPurchaseVehicle";
export default function ManagerPage() {
  checkUserIsManagerAndRedirect();
  return (
    <>
      <ManagerUpdateUser />
      <ManagerPurchaseVehicle />
    </>
  );
}
