import express, { Request, Response } from 'express';
import { DocumentService } from '../service/DocumentService';
import { AuthService } from '../service/AuthService';
import { ErrorClass } from '../utils/Error';

export const DocumentController = {

  async getDocument(req: Request, res: Response) {
    const id = req.params.id;
    const userId = req.headers.userid as string;

    try {
      const document = await DocumentService.getDocument(id, userId);
      res.status(200).json(document);
    }
    catch (error: ErrorClass | any) {
      res.status(error.status).json({ error: error.message });
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
      res.status(error.status).json({ error: error.message });
    }
  },

  async updateDocument(req: Request, res: Response) {
    const id = req.params.id;
    const { title, content } = req.body;
    const userId = req.headers.userid as string;

    try {
      await DocumentService.updateDocument(id, title, userId, content);
      res.status(202).json({ success: true });
    }
    catch (error: ErrorClass | any) {
      res.status(error.status).json({ error: error.message });
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
      res.status(error.status).json({ error: error.message });
    }
  },

  /*--------------------------------------------------------------*/

  async getSidebarDocuments(req: Request, res: Response) {
    const parentDocumentId = req.query.parentDocument as string | null;
    const userId = req.headers.userid as string;

    try {
      const documents = await DocumentService.getSidebarDocuments(userId, parentDocumentId);
      console.log(documents);
      res.status(200).json(documents);
    }
    catch (error: ErrorClass | any) {
      res.status(error.status).json({ error: error.message });
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
      res.status(error.status).json({ error: error.message });
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
      res.status(error.status).json({ error: error.message });
    }
  },

  async getArchivedDocuments(req: Request, res: Response) {
    const userId = req.headers.userid as string;

    try {
      const documents = await DocumentService.getArchivedDocuments(userId);
      res.status(200).json(documents);
    }
    catch (error: ErrorClass | any) {
      res.status(error.status).json({ error: error.message });
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
      res.status(error.status).json({ error: error.message });
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
      res.status(error.status).json({ error: error.message });
    }
  },

  async getfavoriteDocuments(req: Request, res: Response) {
    const parentFavoriteId = req.query.parentFavorite as string | null;
    const userId = req.headers.userid as string;

    try {
      const documents = await DocumentService.getfavoriteDocuments(userId, parentFavoriteId);
      res.status(200).json(documents);
    }
    catch (error: ErrorClass | any) {
      res.status(error.status).json({ error: error.message });
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
      res.status(error.status).json({ error: error.message });
    }
  },

  async getSharedDocuments(req: Request, res: Response) {
    const userId = req.headers.userid as string;

    try {
      const documents = await DocumentService.getSharedDocuments(userId);
      res.status(200).json(documents);
    }
    catch (error: ErrorClass | any) {
      res.status(error.status).json({ error: error.message });
    }
  }
};