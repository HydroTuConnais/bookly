import { handleErrors } from "@/components/ErrorHandler";
import { UserProfileToken } from "@/models/Users";
import axios from "axios";


const api = "http://localhost:4000/api";

export const AuthService = {


    async loginAPI({ email, password }: { email: string, password: string }) {
        try {
            const data = await axios.post<UserProfileToken>(api + "/auth/login", {
                email,
                password
            });
            return data;
        } catch (error) {
            handleErrors(error);
        }
    },

    async registerAPI({ email, userName, password }: { email: string; userName: string; password: string; }) {
        try {
            const data = await axios.post<UserProfileToken>(api + "/auth/register", {
                email,
                userName,
                password
            });
            return data;
        } catch (error) {
            handleErrors(error);
        }
    },

    async checkUser({ token }: { token: string }) {
        try {
            const response = await axios.get(api + "/auth/user", {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    },

    async checkAPI({ token }: { token: string }) {
        try {
            const response = await axios.get(api + "/auth/check", {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    },

    async update({ token, name, imageUrl, boardingStatus }: { token: string, name: string, imageUrl: string | null, boardingStatus: boolean }) {
        try {
            const response = await axios.put(api + "/auth/update", {
                name,
                imageUrl,
                boardingStatus
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    }
};