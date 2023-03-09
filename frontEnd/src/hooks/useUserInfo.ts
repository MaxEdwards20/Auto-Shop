import { useContext } from "react";
import { Api } from "../lib/api";
import { User, Vehicle, UserPermission } from "../types/DataTypes";
import { useState } from "react";
import { getToken } from "./miscFunctions";
import { removeToken } from "./miscFunctions";
import { LoginUserBody } from "../dto/apiTypes";
import { ReservationInfo } from "../types/DataTypes";

const userPermission: UserPermission = "guest";

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

export type UserInfo = () => {
  user: User;
  api: Api;
  setNewUser: (user: User) => void;
  logout: () => void;
  addMoney: (newBalance: number) => void;
  subtractMoney: (newBalance: number) => void;
  addNewReservation: (newReservation: ReservationInfo) => void;
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

  const addMoney = (newDeposit: number) => {
    const newBalance = user.balance + newDeposit;
    const newUser = { ...user, balance: newBalance };
    setUser(newUser);
  };

  const subtractMoney = (newPurchase: number) => {
    const newBalance = user.balance - newPurchase;
    const newUser = { ...user, balance: newBalance };
    setUser(newUser);
  };

  const logout = () => {
    removeToken();
    setUser(defaultUser);
  };

  const addNewReservation = (newReservation: ReservationInfo) => {
    const newUser = {
      ...user,
      reservations: [...user.reservations, newReservation],
    };
    setUser(newUser);
  };

  return {
    api,
    user,
    setNewUser,
    addMoney,
    subtractMoney,
    addNewReservation,
    logout,
  };
};
