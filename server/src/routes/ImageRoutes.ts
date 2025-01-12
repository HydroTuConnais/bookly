const express = require("express");
const path = require("path");
import fs from "fs";
import { ImageController } from "../controllers/ImageController";

const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    const uploadPath = path.join(__dirname, "../../public"); // Chemin absolu au répertoire Images
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true }); // Crée le répertoire s'il n'existe pas
    }
    cb(null, uploadPath); // Définit le chemin où enregistrer les fichiers
  },
  filename: (req: any, file: any, cb: any) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.post("/image/upload", upload.single("image"), ImageController.uploadImage);
// router.post("/image/update/:id", upload.single("image"), ImageController.updateImage);
router.get("/image/:id", ImageController.getImageById);
router.delete("/image/:id", ImageController.deleteImage);

export default router;
