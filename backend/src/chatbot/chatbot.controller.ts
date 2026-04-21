import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { SendMessageDto } from './chatbot.dto';

@Controller('chat')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  // Public — start a new chat session
  @Post('start')
  async start() {
    return this.chatbotService.startSession();
  }

  // Public — send a message in a chat session
  @Post('message')
  async message(@Body() dto: SendMessageDto) {
    return this.chatbotService.processMessage(
      dto.sessionId,
      dto.mensaje,
      dto.paso,
    );
  }

  // Public — get a chat session with messages
  @Get(':sessionToken')
  async getSession(@Param('sessionToken') sessionToken: string) {
    return this.chatbotService.getSession(sessionToken);
  }
}
