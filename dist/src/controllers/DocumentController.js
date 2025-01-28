import { DocumentService } from '../service/DocumentService';
import { AuthService } from '../service/AuthService';
const jwt = require('jsonwebtoken');
export const DocumentController = {
    async getAllDocuments(req, res) {
        const userId = req.headers.userid;
        const isAdmin = AuthService.checkAdmin(userId);
        if (!isAdmin) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        try {
            const documents = await DocumentService.getAllDocuments();
            res.status(200).json(documents);
        }
        catch (error) {
            const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
            const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
            res.status(statusCode).json({ error: errorMessage });
        }
    },
    async getDocument(req, res) {
        const id = req.params.id;
        const userId = req.headers.userid;
        try {
            const document = await DocumentService.getDocument(id, userId);
            res.status(200).json(document);
        }
        catch (error) {
            const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
            const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
            res.status(statusCode).json({ error: errorMessage });
        }
    },
    async createDocument(req, res) {
        const { title, parentDocumentId } = req.body;
        const userId = req.headers.userid;
        try {
            const document = await DocumentService.createDocument(title, parentDocumentId, userId);
            res.status(201).json(document);
        }
        catch (error) {
            const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
            const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
            res.status(statusCode).json({ error: errorMessage });
        }
    },
    async updateDocument(req, res) {
        const id = req.params.id;
        const { title, content, icon, coverImage, isPublished } = req.body;
        console.log('updateDocument', id, title, content, icon, coverImage, isPublished);
        let userId = req.headers.userid;
        if (!userId) {
            const token = req.headers.authorization?.split(' ')[1] || '';
            const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
            if (payload) {
                userId = payload.id;
            }
        }
        console.log(userId);
        console.log(id);
        try {
            const document = await DocumentService.updateDocument(id, title, userId, content, icon, coverImage, isPublished);
            console.log('updateDocument', document);
            res.status(202).json(document);
        }
        catch (error) {
            const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
            const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
            res.status(statusCode).json({ error: errorMessage });
        }
    },
    async deleteDocument(req, res) {
        const id = req.params.id;
        const userId = req.headers.userid;
        try {
            await DocumentService.deleteDocument(id, userId);
            res.status(200).json({ success: true });
        }
        catch (error) {
            const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
            const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
            res.status(statusCode).json({ error: errorMessage });
        }
    },
    /*--------------------------------------------------------------*/
    async getSidebarDocuments(req, res) {
        const parentDocumentId = req.query.parentDocument;
        const userId = req.headers.userid;
        try {
            const documents = await DocumentService.getSidebarDocuments(userId, parentDocumentId);
            res.status(200).json(documents);
        }
        catch (error) {
            const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
            const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
            res.status(statusCode).json({ error: errorMessage });
        }
    },
    /*--------------------------------------------------------------*/
    async archiveDocument(req, res) {
        const id = req.params.id;
        const userId = req.headers.userid;
        try {
            await DocumentService.archiveDocument(id, userId);
            res.status(200).json({ success: true });
        }
        catch (error) {
            const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
            const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
            res.status(statusCode).json({ error: errorMessage });
        }
    },
    async restoreDocument(req, res) {
        const id = req.params.id;
        const userId = req.headers.userid;
        try {
            await DocumentService.restoreDocument(id, userId);
            res.status(200).json({ success: true });
        }
        catch (error) {
            const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
            const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
            res.status(statusCode).json({ error: errorMessage });
        }
    },
    async getArchivedDocuments(req, res) {
        const userId = req.headers.userid;
        try {
            const documents = await DocumentService.getArchivedDocuments(userId);
            res.status(200).json(documents);
        }
        catch (error) {
            const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
            const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
            res.status(statusCode).json({ error: errorMessage });
        }
    },
    /*--------------------------------------------------------------*/
    async favoriteDocument(req, res) {
        const id = req.params.id;
        const userId = req.headers.userid;
        try {
            const documents = await DocumentService.favoriteDocument(id, userId);
            res.status(200).json(documents);
        }
        catch (error) {
            const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
            const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
            res.status(statusCode).json({ error: errorMessage });
        }
    },
    async unfavoriteDocument(req, res) {
        const id = req.params.id;
        const userId = req.headers.userid;
        try {
            const documents = await DocumentService.unfavoriteDocument(id, userId);
            res.status(200).json(documents);
        }
        catch (error) {
            const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
            const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
            res.status(statusCode).json({ error: errorMessage });
        }
    },
    async getfavoriteDocuments(req, res) {
        const parentFavoriteId = req.query.parentFavorite;
        const forChild = req.query.forChild === 'true';
        const userId = req.headers.userid;
        try {
            const documents = await DocumentService.getfavoriteDocuments(userId, parentFavoriteId, forChild);
            res.status(200).json(documents);
        }
        catch (error) {
            const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
            const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
            res.status(statusCode).json({ error: errorMessage });
        }
    },
    async getcountFavoriteDocuments(req, res) {
        const userId = req.headers.userid;
        try {
            const count = await DocumentService.getNumberOfFavoriteDocuments(userId);
            res.status(200).json(count);
        }
        catch (error) {
            const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
            const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
            res.status(statusCode).json({ error: errorMessage });
        }
    },
    /*--------------------------------------------------------------*/
    async shareDocument(req, res) {
        const userId = req.headers.userid;
        const documentId = req.params.id;
        const { sharedEmail } = req.body;
        try {
            const documents = await DocumentService.shareDocument(documentId, userId, sharedEmail);
            res.status(200).json(documents);
        }
        catch (error) {
            const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
            const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
            res.status(statusCode).json({ error: errorMessage });
        }
    },
    async getSharedDocuments(req, res) {
        const userId = req.headers.userid;
        try {
            const documents = await DocumentService.getSharedDocuments(userId);
            res.status(200).json(documents);
        }
        catch (error) {
            const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
            const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
            res.status(statusCode).json({ error: errorMessage });
        }
    },
    /*--------------------------------------------------------------*/
    async searchDocuments(req, res) {
        const userId = req.headers.userid;
        const query = req.query.query;
        try {
            const documents = await DocumentService.searchDocuments(userId, query);
            res.status(200).json(documents);
        }
        catch (error) {
            const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
            const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
            res.status(statusCode).json({ error: errorMessage });
        }
    },
    /*--------------------------------------------------------------*/
    async removeIcon(req, res) {
        const userId = req.headers.userid;
        const documentId = req.params.id;
        try {
            await DocumentService.removeIcon(documentId, userId);
            res.status(200).json({ success: true });
        }
        catch (error) {
            const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
            const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
            res.status(statusCode).json({ error: errorMessage });
        }
    },
    /*--------------------------------------------------------------*/
    async getCoverOffset(req, res) {
        const userId = req.headers.userid;
        const documentId = req.params.id;
        try {
            const offset = await DocumentService.getCoverOffset(documentId, userId);
            res.status(200).json(offset);
        }
        catch (error) {
            const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
            const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
            res.status(statusCode).json({ error: errorMessage });
        }
    },
    async setCoverOffset(req, res) {
        const userId = req.headers.userid;
        const documentId = req.params.id;
        const { coverOffset } = req.body;
        try {
            await DocumentService.setCoverOffset(documentId, userId, coverOffset);
            res.status(200).json({ success: true });
        }
        catch (error) {
            const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
            const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
            res.status(statusCode).json({ error: errorMessage });
        }
    },
};
//# sourceMappingURL=DocumentController.js.map