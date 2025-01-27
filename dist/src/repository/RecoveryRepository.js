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
exports.RecoveryRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.RecoveryRepository = {
    createRecoveryMail(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.recover.create({
                    data: {
                        emailPrev: data.prevemail,
                        email: data.email,
                        token: data.token
                    }
                });
            }
            catch (error) {
                console.error('Error creating recovery:', error);
                throw error;
            }
        });
    },
    createRecoveryPassword(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("data", data);
            try {
                const reponse = yield prisma.recover.create({
                    data: {
                        emailPrev: data.prevemail,
                        token: data.token
                    }
                });
                console.log("reponse", reponse);
                return reponse;
            }
            catch (error) {
                console.error('Error creating recovery:', error);
                throw error;
            }
        });
    },
    getLastRecoveryByPrevEmail(prevemail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.recover.findFirst({
                    where: {
                        emailPrev: prevemail
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                });
            }
            catch (error) {
                console.error('Error getting last recovery by prevemail:', error);
                throw error;
            }
        });
    },
    deleteRecoveryId(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.recover.deleteMany({
                    where: {
                        emailPrev: email
                    }
                });
            }
            catch (error) {
                console.error('Error deleting recovery by email:', error);
                throw error;
            }
        });
    }
};
//# sourceMappingURL=RecoveryRepository.js.map