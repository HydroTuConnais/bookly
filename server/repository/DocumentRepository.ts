const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export const DocumentRepository = {
  async findDocumentById(id: string | null) {
    return await prisma.document.findUnique({ where: { id } });
  },


  async findDocumentsByParent(userId: string, parentDocumentId: string | null, isArchived: boolean) {
    return await prisma.document.findMany({
      where: { userId, parentDocumentId, isArchived },
      orderBy: { createdAt: 'asc' },
      include: { _count: { select: { children: true } } }
    });
  },

  async findSharedUserIds(userId: string, documentId: string) {
    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: { sharedUsers: true }
    });

    if (!document || !document.sharedUsers) {
      throw new Error('Document or shared users not found');
    }

    const userIds = document.sharedUsers.map((user: { id: string }) => user.id);

    if (!userIds.includes(userId)) {
      throw new Error('Shared users not found');
    }

    return userIds[0];
  },

  async findUserIdByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    return user?.id || null;
  },

  /*--------------------------------------------------------------*/

  async createDocument(data: any) {
    return await prisma.document.create({ data });

  },

  async updateDocument(id: string, data: any) {
    return await prisma.document.update({ where: { id }, data });
  },

  async deleteDocument(id: string) {
    return await prisma.document.delete({ where: { id } });
  },

  /*--------------------------------------------------------------*/

  async findChildDocuments(userId: string, parentDocumentId: string) {
    return await prisma.document.findMany({ where: { userId, parentDocumentId } });
  },

  /*--------------------------------------------------------------*/

  async findArchivedDocuments(userId: string) {
    return await prisma.document.findMany({
      where: { userId, isArchived: true },
      orderBy: { createdAt: 'desc' },
    });
  },

  /*--------------------------------------------------------------*/

  async favoriteDocument(id: string, userId: string) {
    return await prisma.document.update({
      where: { id },
      data: { isFavorite: true, isArchived: false }
    });
  },

  async unfavoriteDocument(id: string, userId: string) {
    return await prisma.document.update({
      where: { id },
      data: { isFavorite: false }
    });
  },

  async findFavoriteByParent(userId: string) {
    console.log("forparent")
    return await prisma.document.findMany({
      where: { userId, isFavorite: true, isArchived: false },
      orderBy: { createdAt: 'asc' },
      include: { _count: { select: { children: true } } }
    });
  },

  async findFavoriteForChild(userId: string, parentDocumentId: string | null) {
    console.log("forchild")
    return await prisma.document.findMany({
      where: { userId, parentDocumentId, isArchived: false },
      orderBy: { createdAt: 'asc' },
      include: { _count: { select: { children: true } } }
    });
  },

  async countFavorite(userId: string) {
    return await prisma.document.count({
      where: { userId, isFavorite: true, isArchived: false }
    });
  },
  
  /*--------------------------------------------------------------*/

  async addSharedUser(documentId: string, userId: string) {
    return await prisma.document.update({
      where: { id: documentId },
      data: {
        sharedUsers: {
          connect: { id: userId }
        }
      }
    });
  },

  async findSharedDocuments(userId: string) {
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
};
