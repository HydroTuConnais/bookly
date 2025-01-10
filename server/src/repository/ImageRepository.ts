import { PrismaClient, Image } from "@prisma/client";

const prisma = new PrismaClient();

class ImageRepository {
  async createImage(imageId: string, imageData: { filename: string; filepath: string }): Promise<Image> {
    return await prisma.image.create({
      data: {
        id: imageId,
        filename: imageData.filename,
        filepath: imageData.filepath,
      },
    });
  }

  async findAllImages(): Promise<Image[]> {
    return await prisma.image.findMany();
  }

  async findImageById(id: string): Promise<Image | null> {
    return await prisma.image.findUnique({
      where: { id },
    });
  }

  async deleteImage(id: string): Promise<Image> {
    return await prisma.image.delete({
      where: { id },
    });
  }
}

export default new ImageRepository();
