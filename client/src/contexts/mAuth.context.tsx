import React, { createContext, useContext, useState } from "react";

interface AuthContextData {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextData | null>(null);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const value: AuthContextData = { isAuthenticated, setIsAuthenticated };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
