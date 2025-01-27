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
exports.DocumentRepository = void 0;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.DocumentRepository = {
    findDocumentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.document.findUnique({ where: { id } });
        });
    },
    getAllDocuments() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.document.findMany();
        });
    },
    findDocumentsByParent(userId, parentDocumentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.document.findMany({
                where: { userId, parentDocumentId, isArchived: false },
                orderBy: { createdAt: 'asc' },
                include: { _count: { select: { children: { where: { isArchived: false } } } } }
            });
        });
    },
    findSharedUserIds(userId, documentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield prisma.document.findUnique({
                where: { id: documentId },
                include: { sharedUsers: true }
            });
            if (!document || !document.sharedUsers) {
                throw new Error('Document or shared users not found');
            }
            const userIds = document.sharedUsers.map((user) => user.id);
            if (!userIds.includes(userId)) {
                throw new Error('Shared users not found');
            }
            return userIds[0];
        });
    },
    findUserIdByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({ where: { email } });
            return (user === null || user === void 0 ? void 0 : user.id) || null;
        });
    },
    /*--------------------------------------------------------------*/
    createDocument(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.document.create({ data });
        });
    },
    updateDocument(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.document.update({ where: { id }, data });
        });
    },
    deleteDocument(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.document.delete({ where: { id } });
        });
    },
    /*--------------------------------------------------------------*/
    findChildDocuments(userId, parentDocumentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.document.findMany({ where: { userId, parentDocumentId } });
        });
    },
    /*--------------------------------------------------------------*/
    findArchivedDocuments(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.document.findMany({
                where: {
                    userId,
                    isArchived: true,
                    archivedId: {
                        endsWith: 'p', // Vérifie que le dernier caractère de archivedId est 'p'
                    },
                },
                orderBy: { createdAt: 'desc' },
            });
        });
    },
    findDocumentsByArchivedId(userId, archivedId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.document.findMany({
                where: { userId, archivedId },
            });
        });
    },
    /*--------------------------------------------------------------*/
    favoriteDocument(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.document.update({
                where: { id },
                data: { isFavorite: true, isArchived: false }
            });
        });
    },
    unfavoriteDocument(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.document.update({
                where: { id },
                data: { isFavorite: false }
            });
        });
    },
    findFavoriteByParent(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.document.findMany({
                where: { userId, isFavorite: true, isArchived: false },
                orderBy: { createdAt: 'asc' },
                include: { _count: { select: { children: true } } }
            });
        });
    },
    findFavoriteForChild(userId, parentDocumentId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.document.findMany({
                where: { userId, parentDocumentId, isArchived: false },
                orderBy: { createdAt: 'asc' },
                include: { _count: { select: { children: true } } }
            });
        });
    },
    countFavorite(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield prisma.document.count({
                where: { userId, isFavorite: true, isArchived: false }
            });
            return response;
        });
    },
    /*--------------------------------------------------------------*/
    addSharedUser(documentId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.document.update({
                where: { id: documentId },
                data: {
                    sharedUsers: {
                        connect: { id: userId }
                    }
                }
            });
        });
    },
    findSharedDocuments(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.document.findMany({
                where: {
                    sharedUsers: {
                        some: {
                            id: userId
                        }
                    }
                },
                orderBy: { createdAt: 'desc' },
            });
        });
    },
    /*--------------------------------------------------------------*/
    searchDocuments(userId, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchCondition = query
                ? {
                    OR: [
                        { title: { contains: query, mode: 'insensitive' } },
                        { content: { contains: query, mode: 'insensitive' } }
                    ]
                }
                : {};
            return yield prisma.document.findMany({
                where: Object.assign(Object.assign({}, searchCondition), { isArchived: false, userId }),
                orderBy: { createdAt: 'desc' },
            });
        });
    },
    /*--------------------------------------------------------------*/
    removeIcon(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.document.update({
                where: { id },
                data: { icon: null }
            });
        });
    },
    /*--------------------------------------------------------------*/
    getCoverOffset(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield prisma.document.findUnique({
                where: { id },
                select: { offsety: true }
            });
            const offsety = response === null || response === void 0 ? void 0 : response.offsety;
            return offsety;
        });
    },
    setCoverOffset(id, offsety) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.document.update({
                where: { id },
                data: { offsety }
            });
        });
    },
};
//# sourceMappingURL=DocumentRepository.js.map