import { handleErrors } from "@/components/ErrorHandler";
import axios from "axios";

const api = "http://localhost:4000/api";

export const ImageService = {
    async upload({ token, userid, file }: { token: string, userid: string, file: File}) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            
            const data = await fetchData({ method: "POST", endpoint: "/image/upload", body: formData, header: { UserId: userid }, token });
            console.log(data);
            return data;
        } catch (error) {
            handleErrors(error);
        }
    },
}

export const fetchData = async ({ method, endpoint, params, body, header, token }: { method: string, token: string, endpoint: string, header?: any, params?: any, body?: any }) => {
    try {
        console.log({
            method: method,
            url: `${api}${endpoint}`,
            data: body,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " + token,
                ...header,
            },
            params: params,
        });

        const response = await axios({
            method: method,
            url: `${api}${endpoint}`,
            data: body,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " + token,
                ...header,
            },
            params: params,
        });

        return response.data;
    } catch (error) {
        handleErrors(error);
    }
};
