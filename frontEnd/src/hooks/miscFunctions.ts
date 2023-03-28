import { Api } from "../lib/api";
import { User, Vehicle } from "../types/DataTypes";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
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
