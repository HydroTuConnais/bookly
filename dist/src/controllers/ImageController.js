"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
const ImageService_1 = require("../service/ImageService");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.ImageController = {
    async uploadImage(req, res) {
        const { filename, path: filepath } = req.file;
        try {
            const imageUrl = await ImageService_1.ImageService.saveImage({ filename, filepath });
            res.status(201).json(imageUrl);
        }
        catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Failed to save image metadata" });
        }
    },
    async getAllImages(req, res) {
        try {
            const images = await ImageService_1.ImageService.getAllImages();
            res.status(200).json(images);
        }
        catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Failed to fetch images" });
        }
    },
    async getImageById(req, res) {
        const id = req.params.id;
        try {
            const image = await ImageService_1.ImageService.getImageById(id);
            if (!image) {
                res.status(404).json({ error: "Image not found" });
            }
            else {
                const filePath = path_1.default.resolve(image.filepath);
                if (fs_1.default.existsSync(filePath)) {
                    res.status(200).sendFile(filePath);
                }
                else {
                    res.status(404).json({ error: "File not found" });
                }
            }
        }
        catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Failed to fetch image" });
        }
    },
    async deleteImage(req, res) {
        const { id } = req.params;
        const { url } = req.body;
        try {
            await ImageService_1.ImageService.deleteImage(id, url);
            res.status(200).json({ message: "Image deleted successfully" });
        }
        catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Failed to delete image" });
        }
    }
};
//# sourceMappingURL=ImageController.js.map