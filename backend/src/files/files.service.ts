import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'application/pdf',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

@Injectable()
export class FilesService {
  constructor(private readonly prisma: PrismaService) {}

  validateFile(file: Express.Multer.File) {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(
        `Tipo de archivo no permitido: ${file.mimetype}`,
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new BadRequestException('El archivo es demasiado grande (máx. 10MB)');
    }
  }

  async saveFileRecord(
    file: Express.Multer.File,
    options: { leadId?: string; profesionalId?: string; tipo?: string },
  ) {
    this.validateFile(file);

    return this.prisma.archivo.create({
      data: {
        url: `/uploads/${file.filename}`,
        nombreOriginal: file.originalname,
        tipo: (options.tipo as any) || 'FOTO_PROYECTO',
        mimeType: file.mimetype,
        tamano: file.size,
        leadId: options.leadId,
        profesionalId: options.profesionalId,
      },
    });
  }
}
