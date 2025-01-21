import { handleErrors } from "@/components/ErrorHandler";
import axios from "axios";


const api = "http://localhost:4000";

export const RecoveryService = {

    async sendRecovryEmail({ token, email }: { token: string, email: string }) {
        try {
            const response = await axios.post(api + "/api/recovery/send/email", {
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
            const response = await axios.get(api + `/api/recovery/email/${id}/${token}`);
            return response.data;
        } catch (error) {
            handleErrors(error);
        }
    },
};