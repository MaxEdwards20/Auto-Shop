import React, { createContext, useState, ReactNode } from "react";
import { UserPermission, User, Vehicle } from "../types/DataTypes";
import { Api } from "../lib/api";
import { LoginUserBody } from "../dto/apiTypes";

export const VehicleContext = createContext({
  vehicles: [] as Vehicle[],
  setNewVehicles: (vehicles: Vehicle[]) => {},
});
