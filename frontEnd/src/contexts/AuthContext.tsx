import React, { createContext, useState, ReactNode } from "react";
import { UserPermission, User, Vehicle } from "../types/DataTypes";
import { Api } from "../lib/api";
import { LoginUserBody } from "../dto/apiTypes";

export const AuthContext = createContext({
  user: {} as User,
  manager: {} as User,
  vehicles: [] as Vehicle[],
  api: {} as Api,
  setNewUser: (user: User) => {},
  setNewVehicles: (vehicles: Vehicle[]) => {},
  setNewManager: (manager: User) => {},
  logout: () => {},
});
