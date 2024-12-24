const express = require('express');
import { DocumentController } from '../controllers/DocumentController';
import { authenticate } from '../service/AuthService';

const router = express.Router();

router.post('/documents', authenticate, DocumentController.createDocument);

router.get('/documents/:id/content', authenticate, DocumentController.getDocument);
router.put('/documents/:id/content', authenticate, DocumentController.updateDocument);
router.delete('/documents/:id/content', authenticate, DocumentController.deleteDocument);

router.get('/sidebar', authenticate, DocumentController.getSidebarDocuments);

router.post('/documents/:id/archive', authenticate, DocumentController.archiveDocument);
router.post('/documents/:id/restore', authenticate, DocumentController.restoreDocument);
router.get('/documents/trash', authenticate, DocumentController.getArchivedDocuments);

router.post('/documents/:id/shared', authenticate, DocumentController.shareDocument);
router.get('/documents/shared', authenticate, DocumentController.getSharedDocuments);

export default router;