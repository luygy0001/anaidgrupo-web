import { IsString, IsOptional, IsEnum } from 'class-validator';

export class CreateAssignmentDto {
  @IsString()
  leadId: string;

  @IsString()
  profesionalId: string;

  @IsOptional()
  @IsString()
  notasAdmin?: string;
}

export class UpdateAssignmentDto {
  @IsEnum(['PENDIENTE', 'ACEPTADO', 'RECHAZADO', 'COMPLETADO'])
  estado: 'PENDIENTE' | 'ACEPTADO' | 'RECHAZADO' | 'COMPLETADO';

  @IsOptional()
  @IsString()
  notasProfesional?: string;

  @IsOptional()
  @IsString()
  notasAdmin?: string;
}
