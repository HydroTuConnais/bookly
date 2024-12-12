const express = require('express');
import { DocumentController } from '../controllers/DocumentController';
import { authenticate } from '../service/AuthService';

const router = express.Router();

router.put('/documents', authenticate, DocumentController.createDocument);
router.post('/documents/:id/archive', authenticate, DocumentController.archiveDocument);
router.post('/documents/:id/restore', authenticate, DocumentController.restoreDocument);
router.delete('/documents/:id', authenticate, DocumentController.deleteDocument);
router.get('/documents/sidebar', authenticate, DocumentController.getSidebarDocuments);
router.get('/documents/trash', authenticate, DocumentController.getArchivedDocuments);

export default router;