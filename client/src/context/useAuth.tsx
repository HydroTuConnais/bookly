import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI, checkAPI } from "@/services/authService";

interface UserProfile {
    userName: string;
    email: string;
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
    checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const registerUser = async (email: string, userName: string, password: string) => {
        setIsLoading(true);
        try {
            const res = await registerAPI(email, userName, password);
            if (res) {
                const { token, userName, email: userEmail } = res.data.data;
                const userObj: UserProfile = { userName, email: userEmail };
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(token);
                setUser(userObj);
                setIsAuthenticated(true);
                toast.success("User registered successfully");
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Registration error:", error);
            toast.warning("Server error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const loginUser = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const res = await loginAPI(email, password);
            if (res) {
                const { token, userName, email } = res.data.data;
                const userObj: UserProfile = { userName, email };
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(token);
                setUser(userObj);
                setIsAuthenticated(true);
                toast.success("User logged in successfully");
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.warning("Invalid email or password");
        } finally {
            setIsLoading(false);
        }
    };

    const isLoggedIn = () => {
        return !!user;
    };

    const logoutUser = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        navigate("/");
    };

    const checkAuth = () => {
        checkAPI(localStorage.getItem("token") || "").then((res: any) => {
            if (res) {
                setIsAuthenticated(true);
            } else {
                logoutUser();
            }
        });
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, isLoading, loginUser, registerUser, isLoggedIn, logoutUser, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};