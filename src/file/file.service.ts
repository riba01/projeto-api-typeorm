import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import { extname, join } from 'path';

@Injectable()
export class FileService {
  private readonly photoPath = join('storage', 'photos');
  private readonly documentPath = join('storage', 'documents');

  async uploadPhoto(photo: Express.Multer.File, userId: number) {
    const fileName = `avatar_${userId}${extname(photo.originalname)}`;
    const newPath = join(this.photoPath, fileName);

    // Se estiver usando memoryStorage, troque para writeFile:
    // await fs.writeFile(newPath, photo.buffer);
    await fs.writeFile(newPath, photo.buffer);

    return {
      success: true,
      message: 'Foto enviada com sucesso!',
      filename: fileName,
      path: newPath,
      url: `/storage/photos/${fileName}`,
      userId,
    };
  }

  async uploadDocument(file: Express.Multer.File, userId: number) {
    const fileName = `doc_${userId}_${Date.now()}_${file.originalname}`;
    const filePath = join(this.documentPath, fileName);

    // Consistência: salvar em disco
    await fs.writeFile(filePath, file.buffer);

    return {
      success: true,
      message: 'Documento enviado com sucesso!',
      filename: fileName,
      path: filePath,
      url: `/storage/documents/${fileName}`,
      userId,
    };
  }
}
