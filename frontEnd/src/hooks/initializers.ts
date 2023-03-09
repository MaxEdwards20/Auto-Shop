import { Api } from "../lib/api";
import { User, Vehicle } from "../types/DataTypes";

type setupProps = {
  api: Api;
  setNewVehicles: (vehicles: Vehicle[]) => void;
  setNewManager: (manager: User) => void;
};

export function initializeFrontend({
  api,
  setNewVehicles,
  setNewManager,
}: setupProps) {
  api.getAllVehicles().then((cars) => {
    if (cars) {
      setNewVehicles(cars);
    }
  });

  api.initializeDatabase().then((manager) => {
    if (manager) {
      setNewManager(manager);
    }
  });
}

export function setupManager(api: Api, setNewManager: (manager: User) => void) {
  api.getManager().then((manager) => {
    if (manager) {
      setNewManager(manager);
    }
  });
}
