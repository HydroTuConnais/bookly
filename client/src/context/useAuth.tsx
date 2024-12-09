import React from "react";
import { UserProfile } from "@/models/Users";
import { checkAPI, loginAPI, registerAPI } from "@/services/authService";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    registerUser: (email: string, userName: string, password: string) => void;
    loginUser: (email: string, password: string) => void;
    logoutUser: () => void;
    isLoggedIn: () => boolean;
    checkAuth: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setIsAuthenticated(true);
        }
        setIsReady(true);
        setIsLoading(false);
    }, []);

    const registerUser = async (email: string, userName: string, password: string) => {
        setIsLoading(true);
        await registerAPI(email, userName, password).then((res) => {
            if (res) {
                const { token, userName, email } = res?.data.data;
                localStorage.setItem("token", token);
                const userObj = {
                    userName: userName,
                    email: email
                };
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(token);
                setUser(userObj);
                setIsAuthenticated(true);
                toast.success("User registered successfully");
                navigate("/dashboard");
            }
        }).catch((e) => toast.warning("Server error occurred")).finally(() => {
            setIsLoading(false);
        });
    };

    const loginUser = async (email: string, password: string) => {
        setIsLoading(true);
        await loginAPI(email, password).then((res) => {
            if (res) {
                const { token, userName, email } = res?.data.data;
                localStorage.setItem("token", token);
                const userObj = {
                    userName: userName,
                    email: email
                };
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(token);
                setUser(userObj);
                setIsAuthenticated(true);
                toast.success("User logged in successfully");
                navigate("/dashboard");
            } else {
                throw new Error;
            }
        }).catch((e) => {
            throw new Error("Invalid email or password");
        }).finally(() => {
            setIsLoading(false);
        });
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
        checkAPI(localStorage.getItem("token") || "").then((res) => {
            if (res) {
                setIsAuthenticated(true);
            }
            else {
                logoutUser();
            }
        });
    };

    return (
        <UserContext.Provider
            value={{ loginUser, user, token, logoutUser, isLoggedIn, registerUser, checkAuth, isAuthenticated, isLoading }}
        >
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);