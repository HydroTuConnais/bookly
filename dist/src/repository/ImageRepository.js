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
exports.ImageRepository = void 0;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.ImageRepository = {
    createImage(imageId, imageUrl, imageData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.image.create({
                data: {
                    id: imageId,
                    url: imageUrl,
                    filename: imageData.filename,
                    filepath: imageData.filepath,
                },
            });
        });
    },
    updateImage(id, imageData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.image.update({
                where: { id },
                data: {
                    filename: imageData.filename,
                    filepath: imageData.filepath,
                },
            });
        });
    },
    findAllImages() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.image.findMany();
        });
    },
    findImageById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield prisma.image.findUnique({
                where: { id },
            });
            return image;
        });
    },
    findImageByIdDocument(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield prisma.document.findFirst({
                where: {
                    coverImage: {
                        contains: id
                    }
                },
            });
            if (document && document.coverImage) {
                const match = document.coverImage.match(/\/([^\/]+)$/);
                if (match) {
                    return match[1]; // This will return the extracted ID
                }
            }
            return null;
        });
    },
    deleteImage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.image.delete({
                where: { id },
            });
        });
    }
};
//# sourceMappingURL=ImageRepository.js.map