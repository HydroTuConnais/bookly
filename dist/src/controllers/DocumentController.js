"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentController = void 0;
const DocumentService_1 = require("../service/DocumentService");
const AuthService_1 = require("../service/AuthService");
const jwt = require('jsonwebtoken');
exports.DocumentController = {
    getAllDocuments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.headers.userid;
            const isAdmin = AuthService_1.AuthService.checkAdmin(userId);
            if (!isAdmin) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            try {
                const documents = yield DocumentService_1.DocumentService.getAllDocuments();
                res.status(200).json(documents);
            }
            catch (error) {
                const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
                const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
                res.status(statusCode).json({ error: errorMessage });
            }
        });
    },
    getDocument(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const userId = req.headers.userid;
            try {
                const document = yield DocumentService_1.DocumentService.getDocument(id, userId);
                res.status(200).json(document);
            }
            catch (error) {
                const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
                const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
                res.status(statusCode).json({ error: errorMessage });
            }
        });
    },
    createDocument(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, parentDocumentId } = req.body;
            const userId = req.headers.userid;
            try {
                const document = yield DocumentService_1.DocumentService.createDocument(title, parentDocumentId, userId);
                res.status(201).json(document);
            }
            catch (error) {
                const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
                const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
                res.status(statusCode).json({ error: errorMessage });
            }
        });
    },
    updateDocument(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const id = req.params.id;
            const { title, content, icon, coverImage, isPublished } = req.body;
            console.log('updateDocument', id, title, content, icon, coverImage, isPublished);
            let userId = req.headers.userid;
            if (!userId) {
                const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || '';
                const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
                if (payload) {
                    userId = payload.id;
                }
            }
            console.log(userId);
            console.log(id);
            try {
                const document = yield DocumentService_1.DocumentService.updateDocument(id, title, userId, content, icon, coverImage, isPublished);
                console.log('updateDocument', document);
                res.status(202).json(document);
            }
            catch (error) {
                const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
                const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
                res.status(statusCode).json({ error: errorMessage });
            }
        });
    },
    deleteDocument(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const userId = req.headers.userid;
            try {
                yield DocumentService_1.DocumentService.deleteDocument(id, userId);
                res.status(200).json({ success: true });
            }
            catch (error) {
                const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
                const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
                res.status(statusCode).json({ error: errorMessage });
            }
        });
    },
    /*--------------------------------------------------------------*/
    getSidebarDocuments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const parentDocumentId = req.query.parentDocument;
            const userId = req.headers.userid;
            try {
                const documents = yield DocumentService_1.DocumentService.getSidebarDocuments(userId, parentDocumentId);
                res.status(200).json(documents);
            }
            catch (error) {
                const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
                const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
                res.status(statusCode).json({ error: errorMessage });
            }
        });
    },
    /*--------------------------------------------------------------*/
    archiveDocument(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const userId = req.headers.userid;
            try {
                yield DocumentService_1.DocumentService.archiveDocument(id, userId);
                res.status(200).json({ success: true });
            }
            catch (error) {
                const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
                const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
                res.status(statusCode).json({ error: errorMessage });
            }
        });
    },
    restoreDocument(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const userId = req.headers.userid;
            try {
                yield DocumentService_1.DocumentService.restoreDocument(id, userId);
                res.status(200).json({ success: true });
            }
            catch (error) {
                const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
                const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
                res.status(statusCode).json({ error: errorMessage });
            }
        });
    },
    getArchivedDocuments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.headers.userid;
            try {
                const documents = yield DocumentService_1.DocumentService.getArchivedDocuments(userId);
                res.status(200).json(documents);
            }
            catch (error) {
                const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
                const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
                res.status(statusCode).json({ error: errorMessage });
            }
        });
    },
    /*--------------------------------------------------------------*/
    favoriteDocument(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const userId = req.headers.userid;
            try {
                const documents = yield DocumentService_1.DocumentService.favoriteDocument(id, userId);
                res.status(200).json(documents);
            }
            catch (error) {
                const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
                const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
                res.status(statusCode).json({ error: errorMessage });
            }
        });
    },
    unfavoriteDocument(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const userId = req.headers.userid;
            try {
                const documents = yield DocumentService_1.DocumentService.unfavoriteDocument(id, userId);
                res.status(200).json(documents);
            }
            catch (error) {
                const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
                const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
                res.status(statusCode).json({ error: errorMessage });
            }
        });
    },
    getfavoriteDocuments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const parentFavoriteId = req.query.parentFavorite;
            const forChild = req.query.forChild === 'true';
            const userId = req.headers.userid;
            try {
                const documents = yield DocumentService_1.DocumentService.getfavoriteDocuments(userId, parentFavoriteId, forChild);
                res.status(200).json(documents);
            }
            catch (error) {
                const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
                const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
                res.status(statusCode).json({ error: errorMessage });
            }
        });
    },
    getcountFavoriteDocuments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.headers.userid;
            try {
                const count = yield DocumentService_1.DocumentService.getNumberOfFavoriteDocuments(userId);
                res.status(200).json(count);
            }
            catch (error) {
                const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
                const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
                res.status(statusCode).json({ error: errorMessage });
            }
        });
    },
    /*--------------------------------------------------------------*/
    shareDocument(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.headers.userid;
            const documentId = req.params.id;
            const { sharedEmail } = req.body;
            try {
                const documents = yield DocumentService_1.DocumentService.shareDocument(documentId, userId, sharedEmail);
                res.status(200).json(documents);
            }
            catch (error) {
                const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
                const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
                res.status(statusCode).json({ error: errorMessage });
            }
        });
    },
    getSharedDocuments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.headers.userid;
            try {
                const documents = yield DocumentService_1.DocumentService.getSharedDocuments(userId);
                res.status(200).json(documents);
            }
            catch (error) {
                const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
                const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
                res.status(statusCode).json({ error: errorMessage });
            }
        });
    },
    /*--------------------------------------------------------------*/
    searchDocuments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.headers.userid;
            const query = req.query.query;
            try {
                const documents = yield DocumentService_1.DocumentService.searchDocuments(userId, query);
                res.status(200).json(documents);
            }
            catch (error) {
                const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
                const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
                res.status(statusCode).json({ error: errorMessage });
            }
        });
    },
    /*--------------------------------------------------------------*/
    removeIcon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.headers.userid;
            const documentId = req.params.id;
            try {
                yield DocumentService_1.DocumentService.removeIcon(documentId, userId);
                res.status(200).json({ success: true });
            }
            catch (error) {
                const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
                const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
                res.status(statusCode).json({ error: errorMessage });
            }
        });
    },
    /*--------------------------------------------------------------*/
    getCoverOffset(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.headers.userid;
            const documentId = req.params.id;
            try {
                const offset = yield DocumentService_1.DocumentService.getCoverOffset(documentId, userId);
                res.status(200).json(offset);
            }
            catch (error) {
                const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
                const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
                res.status(statusCode).json({ error: errorMessage });
            }
        });
    },
    setCoverOffset(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.headers.userid;
            const documentId = req.params.id;
            const { coverOffset } = req.body;
            try {
                yield DocumentService_1.DocumentService.setCoverOffset(documentId, userId, coverOffset);
                res.status(200).json({ success: true });
            }
            catch (error) {
                const statusCode = error.status || 500; // Si 'error.status' est undefined, utilise 500 par défaut
                const errorMessage = error.message || "Internal Server Error"; // Message d'erreur par défaut
                res.status(statusCode).json({ error: errorMessage });
            }
        });
    },
};
//# sourceMappingURL=DocumentController.js.map