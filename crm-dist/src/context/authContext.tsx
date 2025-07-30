// src/context/authContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    // Validar si hay token cuando carga la app
    useEffect(() => {
        const token = Cookies.get("token");
        setIsAuthenticated(!!token); // true si hay token
    }, []);

    const login = async (usuario: string, password: string) => {
        const response = await fetch("http://172.100.203.202:8001/login/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, password }),
            credentials: "include", // muy importante
        });

        if (!response.ok) {
            throw new Error("Credenciales incorrectas");
        }

        setIsAuthenticated(true);
        router.push("/home");
    };

    const logout = () => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return context;
};
