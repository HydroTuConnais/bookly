import express, { Request, Response } from 'express';
import { DocumentService } from '../service/DocumentService';

export const DocumentController = {
  async createDocument(req: Request, res: Response) {
    const { title, parentDocumentId, userId } = req.body;
    if (!title || !userId) {
      return res.status(400).json({ error: 'Titre et utilisateur requis' });
    }

    try {
      const document = await DocumentService.createDocument(title, parentDocumentId, userId);
      res.status(201).json(document);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la création du document' });
    }
  },

  async archiveDocument(req: Request, res: Response) {
    const id = req.params.id;
    const userId = req.headers.userid as string;

    try {
      await DocumentService.archiveDocument(id, userId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: (error as any).message });
    }
  },

  async restoreDocument(req: Request, res: Response) {
    const id = req.params.id;
    const userId = req.headers.userid as string;

    try {
      await DocumentService.restoreDocument(id, userId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: (error as any).message });
    }
  },

  async deleteDocument(req: Request, res: Response) {
    const id = req.params.id;
    const userId = req.headers.userid as string;

    try {
      await DocumentService.deleteDocument(id, userId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: (error as any).message });
    }
  },

  async getSidebarDocuments(req: Request, res: Response) {
    const parentDocumentId = req.query.parentDocument as string | null;
    const userId = req.headers.userid as string;

    try {
      const documents = await DocumentService.getSidebarDocuments(userId, parentDocumentId);
      res.json(documents);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des documents' });
    }
  },

  async getArchivedDocuments(req: Request, res: Response) {
    const userId = req.headers.userid as string;

    try {
      const documents = await DocumentService.getArchivedDocuments(userId);
      res.json(documents);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des documents archivés' });
    }
  },
};