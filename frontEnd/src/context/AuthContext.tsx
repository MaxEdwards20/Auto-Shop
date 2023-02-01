import React, { createContext, useState } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>; // used to trigger a state change when users are logged in
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});
