import { useContext } from "react";
import { Api } from "../lib/api";
import { User, Vehicle, UserPermission } from "../types/DataTypes";
import { useState } from "react";
import { getToken } from "./miscFunctions";
import { removeToken } from "./miscFunctions";
import { LoginUserBody } from "../dto/apiTypes";

type VehicleInfo = () => {
  vehicles: Vehicle[];
  setNewVehicles: (vehicles: Vehicle[]) => void;
};

export const useVehicleInfo: VehicleInfo = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const setNewVehicles = (newVehicles: Vehicle[]) => {
    if (!newVehicles) return;
    setVehicles(newVehicles);
  };

  return {
    vehicles,
    setNewVehicles,
  };
};
