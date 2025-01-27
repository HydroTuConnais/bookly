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
exports.AuthRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.AuthRepository = {
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findUnique({ where: { email } });
        });
    },
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findUnique({ where: { id } });
        });
    },
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findMany();
        });
    },
    findEmainById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findUnique({ where: { id }, select: { email: true } });
        });
    },
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.create({ data });
        });
    },
    checkDoublon(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findUnique({ where: { email } });
        });
    },
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.update({ where: { id }, data });
        });
    }
};
//# sourceMappingURL=AuthRepository.js.map