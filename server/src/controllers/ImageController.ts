import { Request, Response } from "express";
import { ImageService } from "../service/ImageService";
import fs from 'fs';
import path from 'path';

export const ImageController = {
  async uploadImage(req: any, res: Response): Promise<void> {
    console.log(req);

    const { filename, path: filepath } = req.file!;
    try {
      const imageUrl = await ImageService.saveImage({ filename, filepath });

      res.status(201).json(imageUrl);
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to save image metadata" });
    }
  },

  async getAllImages(req: Request, res: Response): Promise<void> {
    try {
      const images = await ImageService.getAllImages();
      res.status(200).json(images);
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to fetch images" });
    }
  },

  async getImageById(req: Request, res: Response): Promise<void> {
    const id  = req.params.id;
    try {
      const image = await ImageService.getImageById(id);
      
      if (!image) {
        res.status(404).json({ error: "Image not found" });
      } 

      else {
        const filePath = path.resolve(image.filepath);
        if (fs.existsSync(filePath)) {
          res.status(200).sendFile(filePath);
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
    const { url	} = req.body;
    
    try {
      await ImageService.deleteImage(id, url);
      res.status(200).json({ message: "Image deleted successfully" });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to delete image" });
    }
  }
};