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
exports.DocumentService = void 0;
const DocumentRepository_1 = require("../repository/DocumentRepository");
const AuthService_1 = require("./AuthService");
const Error_1 = require("../utils/Error");
const uuid_1 = require("uuid");
exports.DocumentService = {
    getAllDocuments() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield DocumentRepository_1.DocumentRepository.getAllDocuments();
            }
            catch (error) {
                throw new Error_1.ErrorClass(500, 'Error process getting all documents');
            }
        });
    },
    getDocument(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield DocumentRepository_1.DocumentRepository.findDocumentById(id);
            if (!document) {
                throw new Error_1.ErrorClass(401, 'Document not Found');
            }
            const isAdmin = yield AuthService_1.AuthService.checkAdmin(userId);
            if (!isAdmin) {
                if (document.userId !== userId) {
                    try {
                        const sharedIds = yield DocumentRepository_1.DocumentRepository.findSharedUserIds(userId, id);
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
        });
    },
    createDocument(title, parentDocumentId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!title || !userId) {
                throw new Error_1.ErrorClass(400, 'Title and userId are required');
            }
            if (parentDocumentId === "null") {
                parentDocumentId = null;
            }
            if (parentDocumentId || parentDocumentId != null) {
                const parentDocumentExists = yield exports.DocumentService.parentDocumentExists(parentDocumentId);
                if (!parentDocumentExists) {
                    throw new Error_1.ErrorClass(400, 'Document parent pas existant');
                }
            }
            try {
                return yield DocumentRepository_1.DocumentRepository.createDocument({
                    title,
                    parentDocumentId: parentDocumentId !== null && parentDocumentId !== void 0 ? parentDocumentId : null,
                    userId,
                    isArchived: false,
                    isPublished: false
                });
            }
            catch (error) {
                throw new Error_1.ErrorClass(404, 'Error process creating document');
            }
        });
    },
    updateDocument(id, title, userId, content, emoji, coverImage, isPublished) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userId) {
                    throw new Error_1.ErrorClass(400, 'UserId is required');
                }
                const document = yield DocumentRepository_1.DocumentRepository.findDocumentById(id);
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
                return yield DocumentRepository_1.DocumentRepository.updateDocument(id, updateData);
            }
            catch (error) {
                throw new Error_1.ErrorClass(404, 'Error process updating document');
            }
        });
    },
    deleteDocument(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield DocumentRepository_1.DocumentRepository.findDocumentById(id);
            if (!document || document.userId !== userId) {
                throw new Error_1.ErrorClass(401, 'Unauthorized or Not Found');
            }
            try {
                yield DocumentRepository_1.DocumentRepository.deleteDocument(id);
            }
            catch (error) {
                throw new Error_1.ErrorClass(500, 'Error process deleting document');
            }
        });
    },
    /*--------------------------------------------------------------*/
    getSidebarDocuments(userId, parentDocumentId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (parentDocumentId === "null") {
                parentDocumentId = null;
            }
            try {
                return yield DocumentRepository_1.DocumentRepository.findDocumentsByParent(userId, parentDocumentId);
            }
            catch (error) {
                throw new Error_1.ErrorClass(500, 'Error process getting sidebar documents');
            }
        });
    },
    /*--------------------------------------------------------------*/
    archiveDocument(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield DocumentRepository_1.DocumentRepository.findDocumentById(id);
            if (!AuthService_1.AuthService.checkAdmin(userId)) {
                if (!document || document.userId !== userId) {
                    throw new Error_1.ErrorClass(401, 'Unauthorized or Not Found');
                }
            }
            const recursiveArchive = (documentId, archiveId) => __awaiter(this, void 0, void 0, function* () {
                const children = yield DocumentRepository_1.DocumentRepository.findChildDocuments(userId, documentId);
                for (const child of children) {
                    if (!child.archivedId) { // Vérifie si l'enfant n'a pas déjà un archiveId
                        yield DocumentRepository_1.DocumentRepository.updateDocument(child.id, { isArchived: true, archivedId: archiveId + 'c' });
                        yield recursiveArchive(child.id, archiveId);
                    }
                }
            });
            const archiveId = (0, uuid_1.v4)();
            try {
                yield DocumentRepository_1.DocumentRepository.updateDocument(id, { isArchived: true, archivedId: archiveId + 'p' });
            }
            catch (error) {
                throw new Error_1.ErrorClass(500, 'Error process finding parent document');
            }
            try {
                yield recursiveArchive(id, archiveId);
            }
            catch (error) {
                throw new Error_1.ErrorClass(500, 'Error process recursive archiving document');
            }
        });
    },
    restoreDocument(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield DocumentRepository_1.DocumentRepository.findDocumentById(id);
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
            const recursiveRestore = (archivedId) => __awaiter(this, void 0, void 0, function* () {
                const documentsToRestore = yield DocumentRepository_1.DocumentRepository.findDocumentsByArchivedId(userId, archivedId.slice(0, -1) + 'c');
                //console.log("documentsToRestore", documentsToRestore);
                for (const doc of documentsToRestore) {
                    yield DocumentRepository_1.DocumentRepository.updateDocument(doc.id, { isArchived: false, archivedId: null });
                }
            });
            try {
                yield DocumentRepository_1.DocumentRepository.updateDocument(id, { isArchived: false, archivedId: null });
            }
            catch (error) {
                throw new Error_1.ErrorClass(500, 'Error process restore document');
            }
            try {
                yield recursiveRestore(archivedId);
            }
            catch (error) {
                throw new Error_1.ErrorClass(500, 'Error process recursive restore document');
            }
        });
    },
    getArchivedDocuments(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield DocumentRepository_1.DocumentRepository.findArchivedDocuments(userId);
            }
            catch (error) {
                throw new Error_1.ErrorClass(500, 'Error process getting archived documents');
            }
        });
    },
    /*--------------------------------------------------------------*/
    favoriteDocument(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield DocumentRepository_1.DocumentRepository.findDocumentById(id);
            if (!document || document.userId !== userId) {
                throw new Error_1.ErrorClass(401, 'Unauthorized or Not Found');
            }
            try {
                return yield DocumentRepository_1.DocumentRepository.favoriteDocument(id);
            }
            catch (error) {
                throw new Error_1.ErrorClass(500, 'Error process favoriting document');
            }
        });
    },
    unfavoriteDocument(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield DocumentRepository_1.DocumentRepository.findDocumentById(id);
            if (!document || document.userId !== userId) {
                throw new Error_1.ErrorClass(401, 'Unauthorized or Not Found');
            }
            try {
                return yield DocumentRepository_1.DocumentRepository.unfavoriteDocument(id);
            }
            catch (error) {
                throw new Error_1.ErrorClass(500, 'Error process unfavoriting document');
            }
        });
    },
    getfavoriteDocuments(userId, parentFavoriteId, forChild) {
        return __awaiter(this, void 0, void 0, function* () {
            if (parentFavoriteId === "null") {
                parentFavoriteId = null;
            }
            try {
                if (forChild)
                    return yield DocumentRepository_1.DocumentRepository.findFavoriteForChild(userId, parentFavoriteId);
                else
                    return yield DocumentRepository_1.DocumentRepository.findFavoriteByParent(userId);
            }
            catch (error) {
                throw new Error_1.ErrorClass(500, 'Error process getting favorite documents');
            }
        });
    },
    getNumberOfFavoriteDocuments(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield DocumentRepository_1.DocumentRepository.countFavorite(userId);
            }
            catch (error) {
                throw new Error_1.ErrorClass(500, 'Error process getting number of favorite documents');
            }
        });
    },
    /*--------------------------------------------------------------*/
    shareDocument(documentId, userId, sharedEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!documentId || !userId) {
                throw new Error_1.ErrorClass(400, 'Title and userId are required');
            }
            if (!sharedEmail) {
                throw new Error_1.ErrorClass(400, 'Shared email is required');
            }
            const document = yield DocumentRepository_1.DocumentRepository.findDocumentById(documentId);
            if (!document || document.userId !== userId) {
                throw new Error_1.ErrorClass(401, 'Unauthorized or Not Found');
            }
            const sharedUserId = yield DocumentRepository_1.DocumentRepository.findUserIdByEmail(sharedEmail);
            if (!sharedUserId) {
                throw new Error_1.ErrorClass(404, 'Shared user not found');
            }
            try {
                yield DocumentRepository_1.DocumentRepository.addSharedUser(documentId, sharedUserId);
            }
            catch (error) {
                throw new Error_1.ErrorClass(500, 'Error process sharing document');
            }
        });
    },
    getSharedDocuments(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield DocumentRepository_1.DocumentRepository.findSharedDocuments(userId);
            }
            catch (error) {
                throw new Error_1.ErrorClass(500, 'Error process getting shared documents');
            }
        });
    },
    /*--------------------------------------------------------------*/
    parentDocumentExists(parentDocumentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield DocumentRepository_1.DocumentRepository.findDocumentById(parentDocumentId);
            }
            catch (error) {
                throw new Error_1.ErrorClass(404, 'Error process finding parent document');
            }
        });
    },
    /*--------------------------------------------------------------*/
    searchDocuments(userId, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield DocumentRepository_1.DocumentRepository.searchDocuments(userId, query);
            }
            catch (error) {
                throw new Error_1.ErrorClass(500, 'Error process searching documents');
            }
        });
    },
    /*--------------------------------------------------------------*/
    removeIcon(documentId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const document = yield DocumentRepository_1.DocumentRepository.findDocumentById(documentId);
                if (!document || document.userId !== userId) {
                    throw new Error_1.ErrorClass(401, 'Unauthorized or Not Found');
                }
                return yield DocumentRepository_1.DocumentRepository.removeIcon(documentId);
            }
            catch (error) {
                throw new Error_1.ErrorClass(500, 'Error process removing icon');
            }
        });
    },
    /*--------------------------------------------------------------*/
    getCoverOffset(documentId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const document = yield DocumentRepository_1.DocumentRepository.findDocumentById(documentId);
                if (!AuthService_1.AuthService.checkAdmin(userId)) {
                    if (!document || document.userId !== userId) {
                        throw new Error_1.ErrorClass(401, 'Unauthorized or Not Found');
                    }
                }
                return yield DocumentRepository_1.DocumentRepository.getCoverOffset(documentId);
            }
            catch (error) {
                throw new Error_1.ErrorClass(500, 'Error process getting cover offset');
            }
        });
    },
    setCoverOffset(documentId, userId, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const document = yield DocumentRepository_1.DocumentRepository.findDocumentById(documentId);
                if (!AuthService_1.AuthService.checkAdmin(userId)) {
                    if (!document || document.userId !== userId) {
                        throw new Error_1.ErrorClass(401, 'Unauthorized or Not Found');
                    }
                }
                return yield DocumentRepository_1.DocumentRepository.setCoverOffset(documentId, offset);
            }
            catch (error) {
                throw new Error_1.ErrorClass(500, 'Error process setting cover offset');
            }
        });
    }
};
//# sourceMappingURL=DocumentService.js.map