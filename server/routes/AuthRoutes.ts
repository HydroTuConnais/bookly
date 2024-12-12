const express = require('express');
import { AuthController } from '../controllers/AuthController';

const router = express.Router();

router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.get('/auth/check', AuthController.check);

export default router;