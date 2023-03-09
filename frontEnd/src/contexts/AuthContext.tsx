import React, { createContext, useState, ReactNode } from "react";
import { UserPermission, User, Vehicle } from "../types/DataTypes";
import { Api } from "../lib/api";
import { LoginUserBody } from "../dto/apiTypes";

export const AuthContext = createContext({
  user: {} as User | undefined,
  manager: {} as User | undefined,
  vehicles: [] as Vehicle[],
  isAuthenticated: false,
  api: {} as Api,
  setNewUser: (user: User) => {},
  setNewVehicles: (vehicles: Vehicle[]) => {},
  setNewManager: (user: User) => {},
  logout: () => {},
});
