import React, { createContext, useState, ReactNode } from "react";
import { UserPermission, User } from "../types/DataTypes";
import { Api } from "../lib/api";
import { LoginUserBody } from "../dto/apiTypes";
type AuthContextType = {
  user: User | undefined;
  isAuthenticated: boolean;
  userPermission: UserPermission;
  login: Function;
  logout: Function;
  api: Object;
};

export const AuthContext = createContext({
  user: {} as User | undefined,
  isAuthenticated: false,
  userPermission: "guest",
  setNewUser: (user: User) => {},
  logout: () => {},
  api: {} as Api,
});
