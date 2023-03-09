import { useContext } from "react";
import { Api } from "../lib/api";
import { User, UserPermission, Vehicle } from "../types/DataTypes";
import { useState } from "react";
import { getToken } from "./miscFunctions";
import { removeToken } from "./miscFunctions";
import { LoginUserBody } from "../dto/apiTypes";

type UserInfo = () => {
  user: User | undefined;
  manager: User | undefined;
  setNewUser: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  api: Api;
  vehicles: Vehicle[];
  setNewVehicles: (vehicles: Vehicle[]) => void;
  setNewManager: (manager: User) => void;
};

export const useUserInfo: UserInfo = () => {
  const [user, setUser] = useState<User>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [api] = useState(new Api());
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [manager, setManager] = useState<User>();

  const setNewUser = (newUser: User) => {
    // if (!getToken()) return; // add this if we start using tokens
    if (!newUser) return;
    setUser(newUser);
    setIsAuthenticated(true);
  };

  const setNewManager = (newManager: User) => {
    if (!newManager) return;
    setManager(newManager);
  };

  const setNewVehicles = (newVehicles: Vehicle[]) => {
    if (!newVehicles) return;
    setVehicles(newVehicles);
  };

  const logout = () => {
    removeToken();
    setUser(undefined);
    setIsAuthenticated(false);
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
    isAuthenticated,
  };
};
