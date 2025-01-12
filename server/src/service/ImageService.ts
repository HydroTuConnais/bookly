import { ImageRepository } from "../repository/ImageRepository";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export const ImageService = {

  async saveImage(imageData: { filename: string; filepath: string }) {
    const imageId = uuidv4();

    return await ImageRepository.createImage(imageId, imageData);
  },

  async updateImage(id: string, imageData: { filename: string; filepath: string }) {
    return await ImageRepository.updateImage(id, imageData);
  },

  async getAllImages() {
    return await ImageRepository.findAllImages();
  },

  async getImageById(id: string) {
    return await ImageRepository.findImageById(id);
  },

  async deleteImage(id: string) {
    const image = await ImageRepository.findImageById(id);
    if (!image) {
      throw new Error("Image not found");
    }
    fs.unlinkSync(image.filepath);
    return await ImageRepository.deleteImage(id);
  }
}
