import { handleErrors } from "@/components/ErrorHandler";
import { UserProfileToken } from "@/Models/Users";
import axios from "axios";

const api = "http://localhost:4000/api";

export const loginAPI = async (email: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(api+ "/auth/login", {
            email,
            password
        });
        return data;
    } catch (error) {
        handleErrors(error);
    }
};

export const registerAPI = async (email: string, userName: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(api+ "/auth/register", {
            email,
            userName,
            password
        });
        return data;
    } catch (error) {
        handleErrors(error);
    }
};