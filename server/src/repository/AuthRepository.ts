import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const AuthRepository = {
  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  },

  async findUserById(id: string) {
    return await prisma.user.findUnique({ where: { id } });
  },

  async findEmainById(id: string) {
    return await prisma.user.findUnique({ where: { id }, select: { email: true } });
  },

  async createUser(data: any) {
    return await prisma.user.create({ data });
  },

  async checkDoublon(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  },

  async updateUser(id: string, data: any) {
    return await prisma.user.update({ where: { id }, data });
  }
};