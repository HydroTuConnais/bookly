import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { ImageRepository } from "../repository/ImageRepository";
import { DocumentRepository } from "../repository/DocumentRepository";
export const ImageService = {
    async saveImage(imageData) {
        const imageId = uuidv4();
        const imageUrl = process.env.SERVER_URL + "/api/image/" + imageId;
        const wait = await ImageRepository.createImage(imageId, imageUrl, imageData);
        if (wait) {
            return imageUrl;
        }
        if (!wait) {
            throw new Error("Failed to save image metadata");
        }
    },
    async updateImage(id, imageData) {
        return await ImageRepository.updateImage(id, imageData);
    },
    async getAllImages() {
        return await ImageRepository.findAllImages();
    },
    async getImageById(id) {
        return await ImageRepository.findImageById(id);
    },
    async deleteImage(id, url) {
        const imageId = await ImageRepository.findImageByIdDocument(url);
        const image = await ImageRepository.findImageById(imageId);
        if (!image) {
            throw new Error("Image not found");
        }
        try {
            fs.unlinkSync(image.filepath);
        }
        catch (error) {
            console.error("Failed to delete image file:", error);
        }
        await ImageRepository.deleteImage(imageId);
        await DocumentRepository.updateDocument(id, { coverImage: null });
        return { message: "Image deleted successfully" };
    }
};
//# sourceMappingURL=ImageService.js.map