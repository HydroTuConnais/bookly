import React from "react";
import { UserProfile } from "@/Models/Users";
import { loginAPI, registerAPI } from "@/services/authService";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    registerUser : (email : string, userName: string, password: string) => void;
    loginUser : (email : string, password: string) => void;
    logoutUser : () => void;
    isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        setIsReady(true);
    }, []);

    const registerUser = async (email : string, userName: string, password: string) => {
        await registerAPI(email, userName, password).then((res) => {
            if(res){
                const { token, userName, email } = res?.data.data;
                localStorage.setItem("token", token);
                const userObj =  {
                    userName: userName,
                    email: email
                }
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(token);
                setUser(userObj);
                toast.success("User registered successfully");
                navigate("/dashboard");
            }
        }).catch((e) => toast.warning("Server error occured"));
    };

    const loginUser = async (email: string, password: string) => {
        await loginAPI(email, password).then((res) => {
            if(res){
                const { token, userName, email } = res?.data.data;
                localStorage.setItem("token", token);
                const userObj =  {
                    userName: userName,
                    email: email
                }
                localStorage.setItem("user", JSON.stringify(userObj));
                setToken(token);
                setUser(userObj);
                toast.success("User registered successfully");
                navigate("/dashboard");
            }
            else {
                throw new Error;
            }
        }).catch((e) => {
            throw new Error("Invalid email or password");
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
        navigate("/");
    };

    return (
        <UserContext.Provider 
            value={{ loginUser, user, token, logoutUser, isLoggedIn, registerUser}}
        >
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);