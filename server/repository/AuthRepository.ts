import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const AuthRepository = {
  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  },

  async createUser(data: any) {
    return await prisma.user.create({ data });
  },

  async checkDoublon(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  },

  async findUser(id: string) {
    return await prisma.user.findUnique({ where: { id } });
  }
};