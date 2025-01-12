const { PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();


export const ImageRepository = {
  
  async createImage(imageId: string, imageData: { filename: string; filepath: string }) {
    return await prisma.image.create({
      data: {
        id: imageId,
        filename: imageData.filename,
        filepath: imageData.filepath,
      },
    });
  },

  async updateImage(id: string, imageData: { filename: string; filepath: string }) {
    return await prisma.image.update({
      where: { id },
      data: {
        filename: imageData.filename,
        filepath: imageData.filepath,
      },
    });
  },

  async findAllImages() {
    return await prisma.image.findMany();
  },

  async findImageById(id: string) {
    console.log(id);
    return await prisma.image.findUnique({
      where: { id },
    });
  },

  async deleteImage(id: string) {
    return await prisma.image.delete({
      where: { id },
    });
  }
}
