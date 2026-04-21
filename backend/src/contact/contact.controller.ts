import { Controller, Post, Body, Logger } from '@nestjs/common';
import { IsString, IsEmail, IsOptional } from 'class-validator';
import { EmailService } from './email.service';

export class CreateContactDto {
  @IsString()
  nombre!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsString()
  mensaje!: string;
}

@Controller('contact')
export class ContactController {
  private readonly logger = new Logger(ContactController.name);

  constructor(private readonly emailService: EmailService) {}

  @Post()
  async create(@Body() dto: CreateContactDto) {
    try {
      await this.emailService.sendContactNotification({
        nombre: dto.nombre,
        email: dto.email,
        telefono: dto.telefono,
        mensaje: dto.mensaje,
      });
      this.logger.log(`Contact email sent from: ${dto.nombre} <${dto.email}>`);
    } catch (error) {
      this.logger.error('Failed to send contact email', error);
      // Still return success — we don't want the user to see SMTP errors.
      // The message is logged for debugging.
    }

    return { ok: true };
  }
}
