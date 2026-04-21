import { IsString, IsOptional, IsNumber } from 'class-validator';

export class StartChatDto {
  @IsOptional()
  @IsString()
  sessionId?: string;
}

export class SendMessageDto {
  @IsString()
  sessionId: string;

  @IsString()
  mensaje: string;

  @IsNumber()
  paso: number;
}
