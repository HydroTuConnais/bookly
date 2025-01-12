import { Request, Response } from "express";
import { ImageService } from "../service/ImageService";
import fs from 'fs';
import path from 'path';

export const ImageController = {
  async uploadImage(req: any, res: Response): Promise<void> {
    const { filename, path: filepath } = req.file!;
    try {
      const image = await ImageService.saveImage({ filename, filepath });
      res.status(201).json({ message: "Image uploaded successfully", filename, filepath });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to save image metadata" });
    }
  },

  async getAllImages(req: Request, res: Response): Promise<void> {
    try {
      const images = await ImageService.getAllImages();
      res.json(images);
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to fetch images" });
    }
  },

  async getImageById(req: Request, res: Response): Promise<void> {
    const id  = req.params.id;
    console.log(id);
    try {
      const image = await ImageService.getImageById(id);
      if (!image) {
        res.status(404).json({ error: "Image not found" });
      } else {
        const filePath = path.resolve(image.filepath);
        if (fs.existsSync(filePath)) {
          res.sendFile(filePath);
        } else {
          res.status(404).json({ error: "File not found" });
        }
      }
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to fetch image" });
    }
  },

  async deleteImage(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      await ImageService.deleteImage(id);
      res.json({ message: "Image deleted successfully" });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to delete image" });
    }
  }
};