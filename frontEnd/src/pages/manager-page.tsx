import { checkUserIsManagerAndRedirect } from "../hooks/validationHooks";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { ManagerContext } from "../contexts/ManagerContext";
import { ManagerUpdateUser } from "../components/manager/ManagerUpdateUser";
import { ManagerPurchaseVehicle } from "../components/manager/ManagerPurchaseVehicle";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { AccountCircle, DirectionsCar, Payment } from "@material-ui/icons";
import { ManagerPayEmployees } from "../components/manager/ManagerPayEmployees";

export function ManagerPage() {
  checkUserIsManagerAndRedirect();
  const navigate = useNavigate();
  return (
    <>
      <ManagerUpdateUser />
      <ManagerPurchaseVehicle />
      <ManagerPayEmployees />
    </>
  );
}
