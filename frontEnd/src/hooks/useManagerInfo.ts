import { useContext } from "react";
import { Api } from "../lib/api";
import { User, Vehicle, UserPermission } from "../types/DataTypes";
import { useState } from "react";
import { getToken } from "./miscFunctions";
import { removeToken } from "./miscFunctions";
import { LoginUserBody } from "../dto/apiTypes";

const permission: UserPermission = "admin";
const defaultManager = {
  id: 0,
  name: "No Manager",
  permission: permission,
  balance: 0,
  needHelp: false,
  location: "No Location",
  email: "No Email",
  ethicsViolation: "No Violation",
  phoneNumber: "No Phone Number",
  reservations: [],
  isAuthenticated: false,
};
type ManagerInfo = () => {
  manager: User;
  setNewManager: (manager: User) => void;
};

export const useManagerInfo: ManagerInfo = () => {
  const [manager, setManager] = useState<User>(defaultManager);

  const setNewManager = (newManager: User) => {
    if (!newManager) return;
    if (newManager !== defaultManager) {
      newManager.isAuthenticated = true;
      setManager(newManager);
    }
  };

  return {
    setNewManager,
    manager,
  };
};
