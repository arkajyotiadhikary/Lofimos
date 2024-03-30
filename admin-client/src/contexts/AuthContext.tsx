import React, { createContext, useState, useContext, ReactNode } from "react";
import { UserData, UserResponseData } from "../types";

// Define the shape of your authentication context
interface AuthContextType {
      user: UserResponseData | null;
      setUser: React.Dispatch<React.SetStateAction<UserResponseData | null>>;
}

// Create the authentication context
export const AuthContext = createContext<AuthContextType>({
      user: null,
      setUser: () => {},
});

// Custom hook to consume the authentication context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
      children: ReactNode;
}

// AuthProvider component to wrap your application and provide the context
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
      const [user, setUser] = useState<UserResponseData | null>(null);

      return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
