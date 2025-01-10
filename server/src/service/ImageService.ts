import imageRepository from "../repository/ImageRepository";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

class ImageService {

  async saveImage(imageData: { filename: string; filepath: string }) {
    const imageId = uuidv4();

    return await imageRepository.createImage(imageId, imageData);
  }

  async getAllImages() {
    return await imageRepository.findAllImages();
  }

  async getImageById(id: string) {
    return await imageRepository.findImageById(id);
  }

  async deleteImage(id: string) {
    const image = await imageRepository.findImageById(id);
    if (!image) {
      throw new Error("Image not found");
    }
    fs.unlinkSync(image.filepath);
    return await imageRepository.deleteImage(id);
  }
}

export default new ImageService();
