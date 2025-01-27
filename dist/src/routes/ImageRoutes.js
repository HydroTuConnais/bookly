"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const fs_1 = __importDefault(require("fs"));
const ImageController_1 = require("../controllers/ImageController");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "/uploads");
        if (!fs_1.default.existsSync(uploadPath)) {
            fs_1.default.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    }
    else {
        cb(new Error('Only images are allowed!'), false);
    }
};
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    }
});
// Routes
router.get("/image/:id", ImageController_1.ImageController.getImageById);
router.post("/image/upload", upload.single("image"), ImageController_1.ImageController.uploadImage);
// router.post("/image/update/:id", upload.single("image"), ImageController.updateImage);
router.delete("/image/:id", ImageController_1.ImageController.deleteImage);
exports.default = router;
//# sourceMappingURL=ImageRoutes.js.map