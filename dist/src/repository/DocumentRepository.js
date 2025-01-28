const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
export const DocumentRepository = {
    async findDocumentById(id) {
        return await prisma.document.findUnique({ where: { id } });
    },
    async getAllDocuments() {
        return await prisma.document.findMany();
    },
    async findDocumentsByParent(userId, parentDocumentId) {
        return await prisma.document.findMany({
            where: { userId, parentDocumentId, isArchived: false },
            orderBy: { createdAt: 'asc' },
            include: { _count: { select: { children: { where: { isArchived: false } } } } }
        });
    },
    async findSharedUserIds(userId, documentId) {
        const document = await prisma.document.findUnique({
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
    },
    async findUserIdByEmail(email) {
        const user = await prisma.user.findUnique({ where: { email } });
        return user?.id || null;
    },
    /*--------------------------------------------------------------*/
    async createDocument(data) {
        return await prisma.document.create({ data });
    },
    async updateDocument(id, data) {
        return await prisma.document.update({ where: { id }, data });
    },
    async deleteDocument(id) {
        return await prisma.document.delete({ where: { id } });
    },
    /*--------------------------------------------------------------*/
    async findChildDocuments(userId, parentDocumentId) {
        return await prisma.document.findMany({ where: { userId, parentDocumentId } });
    },
    /*--------------------------------------------------------------*/
    async findArchivedDocuments(userId) {
        return await prisma.document.findMany({
            where: {
                userId,
                isArchived: true,
                archivedId: {
                    endsWith: 'p', // Vérifie que le dernier caractère de archivedId est 'p'
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    },
    async findDocumentsByArchivedId(userId, archivedId) {
        return await prisma.document.findMany({
            where: { userId, archivedId },
        });
    },
    /*--------------------------------------------------------------*/
    async favoriteDocument(id) {
        return await prisma.document.update({
            where: { id },
            data: { isFavorite: true, isArchived: false }
        });
    },
    async unfavoriteDocument(id) {
        return await prisma.document.update({
            where: { id },
            data: { isFavorite: false }
        });
    },
    async findFavoriteByParent(userId) {
        return await prisma.document.findMany({
            where: { userId, isFavorite: true, isArchived: false },
            orderBy: { createdAt: 'asc' },
            include: { _count: { select: { children: true } } }
        });
    },
    async findFavoriteForChild(userId, parentDocumentId) {
        return await prisma.document.findMany({
            where: { userId, parentDocumentId, isArchived: false },
            orderBy: { createdAt: 'asc' },
            include: { _count: { select: { children: true } } }
        });
    },
    async countFavorite(userId) {
        const response = await prisma.document.count({
            where: { userId, isFavorite: true, isArchived: false }
        });
        return response;
    },
    /*--------------------------------------------------------------*/
    async addSharedUser(documentId, userId) {
        return await prisma.document.update({
            where: { id: documentId },
            data: {
                sharedUsers: {
                    connect: { id: userId }
                }
            }
        });
    },
    async findSharedDocuments(userId) {
        return await prisma.document.findMany({
            where: {
                sharedUsers: {
                    some: {
                        id: userId
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
        });
    },
    /*--------------------------------------------------------------*/
    async searchDocuments(userId, query) {
        const searchCondition = query
            ? {
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { content: { contains: query, mode: 'insensitive' } }
                ]
            }
            : {};
        return await prisma.document.findMany({
            where: {
                ...searchCondition,
                isArchived: false,
                userId
            },
            orderBy: { createdAt: 'desc' },
        });
    },
    /*--------------------------------------------------------------*/
    async removeIcon(id) {
        return await prisma.document.update({
            where: { id },
            data: { icon: null }
        });
    },
    /*--------------------------------------------------------------*/
    async getCoverOffset(id) {
        const response = await prisma.document.findUnique({
            where: { id },
            select: { offsety: true }
        });
        const offsety = response?.offsety;
        return offsety;
    },
    async setCoverOffset(id, offsety) {
        return await prisma.document.update({
            where: { id },
            data: { offsety }
        });
    },
};
//# sourceMappingURL=DocumentRepository.js.map