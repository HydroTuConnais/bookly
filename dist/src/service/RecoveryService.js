"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoveryService = void 0;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const RecoveryRepository_1 = require("../repository/RecoveryRepository");
const Error_1 = require("../utils/Error");
exports.RecoveryService = {
    async inputRegisteryEmail(prevemail, email, token) {
        if (!prevemail || !email || !token) {
            throw new Error_1.ErrorClass(400, 'Email and token are required');
        }
        RecoveryRepository_1.RecoveryRepository.createRecoveryMail({ prevemail, email, token });
    },
    async inputRegisteryPassword(prevemail, token) {
        if (!prevemail || !token) {
            throw new Error_1.ErrorClass(400, 'Email and token are required');
        }
        RecoveryRepository_1.RecoveryRepository.createRecoveryPassword({ prevemail, token });
    },
    async getRecoveryId(prevemail) {
        try {
            return await RecoveryRepository_1.RecoveryRepository.getLastRecoveryByPrevEmail(prevemail);
        }
        catch (error) {
            throw new Error_1.ErrorClass(404, 'Invalid or expired token');
        }
    },
    async deleteRecoveryId(email) {
        try {
            return await RecoveryRepository_1.RecoveryRepository.deleteRecoveryId(email);
        }
        catch (error) {
            throw new Error_1.ErrorClass(404, 'Invalid or expired token');
        }
    }
};
//# sourceMappingURL=RecoveryService.js.map