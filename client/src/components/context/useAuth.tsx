import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI, checkAPI } from "@/services/authService";

interface UserProfile {
    id: string;
    email: string;
    name: string;
    imageUrl?: string;
}

interface AuthContextType {
    user: UserProfile | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    loginUser: (email: string, password: string) => Promise<void>;
    registerUser: (email: string, userName: string, password: string) => Promise<void>;
    isLoggedIn: () => boolean;
    logoutUser: () => void;
    checkAuth: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("checkToken Validating");
        if (token) {
            checkAuth(token);
        } else {
            setIsLoading(false);
        }
    }, []);

    const registerUser = async (email: string, userName: string, password: string) => {
        try {
            const res = await registerAPI(email, userName, password);
            if (res) {
                const { token, user } = res.data;
                setToken(token);
                setUser(user);
                setIsAuthenticated(true);
                toast.success("User registered successfully");
                navigate("/documents");
            }
        } catch (error) {
            console.error("Registration error:", error);
            toast.warning("Server error occurred");
        }
    };

    const loginUser = async (email: string, password: string) => {
        try {
            console.log("-----------------login-----------------");
            const res = await loginAPI(email, password);
            if (res) {
                const { token, user } = res.data;
                setToken(token);
                setUser(user);
                localStorage.setItem("token", token);
                setIsAuthenticated(true);
                toast.success("User logged in successfully");
                navigate("/documents");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.warning("Invalid email or password");
        }
    };

    const isLoggedIn = () => {
        return !!user;
    };

    const logoutUser = () => {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        navigate("/");
    };

    const checkAuth = async (token: string) => {
        await checkAPI(token || "").then((res: any) => {
            if (res) {
                setUser(res.user);
                setToken(res.token);
                console.log("User is authenticated");
                setIsAuthenticated(true);
                setIsLoading(false);
                return true;
            } else {
                logoutUser();
                console.log("User is not authenticated");
                return false;
            }
        });
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, isLoading, loginUser, registerUser, isLoggedIn, logoutUser, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};