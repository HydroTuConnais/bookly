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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
const ImageService_1 = require("../service/ImageService");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.ImageController = {
    uploadImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { filename, path: filepath } = req.file;
            try {
                const imageUrl = yield ImageService_1.ImageService.saveImage({ filename, filepath });
                res.status(201).json(imageUrl);
            }
            catch (error) {
                console.error(error.message);
                res.status(500).json({ error: "Failed to save image metadata" });
            }
        });
    },
    getAllImages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const images = yield ImageService_1.ImageService.getAllImages();
                res.status(200).json(images);
            }
            catch (error) {
                console.error(error.message);
                res.status(500).json({ error: "Failed to fetch images" });
            }
        });
    },
    getImageById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const image = yield ImageService_1.ImageService.getImageById(id);
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
        });
    },
    deleteImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { url } = req.body;
            try {
                yield ImageService_1.ImageService.deleteImage(id, url);
                res.status(200).json({ message: "Image deleted successfully" });
            }
            catch (error) {
                console.error(error.message);
                res.status(500).json({ error: "Failed to delete image" });
            }
        });
    }
};
//# sourceMappingURL=ImageController.js.map