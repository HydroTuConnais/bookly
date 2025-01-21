const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


export const ImageRepository = {

  async createImage(imageId: string, imageUrl: string, imageData: { filename: string; filepath: string }) {
    return await prisma.image.create({
      data: {
        id: imageId,
        url: imageUrl,
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
    const image = await prisma.image.findUnique({
      where: { id },
    });
    return image;
  },

  async findImageByIdDocument(id: string) {
    const document = await prisma.document.findFirst({
      where: {
        coverImage: {
          contains: id
        }
      },
    });

    if (document && document.coverImage) {
      const match = document.coverImage.match(/\/([^\/]+)$/);
      if (match) {
        return match[1]; // This will return the extracted ID
      }
    }

    return null;
  },

  async deleteImage(id: string) {
    return await prisma.image.delete({
      where: { id },
    });
  }
}
