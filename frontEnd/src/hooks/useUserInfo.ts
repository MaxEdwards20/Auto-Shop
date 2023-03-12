import { useContext } from "react";
import { Api } from "../lib/api";
import { User, Vehicle, UserPermission } from "../types/DataTypes";
import { useState } from "react";
import { getToken } from "./miscFunctions";
import { removeToken } from "./miscFunctions";
import { LoginUserBody } from "../dto/apiTypes";
import { Reservation } from "../types/DataTypes";

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
  hoursOwed: 0,
  wage: 0,
};

export type UserInfo = () => {
  user: User;
  api: Api;
  setNewUser: (user: User) => void;
  logout: () => void;
  addMoney: (newBalance: number) => void;
  subtractMoney: (newBalance: number) => void;
  addNewReservation: (newReservation: Reservation) => void;
  addHours: (hours: number) => void;
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

  const addNewReservation = (newReservation: Reservation) => {
    let newReservations = user.reservations;
    newReservations.push(newReservation);
    const newUser = {
      ...user,
      reservations: newReservations,
    };
    setUser(newUser);
  };

  const addHours = (hours: number) => {
    const cleanHours = parseInt(hours.toString());
    const newHours = user.hoursOwed + cleanHours;
    const newUser = { ...user, hoursOwed: newHours };
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
    addHours,
  };
};
