import { Request, Response } from 'express';
import { DocumentService } from '../service/DocumentService';
import { AuthService } from '../service/AuthService';
import { ErrorClass } from '../utils/Error';

const jwt = require('jsonwebtoken');

export const DocumentController = {

  async getAllDocuments(req: Request, res: Response) {
    const userId = req.headers.userid as string;
    const isAdmin = AuthService.checkAdmin(userId);

    if (!isAdmin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const documents = await DocumentService.getAllDocuments();
      res.status(200).json(documents);
    }
    catch (error: ErrorClass | any) {
    const statusCode = error.status || 500;  // Si 'error.status' est undefined, utilise 500 par défaut
    const errorMessage = error.message || "Internal Server Error";  // Message d'erreur par défaut
    res.status(statusCode).json({ error: errorMessage });
    }
  },

  async getDocument(req: Request, res: Response) {
    const id = req.params.id;
    const userId = req.headers.userid as string;

    try {
      const document = await DocumentService.getDocument(id, userId);
      res.status(200).json(document);
    }
    catch (error: ErrorClass | any) {
    const statusCode = error.status || 500;  // Si 'error.status' est undefined, utilise 500 par défaut
    const errorMessage = error.message || "Internal Server Error";  // Message d'erreur par défaut
    res.status(statusCode).json({ error: errorMessage });
    }
  },

  async createDocument(req: Request, res: Response) {
    const { title, parentDocumentId } = req.body;
    const userId = req.headers.userid as string;

    try {
      const document = await DocumentService.createDocument(title, parentDocumentId, userId);
      res.status(201).json(document);

    }
    catch (error: ErrorClass | any) {
    const statusCode = error.status || 500;  // Si 'error.status' est undefined, utilise 500 par défaut
    const errorMessage = error.message || "Internal Server Error";  // Message d'erreur par défaut
    res.status(statusCode).json({ error: errorMessage });
    }
  },

  async updateDocument(req: Request, res: Response) {
    const id = req.params.id;
    const { title, content, icon, coverImage, isPublished } = req.body;
    console.log('updateDocument', id, title, content, icon, coverImage, isPublished);

    let userId = req.headers.userid as string;
    if (!userId) {
      const token = req.headers.authorization?.split(' ')[1] || '';
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      if (payload) {
        userId = payload.id;
      }
    }

    console.log(userId);
    console.log(id)

    try {
      const document = await DocumentService.updateDocument(id, title, userId, content, icon, coverImage, isPublished);
      console.log('updateDocument', document);
      res.status(202).json(document);
    }
    catch (error: ErrorClass | any) {
    const statusCode = error.status || 500;  // Si 'error.status' est undefined, utilise 500 par défaut
    const errorMessage = error.message || "Internal Server Error";  // Message d'erreur par défaut
    res.status(statusCode).json({ error: errorMessage });
    }
  },

  async deleteDocument(req: Request, res: Response) {
    const id = req.params.id;
    const userId = req.headers.userid as string;

    try {
      await DocumentService.deleteDocument(id, userId);
      res.status(200).json({ success: true });
    }
    catch (error: ErrorClass | any) {
    const statusCode = error.status || 500;  // Si 'error.status' est undefined, utilise 500 par défaut
    const errorMessage = error.message || "Internal Server Error";  // Message d'erreur par défaut
    res.status(statusCode).json({ error: errorMessage });
    }
  },

  /*--------------------------------------------------------------*/

  async getSidebarDocuments(req: Request, res: Response) {
    const parentDocumentId = req.query.parentDocument as string | null;
    const userId = req.headers.userid as string;

    try {
      const documents = await DocumentService.getSidebarDocuments(userId, parentDocumentId);
      res.status(200).json(documents);
    }
    catch (error: ErrorClass | any) {
    const statusCode = error.status || 500;  // Si 'error.status' est undefined, utilise 500 par défaut
    const errorMessage = error.message || "Internal Server Error";  // Message d'erreur par défaut
    res.status(statusCode).json({ error: errorMessage });
    }
  },

  /*--------------------------------------------------------------*/

  async archiveDocument(req: Request, res: Response) {
    const id = req.params.id;
    const userId = req.headers.userid as string;

    try {
      await DocumentService.archiveDocument(id, userId);
      res.status(200).json({ success: true });
    }
    catch (error: ErrorClass | any) {
    const statusCode = error.status || 500;  // Si 'error.status' est undefined, utilise 500 par défaut
    const errorMessage = error.message || "Internal Server Error";  // Message d'erreur par défaut
    res.status(statusCode).json({ error: errorMessage });
    }
  },

  async restoreDocument(req: Request, res: Response) {
    const id = req.params.id;
    const userId = req.headers.userid as string;

    try {
      await DocumentService.restoreDocument(id, userId);
      res.status(200).json({ success: true });
    }
    catch (error: ErrorClass | any) {
    const statusCode = error.status || 500;  // Si 'error.status' est undefined, utilise 500 par défaut
    const errorMessage = error.message || "Internal Server Error";  // Message d'erreur par défaut
    res.status(statusCode).json({ error: errorMessage });
    }
  },

  async getArchivedDocuments(req: Request, res: Response) {
    const userId = req.headers.userid as string;

    try {
      const documents = await DocumentService.getArchivedDocuments(userId);
      res.status(200).json(documents);
    }
    catch (error: ErrorClass | any) {
    const statusCode = error.status || 500;  // Si 'error.status' est undefined, utilise 500 par défaut
    const errorMessage = error.message || "Internal Server Error";  // Message d'erreur par défaut
    res.status(statusCode).json({ error: errorMessage });
    }
  },

  /*--------------------------------------------------------------*/

  async favoriteDocument(req: Request, res: Response) {
    const id = req.params.id;
    const userId = req.headers.userid as string;

    try {
      const documents = await DocumentService.favoriteDocument(id, userId);
      res.status(200).json(documents);
    }
    catch (error: ErrorClass | any) {
    const statusCode = error.status || 500;  // Si 'error.status' est undefined, utilise 500 par défaut
    const errorMessage = error.message || "Internal Server Error";  // Message d'erreur par défaut
    res.status(statusCode).json({ error: errorMessage });
    }
  },

  async unfavoriteDocument(req: Request, res: Response) {
    const id = req.params.id;
    const userId = req.headers.userid as string;

    try {
      const documents = await DocumentService.unfavoriteDocument(id, userId);
      res.status(200).json(documents);
    }
    catch (error: ErrorClass | any) {
    const statusCode = error.status || 500;  // Si 'error.status' est undefined, utilise 500 par défaut
    const errorMessage = error.message || "Internal Server Error";  // Message d'erreur par défaut
    res.status(statusCode).json({ error: errorMessage });
    }
  },

  async getfavoriteDocuments(req: Request, res: Response) {
    const parentFavoriteId = req.query.parentFavorite as string | null;
    const forChild = req.query.forChild === 'true';
    const userId = req.headers.userid as string;

    try {
      const documents = await DocumentService.getfavoriteDocuments(userId, parentFavoriteId, forChild);
      res.status(200).json(documents);
    }
    catch (error: ErrorClass | any) {
    const statusCode = error.status || 500;  // Si 'error.status' est undefined, utilise 500 par défaut
    const errorMessage = error.message || "Internal Server Error";  // Message d'erreur par défaut
    res.status(statusCode).json({ error: errorMessage });
    }
  },

  async getcountFavoriteDocuments(req: Request, res: Response) {
    const userId = req.headers.userid as string;

    try {
      const count = await DocumentService.getNumberOfFavoriteDocuments(userId);
      res.status(200).json(count);
    }
    catch (error: ErrorClass | any) {
    const statusCode = error.status || 500;  // Si 'error.status' est undefined, utilise 500 par défaut
    const errorMessage = error.message || "Internal Server Error";  // Message d'erreur par défaut
    res.status(statusCode).json({ error: errorMessage });
    }
  },

  /*--------------------------------------------------------------*/

  async shareDocument(req: Request, res: Response) {
    const userId = req.headers.userid as string;
    const documentId = req.params.id;
    const { sharedEmail } = req.body;

    try {
      const documents = await DocumentService.shareDocument(documentId, userId, sharedEmail);
      res.status(200).json(documents);
    }
    catch (error: ErrorClass | any) {
    const statusCode = error.status || 500;  // Si 'error.status' est undefined, utilise 500 par défaut
    const errorMessage = error.message || "Internal Server Error";  // Message d'erreur par défaut
    res.status(statusCode).json({ error: errorMessage });
    }
  },

  async getSharedDocuments(req: Request, res: Response) {
    const userId = req.headers.userid as string;

    try {
      const documents = await DocumentService.getSharedDocuments(userId);
      res.status(200).json(documents);
    }
    catch (error: ErrorClass | any) {
    const statusCode = error.status || 500;  // Si 'error.status' est undefined, utilise 500 par défaut
    const errorMessage = error.message || "Internal Server Error";  // Message d'erreur par défaut
    res.status(statusCode).json({ error: errorMessage });
    }
  },

  /*--------------------------------------------------------------*/

  async searchDocuments(req: Request, res: Response) {
    const userId = req.headers.userid as string;
    const query = req.query.query as string;

    try {
      const documents = await DocumentService.searchDocuments(userId, query);
      res.status(200).json(documents);
    }
    catch (error: ErrorClass | any) {
    const statusCode = error.status || 500;  // Si 'error.status' est undefined, utilise 500 par défaut
    const errorMessage = error.message || "Internal Server Error";  // Message d'erreur par défaut
    res.status(statusCode).json({ error: errorMessage });
    }
  },

  /*--------------------------------------------------------------*/

  async removeIcon(req: Request, res: Response) {
    const userId = req.headers.userid as string;
    const documentId = req.params.id;

    try {
      await DocumentService.removeIcon(documentId, userId);
      res.status(200).json({ success: true });
    }
    catch (error: ErrorClass | any) {
    const statusCode = error.status || 500;  // Si 'error.status' est undefined, utilise 500 par défaut
    const errorMessage = error.message || "Internal Server Error";  // Message d'erreur par défaut
    res.status(statusCode).json({ error: errorMessage });
    }
  },

  /*--------------------------------------------------------------*/

  async getCoverOffset(req: Request, res: Response) {
    const userId = req.headers.userid as string;
    const documentId = req.params.id;

    try {
      const offset = await DocumentService.getCoverOffset(documentId, userId);
      res.status(200).json(offset);
    }
    catch (error: ErrorClass | any) {
    const statusCode = error.status || 500;  // Si 'error.status' est undefined, utilise 500 par défaut
    const errorMessage = error.message || "Internal Server Error";  // Message d'erreur par défaut
    res.status(statusCode).json({ error: errorMessage });
    }
  },

  async setCoverOffset(req: Request, res: Response) {
    const userId = req.headers.userid as string;
    const documentId = req.params.id;
    const { coverOffset } = req.body;

    try {
      await DocumentService.setCoverOffset(documentId, userId, coverOffset);
      res.status(200).json({ success: true });
    }
    catch (error: ErrorClass | any) {
    const statusCode = error.status || 500;  // Si 'error.status' est undefined, utilise 500 par défaut
    const errorMessage = error.message || "Internal Server Error";  // Message d'erreur par défaut
    res.status(statusCode).json({ error: errorMessage });
    }
  },
};