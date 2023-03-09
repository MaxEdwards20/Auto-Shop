import ManagerUpdateUser from "../components/ManagerUpdateUser";

import { checkUserIsManagerAndRedirect } from "../hooks/validationHooks";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
export default function ManagerPage() {
  checkUserIsManagerAndRedirect();
  return <ManagerUpdateUser />;
}
