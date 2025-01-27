"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const AuthController_1 = require("../controllers/AuthController");
const AuthService_1 = require("../service/AuthService");
const router = express.Router();
router.post('/auth/register', AuthController_1.AuthController.register);
router.post('/auth/login', AuthController_1.AuthController.login);
router.get('/auth/user', AuthService_1.authenticate, AuthController_1.AuthController.user);
router.get('/auth/users', AuthService_1.authenticate, AuthController_1.AuthController.users);
router.get('/auth/check', AuthService_1.authenticate, AuthController_1.AuthController.check);
router.post('/auth/password', AuthService_1.authenticate, AuthController_1.AuthController.psw);
router.put('/auth/update', AuthService_1.authenticate, AuthController_1.AuthController.update);
exports.default = router;
//# sourceMappingURL=AuthRoutes.js.map