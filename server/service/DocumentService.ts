import { DocumentRepository } from '../repository/DocumentRepository';
import { ErrorClass } from '../utils/Error';

import { v4 as uuidv4 } from 'uuid';


export const DocumentService = {

  async getDocument(id: string, userId: string) {
    const document = await DocumentRepository.findDocumentById(id);
    if (!document) {
      throw new ErrorClass(401, 'Document not Found');
    }

    if (document.userId !== userId) {
      try {
        const sharedIds = await DocumentRepository.findSharedUserIds(userId, id);

        if (sharedIds != userId) {
          throw new ErrorClass(401, 'Unauthorized or Not Found');
        }

        return document;
      }
      catch (error) {
        throw new ErrorClass(401, 'shardIds not found');
      }
    }

    if (document.userId == userId) {
      return document;
    }
  },

  async createDocument(title: string, parentDocumentId: string | null, userId: string) {

    if (!title || !userId) {
      throw new ErrorClass(400, 'Title and userId are required');
    }

    if (parentDocumentId === "null") {
      parentDocumentId = null;
    }

    if (parentDocumentId || parentDocumentId != null) {
      const parentDocumentExists = await DocumentService.parentDocumentExists(parentDocumentId);
      if (!parentDocumentExists) {
        throw new ErrorClass(400, 'Document parent pas existant');
      }
    }

    try {
      return await DocumentRepository.createDocument({
        title,
        parentDocumentId: parentDocumentId ?? null,
        userId,
        isArchived: false,
        isPublished: false
      });
    }
    catch (error) {
      throw new ErrorClass(404, 'Error process creating document');
    }
  },

  async updateDocument(id: string, title: string, userId: string, content: string) {
    try {
      if (!title || !userId) {
        throw new ErrorClass(400, 'Title and userId are required');
      }

      const document = await DocumentRepository.findDocumentById(id);
      if (!document || document.userId !== userId) {
        throw new ErrorClass(401, 'Unauthorized or Not Found');
      }

      await DocumentRepository.updateDocument(id, { title, content });
    }
    catch (error) {
      throw new ErrorClass(404, 'Error process updating document');
    }
  },

  async deleteDocument(id: string, userId: string) {
    const document = await DocumentRepository.findDocumentById(id);
    if (!document || document.userId !== userId) {
      throw new ErrorClass(401, 'Unauthorized or Not Found');
    }

    try {
      await DocumentRepository.deleteDocument(id);
    }
    catch (error) {
      throw new ErrorClass(500, 'Error process deleting document');
    }
  },

  /*--------------------------------------------------------------*/

  async getSidebarDocuments(userId: string, parentDocumentId: string | null) {

    if (parentDocumentId === "null") {
      parentDocumentId = null;
    }

    try {
      return await DocumentRepository.findDocumentsByParent(userId, parentDocumentId);
    }
    catch (error) {
      throw new ErrorClass(500, 'Error process getting sidebar documents');
    }
  },

  /*--------------------------------------------------------------*/

  async archiveDocument(id: string, userId: string) {
    const document = await DocumentRepository.findDocumentById(id);
    if (!document || document.userId !== userId) {
      throw new ErrorClass(401, 'Unauthorized or Not Found');
    }
  
    const recursiveArchive = async (documentId: string, archiveId: string) => {
      const children = await DocumentRepository.findChildDocuments(userId, documentId);
      for (const child of children) {
        if (!child.archivedId) { // Vérifie si l'enfant n'a pas déjà un archiveId
          await DocumentRepository.updateDocument(child.id, { isArchived: true, archivedId : archiveId + 'c' });
          await recursiveArchive(child.id, archiveId);
        }
      }
    };
  
    const archiveId = uuidv4();
  
    try {
      await DocumentRepository.updateDocument(id, { isArchived: true, archivedId : archiveId + 'p' });
    } catch (error) {
      throw new ErrorClass(500, 'Error process finding parent document');
    }
  
    try {
      await recursiveArchive(id, archiveId);
    } catch (error) {
      throw new ErrorClass(500, 'Error process recursive archiving document');
    }
  },

  async restoreDocument(id: string, userId: string) {
    const document = await DocumentRepository.findDocumentById(id);
    if (!document || document.userId !== userId) {
      throw new ErrorClass(401, 'Unauthorized or Not Found');
    }
  
    const archivedId = document.archivedId;
    console.log("archivedId", archivedId);
    if (!archivedId) {
      throw new ErrorClass(400, 'Document is not archived');
    }
  
    const recursiveRestore = async (archivedId: string) => {
      const documentsToRestore = await DocumentRepository.findDocumentsByArchivedId(userId, archivedId.slice(0, -1) + 'c');
      console.log("documentsToRestore", documentsToRestore);
      for (const doc of documentsToRestore) {
        await DocumentRepository.updateDocument(doc.id, { isArchived: false, archivedId: null });
      }
    };
  
    try {
      await DocumentRepository.updateDocument(id, { isArchived: false, archivedId: null });
    } catch (error) {
      throw new ErrorClass(500, 'Error process restore document');
    }
  
    try {
      await recursiveRestore(archivedId);
    } catch (error) {
      throw new ErrorClass(500, 'Error process recursive restore document');
    }
  },

  async getArchivedDocuments(userId: string) {
    try {
      return await DocumentRepository.findArchivedDocuments(userId);
    }
    catch (error) {
      throw new ErrorClass(500, 'Error process getting archived documents');
    }
  },

  /*--------------------------------------------------------------*/

  async favoriteDocument(id: string, userId: string) {
    const document = await DocumentRepository.findDocumentById(id);
    if (!document || document.userId !== userId) {
      throw new ErrorClass(401, 'Unauthorized or Not Found');
    }

    try {
      return await DocumentRepository.favoriteDocument(id, userId);
    }
    catch (error) {
      throw new ErrorClass(500, 'Error process favoriting document');
    }
  },

  async unfavoriteDocument(id: string, userId: string) {
    const document = await DocumentRepository.findDocumentById(id);
    if (!document || document.userId !== userId) {
      throw new ErrorClass(401, 'Unauthorized or Not Found');
    }

    try {
      return await DocumentRepository.unfavoriteDocument(id, userId);
    }
    catch (error) {
      throw new ErrorClass(500, 'Error process unfavoriting document');
    }
  },

  async getfavoriteDocuments(userId: string, parentFavoriteId: string | null , forChild: boolean) {

    if (parentFavoriteId === "null") {
      parentFavoriteId = null;
    }

    try {
      if(forChild) return await DocumentRepository.findFavoriteForChild(userId, parentFavoriteId);
      else return await DocumentRepository.findFavoriteByParent(userId);
    }
    catch (error) {
      throw new ErrorClass(500, 'Error process getting favorite documents');
    }
  },

  async getNumberOfFavoriteDocuments(userId: string) {
    try {
      return await DocumentRepository.countFavorite(userId);
    }
    catch (error) {
      throw new ErrorClass(500, 'Error process getting number of favorite documents');
    }
  },

  /*--------------------------------------------------------------*/

  async shareDocument(documentId: string, userId: string, sharedEmail: string) {
    if (!documentId || !userId) {
      throw new ErrorClass(400, 'Title and userId are required');
    }

    if (!sharedEmail) {
      throw new ErrorClass(400, 'Shared email is required');
    }

    const document = await DocumentRepository.findDocumentById(documentId);
    if (!document || document.userId !== userId) {
      throw new ErrorClass(401, 'Unauthorized or Not Found');
    }

    const sharedUserId = await DocumentRepository.findUserIdByEmail(sharedEmail);
    if (!sharedUserId) {
      throw new ErrorClass(404, 'Shared user not found');
    }

    try {
      await DocumentRepository.addSharedUser(documentId, sharedUserId);
    }
    catch (error) {
      throw new ErrorClass(500, 'Error process sharing document');
    }
  },

  async getSharedDocuments(userId: string) {
    try {
      return await DocumentRepository.findSharedDocuments(userId);
    }
    catch (error) {
      throw new ErrorClass(500, 'Error process getting shared documents');
    }
  },

  /*--------------------------------------------------------------*/

  async parentDocumentExists(parentDocumentId: string | null) {
    try {
      return await DocumentRepository.findDocumentById(parentDocumentId);
    }
    catch (error) {
      throw new ErrorClass(404, 'Error process finding parent document');
    }
  },

  /*--------------------------------------------------------------*/

  async searchDocuments(userId: string, query: string) {
    try {
      return await DocumentRepository.searchDocuments(userId, query);
    }
    catch (error) {
      throw new ErrorClass(500, 'Error process searching documents');
    }
  }
};