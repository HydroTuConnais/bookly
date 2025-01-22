import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface RecoveryDataEmail {
    prevemail: string;
    email: string;
    token: string;
}

interface RecoveryDataPassword {
    prevemail: string;
    token: string;
}

export const RecoveryRepository = {
    async createRecoveryMail(data: RecoveryDataEmail) {
        try {
            return await prisma.recover.create({
                data: {
                    emailPrev: data.prevemail,
                    email: data.email,
                    token: data.token
                }
            });
        } catch (error) {
            console.error('Error creating recovery:', error);
            throw error;
        }
    },

    async createRecoveryPassword(data: RecoveryDataPassword) {
        try {
            return await prisma.recover.create({
                data: {
                    emailPrev: data.prevemail,
                    token: data.token
                }
            });
        } catch (error) {
            console.error('Error creating recovery:', error);
            throw error;
        }
    },

    async getLastRecoveryByPrevEmail(prevemail: string) {
        try {
            return await prisma.recover.findFirst({
                where: {
                    emailPrev: prevemail
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
        } catch (error) {
            console.error('Error getting last recovery by prevemail:', error);
            throw error;
        }
    },

    async deleteRecoveryId(email: string) {
        try {
            return await prisma.recover.deleteMany({
                where: {
                    emailPrev: email
                }
            });
        } catch (error) {
            console.error('Error deleting recovery by email:', error);
            throw error;
        }
    }
}