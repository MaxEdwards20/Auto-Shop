import { Api } from "../lib/api";
import { User, Vehicle } from "../types/DataTypes";
export function setTokenToLocalStorage(token: string) {
  localStorage.setItem("token", token);
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function formatCurrency(num: number): string {
  return `$${num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

type setupProps = {
  api: Api;
  setNewVehicles: (vehicles: Vehicle[]) => void;
  setNewManager: (manager: User) => void;
};

export function setupClient({
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
