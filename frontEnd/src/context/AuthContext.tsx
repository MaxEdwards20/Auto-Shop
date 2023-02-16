import React, { createContext, useState, ReactNode } from "react";
import { UserType } from "../types/userTypes";

type AuthContextType = {
  isAuthenticated: boolean;
  userType: UserType | null;
  login: (userType: UserType) => void;
  logout: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userType: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<UserType | null>(null);

  const login = (userType: UserType) => {
    setIsAuthenticated(true);
    setUserType(userType);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserType(null);
  };

  const values: AuthContextType = {
    isAuthenticated,
    userType,
    login,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
