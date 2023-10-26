import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('sendDirectMessage')
  sendDirectMessage(@Body() messageDto: any): any {
    // Use your ChatService here to handle the logic
    return this.chatService.create(messageDto);
  }
}
