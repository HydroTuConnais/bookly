"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const ImageRepository_1 = require("../repository/ImageRepository");
const DocumentRepository_1 = require("../repository/DocumentRepository");
exports.ImageService = {
    async saveImage(imageData) {
        const imageId = (0, uuid_1.v4)();
        const imageUrl = process.env.SERVER_URL + "/api/image/" + imageId;
        const wait = await ImageRepository_1.ImageRepository.createImage(imageId, imageUrl, imageData);
        if (wait) {
            return imageUrl;
        }
        if (!wait) {
            throw new Error("Failed to save image metadata");
        }
    },
    async updateImage(id, imageData) {
        return await ImageRepository_1.ImageRepository.updateImage(id, imageData);
    },
    async getAllImages() {
        return await ImageRepository_1.ImageRepository.findAllImages();
    },
    async getImageById(id) {
        return await ImageRepository_1.ImageRepository.findImageById(id);
    },
    async deleteImage(id, url) {
        const imageId = await ImageRepository_1.ImageRepository.findImageByIdDocument(url);
        const image = await ImageRepository_1.ImageRepository.findImageById(imageId);
        if (!image) {
            throw new Error("Image not found");
        }
        try {
            fs_1.default.unlinkSync(image.filepath);
        }
        catch (error) {
            console.error("Failed to delete image file:", error);
        }
        await ImageRepository_1.ImageRepository.deleteImage(imageId);
        await DocumentRepository_1.DocumentRepository.updateDocument(id, { coverImage: null });
        return { message: "Image deleted successfully" };
    }
};
//# sourceMappingURL=ImageService.js.map