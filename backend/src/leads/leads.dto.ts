import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsBoolean,
  MinLength,
} from 'class-validator';

export class CreateLeadDto {
  @IsString()
  @MinLength(2)
  nombre: string;

  @IsString()
  telefono: string;

  @IsEmail()
  email: string;

  @IsString()
  codigoPostal: string;

  @IsString()
  @MinLength(10)
  descripcion: string;

  @IsEnum([
    'BAJA',
    'MEDIA',
    'ALTA',
    'URGENTE',
  ])
  urgencia: 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';

  @IsEnum([
    'REFORMA_INTEGRAL',
    'REFORMA_BANO',
    'REFORMA_COCINA',
    'ELECTRICIDAD',
    'FONTANERIA',
    'CLIMATIZACION',
    'ARQUITECTO',
    'PEQUENAS_OBRAS',
    'NO_SE',
  ])
  tipoServicio: string;

  @IsOptional()
  @IsBoolean()
  noSabeQueNecesita?: boolean;

  @IsOptional()
  @IsEnum(['FORMULARIO', 'WHATSAPP', 'TELEFONO', 'CHAT'])
  fuente?: string;
}

export class UpdateLeadDto {
  @IsOptional()
  @IsEnum([
    'NUEVO',
    'ANALIZADO',
    'ASIGNADO',
    'EN_CURSO',
    'CERRADO',
    'DESCARTADO',
  ])
  estado?: string;

  @IsOptional()
  @IsString()
  notas?: string;

  @IsOptional()
  score?: number;
}
