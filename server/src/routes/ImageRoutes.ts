const express = require("express");
const path = require("path");
import fs from "fs";
import { ImageController } from "../controllers/ImageController";

const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    const uploadPath = path.join(__dirname, "../../public");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
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
router.get("/image/:id", ImageController.getImageById);
router.post("/image/upload", upload.single("image"), ImageController.uploadImage);
// router.post("/image/update/:id", upload.single("image"), ImageController.updateImage);
router.delete("/image/:id", ImageController.deleteImage);

export default router;
