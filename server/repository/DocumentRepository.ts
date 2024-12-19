const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export const DocumentRepository = {
  async createDocument(data: any) {
    return await prisma.document.create({ data });

  },

  async findDocumentById(id: string | null) {
    return await prisma.document.findUnique({ where: { id } });
  },


  async findDocumentsByParent(userId: string, parentDocumentId: string | null, isArchived: boolean) {
    console.log("REPOSITORY");
    console.log(parentDocumentId);
    console.log(typeof (parentDocumentId));
    return await prisma.document.findMany({
      where: { userId, parentDocumentId, isArchived },
      orderBy: { createdAt: 'asc' },
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

  async updateDocument(id: string, data: any) {
    return await prisma.document.update({ where: { id }, data });
  },

  async deleteDocument(id: string) {
    return await prisma.document.delete({ where: { id } });
  },

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

  async findArchivedDocuments(userId: string) {
    return await prisma.document.findMany({
      where: { userId, isArchived: true },
      orderBy: { createdAt: 'desc' },
    });
  },

  async findChildDocuments(userId: string, parentDocumentId: string) {
    return await prisma.document.findMany({ where: { userId, parentDocumentId } });
  },

  async findUserIdByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    return user?.id || null;
  }
};
