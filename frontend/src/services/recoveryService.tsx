import { handleErrors } from "@/components/ErrorHandler";
import axios from "axios";
import { Console } from "console";


const api = process.env.SERVER_URL || "http://maant.dipsw-ccicampus.dev/api";

export const RecoveryService = {

    async sendRecovryEmail({ token, email }: { token: string, email: string }) {
        try {
            const response = await axios.post(api + "/recovery/send/email", {
                email
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    },

    async recoveryEmail({ id, token }: { id: string, token: string }) {
        try {
            const response = await axios.post(api + `/recovery/email/${id}/${token}`);
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    },

    async sendRecovryPassword({ token, email }: { token: string, email: string }) {
        try {
            const response = await axios.post(api + "/recovery/send/password", {
                email
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    },

    async changePassword({ token, password }: { token: string, password: string }) {
        //console.log("token", token);
        //console.log("password", password);
        try {
            const response = await axios.post(api + "/recovery/reset/password", {
                password
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    },

    async recoveryPassword({ id, token }: { id: string, token: string }) {
        try {
            const response = await axios.post(api + `/api/recovery/password/${id}/${token}`);
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    }
};