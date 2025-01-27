"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoveryRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.RecoveryRepository = {
    async createRecoveryMail(data) {
        try {
            return await prisma.recover.create({
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
    },
    async createRecoveryPassword(data) {
        console.log("data", data);
        try {
            const reponse = await prisma.recover.create({
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
    },
    async getLastRecoveryByPrevEmail(prevemail) {
        try {
            return await prisma.recover.findFirst({
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
    },
    async deleteRecoveryId(email) {
        try {
            return await prisma.recover.deleteMany({
                where: {
                    emailPrev: email
                }
            });
        }
        catch (error) {
            console.error('Error deleting recovery by email:', error);
            throw error;
        }
    }
};
//# sourceMappingURL=RecoveryRepository.js.map