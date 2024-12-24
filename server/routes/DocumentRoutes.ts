const express = require('express');
import { DocumentController } from '../controllers/DocumentController';
import { authenticate } from '../service/AuthService';

const router = express.Router();


router.get('/documents/:id/content', authenticate, DocumentController.getDocument);
router.post('/documents', authenticate, DocumentController.createDocument);
router.put('/documents/:id/content', authenticate, DocumentController.updateDocument);
router.delete('/documents/:id/content', authenticate, DocumentController.deleteDocument);

router.get('/documents/sidebar', authenticate, DocumentController.getSidebarDocuments);

router.get('/documents/trash', authenticate, DocumentController.getArchivedDocuments);
router.post('/documents/:id/archive', authenticate, DocumentController.archiveDocument);
router.post('/documents/:id/restore', authenticate, DocumentController.restoreDocument);

router.post('/documents/:id/favorite', authenticate, DocumentController.favoriteDocument);
router.post('/documents/:id/unfavorite', authenticate, DocumentController.unfavoriteDocument);
router.get('/documents/favorite', authenticate, DocumentController.getfavoriteDocuments);
router.get('/documents/favorite/count', authenticate, DocumentController.getcountFavoriteDocuments);

router.post('/documents/:id/shared', authenticate, DocumentController.shareDocument);
router.get('/documents/shared', authenticate, DocumentController.getSharedDocuments);

export default router;