import { DocumentRepository } from '../repository/DocumentRepository';

export const DocumentService = {
  async createDocument(title: string, parentDocumentId: string | null, userId: string) {
    return await DocumentRepository.createDocument({
      title,
      parentDocumentId,
      userId,
      isArchived: false,
      isPublished: false,
    });
  },

  async archiveDocument(id: string, userId: string) {
    const document = await DocumentRepository.findDocumentById(id);
    if (!document || document.userId !== userId) {
      throw new Error('Unauthorized or Not Found');
    }

    const recursiveArchive = async (documentId: string) => {
      const children = await DocumentRepository.findChildDocuments(userId, documentId);
      for (const child of children) {
        await DocumentRepository.updateDocument(child.id, { isArchived: true });
        await recursiveArchive(child.id);
      }
    };

    await DocumentRepository.updateDocument(id, { isArchived: true });
    await recursiveArchive(id);
  },

  async restoreDocument(id: string, userId: string) {
    const document = await DocumentRepository.findDocumentById(id);
    if (!document || document.userId !== userId) {
      throw new Error('Unauthorized or Not Found');
    }

    const recursiveRestore = async (documentId: string) => {
      const children = await DocumentRepository.findChildDocuments(userId, documentId);
      for (const child of children) {
        await DocumentRepository.updateDocument(child.id, { isArchived: false });
        await recursiveRestore(child.id);
      }
    };

    await DocumentRepository.updateDocument(id, { isArchived: false });
    await recursiveRestore(id);
  },

  async deleteDocument(id: string, userId: string) {
    const document = await DocumentRepository.findDocumentById(id);
    if (!document || document.userId !== userId) {
      throw new Error('Unauthorized or Not Found');
    }
    await DocumentRepository.deleteDocument(id);
  },

  async getSidebarDocuments(userId: string, parentDocumentId: string | null) {
    return await DocumentRepository.findDocumentsByParent(userId, parentDocumentId, false);
  },

  async getArchivedDocuments(userId: string) {
    return await DocumentRepository.findArchivedDocuments(userId);
  },
};