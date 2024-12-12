import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const DocumentRepository = {
  async createDocument(data: any) {
    return await prisma.document.create({ data });
  },

  async findDocumentById(id: string) {
    return await prisma.document.findUnique({ where: { id } });
  },

  async findDocumentsByParent(userId: string, parentDocumentId: string | null, isArchived: boolean) {
    return await prisma.document.findMany({
      where: { userId, parentDocumentId, isArchived },
      orderBy: { createdAt: 'desc' },
    });
  },

  async updateDocument(id: string, data: any) {
    return await prisma.document.update({ where: { id }, data });
  },

  async deleteDocument(id: string) {
    return await prisma.document.delete({ where: { id } });
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
};
