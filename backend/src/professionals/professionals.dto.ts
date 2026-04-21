import {
  IsString,
  IsEmail,
  IsOptional,
  IsArray,
  IsEnum,
  MinLength,
} from 'class-validator';

export class ApplyProfessionalDto {
  @IsString()
  @MinLength(2)
  nombre: string;

  @IsOptional()
  @IsString()
  empresa?: string;

  @IsEmail()
  email: string;

  @IsString()
  telefono: string;

  @IsArray()
  @IsString({ each: true })
  especialidades: string[];

  @IsArray()
  @IsString({ each: true })
  zonas: string[];

  @IsString()
  experiencia: string;

  @IsString()
  @MinLength(10)
  descripcion: string;
}

export class UpdateProfessionalDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  nombre?: string;

  @IsOptional()
  @IsString()
  empresa?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  especialidades?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  zonas?: string[];

  @IsOptional()
  @IsString()
  experiencia?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsEnum(['PENDIENTE', 'ACTIVO', 'PAUSADO', 'RECHAZADO'])
  estado?: 'PENDIENTE' | 'ACTIVO' | 'PAUSADO' | 'RECHAZADO';
}
