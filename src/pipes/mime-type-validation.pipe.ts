import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class MimeTypeValidationPipe implements PipeTransform {
  private readonly allowedMimeTypes = [
    'image/jpeg', // cobre jpg e jpeg
    'image/png',
    'image/webp',
    'image/bmp',
  ];

  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado');
    }

    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Tipo de arquivo inválido: ${file.mimetype}. Tipos aceitos: ${this.allowedMimeTypes.join(', ')}`,
      );
    }

    return file;
  }
}
