"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const RecoveryController_1 = require("../controllers/RecoveryController");
const AuthService_1 = require("../service/AuthService");
const router = express.Router();
router.post('/recovery/send/email', AuthService_1.authenticate, RecoveryController_1.RecoveryController.sendRemail);
router.post('/recovery/email/:id/:token', RecoveryController_1.RecoveryController.recoveryEmail);
router.post('/recovery/reset/password', AuthService_1.authenticate, RecoveryController_1.RecoveryController.resetPassword);
router.post('/recovery/send/password', AuthService_1.authenticate, RecoveryController_1.RecoveryController.sendRPassword);
router.post('/recovery/password/:id/:token', RecoveryController_1.RecoveryController.recoveryPassword);
exports.default = router;
//# sourceMappingURL=RecoveryRoutes.js.map