import { useContext } from "react";
import { Api } from "../lib/api";
import { User, Vehicle, UserPermission } from "../types/DataTypes";
import { useState } from "react";
import { getToken } from "./miscFunctions";
import { removeToken } from "./miscFunctions";
import { LoginUserBody } from "../dto/apiTypes";

type UserInfo = () => {
  user: User;
  manager: User;
  setNewUser: (user: User) => void;
  logout: () => void;
  api: Api;
  vehicles: Vehicle[];
  setNewVehicles: (vehicles: Vehicle[]) => void;
  setNewManager: (manager: User) => void;
};

const permission: UserPermission = "admin";
const userPermission: UserPermission = "guest";
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

const defaultUser = {
  id: 0,
  name: "No Manager",
  permission: userPermission,
  balance: 0,
  needHelp: false,
  location: "No Location",
  email: "No Email",
  ethicsViolation: "No Violation",
  phoneNumber: "No Phone Number",
  reservations: [],
  isAuthenticated: false,
};

export const useUserInfo: UserInfo = () => {
  const [user, setUser] = useState<User>(defaultUser);
  const [api] = useState(new Api());
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [manager, setManager] = useState<User>(defaultManager);

  const setNewUser = (newUser: User) => {
    // if (!getToken()) return; // add this if we start using tokens
    if (!newUser) return;
    if (newUser !== defaultUser) {
      newUser.isAuthenticated = true;
      setUser(newUser);
    }
  };

  const setNewManager = (newManager: User) => {
    if (!newManager) return;
    if (newManager !== defaultManager) {
      newManager.isAuthenticated = true;
      setManager(newManager);
    }
  };

  const setNewVehicles = (newVehicles: Vehicle[]) => {
    if (!newVehicles) return;
    setVehicles(newVehicles);
  };

  const logout = () => {
    removeToken();
    setUser(defaultUser);
  };

  return {
    user,
    setNewUser,
    vehicles,
    setNewVehicles,
    manager,
    setNewManager,
    logout,
    api,
  };
};
