const express = require('express');
import { DocumentController } from '../controllers/DocumentController';
import { authenticate } from '../service/AuthService';

const router = express.Router();

router.post('/documents', authenticate, DocumentController.createDocument);

router.get('/documents/:id', authenticate, DocumentController.getDocument);
router.put('/documents/:id', authenticate, DocumentController.updateDocument);
router.delete('/documents/:id', authenticate, DocumentController.deleteDocument);

router.get('/documents/sidebar', authenticate, DocumentController.getSidebarDocuments);

router.post('/documents/:id/archive', authenticate, DocumentController.archiveDocument);
router.post('/documents/:id/restore', authenticate, DocumentController.restoreDocument);
router.get('/documents/trash', authenticate, DocumentController.getArchivedDocuments);

router.post('/documents/:id/shared', DocumentController.shareDocument);
router.get('/documents/shared', authenticate, DocumentController.getSharedDocuments);

export default router;