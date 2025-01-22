import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { AuthService } from "@/services/authService";
import { RecoveryService } from "@/services/recoveryService";

interface UserProfile {
    id: string;
    email: string;
    name: string;
    imageUrl?: string;
    boardingStatus?: boolean;
}

interface AuthContextType {
    user: UserProfile | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    loginUser: (email: string, password: string) => Promise<void>;
    registerUser: (email: string, userName: string, password: string) => Promise<void>;
    updateUser: (params: { name: string, imageUrl: string, boardingStatus: boolean }) => Promise<void>;
    isLoggedIn: () => boolean;
    logoutUser: () => void;
    checkPassword: (password: string) => Promise<boolean>;
    getUser: () => Promise<UserProfile | null>;
    checkAuth: (token: string) => void;

    sendRecovryEmail: (email: string) => Promise<void>;
    sendRecovryPassword: (password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [error, setError] = useState<string | null>(null);

    const [user, setUser] = useState<UserProfile | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("checkToken Validating");
        if (token) {
            checkAuth();
        } else {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        console.log("contextAuth", user);
    }, [user]);

    const registerUser = async (email: string, userName: string, password: string) => {
        try {
            const res = await AuthService.registerAPI({ email, userName, password });
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
            const res = await AuthService.loginAPI({ email, password });
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

    const getUser = async (): Promise<UserProfile | null> => {
        const token = localStorage.getItem("token");
        try {
            await AuthService.checkUser({ token: token || "" });
            if (user) {
                console.log("user", user);
                return user;
            }
        } catch (error) {
            console.error("Get user error:", error);
        }
        return null;
    };

    const checkAuth = async () => {
        const token = localStorage.getItem("token");
        await AuthService.checkAPI({ token: token || "" }).then((res: any) => {
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

    const isLoggedIn = () => {
        return !!user;
    };

    const logoutUser = () => {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        navigate("/");
    };

    const checkPassword = async (password: string): Promise<boolean> => {
        const token = localStorage.getItem("token");
        try {
            const res = await AuthService.checkPassword({ token: token || "", password });
            if (res) {
                console.log("Password is correct");
                return true;
            } else {
                console.log("Password is incorrect");
                return false;
            }
        } catch (error) {
            console.error("Password check error:", error);
            return false;
        }
    };

    const updateUser = async ({ name, imageUrl, boardingStatus }: { name: string; imageUrl: string, boardingStatus: boolean }): Promise<void> => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                await AuthService.update({ token, name, imageUrl, boardingStatus }).then((res) => {
                    if (res) {
                        console.log(res.user);
                        setUser(res.user);
                        console.log("User updated successfully");
                        return true;
                    } else {
                        setError('Failed to update user');
                        return false;
                    }
                });
            } catch (err: any) {
                setError('Failed to update user');
                console.error(err);
            }
        }
    };

    const sendRecovryEmail = async (email: string) => {
        if (user && token) {
            try {
                await RecoveryService.sendRecovryEmail({ token, email }).then((res) => {
                    if (res) {
                        console.log(res);
                        toast.success("Email sent successfully");
                    } else {
                        setError('Failed to send email');
                    }
                });
            } catch (err: any) {
                setError('Failed to send email');
                console.error(err);
            }
        }
    };

    const sendRecovryPassword = async (password: string) => {
        if (user && token) {
            try {
                await RecoveryService.sendRecoveryPassword({ token, password }).then((res) => {
                    if (res) {
                        console.log(res);
                        toast.success("Password updated successfully");
                    } else {
                        setError('Failed to update password');
                    }
                });
            } catch (err: any) {
                setError('Failed to update password');
                console.error(err);
            }
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, isLoading, loginUser, registerUser, updateUser, isLoggedIn, logoutUser, checkPassword, getUser, checkAuth, sendRecovryEmail, sendRecovryPassword }}>
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