import { handleErrors } from "@/components/ErrorHandler";
import axios from "axios";

const api = "https://api.bookly.ovh/api";

export const ImageService = {
    async upload({ token, userid, file }: { token: string, userid: string, file: File }) {
        try {
            const formData = new FormData();
            formData.append("image", file);

            const data = await fetchData({ method: "POST", endpoint: "/image/upload", formData, header: { UserId: userid }, token });
            return data;
        } catch (error) {
            handleErrors(error);
        }
    },

    async remove({ token, userid, url, documentId }: { token: string, userid: string, url: string, documentId: string }) {
        try {
            const data = await fetchData({ method: "DELETE", endpoint: `/image/${documentId}`, body: { url: url }, header: { UserId: userid }, token });
            return data;
        } catch (error) {
            handleErrors(error);
        }
    }
}

export const fetchData = async ({ method, endpoint, params, formData, body, header, token }: { method: string, token: string, endpoint: string, header?: any, params?: any, formData?: any, body?: any }) => {
    try {

        const headers = {
            'Authorization': "Bearer " + token,
            ...header,
        };

        let data;
        if (formData) {
            headers['Content-Type'] = 'multipart/form-data';
            data = formData;
        } else if (body) {
            headers['Content-Type'] = 'application/json';
            data = JSON.stringify(body);
        }

        console.log({
            method: method,
            url: `${api}${endpoint}`,
            data: data,
            headers: headers,
            params: params,
        });

        const response = await axios({
            method: method,
            url: `${api}${endpoint}`,
            data: data,
            headers: headers,
            params: params,
        });

        return response.data;
    } catch (error) {
        handleErrors(error);
    }
};
