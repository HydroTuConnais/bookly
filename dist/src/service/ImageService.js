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
exports.ImageService = void 0;
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const ImageRepository_1 = require("../repository/ImageRepository");
const DocumentRepository_1 = require("../repository/DocumentRepository");
exports.ImageService = {
    saveImage(imageData) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageId = (0, uuid_1.v4)();
            const imageUrl = process.env.SERVER_URL + "/api/image/" + imageId;
            const wait = yield ImageRepository_1.ImageRepository.createImage(imageId, imageUrl, imageData);
            if (wait) {
                return imageUrl;
            }
            if (!wait) {
                throw new Error("Failed to save image metadata");
            }
        });
    },
    updateImage(id, imageData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ImageRepository_1.ImageRepository.updateImage(id, imageData);
        });
    },
    getAllImages() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ImageRepository_1.ImageRepository.findAllImages();
        });
    },
    getImageById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ImageRepository_1.ImageRepository.findImageById(id);
        });
    },
    deleteImage(id, url) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageId = yield ImageRepository_1.ImageRepository.findImageByIdDocument(url);
            const image = yield ImageRepository_1.ImageRepository.findImageById(imageId);
            if (!image) {
                throw new Error("Image not found");
            }
            try {
                fs_1.default.unlinkSync(image.filepath);
            }
            catch (error) {
                console.error("Failed to delete image file:", error);
            }
            yield ImageRepository_1.ImageRepository.deleteImage(imageId);
            yield DocumentRepository_1.DocumentRepository.updateDocument(id, { coverImage: null });
            return { message: "Image deleted successfully" };
        });
    }
};
//# sourceMappingURL=ImageService.js.map