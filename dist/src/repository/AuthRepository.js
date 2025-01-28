import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const AuthRepository = {
    async findUserByEmail(email) {
        return await prisma.user.findUnique({ where: { email } });
    },
    async findUserById(id) {
        return await prisma.user.findUnique({ where: { id } });
    },
    async findAllUsers() {
        return await prisma.user.findMany();
    },
    async findEmainById(id) {
        return await prisma.user.findUnique({ where: { id }, select: { email: true } });
    },
    async createUser(data) {
        return await prisma.user.create({ data });
    },
    async checkDoublon(email) {
        return await prisma.user.findUnique({ where: { email } });
    },
    async updateUser(id, data) {
        return await prisma.user.update({ where: { id }, data });
    }
};
//# sourceMappingURL=AuthRepository.js.map