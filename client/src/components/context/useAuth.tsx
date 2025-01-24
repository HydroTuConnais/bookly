import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { AuthService } from "@/services/authService";
import { RecoveryService } from "@/services/recoveryService";

export interface UserProfile {
    id: string;
    email: string;
    name: string;
    role: string;
    imageUrl?: string;
    boardingStatus?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

interface AuthContextType {
    user: UserProfile | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    loginUser: (email: string, password: string) => Promise<void>;
    registerUser: (email: string, userName: string, password: string) => Promise<void>;
    updateUser: (params: { email?: string | null, name?: string | null, imageUrl?: string | null, boardingStatus?: boolean | null, role?: string | null }) => Promise<void>;
    isLoggedIn: () => boolean;
    logoutUser: () => void;
    checkPassword: (password: string) => Promise<boolean>;
    getUser: () => Promise<UserProfile | null>;
    getAllUsers: () => Promise<UserProfile[]>;
    checkAuth: () => Promise<boolean>;

    sendRecovryEmail: (email: string) => Promise<void>;
    sendRecovryPassword: (email: string) => Promise<void>;

    changePassword: (password: string) => Promise<void>;
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
                console.log("User registered successfully");
                setToken(token);
                setUser(user);
                setIsAuthenticated(true);
                toast.success("User registered successfully");
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
        const res = await AuthService.checkAPI({ token: token || "" });
        if (res) {
            setUser(res.user);
            try {
                const userRes = await AuthService.checkUser({ token: token || "" });
                if (userRes) {
                    return userRes.user;
                }
            } catch (error) {
                console.error("Get user error:", error);
            }
            return null;
        } else {
            console.log("User is not authenticated");
            return null;
        }

    };

    const getAllUsers = async (): Promise<UserProfile[]> => {
        try {
            const res = await AuthService.getAllUsersAPI({ token: token || "" });
            if (res) {
                console.log(res.users)
                return res.users;
            }
        } catch (error) {
            console.error("Get all users error:", error);
        }
        return [];
    };

    const checkAuth = async (): Promise<boolean> => {
        const token = localStorage.getItem("token");
        const res = await AuthService.checkAPI({ token: token || "" });
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
    };

    const isLoggedIn = () => {
        return !!user;
    };

    const logoutUser = () => {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
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

    const updateUser = async ({ email, name, imageUrl, boardingStatus, role }: { email?: string | null; name?: string | null; imageUrl?: string | null, boardingStatus?: boolean | null, role?: string | null }): Promise<void> => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                await AuthService.update({ token, email: email ?? null, name: name ?? null, imageUrl: imageUrl ?? null, boardingStatus: boardingStatus ?? null, role: role ?? null }).then((res) => {
                    if (res) {
                        console.log(res.user);
                        setUser(res.user);
                        console.log("User updated successfully");
                        return true;
                    } else {
                        setError('Échec de la mise à jour de l\'utilisateur');
                        return false;
                    }
                });
            } catch (err: any) {
                setError('Échec de la mise à jour de l\'utilisateur');
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
                        toast.success("Email envoyé avec succès");
                    } else {
                        setError('Échec de l\'envoi de l\'email');
                    }
                });
            } catch (err: any) {
                setError('Échec de l\'envoi de l\'email');
                console.error(err);
            }
        }
    };

    const sendRecovryPassword = async (email: string) => {
        if (user && token) {
            try {
                await RecoveryService.sendRecovryPassword({ token, email }).then((res) => {
                    if (res) {
                        console.log(res);
                        toast.success("Email envoyée si l'email existe");
                    } else {
                        setError('Échec de l\'envoi de l\'email');
                    }
                });
            } catch (err: any) {
                setError('Échec de l\'envoi de l\'email');
                console.error(err);
            }
        }
    };

    const changePassword = async (password: string) => {
        if (user && token) {
            try {
                await RecoveryService.changePassword({ token, password }).then((res) => {
                    if (res) {
                        console.log(res);
                        toast.success("Mot de passe mis à jour avec succès");
                    } else {
                        setError('Échec de la mise à jour du mot de passe');
                    }
                });
            } catch (err: any) {
                setError('Échec de la mise à jour du mot de passe');
                console.error(err);
            }
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, isLoading, loginUser, registerUser, updateUser, isLoggedIn, logoutUser, checkPassword, getUser, getAllUsers, checkAuth, sendRecovryEmail, sendRecovryPassword, changePassword }}>
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