import { it } from 'node:test';
import { DocumentRepository } from '../repository/DocumentRepository';
import { ErrorClass } from '../utils/Error';


export const DocumentService = {
  async createDocument(title: string, parentDocumentId: string | null, userId: string) {
    try { 
      if (!title || !userId) {
        throw new ErrorClass(400,'Title and userId are required');
      }

      if (parentDocumentId || parentDocumentId === null) {
        const parentDocumentExists = await DocumentService.parentDocumentExists(parentDocumentId);
        if (!parentDocumentExists) {
          throw new ErrorClass(400,'Document parent pas existant');
        }
      }

      return await DocumentRepository.createDocument({
        title, 
        parentDocumentId: parentDocumentId ?? null, 
        userId, 
        isArchived: false, 
        isPublished: false 
      }); 
    }
    catch (error) {
      throw new ErrorClass(404,'Error creating document'); }
  },

  async updateDocument(id: string, title: string, userId: string, content: string) {
    const document = await DocumentRepository.findDocumentById(id);
    if (!document || document.userId !== userId) {
      throw new ErrorClass(401,'Unauthorized or Not Found');
    }

    try { await DocumentRepository.updateDocument(id, { title, content }); } 
    catch (error) {
      throw new ErrorClass(404,'Error updating document');
    } 
  },

  async parentDocumentExists (parentDocumentId: string | null) {
    try {
      return await DocumentRepository.findDocumentById(parentDocumentId); 
    } 
    catch (error) {
      throw new ErrorClass(404,'Error finding parent document');
    }
  },
  
  async archiveDocument(id: string, userId: string) {
    const document = await DocumentRepository.findDocumentById(id);
    if (!document || document.userId !== userId) {
      throw new ErrorClass(401,'Unauthorized or Not Found');
    }

    const recursiveArchive = async (documentId: string) => {
      const children = await DocumentRepository.findChildDocuments(userId, documentId);
      for (const child of children) {
        await DocumentRepository.updateDocument(child.id, { isArchived: true });
        await recursiveArchive(child.id);
      }
    };

    try {
      await DocumentRepository.updateDocument(id, { isArchived: true }); 
    }
    catch (error) {
      throw new ErrorClass(500,'Error finding parent document');
    }
    

    try {
      await recursiveArchive(id); 
    }
    catch (error) {
      throw new ErrorClass(500,'Error recusive archiving document');  
    }
  },

  async restoreDocument(id: string, userId: string) {
    const document = await DocumentRepository.findDocumentById(id);
    if (!document || document.userId !== userId) {
      throw new ErrorClass(401,'Unauthorized or Not Found');
    }

    const recursiveRestore = async (documentId: string) => {
      const children = await DocumentRepository.findChildDocuments(userId, documentId);
      for (const child of children) {
        await DocumentRepository.updateDocument(child.id, { isArchived: false });
        await recursiveRestore(child.id);
      }
    };

    try {
      await DocumentRepository.updateDocument(id, { isArchived: false }); 
    }
    catch (error) {
      throw new ErrorClass(500,'Error restore document');
    }
    

    try {
      await recursiveRestore(id); 
    }
    catch (error) {
      throw new ErrorClass(500,'Error recusive restore document');
    }    
  },


  async deleteDocument(id: string, userId: string) {
    const document = await DocumentRepository.findDocumentById(id);
    if (!document || document.userId !== userId) {
      throw new ErrorClass(401,'Unauthorized or Not Found');
    }

    try {
      await DocumentRepository.deleteDocument(id); 
    }
    catch (error) {
      throw new ErrorClass(500,'Error deleting document');
    }
  },

  async getSidebarDocuments(userId: string, parentDocumentId: string | null) {
    try {
      return await DocumentRepository.findDocumentsByParent(userId, parentDocumentId, false); 
    }
    catch (error) {
      throw new ErrorClass(500,'Error getting sidebar documents');
    }    
  },

  async getArchivedDocuments(userId: string) {
    try {
      return await DocumentRepository.findArchivedDocuments(userId); 
    }
    catch (error) {
      throw new ErrorClass(500,'Error getting archived documents');
    }
  },
};