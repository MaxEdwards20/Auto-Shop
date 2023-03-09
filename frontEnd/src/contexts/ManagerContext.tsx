import React, { createContext, useState, ReactNode } from "react";
import { UserPermission, User, Vehicle } from "../types/DataTypes";
import { Api } from "../lib/api";
import { LoginUserBody } from "../dto/apiTypes";

export const ManagerContext = createContext({
  manager: {} as User,
  setNewManager: (manager: User) => {},
});
