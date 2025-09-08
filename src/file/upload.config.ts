import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';

export const photoUploadConfig = {
  storage: diskStorage({
    destination: './storage/photos',
  }),
  limits: { fileSize: 900 * 1024 }, // 900kb
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      return callback(
        new BadRequestException('Apenas imagens JPG/PNG são permitidas'),
        false,
      );
    }
    callback(null, true);
  },
};
