import React, { createContext, useState, ReactNode } from "react";
import { UserPermission, User, Vehicle, Reservation } from "../types/DataTypes";
import { Api } from "../lib/api";
import { LoginUserBody } from "../dto/apiTypes";
import { UserInfo } from "../hooks/useUserInfo";

export const UserContext = createContext({
  user: {} as User,
  api: {} as Api,
  setNewUser: (user: User) => {},
  logout: () => {},
  addNewReservation: (reservation: Reservation) => {},
  addMoney: (amount: number) => {},
  subtractMoney: (amount: number) => {},
  addHours: (amount: number) => {},
});
