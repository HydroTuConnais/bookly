"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageRepository = void 0;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.ImageRepository = {
    async createImage(imageId, imageUrl, imageData) {
        return await prisma.image.create({
            data: {
                id: imageId,
                url: imageUrl,
                filename: imageData.filename,
                filepath: imageData.filepath,
            },
        });
    },
    async updateImage(id, imageData) {
        return await prisma.image.update({
            where: { id },
            data: {
                filename: imageData.filename,
                filepath: imageData.filepath,
            },
        });
    },
    async findAllImages() {
        return await prisma.image.findMany();
    },
    async findImageById(id) {
        const image = await prisma.image.findUnique({
            where: { id },
        });
        return image;
    },
    async findImageByIdDocument(id) {
        const document = await prisma.document.findFirst({
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
    },
    async deleteImage(id) {
        return await prisma.image.delete({
            where: { id },
        });
    }
};
//# sourceMappingURL=ImageRepository.js.map