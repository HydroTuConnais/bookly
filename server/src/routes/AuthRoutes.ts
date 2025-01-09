const express = require('express');
import { AuthController } from '../controllers/AuthController';
import { authenticate } from '../service/AuthService';


const router = express.Router();

router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.get('/auth/check', authenticate, AuthController.check);

export default router;