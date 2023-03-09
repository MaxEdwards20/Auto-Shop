import ManagerUpdateUser from "../components/ManagerUpdateUser";
import { UnAuthDashboard } from "../components/UnAuthDashboard";
import {
  checkUserAndRedirect,
  checkUserIsManagerAndRedirect,
} from "../hooks/miscFunctions";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/AuthContext";
export default function ManagerPage() {
  checkUserIsManagerAndRedirect();

  return <ManagerUpdateUser />;
}
