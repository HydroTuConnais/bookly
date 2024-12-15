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
    catch (error: ErrorClass | any) {
      throw new ErrorClass(error.status,error.message);
    } 
  },

  async getDocument(id: string, userId: string) {
      const document = await DocumentRepository.findDocumentById(id);
        if (!document) {
          throw new ErrorClass(401,'Document not Found');
        }
        
        if(document.userId !== userId){
          try {
            const sharedIds = await DocumentRepository.findSharedUserIds(userId, id);

            if (sharedIds != userId) {
              throw new ErrorClass(401,'Unauthorized or Not Found');
            }
  
            return document;
          }
          catch (error) {
            throw new ErrorClass(401,'shardIds not found');
          }
        }

        if(document.userId == userId){
          return document;
        }
  },

  async updateDocument(id: string, title: string, userId: string, content: string) {
    try {
      if (!userId) {
        throw new ErrorClass(400,'userId are required');
      }
      
      const document = await DocumentRepository.findDocumentById(id);
      if (!document || document.userId !== userId) {
        throw new ErrorClass(401,'Unauthorized or Not Found');
      }

     await DocumentRepository.updateDocument(id, { title, content }); 
    } 
    catch (error: ErrorClass | any) {
      throw new ErrorClass(error.status,error.message);
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
    catch (error: ErrorClass | any) {
      throw new ErrorClass(error.status,error.message);
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

  async shareDocument(documentId: string, userId: string, sharedEmail: string) {
    if (!documentId || !userId) {
      throw new ErrorClass(400,'Title and userId are required');
    }

    if(!sharedEmail) {
      throw new ErrorClass(400,'Shared email is required');
    }
    
    const document = await DocumentRepository.findDocumentById(documentId);
    if (!document || document.userId !== userId) {
      throw new ErrorClass(401,'Unauthorized or Not Found');
    }

    const sharedUserId = await DocumentRepository.findUserIdByEmail(sharedEmail);
    if (!sharedUserId) {
      throw new ErrorClass(404,'Shared user not found');
    }

    try {
      return await DocumentRepository.addSharedUser(documentId, sharedUserId);
    }
    catch (error) {
      throw new ErrorClass(500,'Error sharing document');
    }
  },

  async getSharedDocuments(userId: string) {
    console.log("TESTSERVICE");
    try {
      return await DocumentRepository.findSharedDocuments(userId); 
    }
    catch (error) {
      throw new ErrorClass(500,'Error getting shared documents');
    }
  }
};