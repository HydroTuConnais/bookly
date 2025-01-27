"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoveryService = void 0;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const RecoveryRepository_1 = require("../repository/RecoveryRepository");
const Error_1 = require("../utils/Error");
exports.RecoveryService = {
    inputRegisteryEmail(prevemail, email, token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!prevemail || !email || !token) {
                throw new Error_1.ErrorClass(400, 'Email and token are required');
            }
            RecoveryRepository_1.RecoveryRepository.createRecoveryMail({ prevemail, email, token });
        });
    },
    inputRegisteryPassword(prevemail, token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!prevemail || !token) {
                throw new Error_1.ErrorClass(400, 'Email and token are required');
            }
            RecoveryRepository_1.RecoveryRepository.createRecoveryPassword({ prevemail, token });
        });
    },
    getRecoveryId(prevemail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield RecoveryRepository_1.RecoveryRepository.getLastRecoveryByPrevEmail(prevemail);
            }
            catch (error) {
                throw new Error_1.ErrorClass(404, 'Invalid or expired token');
            }
        });
    },
    deleteRecoveryId(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield RecoveryRepository_1.RecoveryRepository.deleteRecoveryId(email);
            }
            catch (error) {
                throw new Error_1.ErrorClass(404, 'Invalid or expired token');
            }
        });
    }
};
//# sourceMappingURL=RecoveryService.js.map