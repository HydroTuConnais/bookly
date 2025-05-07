import { handleErrors } from "@/components/ErrorHandler";
import { UserProfileToken } from "@/models/Users";
import axios from "axios";


const api = process.env.SERVER_URL || "http://maant.dipsw-ccicampus.dev/api";

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

    async checkPassword({ token, password }: { token: string, password: string }) {
        try {
            const response = await axios.post(api + "/auth/password", {
                password
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            return response.data;
        }
        catch (error) {
            handleErrors(error);
        }
    },

    async getAllUsersAPI({ token }: { token: string }) {
        try {
            const response = await axios.get(api + "/auth/users", {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            return response.data;
        }
        catch (error) {
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

    async update({ token, email, name, imageUrl, boardingStatus, role }: { token: string, email: string | null, name: string | null, imageUrl: string | null, boardingStatus: boolean | null, role: string | null }) {
        try {
            const response = await axios.put(api + "/auth/update", {
                email,
                name,
                imageUrl,
                boardingStatus,
                role
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