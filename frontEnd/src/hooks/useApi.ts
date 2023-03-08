import { useContext } from "react";
import { Api } from "../lib/api";
import { User, UserPermission, Vehicle } from "../types/DataTypes";
import { useState } from "react";
import { getToken } from "./miscFunctions";
import { removeToken } from "./miscFunctions";
import { LoginUserBody } from "../dto/apiTypes";
type UserInfo = () => {
  user: User | undefined;
  setNewUser: (user: User) => void;
  logout: () => void;
  userPermission: UserPermission;
  isAuthenticated: boolean;
  api: Api;
  vehicles: Vehicle[];
  setNewVehicles: (vehicles: Vehicle[]) => void;
};

export const useUserInfo: UserInfo = () => {
  const [user, setUser] = useState<User>();
  const [userPermission, setUserPermission] = useState<UserPermission>("guest");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [api] = useState(new Api());
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const setNewUser = (newUser: User) => {
    // if (!getToken()) return; // add this if we start using tokens
    if (!newUser) return;
    setUser(newUser);
    setUserPermission(newUser.permission);
    setIsAuthenticated(true);
  };

  const setNewVehicles = (newVehicles: Vehicle[]) => {
    if (!newVehicles) return;
    setVehicles(newVehicles);
  };

  const logout = () => {
    removeToken();
    setUser(undefined);
    setUserPermission("guest");
    setIsAuthenticated(false);
  };

  return {
    user,
    setNewUser,
    logout,
    api,
    userPermission,
    isAuthenticated,
    vehicles,
    setNewVehicles,
  };
};
