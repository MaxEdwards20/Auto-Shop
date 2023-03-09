import { useContext } from "react";
import { Api } from "../lib/api";
import { User, Vehicle, UserPermission } from "../types/DataTypes";
import { useState } from "react";
import { getToken } from "./miscFunctions";
import { removeToken } from "./miscFunctions";
import { LoginUserBody } from "../dto/apiTypes";

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

type UserInfo = () => {
  user: User;
  setNewUser: (user: User) => void;
  logout: () => void;
  api: Api;
  updateUserBalance: (newBalance: number) => void;
};

export const useUserInfo: UserInfo = () => {
  const [user, setUser] = useState<User>(defaultUser);
  const [api] = useState(new Api());

  const setNewUser = (newUser: User) => {
    // if (!getToken()) return; // add this if we start using tokens
    if (!newUser) return;
    if (newUser !== defaultUser) {
      newUser.isAuthenticated = true;
      setUser(newUser);
    }
  };

  const updateUserBalance = (newBalance: number) => {
    const newUser = { ...user, balance: newBalance };
    setUser(newUser);
  };

  const logout = () => {
    removeToken();
    setUser(defaultUser);
  };

  return {
    api,
    user,
    setNewUser,
    updateUserBalance,
    logout,
  };
};
