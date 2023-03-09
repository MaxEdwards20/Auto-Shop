import { Api } from "../lib/api";
import { User, Vehicle } from "../types/DataTypes";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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

export function checkUserAndRedirect() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate("/unauthorized");
    }
  }, []);
}

export function checkUserIsManagerAndRedirect() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (!user.isAuthenticated || user.permission != "admin") {
      navigate("/unauthorized");
    }
  }, []);
}
