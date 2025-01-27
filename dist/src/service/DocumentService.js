"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentService = void 0;
const DocumentRepository_1 = require("../repository/DocumentRepository");
const AuthService_1 = require("./AuthService");
const Error_1 = require("../utils/Error");
const uuid_1 = require("uuid");
exports.DocumentService = {
    async getAllDocuments() {
        try {
            return await DocumentRepository_1.DocumentRepository.getAllDocuments();
        }
        catch (error) {
            throw new Error_1.ErrorClass(500, 'Error process getting all documents');
        }
    },
    async getDocument(id, userId) {
        const document = await DocumentRepository_1.DocumentRepository.findDocumentById(id);
        if (!document) {
            throw new Error_1.ErrorClass(401, 'Document not Found');
        }
        const isAdmin = await AuthService_1.AuthService.checkAdmin(userId);
        if (!isAdmin) {
            if (document.userId !== userId) {
                try {
                    const sharedIds = await DocumentRepository_1.DocumentRepository.findSharedUserIds(userId, id);
                    if (sharedIds != userId) {
                        throw new Error_1.ErrorClass(401, 'Unauthorized or Not Found');
                    }
                    return document;
                }
                catch (error) {
                    throw new Error_1.ErrorClass(401, 'shardIds not found');
                }
            }
        }
        else {
            return document;
        }
        if (document.userId == userId) {
            return document;
        }
    },
    async createDocument(title, parentDocumentId, userId) {
        if (!title || !userId) {
            throw new Error_1.ErrorClass(400, 'Title and userId are required');
        }
        if (parentDocumentId === "null") {
            parentDocumentId = null;
        }
        if (parentDocumentId || parentDocumentId != null) {
            const parentDocumentExists = await exports.DocumentService.parentDocumentExists(parentDocumentId);
            if (!parentDocumentExists) {
                throw new Error_1.ErrorClass(400, 'Document parent pas existant');
            }
        }
        try {
            return await DocumentRepository_1.DocumentRepository.createDocument({
                title,
                parentDocumentId: parentDocumentId ?? null,
                userId,
                isArchived: false,
                isPublished: false
            });
        }
        catch (error) {
            throw new Error_1.ErrorClass(404, 'Error process creating document');
        }
    },
    async updateDocument(id, title, userId, content, emoji, coverImage, isPublished) {
        try {
            if (!userId) {
                throw new Error_1.ErrorClass(400, 'UserId is required');
            }
            const document = await DocumentRepository_1.DocumentRepository.findDocumentById(id);
            if (!AuthService_1.AuthService.checkAdmin(userId)) {
                if (!document || document.userId !== userId) {
                    throw new Error_1.ErrorClass(401, 'Unauthorized or Not Found');
                }
            }
            const updateData = {};
            console.log('updateDocument', id, title, content, emoji, coverImage, isPublished);
            if (title !== null && title !== undefined) {
                updateData.title = title;
            }
            if (content !== null && content !== undefined) {
                updateData.content = content;
            }
            if (emoji !== null && emoji !== undefined) {
                updateData.icon = emoji;
            }
            if (coverImage !== null && coverImage !== undefined) {
                updateData.coverImage = coverImage;
            }
            if (isPublished !== null && isPublished !== undefined) {
                updateData.isPublished = isPublished;
            }
            console.log('updateData', updateData);
            return await DocumentRepository_1.DocumentRepository.updateDocument(id, updateData);
        }
        catch (error) {
            throw new Error_1.ErrorClass(404, 'Error process updating document');
        }
    },
    async deleteDocument(id, userId) {
        const document = await DocumentRepository_1.DocumentRepository.findDocumentById(id);
        if (!document || document.userId !== userId) {
            throw new Error_1.ErrorClass(401, 'Unauthorized or Not Found');
        }
        try {
            await DocumentRepository_1.DocumentRepository.deleteDocument(id);
        }
        catch (error) {
            throw new Error_1.ErrorClass(500, 'Error process deleting document');
        }
    },
    /*--------------------------------------------------------------*/
    async getSidebarDocuments(userId, parentDocumentId) {
        if (parentDocumentId === "null") {
            parentDocumentId = null;
        }
        try {
            return await DocumentRepository_1.DocumentRepository.findDocumentsByParent(userId, parentDocumentId);
        }
        catch (error) {
            throw new Error_1.ErrorClass(500, 'Error process getting sidebar documents');
        }
    },
    /*--------------------------------------------------------------*/
    async archiveDocument(id, userId) {
        const document = await DocumentRepository_1.DocumentRepository.findDocumentById(id);
        if (!AuthService_1.AuthService.checkAdmin(userId)) {
            if (!document || document.userId !== userId) {
                throw new Error_1.ErrorClass(401, 'Unauthorized or Not Found');
            }
        }
        const recursiveArchive = async (documentId, archiveId) => {
            const children = await DocumentRepository_1.DocumentRepository.findChildDocuments(userId, documentId);
            for (const child of children) {
                if (!child.archivedId) { // Vérifie si l'enfant n'a pas déjà un archiveId
                    await DocumentRepository_1.DocumentRepository.updateDocument(child.id, { isArchived: true, archivedId: archiveId + 'c' });
                    await recursiveArchive(child.id, archiveId);
                }
            }
        };
        const archiveId = (0, uuid_1.v4)();
        try {
            await DocumentRepository_1.DocumentRepository.updateDocument(id, { isArchived: true, archivedId: archiveId + 'p' });
        }
        catch (error) {
            throw new Error_1.ErrorClass(500, 'Error process finding parent document');
        }
        try {
            await recursiveArchive(id, archiveId);
        }
        catch (error) {
            throw new Error_1.ErrorClass(500, 'Error process recursive archiving document');
        }
    },
    async restoreDocument(id, userId) {
        const document = await DocumentRepository_1.DocumentRepository.findDocumentById(id);
        if (!AuthService_1.AuthService.checkAdmin(userId)) {
            if (!document || document.userId !== userId) {
                throw new Error_1.ErrorClass(401, 'Unauthorized or Not Found');
            }
        }
        const archivedId = document.archivedId;
        //console.log("archivedId", archivedId);
        if (!archivedId) {
            throw new Error_1.ErrorClass(400, 'Document is not archived');
        }
        const recursiveRestore = async (archivedId) => {
            const documentsToRestore = await DocumentRepository_1.DocumentRepository.findDocumentsByArchivedId(userId, archivedId.slice(0, -1) + 'c');
            //console.log("documentsToRestore", documentsToRestore);
            for (const doc of documentsToRestore) {
                await DocumentRepository_1.DocumentRepository.updateDocument(doc.id, { isArchived: false, archivedId: null });
            }
        };
        try {
            await DocumentRepository_1.DocumentRepository.updateDocument(id, { isArchived: false, archivedId: null });
        }
        catch (error) {
            throw new Error_1.ErrorClass(500, 'Error process restore document');
        }
        try {
            await recursiveRestore(archivedId);
        }
        catch (error) {
            throw new Error_1.ErrorClass(500, 'Error process recursive restore document');
        }
    },
    async getArchivedDocuments(userId) {
        try {
            return await DocumentRepository_1.DocumentRepository.findArchivedDocuments(userId);
        }
        catch (error) {
            throw new Error_1.ErrorClass(500, 'Error process getting archived documents');
        }
    },
    /*--------------------------------------------------------------*/
    async favoriteDocument(id, userId) {
        const document = await DocumentRepository_1.DocumentRepository.findDocumentById(id);
        if (!document || document.userId !== userId) {
            throw new Error_1.ErrorClass(401, 'Unauthorized or Not Found');
        }
        try {
            return await DocumentRepository_1.DocumentRepository.favoriteDocument(id);
        }
        catch (error) {
            throw new Error_1.ErrorClass(500, 'Error process favoriting document');
        }
    },
    async unfavoriteDocument(id, userId) {
        const document = await DocumentRepository_1.DocumentRepository.findDocumentById(id);
        if (!document || document.userId !== userId) {
            throw new Error_1.ErrorClass(401, 'Unauthorized or Not Found');
        }
        try {
            return await DocumentRepository_1.DocumentRepository.unfavoriteDocument(id);
        }
        catch (error) {
            throw new Error_1.ErrorClass(500, 'Error process unfavoriting document');
        }
    },
    async getfavoriteDocuments(userId, parentFavoriteId, forChild) {
        if (parentFavoriteId === "null") {
            parentFavoriteId = null;
        }
        try {
            if (forChild)
                return await DocumentRepository_1.DocumentRepository.findFavoriteForChild(userId, parentFavoriteId);
            else
                return await DocumentRepository_1.DocumentRepository.findFavoriteByParent(userId);
        }
        catch (error) {
            throw new Error_1.ErrorClass(500, 'Error process getting favorite documents');
        }
    },
    async getNumberOfFavoriteDocuments(userId) {
        try {
            return await DocumentRepository_1.DocumentRepository.countFavorite(userId);
        }
        catch (error) {
            throw new Error_1.ErrorClass(500, 'Error process getting number of favorite documents');
        }
    },
    /*--------------------------------------------------------------*/
    async shareDocument(documentId, userId, sharedEmail) {
        if (!documentId || !userId) {
            throw new Error_1.ErrorClass(400, 'Title and userId are required');
        }
        if (!sharedEmail) {
            throw new Error_1.ErrorClass(400, 'Shared email is required');
        }
        const document = await DocumentRepository_1.DocumentRepository.findDocumentById(documentId);
        if (!document || document.userId !== userId) {
            throw new Error_1.ErrorClass(401, 'Unauthorized or Not Found');
        }
        const sharedUserId = await DocumentRepository_1.DocumentRepository.findUserIdByEmail(sharedEmail);
        if (!sharedUserId) {
            throw new Error_1.ErrorClass(404, 'Shared user not found');
        }
        try {
            await DocumentRepository_1.DocumentRepository.addSharedUser(documentId, sharedUserId);
        }
        catch (error) {
            throw new Error_1.ErrorClass(500, 'Error process sharing document');
        }
    },
    async getSharedDocuments(userId) {
        try {
            return await DocumentRepository_1.DocumentRepository.findSharedDocuments(userId);
        }
        catch (error) {
            throw new Error_1.ErrorClass(500, 'Error process getting shared documents');
        }
    },
    /*--------------------------------------------------------------*/
    async parentDocumentExists(parentDocumentId) {
        try {
            return await DocumentRepository_1.DocumentRepository.findDocumentById(parentDocumentId);
        }
        catch (error) {
            throw new Error_1.ErrorClass(404, 'Error process finding parent document');
        }
    },
    /*--------------------------------------------------------------*/
    async searchDocuments(userId, query) {
        try {
            return await DocumentRepository_1.DocumentRepository.searchDocuments(userId, query);
        }
        catch (error) {
            throw new Error_1.ErrorClass(500, 'Error process searching documents');
        }
    },
    /*--------------------------------------------------------------*/
    async removeIcon(documentId, userId) {
        try {
            const document = await DocumentRepository_1.DocumentRepository.findDocumentById(documentId);
            if (!document || document.userId !== userId) {
                throw new Error_1.ErrorClass(401, 'Unauthorized or Not Found');
            }
            return await DocumentRepository_1.DocumentRepository.removeIcon(documentId);
        }
        catch (error) {
            throw new Error_1.ErrorClass(500, 'Error process removing icon');
        }
    },
    /*--------------------------------------------------------------*/
    async getCoverOffset(documentId, userId) {
        try {
            const document = await DocumentRepository_1.DocumentRepository.findDocumentById(documentId);
            if (!AuthService_1.AuthService.checkAdmin(userId)) {
                if (!document || document.userId !== userId) {
                    throw new Error_1.ErrorClass(401, 'Unauthorized or Not Found');
                }
            }
            return await DocumentRepository_1.DocumentRepository.getCoverOffset(documentId);
        }
        catch (error) {
            throw new Error_1.ErrorClass(500, 'Error process getting cover offset');
        }
    },
    async setCoverOffset(documentId, userId, offset) {
        try {
            const document = await DocumentRepository_1.DocumentRepository.findDocumentById(documentId);
            if (!AuthService_1.AuthService.checkAdmin(userId)) {
                if (!document || document.userId !== userId) {
                    throw new Error_1.ErrorClass(401, 'Unauthorized or Not Found');
                }
            }
            return await DocumentRepository_1.DocumentRepository.setCoverOffset(documentId, offset);
        }
        catch (error) {
            throw new Error_1.ErrorClass(500, 'Error process setting cover offset');
        }
    }
};
//# sourceMappingURL=DocumentService.js.map