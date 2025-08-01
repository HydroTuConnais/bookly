const express = require('express');
import { AuthController } from '../controllers/AuthController';
import { authenticate } from '../service/AuthService';

const router = express.Router();

router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.get('/auth/user', authenticate, AuthController.user);
router.get('/auth/users', authenticate, AuthController.users);

router.get('/auth/check', authenticate, AuthController.check);
router.post('/auth/password', authenticate, AuthController.psw);
router.put('/auth/update', authenticate, AuthController.update);

export default router;