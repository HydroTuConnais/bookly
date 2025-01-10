const express = require("express");
const multer = require("multer");
const path = require("path");
const ImageController = require("../controllers/ImageController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req: any, file: any, cb: any) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Routes
router.post("/image/upload", upload.single("image"), ImageController.uploadImage);
router.get("/image", ImageController.getAllImages);
router.get("/image/:id", ImageController.getImageById);
router.delete("/image/:id", ImageController.deleteImage);

module.exports = router;
