const express = require('express');
import { RecoveryController } from '../controllers/RecoveryController';
import { authenticate } from '../service/AuthService';

const router = express.Router();

router.post('/recovery/send/email', authenticate, RecoveryController.sendRemail);
router.post('/recovery/email/:id/:token', RecoveryController.recoveryEmail);

router.post('/recovery/reset/password', authenticate, RecoveryController.resetPassword);

router.post('/recovery/send/password', authenticate, RecoveryController.sendRPassword);
router.post('/recovery/password/:id/:token', RecoveryController.recoveryPassword);


export default router;