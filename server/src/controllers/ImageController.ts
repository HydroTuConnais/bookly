import { Request, Response } from "express";
import imageService from "../service/ImageService";

class ImageController {
  async uploadImage(req: any, res: Response): Promise<void> {
    const { filename, path: filepath } = req.file!;
    try {
      const image = await imageService.saveImage({ filename, filepath });
      res.status(201).json({ message: "Image uploaded successfully", image });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to save image metadata" });
    }
  }

  async getAllImages(req: Request, res: Response): Promise<void> {
    try {
      const images = await imageService.getAllImages();
      res.json(images);
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to fetch images" });
    }
  }

  async getImageById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const image = await imageService.getImageById(String(id));
      if (!image) {
        res.status(404).json({ error: "Image not found" });
      } else {
        res.sendFile(image.filepath, { root: "." });
      }
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to fetch image" });
    }
  }

  async deleteImage(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await imageService.deleteImage(String(id));
      res.json({ message: "Image deleted successfully" });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to delete image" });
    }
  }
}

export default new ImageController();
