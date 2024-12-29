import { handleErrors } from "@/components/ErrorHandler";
import axios from "axios";

const api = "http://localhost:4000/api";

export const DocumentService = {
    async createDocument({ token, userid, title, parentDocumentId }: { token: string, userid: string, title: string, parentDocumentId: string | null }) {
        try {
            const data = await fetchData({ method: "POST", endpoint: "/documents", body: { title, parentDocumentId }, header: { UserId: userid }, token });
            // console.log(data);
            return data;
        } catch (error) {
            handleErrors(error);
        }
    },

    async getDocument({ token, id }: { token: string, id: string }) {
        try {
            const data = await fetchData({ method: "GET", endpoint: `/documents/${id}/content`, token });
            return data;
        } catch (error) {
            handleErrors(error);
        }
    },

    async updateDocument({ token, id, title, content }: { token: string, id: string, title: string, content: string }) {
        try {
            const data = await fetchData({ method: "PUT", endpoint: `/documents/${id}/content`, body: { title, content }, token });
            return data;
        } catch (error) {
            handleErrors(error);
        }
    },

    async getArchivedDocuments({ token }: { token: string }) {
        try {
            const data = await fetchData({ method: "GET", endpoint: "/documents/trash", token });
            return data;
        } catch (error) {
            handleErrors(error);
        }
    },

    async deleteDocument({ token, userid, id }: { token: string, userid: string, id: string | null }) {
        try {
            const data = await fetchData({ method: "DELETE", endpoint: `/documents/${id}/content`, header: { UserId: userid }, token });
            return data;
        } catch (error) {
            handleErrors(error);
        }
    },

    async getSidebarDocuments({ token, userid, parentDocumentId }: { token: string, userid: string, parentDocumentId: string | null }) {
        try {
            const data = await fetchData({ method: "GET", endpoint: "/documents/sidebar", params: { parentDocument: parentDocumentId }, header: { UserId: userid }, token });
            // console.log("service sidebar", data);
            return data;
        } catch (error) {
            handleErrors(error);
        }
    },

    async shareDocument({ token, id, sharedEmail }: { token: string, id: string, sharedEmail: string }) {
        try {
            const data = await fetchData({ method: "POST", endpoint: `/documents/${id}/shared`, body: { sharedEmail }, token });
            return data;
        } catch (error) {
            handleErrors(error);
        }
    },

    async getSharedDocuments({ token }: { token: string }) {
        try {
            const data = await fetchData({ method: "GET", endpoint: "/documents/shared", token });
            return data;
        } catch (error) {
            handleErrors(error);
        }
    },

    async archiveDocument({ token, userid, id }: { token: string, userid: string, id: string }) {
        try {
            const data = await fetchData({ method: "POST", endpoint: `/documents/${id}/archive`, header: { UserId: userid }, token });
            return data;
        } catch (error) {
            handleErrors(error);
        }
    },

    async restoreDocument({ token, userid, id, }: { token: string, userid: string, id: string }) {
        try {
            const data = await fetchData({ method: "POST", endpoint: `/documents/${id}/restore`, header: { UserId: userid }, token });
            return data;
        } catch (error) {
            handleErrors(error);
        }
    },

    async getSidebarFavoriteDocuments({ token, userid, parentFavoriteId, isChild}: { token: string, userid: string, parentFavoriteId: string | null, isChild: boolean }) {
        try {
            const data = await fetchData({ method: "GET", endpoint: "/documents/favorite", params: { parentFavorite: parentFavoriteId, forChild: isChild}, header: { UserId: userid}, token });
            return data;
        } catch (error) {
            handleErrors(error);
        }
    },

    async getSidebarCountFavoriteDocuments({ token, userid }: { token: string, userid: string }) {
        try {
            const data = await fetchData({ method: "GET", endpoint: "/documents/favorite/count", header: { UserId: userid }, token });
            return data;
        }
        catch (error) {
            handleErrors(error);
        }
    },

    async favoriteDocument({ token, id, userid }: { token: string, id: string, userid: string }) {
        try {
            const data = await fetchData({ method: "POST", endpoint: `/documents/${id}/favorite`, header: { UserId: userid }, token });
            return data;
        } catch (error) {
            handleErrors(error);
        }
    },

    async unfavoriteDocument({ token, id, userid }: { token: string, userid: string, id: string }) {
        try {
            const data = await fetchData({ method: "POST", endpoint: `/documents/${id}/unfavorite`, header: { UserId: userid }, token });
            return data;
        } catch (error) {
            handleErrors(error);
        }
    },

    async searchDocuments({ token, userid, search }: { token: string, userid: string, search: string }) {
        try {
            const data = await fetchData({ method: "GET", endpoint: "/documents/search", params: { search }, header: { UserId: userid }, token });
            return data;
        } catch (error) {
            handleErrors(error);
        }
    },
}

export const fetchData = async ({ method, endpoint, params, body, header, token }: { method: string, token: string, endpoint: string, header?: any, params?: any, body?: any }) => {
    try {
        console.dir({
            method: method,
            url: `${api}${endpoint}`,
            data: body,
            headers: {
                'Content-Type': 'application/json',
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
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
                ...header,
            },
            params: params,
        });

        // console.log("FETCHDATA", response.data)
        return response.data;
    } catch (error) {
        handleErrors(error);
    }
};
