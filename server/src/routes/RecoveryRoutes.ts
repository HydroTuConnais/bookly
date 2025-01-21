const express = require('express');
import { RecoveryController } from '../controllers/RecoveryController';
import { authenticate } from '../service/AuthService';

const router = express.Router();

router.post('/recovery/send/email', authenticate, RecoveryController.sendRemail);
router.get('/recovery/email/:id/:token', RecoveryController.recoveryEmail);

export default router;